import moment from 'moment';

export const formatDate = (): string => {
    return moment().format('dddd | DD MMM | h:mma');
};

export function formatMessageTime(dateString: string): string {
    const date = moment(dateString);
    const now = moment();

    if (date.isSame(now, 'day')) {
        return date.format('HH:mm');
    } else {
        return date.format('dddd HH:mm');
    }
}

export function hasDateChanged(prevTimestamp: string, currentTimestamp: string): boolean {
    const prevDate = moment(prevTimestamp).startOf('day');
    const currentDate = moment(currentTimestamp).startOf('day');
    return !prevDate.isSame(currentDate);
}

export function formatDateTime(dateString: string): string {
    const date = moment(dateString);
    return date.format('HH:mm DD [Month] MM, YYYY');
}

export const formatRelativeTime = (dateString: string) => {
    const now = moment();
    const inputDate = moment(dateString, "DD/MM/YYYY");
    const duration = moment.duration(inputDate.diff(now));
    const days = duration.asDays();
    if (days <= 0) {
        return { key: '0', date: `Today`};
    } else if ( days > 0 && days <= 1) {
        return { key: '1', date: `Tomorrow`};
    } else {
        return { key: 'exit', date: dateString};
    }
};

export const getCurrentDate = (): string => {
    return moment().startOf('day').format('DD/MM/YYYY');
};

export const getTomorrowDate = (): string => {
    return moment().add(1, 'days').startOf('day').format('DD/MM/YYYY');
};
