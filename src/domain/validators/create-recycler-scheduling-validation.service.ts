import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { IRecyclerService } from '../interfaces/recycler-service.interface';
import { CreateSchedulingDto } from '../../application/dtos/create-scheduling.dto';
import { Recycler } from '../entities/recycler.entity';
import { IRecyclerSchedulingService } from '../interfaces/recycler-scheduling-service.interface';

@Injectable()
export class CreateRecyclerSchedulingValidationService {
  constructor(
    @Inject('IRecyclerService')
    private readonly iRecyclerService: IRecyclerService,
    @Inject('IRecyclerSchedulingService')
    private readonly iRecyclerSchedulingService: IRecyclerSchedulingService,
  ) {}

  async doesRecyclerExists(recyclerId: string): Promise<Recycler> {
    const recycler = await this.iRecyclerService.getById(recyclerId);
    if (!recycler) {
      throw new NotFoundException('Recycler not found for scheduling');
    }
    return recycler;
  }

  async doesRecyclerAlreadyHasScheduling(
    createRecyclerSchedulingDto: CreateSchedulingDto,
    recycler: Recycler,
  ) {
    const existingSchedulingForRecycler = recycler.schedulings.some(
      (scheduling) => {
        return (
          scheduling.day === createRecyclerSchedulingDto.day &&
          scheduling.shift === createRecyclerSchedulingDto.shift
        );
      },
    );
    if (existingSchedulingForRecycler) {
      throw new BadRequestException(
        'Recycler already has a scheduling for this day and shift',
      );
    }
  }

  async doesNeighborhoodAlreadyHasScheduling(
    createRecyclerSchedulingDto: CreateSchedulingDto,
  ): Promise<void> {
    const params = {
      day: createRecyclerSchedulingDto.day,
      shift: createRecyclerSchedulingDto.shift,
      city: createRecyclerSchedulingDto.city,
      neighborhood: createRecyclerSchedulingDto.neighborhood,
    };

    const existingSchedulingForNeighborHood =
      await this.iRecyclerSchedulingService.getByDayShiftNeighborhood(params);

    if (existingSchedulingForNeighborHood.length) {
      throw new BadRequestException(
        'Neighborhood already has a scheduling for the given day and shift',
      );
    }
  }

  async validate(
    createRecyclerSchedulingDto: CreateSchedulingDto,
    recyclerId: string,
  ): Promise<void> {
    const recycler = await this.doesRecyclerExists(recyclerId);
    await this.doesRecyclerAlreadyHasScheduling(
      createRecyclerSchedulingDto,
      recycler,
    );
    await this.doesNeighborhoodAlreadyHasScheduling(
      createRecyclerSchedulingDto,
    );
  }
}
