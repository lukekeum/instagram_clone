import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserProfile from './UserProfile.entity';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  user_id: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Index()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToOne((type) => UserProfile, (profile) => profile.user)
  profile: UserProfile;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
