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
            // Check if the art is already in the exhibit
            const artIndex = prevExhibit.findIndex(item => item.id === art.id);

            // If found, remove it
            if (artIndex !== -1) {
                return [
                    ...prevExhibit.slice(0, artIndex),
                    ...prevExhibit.slice(artIndex + 1)
                ];
            }

            // If not found, add it
            return [...prevExhibit, art];
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