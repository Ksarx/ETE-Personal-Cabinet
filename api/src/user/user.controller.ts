import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/workspaces/:id/users')
  create(
    @Body() createUserDto: CreateUserDto,
    @Param('id') workspaceId: number,
  ): Promise<User> {
    return this.userService.create(createUserDto, workspaceId);
  }

  @Get('users')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('users/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Patch('users/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('users/:id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(+id);
  }

  @Get('users/:id/workspace')
  findUserWorkspace(@Param('id') id: string): Promise<Workspace> {
    return this.userService.findUserWorkspace(+id);
  }
}
