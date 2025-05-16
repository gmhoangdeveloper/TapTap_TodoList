import { Text } from '@Components/Text';
import Styles from '@Styles';
import * as React from 'react';
import { StyleSheet, ActivityIndicator, View, Pressable, StyleProp, ViewStyle, TextStyle, Dimensions } from 'react-native';

interface IButtonProps {
    title?: string | React.ReactNode,
    prefixIcon?: React.ReactNode,
    suffixIcon?: React.ReactNode,
    disabled?: boolean,
    loading?: boolean,
    onPress?: Function,
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    hitSlop?: number,
    type?: 'button'
    children?: React.ReactNode,
    loadingColor?: string,
    numberOfLines?: number,
    marginHorizontal?: number
}

const width = Dimensions.get("screen").width

const Button = React.forwardRef((props: IButtonProps, ref: React.LegacyRef<View>) => {
    const { title, onPress, style, textStyle, type, prefixIcon, suffixIcon, disabled, loading, hitSlop, children, loadingColor = "#fff", numberOfLines = null, marginHorizontal = 0 } = props;

    const renderLoading = () => {
        return <ActivityIndicator size="small" color={loadingColor} />
    }

    const renderButtonType = () => {
        const isDisabled = disabled || loading;

        return <Pressable
            hitSlop={hitSlop}
            disabled={isDisabled}
            style={({ pressed }) => pressed
                ? [{ ...buttonStyles.container, ...buttonStyles.backgroundPressed, }, style, isDisabled && {
                    backgroundColor: Styles.button.disable
                }]
                : [buttonStyles.container, style, isDisabled && {
                    backgroundColor: Styles.button.disable
                }]
            }
            onPress={() => onPress && onPress()}
        >
            {loading
                ? renderLoading()
                : <View style={buttonStyles.btn} ref={ref}>
                    {prefixIcon}
                    {typeof title == 'string'
                        ? <Text variant='label' font="medium" color="third" style={[textStyle]}>{title}</Text>
                        : title}
                    {suffixIcon}
                </View>
            }
        </Pressable>
    }
    return renderButtonType();
})

export default Button

const buttonStyles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        backgroundColor: Styles.palette.light.main,
        borderRadius: Styles.borderRadius.lg,
    },
    containerLine: {
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Styles.palette.light.main,
    },
    backgroundPressed: {
        opacity: 0.8
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: Styles.margin.xxs
    },
})