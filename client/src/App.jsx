import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CompanyList from "./pages/CompanyList/CompanyList";
import CompanyDetail from "./pages/CompanyDetail/CompanyDetail";
import { CompanyProvider } from "./context/CompanyContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CompanyList />,
  },
  {
    path: "/company/:id",
    element: <CompanyDetail />,
  },
]);

function App() {
  return (
    <CompanyProvider>
      <RouterProvider router={router} />
    </CompanyProvider>
  );
}

export default App;
