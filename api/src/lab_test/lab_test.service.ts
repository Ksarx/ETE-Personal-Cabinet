import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLabTestDto } from './dto/create-lab_test.dto';
import { LabTest } from './entities/lab_test.entity';
import { WorkspaceService } from 'src/workspace/workspace.service';

@Injectable()
export class LabTestService {
  constructor(
    @InjectRepository(LabTest)
    private readonly labTestRepository: Repository<LabTest>,

    private readonly workspaceService: WorkspaceService,
  ) {}

  async create(
    createLabTestDto: CreateLabTestDto,
    id: number,
  ): Promise<LabTest> {
    const wp = await this.workspaceService.findOne(id);
    return this.labTestRepository.save({
      workspace: wp,
      ...createLabTestDto,
    });
  }

  async findAll(): Promise<LabTest[]> {
    return this.labTestRepository.find({ relations: ['workspace'] });
  }

  async findOne(id: number): Promise<LabTest> {
    const lab = this.labTestRepository.findOne({
      where: { id: id },
      relations: ['workspace'],
    });
    return lab;
  }

  async remove(id: number): Promise<any> {
    return this.labTestRepository.delete(id);
  }
}
