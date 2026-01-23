import { Injectable, NotFoundException } from '@nestjs/common';
import {
  UpdateUserRequestDto,
  UserListResponseDto,
  PublicUserResponseDto,
} from './user.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { users } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<UserListResponseDto> {
    const usersList = await this.db.query.users.findMany({
      orderBy: (users, { asc }) => [asc(users.name)],
    });

    const items = usersList.map((user) =>
      plainToInstance(PublicUserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );

    return { items };
  }

  async getById(id: number): Promise<PublicUserResponseDto> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return plainToInstance(PublicUserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async updateById(
    id: number,
    changes: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    const result = await this.db
      .update(users)
      .set(changes)
      .where(eq(users.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.getById(id);
  }
}
