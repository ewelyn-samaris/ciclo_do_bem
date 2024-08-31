import { Point } from '../../domain/enums/point.enum';

export interface IGeoLocationService {
  getCoordinatesByZipCode(zipCode: string): Promise<Point>;
}
