import React from 'react'
import { hideSplash } from 'react-native-splash-view';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

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
                contentContainerStyle={{ flex: 1 }}
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
const Item = ({ item }: any) => {
    const [isEdit, setIsEdit] = React.useState<boolean>(false)
    const height = useSharedValue(50)
    const checkOpacity = useSharedValue(1)
    const translateX = useSharedValue<number>(0);

    const startAnimation = () => {
        setTimeout(() => {
            setIsEdit(true)
        }, 100);
        height.value = withTiming(200)
        checkOpacity.value = withSpring(0)
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: height.value
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
            <View>
                <AnimatedTouchableOpacity style={{
                    transform: [{ scale: 1 }]
                }} onPress={startAnimation} >
                    <Text style={{ color: "red" }}>Sửa</Text>
                </AnimatedTouchableOpacity>
                <AnimatedTouchableOpacity onPress={startAnimation}>
                    <Text>Xoa</Text>
                </AnimatedTouchableOpacity>
            </View>

        </View>

        <Animated.View
            entering={FadeIn}
        // exiting={FadeInDown}
        >
            <ItemContent title={"Thời hạn"} content={"27/11/2021"} />
            <ItemContent title={"Mức độ ưu tiên"} content={"Cao"} />

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 16, }}>

                <TouchableOpacity style={{ backgroundColor: "green", alignItems: "center", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 }}>
                    <Text>Xong</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>

        {/* <Text>{item.title}</Text> */}



    </Animated.View >
}
const ItemContent = ({ title, content }) => {
    return <View style={{ borderBottomWidth: 1, justifyContent: "space-between", flexDirection: "row", borderBottomColor: "#dbdbdb", paddingVertical: 5 }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{title}</Text>
        <Text>{content}</Text>
    </View>
}

export default Routes

const styles = StyleSheet.create({})