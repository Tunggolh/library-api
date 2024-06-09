import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: Repository<Category>) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ order: { id: 'asc' } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  async create(categoryDto: CategoryDto): Promise<Category> {
    return this.categoryRepository.save(categoryDto);
  }

  async update(id: number, categoryDto: CategoryDto): Promise<Category> {
    const category = await this.categoryRepository.preload({
      id,
      ...categoryDto,
    });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    this.categoryRepository.remove(category);
  }
}
