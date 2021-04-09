import JWT from '@src/lib/jwt';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  getRepository,
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

  async generateToken() {
    const secret = JWT.secret();

    const accessToken = await JWT.sign(
      {
        id: this.id,
        user_id: this.id,
        user_email: this.email,
        user_tag: this.profile.tag,
      },
      secret,
      {
        subject: 'access_token',
        expiresIn: '7d',
      }
    );

    return { accessToken };
  }
}

export default User;
