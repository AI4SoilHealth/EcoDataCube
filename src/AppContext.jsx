import React from "react";

export const AppContext = React.createContext();

const AppContextProvider = (props) => <AppContext.Provider value={props.value}>{props.children}</AppContext.Provider> 
export default AppContextProvider;