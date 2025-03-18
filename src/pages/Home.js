import React, { useEffect, useState } from "react";
import { getRandomCats } from "../api";
import CatModal from "../modals/CatModal";

function Home() {
    const [cats, setCats] = useState([]);
    const [selectedCat, setSelectedCat] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCats();
    }, []);

    const loadCats = async () => {
        setLoading(true)
        const newCats = await getRandomCats();
        if (newCats) {
            setCats([...cats, ...newCats]);
        } else {
            setError("Failed to load cat images. Please try again later.");
        }
        setLoading(false)
    };

    return (
        <div>
            <h1>Random Cats</h1>
            {loading && <p>Loading...</p>}
            {error ? <p className="error">{error}</p>
               : <>
                    <div className="cat-grid">
                    {cats.map((cat) => (
                        <img key={cat.id} src={cat.url} alt="cat" onClick={() => setSelectedCat(cat)} />
                    ))}
                    </div>
                    <button onClick={loadCats}>Load More</button>
                    {selectedCat && (
                        <CatModal
                            cat={selectedCat}
                            isOpen={!!selectedCat}
                            onClose={() => setSelectedCat(null)}
                        />
                    )}
                </>
            }
        </div>
    );
}

export default Home;