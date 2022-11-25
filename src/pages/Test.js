import { useState, useEffect } from 'react';

function useDelay(delay) {
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            // alert('Flag set'); // runs once
            setFlag(true);
        }, delay);
    }, []);
    return flag;
}

export function Test() {
    const flag = useDelay(3000);
    return flag ? 'YES' : 'NO';
}
