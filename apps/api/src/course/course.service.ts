import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CourseCreateIn, CourseUpdateIn, CourseOut } from '@repo/api/courses';

@Injectable()
export class CourseService {
    constructor(private prismaService : PrismaService) {}

    getAllCourses() {
        return this.prismaService.course.findMany();
    }

    async getCourseById(id: number) { // async needed to use await -> throw NotFoundException
        const course = await this.prismaService.course.findUnique({
            where: { id },
        });

        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }

    async create(createCourseDto: CourseCreateIn): Promise<CourseOut> {
    const newCourse = await this.prismaService.course.create({
      data: createCourseDto,
    });
    return {
      code: newCourse.code,
      title: newCourse.title,
      description: newCourse.description,
      instructorId: newCourse.instructorId,
      id: newCourse.id,
      startDate: newCourse.startDate.toString(),
      endDate: newCourse.endDate.toString(),
      createdAt: newCourse.createdAt.toString(),
      updatedAt: newCourse.updatedAt.toString(),
    };
  }

  update(id: number, updateCourseDto: CourseUpdateIn) {
    return this.prismaService.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  remove(id: number) {
    return this.prismaService.course.delete({
      where: { id },
    });
  }
}
