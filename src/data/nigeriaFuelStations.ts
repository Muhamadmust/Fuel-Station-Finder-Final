import type { Station, PriceReport, Flag } from '../types';

export interface CityRegion {
  id: string;
  name: string;
  lat: number;
  lng: number;
  zoom: number;
}

export const NIGERIAN_REGIONS: CityRegion[] = [
  { id: 'all', name: 'All Nigeria', lat: 7.5, lng: 5.5, zoom: 6 },
  { id: 'lagos', name: 'Lagos Metro', lat: 6.5244, lng: 3.3792, zoom: 12 },
  { id: 'abuja', name: 'Abuja FCT', lat: 9.0578, lng: 7.4895, zoom: 12 },
  { id: 'ibadan', name: 'Ibadan', lat: 7.4040, lng: 3.9050, zoom: 12 },
  { id: 'ph', name: 'Port Harcourt', lat: 4.8150, lng: 7.0120, zoom: 12 },
  { id: 'kan', name: 'Kano', lat: 12.0022, lng: 8.592, zoom: 12 },
  { id: 'kad', name: 'Kaduna', lat: 10.5105, lng: 7.4165, zoom: 12 },
  { id: 'enu', name: 'Enugu', lat: 6.4584, lng: 7.5464, zoom: 12 },
  { id: 'ben', name: 'Benin City', lat: 6.335, lng: 5.6037, zoom: 12 },
  { id: 'abe', name: 'Abeokuta', lat: 7.1475, lng: 3.3619, zoom: 12 },
  { id: 'owe', name: 'Owerri', lat: 5.4836, lng: 7.0333, zoom: 12 },
  { id: 'jos', name: 'Jos', lat: 9.8965, lng: 8.8583, zoom: 12 },
  { id: 'war', name: 'Warri', lat: 5.516, lng: 5.75, zoom: 12 },
  { id: 'cal', name: 'Calabar', lat: 4.9757, lng: 8.3417, zoom: 12 },
  { id: 'ilo', name: 'Ilorin', lat: 8.4966, lng: 4.5421, zoom: 12 },
];

const now = Date.now();
const pastDays = (d: number) => new Date(now - d * 86400000).toISOString();
const pastMins = (m: number) => new Date(now - m * 60000).toISOString();

export const NIGERIA_SEED_STATIONS: Station[] = [
  // --- LAGOS ISLAND, IKOYI & VICTORIA ISLAND ---
  {
    id: 'ng-lag-01',
    name: 'NNPCL Mega Station Ikoyi',
    address: '1 Alfred Rewane Road, Ikoyi, Lagos',
    latitude: 6.4542,
    longitude: 3.4287,
    createdAt: pastDays(45),
  },
  {
    id: 'ng-lag-02',
    name: 'TotalEnergies Falomo Service Station',
    address: 'Falomo Roundabout, Awolowo Road, Ikoyi, Lagos',
    latitude: 6.4485,
    longitude: 3.4312,
    createdAt: pastDays(40),
  },
  {
    id: 'ng-lag-03',
    name: 'Mobil Service Station Victoria Island',
    address: '14 Adeola Odeku Street, Victoria Island, Lagos',
    latitude: 6.4298,
    longitude: 3.4215,
    createdAt: pastDays(38),
  },
  {
    id: 'ng-lag-04',
    name: 'Conoil Service Station Marina',
    address: '38 Marina Road, Lagos Island, Lagos',
    latitude: 6.4521,
    longitude: 3.3934,
    createdAt: pastDays(35),
  },
  {
    id: 'ng-lag-06',
    name: 'MRS Oil Service Station Lekki Phase 1',
    address: 'Admiralty Way, Lekki Phase 1, Lagos',
    latitude: 6.4428,
    longitude: 3.4754,
    createdAt: pastDays(30),
  },

  // --- LAGOS MAINLAND (IKEJA, MARYLAND, YABA, SURULERE, OJOTA) ---
  {
    id: 'ng-lag-13',
    name: 'NNPCL Mega Station Maryland',
    address: 'Ikorodu Road, Maryland, Ikeja, Lagos',
    latitude: 6.5712,
    longitude: 3.3678,
    createdAt: pastDays(50),
  },
  {
    id: 'ng-lag-17',
    name: 'Bovas & Company Service Station Alausa',
    address: 'CBD Secretariat Road, Alausa, Ikeja, Lagos',
    latitude: 6.6190,
    longitude: 3.3580,
    createdAt: pastDays(34),
  },
  {
    id: 'ng-lag-20',
    name: 'Mobil Service Station Yaba',
    address: 'Herbert Macaulay Way, Alagomeji, Yaba, Lagos',
    latitude: 6.4985,
    longitude: 3.3790,
    createdAt: pastDays(28),
  },
  {
    id: 'ng-lag-25',
    name: 'Nipco Filling Station Oshodi',
    address: 'Oshodi-Apapa Expressway, Oshodi, Lagos',
    latitude: 6.5510,
    longitude: 3.3470,
    createdAt: pastDays(20),
  },
  {
    id: 'ng-lag-30',
    name: 'Forte Oil (Ardova) Apapa',
    address: 'Creek Road, Apapa Industrial Area, Lagos',
    latitude: 6.4410,
    longitude: 3.3620,
    createdAt: pastDays(14),
  },

  // --- ABUJA FEDERAL CAPITAL TERRITORY (FCT) ---
  {
    id: 'ng-abj-37',
    name: 'NNPCL Mega Station Abuja CBD',
    address: 'Olusegun Obasanjo Way, Central Business District, Abuja',
    latitude: 9.0578,
    longitude: 7.4895,
    createdAt: pastDays(45),
  },
  {
    id: 'ng-abj-38',
    name: 'TotalEnergies Wuse 2 Station',
    address: 'Aminu Kano Crescent, Wuse 2, Abuja',
    latitude: 9.0795,
    longitude: 7.4720,
    createdAt: pastDays(40),
  },
  {
    id: 'ng-abj-39',
    name: 'Mobil Service Station Central Area',
    address: 'Herbert Macaulay Way, Central Business District, Abuja',
    latitude: 9.0520,
    longitude: 7.4930,
    createdAt: pastDays(38),
  },
  {
    id: 'ng-abj-40',
    name: 'Conoil Mega Station Area 11 Garki',
    address: 'Ahmadu Bello Way, Area 11, Garki, Abuja',
    latitude: 9.0340,
    longitude: 7.4880,
    createdAt: pastDays(35),
  },
  {
    id: 'ng-abj-41',
    name: 'Oando Service Station Maitama',
    address: 'Shehu Shagari Way, Maitama District, Abuja',
    latitude: 9.0880,
    longitude: 7.4980,
    createdAt: pastDays(30),
  },
  {
    id: 'ng-abj-42',
    name: 'AA Rano Mega Station Jabi',
    address: 'Obafemi Awolowo Way, Jabi District, Abuja',
    latitude: 9.0710,
    longitude: 7.4250,
    createdAt: pastDays(28),
  },
  {
    id: 'ng-abj-43',
    name: 'AYM Shafa Fuel Station Utako',
    address: 'Shehu YarAdua Way, Utako District, Abuja',
    latitude: 9.0620,
    longitude: 7.4410,
    createdAt: pastDays(25),
  },
  {
    id: 'ng-abj-44',
    name: 'NNPCL Retail Airport Road Lugbe',
    address: 'Umaru Musa YarAdua Expressway, Lugbe, Abuja',
    latitude: 8.9860,
    longitude: 7.3780,
    createdAt: pastDays(22),
  },
  {
    id: 'ng-abj-45',
    name: 'Northwest Petroleum Gwarinpa',
    address: '1st Avenue, Gwarinpa Estate, Abuja',
    latitude: 9.1080,
    longitude: 7.4110,
    createdAt: pastDays(20),
  },
  {
    id: 'ng-abj-46',
    name: 'Rainoil Service Station Apo',
    address: 'Apo Mechanic Village Expressway, Apo, Abuja',
    latitude: 9.0080,
    longitude: 7.5020,
    createdAt: pastDays(18),
  },
  {
    id: 'ng-abj-47',
    name: 'MRS Oil Service Station Wuse Zone 5',
    address: 'Dalaba Street, Wuse Zone 5, Abuja',
    latitude: 9.0640,
    longitude: 7.4660,
    createdAt: pastDays(15),
  },
  {
    id: 'ng-abj-48',
    name: 'TotalEnergies Kubwa Expressway',
    address: 'Kubwa-Zuba Expressway, Gwarinpa, Abuja',
    latitude: 9.1220,
    longitude: 7.3790,
    createdAt: pastDays(12),
  },

  // --- PORT HARCOURT, RIVERS STATE ---
  {
    id: 'ng-ph-49',
    name: 'NNPCL Mega Station Port Harcourt',
    address: 'Port Harcourt-Aba Expressway, Rumuokwuta, Port Harcourt',
    latitude: 4.8240,
    longitude: 7.0090,
    createdAt: pastDays(35),
  },
  {
    id: 'ng-ph-50',
    name: 'TotalEnergies Trans-Amadi',
    address: 'Trans-Amadi Industrial Layout, Port Harcourt',
    latitude: 4.8120,
    longitude: 7.0340,
    createdAt: pastDays(30),
  },
  {
    id: 'ng-ph-51',
    name: 'Mobil Service Station GRA Phase 2',
    address: 'Olu Obasanjo Road, GRA Phase 2, Port Harcourt',
    latitude: 4.8210,
    longitude: 6.9980,
    createdAt: pastDays(25),
  },

  // --- IBADAN, OYO STATE ---
  {
    id: 'ng-ib-52',
    name: 'Bovas Petroleum Bodija',
    address: 'Secretariat-Bodija Road, Bodija, Ibadan',
    latitude: 7.4320,
    longitude: 3.9050,
    createdAt: pastDays(35),
  },
  {
    id: 'ng-ib-53',
    name: 'NNPCL Mega Station Iwo Road',
    address: 'Iwo Road Interchange, Ibadan, Oyo',
    latitude: 7.4040,
    longitude: 3.9480,
    createdAt: pastDays(32),
  },
  {
    id: 'ng-ib-54',
    name: 'TotalEnergies Ring Road Ibadan',
    address: 'Ring Road, Challenge Area, Ibadan',
    latitude: 7.3610,
    longitude: 3.8720,
    createdAt: pastDays(28),
  },
  {
    id: 'ng-ib-55',
    name: 'Conoil Service Station Dugbe',
    address: 'Dugbe Commercial District, Ibadan',
    latitude: 7.3880,
    longitude: 3.8860,
    createdAt: pastDays(25),
  },
  {
    id: 'ng-ib-56',
    name: 'Bovas Fuel Station Iwo Road',
    address: 'Old Ife Road, Iwo Road, Ibadan',
    latitude: 7.4100,
    longitude: 3.9390,
    createdAt: pastDays(22),
  },

  // --- PORT HARCOURT ---
  {
    id: 'ng-ph-57',
    name: 'Conoil Service Station Rumuola',
    address: 'Rumuola Road, Port Harcourt',
    latitude: 4.833,
    longitude: 7.015,
    createdAt: pastDays(25),
  },
  {
    id: 'ng-ph-58',
    name: 'Oando Service Station Peter Odili',
    address: 'Peter Odili Road, Port Harcourt',
    latitude: 4.807,
    longitude: 6.992,
    createdAt: pastDays(8),
  },
  {
    id: 'ng-ph-59',
    name: 'Total Energies Aba Road',
    address: 'Aba Road, Port Harcourt',
    latitude: 4.806,
    longitude: 7.02,
    createdAt: pastDays(40),
  },
  {
    id: 'ng-ph-60',
    name: 'NNPCL Mega Station Eleme Junction',
    address: 'East-West Road, Eleme Junction, Port Harcourt',
    latitude: 4.803,
    longitude: 7.098,
    createdAt: pastDays(8),
  },
  {
    id: 'ng-ph-61',
    name: 'MRS Oil Station Rumuokoro',
    address: 'Rumuokoro Junction, Port Harcourt',
    latitude: 4.87,
    longitude: 7.028,
    createdAt: pastDays(14),
  },

  // --- IBADAN ---
  {
    id: 'ng-ib-62',
    name: 'Total Energies Ring Road',
    address: 'Ring Road, Ibadan',
    latitude: 7.369,
    longitude: 3.903,
    createdAt: pastDays(17),
  },
  {
    id: 'ng-ib-63',
    name: 'Conoil Service Station Challenge',
    address: 'Challenge Roundabout, Ibadan',
    latitude: 7.34,
    longitude: 3.887,
    createdAt: pastDays(18),
  },
  {
    id: 'ng-ib-64',
    name: 'NNPCL Mega Station Iwo Road',
    address: 'Iwo Road, Ibadan',
    latitude: 7.406,
    longitude: 3.94,
    createdAt: pastDays(24),
  },

  // --- KANO ---
  {
    id: 'ng-kan-65',
    name: 'NNPCL Mega Station Zoo Road',
    address: 'Zoo Road, Kano',
    latitude: 12.004,
    longitude: 8.55,
    createdAt: pastDays(26),
  },
  {
    id: 'ng-kan-66',
    name: 'Total Energies Murtala Mohammed Way',
    address: 'Murtala Mohammed Way, Kano',
    latitude: 12.0,
    longitude: 8.52,
    createdAt: pastDays(26),
  },
  {
    id: 'ng-kan-67',
    name: 'Oando Service Station Bompai',
    address: 'Bompai Road, Kano',
    latitude: 12.023,
    longitude: 8.561,
    createdAt: pastDays(40),
  },
  {
    id: 'ng-kan-68',
    name: 'MRS Oil Station Hadejia Road',
    address: 'Hadejia Road, Kano',
    latitude: 12.01,
    longitude: 8.54,
    createdAt: pastDays(10),
  },
  {
    id: 'ng-kan-69',
    name: 'Conoil Service Station Gwarzo Road',
    address: 'Gwarzo Road, Kano',
    latitude: 12.035,
    longitude: 8.51,
    createdAt: pastDays(33),
  },

  // --- KADUNA ---
  {
    id: 'ng-kad-70',
    name: 'NNPCL Mega Station Ahmadu Bello Way',
    address: 'Ahmadu Bello Way, Kaduna',
    latitude: 10.524,
    longitude: 7.438,
    createdAt: pastDays(12),
  },
  {
    id: 'ng-kad-71',
    name: 'Total Energies Kachia Road',
    address: 'Kachia Road, Kaduna',
    latitude: 10.478,
    longitude: 7.426,
    createdAt: pastDays(36),
  },
  {
    id: 'ng-kad-72',
    name: 'Oando Service Station Constitution Road',
    address: 'Constitution Road, Kaduna',
    latitude: 10.518,
    longitude: 7.444,
    createdAt: pastDays(13),
  },
  {
    id: 'ng-kad-73',
    name: 'Conoil Service Station Kaduna South',
    address: 'Kaduna South, Kaduna',
    latitude: 10.486,
    longitude: 7.415,
    createdAt: pastDays(14),
  },
  {
    id: 'ng-kad-74',
    name: 'MRS Oil Station Rigasa',
    address: 'Rigasa, Kaduna',
    latitude: 10.56,
    longitude: 7.39,
    createdAt: pastDays(36),
  },

  // --- ENUGU ---
  {
    id: 'ng-enu-75',
    name: 'NNPCL Mega Station Abakaliki Road',
    address: 'Abakaliki Road, Enugu',
    latitude: 6.468,
    longitude: 7.556,
    createdAt: pastDays(25),
  },
  {
    id: 'ng-enu-76',
    name: 'Total Energies Ogui Road',
    address: 'Ogui Road, Enugu',
    latitude: 6.454,
    longitude: 7.51,
    createdAt: pastDays(40),
  },
  {
    id: 'ng-enu-77',
    name: 'Oando Service Station Independence Layout',
    address: 'Independence Layout, Enugu',
    latitude: 6.432,
    longitude: 7.503,
    createdAt: pastDays(17),
  },
  {
    id: 'ng-enu-78',
    name: 'Conoil Service Station Garki',
    address: 'Zik Avenue, Enugu',
    latitude: 6.444,
    longitude: 7.497,
    createdAt: pastDays(8),
  },
  {
    id: 'ng-enu-79',
    name: 'MRS Oil Station Ugwuaji',
    address: 'Enugu-Port Harcourt Expressway, Enugu',
    latitude: 6.45,
    longitude: 7.564,
    createdAt: pastDays(28),
  },

  // --- BENIN CITY ---
  {
    id: 'ng-ben-80',
    name: 'NNPCL Mega Station Sapele Road',
    address: 'Sapele Road, Benin City',
    latitude: 6.318,
    longitude: 5.624,
    createdAt: pastDays(21),
  },
  {
    id: 'ng-ben-81',
    name: 'Total Energies Ring Road',
    address: 'Ring Road, Benin City',
    latitude: 6.337,
    longitude: 5.627,
    createdAt: pastDays(36),
  },
  {
    id: 'ng-ben-82',
    name: 'Oando Service Station Airport Road',
    address: 'Airport Road, Benin City',
    latitude: 6.317,
    longitude: 5.598,
    createdAt: pastDays(26),
  },
  {
    id: 'ng-ben-83',
    name: 'Conoil Service Station Uselu',
    address: 'Uselu, Benin City',
    latitude: 6.364,
    longitude: 5.6,
    createdAt: pastDays(38),
  },
  {
    id: 'ng-ben-84',
    name: 'MRS Oil Station Ugbowo',
    address: 'Ugbowo, Benin City',
    latitude: 6.405,
    longitude: 5.62,
    createdAt: pastDays(10),
  },

  // --- ABEOKUTA ---
  {
    id: 'ng-abe-85',
    name: 'NNPCL Mega Station Lagos-Abeokuta Expressway',
    address: 'Lagos-Abeokuta Expressway, Abeokuta',
    latitude: 7.17,
    longitude: 3.33,
    createdAt: pastDays(37),
  },
  {
    id: 'ng-abe-86',
    name: 'Total Energies Kuto',
    address: 'Kuto, Abeokuta',
    latitude: 7.15,
    longitude: 3.35,
    createdAt: pastDays(20),
  },
  {
    id: 'ng-abe-87',
    name: 'Oando Service Station Oke-Ilewo',
    address: 'Oke-Ilewo, Abeokuta',
    latitude: 7.156,
    longitude: 3.34,
    createdAt: pastDays(6),
  },
  {
    id: 'ng-abe-88',
    name: 'Conoil Service Station Panseke',
    address: 'Panseke, Abeokuta',
    latitude: 7.14,
    longitude: 3.36,
    createdAt: pastDays(27),
  },

  // --- OWERRI ---
  {
    id: 'ng-owe-89',
    name: 'NNPCL Mega Station Port Harcourt Road',
    address: 'Port Harcourt Road, Owerri',
    latitude: 5.46,
    longitude: 7.03,
    createdAt: pastDays(35),
  },
  {
    id: 'ng-owe-90',
    name: 'Total Energies Douglas Road',
    address: 'Douglas Road, Owerri',
    latitude: 5.485,
    longitude: 7.035,
    createdAt: pastDays(17),
  },
  {
    id: 'ng-owe-91',
    name: 'Oando Service Station Egbu Road',
    address: 'Egbu Road, Owerri',
    latitude: 5.47,
    longitude: 7.02,
    createdAt: pastDays(30),
  },
  {
    id: 'ng-owe-92',
    name: 'Conoil Service Station Orlu Road',
    address: 'Orlu Road, Owerri',
    latitude: 5.5,
    longitude: 7.025,
    createdAt: pastDays(13),
  },

  // --- JOS ---
  {
    id: 'ng-jos-93',
    name: 'NNPCL Mega Station Bauchi Road',
    address: 'Bauchi Road, Jos',
    latitude: 9.904,
    longitude: 8.88,
    createdAt: pastDays(35),
  },
  {
    id: 'ng-jos-94',
    name: 'Total Energies Rayfield',
    address: 'Rayfield, Jos',
    latitude: 9.88,
    longitude: 8.87,
    createdAt: pastDays(11),
  },
  {
    id: 'ng-jos-95',
    name: 'Oando Service Station Yakubu Gowon Way',
    address: 'Yakubu Gowon Way, Jos',
    latitude: 9.92,
    longitude: 8.89,
    createdAt: pastDays(18),
  },
  {
    id: 'ng-jos-96',
    name: 'Conoil Service Station Zaria Road',
    address: 'Zaria Road, Jos',
    latitude: 9.91,
    longitude: 8.86,
    createdAt: pastDays(31),
  },

  // --- WARRI ---
  {
    id: 'ng-war-97',
    name: 'NNPCL Mega Station Effurun',
    address: 'Effurun Roundabout, Warri',
    latitude: 5.553,
    longitude: 5.79,
    createdAt: pastDays(38),
  },
  {
    id: 'ng-war-98',
    name: 'Total Energies Airport Road',
    address: 'Airport Road, Warri',
    latitude: 5.52,
    longitude: 5.76,
    createdAt: pastDays(33),
  },
  {
    id: 'ng-war-99',
    name: 'Oando Service Station Jakpa Road',
    address: 'Jakpa Road, Warri',
    latitude: 5.56,
    longitude: 5.77,
    createdAt: pastDays(12),
  },
  {
    id: 'ng-war-100',
    name: 'Conoil Service Station Enerhen',
    address: 'Enerhen Junction, Warri',
    latitude: 5.51,
    longitude: 5.75,
    createdAt: pastDays(40),
  },

  // --- CALABAR ---
  {
    id: 'ng-cal-101',
    name: 'NNPCL Mega Station Murtala Mohammed Highway',
    address: 'Murtala Mohammed Highway, Calabar',
    latitude: 4.965,
    longitude: 8.33,
    createdAt: pastDays(40),
  },
  {
    id: 'ng-cal-102',
    name: 'Total Energies Marian Road',
    address: 'Marian Road, Calabar',
    latitude: 4.95,
    longitude: 8.33,
    createdAt: pastDays(17),
  },
  {
    id: 'ng-cal-103',
    name: 'Oando Service Station Atimbo',
    address: 'Atimbo Road, Calabar',
    latitude: 4.98,
    longitude: 8.335,
    createdAt: pastDays(38),
  },
  {
    id: 'ng-cal-104',
    name: 'Conoil Service Station MCC Road',
    address: 'MCC Road, Calabar',
    latitude: 4.97,
    longitude: 8.325,
    createdAt: pastDays(30),
  },

  // --- ILORIN ---
  {
    id: 'ng-ilo-105',
    name: 'NNPCL Mega Station Ibrahim Taiwo Road',
    address: 'Ibrahim Taiwo Road, Ilorin',
    latitude: 8.49,
    longitude: 4.55,
    createdAt: pastDays(24),
  },
  {
    id: 'ng-ilo-106',
    name: 'Total Energies Tanke',
    address: 'Tanke, Ilorin',
    latitude: 8.48,
    longitude: 4.6,
    createdAt: pastDays(21),
  },
  {
    id: 'ng-ilo-107',
    name: 'Oando Service Station Fate Road',
    address: 'Fate Road, Ilorin',
    latitude: 8.47,
    longitude: 4.56,
    createdAt: pastDays(19),
  },
  {
    id: 'ng-ilo-108',
    name: 'Conoil Service Station Ogidi',
    address: 'Ogidi, Ilorin',
    latitude: 8.51,
    longitude: 4.54,
    createdAt: pastDays(10),
  },
];

// Realistic researched prices in Nigerian Naira (PMS Petrol, Diesel AGO, Premium)
export const NIGERIA_SEED_REPORTS: PriceReport[] = [
  // --- LAGOS REPORTS ---
  // NNPCL Ikoyi (NNPCL benchmark retail)
  { id: 'pr-ng-01', stationId: 'ng-lag-01', fuelType: 'petrol', price: 980, reportedBy: 'driver-lagos-01', reportedAt: pastMins(12) },
  { id: 'pr-ng-02', stationId: 'ng-lag-01', fuelType: 'diesel', price: 1390, reportedBy: 'driver-lagos-01', reportedAt: pastMins(15) },
  { id: 'pr-ng-03', stationId: 'ng-lag-01', fuelType: 'premium', price: 1250, reportedBy: 'driver-lagos-01', reportedAt: pastMins(20) },

  // TotalEnergies Falomo
  { id: 'pr-ng-04', stationId: 'ng-lag-02', fuelType: 'petrol', price: 1060, reportedBy: 'driver-lagos-02', reportedAt: pastMins(25) },
  { id: 'pr-ng-05', stationId: 'ng-lag-02', fuelType: 'diesel', price: 1440, reportedBy: 'driver-lagos-02', reportedAt: pastMins(30) },
  { id: 'pr-ng-06', stationId: 'ng-lag-02', fuelType: 'premium', price: 1280, reportedBy: 'driver-lagos-02', reportedAt: pastMins(30) },

  // Mobil VI
  { id: 'pr-ng-07', stationId: 'ng-lag-03', fuelType: 'petrol', price: 1065, reportedBy: 'driver-lagos-03', reportedAt: pastMins(40) },
  { id: 'pr-ng-08', stationId: 'ng-lag-03', fuelType: 'diesel', price: 1450, reportedBy: 'driver-lagos-03', reportedAt: pastMins(45) },
  { id: 'pr-ng-09', stationId: 'ng-lag-03', fuelType: 'premium', price: 1290, reportedBy: 'driver-lagos-03', reportedAt: pastMins(50) },

  // Conoil Marina
  { id: 'pr-ng-10', stationId: 'ng-lag-04', fuelType: 'petrol', price: 1050, reportedBy: 'driver-lagos-04', reportedAt: pastMins(55) },
  { id: 'pr-ng-11', stationId: 'ng-lag-04', fuelType: 'diesel', price: 1430, reportedBy: 'driver-lagos-04', reportedAt: pastMins(60) },

  // Oando VI

  // MRS Lekki Phase 1
  { id: 'pr-ng-14', stationId: 'ng-lag-06', fuelType: 'petrol', price: 1070, reportedBy: 'driver-lagos-06', reportedAt: pastMins(70) },
  { id: 'pr-ng-15', stationId: 'ng-lag-06', fuelType: 'diesel', price: 1460, reportedBy: 'driver-lagos-06', reportedAt: pastMins(75) },

  // TotalEnergies Lekki

  // Pinnacle Lekki (Cheaper independent)

  // Rainoil Agungi

  // Northwest VI

  // NNPCL Oniru

  // Ardova AP Ikoyi

  // NNPCL Maryland (High traffic Mega Station)
  { id: 'pr-ng-28', stationId: 'ng-lag-13', fuelType: 'petrol', price: 980, reportedBy: 'driver-mainland-01', reportedAt: pastMins(8) },
  { id: 'pr-ng-29', stationId: 'ng-lag-13', fuelType: 'diesel', price: 1390, reportedBy: 'driver-mainland-01', reportedAt: pastMins(12) },
  { id: 'pr-ng-30', stationId: 'ng-lag-13', fuelType: 'premium', price: 1250, reportedBy: 'driver-mainland-01', reportedAt: pastMins(15) },

  // TotalEnergies Maryland

  // Mobil Ikeja GRA

  // Conoil Ikeja

  // Bovas Alausa (Famous for fairest pricing)
  { id: 'pr-ng-37', stationId: 'ng-lag-17', fuelType: 'petrol', price: 970, reportedBy: 'driver-mainland-05', reportedAt: pastMins(5) },
  { id: 'pr-ng-38', stationId: 'ng-lag-17', fuelType: 'diesel', price: 1380, reportedBy: 'driver-mainland-05', reportedAt: pastMins(8) },
  { id: 'pr-ng-39', stationId: 'ng-lag-17', fuelType: 'premium', price: 1240, reportedBy: 'driver-mainland-05', reportedAt: pastMins(10) },

  // TotalEnergies Ikeja Along

  // NNPCL Anthony

  // Mobil Yaba
  { id: 'pr-ng-44', stationId: 'ng-lag-20', fuelType: 'petrol', price: 1065, reportedBy: 'driver-mainland-08', reportedAt: pastMins(50) },
  { id: 'pr-ng-45', stationId: 'ng-lag-20', fuelType: 'diesel', price: 1450, reportedBy: 'driver-mainland-08', reportedAt: pastMins(55) },

  // TotalEnergies Sabo Yaba

  // Oando Surulere

  // MRS Ojuelegba

  // Ardova AP Surulere

  // Nipco Oshodi
  { id: 'pr-ng-54', stationId: 'ng-lag-25', fuelType: 'petrol', price: 1045, reportedBy: 'driver-mainland-13', reportedAt: pastMins(40) },
  { id: 'pr-ng-55', stationId: 'ng-lag-25', fuelType: 'diesel', price: 1425, reportedBy: 'driver-mainland-13', reportedAt: pastMins(45) },

  // Rainoil Ojota

  // Northwest Gbagada

  // Fatgbems Ilupeju

  // Matrix Festac

  // Forte Oil Apapa
  { id: 'pr-ng-64', stationId: 'ng-lag-30', fuelType: 'petrol', price: 1060, reportedBy: 'driver-mainland-18', reportedAt: pastMins(110) },
  { id: 'pr-ng-65', stationId: 'ng-lag-30', fuelType: 'diesel', price: 1440, reportedBy: 'driver-mainland-18', reportedAt: pastMins(115) },

  // TotalEnergies Apapa Wharf

  // NNPCL Magodo

  // Petrocam Ketu

  // Bovas Ikorodu

  // Ascon Lekki

  // Hyde Energy Sangotedo

  // --- ABUJA REPORTS ---
  // NNPCL Mega Station Abuja CBD
  { id: 'pr-ng-78', stationId: 'ng-abj-37', fuelType: 'petrol', price: 1040, reportedBy: 'driver-abuja-01', reportedAt: pastMins(10) },
  { id: 'pr-ng-79', stationId: 'ng-abj-37', fuelType: 'diesel', price: 1420, reportedBy: 'driver-abuja-01', reportedAt: pastMins(15) },
  { id: 'pr-ng-80', stationId: 'ng-abj-37', fuelType: 'premium', price: 1270, reportedBy: 'driver-abuja-01', reportedAt: pastMins(20) },

  // TotalEnergies Wuse 2
  { id: 'pr-ng-81', stationId: 'ng-abj-38', fuelType: 'petrol', price: 1080, reportedBy: 'driver-abuja-02', reportedAt: pastMins(30) },
  { id: 'pr-ng-82', stationId: 'ng-abj-38', fuelType: 'diesel', price: 1460, reportedBy: 'driver-abuja-02', reportedAt: pastMins(35) },
  { id: 'pr-ng-83', stationId: 'ng-abj-38', fuelType: 'premium', price: 1300, reportedBy: 'driver-abuja-02', reportedAt: pastMins(35) },

  // Mobil Central Area
  { id: 'pr-ng-84', stationId: 'ng-abj-39', fuelType: 'petrol', price: 1085, reportedBy: 'driver-abuja-03', reportedAt: pastMins(40) },
  { id: 'pr-ng-85', stationId: 'ng-abj-39', fuelType: 'diesel', price: 1465, reportedBy: 'driver-abuja-03', reportedAt: pastMins(45) },

  // Conoil Area 11 Garki
  { id: 'pr-ng-86', stationId: 'ng-abj-40', fuelType: 'petrol', price: 1070, reportedBy: 'driver-abuja-04', reportedAt: pastMins(50) },
  { id: 'pr-ng-87', stationId: 'ng-abj-40', fuelType: 'diesel', price: 1450, reportedBy: 'driver-abuja-04', reportedAt: pastMins(55) },

  // Oando Maitama
  { id: 'pr-ng-88', stationId: 'ng-abj-41', fuelType: 'petrol', price: 1080, reportedBy: 'driver-abuja-05', reportedAt: pastMins(25) },
  { id: 'pr-ng-89', stationId: 'ng-abj-41', fuelType: 'diesel', price: 1460, reportedBy: 'driver-abuja-05', reportedAt: pastMins(30) },

  // AA Rano Jabi
  { id: 'pr-ng-90', stationId: 'ng-abj-42', fuelType: 'petrol', price: 1050, reportedBy: 'driver-abuja-06', reportedAt: pastMins(35) },
  { id: 'pr-ng-91', stationId: 'ng-abj-42', fuelType: 'diesel', price: 1430, reportedBy: 'driver-abuja-06', reportedAt: pastMins(40) },

  // AYM Shafa Utako
  { id: 'pr-ng-92', stationId: 'ng-abj-43', fuelType: 'petrol', price: 1045, reportedBy: 'driver-abuja-07', reportedAt: pastMins(42) },
  { id: 'pr-ng-93', stationId: 'ng-abj-43', fuelType: 'diesel', price: 1425, reportedBy: 'driver-abuja-07', reportedAt: pastMins(48) },

  // NNPCL Airport Road Lugbe
  { id: 'pr-ng-94', stationId: 'ng-abj-44', fuelType: 'petrol', price: 1040, reportedBy: 'driver-abuja-08', reportedAt: pastMins(12) },
  { id: 'pr-ng-95', stationId: 'ng-abj-44', fuelType: 'diesel', price: 1420, reportedBy: 'driver-abuja-08', reportedAt: pastMins(16) },

  // Northwest Gwarinpa
  { id: 'pr-ng-96', stationId: 'ng-abj-45', fuelType: 'petrol', price: 1050, reportedBy: 'driver-abuja-09', reportedAt: pastMins(55) },
  { id: 'pr-ng-97', stationId: 'ng-abj-45', fuelType: 'diesel', price: 1430, reportedBy: 'driver-abuja-09', reportedAt: pastMins(60) },

  // Rainoil Apo
  { id: 'pr-ng-98', stationId: 'ng-abj-46', fuelType: 'petrol', price: 1060, reportedBy: 'driver-abuja-10', reportedAt: pastMins(65) },
  { id: 'pr-ng-99', stationId: 'ng-abj-46', fuelType: 'diesel', price: 1440, reportedBy: 'driver-abuja-10', reportedAt: pastMins(70) },

  // MRS Wuse Zone 5
  { id: 'pr-ng-100', stationId: 'ng-abj-47', fuelType: 'petrol', price: 1075, reportedBy: 'driver-abuja-11', reportedAt: pastMins(75) },
  { id: 'pr-ng-101', stationId: 'ng-abj-47', fuelType: 'diesel', price: 1455, reportedBy: 'driver-abuja-11', reportedAt: pastMins(80) },

  // TotalEnergies Kubwa
  { id: 'pr-ng-102', stationId: 'ng-abj-48', fuelType: 'petrol', price: 1080, reportedBy: 'driver-abuja-12', reportedAt: pastMins(85) },
  { id: 'pr-ng-103', stationId: 'ng-abj-48', fuelType: 'diesel', price: 1460, reportedBy: 'driver-abuja-12', reportedAt: pastMins(90) },

  // --- PORT HARCOURT REPORTS ---
  { id: 'pr-ng-104', stationId: 'ng-ph-49', fuelType: 'petrol', price: 1030, reportedBy: 'driver-ph-01', reportedAt: pastMins(20) },
  { id: 'pr-ng-105', stationId: 'ng-ph-49', fuelType: 'diesel', price: 1410, reportedBy: 'driver-ph-01', reportedAt: pastMins(25) },
  { id: 'pr-ng-106', stationId: 'ng-ph-50', fuelType: 'petrol', price: 1070, reportedBy: 'driver-ph-02', reportedAt: pastMins(45) },
  { id: 'pr-ng-107', stationId: 'ng-ph-50', fuelType: 'diesel', price: 1450, reportedBy: 'driver-ph-02', reportedAt: pastMins(50) },
  { id: 'pr-ng-108', stationId: 'ng-ph-51', fuelType: 'petrol', price: 1075, reportedBy: 'driver-ph-03', reportedAt: pastMins(60) },
  { id: 'pr-ng-109', stationId: 'ng-ph-51', fuelType: 'diesel', price: 1455, reportedBy: 'driver-ph-03', reportedAt: pastMins(65) },

  // --- IBADAN REPORTS ---
  { id: 'pr-ng-110', stationId: 'ng-ib-52', fuelType: 'petrol', price: 970, reportedBy: 'driver-ib-01', reportedAt: pastMins(15) },
  { id: 'pr-ng-111', stationId: 'ng-ib-52', fuelType: 'diesel', price: 1380, reportedBy: 'driver-ib-01', reportedAt: pastMins(20) },
  { id: 'pr-ng-112', stationId: 'ng-ib-53', fuelType: 'petrol', price: 985, reportedBy: 'driver-ib-02', reportedAt: pastMins(25) },
  { id: 'pr-ng-113', stationId: 'ng-ib-53', fuelType: 'diesel', price: 1390, reportedBy: 'driver-ib-02', reportedAt: pastMins(30) },
  { id: 'pr-ng-114', stationId: 'ng-ib-54', fuelType: 'petrol', price: 1060, reportedBy: 'driver-ib-03', reportedAt: pastMins(40) },
  { id: 'pr-ng-115', stationId: 'ng-ib-54', fuelType: 'diesel', price: 1440, reportedBy: 'driver-ib-03', reportedAt: pastMins(45) },
  { id: 'pr-ng-116', stationId: 'ng-ib-55', fuelType: 'petrol', price: 1050, reportedBy: 'driver-ib-04', reportedAt: pastMins(50) },
  { id: 'pr-ng-117', stationId: 'ng-ib-55', fuelType: 'diesel', price: 1430, reportedBy: 'driver-ib-04', reportedAt: pastMins(55) },
  { id: 'pr-ng-118', stationId: 'ng-ib-56', fuelType: 'petrol', price: 970, reportedBy: 'driver-ib-05', reportedAt: pastMins(30) },
  { id: 'pr-ng-119', stationId: 'ng-ib-56', fuelType: 'diesel', price: 1380, reportedBy: 'driver-ib-05', reportedAt: pastMins(35) },

  // --- OTHER CITIES REPORTS ---
  { id: 'pr-ng-120', stationId: 'ng-ph-57', fuelType: 'petrol', price: 1000, reportedBy: 'driver-ph-57', reportedAt: pastMins(176) },
  { id: 'pr-ng-121', stationId: 'ng-ph-57', fuelType: 'diesel', price: 1369, reportedBy: 'driver-ph-57', reportedAt: pastMins(28) },
  { id: 'pr-ng-122', stationId: 'ng-ph-57', fuelType: 'premium', price: 1211, reportedBy: 'driver-ph-57', reportedAt: pastMins(103) },
  { id: 'pr-ng-123', stationId: 'ng-ph-58', fuelType: 'petrol', price: 1085, reportedBy: 'driver-ph-58', reportedAt: pastMins(19) },
  { id: 'pr-ng-124', stationId: 'ng-ph-58', fuelType: 'diesel', price: 1461, reportedBy: 'driver-ph-58', reportedAt: pastMins(121) },
  { id: 'pr-ng-125', stationId: 'ng-ph-58', fuelType: 'premium', price: 1306, reportedBy: 'driver-ph-58', reportedAt: pastMins(33) },
  { id: 'pr-ng-126', stationId: 'ng-ph-59', fuelType: 'petrol', price: 1059, reportedBy: 'driver-ph-59', reportedAt: pastMins(221) },
  { id: 'pr-ng-127', stationId: 'ng-ph-59', fuelType: 'diesel', price: 1456, reportedBy: 'driver-ph-59', reportedAt: pastMins(41) },
  { id: 'pr-ng-128', stationId: 'ng-ph-59', fuelType: 'premium', price: 1298, reportedBy: 'driver-ph-59', reportedAt: pastMins(170) },
  { id: 'pr-ng-129', stationId: 'ng-ph-60', fuelType: 'petrol', price: 1052, reportedBy: 'driver-ph-60', reportedAt: pastMins(66) },
  { id: 'pr-ng-130', stationId: 'ng-ph-60', fuelType: 'diesel', price: 1432, reportedBy: 'driver-ph-60', reportedAt: pastMins(152) },
  { id: 'pr-ng-131', stationId: 'ng-ph-60', fuelType: 'premium', price: 1280, reportedBy: 'driver-ph-60', reportedAt: pastMins(117) },
  { id: 'pr-ng-132', stationId: 'ng-ph-61', fuelType: 'petrol', price: 998, reportedBy: 'driver-ph-61', reportedAt: pastMins(88) },
  { id: 'pr-ng-133', stationId: 'ng-ph-61', fuelType: 'diesel', price: 1377, reportedBy: 'driver-ph-61', reportedAt: pastMins(218) },
  { id: 'pr-ng-134', stationId: 'ng-ph-61', fuelType: 'premium', price: 1203, reportedBy: 'driver-ph-61', reportedAt: pastMins(158) },
  { id: 'pr-ng-135', stationId: 'ng-ib-62', fuelType: 'petrol', price: 1048, reportedBy: 'driver-ib-62', reportedAt: pastMins(150) },
  { id: 'pr-ng-136', stationId: 'ng-ib-62', fuelType: 'diesel', price: 1427, reportedBy: 'driver-ib-62', reportedAt: pastMins(154) },
  { id: 'pr-ng-137', stationId: 'ng-ib-63', fuelType: 'petrol', price: 1094, reportedBy: 'driver-ib-63', reportedAt: pastMins(119) },
  { id: 'pr-ng-138', stationId: 'ng-ib-63', fuelType: 'diesel', price: 1467, reportedBy: 'driver-ib-63', reportedAt: pastMins(129) },
  { id: 'pr-ng-139', stationId: 'ng-ib-63', fuelType: 'premium', price: 1311, reportedBy: 'driver-ib-63', reportedAt: pastMins(102) },
  { id: 'pr-ng-140', stationId: 'ng-ib-64', fuelType: 'petrol', price: 1018, reportedBy: 'driver-ib-64', reportedAt: pastMins(188) },
  { id: 'pr-ng-141', stationId: 'ng-ib-64', fuelType: 'diesel', price: 1400, reportedBy: 'driver-ib-64', reportedAt: pastMins(30) },
  { id: 'pr-ng-142', stationId: 'ng-ib-64', fuelType: 'premium', price: 1249, reportedBy: 'driver-ib-64', reportedAt: pastMins(136) },
  { id: 'pr-ng-143', stationId: 'ng-kan-65', fuelType: 'petrol', price: 1073, reportedBy: 'driver-kan-65', reportedAt: pastMins(165) },
  { id: 'pr-ng-144', stationId: 'ng-kan-65', fuelType: 'diesel', price: 1446, reportedBy: 'driver-kan-65', reportedAt: pastMins(40) },
  { id: 'pr-ng-145', stationId: 'ng-kan-65', fuelType: 'premium', price: 1289, reportedBy: 'driver-kan-65', reportedAt: pastMins(203) },
  { id: 'pr-ng-146', stationId: 'ng-kan-66', fuelType: 'petrol', price: 1003, reportedBy: 'driver-kan-66', reportedAt: pastMins(117) },
  { id: 'pr-ng-147', stationId: 'ng-kan-66', fuelType: 'diesel', price: 1369, reportedBy: 'driver-kan-66', reportedAt: pastMins(181) },
  { id: 'pr-ng-148', stationId: 'ng-kan-67', fuelType: 'petrol', price: 1040, reportedBy: 'driver-kan-67', reportedAt: pastMins(187) },
  { id: 'pr-ng-149', stationId: 'ng-kan-67', fuelType: 'diesel', price: 1421, reportedBy: 'driver-kan-67', reportedAt: pastMins(162) },
  { id: 'pr-ng-150', stationId: 'ng-kan-67', fuelType: 'premium', price: 1264, reportedBy: 'driver-kan-67', reportedAt: pastMins(27) },
  { id: 'pr-ng-151', stationId: 'ng-kan-68', fuelType: 'petrol', price: 1034, reportedBy: 'driver-kan-68', reportedAt: pastMins(188) },
  { id: 'pr-ng-152', stationId: 'ng-kan-68', fuelType: 'diesel', price: 1401, reportedBy: 'driver-kan-68', reportedAt: pastMins(25) },
  { id: 'pr-ng-153', stationId: 'ng-kan-68', fuelType: 'premium', price: 1248, reportedBy: 'driver-kan-68', reportedAt: pastMins(175) },
  { id: 'pr-ng-154', stationId: 'ng-kan-69', fuelType: 'petrol', price: 1034, reportedBy: 'driver-kan-69', reportedAt: pastMins(237) },
  { id: 'pr-ng-155', stationId: 'ng-kan-69', fuelType: 'diesel', price: 1413, reportedBy: 'driver-kan-69', reportedAt: pastMins(15) },
  { id: 'pr-ng-156', stationId: 'ng-kan-69', fuelType: 'premium', price: 1253, reportedBy: 'driver-kan-69', reportedAt: pastMins(53) },
  { id: 'pr-ng-157', stationId: 'ng-kad-70', fuelType: 'petrol', price: 1077, reportedBy: 'driver-kad-70', reportedAt: pastMins(65) },
  { id: 'pr-ng-158', stationId: 'ng-kad-70', fuelType: 'diesel', price: 1465, reportedBy: 'driver-kad-70', reportedAt: pastMins(43) },
  { id: 'pr-ng-159', stationId: 'ng-kad-70', fuelType: 'premium', price: 1308, reportedBy: 'driver-kad-70', reportedAt: pastMins(110) },
  { id: 'pr-ng-160', stationId: 'ng-kad-71', fuelType: 'petrol', price: 975, reportedBy: 'driver-kad-71', reportedAt: pastMins(124) },
  { id: 'pr-ng-161', stationId: 'ng-kad-71', fuelType: 'diesel', price: 1362, reportedBy: 'driver-kad-71', reportedAt: pastMins(150) },
  { id: 'pr-ng-162', stationId: 'ng-kad-72', fuelType: 'petrol', price: 1077, reportedBy: 'driver-kad-72', reportedAt: pastMins(81) },
  { id: 'pr-ng-163', stationId: 'ng-kad-72', fuelType: 'diesel', price: 1453, reportedBy: 'driver-kad-72', reportedAt: pastMins(101) },
  { id: 'pr-ng-164', stationId: 'ng-kad-72', fuelType: 'premium', price: 1292, reportedBy: 'driver-kad-72', reportedAt: pastMins(69) },
  { id: 'pr-ng-165', stationId: 'ng-kad-73', fuelType: 'petrol', price: 976, reportedBy: 'driver-kad-73', reportedAt: pastMins(48) },
  { id: 'pr-ng-166', stationId: 'ng-kad-73', fuelType: 'diesel', price: 1358, reportedBy: 'driver-kad-73', reportedAt: pastMins(178) },
  { id: 'pr-ng-167', stationId: 'ng-kad-74', fuelType: 'petrol', price: 1004, reportedBy: 'driver-kad-74', reportedAt: pastMins(82) },
  { id: 'pr-ng-168', stationId: 'ng-kad-74', fuelType: 'diesel', price: 1376, reportedBy: 'driver-kad-74', reportedAt: pastMins(47) },
  { id: 'pr-ng-169', stationId: 'ng-kad-74', fuelType: 'premium', price: 1227, reportedBy: 'driver-kad-74', reportedAt: pastMins(166) },
  { id: 'pr-ng-170', stationId: 'ng-enu-75', fuelType: 'petrol', price: 998, reportedBy: 'driver-enu-75', reportedAt: pastMins(168) },
  { id: 'pr-ng-171', stationId: 'ng-enu-75', fuelType: 'diesel', price: 1382, reportedBy: 'driver-enu-75', reportedAt: pastMins(183) },
  { id: 'pr-ng-172', stationId: 'ng-enu-75', fuelType: 'premium', price: 1216, reportedBy: 'driver-enu-75', reportedAt: pastMins(240) },
  { id: 'pr-ng-173', stationId: 'ng-enu-76', fuelType: 'petrol', price: 1062, reportedBy: 'driver-enu-76', reportedAt: pastMins(112) },
  { id: 'pr-ng-174', stationId: 'ng-enu-76', fuelType: 'diesel', price: 1442, reportedBy: 'driver-enu-76', reportedAt: pastMins(36) },
  { id: 'pr-ng-175', stationId: 'ng-enu-76', fuelType: 'premium', price: 1282, reportedBy: 'driver-enu-76', reportedAt: pastMins(25) },
  { id: 'pr-ng-176', stationId: 'ng-enu-77', fuelType: 'petrol', price: 973, reportedBy: 'driver-enu-77', reportedAt: pastMins(122) },
  { id: 'pr-ng-177', stationId: 'ng-enu-77', fuelType: 'diesel', price: 1352, reportedBy: 'driver-enu-77', reportedAt: pastMins(38) },
  { id: 'pr-ng-178', stationId: 'ng-enu-78', fuelType: 'petrol', price: 976, reportedBy: 'driver-enu-78', reportedAt: pastMins(155) },
  { id: 'pr-ng-179', stationId: 'ng-enu-78', fuelType: 'diesel', price: 1360, reportedBy: 'driver-enu-78', reportedAt: pastMins(147) },
  { id: 'pr-ng-180', stationId: 'ng-enu-79', fuelType: 'petrol', price: 958, reportedBy: 'driver-enu-79', reportedAt: pastMins(233) },
  { id: 'pr-ng-181', stationId: 'ng-enu-79', fuelType: 'diesel', price: 1342, reportedBy: 'driver-enu-79', reportedAt: pastMins(167) },
  { id: 'pr-ng-182', stationId: 'ng-ben-80', fuelType: 'petrol', price: 1057, reportedBy: 'driver-ben-80', reportedAt: pastMins(103) },
  { id: 'pr-ng-183', stationId: 'ng-ben-80', fuelType: 'diesel', price: 1433, reportedBy: 'driver-ben-80', reportedAt: pastMins(41) },
  { id: 'pr-ng-184', stationId: 'ng-ben-81', fuelType: 'petrol', price: 1084, reportedBy: 'driver-ben-81', reportedAt: pastMins(133) },
  { id: 'pr-ng-185', stationId: 'ng-ben-81', fuelType: 'diesel', price: 1458, reportedBy: 'driver-ben-81', reportedAt: pastMins(31) },
  { id: 'pr-ng-186', stationId: 'ng-ben-82', fuelType: 'petrol', price: 1032, reportedBy: 'driver-ben-82', reportedAt: pastMins(222) },
  { id: 'pr-ng-187', stationId: 'ng-ben-82', fuelType: 'diesel', price: 1402, reportedBy: 'driver-ben-82', reportedAt: pastMins(142) },
  { id: 'pr-ng-188', stationId: 'ng-ben-83', fuelType: 'petrol', price: 1046, reportedBy: 'driver-ben-83', reportedAt: pastMins(186) },
  { id: 'pr-ng-189', stationId: 'ng-ben-83', fuelType: 'diesel', price: 1439, reportedBy: 'driver-ben-83', reportedAt: pastMins(16) },
  { id: 'pr-ng-190', stationId: 'ng-ben-83', fuelType: 'premium', price: 1271, reportedBy: 'driver-ben-83', reportedAt: pastMins(174) },
  { id: 'pr-ng-191', stationId: 'ng-ben-84', fuelType: 'petrol', price: 1032, reportedBy: 'driver-ben-84', reportedAt: pastMins(103) },
  { id: 'pr-ng-192', stationId: 'ng-ben-84', fuelType: 'diesel', price: 1401, reportedBy: 'driver-ben-84', reportedAt: pastMins(101) },
  { id: 'pr-ng-193', stationId: 'ng-ben-84', fuelType: 'premium', price: 1253, reportedBy: 'driver-ben-84', reportedAt: pastMins(148) },
  { id: 'pr-ng-194', stationId: 'ng-abe-85', fuelType: 'petrol', price: 1054, reportedBy: 'driver-abe-85', reportedAt: pastMins(67) },
  { id: 'pr-ng-195', stationId: 'ng-abe-85', fuelType: 'diesel', price: 1433, reportedBy: 'driver-abe-85', reportedAt: pastMins(217) },
  { id: 'pr-ng-196', stationId: 'ng-abe-85', fuelType: 'premium', price: 1260, reportedBy: 'driver-abe-85', reportedAt: pastMins(216) },
  { id: 'pr-ng-197', stationId: 'ng-abe-86', fuelType: 'petrol', price: 1059, reportedBy: 'driver-abe-86', reportedAt: pastMins(61) },
  { id: 'pr-ng-198', stationId: 'ng-abe-86', fuelType: 'diesel', price: 1448, reportedBy: 'driver-abe-86', reportedAt: pastMins(136) },
  { id: 'pr-ng-199', stationId: 'ng-abe-87', fuelType: 'petrol', price: 965, reportedBy: 'driver-abe-87', reportedAt: pastMins(130) },
  { id: 'pr-ng-200', stationId: 'ng-abe-87', fuelType: 'diesel', price: 1345, reportedBy: 'driver-abe-87', reportedAt: pastMins(59) },
  { id: 'pr-ng-201', stationId: 'ng-abe-87', fuelType: 'premium', price: 1188, reportedBy: 'driver-abe-87', reportedAt: pastMins(124) },
  { id: 'pr-ng-202', stationId: 'ng-abe-88', fuelType: 'petrol', price: 1045, reportedBy: 'driver-abe-88', reportedAt: pastMins(66) },
  { id: 'pr-ng-203', stationId: 'ng-abe-88', fuelType: 'diesel', price: 1426, reportedBy: 'driver-abe-88', reportedAt: pastMins(68) },
  { id: 'pr-ng-204', stationId: 'ng-abe-88', fuelType: 'premium', price: 1273, reportedBy: 'driver-abe-88', reportedAt: pastMins(62) },
  { id: 'pr-ng-205', stationId: 'ng-owe-89', fuelType: 'petrol', price: 965, reportedBy: 'driver-owe-89', reportedAt: pastMins(177) },
  { id: 'pr-ng-206', stationId: 'ng-owe-89', fuelType: 'diesel', price: 1341, reportedBy: 'driver-owe-89', reportedAt: pastMins(214) },
  { id: 'pr-ng-207', stationId: 'ng-owe-89', fuelType: 'premium', price: 1173, reportedBy: 'driver-owe-89', reportedAt: pastMins(109) },
  { id: 'pr-ng-208', stationId: 'ng-owe-90', fuelType: 'petrol', price: 1077, reportedBy: 'driver-owe-90', reportedAt: pastMins(121) },
  { id: 'pr-ng-209', stationId: 'ng-owe-90', fuelType: 'diesel', price: 1472, reportedBy: 'driver-owe-90', reportedAt: pastMins(95) },
  { id: 'pr-ng-210', stationId: 'ng-owe-91', fuelType: 'petrol', price: 1080, reportedBy: 'driver-owe-91', reportedAt: pastMins(200) },
  { id: 'pr-ng-211', stationId: 'ng-owe-91', fuelType: 'diesel', price: 1450, reportedBy: 'driver-owe-91', reportedAt: pastMins(195) },
  { id: 'pr-ng-212', stationId: 'ng-owe-92', fuelType: 'petrol', price: 961, reportedBy: 'driver-owe-92', reportedAt: pastMins(161) },
  { id: 'pr-ng-213', stationId: 'ng-owe-92', fuelType: 'diesel', price: 1351, reportedBy: 'driver-owe-92', reportedAt: pastMins(216) },
  { id: 'pr-ng-214', stationId: 'ng-owe-92', fuelType: 'premium', price: 1196, reportedBy: 'driver-owe-92', reportedAt: pastMins(221) },
  { id: 'pr-ng-215', stationId: 'ng-jos-93', fuelType: 'petrol', price: 1043, reportedBy: 'driver-jos-93', reportedAt: pastMins(150) },
  { id: 'pr-ng-216', stationId: 'ng-jos-93', fuelType: 'diesel', price: 1436, reportedBy: 'driver-jos-93', reportedAt: pastMins(43) },
  { id: 'pr-ng-217', stationId: 'ng-jos-94', fuelType: 'petrol', price: 998, reportedBy: 'driver-jos-94', reportedAt: pastMins(233) },
  { id: 'pr-ng-218', stationId: 'ng-jos-94', fuelType: 'diesel', price: 1371, reportedBy: 'driver-jos-94', reportedAt: pastMins(221) },
  { id: 'pr-ng-219', stationId: 'ng-jos-94', fuelType: 'premium', price: 1205, reportedBy: 'driver-jos-94', reportedAt: pastMins(74) },
  { id: 'pr-ng-220', stationId: 'ng-jos-95', fuelType: 'petrol', price: 1040, reportedBy: 'driver-jos-95', reportedAt: pastMins(71) },
  { id: 'pr-ng-221', stationId: 'ng-jos-95', fuelType: 'diesel', price: 1422, reportedBy: 'driver-jos-95', reportedAt: pastMins(93) },
  { id: 'pr-ng-222', stationId: 'ng-jos-96', fuelType: 'petrol', price: 984, reportedBy: 'driver-jos-96', reportedAt: pastMins(199) },
  { id: 'pr-ng-223', stationId: 'ng-jos-96', fuelType: 'diesel', price: 1374, reportedBy: 'driver-jos-96', reportedAt: pastMins(239) },
  { id: 'pr-ng-224', stationId: 'ng-jos-96', fuelType: 'premium', price: 1221, reportedBy: 'driver-jos-96', reportedAt: pastMins(218) },
  { id: 'pr-ng-225', stationId: 'ng-war-97', fuelType: 'petrol', price: 1073, reportedBy: 'driver-war-97', reportedAt: pastMins(43) },
  { id: 'pr-ng-226', stationId: 'ng-war-97', fuelType: 'diesel', price: 1454, reportedBy: 'driver-war-97', reportedAt: pastMins(48) },
  { id: 'pr-ng-227', stationId: 'ng-war-97', fuelType: 'premium', price: 1277, reportedBy: 'driver-war-97', reportedAt: pastMins(233) },
  { id: 'pr-ng-228', stationId: 'ng-war-98', fuelType: 'petrol', price: 1015, reportedBy: 'driver-war-98', reportedAt: pastMins(11) },
  { id: 'pr-ng-229', stationId: 'ng-war-98', fuelType: 'diesel', price: 1380, reportedBy: 'driver-war-98', reportedAt: pastMins(54) },
  { id: 'pr-ng-230', stationId: 'ng-war-99', fuelType: 'petrol', price: 975, reportedBy: 'driver-war-99', reportedAt: pastMins(184) },
  { id: 'pr-ng-231', stationId: 'ng-war-99', fuelType: 'diesel', price: 1361, reportedBy: 'driver-war-99', reportedAt: pastMins(145) },
  { id: 'pr-ng-232', stationId: 'ng-war-99', fuelType: 'premium', price: 1188, reportedBy: 'driver-war-99', reportedAt: pastMins(236) },
  { id: 'pr-ng-233', stationId: 'ng-war-100', fuelType: 'petrol', price: 971, reportedBy: 'driver-war-100', reportedAt: pastMins(58) },
  { id: 'pr-ng-234', stationId: 'ng-war-100', fuelType: 'diesel', price: 1352, reportedBy: 'driver-war-100', reportedAt: pastMins(20) },
  { id: 'pr-ng-235', stationId: 'ng-war-100', fuelType: 'premium', price: 1200, reportedBy: 'driver-war-100', reportedAt: pastMins(125) },
  { id: 'pr-ng-236', stationId: 'ng-cal-101', fuelType: 'petrol', price: 959, reportedBy: 'driver-cal-101', reportedAt: pastMins(123) },
  { id: 'pr-ng-237', stationId: 'ng-cal-101', fuelType: 'diesel', price: 1347, reportedBy: 'driver-cal-101', reportedAt: pastMins(166) },
  { id: 'pr-ng-238', stationId: 'ng-cal-101', fuelType: 'premium', price: 1196, reportedBy: 'driver-cal-101', reportedAt: pastMins(141) },
  { id: 'pr-ng-239', stationId: 'ng-cal-102', fuelType: 'petrol', price: 1034, reportedBy: 'driver-cal-102', reportedAt: pastMins(140) },
  { id: 'pr-ng-240', stationId: 'ng-cal-102', fuelType: 'diesel', price: 1417, reportedBy: 'driver-cal-102', reportedAt: pastMins(216) },
  { id: 'pr-ng-241', stationId: 'ng-cal-102', fuelType: 'premium', price: 1247, reportedBy: 'driver-cal-102', reportedAt: pastMins(188) },
  { id: 'pr-ng-242', stationId: 'ng-cal-103', fuelType: 'petrol', price: 1033, reportedBy: 'driver-cal-103', reportedAt: pastMins(238) },
  { id: 'pr-ng-243', stationId: 'ng-cal-103', fuelType: 'diesel', price: 1402, reportedBy: 'driver-cal-103', reportedAt: pastMins(225) },
  { id: 'pr-ng-244', stationId: 'ng-cal-103', fuelType: 'premium', price: 1249, reportedBy: 'driver-cal-103', reportedAt: pastMins(41) },
  { id: 'pr-ng-245', stationId: 'ng-cal-104', fuelType: 'petrol', price: 1073, reportedBy: 'driver-cal-104', reportedAt: pastMins(28) },
  { id: 'pr-ng-246', stationId: 'ng-cal-104', fuelType: 'diesel', price: 1450, reportedBy: 'driver-cal-104', reportedAt: pastMins(119) },
  { id: 'pr-ng-247', stationId: 'ng-ilo-105', fuelType: 'petrol', price: 985, reportedBy: 'driver-ilo-105', reportedAt: pastMins(193) },
  { id: 'pr-ng-248', stationId: 'ng-ilo-105', fuelType: 'diesel', price: 1381, reportedBy: 'driver-ilo-105', reportedAt: pastMins(179) },
  { id: 'pr-ng-249', stationId: 'ng-ilo-106', fuelType: 'petrol', price: 999, reportedBy: 'driver-ilo-106', reportedAt: pastMins(66) },
  { id: 'pr-ng-250', stationId: 'ng-ilo-106', fuelType: 'diesel', price: 1368, reportedBy: 'driver-ilo-106', reportedAt: pastMins(111) },
  { id: 'pr-ng-251', stationId: 'ng-ilo-106', fuelType: 'premium', price: 1210, reportedBy: 'driver-ilo-106', reportedAt: pastMins(180) },
  { id: 'pr-ng-252', stationId: 'ng-ilo-107', fuelType: 'petrol', price: 1004, reportedBy: 'driver-ilo-107', reportedAt: pastMins(141) },
  { id: 'pr-ng-253', stationId: 'ng-ilo-107', fuelType: 'diesel', price: 1383, reportedBy: 'driver-ilo-107', reportedAt: pastMins(96) },
  { id: 'pr-ng-254', stationId: 'ng-ilo-107', fuelType: 'premium', price: 1222, reportedBy: 'driver-ilo-107', reportedAt: pastMins(91) },
  { id: 'pr-ng-255', stationId: 'ng-ilo-108', fuelType: 'petrol', price: 1043, reportedBy: 'driver-ilo-108', reportedAt: pastMins(96) },
  { id: 'pr-ng-256', stationId: 'ng-ilo-108', fuelType: 'diesel', price: 1440, reportedBy: 'driver-ilo-108', reportedAt: pastMins(127) },
  { id: 'pr-ng-257', stationId: 'ng-ilo-108', fuelType: 'premium', price: 1263, reportedBy: 'driver-ilo-108', reportedAt: pastMins(108) },
];

export const NIGERIA_SEED_FLAGS: Flag[] = [
  // NNPCL Maryland has long queue (very popular due to ₦980 pump price)
  {
    id: 'fl-ng-01',
    stationId: 'ng-lag-13',
    type: 'long_queue',
    note: 'Queue stretches past bus stop on Ikorodu road, approx 20 min wait',
    flaggedBy: 'driver-lag-01',
    flaggedAt: pastMins(30),
  },
  {
    id: 'fl-ng-02',
    stationId: 'ng-lag-13',
    type: 'long_queue',
    note: 'Heavy queue, 4 pumps dispensing actively',
    flaggedBy: 'driver-lag-02',
    flaggedAt: pastMins(15),
  },
  // Bovas Alausa has long queue (cheapest price in Alausa at ₦970)
  {
    id: 'fl-ng-03',
    stationId: 'ng-lag-17',
    type: 'long_queue',
    note: 'Orderly queue moving fast, all 6 pumps running',
    flaggedBy: 'driver-lag-03',
    flaggedAt: pastMins(25),
  },
  {
    id: 'fl-ng-04',
    stationId: 'ng-lag-17',
    type: 'long_queue',
    note: '15 min wait for PMS petrol',
    flaggedBy: 'driver-lag-04',
    flaggedAt: pastMins(10),
  },
  // NNPCL CBD Abuja has queue
  {
    id: 'fl-ng-05',
    stationId: 'ng-abj-37',
    type: 'long_queue',
    note: 'Queue on Obasanjo way, tankers currently discharging diesel',
    flaggedBy: 'driver-abj-01',
    flaggedAt: pastMins(40),
  },
  {
    id: 'fl-ng-06',
    stationId: 'ng-abj-37',
    type: 'long_queue',
    note: 'Multiple lines moving steadily',
    flaggedBy: 'driver-abj-02',
    flaggedAt: pastMins(20),
  },
];
