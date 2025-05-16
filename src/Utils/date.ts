import moment from "moment";

export const timeLeftFull = (targetDateStr: string) => {
    const now = moment();
    const target = moment(targetDateStr);
    const duration = moment.duration(target.diff(now));

    if (duration.asMilliseconds() <= 0) {
        return 'Đã hết hạn';
    }

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();

    let result = 'Còn ';
    if (days > 0) result += `${days} ngày `;
    if (hours > 0) result += `${hours} giờ `;
    if (minutes > 0) result += `${minutes} phút`;

    return result.trim();
}


export const roundToNextQuarter = (date?: Date) => {
    const rounded = new Date(date || Date.now());
    let minutes = rounded.getMinutes();
    let extra = 15 - (minutes % 15);
    if (extra === 15) extra = 0;
    rounded.setMinutes(minutes + extra);
    if (rounded.getMinutes() === 60) {
        rounded.setMinutes(0);
        rounded.setHours(rounded.getHours() + 1);
    }
    rounded.setSeconds(0);
    rounded.setMilliseconds(0);
    return rounded;
}