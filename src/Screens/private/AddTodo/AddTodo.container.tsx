import { CustomTextFieldForm, Header, ScreenLayout, SelectPriority } from '@Components'
import { Button } from '@Components/Button'
import SelectDate from '@Components/Input/SelectDate'
import { yupResolver } from '@hookform/resolvers/yup'
import { priority } from '@Models/Todo'
import { NavigationProp } from '@react-navigation/native'
import { useAppDispatch } from '@Store'
import { addTodo } from '@Store/Todo'
import Styles from '@Styles'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'
import { v4 } from 'uuid'
import * as yup from 'yup'

type AddTodoFormValues = {
    title: string;
    priority: string;
    date: string;
};

const AddTodoSchema = () => {
    return yup.object().shape({
        title: yup.string().trim().required('Tiêu đề bắt buộc.'),
        priority: yup.string().trim().required('Trạng thái bắt buộc.'),
        date: yup.string().required('Thời gian bắt buộc.'),
    });
};

const AddTodo = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const dispatch = useAppDispatch();

    const { control, handleSubmit, } = useForm({
        reValidateMode: 'onSubmit',
        resolver: yupResolver(AddTodoSchema()),
        defaultValues: {
            title: '',
            priority: priority[0].subtitle,
            date: ""
        }
    });

    const onPressGoback = () => navigation.goBack()


    const onSubmit = (payload: AddTodoFormValues) => {
        const priorityDetail = priority.find((item) => item.subtitle === payload.priority)
        dispatch(addTodo({ ...payload, id: v4(), priority: priorityDetail?.value }))
        navigation.goBack()
    }

    return (
        <ScreenLayout edges={["top", "bottom"]}>
            <Header isGoBack={true} isBorder onGoBack={onPressGoback} title='Tạo task' />
            <View style={styles.wrapperContainer}>
                <ScrollView>
                    <CustomTextFieldForm
                        control={control}
                        name="title"
                        title='Tiêu đề'
                        placeholder="Nhập tiêu đề"
                        maxLength={10}
                    />
                    <SelectPriority
                        control={control}
                        title="Mức độ"
                        name='priority'
                    />
                    <SelectDate
                        control={control}
                        title="Thời gian"
                        name='date'
                    />
                </ScrollView>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    title="Xác nhận"
                />
            </View>
        </ScreenLayout >
    )
}

export default AddTodo

const styles = StyleSheet.create({
    wrapperContainer: {
        padding: Styles.padding.sm,
        flex: 1,
        backgroundColor: Styles.backgroundScreen
    }
})