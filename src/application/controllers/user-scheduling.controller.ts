import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { CreateSchedulingDto } from '../dtos/create-scheduling.dto';
import { DateTimeFormatterAdapter } from '../../infrastructure/date-time-formatter.adapter';
import { IUserSchedulingService } from '../../domain/interfaces/user-scheduling-service.interface';
import { CreateUserSchedulingValidationService } from '../../domain/validators/create-user-scheduling-validation.service';
import { UserScheduling } from '../../domain/entities/user-scheduling.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('v1/user-schedulings')
@Controller('v1/user-schedulings')
export class UserSchedullingController {
  constructor(
    @Inject('IUserSchedulingService')
    private readonly iUserSchedulingService: IUserSchedulingService,
    private readonly createUserSchedulingValidationService: CreateUserSchedulingValidationService,
  ) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Create collection schedule for a user' })
  @ApiResponse({
    status: 201,
    description: 'User schedule created successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({
    status: 500,
    description: `Can't create user schedule. Internal server error`,
  })
  async create(
    @Param('userId') userId: string,
    @Body() createUserSchedulingDto: CreateSchedulingDto,
  ): Promise<AppResponse<UserScheduling>> {
    await this.createUserSchedulingValidationService.validate(userId);
    try {
      const userScheduling = await this.iUserSchedulingService.create(
        createUserSchedulingDto,
        userId,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User schedule created successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
        data: userScheduling,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DateTimeFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Patch('served-scheduling/:id')
  @ApiOperation({ summary: 'Update user schedule as served' })
  @ApiResponse({
    status: 201,
    description: 'User schedule registered as served successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'No user schedule found with the given id',
  })
  @ApiResponse({
    status: 500,
    description: `Can't register user-scheduling as served. Internal server error:`,
  })
  async registerServedScheduling(
    @Param('id') id: string,
  ): Promise<AppResponse<UserScheduling>> {
    try {
      const userScheduling =
        await this.iUserSchedulingService.updateServedScheduling(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User schedule registered as served successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
        data: userScheduling,
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
