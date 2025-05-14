import { Injectable } from '@nestjs/common';

import type { Episode, CreateEpisodeDto } from '../types';

@Injectable()
export class EpisodesService {
    private episodes: Episode[] = []

    async findAll(sort: 'asc' | 'desc' = 'asc', limit: number): Promise<Episode[]> {
        const sortAsc = (a: Episode, b: Episode) => a.id - b.id;
        const sortDesc = (a: Episode, b: Episode) => b.id - a.id;

        return sort === 'asc'
            ? this.episodes.sort(sortAsc).slice(0, limit)
            : this.episodes.sort(sortDesc).slice(0, limit);
    }

    async findFeatured(): Promise<Episode> {
        return this.episodes.find(episode => episode.id === 1);
    }

    async findOne(id: number): Promise<Episode> {
        console.log(id);
        
        return this.episodes.find(episode => episode.id === id);
    }

    async create(createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
        const newEpisode = { ...createEpisodeDto, id: this.episodes.length + 1 };
        this.episodes.push(newEpisode);
        return newEpisode;
    }
}
