import { createContext, useState } from "react";

export const GlobalContext = createContext({
  state: {},
  dispatch: (_: any) => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contextData, setContextData] = useState({});

  const setData = (data: any) => {
    setContextData((prev) => ({ ...prev, ...data }));
  };

  return (
    <GlobalContext.Provider value={{ state: contextData, dispatch: setData }}>
      {children}
    </GlobalContext.Provider>
  );
};
