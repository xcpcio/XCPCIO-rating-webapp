import { getJSON } from '@/utils';

export interface RatingConfig {
    name?: string;
    organization?: string;
}

export interface HistoryItem {
    contestId: string | number;
    contestName: string;
    teamName: string;
    rank: number;
    rating: number;
}

export interface TeamRating {
    handle: string;
    organization?: string;
    members?: string[];
    history: HistoryItem[];
    rating: number;
    maxRating: number;
    name?: string;
}

function getTeamName(historyList: HistoryItem[]) {
    let nameList: string[] = [];
    for (let i = 0; i < historyList.length; ++i) {
        nameList.push(historyList[i].teamName);
    }
    nameList.sort();
    return [...new Set(nameList)];
}

export async function fetchData(urlPrefix: string) {
    const ratingConfig: RatingConfig = (await getJSON(
        [urlPrefix, 'config.json'].join('/'),
    )) as RatingConfig;
    const teamRatingDict: any = (await getJSON(
        [urlPrefix, 'rating.json'].join('/'),
    )) as TeamRating;
    let teamRatingList: TeamRating[] = [];
    for (let k in teamRatingDict) {
        teamRatingDict[k]['name'] = getTeamName(teamRatingDict[k].history).join(
            ', ',
        );
        teamRatingList.push(teamRatingDict[k]);
    }
    teamRatingList.sort((a: TeamRating, b: TeamRating) => {
        if (a.rating > b.rating) return -1;
        if (a.rating < b.rating) return 1;
        return 0;
    });
    return { ratingConfig, teamRatingList };
}
