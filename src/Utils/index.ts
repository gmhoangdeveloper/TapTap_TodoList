import { ITodo, priorityOrder } from '@Models/Todo';
import moment, { Moment } from 'moment';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();


export const sortedArPriorityr = (data: ITodo[]) => {
    return data?.length
        ? [...data].sort(
            (a, b) =>
                priorityOrder[a.priority as keyof typeof priorityOrder] -
                priorityOrder[b.priority as keyof typeof priorityOrder]
        )
        : [];
};


export const _generateTimeSequence = (startTime: Moment, endTime: Moment, stepMinutes = 0, hideTimeBefore = true) => {
    const timeArray = [];
    const currentTime = new Date(startTime.toDate());
    while (currentTime <= new Date(endTime.toDate())) {
        const hour = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        if (hideTimeBefore) {
            if ((moment(currentTime).format("x") > moment().format("x"))) {
                timeArray.push({
                    key: hour,
                    hour: minutes === "00" ? hour : "",
                    minutes: minutes,
                    time: currentTime,
                    title: `${hour}:${minutes}`,
                    value: { hour, minutes },
                    timestamp: moment(currentTime).format("x"),
                    index: Number(minutes) / stepMinutes
                });
            }
        }
        else
            timeArray.push({
                key: hour,
                hour: minutes === "00" ? hour : "",
                minutes: minutes,
                time: currentTime,
                title: `${hour}:${minutes}`,
                value: { hour, minutes },
                timestamp: moment(currentTime).format("x"),
                index: Number(minutes) / stepMinutes
            });

        currentTime.setMinutes(currentTime.getMinutes() + stepMinutes);
    }

    return timeArray;
}

export const _groupByHourAndMinute = (array: any[]) => {
    return array.reduce((grouped: { [x: string]: any[]; }, item: { timeBooking: moment.MomentInput; }) => {
        const time = moment(item.timeBooking).utc()
        const hour = time.hour()
        const minute = time.minute()
        const key = `${hour}:${minute}`

        if (!grouped[key]) {
            grouped[key] = []
        }

        grouped[key].push(item)
        return grouped
    }, {})
}
