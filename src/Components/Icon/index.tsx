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
  size: number
}

const IconCustom = ({ type, ...props }: IProps) => {
  if (type === 'AntDesign') {
    return <IconAntDesign {...props} />
  }
  if (type === 'Entypo') {
    return <IconEntypo {...props} />
  }
  if (type === 'EvilIcons') {
    return <IconEvilIcons {...props} />
  }
  if (type === 'Feather') {
    return <IconFeather {...props} />
  }
  if (type === 'Foundation') {
    return <IconFoundation {...props} />
  }
  if (type === 'FontAwesome') {
    return <IconFontAwesome {...props} />
  }
  if (type === 'FontAwesome5') {
    return <IconFontAwesome5 {...props} />
  }
  if (type === 'Fontisto') {
    return <IconFontisto {...props} />
  }
  if (type === 'Ionicons') {
    return <IconIonicons {...props} />
  }
  if (type === 'MaterialCommunityIcons') {
    return <IconMaterialCommunityIcons {...props} />
  }
  if (type === 'MaterialIcons') {
    return <IconMaterialIcons {...props} />
  }
  if (type === 'Octicons') {
    return <IconOcticons {...props} />
  }
  if (type === 'SimpleLineIcons') {
    return <IconSimpleLineIcons {...props} />
  }
  return <IconZocial {...props} />
}

IconCustom.defaultProps = {
  type: 'FontAwesome',
  size: 18,
  color: Styles.text.primaryColor
}

export { IconCustom as Icon }
