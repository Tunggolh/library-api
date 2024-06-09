import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly isbn: string;

  @IsNumber()
  readonly authors: number[];

  @IsNumber()
  readonly categories: number[];
}
