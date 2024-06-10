import { Character } from "../types"

export const characterKeys = {
    characters: [{type: "characters"}] as const,
    charactersPage: (page: number, {gender, name, status}: Partial<Pick<Character, 'status' | 'gender' | 'name'>>) => [{...characterKeys.characters[0], page, gender, name, status}] as const,
    character: (id: number) => [{...characterKeys.characters[0], id}] as const,
}   

export const locationKeys = {
    locations: [{type: "location"}] as const,
    locationsPage: (page: number, { name }: { name ?: string }) => [{...locationKeys.locations[0], page, name}] as const,
    location: (id: number) => [{...locationKeys.locations[0], id}] as const,
}

export const episodeKeys = {
    episodes: [{type: "episode"}] as const,
    episodesPage: (page: number, { name }: { name ?: string }) => [{...episodeKeys.episodes[0], page, name}] as const,
    episode: (id: number) => [{...episodeKeys.episodes[0], id}] as const,
}