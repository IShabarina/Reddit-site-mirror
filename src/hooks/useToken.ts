import React, {useState, useEffect} from "react";

export function useToken() { 
    const [token, setToken] = useState('');
    
    useEffect(() => {
        if (window.__token__) {
            setToken(window.__token__)
        }
    }, [])

    return [token] // [] по аналогии с реакт хуками
}