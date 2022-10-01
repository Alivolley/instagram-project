import Header from "./Components/Header/Header";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { Routes } from "./Routes";

function App() {
   const router = useRoutes(Routes);

   return (
      <div className="App">
         <Header />
         {router}
      </div>
   );
}

export default App;
