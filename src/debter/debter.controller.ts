import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DebterService } from './debter.service';
import { CreateDebterDto } from './dto/create-debter.dto';
import { UpdateDebterDto } from './dto/update-debter.dto';

@Controller('debter')
export class DebterController {
  constructor(private readonly debterService: DebterService) {}

  @Post()
  create(@Body() createDebterDto: CreateDebterDto) {
    return this.debterService.create(createDebterDto);
  }

  @Get()
  findAll() {
    return this.debterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebterDto: UpdateDebterDto) {
    return this.debterService.update(+id, updateDebterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debterService.remove(+id);
  }
}
