import React, { useState, useEffect, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useApiLoadingStatus,
  useApiIsLoaded,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {
  Navigation,
  PlusCircle,
  AlertTriangle,
  Clock,
  MapPin,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
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
}

export const MapView: React.FC<MapViewProps> = (props) => {
  const rawApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const apiKey = typeof rawApiKey === 'string' ? rawApiKey.trim().replace(/^["']|["']$/g, '') : '';
  const hasApiKey = Boolean(apiKey && apiKey !== '');

  const [authFailure, setAuthFailure] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  // Global auth failure interceptor (Google Maps fires window.gm_authFailure when key/billing fails)
  useEffect(() => {
    const origHandler = (window as any).gm_authFailure;
    (window as any).gm_authFailure = () => {
      console.error('Google Maps JavaScript API authentication error (gm_authFailure)');
      setAuthFailure(true);
      if (typeof origHandler === 'function') {
        origHandler();
      }
    };
    return () => {
      (window as any).gm_authFailure = origHandler;
    };
  }, []);

  const handleRetry = useCallback(() => {
    setAuthFailure(false);
    setRetryKey((k) => k + 1);
  }, []);

  // If no API key configured in env
  if (!hasApiKey) {
    return (
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center p-6 bg-slate-50">
        <MapErrorCard
          type="missing_key"
          onRetry={handleRetry}
          apiKey={apiKey}
        />
      </div>
    );
  }

  // If global gm_authFailure fired
  if (authFailure) {
    return (
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center p-6 bg-slate-50">
        <MapErrorCard
          type="auth_failure"
          onRetry={handleRetry}
          apiKey={apiKey}
        />
      </div>
    );
  }

  return (
    <div key={retryKey} className="relative w-full h-full min-h-[500px] bg-slate-100 overflow-hidden">
      <APIProvider
        apiKey={apiKey}
        solutionChannel="GMP_visgl_reactgooglemaps_v1"
      >
        <MapLoaderContent
          {...props}
          apiKey={apiKey}
          onAuthFailure={() => setAuthFailure(true)}
          onRetry={handleRetry}
        />
      </APIProvider>
    </div>
  );
};

const mapPoiFilterStyles = [
  {
    featureType: 'poi.business',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.restaurant',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.school',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.attraction',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.medical',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.government',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
];

interface MapLoaderContentProps extends MapViewProps {
  apiKey: string;
  onAuthFailure: () => void;
  onRetry: () => void;
}

const MapLoaderContent: React.FC<MapLoaderContentProps> = ({
  stations,
  userLocation,
  selectedFuelType,
  averagePrice,
  onReportPrice,
  onFlagStation,
  focusedStation,
  onSelectStation,
  onRequestLocation,
  apiKey,
  onAuthFailure,
  onRetry,
}) => {
  const loadingStatus = useApiLoadingStatus();
  const isLoaded = useApiIsLoaded();

  const defaultCenter = userLocation || {
    lat: stations[0]?.latitude || 6.5244,
    lng: stations[0]?.longitude || 3.3792,
  };

  const [center, setCenter] = useState<UserLocation>(defaultCenter);
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

  // Check for load failures
  if (loadingStatus === APILoadingStatus.FAILED || loadingStatus === APILoadingStatus.AUTH_FAILURE) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 bg-slate-50">
        <MapErrorCard
          type="auth_failure"
          onRetry={onRetry}
          apiKey={apiKey}
        />
      </div>
    );
  }

  // Loading state
  if (!isLoaded || loadingStatus === APILoadingStatus.LOADING) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-700 p-6">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <h3 className="mt-4 font-bold text-base text-slate-800">Loading Google Maps...</h3>
        <p className="text-xs text-slate-500 mt-1">Connecting to Google Maps JavaScript API and rendering tiles</p>
      </div>
    );
  }

  // Loaded map with real tiles and markers
  return (
    <div className="relative w-full h-full">
      <Map
        defaultCenter={center}
        center={center}
        defaultZoom={zoom}
        zoom={zoom}
        onCameraChanged={(ev) => {
          setCenter(ev.detail.center);
          setZoom(Math.round(ev.detail.zoom));
        }}
        mapId="DEMO_MAP_ID"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
        gestureHandling="greedy"
        disableDefaultUI={false}
        options={{
          styles: mapPoiFilterStyles,
        }}
      >
        {/* User Location Marker */}
        {userLocation && (
          <AdvancedMarker position={userLocation} title="Your Location">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-blue-400 opacity-60"></span>
              <div className="relative w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>
            </div>
          </AdvancedMarker>
        )}

        {/* Station Markers */}
        {stations.map((station) => {
          const primaryFuel = selectedFuelType === 'all' ? 'petrol' : selectedFuelType;
          const priceObj = station.currentPrices[primaryFuel] || station.currentPrices.petrol;
          const priceVal = priceObj?.price;
          const tier = getPriceTierColor(priceVal, averagePrice);

          const pinBackground =
            tier.label === 'Cheapest' ? '#059669' : tier.label === 'Higher' ? '#e11d48' : '#d97706';

          const isSelected = focusedStation?.id === station.id;

          // Calculate dynamic zoom-responsive scaling so filling stations stand out prominently
          let baseScale = 1.3;
          if (zoom <= 7) {
            baseScale = 0.85;
          } else if (zoom <= 9) {
            baseScale = 0.98;
          } else if (zoom <= 11) {
            baseScale = 1.15;
          } else if (zoom <= 13) {
            baseScale = 1.32;
          } else if (zoom === 14) {
            baseScale = 1.5;
          } else if (zoom === 15) {
            baseScale = 1.65;
          } else {
            // zoom >= 16
            baseScale = 1.8;
          }
          const markerScale = isSelected ? baseScale * 1.25 : baseScale;

          // Show station name as you zoom in (zoom >= 12) or if the station is currently selected
          const showStationName = zoom >= 12 || isSelected;

          return (
            <AdvancedMarker
              key={station.id}
              position={{ lat: station.latitude, lng: station.longitude }}
              onClick={() => onSelectStation(station)}
              zIndex={isSelected ? 300 : showStationName ? 150 : 50}
            >
              <div className="flex flex-col items-center cursor-pointer select-none group transition-transform duration-150">
                {/* Station Name Label displayed clearly as you zoom in */}
                {showStationName && (
                  <div
                    className={`mb-1.5 px-2.5 py-0.5 rounded-lg shadow-lg border text-center transition-all animate-in fade-in zoom-in-95 duration-150 pointer-events-none whitespace-nowrap max-w-[220px] truncate ${
                      isSelected
                        ? 'bg-slate-900 text-white border-emerald-400 ring-2 ring-emerald-400/50 text-xs font-black shadow-emerald-950/20'
                        : zoom >= 14
                        ? 'bg-white text-slate-900 border-slate-300 font-black text-xs shadow-md'
                        : 'bg-white/95 text-slate-900 border-slate-200/90 text-[11px] font-bold shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="truncate">{station.name}</span>
                    </div>
                  </div>
                )}

                {/* Obvious, easily seen filling station Pin */}
                <div className="relative flex items-center justify-center filter drop-shadow-md">
                  {isSelected && (
                    <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-emerald-400 opacity-60 pointer-events-none"></span>
                  )}
                  <Pin
                    background={pinBackground}
                    glyphColor="#ffffff"
                    borderColor="#ffffff"
                    scale={markerScale}
                  >
                    <span
                      className={`font-black text-white px-1 py-0.5 tracking-tight whitespace-nowrap drop-shadow-xs ${
                        zoom <= 9 ? 'text-[9px]' : zoom <= 13 ? 'text-[11px]' : 'text-xs'
                      }`}
                    >
                      {priceVal ? formatPrice(priceVal) : '⛽'}
                    </span>
                  </Pin>
                </div>
              </div>
            </AdvancedMarker>
          );
        })}

        {/* Info Window */}
        {focusedStation && (
          <InfoWindow
            position={{ lat: focusedStation.latitude, lng: focusedStation.longitude }}
            onCloseClick={() => onSelectStation(null)}
          >
            <div className="p-2.5 max-w-xs text-slate-800 font-sans">
              <div className="flex items-start justify-between gap-1 mb-1">
                <h4 className="font-bold text-base text-slate-900 leading-snug">{focusedStation.name}</h4>
              </div>
              <p className="text-sm text-slate-600 mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{focusedStation.address}</span>
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
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase font-bold">Petrol</div>
                    <div className="font-black text-sm text-slate-900 mt-0.5">
                      {formatPrice(focusedStation.currentPrices.petrol?.price)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase font-bold">Diesel</div>
                    <div className="font-black text-sm text-slate-900 mt-0.5">
                      {formatPrice(focusedStation.currentPrices.diesel?.price)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 uppercase font-bold">Premium</div>
                    <div className="font-black text-sm text-slate-900 mt-0.5">
                      {formatPrice(focusedStation.currentPrices.premium?.price)}
                    </div>
                  </div>
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
          </InfoWindow>
        )}
      </Map>

      {/* Floating Locate & Zoom Buttons (Top-Right) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={onRequestLocation}
          className="p-3 bg-white hover:bg-slate-50 rounded-xl shadow-md border border-slate-200 text-slate-700 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
          title="Recenter to my location"
          aria-label="Recenter to my location"
        >
          <Navigation className="w-5 h-5 text-emerald-600" />
        </button>

        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-1 flex flex-col items-center">
          <button
            onClick={() => setZoom((z) => Math.min(20, z + 1))}
            className="w-9 h-9 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-lg font-black transition-colors"
            title="Zoom in (shows station names)"
            aria-label="Zoom in"
          >
            +
          </button>
          <div className="w-6 border-t border-slate-100 my-0.5"></div>
          <button
            onClick={() => setZoom((z) => Math.max(4, z - 1))}
            className="w-9 h-9 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-lg font-black transition-colors"
            title="Zoom out"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
      </div>

      {/* Dynamic Zoom Level & Station Name Visibility Pill */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl px-3 py-1.5 shadow-md text-xs font-semibold text-slate-700 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="font-bold text-slate-900">Zoom: {zoom}x</span>
        <span className="text-slate-300">|</span>
        <span className={zoom >= 13 ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
          {zoom >= 13 ? 'Station names visible' : 'Zoom in to view station names'}
        </span>
      </div>

      {/* Map Legend (Bottom-Left) */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-3 shadow-md text-xs hidden sm:block">
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

// Reusable Visible On-Screen Error Card
interface MapErrorCardProps {
  type: 'missing_key' | 'auth_failure';
  apiKey?: string;
  onRetry: () => void;
}

const MapErrorCard: React.FC<MapErrorCardProps> = ({ type, apiKey, onRetry }) => {
  return (
    <div className="max-w-xl w-full bg-white rounded-2xl border border-rose-200 shadow-xl p-6 sm:p-8 text-slate-800 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {type === 'missing_key'
              ? 'Google Maps API Key Not Detected'
              : 'Google Maps Authentication Failed'}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {type === 'missing_key'
              ? 'The Google Maps JavaScript API cannot load streets and map tiles because the API key environment variable is not configured.'
              : 'The Google Maps API key provided was rejected by Google Cloud or could not authenticate.'}
          </p>
        </div>
      </div>

      <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2.5">
        <p className="font-bold text-slate-800 flex items-center gap-1.5">
          <KeyRound className="w-4 h-4 text-emerald-600" />
          <span>Likely Causes & Quick Troubleshooting:</span>
        </p>
        <ul className="space-y-2 text-slate-600 list-disc list-inside pl-1 text-xs">
          <li>
            <strong className="text-slate-800">Missing or Invalid API Key:</strong> Make sure{' '}
            <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-900">
              VITE_GOOGLE_MAPS_API_KEY
            </code>{' '}
            is set in your <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-900">.env</code> file.
          </li>
          <li>
            <strong className="text-slate-800">API Not Enabled:</strong> In Google Cloud Console &gt; APIs &amp; Services, verify that{' '}
            <strong className="text-slate-900">Maps JavaScript API</strong> is enabled for this project.
          </li>
          <li>
            <strong className="text-slate-800">Billing Not Active:</strong> Google Cloud requires an active billing account linked to the project to authenticate map tile requests.
          </li>
          <li>
            <strong className="text-slate-800">Domain / HTTP Referrer Restrictions:</strong> If your API key is restricted by HTTP referrer, verify that this URL or localhost is allowed.
          </li>
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
        <a
          href="https://console.cloud.google.com/google/maps-apis/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
        >
          <span>Google Cloud Maps Console</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Loading Map</span>
        </button>
      </div>
    </div>
  );
};
