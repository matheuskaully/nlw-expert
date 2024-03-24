import { createBrowserRouter } from "react-router-dom"
import { App } from "../App"
import { Notes } from "../pages/notes"
import { ComingSoon } from "../pages/comingsoon"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/notes",
    element: <Notes />
  },
  {
    path: "/comingsoon",
    element: <ComingSoon />,
  },
  
])