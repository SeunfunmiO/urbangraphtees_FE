
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaShoppingBag } from "react-icons/fa";
import { toast } from "react-toastify";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = "https://urbangraphtees-be.onrender.com/products/product";

    const fetchProducts = async () => {
        try {
            const res = await axios.get(BASE_URL);
            setProducts(res.data);
        } catch (error) {
            toast.error('Error fetching products')
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setProducts((prev) => prev.filter((p) => p._id !== id));
            toast.success('Product deleted')
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Error deleting product")
        }
    };

    // Toggle in-stock status
    const toggleStock = async (id, current) => {
        try {
            const res = await axios.put(`${BASE_URL}/${id}`, { inStock: !current });
            setProducts((prev) =>
                prev.map((p) => (p._id === id ? res.data : p))
            );
            toast.success("Product updated Successfully")
        } catch (error) {
            console.error("Error updating stock:", error);
            toast.error("Error updating stock")
        }
    };

    // Update discount (simple inline edit)
    const handleDiscountChange = async (id, value) => {
        try {
            const res = await axios.put(`${BASE_URL}/${id}`, { discount: Number(value) });
            setProducts((prev) =>
                prev.map((p) => (p._id === id ? res.data : p))
            );
        } catch (error) {
            console.error("Error updating discount:", error);
        }
    };
    if (loading)
        return (
            <div className="text-center py-5 mt-2">
                Loading products...
            </div>
        );


    return (
        <div className="p-5">
            <h2 className="mb-4"> <FaShoppingBag /> Product Management</h2>
            <div className="overflow-x-auto bg-white rounded-2 shadow">
                <table className=" min-vw-100">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="p-3 text-start">Image</th>
                            <th className="p-3 text-start">Name</th>
                            <th className="p-3 text-start">Price</th>
                            <th className="p-3 text-start">Stock</th>
                            <th className="p-3 text-start">Discount</th>
                            <th className="p-3 text-start">Last Updated</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product._id}
                                className="border-bottom border-black "
                            >
                                <td className="p-3">
                                    <img
                                        src={product.images?.[0]?.url}
                                        alt={product.name}
                                        className=" w-25 h-25 object-fit-cover rounded"
                                    />
                                </td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">₦{product.price?.toLocaleString()}</td>
                                <td className="p-3" style={{ fontSize: '13px' }}>
                                    <button
                                        onClick={() => toggleStock(product._id, product.inStock)}
                                        className={`px-3 py-1 rounded ${product.inStock
                                            ? "bg-success border-0 text-white"
                                            : "bg-danger text-white border-0"
                                            }`}
                                    >
                                        {product.inStock ? "In Stock" : "Out of Stock"}
                                    </button>
                                    <p className="text-muted mt-1">
                                        {product.stock} items
                                    </p>
                                </td>
                                <td className="p-3">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={product.discount}
                                        onChange={(e) =>
                                            handleDiscountChange(product._id, e.target.value)
                                        }
                                        className="border px-2 py-1  rounded"
                                    />
                                    <span className="ms-1 text-muted">%</span>
                                </td>
                                <td className="p-3 text-secondary">
                                    {new Date(product.updatedAt).toLocaleString()}
                                </td>
                                <td className="p-3 text-center d-flex align-items-center gap-2 justify-content-center">
                                    <button className="text-info btn-0 btn border-0">
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        type='button' data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        className="text-danger btn btn-0 border-0"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {products.map((product) => (

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Product Deletion</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {`  Are you sure you want to delete ${product.name}? This cannot be undone.`}
                            </div>
                            <div className="modal-footer border-0">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button disabled={loading} onClick={() => handleDelete(product._id)} type="button" className="btn btn-danger">{loading ? 'Deleting' : 'Yes, Delete'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}


        </div>
    );
};

export default ManageProducts