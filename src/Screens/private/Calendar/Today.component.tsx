import { Text } from '@Components';
import { ITodo, priority } from '@Models/Todo';
import { RootState, useAppSelector } from '@Store';
import Styles from '@Styles';
import { _generateTimeSequence, _groupByHourAndMinute, sortedArPriorityr } from '@Utils';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TimeLine from './TimeLine.component';

export type timeSequence = {
    key: string;
    hour: string;
    minutes: string;
    time: Date;
    title: string;
    value: {
        hour: string;
        minutes: string;
    };
    timestamp: string;
    index: number;
}


const Today = () => {
    const todo = useAppSelector((state: RootState) => state.todo.data)
    const activeDate = new Date()
    const [data, setData] = useState<ITodo[]>([])

    const [loading, setLoading] = useState(true)
    const [operationTimeBooking, setOperationTimeBooking] = useState<timeSequence[]>([])
    const scrollViewRef = useRef<ScrollView>(null)

    useEffect(() => {
        getData()
    }, [todo.length])

    useEffect(() => {
        if (scrollViewRef.current && !loading) {
            _scrollTo()
        }
    }, [scrollViewRef.current, loading])


    const getData = () => {
        const todayItems = todo.filter(item => moment(item.date).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY"));
        setData(sortedArPriorityr(todayItems))
        const timeSequence = _generateTimeSequence(moment().set({ hour: 0, minute: 0, second: 0, }), moment().set({ hour: 24, minute: 0, second: 0, }), 15, false)
        setOperationTimeBooking(timeSequence)
        setLoading(false)
    }

    const _scrollTo = () => {
        if (moment().format('DD/MM/YYYY') === moment(activeDate).format('DD/MM/YYYY')) {
            const indexTime = operationTimeBooking.findIndex((item) => item.timestamp > moment().format('x')) - 3
            scrollViewRef?.current?.scrollTo?.({ y: 40 * indexTime, animated: true })
        } else
            scrollViewRef?.current?.scrollTo({ y: 0, animated: true });
    }

    const dataBooking = useMemo(() => {
        return Object.entries(
            _groupByHourAndMinute(
                data.map((item) => ({
                    ...item,
                    key: operationTimeBooking.findIndex((i) => {
                        const title = moment(item.date).format('HH:mm')
                        return i.title === title
                    }),
                }))
            )
        )
    }, [data.length, loading])


    return (
        <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}>
            <View style={styles.calender}>
                <View>
                    {operationTimeBooking.map((i, index) => (
                        <View
                            key={index}
                            style={[styles.rowTime, { backgroundColor: i?.key % 2 !== 0 ? 'white' : '#f8f8f8' }]}
                        >
                            <Text font='semibold'>{i.hour}</Text>
                            <Text>{i.minutes}</Text>
                        </View>
                    ))}
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View>
                        {operationTimeBooking.map((item, key) => (
                            <View key={key} style={{ height: 40 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a, i) => {
                                        const disable = moment().format('DD/MM/YYYY') === moment(activeDate).format('DD/MM/YYYY') && item.timestamp < moment().format("x")
                                        if (disable)
                                            return <View
                                                key={i}
                                                style={[
                                                    styles.rowEmptyTodo,
                                                    disable && {
                                                        backgroundColor: '#EBEBEB'
                                                    }
                                                ]}
                                            />
                                        return <View
                                            key={i}
                                            style={[
                                                styles.rowEmptyTodo,
                                                { backgroundColor: key % 2 === 0 ? 'white' : '#f8f8f8' },

                                            ]}
                                        />
                                    }
                                    )}
                                </View>
                            </View>
                        ))}
                        {loading ||
                            dataBooking?.map((item, top) =>
                                item?.[1]?.map((value, k) => {
                                    if (moment(value?.date).format('x') < moment().startOf('day').format("x"))
                                        return <View key={k} />
                                    const priorityDetail = priority.find((i) => i.value === value.priority)

                                    return (
                                        <View
                                            key={k}

                                            style={[
                                                styles.itemBookingDetail,
                                                {
                                                    left: 160 * k,
                                                    top: 40 * value.key,
                                                },
                                                moment(moment(value.date)).isBefore() && {
                                                    opacity: 0.6
                                                }
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    {
                                                        backgroundColor: top % 2 === 0 ? 'white' : '#f8f8f8',
                                                        borderLeftColor: top % 2 === 0 ? Styles.palette.light.main : '#8961F6FF',
                                                    },
                                                    styles.containerTodoDetail,
                                                ]}
                                            >
                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text variant="body" font="bold" customColor={Styles.palette.light.main}>{value.title}</Text>
                                                </View>
                                                <ItemService
                                                    title="Thời gian:"
                                                    content={<Text variant="body" size={14} color="blue" font="regular" >{moment(value.date).format("HH:mm")}</Text>}
                                                />
                                                <ItemService
                                                    title="Mức độ:"
                                                    content={<Text variant="body" size={14} customColor={priorityDetail?.color} font="regular" >{priorityDetail?.title}</Text>
                                                    }
                                                />
                                            </View>
                                        </View>
                                    )
                                })
                            )}
                    </View>
                </ScrollView>
                {!loading && moment().format('DD/MM/YYYY') === moment(activeDate).format('DD/MM/YYYY') && (
                    <TimeLine operationTimeBooking={operationTimeBooking} stepBooking={30} />
                )}
            </View>
        </ScrollView>
    )
}
const ItemService = ({ title, content }: any) => {

    return <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
        <Text font="semibold" >{title}:</Text>
        {content}
    </View>
}
export default Today


const styles = StyleSheet.create({

    calender: {
        flexDirection: 'row',
    },
    rowTime: {
        height: 40,
        width: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Styles.padding.sm,
    },
    rowEmptyTodo: {
        height: 40,
        width: 160,
        borderRightWidth: 1,
        borderRightColor: Styles.backgroundScreen,
    },
    itemBookingDetail: {
        position: 'absolute',
    },
    containerTodoDetail: {
        ...Styles.shadow,
        width: 150,
        marginHorizontal: 5,
        padding: 5,
        borderRadius: Styles.borderRadius.xs,
        borderLeftWidth: 2,
        borderWidth: 1,
        borderColor: Styles.borderColor,
    },
})
