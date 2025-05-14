import { Injectable } from '@nestjs/common';

interface Episode {
    id: number;
    title: string;
    description: string;
}

@Injectable()
export class EpisodesService {
    private episodes: Episode[] = []

    async findAll(sort: 'asc' | 'desc' = 'asc'): Promise<Episode[]> {
        const sortAsc = (a: Episode, b: Episode) => a.id - b.id;
        const sortDesc = (a: Episode, b: Episode) => b.id - a.id;

        return sort === 'asc'
            ? this.episodes.sort(sortAsc)
            : this.episodes.sort(sortDesc);
    }

    async findFeatured(): Promise<Episode> {
        return this.episodes.find(episode => episode.id === 1);
    }

    async findOne(id: number): Promise<Episode> {
        return this.episodes.find(episode => episode.id === id);
    }

    // async create(episode: Episode): Promise<Episode> {
    //     const newEpisode = { ...createEpisodeDto, id: this.episodes.length + 1 };
}
