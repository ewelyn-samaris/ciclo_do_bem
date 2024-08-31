import { GatewayTimeoutException, Injectable } from '@nestjs/common';
import { Point } from '../domain/enums/point.enum';

@Injectable()
export class GeoLocationService {
  async getCoordinatesByZipCode(zipCode: string): Promise<Point> {
    const url = `https://brasilapi.com.br/api/cep/v2/${zipCode}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.location.coordinates;
    } catch (error) {
      throw new GatewayTimeoutException(
        `Can't get coordinates from zipCode: ${error}`,
      );
    }
  }
}
