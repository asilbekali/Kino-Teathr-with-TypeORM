import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }

  @Post('/login')
  @ApiBody({
    description: 'Login credentials',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Alex' }, 
        password: { type: 'string', example: 'StronPassword_1' }, 
      },
    },
  })
  login(@Body() data: UpdateUserDto) {
    return this.userService.login(data);
  }


  @UseGuards(AuthGuard)
  @Get("/me")
  meUser(){
    return this.userService.userData()
  } 








}
