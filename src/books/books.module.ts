import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthorsModule } from 'src/authors/authors.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthorsModule, CategoriesModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
