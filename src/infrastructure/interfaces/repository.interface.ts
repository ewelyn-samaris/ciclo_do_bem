export interface IRepository<T> {
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
}
