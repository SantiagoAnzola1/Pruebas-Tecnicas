export const FILTERABLE_CAPITALS = [
    "Tallinn",
    "Helsinki",
    "Stockholm",
    "Oslo",
    "Copenhagen",
    "Reykjavik",
    "Valletta"
] as const;

export type Capital = (typeof FILTERABLE_CAPITALS)[number];


export interface Country {
    name: {
        common: string;
    };
    capital: string;

}