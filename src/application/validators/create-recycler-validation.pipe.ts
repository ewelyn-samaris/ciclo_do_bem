import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateRecyclerDto } from '../dtos/create-recycler.dto';
import { CreateRecyclerValidationService } from '../../domain/validators/create-recycler-validation.service';
import { DateTimeFormatterAdapter } from '../../infrastructure/date-time-formatter.adapter';

@Injectable()
export class CreateRecyclerValidationPipe implements PipeTransform {
  constructor(
    private readonly createRecyclerValidationService: CreateRecyclerValidationService,
  ) {}

  async transform(value: CreateRecyclerDto, metadata: ArgumentMetadata) {
    try {
      await this.createRecyclerValidationService.validate(
        value.nationalIdentifier,
      );

      return value;
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
        date: DateTimeFormatterAdapter.formatDateTimeString(),
      });
    }
  }
}
