import { Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(name?: string) {
    if (name) this.name = name.toUpperCase();
  }
}
