import { DataSource } from 'typeorm';
import { Organization } from '../asset/entities/organization.entity';

export const organizationSeeds = [
  { organization_id: 'PNS', name: 'PNS Corporation', status: 'active' },
  { organization_id: 'PLJ', name: 'PLJ Company', status: 'active' },
];

export async function seedOrganizations(dataSource: DataSource) {
  const organizationRepository = dataSource.getRepository(Organization);
  
  for (const orgData of organizationSeeds) {
    const existingOrg = await organizationRepository.findOne({
      where: { organization_id: orgData.organization_id }
    });
    
    if (!existingOrg) {
      const organization = organizationRepository.create(orgData);
      await organizationRepository.save(organization);
      console.log(`Created organization: ${orgData.name}`);
    } else {
      console.log(`Organization ${orgData.name} already exists`);
    }
  }
} 