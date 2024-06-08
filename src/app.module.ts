import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/typeorm.config';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
    }),
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
