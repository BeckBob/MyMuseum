import React, { useContext, useState } from 'react';


const UsersExhibitionContext = React.createContext();
const UsersExhibitionUpdateContext = React.createContext();

export function useExhibition() {
    return useContext(UsersExhibitionContext);
}

export function useExhibitionUpdate() {
    return useContext(UsersExhibitionUpdateContext);
}

export function UsersExhibitionProvider({ children }) {
    const [UsersExhibit, setUsersExhibit] = useState([]);

    function addToExhibit(art) {
 
        setUsersExhibit(prevExhibit => {
            const updatedExhibit = [...prevExhibit, art];
            console.log(updatedExhibit); 
            return updatedExhibit;
        });
    }

    return (
        <UsersExhibitionContext.Provider value={UsersExhibit}>
            <UsersExhibitionUpdateContext.Provider value={addToExhibit}>
                {children}
            </UsersExhibitionUpdateContext.Provider>
        </UsersExhibitionContext.Provider>
    );
}