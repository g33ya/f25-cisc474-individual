import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentService {
    constructor(private prismaService : PrismaService) {}

    getAllEnrollments() {
        return this.prismaService.enrollment.findMany();
    }

    async getEnrollmentById(id: number) { // async needed to use await -> throw NotFoundException
        const enrollment = await this.prismaService.enrollment.findUnique({
            where: { id },
        });

        if (!enrollment) {
            throw new NotFoundException(`Enrollment with ID ${id} not found`);
        }
        return enrollment;
    }
}
