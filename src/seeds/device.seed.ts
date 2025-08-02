import { DataSource } from 'typeorm';
import { Device } from '../asset/entities/device.entity';
import { Location } from '../asset/entities/location.entity';

export const deviceSeeds = [
  // Da Nang devices
  { device_id: 'DN001', name: 'Laptop Dell XPS 13', type: 'Laptop', status: 'active', location_id: 1 },
  { device_id: 'DN002', name: 'Printer HP LaserJet', type: 'Printer', status: 'active', location_id: 1 },
  { device_id: 'DN003', name: 'Monitor Samsung 24"', type: 'Monitor', status: 'inactive', location_id: 1 },
  
  // Ha Noi devices
  { device_id: 'HN001', name: 'MacBook Pro 16"', type: 'Laptop', status: 'active', location_id: 2 },
  { device_id: 'HN002', name: 'Scanner Canon', type: 'Scanner', status: 'active', location_id: 2 },
  { device_id: 'HN003', name: 'Projector Epson', type: 'Projector', status: 'maintenance', location_id: 2 },
  
  // Ho Chi Minh devices
  { device_id: 'HCM001', name: 'Desktop HP EliteDesk', type: 'Desktop', status: 'active', location_id: 3 },
  { device_id: 'HCM002', name: 'Tablet iPad Pro', type: 'Tablet', status: 'active', location_id: 3 },
  { device_id: 'HCM003', name: 'Server Dell PowerEdge', type: 'Server', status: 'active', location_id: 3 },
  { device_id: 'HCM004', name: 'Switch Cisco Catalyst', type: 'Network', status: 'active', location_id: 3 },
  
  // Nha Trang devices
  { device_id: 'NT001', name: 'Laptop Lenovo ThinkPad', type: 'Laptop', status: 'active', location_id: 4 },
  { device_id: 'NT002', name: 'Printer Brother HL-L2350DW', type: 'Printer', status: 'active', location_id: 4 },
  
  // Can Tho devices
  { device_id: 'CT001', name: 'Desktop Dell OptiPlex', type: 'Desktop', status: 'active', location_id: 5 },
  { device_id: 'CT002', name: 'Monitor LG 27"', type: 'Monitor', status: 'active', location_id: 5 },
  { device_id: 'CT003', name: 'UPS APC Back-UPS', type: 'UPS', status: 'active', location_id: 5 },
];

export async function seedDevices(dataSource: DataSource) {
  const deviceRepository = dataSource.getRepository(Device);
  const locationRepository = dataSource.getRepository(Location);
  
  for (const deviceData of deviceSeeds) {
    const existingDevice = await deviceRepository.findOne({
      where: { device_id: deviceData.device_id }
    });
    
    if (!existingDevice) {
      // Find the location
      const location = await locationRepository.findOne({
        where: { location_id: deviceData.location_id }
      });
      
      if (location) {
        const device = deviceRepository.create({
          device_id: deviceData.device_id,
          name: deviceData.name,
          type: deviceData.type,
          status: deviceData.status,
          location: location,
        });
        
        await deviceRepository.save(device);
        console.log(`Created device: ${deviceData.name} at ${location.location_name}`);
      } else {
        console.log(`Location with ID ${deviceData.location_id} not found for device ${deviceData.name}`);
      }
    } else {
      console.log(`Device ${deviceData.name} already exists`);
    }
  }
} 