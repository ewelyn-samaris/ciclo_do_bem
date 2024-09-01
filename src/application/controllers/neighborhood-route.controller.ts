import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { Get, Param, Query } from '@nestjs/common';
import { INeighborhoodRouteService } from '../../domain/interfaces/neighborhood-route-service.interface';
import { DateTimeFormatterAdapter } from '../../infrastructure/date-time-formatter.adapter';
import { AppResponse } from '../../domain/models/app-response.model';
import { DayOfWeek } from '../../domain/enums/day-of-week.enum';
import { WorkShift } from '../../domain/enums/work-shift.enum';
import { UserSchedulingParams } from '../../domain/models/user-scheduling-params.model';
import { NeighborhoodRoute } from '../../domain/entities/neighborhood-route.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('v1/neighborhoods-routes')
@Controller('v1/neighborhoods-routes')
export class NeighborhoodRouteController {
  constructor(
    @Inject('INeighborhoodRouteService')
    private readonly iNeighborhoodRouteService: INeighborhoodRouteService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all created routes' })
  @ApiResponse({ status: 200, description: 'Routes retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No routes found' })
  @ApiResponse({
    status: 500,
    description: `Can't get neighborhoods routes. Internal server error`,
  })
  async getAll(): Promise<AppResponse<NeighborhoodRoute>> {
    try {
      const route = await this.iNeighborhoodRouteService.getAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Routes retrieved successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
        data: route,
      };
    } catch (error) {
      return {
        statusCode: error.getStatus(),
        message: error.message,
        date: DateTimeFormatterAdapter.formatDateTimeString(),
      };
    }
  }

  @Get(':city/:neighborhood')
  @ApiOperation({
    summary: 'List created routes by city, neighborhood, day and shift',
  })
  @ApiResponse({ status: 200, description: 'Routes retrieved successfully' })
  @ApiResponse({
    status: 404,
    description: '`No route found for the given params',
  })
  @ApiResponse({
    status: 500,
    description: `Can't get neighborhood route. Internal server error`,
  })
  async getByNeighborhoodDayShift(
    @Param('city') city: string,
    @Param('neighborhood') neighborhood: string,
    @Query('day') day: DayOfWeek,
    @Query('shift') shift: WorkShift,
  ): Promise<AppResponse<NeighborhoodRoute>> {
    try {
      const params: UserSchedulingParams = { day, shift, city, neighborhood };
      const route =
        await this.iNeighborhoodRouteService.getByDayShiftNeighborhood(params);
      return {
        statusCode: HttpStatus.OK,
        message: 'Routes retrieved successfully',
        date: DateTimeFormatterAdapter.formatDateTimeString(),
        data: route,
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
