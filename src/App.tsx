import { FC } from "react";
import Homepage from "./Homepage";
import Draw from "./components/Draw";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test from "./components/Test";
import Login from "./components/Login";
import { ContextProducer } from "./context/FirebaseContext";
import Gallery from "./components/Gallery";
import MyDrawings from "./components/MyDrawings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/draw",
    element: <Draw />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/mydrawing",
    element: <MyDrawings />,
  },
]);

const App: FC = () => {
  return (
    <ContextProducer>
      <RouterProvider router={router} />
    </ContextProducer>
  );
};

export default App;
