import { Controller, Get,Param, ParseIntPipe, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async me(@CurrentUser() auth: JwtUser) {
        console.log(auth);
        if (!auth || !auth.userId) {
        throw new UnauthorizedException();
        }
        const user = await this.userService.getUserById(Number(auth.userId));
        if (!user) {
        throw new Error('User not found');
        }
        // Return only what your client needs (include the DB id!)
        return {
        id: user.id,
        name: `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim(),
        email: user.email,
        };
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {  // ParseIntPipe ensures id is a number (param is a string by default!)
        return this.userService.getUserById(id);
    }

    @Get('by-email/:email')
    findByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }
}
