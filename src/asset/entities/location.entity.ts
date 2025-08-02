import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  location_id: number;

  @Column()
  location_name: string;

  @Column()
  status: string;

  @ManyToOne('Organization', 'locations', { onDelete: 'CASCADE' })
  organization: any;

  @OneToMany('Asset', 'location')
  assets: any[];

  @OneToMany('Device', 'location')
  devices: any[];
}