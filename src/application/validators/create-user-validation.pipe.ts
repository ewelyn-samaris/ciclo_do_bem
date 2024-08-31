import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { DateTimeFormatterAdapter } from '../../infrastructure/date-time-formatter.adapter';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserValidationService } from '../../domain/validators/create-user-validation.service';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  constructor(
    private readonly createUserValidationService: CreateUserValidationService,
  ) {}

  async transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    try {
      await this.createUserValidationService.validate(value);
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
