import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DdayService } from './dday.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDdayDTO } from './dto/create-dday.dto';
import { UpdateDdayDTO } from './dto/update-dday.dto';

@Controller('dday')
export class DdayController {
  constructor(private ddayService: DdayService) {}

  // D-Day 생성
  @Post()
  @ApiOperation({ summary: 'D-Day 생성', description: 'D-Day를 생성합니다.' })
  @ApiBody({ type: CreateDdayDTO })
  @ApiResponse({ status: 201, description: 'D-Day 생성 성공' })
  @ApiResponse({ status: 500, description: 'D-Day 생성 실패' })
  async create(@Body() dto: CreateDdayDTO) {
    return this.ddayService.create(dto);
  }

  // D-Day 조회 테스트
  // @Get()
  // async get(@Query('user_id') user_id: string) {
  //   return this.ddayService.get(user_id);
  // }

  // D-Day 조회
  @Get('user/:user_id')
  @ApiOperation({ summary: '유저별 D-Day 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  async get(@Param('user_id') user_id: string) {
    return this.ddayService.get(user_id);
  }

  // D-Day 수정
  @Patch(':Dday_id')
  @ApiOperation({ summary: 'D-Day 수정', description: 'D-Day를 수정합니다.' })
  @ApiBody({ type: UpdateDdayDTO })
  @ApiResponse({ status: 200, description: 'D-Day 수정 성공' })
  @ApiResponse({ status: 404, description: 'D-Day 찾을 수 없음' })
  // ParseIntPipe: 숫자자가 아닌 값이 들어오면 자동으로 예외 처리
  async update(
    @Param('Dday_id', ParseIntPipe) Dday_id: number,
    @Body() updateDdayDTO: UpdateDdayDTO,
  ) {
    return this.ddayService.update(Dday_id, updateDdayDTO);
  }

  // D-Day 삭제
  @Delete(':Dday_id')
  @ApiOperation({ summary: 'D-Day 삭제', description: 'D-Day를 삭제합니다.' })
  @ApiResponse({ status: 200, description: 'D-Day 삭제 성공' })
  @ApiResponse({ status: 404, description: 'D-Day가 존재하지 않습니다.' })
  // ParseIntPipe: 숫자자가 아닌 값이 들어오면 자동으로 예외 처리
  async delete(@Param('Dday_id', ParseIntPipe) Dday_id: number) {
    return this.ddayService.delete(Dday_id);
  }
}
