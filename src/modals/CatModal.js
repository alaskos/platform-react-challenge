import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getCatById } from "../api";
import CustomModal from "./Modal";

const CatModal = ({ cat, isOpen, onClose }) => {
    const [breed, setBreed] = useState(null);
    const [error, setError] = useState(null);
    const [favourite, setFavourite] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCatDetails = async () => {
            if (cat) {
                const data = await getCatById(cat.id);
            if (data.breeds && data.breeds.length > 0) {
                setBreed(data.breeds[0]);
            } else if (data.breeds && data.breeds.length === 0) {
                setError("No breed information available.");
            } else {
                setError("Failed to load breed information.");
            }
        }
        };

        setLoading(true);
        fetchCatDetails();
        const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const isFavourite = storedFavourites.some(favCat => favCat.id === cat.id);
        setFavourite(isFavourite);
        setLoading(false);
    }, [cat]);

    // Add/remove cat from favourites
    const handleFavourite = () => {
        let storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (favourite) {
            // Remove from favourites
            storedFavourites = storedFavourites.filter(favCat => favCat.id !== cat.id);
        } else {
            // Add to favourites
            storedFavourites.push(cat);
        }
        localStorage.setItem('favourites', JSON.stringify(storedFavourites));
        setFavourite(!favourite);
    };

    // Navigate to the breed modal page
    const handleNavigateToBreed = (breedId) => {
        navigate(`/breeds/${breedId}`);
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            {loading && <p>Loading...</p>}
            {error ? (
                <p className="error">{error}</p>
            ) : (
                <>
                    <img src={cat.url} alt="cat" className="modal-img" />
                    {breed ? (
                        <>
                            <div>
                            <h3>{breed.name}</h3>
                            <p>{breed.temperament}</p>
                            <p>Origin: {breed.origin}</p>
                            <button onClick={() => handleNavigateToBreed(breed.id)}>
                                More Info
                            </button>
                            </div>
                            <button onClick={handleFavourite}>
                                {favourite ? 'Remove from Favourites' : 'Add to Favourites'}
                            </button>
                        </>
                    ) : (
                        <p>No breed information available.</p>
                    )}
                </>
            )}
        </CustomModal>
    );
};

export default CatModal;