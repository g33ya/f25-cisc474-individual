import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GradeService {
    constructor(private prismaService : PrismaService) {}

    getAllGrades() {
        return this.prismaService.grade.findMany();
    }

    async getGradeById(id: number) { // async needed to use await -> throw NotFoundException
        const grade = await this.prismaService.grade.findUnique({
            where: { id },
        });

        if (!grade) {
            throw new NotFoundException(`Grade with ID ${id} not found`);
        }
        return grade;
    }
}
