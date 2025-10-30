import React, { useState, useEffect } from "react";


const SearchOffcanvas = ({ show, handleClose, products }) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(products || []);

  useEffect(() => {
    if (products?.length > 0) {
      const results = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(results);
    }
  }, [search, products]);

  return (
    <div className="offCanvas" show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Search Products</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search for a product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        {filtered.length > 0 ? (
          <div className="d-flex flex-wrap gap-3">
            {filtered.map((product) => (
              <div
                key={product._id}
                className="border p-2 rounded"
                style={{
                  width: "48%",
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <p className="fw-bold mt-2 mb-1">{product.name}</p>
                <p className="text-muted small mb-0">₦{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No products found.</p>
        )}
      </Offcanvas.Body>
    </div>
  );
};

export default SearchOffcanvas;