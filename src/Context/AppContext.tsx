import React, { useState, createContext } from 'react';

export const AppContext = createContext<any | null>(null)

export const AppContextProvider = (props: { children: any | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    const [data, setData] = useState<Array<any>>([])
    const [combinations, setCombinations] = useState<Array<string>>([])
    const [clicked, setClicked] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    return (
        <AppContext.Provider 
            value={{ 
                clicked, setClicked, 
                data, setData, 
                combinations, setCombinations, 
                open, setOpen 
                }}>
            {props.children}
        </AppContext.Provider>
    )
}