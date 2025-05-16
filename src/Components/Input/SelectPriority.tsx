import { Text } from '@Components';
import { Icon } from '@Components/Icon';
import { priority } from '@Models/Todo';
import Styles from '@Styles';
import { Portal } from '@gorhom/portal';
import React, { useRef } from 'react';
import { Controller, InternalFieldName } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

interface ISelectPriority {
    control: any,
    name: InternalFieldName,
    title: string,
}

const SelectPriority = React.memo(({ control, name, title, }: ISelectPriority) => {
    const modalDateStartRef = useRef<Modalize>(null);

    const onPress = () => {
        Keyboard.dismiss()
        modalDateStartRef.current?.open()
    }

    const onClose = () => {
        modalDateStartRef.current?.close()
    }

    return <View>
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                return <View >
                    {title ? <Text variant='caption' color="secondary">{title}</Text> : null}
                    <Pressable onPress={onPress}
                        style={({ pressed }) => [
                            styles.input,
                            error?.message && styles.inputFocusingError,
                            pressed && styles.inputFocusing,
                        ]}>
                        <Text variant="body" font="regular" color={error?.message ? "error" : "secondary"} size={15}>{value ? value : "Chọn mức độ"}</Text>
                    </Pressable>
                    <Portal>
                        <Modalize ref={modalDateStartRef} adjustToContentHeight>
                            <View style={styles.header}>
                                <Text variant="title" font="semibold" size={18}>Mức độ</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <Icon name="close" type="AntDesign" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.wrapperOption}>
                                {priority.map((item, index) => {
                                    const isActive = item.subtitle === value
                                    return <TouchableOpacity key={index} onPress={() => {
                                        onChange(item.subtitle)
                                        modalDateStartRef.current?.close()
                                    }} style={styles.item}>
                                        <Text variant="body" font="regular" >{item.title}</Text>
                                        {isActive && <Icon name="check" type="AntDesign" size={25} color={Styles.palette.light.main} />}
                                    </TouchableOpacity>
                                })}
                            </View>
                        </Modalize>
                    </Portal>
                    {error?.message ? <Text style={styles.textError} variant="caption" color="error">{error?.message}</Text> : null}
                </View>
            }}
        />
    </View >
})


export default SelectPriority


const styles = StyleSheet.create({
    input: {
        marginVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: Styles.borderRadius.xs,
        borderColor: Styles.borderColor,
        backgroundColor: Styles.backgroundBody,
        height: 50,
        justifyContent: "center"
    },
    inputFocusing: {
        borderWidth: 2,
        borderColor: Styles.palette.light.main,
    },
    textError: {
        flex: 1,
        fontStyle: "italic"
    },
    inputFocusingError: {
        borderWidth: 1,
        backgroundColor: "#FFF3F2",
        borderColor: "#FFE5E2",
        color: "#C84032"
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Styles.padding.lg,
        paddingVertical: Styles.padding.sm,
        borderBottomWidth: 1,
        borderColor: Styles.borderColor
    },
    wrapperOption: {
        paddingHorizontal: Styles.padding.lg,
        paddingBottom: Styles.padding.xl * 2,
    },
    item: {
        height: 50, borderBottomWidth: 1,
        borderColor: Styles.borderColor,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    }
})