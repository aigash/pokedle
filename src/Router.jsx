import {createBrowserRouter} from "react-router-dom";
import App from './App'; // Assurez-vous que ces imports sont corrects
import Classic from './Classic';
import Desc from './Desc';
import Pixels from "./Pixels";

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
]);

export default router;