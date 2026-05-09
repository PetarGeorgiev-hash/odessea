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
import { Sight } from '../sights/sight.entity';
import { Photo } from '../photos/photo.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  text: string;

  @Column('int')
  rating: number; // 1-5

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  author: User;

  @ManyToOne(() => Sight, (sight) => sight.reviews, { onDelete: 'CASCADE' })
  @JoinColumn()
  sight: Sight;

  @OneToMany(() => Photo, (photo) => photo.review, { cascade: true })
  photos: Photo[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
