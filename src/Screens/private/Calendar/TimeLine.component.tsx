import Styles from '@Styles'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { timeSequence } from './Today.component'

type ITimeLineProps = {
	operationTimeBooking: timeSequence[]
	stepBooking: number
}

const TimeLine = React.memo(({ operationTimeBooking, stepBooking }: ITimeLineProps) => {
	const [timeNow, setTimeNow] = useState<number>(0)

	useEffect(() => {
		const timeoutId = setInterval(() => {
			const indexTime = operationTimeBooking.findIndex((item) => item.timestamp > moment().format('x')) - 1
			const min = 40 * ((moment().minute() - Number(operationTimeBooking[indexTime]?.minutes)) / stepBooking)
			setTimeNow(40 * indexTime + min)
		}, 1000)
		if (!timeNow && timeNow > 0) {
			clearTimeout(timeoutId)
		}
		return () => clearTimeout(timeoutId)
	}, [])

	if (!timeNow) return null

	return (
		<View style={[{ top: timeNow }, styles.root]}>
			<View style={styles.line} />
		</View>
	)
})

export default TimeLine

const styles = StyleSheet.create({
	root: {
		width: '100%',
		height: 2,
		backgroundColor: Styles.palette.light.error,
		flex: 1,
		position: 'absolute',
	},
	line: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 5,
		borderRightWidth: 5,
		borderBottomWidth: 10,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: Styles.palette.light.error,
		transform: [{ rotate: '90deg' }],
		top: -4,
	},
})
