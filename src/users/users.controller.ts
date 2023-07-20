import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { FindUsersDto } from './dto/find-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('find')
  create(@Body() { query }: FindUsersDto) {
    return this.usersService.findBy<User>(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@Request() { user: { id } }) {
    console.log(id);
    return this.usersService.findBy<User>(id, 'id');
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findByUserName(@Param('username') username: string) {
    return this.usersService.findBy<User>(username, 'username');
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('me')
  update(@Request() { user: { id } }, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  findMyWishes(@Request() { user: { username } }) {
    console.log(username);
    return this.usersService.findUserWishes(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  findByUserWishes(@Param('username') username: string) {
    return this.usersService.findUserWishes(username);
  }
}
