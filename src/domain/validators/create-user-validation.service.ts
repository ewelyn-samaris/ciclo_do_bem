import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { IUserService } from '../interfaces/user-service.interface';

@Injectable()
export class CreateUserValidationService {
  constructor(
    @Inject('IUserService') private readonly iUserService: IUserService,
  ) {}

  async doesUserAlreadyExist(email: string): Promise<void> {
    const existingUser = await this.iUserService.getByEmail(email);
    if (existingUser)
      throw new Error(`User with email ${email} already exists`);
  }

  async validate(dto: CreateUserDto): Promise<void> {
    await this.doesUserAlreadyExist(dto.email);
  }
}
