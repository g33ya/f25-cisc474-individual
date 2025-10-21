import { Controller, Get, Param, ParseIntPipe, Patch, Body, Post, Delete, UsePipes} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseRef, CourseUpdateIn, CourseCreateIn } from '@repo/api/courses';
import { ZodPipe } from 'src/zod_pipe';

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

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: CourseUpdateIn) {
        return this.courseService.update(id, updateCourseDto);
    }


    @Post()
    @UsePipes(new ZodPipe(CourseCreateIn))
    create(@Body() createCourseDto: CourseCreateIn) {
        return this.courseService.create(createCourseDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.remove(id);
    }

}
