import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { dataSourceOptions } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
