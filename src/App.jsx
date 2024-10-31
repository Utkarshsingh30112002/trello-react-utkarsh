

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boards from "./pages/BoardsPage"; 
import SingleBoard from "./pages/SingleBoardPage";
import MainLayout from "./components/Layouts/MainLayout";
import CardPage from "./pages/CardPage";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
           <Route path='/' element={<Boards />} />
           <Route path='/boards/:id' element={<SingleBoard />} />
           <Route path='/card/:id' element={<CardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
