import React = require("react");

//контекст для хранения объекта 
// - значения, которое ввел пользователь
// - ф-ции, которая принимает строку и ничего не делает и возвращает ничего

type CommentContextType = {
    value: string;
    onChange: (value: string) => void;
}

export const commentContext = React.createContext<CommentContextType>({
    value: '',
    onChange: () => { },
});