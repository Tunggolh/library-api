import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { id } });

    if (!author) {
      throw new NotFoundException(`Author #${id} not found`);
    }

    return author;
  }

  async create(authorCreateDto: AuthorCreateDto): Promise<Author> {
    return this.authorRepository.save(authorCreateDto);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorRepository.preload({
      id,
      ...updateAuthorDto,
    });

    if (!author) {
      throw new NotFoundException(`Author #${id} not found`);
    }

    return this.authorRepository.save(author);
  }

  async remove(id: number): Promise<void> {
    const author = await this.findOne(id);
    this.authorRepository.remove(author);
  }
}
