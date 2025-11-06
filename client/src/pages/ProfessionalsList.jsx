

import React, { useState, useEffect } from 'react';
import { getMyPortfolios, deletePortfolio } from '../api/portfolioApi';
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProfessionalsList = () => {
  const [portfolios, setPortfolios] = useState([]); 
  const [isFetching, setIsFetching] = useState(false); 
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { authState } = useAuth();
  const { isAuthenticated, loading: authLoading } = authState; 

  
  console.log("Component Render Start - Auth Loading:", authLoading, "Is Fetching:", isFetching);

  useEffect(() => {
    
    console.log("useEffect - Auth Loading:", authLoading, "Is Authenticated:", isAuthenticated);

    
    if (authLoading) {
      
      console.log("useEffect - Waiting for auth...");
      
      return;
    }

    
    if (isAuthenticated) {
      
      console.log("useEffect - Auth ready, starting fetch...");
      const fetchPortfolios = async () => {
        setIsFetching(true); 
        setError(null);
        try {
          const response = await getMyPortfolios();
          
          console.log("useEffect - Fetch successful:", response.status);
          setPortfolios(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          
          console.error("useEffect - Fetch failed:", err);
          setError('Failed to fetch your portfolios.');
          setPortfolios([]);
        } finally {
          
          console.log("useEffect - Fetch finished, setting isFetching false.");
          setIsFetching(false); 
        }
      };
      fetchPortfolios();
    } else {
      
      
      console.log("useEffect - User not authenticated, setting isFetching false.");
      setIsFetching(false); 
      setPortfolios([]);
      setError("Please log in to view your portfolios.");
    }
    
  }, [isAuthenticated, authLoading]);

  
  const handleDeletePortfolio = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this portfolio?");
    if (isConfirmed) {
      try {
        await deletePortfolio(id);
        
        setPortfolios(current => Array.isArray(current) ? current.filter(p => p._id !== id) : []);
        alert("Portfolio deleted successfully!");
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Error: Could not delete the portfolio.");
      }
    }
  };

  
  const filteredPortfolios = Array.isArray(portfolios)
    ? portfolios.filter((profile) =>
        (profile?.hero?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (profile?.hero?.title?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      )
    : [];

  
  const showLoading = authLoading || isFetching;
  
  console.log("Render Check - Show Loading:", showLoading, "(Auth:", authLoading, "Fetch:", isFetching, ")");

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      {}
      <div className="bg-theme-yellow p-12 text-center shadow-md">
        <h1 className="text-4xl font-bold text-gray-800">Your Portfolios</h1>
        <p className="text-lg text-gray-700 mt-2">
          Manage your created portfolios below.
        </p>
      </div>

      {}
      {}
      {showLoading && <div className="text-center p-10 text-xl">Loading...</div>}

      {}
      {!showLoading && !isAuthenticated && (
        <div className="text-center p-10 text-red-600 font-semibold">{error || "Please log in."}</div>
      )}

      {}
      {!showLoading && isAuthenticated && error && (
        <div className="text-center p-10 text-red-500 font-semibold">{error}</div>
      )}

      {}
      {!showLoading && isAuthenticated && !error && (
        <div className="container mx-auto p-4 bg-white shadow-lg my-8 rounded-lg">
          <input
            type="text"
            placeholder="Search your portfolios..."
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {}
      <div className="container mx-auto p-4">
        {}
        {!showLoading && isAuthenticated && !error && (
          filteredPortfolios.length === 0 ? (
            
            <div className="text-center p-10">
              <p className="text-gray-600 mb-4">You haven't created any portfolios yet.</p>
              <Link to="/" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Create Your First Portfolio
              </Link>
            </div>
          ) : (
            // Portfolio Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPortfolios.map((profile) => (
                <ProfileCard
                  key={profile._id}
                  profile={profile}
                  onDelete={handleDeletePortfolio} // Pass delete handler
                  showActions={true} // Explicitly show actions for user's own list
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProfessionalsList;
