import { RouterProvider } from "react-router";
import "../src/style/App.css";
import { router } from "./Router";
import { createContext } from "react";

const AppContext = createContext({});

function App() {
  return <>
    <RouterProvider router={router}></RouterProvider>
  </>;
}

export default App;
