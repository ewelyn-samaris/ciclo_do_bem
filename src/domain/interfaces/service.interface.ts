export interface IService<T, Dto> {
  getAll(): Promise<T[]>;
  create(dto: Dto, id?: string): Promise<T>;
}
