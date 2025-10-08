import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
