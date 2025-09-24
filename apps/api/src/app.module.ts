import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AssignmentModule } from './assignment/assignment.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [LinksModule, UsersModule, PrismaModule, AssignmentModule, CourseModule, EnrollmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
