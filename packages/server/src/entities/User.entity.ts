import JWT from '../lib/jwt';
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
import AuthToken from './AuthToken.entity';

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
    const authToken = new AuthToken();
    authToken.fk_user_id = this.id;
    await getRepository(AuthToken).save(authToken);

    const secret = JWT.secret();
    const userProfile = await getRepository(UserProfile).findOne({
      fk_user_id: this.id,
    });

    const refreshToken = await JWT.sign(
      {
        id: this.id,
        token: authToken.id,
      },
      secret,
      {
        subject: 'refresh_token',
        expiresIn: '1h',
      }
    );

    const accessToken = await JWT.sign(
      {
        id: this.id,
        user_id: this.id,
        user_email: this.email,
        tag: userProfile!.tag,
      },
      secret,
      {
        subject: 'access_token',
        expiresIn: '1h',
      }
    );

    return { accessToken, refreshToken } as const;
  }
}

export default User;
