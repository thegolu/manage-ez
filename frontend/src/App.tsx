import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import SidePanel from "./components/Header";
import { GlobalContextProvider } from "./context";
import { eRoutes } from "./enum/eRoutes";

const App = () => {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <SidePanel>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
            <Route path="/" element={<Navigate to={eRoutes.PROFILE} />} />
          </Routes>
        </SidePanel>
      </BrowserRouter>
    </GlobalContextProvider>
  );
};
export default App;
