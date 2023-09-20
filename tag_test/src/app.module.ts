import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
//import { TagEntity } from './tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'new-assessment-staging.csdmg3kugxsm.ap-south-1.rds.amazonaws.com',
    port: 5432,
    password: 'Refactor123456',
    username: 'postgres',
    entities: [],
    database: 'TestTag',
    synchronize: true,
  }), TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
