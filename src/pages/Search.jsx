import React, { useState } from 'react'


const Search = () => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() === "") return;
        console.log("Searching for:", query);

    };

    return (
        <div className="d-flex align-items-center justify-content-center my-5 pt-5">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search items..."
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        width: "200px",
                        transition: "all 0.3s ease-in-out",
                    }}
                />
            </form>
        </div>
    )
}

export default Search