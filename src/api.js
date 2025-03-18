import axios from "axios";

const API_KEY = "live_aidehToK7yTCQHh3MYOeAr64vhoo5tnrxpXlu14eT1oA25M5yx8mMvDzVcyFjmhy";
const BASE_URL = "https://api.thecatapi.com/v1";

// Helper function for error handling
const fetchData = async (url) => {
    try {
        const res = await axios.get(url, {
            headers: { "x-api-key": API_KEY },
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Return null to indicate failure
    }
};

// Fetch 10 random cat images
export const getRandomCats = async () => fetchData(`${BASE_URL}/images/search?limit=10`);

// Fetch a specific image by ID
export const getCatById = async (id) => fetchData(`${BASE_URL}/images/${id}`);

// Fetch all cat breeds
export const getAllBreeds = async () => fetchData(`${BASE_URL}/breeds`);

// Fetch images of a specific breed
export const getCatsByBreed = async (breedId) =>
    fetchData(`${BASE_URL}/images/search?limit=10&breed_ids=${breedId}`);