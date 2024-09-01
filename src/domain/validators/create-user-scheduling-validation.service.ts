import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { IUserService } from '../interfaces/user-service.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserSchedulingValidationService {
  constructor(
    @Inject('IUserService') private readonly iUserService: IUserService,
  ) {}

  private async doesUserExists(userId: string): Promise<User> {
    const user = await this.iUserService.getById(userId);
    if (!user) {
      throw new NotFoundException('User not found for scheduling');
    }
    return user;
  }

  private async doesUserAlreadyHasScheduling(user: User): Promise<void> {
    if (user.scheduling) {
      throw new BadRequestException('User already has a scheduling');
    }
  }

  async validate(userId: string): Promise<void> {
    const user = await this.doesUserExists(userId);
    await this.doesUserAlreadyHasScheduling(user);
  }
}
