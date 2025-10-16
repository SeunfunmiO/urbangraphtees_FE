
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = "https://urbangraphtees-be.onrender.com/api/products/add-product";

    // Fetch products
    const fetchProducts = async () => {
        try {
            const res = await axios.get(BASE_URL);
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Delete a product
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`${BASE_URL} / ${id}`);
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Toggle in-stock status
    const toggleStock = async (id, current) => {
        try {
            const res = await axios.put(`${BASE_URL} / ${id}`, { inStock: !current });
            setProducts((prev) =>
                prev.map((p) => (p._id === id ? res.data : p))
            );
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    // Update discount (simple inline edit)
    const handleDiscountChange = async (id, value) => {
        try {
            const res = await axios.put(`${BASE_URL} / ${id}`, { discount: Number(value) });
            setProducts((prev) =>
                prev.map((p) => (p._id === id ? res.data : p))
            );
        } catch (error) {
            console.error("Error updating discount:", error);
        }
    };
    if (loading)
        return (
            <div className="text-center py-10 text-gray-500">
                Loading products...
            </div>
        );


    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">🛍 Product Management</h2>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full text-sm text-gray-600">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Stock</th>
                            <th className="p-3 text-left">Discount</th>
                            <th className="p-3 text-left">Last Updated</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product._id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="p-3">
                                    <img
                                        src={product.images?.[0]?.url}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">₦{product.price?.toLocaleString()}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => toggleStock(product._id, product.inStock)}
                                        className={`px-3 py-1 rounded text-xs ${product.inStock
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {product.inStock ? "In Stock" : "Out of Stock"}
                                    </button>
                                    <p className="text-xs text-gray-400 mt-1">
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
                                        className="border px-2 py-1 w-16 rounded"
                                    />
                                    <span className="ml-1 text-gray-400">%</span>
                                </td>
                                <td className="p-3 text-gray-500">
                                    {new Date(product.updatedAt).toLocaleString()}
                                </td>
                                <td className="p-3 text-center flex items-center gap-3 justify-center">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts