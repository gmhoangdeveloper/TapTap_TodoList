import { Text } from '@Components'
import Styles from '@Styles'
import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Header = () => {
    return (
        <View style={styles.root}>
            <Text variant="title" font="semibold" align='center'>Lịch công việc {moment().format("DD/MM/YYYY")}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    root: {
        padding: Styles.padding.sm,
    }
})