export function getRatingName(rating: number) {
    if (rating >= 3000) {
        return 'Legendary Grandmaster';
    } else if (rating >= 2600) {
        return 'International Grandmaster';
    } else if (rating >= 2400) {
        return 'Grandmaster';
    } else if (rating >= 2300) {
        return 'International Master';
    } else if (rating >= 2100) {
        return 'Master';
    } else if (rating >= 1900) {
        return 'Candidate Master';
    } else if (rating >= 1600) {
        return 'Expert';
    } else if (rating >= 1400) {
        return 'Specialist';
    } else if (rating >= 1200) {
        return 'Pupil';
    } else {
        return 'Newbie';
    }
}
