import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '@Components/Icon'
import { Text } from '@Components/Text'
import Styles from '@Styles'

interface IHeader {
    title: string,
    isGoBack?: boolean,
    onGoBack?: Function,
    isBorder?: boolean
}

const Header = (props: IHeader) => {
    const { title, onGoBack, isBorder = true, isGoBack = true } = props
    return (
        <View style={[styles.container, isBorder && { borderBottomWidth: 1, borderBottomColor: Styles.borderColor, }]}>
            {isGoBack ? <TouchableOpacity style={styles.icon} onPress={() => onGoBack && onGoBack()}>
                <Icon name="arrowleft" type="AntDesign" />
            </TouchableOpacity>
                : null}
            <View>
                <Text variant="title" font="semibold" >{title}</Text>
            </View>
        </View>
    )
}



export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: Styles.gutter.container,
        paddingVertical: Styles.gutter.component,
        alignItems: "center"
    },
    icon: {
        marginRight: 16
    }
})