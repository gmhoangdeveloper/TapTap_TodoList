import { Text } from '@Components';
import { Icon } from '@Components/Icon';
import { IPriority, priority } from '@Models/Todo';
import Styles from '@Styles';
import { Portal } from '@gorhom/portal';
import React, { useRef } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

interface ISelectPriorityProps {
    value: IPriority,
    setState: Function
}

const SelectPriority = React.memo(({ value, setState }: ISelectPriorityProps) => {
    const modalDateStartRef = useRef<Modalize>(null);

    return <>
        <TouchableOpacity onPress={() => {
            Keyboard.dismiss()
            modalDateStartRef.current?.open()
        }}>
            <Text variant="body" font="regular" color={"secondary"} size={15}>{value.title}</Text>
        </TouchableOpacity>
        <Portal>
            <Modalize ref={modalDateStartRef} adjustToContentHeight>
                <View style={styles.header}>

                    <Text variant="title" font="semibold" size={18}>Mức độ</Text>
                    <TouchableOpacity onPress={() => { modalDateStartRef.current?.close() }}>
                        <Icon name="close" type="AntDesign" />
                    </TouchableOpacity>
                </View>
                <View style={styles.wrapperOption}>
                    {priority.map((item, index) => {
                        const isActive = item?.id === value?.id
                        return <TouchableOpacity key={index} onPress={() => {
                            setState(item)
                            modalDateStartRef.current?.close()
                        }} style={styles.item}>
                            <Text variant="body" font="regular" >{item.title}</Text>
                            {isActive && <Icon name="check" type="AntDesign" size={25} color={Styles.palette.light.main} />}
                        </TouchableOpacity>
                    })}
                </View>
            </Modalize>
        </Portal>
    </>
})


export default SelectPriority


const styles = StyleSheet.create({
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