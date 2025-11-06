
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; 
import SelectTemplate from './pages/SelectTemplate';
import CreatePortfolio from './pages/CreatePortfolio';
import ProfessionalsList from './pages/ProfessionalsList'; 
import PublicGallery from './pages/PublicGallery';       
import PortfolioDetail from './pages/PortfolioDetail';
import PreviewPage from './pages/PreviewPage';
import EditPortfolio from './pages/EditPortfolio';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/gallery" element={<PublicGallery />} /> {}
        <Route path="/portfolio/:id" element={<PortfolioDetail />} /> 
        <Route path="/preview/:id" element={<PreviewPage />} /> 
        <Route path="/" element={<SelectTemplate />} /> 

        {}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-portfolio" element={<CreatePortfolio />} />
          <Route path="/edit-portfolio/:id" element={<EditPortfolio />} />
          <Route path="/professionals" element={<ProfessionalsList />} /> {}
        </Route>

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;