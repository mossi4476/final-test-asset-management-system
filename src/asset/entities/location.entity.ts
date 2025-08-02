import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  location_id: number;

  @Column()
  location_name: string;

  @Column()
  organization: string;

  @Column()
  status: string;

  @OneToMany('Asset', 'location')
  assets: any[];
}