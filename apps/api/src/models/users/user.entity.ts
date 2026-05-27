import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Review } from '../reviews/review.entity';
import { Event } from '../events/event.entity';
import { Guide } from '../guides/guide.entity';
import { Sight } from '../sights/sight.entity';
import { Photo } from '../photos/photo.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ default: 'local' })
  provider: string;

  @Column({ nullable: true })
  providerId: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Sight, (sight) => sight.createdBy)
  sights: Sight[];

  @OneToMany(() => Review, (review) => review.author)
  reviews: Review[];

  @OneToMany(() => Event, (event) => event.creator)
  events: Event[];

  @OneToMany(() => Guide, (guide) => guide.author)
  guides: Guide[];

  @OneToMany('Photo', (photo: any) => photo.uploadedBy)
  photos: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
