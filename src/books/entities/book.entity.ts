import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column()
  published_date: Date;

  @ManyToMany(() => Category, (category) => category.books, {
    cascade: false,
  })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Author, (author) => author.books, {
    cascade: false,
  })
  @JoinTable()
  authors: Author[];
}
