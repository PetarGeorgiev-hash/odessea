import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Review } from '../reviews/review.entity';

export enum SightCategory {
  HISTORY = 'history',
  NATURE = 'nature',
  SEA = 'sea',
  CULTURE = 'culture',
  FOOD = 'food',
  RELIGIOUS = 'religious',
  PARK = 'park',
}

@Entity('sights')
export class Sight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  nameLocal: string;

  @Column('text')
  description: string;

  @Column()
  shortDescription: string;

  @Column({ type: 'enum', enum: SightCategory })
  category: SightCategory;

  @Column('simple-array')
  tags: string[];

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @Column()
  address: string;

  @Column({ nullable: true })
  openingHours: string;

  @Column({ nullable: true })
  entryFee: string;

  @Column({ nullable: true })
  website: string;

  @Column('simple-array', { nullable: true })
  busLines: string[];

  @Column({ default: 0 })
  walkingMinutes: number;

  @Column({ default: 0 })
  drivingMinutes: number;

  @Column({ default: false })
  isVerified: boolean;

  @ManyToOne(() => User, (user) => user.sights, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  createdBy: User;

  @OneToMany(() => Review, (review) => review.sight)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
