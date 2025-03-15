import {createBrowserRouter} from "react-router-dom";
import App from './App'; // Assurez-vous que ces imports sont corrects
import Classic from './pages/Classic';
import Desc from './pages/Desc';
import Pixels from "./pages/Pixels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/classic",
    element: <Classic />
  },
  {
    path: "/desc",
    element: <Desc />
  },
  {
    path: "/pixels",
    element: <Pixels />
  },
], {
  basename: "/pokedle"
});

export default router;