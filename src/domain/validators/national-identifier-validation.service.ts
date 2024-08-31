import { Injectable } from '@nestjs/common';

@Injectable()
export class NationalIndentifierValidationService {
  static isInvalidCPFWithEqualDigits(cpf: string): void {
    const ALL_NUMBERS_IDENTICALS: RegExp = /^(\d)\1{10}$/;
    if (ALL_NUMBERS_IDENTICALS.test(cpf)) throw new Error(`Invalid CPF ${cpf}`);
  }

  private static calculateCheckDigit(base: string): number {
    const DEFAULT_CPF_LENGTH: number = 11;
    let sum: number = 0;

    base.split('').forEach((charNumber, index) => {
      sum += parseInt(charNumber) * (base.length + 1 - index);
    });

    let remainder = sum % DEFAULT_CPF_LENGTH;
    const maxValueToZeroCheckDigit = 2;
    return remainder < maxValueToZeroCheckDigit
      ? 0
      : DEFAULT_CPF_LENGTH - remainder;
  }

  static isValidCheckDigits(cpf: string): boolean {
    const CPF_BASE_START_INDEX: number = 0;
    const CPF_BASE_END_INDEX: number = 9;

    const firstCheckDigit = this.calculateCheckDigit(
      cpf.substring(CPF_BASE_START_INDEX, CPF_BASE_END_INDEX),
    );
    const secondCheckDigit = this.calculateCheckDigit(
      cpf.substring(CPF_BASE_START_INDEX, CPF_BASE_END_INDEX + 1),
    );

    return cpf.endsWith(`${firstCheckDigit}${secondCheckDigit}`);
  }

  static validate(cpf: string): void {
    this.isInvalidCPFWithEqualDigits(cpf);
    if (!this.isValidCheckDigits(cpf)) {
      throw new Error(`Invalid CPF ${cpf}`);
    }
  }
}
