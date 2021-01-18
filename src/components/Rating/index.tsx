import { host } from '@/model';
import React from 'react';
import style from './index.less';
import { getRatingName } from '@/utils';

function getRankClassName(rank: string): string {
    switch (rank) {
        case 'newbie':
            return 'user-gray';
        case 'pupil':
            return 'user-green';
        case 'specialist':
            return 'user-cyan';
        case 'expert':
            return 'user-blue';
        case 'candidate master':
            return 'user-violet';
        case 'master':
            return 'user-orange';
        case 'international master':
            return 'user-orange';
        case 'grandmaster':
            return 'user-red';
        case 'international grandmaster':
            return 'user-red';
        case 'legendary grandmaster':
            return 'user-legendary';
    }
    return '';
}

export const RatingSpan = ({ rating }) => {
    return (
        <span
            style={{ fontWeight: 'bold' }}
            className={
                style[getRankClassName(getRatingName(rating).toLowerCase())]
            }
        >
            {rating}, {getRatingName(rating)}
        </span>
    );
};
