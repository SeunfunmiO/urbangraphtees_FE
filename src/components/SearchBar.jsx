// import React, { useState } from "react";

// const SearchBar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [query, setQuery] = useState("");

//     const toggleSearch = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (query.trim() === "") return;
//         console.log("Searching for:", query);
//         // navigate to search results page if you want
//         // e.g., navigate(`/search?query=${query}`)
//     };

//     return (
//         <div className="d-flex align-items-center position-relative">
//             {/* Search Icon */}
            
//                 <a href="#"  onClick={toggleSearch} className=" text-light text-decoration-none" style={{ zIndex: 2,  color: isOpen ? "text-dark" : "text-l" }} title='Search'><i className="fa-solid fa-magnifying-glass"></i></a>


//             {/* Expanding Input */}
//             {isOpen && (
//                 <form onSubmit={handleSearch} className="position-absolute end-0">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search items..."
//                         autoFocus
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         style={{
//                             width: "200px",
//                             transition: "all 0.3s ease-in-out",
//                         }}
//                     />
//                 </form>
//             )}
//         </div>
//     );
// };

// export default SearchBar;
