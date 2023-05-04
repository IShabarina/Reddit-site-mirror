import React from "react";


type PostIdContextType = {
    value: string;
    onChange: (value: string) => void;
}

export const postIdContext = React.createContext<PostIdContextType>({
    value: '',
    onChange: () => { },
});