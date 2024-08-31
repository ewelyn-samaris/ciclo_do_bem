import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { DateTimeFormatterAdapter } from '../../infrastructure/date-time-formatter.adapter';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUserService } from '../../domain/interfaces/user-service.interface';
import { User } from '../../domain/entities/user.entity';
import { CreateUserValidationPipe } from '../validators/create-user-validation.pipe';

@Controller('v1/users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly iUserService: IUserService,
  ) {}

  @Post()
  @UsePipes(CreateUserValidationPipe)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<AppResponse<User>> {
    try {
      const user = await this.iUserService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Recycler registered successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
        data: user,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DateTimeFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Get()
  async getAll(): Promise<AppResponse<User>> {
    try {
      const users = await this.iUserService.getAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Recycler retrieved successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
        data: users,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DateTimeFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Query() updates: Partial<User>,
  ): Promise<AppResponse<User>> {
    try {
      const user = await this.iUserService.update(id, updates);
      return {
        statusCode: HttpStatus.OK,
        message: 'user updated successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
        data: user,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DateTimeFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<AppResponse<User>> {
    try {
      const route = await this.iUserService.softRemove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'user deleted successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DateTimeFormatterAdapter.formatDateTimeString(),
      };
    }
  }
}
