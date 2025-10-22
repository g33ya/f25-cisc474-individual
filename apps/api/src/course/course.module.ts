import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { AuthModule } from '../auth/auth.module';
import { CourseService } from './course.service';

@Module({
  imports: [AuthModule],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
