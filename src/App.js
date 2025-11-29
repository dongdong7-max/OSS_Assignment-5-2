import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import DetailPage from "./pages/DetailPage";
import "bootstrap/dist/css/bootstrap.min.css"; 

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-3">
        <Routes>

          <Route path="/" element={<Navigate to="/list" />} />
          
         
          <Route path="/list" element={<ListPage />} />
          
          
          <Route path="/create" element={<CreatePage />} />
          
  
          <Route path="/detail/:id" element={<DetailPage />} />
          
         
          <Route path="/update/:id" element={<UpdatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;