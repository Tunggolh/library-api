import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDate,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';

export class CreateBookDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly isbn: string;

  @ArrayNotEmpty()
  readonly authors: number[];

  @ArrayNotEmpty()
  readonly categories: number[];

  @IsDate()
  readonly published_date: Date;
}
