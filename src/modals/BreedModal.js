import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getCatsByBreed } from "../api";
import CustomModal from "./Modal";

const BreedModal = ({ breed, isOpen, onClose }) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            const data = await getCatsByBreed(breed.id);
            if (data) {
                setImages(data);
            } else {
                setError("Failed to load images for this breed.");
            }
        };
        setLoading(true);
        fetchImages();
        setLoading(false);
    }, [breed]);

    // Navigate to the home page with the catId as a query parameter
    const handleImageClick = (imgId) => {
        navigate(`/?catId=${imgId}`);
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <div className="modal-content">
                {loading && <p>Loading...</p>}
                {error ? (
                    <p className="error">{error}</p>
                ) : ( <>
                        <h2>{breed.name}</h2>
                        <p>{breed.description}</p>
                        <div className="image-list">
                            {images.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.url}
                                    alt={breed.name}
                                    className="thumbnail"
                                    onClick={() => handleImageClick(img.id)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </CustomModal>
    );
};

export default BreedModal;