import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { DateTimeFormatterAdapter } from '../../infrastructure/date-time-formatter.adapter';
import { CreateRecyclerDto } from '../dtos/create-recycler.dto';
import { IRecyclerService } from '../../domain/interfaces/recycler-service.interface';
import { CreateRecyclerValidationPipe } from '../validators/create-recycler-validation.pipe';
import { Recycler } from '../../domain/entities/recycler.entity';

@Controller('v1/recyclers')
export class RecyclerController {
  constructor(
    @Inject('IRecyclerService')
    private readonly iRecyclerService: IRecyclerService,
  ) {}

  @Post()
  @UsePipes(CreateRecyclerValidationPipe)
  async create(
    @Body() createRecyclerDto: CreateRecyclerDto,
  ): Promise<AppResponse<Recycler>> {
    try {
      const recycler = await this.iRecyclerService.create(createRecyclerDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Recycler regitered successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
        data: recycler,
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
  async getAll(): Promise<AppResponse<Recycler>> {
    try {
      const recyclers = await this.iRecyclerService.getAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Recyclers retrieved successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
        data: recyclers,
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
  async delete(@Param('id') id: string): Promise<AppResponse<Recycler>> {
    try {
      const route = await this.iRecyclerService.softDelete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Recycler deleted successfully',
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
