import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { DateTimeFormatterAdapter } from '../../infrastructure/date-time-formatter.adapter';
import { CreateSchedulingDto } from '../dtos/create-scheduling.dto';
import { IRecyclerSchedulingService } from '../../domain/interfaces/recycler-scheduling-service.interface';
import { CreateRecyclerSchedulingValidationService } from '../../domain/validators/create-recycler-scheduling-validation.service';
import { RecyclerScheduling } from '../../domain/entities/recycler-scheduling.entity';

@Controller('v1/recycler-schedulings')
export class RecyclerSchedulingController {
  constructor(
    @Inject('IRecyclerSchedulingService')
    private readonly iRecyclerSchedulingService: IRecyclerSchedulingService,
    private readonly createRecyclerSchedulingValidationService: CreateRecyclerSchedulingValidationService,
  ) {}

  @Post(':recyclerId')
  async create(
    @Param('recyclerId') recyclerId: string,
    @Body() createRecyclerSchedulingDto: CreateSchedulingDto,
  ): Promise<AppResponse<RecyclerScheduling>> {
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
        message: 'Recycler scheduling created successfully',
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
