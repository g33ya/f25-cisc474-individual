import { Controller, Get, Param, ParseIntPipe, Patch, Body, Post, Delete, UsePipes, UseGuards, Req} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDelete, CourseUpdateIn, CourseCreateIn, CourseOut } from '@repo/api/courses';
import { ZodPipe } from 'src/zod_pipe';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('courses')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAllCourses(@CurrentUser() user: JwtUser) {
        console.log('User accessed:', user);
        return this.courseService.getAllCourses();
    }

    @Get(':id')
    getCourseById(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.getCourseById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: CourseUpdateIn) {
        return this.courseService.update(Number(id), updateCourseDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    //@UsePipes(new ZodPipe(CourseCreateIn))
    create(@Body() createCourseDto: CourseCreateIn) {
        return this.courseService.create(createCourseDto);
    }

@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
  return this.courseService.remove(id);
}

}
