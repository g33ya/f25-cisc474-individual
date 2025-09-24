import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GradeService } from './grade.service';

@Controller('grades')
export class GradeController {
    constructor(private gradeService: GradeService) {}

    @Get()
    getAllGrades() {
        return this.gradeService.getAllGrades();
    }

    @Get(':id')
    getGradeById(@Param('id', ParseIntPipe) id: number) {
        return this.gradeService.getGradeById(id);
    }
}
