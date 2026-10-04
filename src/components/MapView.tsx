import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Clock, MapPin } from 'lucide-react';
import type { StationWithDetails, UserLocation, FuelType } from '../types';
import { formatPrice, formatTimeAgo, getPriceTierColor, getFlagBadgeInfo } from '../utils/formatters';

interface MapViewProps {
  stations: StationWithDetails[];
  userLocation: UserLocation | null;
  selectedFuelType: FuelType | 'all';
  averagePrice: number;
  onReportPrice: (station: StationWithDetails) => void;
  onFlagStation: (station: StationWithDetails) => void;
  focusedStation: StationWithDetails | null;
  onSelectStation: (station: StationWithDetails | null) => void;
  onRequestLocation: () => void;
  /** When set/changed, the map jumps to this location and zoom (e.g. city picked from dropdown). */
  mapTarget?: { lat: number; lng: number; zoom: number; nonce: number } | null;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

const userIcon = L.divIcon({
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  html: `<div style="position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center">
    <span class="animate-ping" style="position:absolute;width:36px;height:36px;border-radius:9999px;background:#60a5fa;opacity:.6"></span>
    <div style="position:relative;width:24px;height:24px;border-radius:9999px;background:#2563eb;border:2px solid #fff;box-shadow:0 4px 10px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center">
      <div style="width:10px;height:10px;border-radius:9999px;background:#fff"></div>
    </div></div>`,
});

function buildStationIcon(opts: {
  name: string;
  priceText: string;
  background: string;
  showName: boolean;
  isSelected: boolean;
  zoom: number;
}) {
  const { name, priceText, background, showName, isSelected, zoom } = opts;
  const label = showName
    ? `<div style="margin-bottom:4px;padding:2px 10px;border-radius:8px;background:${isSelected ? '#0f172a' : '#fff'};color:${isSelected ? '#fff' : '#0f172a'};border:1px solid ${isSelected ? '#34d399' : '#cbd5e1'};font-size:${zoom >= 14 ? 12 : 11}px;font-weight:800;white-space:nowrap;max-width:220px;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 6px rgba(0,0,0,.2)">${escapeHtml(name)}</div>`
    : '';
  const pin = `<div style="min-width:44px;padding:4px 8px;border-radius:9999px;background:${background};color:#fff;border:2px solid ${isSelected ? '#34d399' : '#fff'};font-size:${zoom <= 9 ? 10 : 12}px;font-weight:900;text-align:center;white-space:nowrap;box-shadow:0 3px 8px rgba(0,0,0,.35);transform:scale(${isSelected ? 1.2 : 1})">${escapeHtml(priceText)}</div>
    <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid ${background}"></div>`;
  return L.divIcon({
    className: '',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    html: `<div style="position:absolute;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;cursor:pointer">${label}${pin}</div>`,
  });
}

/** Keeps Leaflet's view in sync with React state and reports zoom changes. */
const MapController: React.FC<{
  center: UserLocation;
  zoom: number;
  onZoom: (z: number) => void;
}> = ({ center, zoom, onZoom }) => {
  const map = useMap();

  useEffect(() => {
    const cur = map.getCenter();
    if (
      Math.abs(cur.lat - center.lat) > 1e-6 ||
      Math.abs(cur.lng - center.lng) > 1e-6 ||
      map.getZoom() !== zoom
    ) {
      // No animation: animated moves cancel in-flight tile requests and cause partial maps
      map.setView([center.lat, center.lng], zoom, { animate: false });
    }
  }, [map, center.lat, center.lng, zoom]);

  useMapEvents({
    zoomend: () => onZoom(map.getZoom()),
  });

  // Fix tile sizing when container is resized (prevents partially loaded/grey map)
  useEffect(() => {
    const el = map.getContainer();
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);
    const t = setTimeout(() => map.invalidateSize(), 100);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [map]);

  return null;
};

export const MapView: React.FC<MapViewProps> = ({
  stations,
  userLocation,
  selectedFuelType,
  averagePrice,
  onReportPrice,
  onFlagStation,
  focusedStation,
  onSelectStation,
  onRequestLocation,
  mapTarget,
}) => {
  const initialCenter = userLocation || {
    lat: stations[0]?.latitude || 6.5244,
    lng: stations[0]?.longitude || 3.3792,
  };

  const [center, setCenter] = useState<UserLocation>(initialCenter);
  const [zoom, setZoom] = useState<number>(13);

  // Sync center when user location or focused station changes
  useEffect(() => {
    if (focusedStation) {
      setCenter({ lat: focusedStation.latitude, lng: focusedStation.longitude });
      setZoom(15);
    }
  }, [focusedStation]);

  useEffect(() => {
    if (userLocation && !focusedStation) {
      setCenter(userLocation);
    }
  }, [userLocation, focusedStation]);

  useEffect(() => {
    if (mapTarget) {
      setCenter({ lat: mapTarget.lat, lng: mapTarget.lng });
      setZoom(mapTarget.zoom);
    }
  }, [mapTarget]);

  const markers = useMemo(
    () =>
      stations.map((station) => {
        const primaryFuel = selectedFuelType === 'all' ? 'petrol' : selectedFuelType;
        const priceObj = station.currentPrices[primaryFuel] || station.currentPrices.petrol;
        const priceVal = priceObj?.price;
        const tier = getPriceTierColor(priceVal, averagePrice);
        const background =
          tier.label === 'Cheapest' ? '#059669' : tier.label === 'Higher' ? '#e11d48' : '#d97706';
        const isSelected = focusedStation?.id === station.id;
        const showName = zoom >= 12 || isSelected;
        const icon = buildStationIcon({
          name: station.name,
          priceText: priceVal ? formatPrice(priceVal) : '⛽',
          background,
          showName,
          isSelected,
          zoom,
        });
        return { station, icon, isSelected, showName };
      }),
    [stations, selectedFuelType, averagePrice, focusedStation, zoom]
  );

  return (
    <div className="relative isolate z-0 w-full h-full min-h-[500px] bg-slate-100 overflow-hidden">
      <MapContainer
        center={[initialCenter.lat, initialCenter.lng]}
        zoom={13}
        minZoom={3}
        maxZoom={19}
        worldCopyJump
        zoomControl={false}
        style={{ width: '100%', height: '100%', minHeight: 500 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          keepBuffer={4}
        />
        <MapController center={center} zoom={zoom} onZoom={setZoom} />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} title="Your Location" />
        )}

        {/* Station Markers */}
        {markers.map(({ station, icon, isSelected }) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={icon}
            zIndexOffset={isSelected ? 1000 : 0}
            eventHandlers={{ click: () => onSelectStation(station) }}
          />
        ))}

        {/* Info Popup */}
        {focusedStation && (
          <Popup
            key={focusedStation.id}
            position={[focusedStation.latitude, focusedStation.longitude]}
            offset={[0, -40]}
            eventHandlers={{ remove: () => onSelectStation(null) }}
          >
            <div className="max-w-xs text-slate-800 font-sans">
              <h4 className="font-bold text-base text-slate-900 leading-snug mb-1">{focusedStation.name}</h4>
              <p className="text-sm text-slate-600 mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{focusedStation.address}</span>
              </p>

              {/* Active Flag Badges */}
              {focusedStation.activeFlags && focusedStation.activeFlags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {focusedStation.activeFlags.map((flag) => {
                    const info = getFlagBadgeInfo(flag.type);
                    return (
                      <span
                        key={flag.type}
                        className={`text-xs px-2 py-0.5 rounded-lg font-bold border ${info.bg} ${info.text} ${info.border}`}
                      >
                        {info.icon} {info.label} ({flag.count})
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Price Grid */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-3">
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  {(['petrol', 'diesel', 'premium'] as const).map((f) => (
                    <div key={f}>
                      <div className="text-[11px] text-slate-500 uppercase font-bold">{f}</div>
                      <div className="font-black text-sm text-slate-900 mt-0.5">
                        {formatPrice(focusedStation.currentPrices[f]?.price)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-500 text-right mt-2 flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{formatTimeAgo(focusedStation.lastUpdated)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onReportPrice(focusedStation)}
                  className="flex-1 min-h-[38px] py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
                >
                  Report Price
                </button>
                <button
                  onClick={() => onFlagStation(focusedStation)}
                  className="min-h-[38px] py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs sm:text-sm font-bold transition-colors"
                >
                  ⚠️ Flag
                </button>
              </div>
            </div>
          </Popup>
        )}
      </MapContainer>

      {/* Floating Locate & Zoom Buttons (Top-Right) */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5 w-10">
        <button
          onClick={onRequestLocation}
          className="w-10 h-10 bg-white hover:bg-slate-50 rounded-lg shadow-md border border-slate-200 text-slate-700 transition-all active:scale-95 flex items-center justify-center"
          title="Recenter to my location"
          aria-label="Recenter to my location"
        >
          <Navigation className="w-[18px] h-[18px] text-emerald-600" />
        </button>

        <button
          onClick={() => {
            onSelectStation(null);
            setCenter({ lat: 3, lng: 18 });
            setZoom(3);
          }}
          className="w-10 h-8 bg-white hover:bg-slate-50 rounded-lg shadow-md border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center justify-center"
          title="View most of Africa"
        >
          Africa
        </button>

        <div className="bg-white rounded-lg shadow-md border border-slate-200 p-0.5 flex flex-col items-center">
          <button
            onClick={() => setZoom((z) => Math.min(19, z + 1))}
            className="w-9 h-8 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md text-lg font-black transition-colors"
            title="Zoom in (shows station names)"
            aria-label="Zoom in"
          >
            +
          </button>
          <div className="w-6 border-t border-slate-100"></div>
          <button
            onClick={() => setZoom((z) => Math.max(3, z - 1))}
            className="w-9 h-8 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md text-lg font-black transition-colors"
            title="Zoom out"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
      </div>

      {/* Dynamic Zoom Level & Station Name Visibility Pill */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl px-3 py-1.5 shadow-md text-xs font-semibold text-slate-700 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-bold text-slate-900">Zoom: {zoom}x</span>
        <span className="text-slate-300">|</span>
        <span className={zoom >= 12 ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
          {zoom >= 12 ? 'Station names visible' : 'Zoom in to view station names'}
        </span>
      </div>

      {/* Map Legend (Bottom-Left) */}
      <div className="absolute bottom-6 left-4 z-[1000] bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-3 shadow-md text-xs hidden sm:block">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Fuel Price Tiers</div>
        <div className="flex items-center gap-3 font-medium text-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white shadow-xs"></span>
            <span>Cheapest</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-600 border border-white shadow-xs"></span>
            <span>Average</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-600 border border-white shadow-xs"></span>
            <span>Higher</span>
          </div>
        </div>
      </div>
    </div>
  );
};
