import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Zoo } from "./pages/Zoo"
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Layout } from "./pages/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/Zoo",
            element: <Zoo/>
        },
        {
            path: "/About",
            element: <About/>
        },
        {      
            path: "/Contact",
            element: <Contact/>
        }
        ]
    }
])