import moment from 'moment';
import { RelativeTime } from '../common/general';
import dayjs from 'dayjs';

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

export const formatRelativeTime = (dateString: string) : { key: string, date: string} => {
    const now = moment();
    const inputDate = moment(dateString, "DD/MM/YYYY");
    const duration = moment.duration(inputDate.diff(now));
    const days = duration.asDays();
    if (days <= -2) {
        return { key: RelativeTime.OTHER, date: dateString};
    } else if (days > -2 && days <= -1 ) {
        return { key: RelativeTime.YESTERDAY, date: `Yesterday`};
    } else if (days > -1 && days <= 0) {
        return { key: RelativeTime.TODAY, date: `Today`};
    } else if ( days > 0 && days <= 1) {
        return { key: RelativeTime.TOMORROW, date: `Tomorrow`};
    } else {
        return { key: RelativeTime.EXIT, date: dateString};
    }
};

export const getCurrentDate = (): string => {
    return moment().startOf('day').format('DD/MM/YYYY');
};

export const getTomorrowDate = (): string => {
    return moment().add(1, 'days').startOf('day').format('DD/MM/YYYY');
};

export const convertDayjsToDate = (dayjsValue: dayjs.Dayjs): string => {
    return dayjsValue.format('DD/MM/YYYY');
};

export const getMonthYear = (dayjsValue: dayjs.Dayjs): string => {
    return dayjsValue.format('MM/YYYY');
};
