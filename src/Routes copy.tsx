import React, { useRef } from 'react'
import { hideSplash } from 'react-native-splash-view';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, TextInput
} from 'react-native';
import Animated, { cancelAnimation, createAnimatedPropAdapter, Easing, FadeIn, FadeOut, ReduceMotion, useAnimatedProps, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { Icon } from '@Components/Icon';
import Styles from '@Styles';


const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedInput = Animated.createAnimatedComponent(TextInput)

const fakeData = [{ title: "Task1", time: "27/11/2021", rank: "Cao" }, { title: "Task1", time: "27/11/2021", rank: "Cao" }, { title: "Task1", time: "27/11/2021", rank: "Cao" }, { title: "Task1", time: "27/11/2021", rank: "Cao" }, { title: "Task1", time: "27/11/2021", rank: "Cao" }]

const Routes = () => {
    React.useEffect(() => {
        hideSplash(); // Hide after some time

    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#6b3de8",

        }}>
            <ScrollView
                style={{ flexGrow: 1, borderWidth: 1 }}
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: 16
                }}
            >
                <View
                    style={{
                        columnGap: 10,
                        rowGap: 10,
                    }}>
                    {fakeData.map((item, key) => <Item item={item} key={key} />)}
                </View>
            </ScrollView>
        </View>
    )
}
const TextInputAdapter = createAnimatedPropAdapter(
    (props) => {
        'worklet';
        if (Object.keys(props).includes('value')) {
            props.text = props.value;
            delete props.value;
        }
    },
    ['text']
);
const Item = ({ item }: any) => {
    const [isEdit, setIsEdit] = React.useState<boolean>(true)
    const height = useSharedValue(90)
    const inputTop = useSharedValue(16)
    const inputLeft = useSharedValue(44)
    const inputBorderBottom = useSharedValue(0)
    const inputWidth = useSharedValue((32 * 2) + 50)
    const checkOpacity = useSharedValue(1)
    const translateX = useSharedValue<number>(0);
    const ref = useRef(null)

    const startAnimation = () => {
        height.value = withTiming(230, {
            duration: 250,
            easing: Easing.in(Easing.ease),
            reduceMotion: ReduceMotion.Never,
        })
        checkOpacity.value = withTiming(0, { duration: 250 })
        inputBorderBottom.value = withTiming(1, { duration: 500 })
        inputTop.value = withSpring(40, { duration: 500 })
        inputLeft.value = withSpring(16, { duration: 500 })
        inputWidth.value = withDelay(200, withTiming(Styles.dimensions.width - (32 * 2)))
    }
    const endAnimation = () => {
        height.value = withTiming(100, { duration: 500 })
        checkOpacity.value = withTiming(1, { duration: 500 })
        setIsEdit((prev) => !prev)
        inputBorderBottom.value = withTiming(0, { duration: 500 })
        inputWidth.value = withDelay(200, withTiming((32 * 2) + 50))
        inputTop.value = withTiming(16, { duration: 500 })
        inputLeft.value = withTiming(44, { duration: 500 })
    }
    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: height.value
        }
    })
    const animatedInputStyles = useAnimatedStyle(() => {
        return {
            // top: inputTop.value,
            // left: inputLeft.value,
            transform: [{ translateY: inputTop.value, }, {
                translateX: inputLeft.value
            }],
            borderBottomWidth: inputBorderBottom.value,
            width: inputWidth.value
        }
    })


    // const animatedButtonDeleteStyles = useAnimatedStyle(() => ({
    //     transform: [{ translateX: withSpring(translateX.value * 2) }],
    // }));
    const animatedCheckStyles = useAnimatedStyle(() => {
        return {
            opacity: checkOpacity.value
        }
    })
    // eslint-disable-next-line react-native/no-inline-styles
    return <Animated.View style={[animatedStyles, {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 16
    }]}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>

            <Animated.View style={[animatedCheckStyles, {
                backgroundColor: "#c4c4c4",
                width: 20,
                height: 20,
                borderRadius: 6,

            }]} />
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between", flex: 1,
                marginLeft: 8
            }}>
                {/* <Text style={{ fontWeight: "600", fontSize: 16 }}>Task</Text> */}
                <View />
                {isEdit ?
                    <AnimatedTouchableOpacity
                        entering={FadeIn}
                        exiting={FadeOut}
                        onPress={() => {
                            setIsEdit((prev) => !prev)
                            startAnimation()
                        }} >
                        <Icon name="edit-2" type='Feather' size={18} />
                        {/* <Text style={{ color: "red" }}>Sửa</Text> */}
                    </AnimatedTouchableOpacity>
                    : <AnimatedTouchableOpacity
                        entering={FadeIn}
                        exiting={FadeOut}
                        style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}
                        onPress={() => {
                            // setIsEdit((prev) => !prev)
                        }} >
                        <Icon name="delete" type='AntDesign' size={18} color="#f44336" />
                        <Text style={{
                            color: "#f44336"
                        }}>Xoá</Text>
                    </AnimatedTouchableOpacity>
                }
            </View>
        </View>
        {/* <Animated.View style={[animatedInputStyles, {
            height: 30,

            // width: Styles.dimensions.width - (32 * 2),
            position: "absolute", left: 44, top: 16, justifyContent: "center"
        }]}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>Task</Text>
        </Animated.View> */}
        <AnimatedInput value={"Task"} style={[animatedInputStyles, {
            height: 30,
            // width: Styles.dimensions.width - (32 * 2),
            fontWeight: "600", fontSize: 16,
            position: "absolute", justifyContent: "center",
            // backgroundColor: "red"
        }]} />
        {isEdit ?
            <>
                <View style={{ flexDirection: "row", marginTop: 16 }}>
                    <View style={[{
                        width: 20,
                        height: 20,
                    }]} />
                    <View style={{
                        flexDirection: "row", justifyContent: "space-between", flex: 1,
                        marginLeft: 8

                    }}>
                        <Text style={{ color: "green", fontWeight: 600 }}>Ưu tiên trung bình</Text>
                        <Text>Còn 2 ngày</Text>
                    </View>

                </View>
            </> : <>
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                >
                    <View style={{ justifyContent: "space-between", flexDirection: "row", borderBottomColor: "#dbdbdb", paddingVertical: 12, height: 30 }}>
                        {/* <Text style={{ fontWeight: "600", fontSize: 16 }}>{"Task 1"}</Text> */}
                    </View>
                    <ItemContent title={"Thời hạn"} content={"27/11/2021"} />
                    <ItemContent title={"Mức độ ưu tiên"} content={"Cao"} />
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 16, }}>
                        <TouchableOpacity onPress={() => endAnimation()} style={{ backgroundColor: "#22ab3c", alignItems: "center", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}>
                            <Text style={{ color: "#FFFFFF" }}>Xong</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </>
        }

        {/* <Text>{item.title}</Text> */}



    </Animated.View >
}
const ItemContent = ({ title, content }) => {
    return <View style={{ borderBottomWidth: 1, justifyContent: "space-between", flexDirection: "row", borderBottomColor: "#dbdbdb", paddingVertical: 12 }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{title}</Text>
        <Text>{content}</Text>
    </View>
}

export default Routes

const styles = StyleSheet.create({})