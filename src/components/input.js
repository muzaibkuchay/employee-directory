import React, { useState } from "react";
import { TextInput, Text, StyleSheet } from 'react-native';

const CustomTextInput = React.memo(({ label, onFocus, onBlur, ...rest }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        if (onFocus) {
            onFocus();
        }
    };
    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <React.Fragment>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={[styles.textInput, isFocused && styles.focused]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                keyboardType='email-address'
                multiline={false}
                {...rest}
            />
        </React.Fragment>
    )
}, (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
});

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 8
    },
    focused: {
        borderColor: '#318CE7'
    }
})

export default CustomTextInput;