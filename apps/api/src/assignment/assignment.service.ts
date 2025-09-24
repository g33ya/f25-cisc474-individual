import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssignmentService {
    constructor(private prismaService : PrismaService) {}
    
    getAllAssignments() {
        return this.prismaService.assignment.findMany();
    }

    async getAssignmentById(id: number) { // async needed to use await -> throw NotFoundException
        const assignment = await this.prismaService.assignment.findUnique({
            where: { id },
        });

        if (!assignment) {
            throw new NotFoundException(`Assignment with ID ${id} not found`);
        }
        return assignment;
    }
}
