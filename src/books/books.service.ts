import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly authorService: AuthorsService,
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
    const author = await this.authorService.findByIds(createBookDto.authors);

    return this.bookRepository.save(createBookDto);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.preload({
      id,
      ...updateBookDto,
    });

    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }

    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    this.bookRepository.remove(book);
  }
}
