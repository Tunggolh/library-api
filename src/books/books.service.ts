import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { In, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({ order: { id: 'asc' } });
  }

  async findOne(id: number): Promise<Book> {
    const book = this.bookRepository.findOne({
      where: { id },
      relations: ['authors', 'categories'],
    });

    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }

    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const bookData = {
      title: createBookDto.title,
      isbn: createBookDto.isbn,
      published_date: createBookDto.published_date,
    };

    const authorIds = createBookDto.authors;
    const categoryIds = createBookDto.categories;

    const authors = await this.bookRepository.manager.findBy(Author, {
      id: In(authorIds),
    });
    const categories = await this.bookRepository.manager.findBy(Category, {
      id: In(categoryIds),
    });

    if (authors.length !== authorIds.length) {
      throw new NotFoundException('Provide all valid author IDs');
    }

    if (categories.length !== categoryIds.length) {
      throw new NotFoundException('Provide all valid category IDs');
    }

    const book = this.bookRepository.create(bookData);

    book.authors = authors;
    book.categories = categories;

    return await this.bookRepository.save(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }

    const authorIds = updateBookDto?.authors ?? false;
    const categoryIds = updateBookDto?.categories ?? false;

    let authors = [];
    let categories = [];

    if (authorIds) {
      authors = await this.bookRepository.manager.findBy(Author, {
        id: In(authorIds),
      });
      if (authors.length !== authorIds.length) {
        throw new NotFoundException('Provide all valid author IDs');
      }
    }

    if (categoryIds) {
      categories = await this.bookRepository.manager.findBy(Category, {
        id: In(categoryIds),
      });
      if (categories.length !== categoryIds.length) {
        throw new NotFoundException('Provide all valid category IDs');
      }
    }

    const updatedData = {
      ...updateBookDto,
      authors: authorIds ? authors : book.authors,
      categories: categoryIds ? categories : book.categories,
    };

    const bookUpdated = Object.assign(book, updatedData);

    return await this.bookRepository.save(bookUpdated);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    this.bookRepository.remove(book);
  }
}
