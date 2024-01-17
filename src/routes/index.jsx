import { Route, BrowserRouter, Routes } from "react-router-dom";

import Layout from "./layout";
import HomePage from "../pages/home/home";

function AppRoutes() {
  return (
    <>
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="*"
                element={
                  <div>
                    <h2>404 Page not found</h2>
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default AppRoutes;
