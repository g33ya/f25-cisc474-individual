import { Controller, Get,Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {  // ParseIntPipe ensures id is a number (param is a string by default!)
        return this.usersService.getUserById(id);
    }
}
