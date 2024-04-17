import { useState, useEffect, createContext } from 'react';
import { fetchRandomUsers } from './api';

const EmployeContext = createContext();

export const EmpolyeProvider = ({ children }) => {
    const [empolyes, setEmpolyes] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const loadEmployes = async () => {
            const randomusers = await fetchRandomUsers();
            setEmpolyes(randomusers);
        }
        loadEmployes();
    }, []);

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
        <EmployeContext.Provider value={contextValue}>
            {children}
        </EmployeContext.Provider>
    )
}

export default EmployeContext;