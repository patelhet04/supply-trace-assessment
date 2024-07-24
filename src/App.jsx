import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CompanyList from "./pages/CompanyList/CompanyList";
import CompanyDetail from "./pages/CompanyDetail/CompanyDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CompanyList />,
    children: [{ path: "/company/:id", element: <CompanyDetail /> }],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
