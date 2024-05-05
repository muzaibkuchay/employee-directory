const BASE_URL = 'https://randomuser.me/api';

export const fetchRandomUsers = async (count = 10) => {
    try {
        const respone = await fetch(`${BASE_URL}?results=${count}`);
        const data = await respone.json();
        return data.results;
    }
    catch (e) {
        console.log('error', e);
        return [];
    }
}
