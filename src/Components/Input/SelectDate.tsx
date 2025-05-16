import { Text } from '@Components';
import { Button } from '@Components/Button';
import { Icon } from '@Components/Icon';
import Styles from '@Styles';
import { roundToNextQuarter } from '@Utils/date';
import { Portal } from '@gorhom/portal';
import moment from 'moment';
import React, { useRef } from 'react';
import { Controller, InternalFieldName } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Modalize } from 'react-native-modalize';

interface ISelectDate {
    control: any,
    name: InternalFieldName,
    title: string,
}

const SelectDate = React.memo(({ control, name, title, }: ISelectDate) => {
    const modalDateStartRef = useRef<Modalize>(null);

    const [timeStart, setTimeStart] = React.useState(new Date())

    return <View>
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => {

                return <View >
                    {title ? <Text variant='caption' color="secondary">{title}</Text> : null}
                    <Pressable onPress={() => {
                        Keyboard.dismiss()
                        modalDateStartRef.current?.open()
                    }}
                        style={({ pressed }) => [
                            styles.input,
                            error?.message && styles.inputFocusingError,
                            pressed && styles.inputFocusing,
                        ]}>
                        <Text variant="body" font="regular" color={error?.message ? "error" : "secondary"} size={15}>{value ? moment(value).format("DD/MM/YYYY HH:mm A") : "DD/MM/YYYY"}</Text>
                    </Pressable>
                    <Portal>
                        <Modalize ref={modalDateStartRef} adjustToContentHeight>
                            <View style={styles.header}>
                                <Text variant="title" font="semibold" size={18}>Thời gian</Text>
                                <TouchableOpacity onPress={() => { modalDateStartRef.current?.close() }}>
                                    <Icon name="close" type="AntDesign" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.wrapperContainer}>
                                <Text>{moment(timeStart).format("DD/MM/YYYY")}</Text>
                                <DatePicker
                                    style={{ width: Styles.dimensions.width - (Styles.padding.lg * 2) }}
                                    theme="light"
                                    mode="datetime"
                                    locale='vi'
                                    date={new Date(timeStart)}
                                    onDateChange={setTimeStart}
                                    minuteInterval={15}
                                    minimumDate={moment().subtract(0.2, "years").toDate()}
                                />
                                <Button title="Xác nhận" onPress={() => {
                                    onChange(moment(roundToNextQuarter(timeStart)).format())
                                    modalDateStartRef.current?.close()
                                }} />
                            </View>
                        </Modalize>
                    </Portal>
                    {error?.message ? <Text style={styles.textError} variant="caption" color="error">{error?.message}</Text> : null}
                </View>
            }}
        />
    </View >
})


export default SelectDate


const styles = StyleSheet.create({
    title: {
        marginVertical: 8
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: Styles.borderRadius.xs,
        borderColor: Styles.borderColor,
        backgroundColor: Styles.backgroundBody,
        height: 50,
        justifyContent: "center"
    },
    inputFocusing: {
        borderWidth: 2,
        borderColor: Styles.palette.light.main,
    },
    textError: {
        flex: 1,
        fontStyle: "italic"
    },
    inputFocusingError: {
        borderWidth: 1,
        backgroundColor: "#FFF3F2",
        borderColor: "#FFE5E2",
        color: "#C84032"
    },
    header: {
        flex: 1, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: Styles.padding.lg,
        paddingVertical: Styles.padding.sm,
        borderBottomWidth: 1,
        borderColor: Styles.borderColor
    },
    wrapperContainer: {
        paddingHorizontal: Styles.padding.lg,
        paddingBottom: Styles.padding.lg,
    }
})