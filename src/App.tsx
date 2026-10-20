import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};

export default App;
