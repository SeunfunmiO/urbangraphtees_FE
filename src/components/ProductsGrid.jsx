import React from "react";
import { useNavigate } from "react-router-dom";


const ProductsGrid = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-5 prodGrid my-5">
      <section className="py-5 bg-black text-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">SHOP BY CATEGORY</h2>
          </div>
          <div className="row">
            {['Hoodies', 'T-Shirts', 'Joggers', 'Hats'].map((category) => (
              <div key={category} className="col-lg-3 col-md-6 mb-4">
                <div className="card bg-transparent border-white text-white">
                  <div className="card-body text-center py-4">
                    <h5 className="card-title">{category}</h5>
                    <button className={`btn btn-outline-light`} onClick={() => navigate(`/shop?category=${category}`)}>
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >
    </div >
  );
};

export default ProductsGrid;

