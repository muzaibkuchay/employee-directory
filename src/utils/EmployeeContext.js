import React, { useState, useEffect, createContext } from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { fetchRandomUsers } from './api';

const EmployeContext = createContext();

export const EmpolyeProvider = ({ children }) => {
    const [empolyes, setEmpolyes] = useState([]);
    const [search, setSearch] = useState('');
    const [onLoad, setOnLoad] = useState(true);

    useEffect(() => {
        const loadEmployes = async () => {
            const randomusers = await fetchRandomUsers();
            setOnLoad(false);
            setEmpolyes(randomusers);
        }
        loadEmployes();
    }, [onLoad]);

    const filterEmpolyes = empolyes.filter(emp => {
        const fullName = `${emp.name.first} ${emp.name.last}`.toLocaleLowerCase();
        return fullName.includes(search.toLocaleLowerCase());
    })

    const contextValue = {
        empolyes: filterEmpolyes,
        search,
        setSearch,
        setEmpolyes,
    }
    return (
        <React.Fragment>
            {
                onLoad ? (
                    <LottieView
                        source={require('../json/animations/loading.json')}
                        autoPlay
                        loop={false}
                        onAnimationFinish={() => setOnLoad(false)}
                        style={styles.animation}
                    />
                ) :
                    <EmployeContext.Provider value={contextValue}>
                        {children}
                    </EmployeContext.Provider>
            }
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    animation: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default EmployeContext;