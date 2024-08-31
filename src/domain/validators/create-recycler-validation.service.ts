import { Inject, Injectable } from '@nestjs/common';
import { IRecyclerService } from '../interfaces/recycler-service.interface';
import { NationalIndentifierValidationService } from './national-identifier-validation.service';

@Injectable()
export class CreateRecyclerValidationService {
  constructor(
    @Inject('IRecyclerService')
    private readonly iRecyclerService: IRecyclerService,
  ) {}

  async doesRecyclerAlreadyExists(nationalIdentifier: string): Promise<void> {
    const existingRecycler =
      await this.iRecyclerService.getByNationalIdentifier(nationalIdentifier);

    if (existingRecycler) {
      throw new Error(
        `Recycler with national identifier ${nationalIdentifier} already exists`,
      );
    }
  }

  async validate(nationalIdentifier: string): Promise<void> {
    NationalIndentifierValidationService.validate(nationalIdentifier);
    await this.doesRecyclerAlreadyExists(nationalIdentifier);
  }
}
