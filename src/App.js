import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Favourites from "./pages/Favourites";
import CatModal from './modals/CatModal';
import { getCatById } from './api';

function App() {
    const [cat, setCat] = useState(null);
    const location = useLocation();

    const getQueryParams = () => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get("catId");
    };

    useEffect(() => {
        const catId = getQueryParams();
        if (catId) {
            const fetchCatDetails = async () => {
                const catData = await getCatById(catId);
                setCat(catData);
            };
            fetchCatDetails();
        }
    }, [location.search]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breeds/:breedId" element={<Breeds />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
        {/* Render the CatModal if a cat is selected */}
        {cat && (
            <CatModal
                cat={cat}
                isOpen={!!cat}
                onClose={() => setCat(null)}
            />
        )}
    </Router>
  );
}

export default App;
