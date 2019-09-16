import React from 'react';
import {useInput} from '../hooks/useInput';

const Input = () => {
    const [value, setValue] = useInput();
    return <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
}

export default Input;