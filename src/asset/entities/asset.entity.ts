import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  asset_id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @ManyToOne('Location', 'assets', { onDelete: 'CASCADE' })
  location: any;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}