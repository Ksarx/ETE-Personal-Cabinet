import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { Workspace } from 'src/workspace/entities/workspace.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly workspaceService: WorkspaceService,
  ) {}

  async create(createUserDto: CreateUserDto, id: number): Promise<User> {
    const wp = await this.workspaceService.findOne(id);
    return this.userRepository.save({
      workspace: wp,
      ...createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = this.userRepository.findOne({
      where: { id: id },
      relations: ['workspace', 'cards'],
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
  async findUserWorkspace(id: number): Promise<Workspace> {
    const user = this.userRepository.findOne({
      where: { id: id },
      relations: ['workspace'],
    });
    return this.workspaceService.findOne((await user).workspace.id);
  }
}
