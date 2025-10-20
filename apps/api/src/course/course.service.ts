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
      course_code: newCourse.course_code,
      course_title: newCourse.course_title,
      description: newCourse.description,
      instructor_id: newCourse.instructor_id,
      id: newCourse.id,
      start_date: newCourse.start_date.toString(),
      end_date: newCourse.end_date.toString(),
      created_at: newCourse.created_at.toString(),
      updated_at: newCourse.updated_at.toString(),
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
