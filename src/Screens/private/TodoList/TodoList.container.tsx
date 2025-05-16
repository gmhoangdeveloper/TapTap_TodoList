import { Header, ScreenLayout } from '@Components';
import { Button } from '@Components/Button';
import { Icon } from '@Components/Icon';
import { ROOT_STACK, TODO_STACK } from '@Constants/Navigation.Constant';
import { ITodo } from '@Models/Todo/model';
import { RootState, useAppSelector } from '@Store';
import Styles from '@Styles';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Item } from './Item.component';
import { sortedArPriorityr } from '@Utils';


type TodoListProps = {
    navigation: any
};

const TodoList = ({ navigation }: TodoListProps) => {
    const data = useAppSelector((state: RootState) => state?.todo?.data)
    console.log("sortedArPriorityr", sortedArPriorityr(data))
    const onPressCreate = () => {
        navigation.navigate(ROOT_STACK.TODO_STACK, { screen: TODO_STACK.ADD_TODO })
    }

    const renderItem = ({ item, index }: { item: ITodo, index: number }) => {
        return <Item item={item} index={index} />
    }

    return (
        <ScreenLayout edges={["top"]} >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.root} >
                <Header isGoBack={false} isBorder title='Danh sách công việc' />
                <View style={styles.wrapperContainer}>
                    <Animated.FlatList
                        keyboardDismissMode="none"
                        keyboardShouldPersistTaps="handled"
                        style={styles.flStyle}
                        contentContainerStyle={styles.flContentContainerStyle}
                        keyExtractor={(item: ITodo) => item.id}
                        renderItem={renderItem}
                        data={sortedArPriorityr(data)}
                    />
                    <Button
                        onPress={onPressCreate}
                        title="Tạo công việc mới" prefixIcon={<Icon type="Feather" name="plus" color={Styles.text.thirdColor} />}
                        style={styles.btnCreate} />
                </View>
            </KeyboardAvoidingView>
        </ScreenLayout>
    )
}


export default TodoList

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    wrapperContainer: {
        flex: 1,
        backgroundColor: Styles.backgroundPaper
    },
    btnCreate: {
        margin: Styles.margin.sm,
    },
    flStyle: {
        padding: Styles.padding.sm,

    },
    flContentContainerStyle: {
        paddingBottom: 500,
        rowGap: Styles.margin.sm,
    }
})