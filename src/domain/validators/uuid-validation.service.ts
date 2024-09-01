import { BadRequestException } from '@nestjs/common';

export abstract class UUIDValidationService {
  static validate(id: string): void {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('Invalid id');
    }
  }
}
