import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
    constructor(private prismaService : PrismaService) {}

    getAllNotifications() {
        return this.prismaService.notification.findMany();
    }

    async getNotificationById(id: number) { // async needed to use await -> throw NotFoundException
        const notification = await this.prismaService.notification.findUnique({
            where: { id },
        });

        if (!notification) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }
        return notification;
    }
}
