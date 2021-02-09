import React from 'react';
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
    info?: string;
}

export interface UserRating {
    contestName: string;
    rank: number;
    oldRating: number;
    newRating: number;
    time: number;
    link?: string;
    contestId?: string;
    info?: string;
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
            gridLineWidth: 0.5,
            minRange: 30 * 24 * 60 * 60 * 1000,
            type: 'datetime',
            showFirstLabel: true,
            showLastLabel: true,
            dateTimeLabelFormats: { month: '%b %Y' },
        },
        yAxis: {
            showEmpty: false,
            showFirstLabel: false,
            showLastLabel: false,
            tickPositions: tickPositions,
            tickWidth: 0,
            gridLineWidth: 0.5,
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
                    color: '#CCCCCC',
                },
                {
                    from: 1200,
                    to: 1399,
                    color: '#98FA87',
                },
                {
                    from: 1400,
                    to: 1599,
                    color: '#90DABD',
                },
                {
                    from: 1600,
                    to: 1899,
                    color: '#A9ACF9',
                },
                {
                    from: 1900,
                    to: 2099,
                    color: '#EF91F9',
                },
                {
                    from: 2100,
                    to: 2299,
                    color: '#F7CD91',
                },
                {
                    from: 2300,
                    to: 2399,
                    color: '#F5BD67',
                },
                {
                    from: 2400,
                    to: 2599,
                    color: '#Ef7F7B',
                },
                {
                    from: 2600,
                    to: 2999,
                    color: '#EB483F',
                },
                {
                    from: 3000,
                    to: 0x3f3f3f3f,
                    color: '#9C1E14',
                },
            ],
        },
        credits: {
            enabled: false,
        },
        plotOptions: {
            line: {
                color: '#ffec3d',
                dataLabels: {
                    enabled: false,
                },
                enableMouseTracking: true,
                marker: {
                    enabled: true,
                    fillColor: '#fffb8f',
                },
            },
        },
        tooltip: {
            enabled: true,
            headerFormat: '',
            useHTML: true,
            shared: true,
            shadow: true,
            followPointer: false,
            followTouchMove: false,
            pointFormat: `= {point.y} ({point.diffRating}), {point.ratingTitle}
                <br/>Rank: {point.rank}
                <br/>{point.info}
                <br/><a href="{point.link}">{point.contestName}</a>
                <br/>`,
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
    fetch(data: UserRating[]) {
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
            data.link = rating.link || '';
            data.info = rating.info || '';
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

    componentWillMount() {
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
