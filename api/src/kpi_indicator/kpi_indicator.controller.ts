import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KpiIndicatorService } from './kpi_indicator.service';
import { CreateKpiIndicatorDto } from './dto/create-kpi_indicator.dto';
import { KpiIndicator } from './entities/kpi_indicator.entity';

@Controller('')
export class KpiIndicatorController {
  constructor(private readonly kpiIndicatorService: KpiIndicatorService) {}

  @Post('/workspaces/:id/kpi-indicators')
  create(
    @Body() createKpiIndicatorDto: CreateKpiIndicatorDto,
    @Param('id') workspaceId: number,
  ): Promise<KpiIndicator> {
    return this.kpiIndicatorService.create(createKpiIndicatorDto, workspaceId);
  }

  @Get('kpi-indicators')
  findAll(): Promise<KpiIndicator[]> {
    return this.kpiIndicatorService.findAll();
  }

  @Get('kpi-indicators/:id')
  findOne(@Param('id') id: string): Promise<KpiIndicator> {
    return this.kpiIndicatorService.findOne(+id);
  }

  @Delete('kpi-indicators/:id')
  remove(@Param('id') id: string): Promise<any> {
    return this.kpiIndicatorService.remove(+id);
  }
}
