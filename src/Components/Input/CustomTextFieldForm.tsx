import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { Text } from '@Components';
import Styles from '@Styles';

interface IProps extends TextInputProps {
  name: string;
  control: any;

  title?: string;
  loading?: Boolean;
  disabled?: Boolean;
  placeholder?: string;
  style?: any,
}

const CustomTextFieldForm = React.memo(({ name, loading, control, disabled, title, placeholder, style, ...rest }: IProps) => {
  const ref = useRef(null);
  const [isFocusing, setIsFocusing] = useState(false)

  const onFocus = () => setIsFocusing(true)
  const onBlur = () => setIsFocusing(false)

  return <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value }, fieldState: { error } }) => {
      return (
        <View >
          {title ? <Text variant='caption' color="secondary">{title}</Text> : null}
          <View >
            {disabled ? <View style={styles.disabledField} /> : null}
            <TextInput
              ref={ref}
              style={[
                styles.input,
                styles.textInput,
                isFocusing && styles.inputFocusing,
                style,
                error?.message && styles.inputFocusingError,
              ]}
              onFocus={onFocus}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholderTextColor={error?.message ? Styles.text.error : title ? "#7D7F84" : Styles.text.secondaryColor}
              placeholder={placeholder}
              value={value}
              {...rest}
            />
            {error?.message ? <Text variant="caption" style={{ fontStyle: "italic" }} color="error"> {error?.message}</Text> : null}
          </View>
        </View>
      );
    }}
  />
});

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: Styles.borderRadius.xs,
    borderColor: Styles.borderColor,
    backgroundColor: Styles.backgroundBody,
    marginVertical: 8,
    height: 50
  },

  textInput: {
    fontSize: 15,
    fontFamily: Styles.fontFamily.regular,
    color: Styles.text.primaryColor
  },
  inputFocusing: {
    borderWidth: 2,
    borderColor: Styles.palette.light.main,
  },
  inputFocusingError: {
    borderWidth: 1,
    backgroundColor: "#FFF3F2",
    borderColor: "#FFE5E2",
    color: "#C84032"
  },
  disabledField: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  }
});

export default CustomTextFieldForm
