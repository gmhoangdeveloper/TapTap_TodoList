import { Text } from '@Components';
import { Button } from '@Components/Button';
import { Icon } from '@Components/Icon';
import Styles from '@Styles';
import { roundToNextQuarter } from '@Utils/date';
import { Portal } from '@gorhom/portal';
import moment from 'moment';
import React, { useRef } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Modalize } from 'react-native-modalize';

interface ISelectDate {
    value: any,
    setValue: any
}
// const timeDefault = roundToNextQuarter({ date: new Date() })
const SelectDate = React.memo(({ value, setValue }: ISelectDate) => {
    const modalDateStartRef = useRef<Modalize>(null);

    const [timeStart, setTimeStart] = React.useState(value)

    return <View>
        <TouchableOpacity onPress={() => {
            Keyboard.dismiss()
            setTimeStart(value)
            modalDateStartRef.current?.open()
        }}>
            <Text variant="body" font="regular" size={15}>{moment(value).format("DD/MM/YYYY HH:mm A")}</Text>
        </TouchableOpacity>
        <Portal>
            <Modalize ref={modalDateStartRef} adjustToContentHeight>
                <View style={styles.header}>
                    <Text variant="title" font="semibold" size={18}>Thời gian</Text>
                    <TouchableOpacity onPress={() => { modalDateStartRef.current?.close() }}>
                        <Icon name="close" type="AntDesign" />
                    </TouchableOpacity>
                </View>
                <View style={styles.wrapperContainer}>
                    <DatePicker
                        style={{ width: Styles.dimensions.width - (Styles.padding.lg * 2) }}
                        theme="light"
                        mode="datetime"
                        locale='vi'
                        date={new Date((timeStart))}
                        onDateChange={setTimeStart}
                        minuteInterval={15}
                        minimumDate={moment().subtract(0.2, "years").toDate()}
                    />
                    <Button title="Xác nhận" onPress={() => {
                        setValue(roundToNextQuarter(timeStart))
                        modalDateStartRef.current?.close()
                    }} />
                </View>
            </Modalize>
        </Portal>
    </View >
})


export default SelectDate


const styles = StyleSheet.create({
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