import { Controller, Get,Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {  // ParseIntPipe ensures id is a number (param is a string by default!)
        return this.userService.getUserById(id);
    }
}
