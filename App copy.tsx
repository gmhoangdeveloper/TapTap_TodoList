/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { hideSplash } from 'react-native-splash-view';

import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const fakeData = [{ title: "Task1", time: "27/11/2021", rank: "Cao" }, { title: "Task1", time: "27/11/2021", rank: "Cao" }, { title: "Task1", time: "27/11/2021", rank: "Cao" }, { title: "Task1", time: "27/11/2021", rank: "Cao" }, { title: "Task1", time: "27/11/2021", rank: "Cao" }]

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  React.useEffect(() => {
    setTimeout(() => {
      hideSplash(); // Hide after some time
    }, 2000);
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%';

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}>
        <View style={{ paddingRight: safePadding }}>
          <Header />
        </View>

        <View
          style={{
            backgroundColor: "#6b3de8",
            padding: safePadding,
            columnGap: 10,
            rowGap: 10,
          }}>

          {fakeData.map((item, key) => <Item item={item} key={key} />)}
        </View>
      </ScrollView>
    </View>
  );
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


  const animatedButtonDeleteStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value * 2) }],
  }));
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
        <AnimatedTouchableOpacity onPress={startAnimation} >
          <Text style={{ color: "red" }}>Sửa</Text>
        </AnimatedTouchableOpacity>
        <AnimatedTouchableOpacity onPress={startAnimation}>
          <Text>Xoa</Text>
        </AnimatedTouchableOpacity>
      </View>

    </View>
    {isEdit &&
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
    }

    {/* <Text>{item.title}</Text> */}



  </Animated.View >
}
const ItemContent = ({ title, content }) => {
  return <View style={{ borderBottomWidth: 1, justifyContent: "space-between", flexDirection: "row", borderBottomColor: "#dbdbdb", paddingVertical: 5 }}>
    <Text style={{ fontWeight: "600", fontSize: 16 }}>{title}</Text>
    <Text>{content}</Text>
  </View>
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

