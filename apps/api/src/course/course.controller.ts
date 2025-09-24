import { Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Get()
    getAllCourses() {
        return this.courseService.getAllCourses();
    }

    @Get(':id')
    getCourseById(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.getCourseById(id);
    }
}
