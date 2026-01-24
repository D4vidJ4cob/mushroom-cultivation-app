import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthConfig, ServerConfig } from '../config/configuration';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '../type/user';
import { JwtPayload } from '../type/auth';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { LoginRequestDto } from '../session/session.dto';
import { eq } from 'drizzle-orm';
import { users } from '../drizzle/schema';
import { RegisterUserRequestDto } from '../user/user.dto';
import { Role } from './roles';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<ServerConfig>,
    private readonly jwtService: JwtService,
    @InjectDrizzle() private readonly db: DatabaseProvider,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const authConfig = this.configService.get<AuthConfig>('auth')!;

    return await argon2.hash(password, {
      type: argon2.argon2id,
      hashLength: authConfig?.hashLength,
      timeCost: authConfig?.timeCost,
      memoryCost: authConfig?.memoryCost,
    });
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  private signJwt(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });
  }

  async verifyJwt(token: string): Promise<JwtPayload> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

    if (!payload)
      throw new UnauthorizedException('Invalid authentication token');
    return payload;
  }

  async login({ email, password }: LoginRequestDto): Promise<string> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new UnauthorizedException(
        'The given email and password do not match',
      );
    }

    const passwordValid = await this.verifyPassword(
      password,
      user.passwordHash,
    );
    if (!passwordValid)
      throw new UnauthorizedException(
        'The given email and password do not match',
      );
    return this.signJwt(user);
  }

  async register({
    name,
    email,
    password,
  }: RegisterUserRequestDto): Promise<string> {
    const passwordHash = await this.hashPassword(password);

    const [newUser] = await this.db
      .insert(users)
      .values({ name, email, passwordHash, roles: [Role.USER] })
      .returning({ id: users.id });

    const user = await this.db.query.users.findFirst({
      where: eq(users.id, newUser.id),
    });
    return this.signJwt(user!);
  }
}
