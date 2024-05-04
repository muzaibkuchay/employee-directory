import React from "react";
import { TextInput, View, Text, StyleSheet } from 'react-native';

const CustomTextInput = React.memo(({ label, placeholder, value, onChangeText }) => {
    return (
        <React.Fragment>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.textInput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType='email-address'
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
    }
})

export default CustomTextInput;