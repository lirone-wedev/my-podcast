export interface Episode {
    id: number;
    title: string;
    description: string;
}

export interface CreateEpisodeDto {
    title: string;
    description: string;
}