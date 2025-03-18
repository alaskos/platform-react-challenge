import React, { useState } from "react";

function Favourites() {
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites")) || []);

    const removeFavourite = (id) => {
        const updatedFavourites = favourites.filter((fav) => fav.id !== id);
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
        setFavourites(updatedFavourites);
    };

    return (
        <div>
            <h1>Your Favourite Cats</h1>
            {favourites.length === 0 ? (
                <p>No favourites yet!</p>
            ) : (<div className="fav-grid">
                {favourites.map((cat) => (
                    <div key={cat.id} style={{marginBottom: '20px'}}>
                        <img src={cat.url} alt="favourite Cat" style={{width: 200}}/>
                        <button onClick={() => removeFavourite(cat.id)}>Remove from Favourites</button>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default Favourites;