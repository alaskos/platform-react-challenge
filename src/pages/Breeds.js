import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getAllBreeds, getCatsByBreed} from "../api";
import BreedModal from "../modals/BreedModal";

function Breeds() {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { breedId } = useParams();

    useEffect(() => {
        const fetchBreeds = async () => {
            const data = await getAllBreeds();
            if (data) {
                setBreeds(data);
            } else {
                setError("Failed to load breeds.");
            }
        };
        setLoading(true);
        if (breedId) {
            const fetchBreedDetails = async () => {
                const breedData = await getCatsByBreed(breedId);
                setSelectedBreed(breedData);
            };
            fetchBreedDetails();
        }
        fetchBreeds();
        setLoading(false);
    }, [breedId]);

    return (
        <div>
            <h1>Cat Breeds</h1>
            { loading && <p>Loading...</p> }
            {error ? <p className="error">{error}</p>
                : <ul>
                    {breeds.map((breed) => (
                        <li key={breed.id} onClick={() => setSelectedBreed(breed)}>
                            {breed.name}
                        </li>
                    ))}
                </ul>
            }
            {selectedBreed &&(
                <BreedModal
                    breed={selectedBreed}
                    isOpen={!!selectedBreed}
                    onClose={() => setSelectedBreed(null)}
                />
            )}
        </div>
    );
}

export default Breeds;