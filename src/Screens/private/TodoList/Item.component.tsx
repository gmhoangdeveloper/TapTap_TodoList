import { Text } from '@Components';
import { Icon } from '@Components/Icon';
import { priority } from '@Models/Todo';
import { IPriority, ITodo } from '@Models/Todo/model';
import { useAppDispatch } from '@Store';
import { removeItemTodo, updateItemTodo } from '@Store/Todo';
import Styles from '@Styles';
import { timeLeftFull } from '@Utils/date';
import React, { useCallback, useRef } from 'react';
import { Alert, Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, ReduceMotion, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import SelectDate from './SelectDate.component';
import SelectPriority from './SelectPriority.component';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

type IItemProps = {
    item: ITodo,
    index: number
}

const Item = ({ item, index }: IItemProps) => {
    const dispatch = useAppDispatch()

    const refInput = useRef<TextInput>(null)
    const [isEdit, setIsEdit] = React.useState<boolean>(true)
    const [input, setInput] = React.useState(item?.title)
    const [selectPriority, setSelectPriority] = React.useState<IPriority | undefined>(priority?.find((i) => i.value === item?.priority) || priority[0])
    const [selectDate, setSelectDate] = React.useState(new Date(item?.date))

    const height = useSharedValue(90)
    const inputTop = useSharedValue(16)
    const inputLeft = useSharedValue(44)
    const inputBorderBottom = useSharedValue(0)
    const inputWidth = useSharedValue((32 * 2) + 50)
    const checkOpacity = useSharedValue(1)

    const animatedStyles = useAnimatedStyle(() => ({ height: height.value }))
    const animatedInputStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: inputTop.value, }, { translateX: inputLeft.value }],
        borderBottomWidth: inputBorderBottom.value,
        width: inputWidth.value
    }))

    const animatedCheckStyles = useAnimatedStyle(() => ({
        opacity: checkOpacity.value
    }))

    const startAnimation = () => {
        height.value = withTiming(250, { duration: 250, easing: Easing.in(Easing.ease), reduceMotion: ReduceMotion.Never, })
        checkOpacity.value = withTiming(0, { duration: 250 })
        inputBorderBottom.value = withTiming(1, { duration: 10 })
        inputTop.value = withTiming(40, { duration: 300 })
        inputLeft.value = withTiming(16, { duration: 300 })
        inputWidth.value = withDelay(200, withTiming(Styles.dimensions.width - (32 * 2)))
        console.log(refInput.current)
        setTimeout(() => { refInput.current?.focus() }, 0)
    }

    const endAnimation = () => {
        Keyboard.dismiss()
        setIsEdit((prev) => !prev)
        height.value = withTiming(100, { duration: 250 })
        checkOpacity.value = withTiming(1, { duration: 250 })
        inputBorderBottom.value = withTiming(0, { duration: 250 })
        inputWidth.value = withTiming((32 * 2) + 50, { duration: 250 })
        inputTop.value = withTiming(16, { duration: 250 })
        inputLeft.value = withTiming(44, { duration: 250 })
    }

    const handleDelete = useCallback(() => {
        Alert.alert("Thông báo", `Bạn muốn xoá ${item.title} này không?`, [
            { text: 'Huỷ' },
            {
                text: 'Xác nhận',
                onPress: () => {
                    dispatch(removeItemTodo(item.id))
                },
                style: 'destructive',
            },
        ])
    }, [])

    const handleEdit = useCallback(() => {
        setIsEdit((prev) => !prev)
        startAnimation()
    }, [])

    const handleSave = () => {
        if (input.length === 0) {
            return Alert.alert("Thông báo", `Nội dung không được để trống`, [
                { text: 'Đồng ý' },
            ])
        }
        endAnimation()
        const value = {
            id: item.id,
            title: input,
            priority: selectPriority?.value,
            date: selectDate
        }
        dispatch(updateItemTodo(value))
    }

    return <Animated.View style={[animatedStyles, styles.root]}>
        <View style={styles.header}>
            <Animated.View style={[animatedCheckStyles, styles.containerNumber]} >
                <Text color="third"  >{index + 1}</Text>
            </Animated.View>
            <View style={styles.containerAction}>
                <View />
                {isEdit ?
                    <AnimatedTouchableOpacity
                        entering={FadeIn}
                        exiting={FadeOut}
                        onPress={handleEdit} >
                        <Icon name="edit-2" type='Feather' size={20} />
                    </AnimatedTouchableOpacity>
                    : <AnimatedTouchableOpacity
                        entering={FadeIn}
                        exiting={FadeOut}
                        style={styles.btnDelete}
                        onPress={handleDelete} >
                        <Icon name="delete" type='AntDesign' size={20} color={Styles.text.error} />
                        <Text style={{ color: Styles.text.error }}>Xoá</Text>
                    </AnimatedTouchableOpacity>
                }
            </View>
        </View>
        <Animated.View style={[animatedInputStyles, styles.contaierInput]}>
            <TextInput
                editable={!isEdit}
                ref={refInput}
                value={input}
                onChangeText={setInput}
                style={styles.input} />
        </Animated.View>
        {isEdit ?
            <View style={styles.conatinerEdit}>
                <View style={styles.containerNumberHide} />
                <View style={styles.contentEdit}>
                    <Text font="semibold" customColor={selectPriority?.color} >{selectPriority?.subtitle}</Text>
                    <Text>{timeLeftFull(item.date)}</Text>
                </View>
            </View>
            :
            <Animated.View entering={FadeIn} exiting={FadeOut} >
                <View style={styles.contentEditActive} />
                <ItemContent title={"Thời hạn"} content={<SelectDate value={selectDate} setValue={setSelectDate} />} />
                <ItemContent title={"Mức độ ưu tiên"} content={<SelectPriority value={selectPriority} setState={setSelectPriority} />} />
                <View style={styles.containerEditActiveBtn}>
                    <TouchableOpacity onPress={handleSave} style={styles.btnDone}>
                        <Text color="third">Xong</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>}
    </Animated.View >
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: Styles.backgroundBody,
        borderRadius: Styles.borderRadius.sm,
        padding: Styles.padding.sm
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    containerNumber: {
        width: 20,
        alignItems: "center",
        backgroundColor: Styles.palette.light.main,
        borderRadius: Styles.borderRadius.xs
    },
    containerAction: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 8
    },
    btnDelete: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8
    },
    contaierInput: {
        height: 30,
        position: "absolute", justifyContent: "center",
        zIndex: 1,
    },
    input: {
        height: 40,
        width: Styles.dimensions.width - ((32 * 2) + 56),
        fontWeight: "600", fontSize: 16,
    },
    conatinerEdit: {
        flexDirection: "row", marginTop: Styles.margin.sm,
    },
    containerNumberHide: {
        width: 20,
        height: 20,
    },
    contentEdit: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        marginLeft: Styles.margin.xs,
    },
    contentEditActive: {
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomColor: "#dbdbdb",
        paddingVertical: Styles.padding.sm,
        height: 50
    },
    containerEditActiveBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: Styles.margin.sm,
    },
    btnDone: {
        backgroundColor: "#22ab3c",
        alignItems: "center",
        paddingVertical: Styles.padding.xs,
        paddingHorizontal: Styles.padding.lg,
        borderRadius: 20
    }

})
const ItemContent = ({ title, content }: any) => {
    return <View style={stylesItemContent.root}>
        <Text variant="label">{title}</Text>
        {content}
    </View>
}


const stylesItemContent = StyleSheet.create({
    root: {
        borderBottomWidth: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomColor: "#dbdbdb",
        height: 50,
        alignItems: "center"
    },
})

export { Item };
