import { Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
    // Find All Episodes
    @Get()
    findAll (@Query('sort') sort: 'asc' | 'desc' = "desc") {
        return 'This action returns all episodes';
    }

    @Get('featured')
    // Find Featured Episode
    findFeatured() {
        return `This action returns featured episode`;
    }

    // Find One Episode
    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns episode #${id}`;
    }

    // Create Episode
    @Post()
    create() {
        return 'This action adds a new episode';
    }
}
