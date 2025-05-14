import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  dimensions: {
    width,
    height,
    platform: Platform.OS === 'ios' ? true : false,
  },
  palette: {
    light: {
      main: '#6b3de8',
      primary: '#F9F9FC',
      second: '#FFE7BA',
      error: '#E75243',
    },
    dark: {
      // main: '#3e4e4d',
    },
  },
  button: {
    background: '#6b3de8',
    text: '#FFFFFF',
    disable: "#DFDFEF",
    height: 52,
    background2: "#EBEBF4"
  },
  text: {
    titleColor: '#6b3de8',
    primaryColor: '#0B0E16',
    secondaryColor: '#5D5F65',
    thirdColor: '#FFFFFF',
    error: '#E75243',
    blue: "#1890FF",
    green: "#52C41A"
  },
  border: "#EAEAF4",
  backgroundBody: '#FFFFFF',
  backgroundPaper: '#F8F8FB',
  backgroundScreen: '#F3F3F8',
  borderColor: '#ABABAB',
  borderColorV2: '#EAEAEA',

  shadow: {
    shadowColor: "rgba(8, 19, 40, 0.10)",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  dots: "#DFDFEF",

  radius: {
    button: 8,
    image: 12,
    input: 8,
  },
  borderRadius: {
    xl: 32,
    lg: 24,
    md: 20,
    sm: 16,
    xs: 8,
    xxs: 4
  },
  padding: {
    xl: 32,
    lg: 24,
    md: 20,
    sm: 16,
    xs: 8,
    xxs: 4
  },
  margin: {
    xl: 32,
    lg: 24,
    md: 20,
    sm: 16,
    xs: 8,
    xxs: 4
  },
  gutter: {
    text: 8,
    component: 12,
    container: 20,
    containerV2: 16,
  },
  fontFamily: {
    semibold: 'SFProDisplay-Semibold',
    medium: 'SFProDisplay-Medium',
    bold: 'SFProDisplay-Bold',
    regular: 'SFProDisplay-Regular',
    light: 'SFProDisplay-Light',
    italic: "SFProDisplay-RegularItalic"
  },
  fontSize: {
    icon: 20,
    header: 20,
    title: 18,
    label: 16,
    body: 14,
    caption: 13,
    error: 13
  },
};