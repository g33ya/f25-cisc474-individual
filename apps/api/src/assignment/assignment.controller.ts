import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AssignmentService } from './assignment.service';


@Controller('assignments')
export class AssignmentController {
    constructor(private assignmentService : AssignmentService) {}

    @Get()
    getAllAssignments() {
        return this.assignmentService.getAllAssignments();
    }

    @Get(':id')
    getAssignmentById(@Param('id', ParseIntPipe) id: number) {  // ParseIntPipe ensures id is a number (param is a string by default!)
        return this.assignmentService.getAssignmentById(id);
    }
}


