import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
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

  @IsArray()
  @IsNumber({}, { each: true })
  readonly authors: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  readonly categories: number[];

  @IsDate()
  readonly published_date: Date;
}
