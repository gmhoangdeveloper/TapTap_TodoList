import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import Styles from '@Styles';

interface IProps extends TextProps {
  children?: any;
  color?: 'title' | 'primary' | 'secondary' | 'third' | 'error' | 'blue' | "green";
  variant?: 'header' | 'title' | 'label' | 'body' | 'caption' | 'error';
  align?: 'center' | 'right';
  size?: number;
  customColor?: string;
  lineHeight?: number;
  font?: 'semibold' | 'medium' | 'bold' | 'regular' | 'light';
  style?: any,
}

const CustomText = ({ style, color = 'primary', variant = 'caption', font = "semibold", size, align, customColor, lineHeight = 20, ...props }: IProps) => {
  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={StyleSheet.flatten([
        stylesColor[color],
        styleVariants[variant],
        styleFont[font],
        align === 'center' && styles.align,
        align === 'right' && styles.right,
        style,
        size && { fontSize: size },
        customColor && { color: customColor },
        lineHeight && { lineHeight: lineHeight },
      ])}
    />
  );
};


const styles = StyleSheet.create({
  align: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  }
});

const stylesColor = StyleSheet.create({
  title: {
    color: Styles.text.titleColor,
  },
  primary: {
    color: Styles.text.primaryColor,
  },
  secondary: {
    color: Styles.text.secondaryColor,
  },
  third: {
    color: Styles.text.thirdColor,
  },
  error: {
    color: Styles.text.error,
  },
  blue: {
    color: Styles.text.blue,
  },
  green: {
    color: Styles.text.green,
  },
});

const styleVariants = StyleSheet.create({
  header: {
    fontSize: Styles.fontSize.header,//20
    fontFamily: Styles.fontFamily.bold,
  },
  title: {
    fontSize: Styles.fontSize.title,//18
    fontFamily: Styles.fontFamily.bold,
  },
  label: {
    fontSize: Styles.fontSize.label,//16
    fontFamily: Styles.fontFamily.bold,
  },
  body: {
    fontSize: Styles.fontSize.body,//14
    fontFamily: Styles.fontFamily.regular,
  },
  caption: {
    fontSize: Styles.fontSize.caption,//13
    fontFamily: Styles.fontFamily.regular,
  },
  error: {
    fontSize: Styles.fontSize.error,//13
    fontFamily: Styles.fontFamily.italic,
  }
});
const styleFont = StyleSheet.create({
  semibold: {
    fontFamily: Styles.fontFamily.semibold,
  },
  medium: {
    fontFamily: Styles.fontFamily.medium,
  },
  bold: {
    fontFamily: Styles.fontFamily.bold,
  },
  regular: {
    fontFamily: Styles.fontFamily.regular,
  },
  light: {
    fontFamily: Styles.fontFamily.light,
  },
});

export { CustomText as Text };
