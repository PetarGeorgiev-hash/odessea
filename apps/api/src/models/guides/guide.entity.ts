import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Sight } from '../sights/sight.entity';

export enum GuideDifficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  HARD = 'hard',
}

@Entity('guides')
export class Guide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  coverImage: string; // Cloudinary URL

  @Column({ default: 0 })
  durationMinutes: number; // estimated total duration

  @Column({
    type: 'enum',
    enum: GuideDifficulty,
    default: GuideDifficulty.EASY,
  })
  difficulty: GuideDifficulty;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.guides, { onDelete: 'CASCADE' })
  @JoinColumn()
  author: User;

  @ManyToMany(() => Sight)
  @JoinTable({
    name: 'guide_sights',
    joinColumn: { name: 'guideId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'sightId', referencedColumnName: 'id' },
  })
  sights: Sight[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
