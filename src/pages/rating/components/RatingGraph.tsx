import React from 'react';
import { Skeleton } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getRatingName } from '@/utils';

interface Data {
    x: number;
    y: number;
    contestName: string;
    rank: number;
    diffRating: string;
    ratingTitle: string;
    link?: string;
    teamName?: string;
}

export interface UserRating {
    contestName: string;
    rank: number;
    oldRating: number;
    newRating: number;
    time: number;
    link?: string;
    contestId?: string;
    handle?: string;
    teamName?: string;
}

function getDiffRating(oldRating: number, newRating: number) {
    const diff = newRating - oldRating;
    if (newRating > oldRating) {
        return '+' + diff.toString();
    } else {
        return diff.toString();
    }
}

const INF = 0x3f3f3f3f;
function getRatingGraphOptions(
    // handle: string,
    data: Data[],
    tickPositions: number[],
) {
    const options = {
        chart: {
            type: 'line',
            height: '348px',
        },
        title: {
            text: null,
        },
        xAxis: {
            tickWidth: 0,
            minPadding: 0.01,
            minRange: 30 * 24 * 60 * 60 * 1000,
            gridLineWidth: 1,
            type: 'datetime',
            dateTimeLabelFormats: { month: '%b %Y' },
        },
        yAxis: {
            showEmpty: false,
            showFirstLabel: false,
            showLastLabel: false,
            tickPositions: tickPositions,
            tickWidth: 0,
            gridLineWidth: 1,
            labels: {
                enabled: true,
                format: '{value}',
            },
            title: {
                text: null,
            },
            plotBands: [
                {
                    from: 0,
                    to: 1199,
                    color: '#ccc',
                },
                {
                    from: 1200,
                    to: 1399,
                    color: '#7f7',
                },
                {
                    from: 1400,
                    to: 1599,
                    color: '#77ddbb',
                },
                {
                    from: 1600,
                    to: 1899,
                    color: '#aaf',
                },
                {
                    from: 1900,
                    to: 2099,
                    color: '#f8f',
                },
                {
                    from: 2100,
                    to: 2299,
                    color: '#ffcc88',
                },
                {
                    from: 2300,
                    to: 2399,
                    color: '#ffbb55',
                },
                {
                    from: 2400,
                    to: 2599,
                    color: '#f77',
                },
                {
                    from: 2600,
                    to: 2999,
                    color: '#f33',
                },
                {
                    from: 3000,
                    to: 0x3f3f3f3f,
                    color: '#a00',
                },
            ],
        },
        credits: {
            enabled: false,
        },
        plotOptions: {
            line: {
                color: '#efbc47',
                dataLabels: {
                    enabled: false,
                },
                enableMouseTracking: true,
                marker: {
                    enabled: true,
                    fillColor: '#fff566',
                },
            },
        },
        tooltip: {
            enabled: true,
            headerFormat: '',
            pointFormat:
                '= {point.y} ({point.diffRating}), {point.ratingTitle}<br/>Rank: {point.rank}<br/>{point.teamName}<br/>{point.contestName}<br/>',
        },
        series: [
            {
                showInLegend: false,
                allowPointSelect: true,
                // name: handle,
                data: data,
            },
        ],
    };
    return options;
}

class RatingGraph extends React.Component {
    async fetch(data: UserRating[]) {
        let optionsData: Data[] = [];
        let tickPositionsAll = [
            1200,
            1400,
            1600,
            1900,
            2100,
            2300,
            2400,
            2600,
            3000,
        ];
        let maxRating = 0;
        let minRating = 1200;
        data.forEach((rating) => {
            let data: Data = {} as Data;
            data['x'] = rating.time * 1000;
            data['y'] = rating.newRating;
            data.diffRating = getDiffRating(rating.oldRating, rating.newRating);
            data.contestName = rating.contestName;
            data.rank = rating.rank;
            data.link = rating.link;
            data.teamName = rating.teamName;
            data.ratingTitle = getRatingName(rating.newRating);
            optionsData.push(data);
            maxRating = Math.max(maxRating, rating.newRating);
            minRating = Math.min(minRating, rating.newRating);
        });
        const gap = 100;
        minRating = Math.max(0, minRating - gap);
        maxRating = maxRating + gap;
        for (let i = 0; i < tickPositionsAll.length; ++i) {
            if (tickPositionsAll[i] > maxRating) {
                maxRating = tickPositionsAll[i];
                break;
            }
        }
        for (let i = tickPositionsAll.length - 1; i >= 0; --i) {
            if (tickPositionsAll[i] < minRating) {
                minRating = tickPositionsAll[i];
                break;
            }
        }
        if (minRating < 1200) {
            tickPositionsAll = [minRating, ...tickPositionsAll];
        }
        if (maxRating > 3000) {
            tickPositionsAll.push(maxRating);
        }
        this.setState({
            ratingGraphOptions: getRatingGraphOptions(
                // handle,
                optionsData,
                tickPositionsAll.filter(
                    (x) => x >= minRating && x <= maxRating,
                ),
            ),
        });
    }

    async componentWillMount() {
        this.fetch(this.props.ratingData);
    }

    constructor(props: any) {
        super(props);
    }

    state = {
        ratingGraphOptions: null,
    };

    render() {
        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.ratingGraphOptions}
                />
            </div>
        );
    }
}

export { RatingGraph };
