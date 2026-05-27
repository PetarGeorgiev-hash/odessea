import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Review } from '../reviews/review.entity';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  publicId: string;

  @Column({ nullable: true })
  caption: string;

  @ManyToOne(() => Review, (review) => review.photos, { onDelete: 'CASCADE' })
  @JoinColumn()
  review: Review;

  @ManyToOne('User', { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  uploadedBy: any;

  @CreateDateColumn()
  createdAt: Date;
}
