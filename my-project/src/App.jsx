import react from 'react'
import{BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Video/:id" element={<Video />} />
     </Routes>
     </BrowserRouter>
        
        
    </>
  );
}

export default App
