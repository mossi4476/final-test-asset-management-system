import { DataSource } from 'typeorm';
import { Location } from '../asset/entities/location.entity';
import { Organization } from '../asset/entities/organization.entity';

export const locationSeeds = [
  { location_id: 1, location_name: 'Da Nang', organization_id: 'PNS', status: 'actived' },
  { location_id: 2, location_name: 'Ha Noi', organization_id: 'PNS', status: 'unactive' },
  { location_id: 3, location_name: 'Ho Chi Minh', organization_id: 'PNS', status: 'actived' },
  { location_id: 4, location_name: 'Nha Trang', organization_id: 'PLJ', status: 'actived' },
  { location_id: 5, location_name: 'Can Tho', organization_id: 'PLJ', status: 'actived' },
];

export async function seedLocations(dataSource: DataSource) {
  const locationRepository = dataSource.getRepository(Location);
  const organizationRepository = dataSource.getRepository(Organization);
  
  for (const locationData of locationSeeds) {
    const existingLocation = await locationRepository.findOne({
      where: { location_id: locationData.location_id }
    });
    
    if (!existingLocation) {
      // Find the organization
      const organization = await organizationRepository.findOne({
        where: { organization_id: locationData.organization_id }
      });
      
      if (organization) {
        const location = locationRepository.create({
          location_id: locationData.location_id,
          location_name: locationData.location_name,
          status: locationData.status,
          organization: organization,
        });
        
        await locationRepository.save(location);
        console.log(`Created location: ${locationData.location_name} in ${organization.name}`);
      } else {
        console.log(`Organization ${locationData.organization_id} not found for location ${locationData.location_name}`);
      }
    } else {
      console.log(`Location ${locationData.location_name} already exists`);
    }
  }
} 