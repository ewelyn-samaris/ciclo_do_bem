import { CreateNeighborhoodRoute } from '../models/create-neighborhood-route.model';
import { NeighborhoodRoute } from '../entities/neighborhood-route.entity';

export abstract class NeighborhoodRouteFactory {
  static create(
    createNeighboorhoodRoute: CreateNeighborhoodRoute,
  ): NeighborhoodRoute {
    return new NeighborhoodRoute(createNeighboorhoodRoute);
  }
}
