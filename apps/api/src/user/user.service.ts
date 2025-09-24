import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService : PrismaService) {}

    getAllUsers() {
        return this.prismaService.user.findMany();
    }

    async getUserById(id: number) { // async needed to use await -> throw NotFoundException
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
}
