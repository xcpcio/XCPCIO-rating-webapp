import { getJSON } from '@/utils';

export interface RatingConfig {
    name?: string;
    link?: string;
}

export async function fetchRatingList() {
    const rating_list: RatingConfig[] | null = (await getJSON(
        'list.json',
    )) as RatingConfig[];
    if (rating_list?.status === 404) return null;
    return rating_list as RatingConfig[];
}
