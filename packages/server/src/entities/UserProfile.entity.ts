import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User.entity';

@Entity('user_profiles')
class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  tag: string;

  @Index()
  @Column({ type: 'varchar', length: 150, nullable: true })
  short_bio: string | null;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column({ type: 'uuid' })
  fk_user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserProfile;
