import React from "react";

// пустая строка '', чтобы вернул undefined в случае инициализации, но не использования:
export const tokenContext =  React.createContext('') 
// Provider - чтобы предоставлять данные в нашем приложении
// Consumer - чтобы забирать данные в компонент