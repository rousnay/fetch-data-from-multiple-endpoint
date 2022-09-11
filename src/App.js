import './App.css';

import { Navigate, Route, Routes } from "react-router-dom";

import Home from './components/Home';
import ItemContainer from './components/ItemContainer';
import Navbar from './components/Navbar';

function App() {
  return (
      <>
      <Navbar />
        <Routes>
            <Route path='/films' element={<Home />} />
            <Route path="/" element={<Navigate replace to="/films" />} />
            <Route path="/film/:movieId" element={<ItemContainer />} />
        </Routes> 
      </>
  );
}

export default App;