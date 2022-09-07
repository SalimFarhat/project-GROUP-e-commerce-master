import {useState, createContext, useEffect } from 'react';

export const CheckoutContext = createContext();

export const CheckoutProvider = ({children}) => {
    const [status, setStatus] = useState(null);
    const [confirmation, setConfirmation] = useState({newConfirmation: false, sessionActive: false, oldCart: [] });
    const [latestConfirmationId, setLatestConfirmationId] = useState("");


    // store a confirmation id to simulate a completed transaction and retrieval of last order
    const localStorage = () => {
        if (latestConfirmationId !== "") return;
        const storedOrder = window.localStorage.getItem("confirmationId");
        if (storedOrder !== null) {
            setLatestConfirmationId(JSON.parse(storedOrder));
            setConfirmation({...confirmation, sessionActive: true});
        } 
    }
    
    useEffect(() => {
        localStorage();
    }, [])

    return(
        <CheckoutContext.Provider value={{status,
            setStatus,
            confirmation,
            setConfirmation,
            setLatestConfirmationId
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}