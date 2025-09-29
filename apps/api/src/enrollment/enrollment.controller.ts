import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollments')
export class EnrollmentController {
    constructor(private enrollmentService: EnrollmentService) {}

    @Get()
    getAllEnrollments() {
        return this.enrollmentService.getAllEnrollments();
    }

    @Get(':id')
    getEnrollmentById(@Param('id', ParseIntPipe) id: number) {
        return this.enrollmentService.getEnrollmentById(id);
    }
}
