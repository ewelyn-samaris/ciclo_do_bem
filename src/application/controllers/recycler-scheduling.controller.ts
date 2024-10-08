import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { DateTimeFormatterAdapter } from '../../infrastructure/date-time-formatter.adapter';
import { CreateSchedulingDto } from '../dtos/create-scheduling.dto';
import { IRecyclerSchedulingService } from '../../domain/interfaces/recycler-scheduling-service.interface';
import { CreateRecyclerSchedulingValidationService } from '../../domain/validators/create-recycler-scheduling-validation.service';
import { RecyclerScheduling } from '../../domain/entities/recycler-scheduling.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUIDValidationService } from '../../domain/validators/uuid-validation.service';

@ApiTags('v1/recycler-schedulings')
@Controller('v1/recycler-schedulings')
export class RecyclerSchedulingController {
  constructor(
    @Inject('IRecyclerSchedulingService')
    private readonly iRecyclerSchedulingService: IRecyclerSchedulingService,
    private readonly createRecyclerSchedulingValidationService: CreateRecyclerSchedulingValidationService,
  ) {}

  @Post(':recyclerId')
  @ApiOperation({ summary: 'Create collection schedule for a recycler' })
  @ApiResponse({
    status: 201,
    description: 'Recycler schedule created successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({
    status: 500,
    description: `Can't create recycler schedule. Internal server error`,
  })
  async create(
    @Param('recyclerId') recyclerId: string,
    @Body() createRecyclerSchedulingDto: CreateSchedulingDto,
  ): Promise<AppResponse<RecyclerScheduling>> {
    UUIDValidationService.validate(recyclerId);
    await this.createRecyclerSchedulingValidationService.validate(
      createRecyclerSchedulingDto,
      recyclerId,
    );
    try {
      const recyclerScheduling = await this.iRecyclerSchedulingService.create(
        createRecyclerSchedulingDto,
        recyclerId,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Recycler schedule created successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
        data: recyclerScheduling,
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
