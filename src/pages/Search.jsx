import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BarLoader } from "react-spinners";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://urbangraphtees-be.onrender.com/products?search=${encodeURIComponent(query)}`
        );
        setProducts(res.data.products || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchProducts();
  }, [query]);

  if (loading) return <p className='mt-5 d-flex justify-content-center'><BarLoader /></p>;
  if (!products.length) return <div className="text-center my-5 py-5">
    <FaBoxOpen size={40} color="lightgray" />
    <p className="text-muted mt-3">No products for "{query}"</p>
  </div>;

  return (
    <div className="container mt-4">
      <h4>Search results for "{query}"</h4>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-3" key={product._id}>
            <div className="card">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h6>{product.name}</h6>
                <p>${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;