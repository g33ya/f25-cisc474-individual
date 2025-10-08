import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubmissionService {
    constructor(private prismaService : PrismaService) {}

    getAllSubmissions() {
        return this.prismaService.submission.findMany();
    }

    async getSubmissionById(id: number) { // async needed to use await -> throw NotFoundException
        const submission = await this.prismaService.submission.findUnique({
            where: { id },
        });

        if (!submission) {
            throw new NotFoundException(`Submission with ID ${id} not found`);
        }
        return submission;
    }
}
