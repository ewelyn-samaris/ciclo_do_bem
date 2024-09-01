import { Body, HttpStatus, Inject, UsePipes } from '@nestjs/common';
import { Controller, Param, Patch, Post } from '@nestjs/common';
import { Delete, Get, Query } from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { DateTimeFormatterAdapter } from '../../infrastructure/date-time-formatter.adapter';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUserService } from '../../domain/interfaces/user-service.interface';
import { User } from '../../domain/entities/user.entity';
import { CreateUserValidationPipe } from '../validators/create-user-validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUIDValidationService } from '../../domain/validators/uuid-validation.service';

@ApiTags('v1/users')
@Controller('v1/users')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly iUserService: IUserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({
    status: 500,
    description: `Can't create user. Internal server error`,
  })
  @ApiResponse({
    status: 500,
    description: `Can't create address for user. Internal server error`,
  })
  @ApiResponse({
    status: 504,
    description:
      'Gateway Timeout: Unable to retrieve coordinates from the external service due to a delay in response',
  })
  @UsePipes(CreateUserValidationPipe)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<AppResponse<User>> {
    try {
      const user = await this.iUserService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully',
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
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No users found' })
  @ApiResponse({
    status: 500,
    description: `Can't get users. Internal server error`,
  })
  async getAll(): Promise<AppResponse<User>> {
    try {
      const users = await this.iUserService.getAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Users retrieved successfully',
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
  @ApiOperation({ summary: 'Update user data' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'No user found with the given id' })
  @ApiResponse({
    status: 500,
    description: `Can't update user. Internal server error`,
  })
  async update(
    @Param('id') id: string,
    @Query() updates: Partial<User>,
  ): Promise<AppResponse<User>> {
    UUIDValidationService.validate(id);
    try {
      const user = await this.iUserService.update(id, updates);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
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
  @ApiOperation({ summary: 'Soft remove user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'No user found with the given id' })
  @ApiResponse({
    status: 500,
    description: `Can't soft delete user. Internal server error`,
  })
  async delete(@Param('id') id: string): Promise<AppResponse<User>> {
    UUIDValidationService.validate(id);
    try {
      const route = await this.iUserService.softRemove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
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
