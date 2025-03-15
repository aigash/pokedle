import {createHashRouter} from "react-router-dom";
import App from './App'; // Assurez-vous que ces imports sont corrects
import Classic from './pages/Classic';
import Desc from './pages/Desc';
import Pixels from "./pages/Pixels";

const router = createHashRouter([
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