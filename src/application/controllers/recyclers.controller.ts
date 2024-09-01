import { Controller, HttpStatus, Inject, UsePipes } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { AppResponse } from '../../domain/models/app-response.model';
import { DateTimeFormatterAdapter } from '../../infrastructure/date-time-formatter.adapter';
import { CreateRecyclerDto } from '../dtos/create-recycler.dto';
import { IRecyclerService } from '../../domain/interfaces/recycler-service.interface';
import { CreateRecyclerValidationPipe } from '../validators/create-recycler-validation.pipe';
import { Recycler } from '../../domain/entities/recycler.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUIDValidationService } from '../../domain/validators/uuid-validation.service';

@ApiTags('v1/recyclers')
@Controller('v1/recyclers')
export class RecyclerController {
  constructor(
    @Inject('IRecyclerService')
    private readonly iRecyclerService: IRecyclerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new recycler' })
  @ApiResponse({ status: 201, description: 'Recycler registered successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({
    status: 500,
    description: `Can't create recyler. Internal server error`,
  })
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
  @ApiOperation({ summary: 'List all recyclers' })
  @ApiResponse({ status: 200, description: 'Recyclers retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No recyclers found' })
  @ApiResponse({
    status: 500,
    description: `Can't get recyclers. Internal server error`,
  })
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
  @ApiOperation({ summary: 'Soft remove a recycler' })
  @ApiResponse({ status: 200, description: 'Recycler deleted successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({
    status: 404,
    description: 'No recycler found with the given id',
  })
  @ApiResponse({
    status: 500,
    description: `Can't soft delete recycler. Internal server error`,
  })
  async delete(@Param('id') id: string): Promise<AppResponse<Recycler>> {
    UUIDValidationService.validate(id);
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
