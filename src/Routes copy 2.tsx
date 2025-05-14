import React, { useRef } from 'react';
import { View, TextInput, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { KeyboardAvoidingView } from 'react-native';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

function AnimatedInputComponent() {
    const translateY = useSharedValue(0);
    const inputRef = useRef(null);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const handleFocus = () => {
        translateY.value = withTiming(-50, { duration: 300 });
        inputRef.current?.focus();
    };

    const handleBlur = () => {
        translateY.value = withTiming(0, { duration: 300 });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'flex-end' }}
        >
            <View style={styles.container}>
                <AnimatedInput
                    ref={inputRef}
                    style={[styles.input, animatedStyle]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter text"
                    placeholderTextColor="gray"
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
    input: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        backgroundColor: 'white',
        zIndex: 10,
    },
};

export default AnimatedInputComponent;