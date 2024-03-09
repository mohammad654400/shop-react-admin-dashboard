import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/component/login";
import Register, {
  registerAction,
} from "./features/identity/component/register";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/main-layout";
import Courses from "./pages/courses";
import Home from "./pages/home";
import ListItems from "./layouts/list-items";
import AddProduct from "./pages/addProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Home></Home>
      </MainLayout>
    ),
  },
  {
    path: "/courses",
    element: (
      <MainLayout>
        <Courses />
      </MainLayout>
    ),
  },
  {
    path: "/addProduct",
    element: (
      <MainLayout>
        <AddProduct />
      </MainLayout>
    ),
  },
  {
    path: "/courses/:type",
    element: (
      <MainLayout>
        <ListItems />
      </MainLayout>
    ),
  },

  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
]);
export default router;
