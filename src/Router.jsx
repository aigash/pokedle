import {createBrowserRouter} from "react-router-dom";
import App from './App'; // Assurez-vous que ces imports sont corrects
import Poke from './Poke';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/poke",
    element: <Poke />
  }
]);

export default router;