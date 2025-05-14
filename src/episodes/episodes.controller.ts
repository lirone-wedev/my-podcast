import { Controller, Get, Param, Post, Query, Body, NotFoundException, HttpException, HttpStatus, DefaultValuePipe, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { ConfigService } from '../config/config.service';
import type { CreateEpisodeDto } from '../types';
import { IsPositivePipe } from '../pipes/is-positive.pipe';
import { ApiKeyGuard } from '../api-key/api-key.guard';

@Controller('episodes')
export class EpisodesController {
    constructor(
        private episodesService: EpisodesService, 
        private configService: ConfigService
    ) {}
    // Find All Episodes
    @Get()
    findAll(
        @Query('sort') sort: 'asc' | 'desc' = "desc",
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe, IsPositivePipe) limit: number,
    ) {
        console.log(sort);
        return this.episodesService.findAll(sort, limit);
    }

    @Get('featured')
    // Find Featured Episode
    findFeatured() {
        return this.episodesService.findFeatured();
    }

    // Find One Episode
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const episode = await this.episodesService.findOne(+id);

        if (!episode) {
            throw new HttpException('Episode not found', HttpStatus.NOT_FOUND);
        }

        return episode;
    }

    // Create Episode
    @Post()
    @UseGuards(ApiKeyGuard)
    create(@Body(ValidationPipe) createEpisodeDto: CreateEpisodeDto) {
        console.log(createEpisodeDto);
        
        return this.episodesService.create(createEpisodeDto);
    }
}
