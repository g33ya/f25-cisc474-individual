import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(private notificationService: NotificationService) {}

    @Get()
    getAllNotifications() {
        return this.notificationService.getAllNotifications();
    }

    @Get(':id')
    getNotificationById(@Param('id', ParseIntPipe) id: number) {
        return this.notificationService.getNotificationById(id);
    }
}
