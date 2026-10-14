export const navGroups = [
  { label: 'Control room', items: [{ id: 'overview', name: 'Overview', n: '01' }, { id: 'security', name: 'Cybersecurity, privacy & resilience', n: '02' }, { id: 'friction', name: 'Operational transport friction', n: '03' }, { id: 'simulator', name: 'Threat × friction', n: '04' }] },
  { label: 'Response', items: [{ id: 'analyst', name: 'AI analyst', n: '05' }, { id: 'alerts', name: 'Alerts & incidents', n: '06' }] },
];
export const sensors = [
  { id: 'SIG-041', type: 'Traffic signal', zone: 'Central / 4th & Pine', status: 'At risk', firmware: '2.4.1 · unsigned', key: 'High', seen: '12 sec ago' },
  { id: 'CAM-108', type: 'Intersection camera', zone: 'North / Mercer', status: 'Healthy', firmware: '5.8.0 · verified', key: 'Low', seen: '18 sec ago' },
  { id: 'PK-223', type: 'Parking sensor', zone: 'Waterfront / Pier 6', status: 'Review', firmware: '1.9.3 · legacy', key: 'Med', seen: '1 min ago' },
  { id: 'SIG-067', type: 'Traffic signal', zone: 'East / 9th & King', status: 'Healthy', firmware: '3.1.0 · verified', key: 'Low', seen: '8 sec ago' },
  { id: 'CAM-052', type: 'Intersection camera', zone: 'South / Alder', status: 'At risk', firmware: '4.2.2 · unsigned', key: 'High', seen: '3 min ago' },
];
export const events = [
  { time: '14:32:08', title: 'Signal authentication failure', detail: 'SIG-041 · Central / 4th & Pine', severity: 'critical' },
  { time: '14:28:41', title: 'GNSS drift above threshold', detail: 'Shuttle corridor C · 4 vehicles', severity: 'high' },
  { time: '14:12:19', title: 'Unusual route divergence', detail: 'Fleet 08 · North district', severity: 'high' },
  { time: '13:56:03', title: 'Legacy protocol detected', detail: 'BACnet gateway · Civic Center', severity: 'medium' },
  { time: '13:41:55', title: 'OTA package signature verified', detail: 'Autonomous fleet · 12 vehicles', severity: 'low' },
];
export const traffic = [
  { time: '06', delay: 8, demand: 46 }, { time: '08', delay: 18, demand: 72 }, { time: '10', delay: 12, demand: 62 }, { time: '12', delay: 15, demand: 67 }, { time: '14', delay: 21, demand: 82 }, { time: '16', delay: 24, demand: 91 }, { time: '18', delay: 17, demand: 75 }, { time: '20', delay: 11, demand: 58 }, { time: '22', delay: 7, demand: 40 },
];
