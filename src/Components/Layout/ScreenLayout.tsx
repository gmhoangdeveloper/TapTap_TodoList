import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import Styles from '@Styles';

interface IScreenLayout {
  style?: StyleProp<ViewStyle>,
  children: any,
  edges?: ReadonlyArray<Edge>;
}

const ScreenLayout = ({ style, ...props }: IScreenLayout) => {
  return <SafeAreaView style={[styles.root, style]} {...props} />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Styles.backgroundBody,
  },
});

export { ScreenLayout };
