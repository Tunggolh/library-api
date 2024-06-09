import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async findAll(@Query() paginationQuery): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Post()
  async create(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.create(categoryDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, categoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
