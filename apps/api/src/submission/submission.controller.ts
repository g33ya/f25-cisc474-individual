import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SubmissionService } from './submission.service';

@Controller('submissions')
export class SubmissionController {
    constructor(private submissionService: SubmissionService) {}
    
    @Get()
    getAllSubmissions() {
        return this.submissionService.getAllSubmissions();
    }

    @Get(':id')
    getSubmissionById(@Param('id', ParseIntPipe) id: number) {
        return this.submissionService.getSubmissionById(id);
    }
}3
