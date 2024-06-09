import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ArrayNotEmpty, IsOptional } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
