import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import RNRestart from 'react-native-restart';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Button, ScreenLayout, Text } from '@Components';
interface IErrorBoundaryState {
    isError: boolean;
    error: any;
    errorInfo: any;
    isCollapse: boolean;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, IErrorBoundaryState> {
    constructor(props: { children?: React.ReactNode | undefined; }) {
        super(props);
        this.state = {
            isError: false,
            error: null,
            errorInfo: null,
            isCollapse: false,
        };
    }

    componentDidCatch(error: Error, errorInfo) {
        this.setState({
            isError: true,
            error: error,
            errorInfo: errorInfo,
        });
    }

    private onClickReloadApp = async () => {
        RNRestart.Restart();
    };

    public render() {
        if (this.state.isError)
            return <SafeAreaProvider>
                <ScreenLayout edges={['top', 'bottom']}>
                    <View style={styles.wrapper}>
                        <View style={styles.body}>
                            <Text variant='title' align='center'>Có lỗi xảy ra trên ứng dụng</Text>

                        </View>
                        <View style={styles.footer}>
                            <Button type='button' marginHorizontal={50} title={'Khởi động lại ứng dụng'} onPress={() => this.onClickReloadApp()} />
                        </View>
                    </View>

                </ScreenLayout>
            </SafeAreaProvider>

        return this.props.children;
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 15,
    },
    body: {
        marginTop: 25,
        marginBottom: 19,
        paddingHorizontal: 39,
    },
    footer: {
        alignItems: "center"
    }
})
