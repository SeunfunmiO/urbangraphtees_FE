import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductSection from './ProductSection';

const FeaturedProd = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://urbangraphtees-be.onrender.com/products/product");
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } 
    };
    fetchProducts();
  }, []);

  const featuredProduct = products.map(p=>({
    ...p , tag: p.tag?.toUpperCase() || ''
  }));

  return (
    <section className="pt-5 container">
      <div className="text-center mb-4">
        <h2 className="display-5 fw-bold text-black">FEATURED PRODUCTS</h2>
        <p className="text-muted">Discover our latest streetwear essentials</p>
      </div>

      <div className="d-flex justify-content-center gap-4 flex-wrap featuredSec">
        <ProductSection tag="NEW" products={featuredProduct} />
        <ProductSection tag="BEST SELLER" products={featuredProduct} />
        <ProductSection tag="TRENDING" products={featuredProduct} />
      </div>
    </section>
  );
};

export default FeaturedProd;