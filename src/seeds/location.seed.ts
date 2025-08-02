import { DataSource } from 'typeorm';
import { Location } from '../asset/entities/location.entity';

export const locationSeeds = [
  { location_id: 1, location_name: 'Da Nang', organization: 'PNS', status: 'actived' },
  { location_id: 2, location_name: 'Ha Noi', organization: 'PNS', status: 'unactive' },
  { location_id: 3, location_name: 'Ho Chi Minh', organization: 'PNS', status: 'actived' },
  { location_id: 4, location_name: 'Nha Trang', organization: 'PLJ', status: 'actived' },
  { location_id: 5, location_name: 'Can Tho', organization: 'PLJ', status: 'actived' },
];

export async function seedLocations(dataSource: DataSource) {
  const locationRepository = dataSource.getRepository(Location);
  
  for (const locationData of locationSeeds) {
    const existingLocation = await locationRepository.findOne({
      where: { location_id: locationData.location_id }
    });
    
    if (!existingLocation) {
      const location = locationRepository.create(locationData);
      await locationRepository.save(location);
      console.log(`Created location: ${locationData.location_name}`);
    } else {
      console.log(`Location ${locationData.location_name} already exists`);
    }
  }
} 