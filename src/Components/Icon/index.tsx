import React from 'react'

import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import IconFoundation from 'react-native-vector-icons/Foundation'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconOcticons from 'react-native-vector-icons/Octicons'
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import IconZocial from 'react-native-vector-icons/Zocial'
import Styles from '@Styles'

interface IProps {
  type:
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'Foundation'
  | 'FontAwesome'
  | 'Fontisto'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial'
  | 'FontAwesome5'
  name: string
  color?: string
  size?: number
}

const IconCustom = ({ type = 'FontAwesome',
  size = 18,
  color = Styles.text.primaryColor,
  ...restProps }: IProps) => {
  const iconProps = { size, color, ...restProps }

  if (type === 'AntDesign') {
    return <IconAntDesign {...iconProps} />
  }
  if (type === 'Entypo') {
    return <IconEntypo {...iconProps} />
  }
  if (type === 'EvilIcons') {
    return <IconEvilIcons {...iconProps} />
  }
  if (type === 'Feather') {
    return <IconFeather {...iconProps} />
  }
  if (type === 'Foundation') {
    return <IconFoundation {...iconProps} />
  }
  if (type === 'FontAwesome') {
    return <IconFontAwesome {...iconProps} />
  }
  if (type === 'FontAwesome5') {
    return <IconFontAwesome5 {...iconProps} />
  }
  if (type === 'Fontisto') {
    return <IconFontisto {...iconProps} />
  }
  if (type === 'Ionicons') {
    return <IconIonicons {...iconProps} />
  }
  if (type === 'MaterialCommunityIcons') {
    return <IconMaterialCommunityIcons {...iconProps} />
  }
  if (type === 'MaterialIcons') {
    return <IconMaterialIcons {...iconProps} />
  }
  if (type === 'Octicons') {
    return <IconOcticons {...iconProps} />
  }
  if (type === 'SimpleLineIcons') {
    return <IconSimpleLineIcons {...iconProps} />
  }
  return <IconZocial {...iconProps} />
}

export { IconCustom as Icon }
