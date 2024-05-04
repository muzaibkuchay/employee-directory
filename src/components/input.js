import React, { useState } from "react";
import { TextInput, Text, StyleSheet } from 'react-native';

const CustomTextInput = React.memo(({ label, handleInputChange, inputType, validate, onFocus, ...rest }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState('');
    const [value, setValue] = useState('');

    const handleChangeText = (text) => {
        setValue(text);
        const validateError = validateUserInput(text);
        setError(validateError);
        if (handleInputChange) {
            handleInputChange(text);
        }
    };

    const validateUserInput = (text) => {
        switch (inputType) {
            case 'email':
                return text.includes('@') ? '' : 'Invalid email address';
            case 'name':
                return text.length >= 3 ? '' : 'Name must be at least 3 characters long';
        }
    };

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
            <TextInput style={[styles.textInput, isFocused && styles.focused, error && styles.err]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                onChangeText={handleChangeText}
                keyboardType='email-address'
                multiline={false}
                {...rest}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

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
        paddingHorizontal: 10,
        marginBottom: 18
    },
    label: {
        fontSize: 16,
        marginBottom: 8
    },
    focused: {
        borderColor: '#318CE7'
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginVertical: 3
    },
    err: {
        marginBottom: 0
    },
})

export default CustomTextInput;