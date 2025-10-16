import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProducts = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        material: '',
        sizes: '',
        colors: '',
        stock: '',
        discount: '',
        category: '',
        image: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, image: reader.result }));
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token'); 
            const res = await axios.post(
                'https://urbangraphtees-be.onrender.com/products/product',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: ` Bearer ${token}`,
                    },
                }
            );
            toast.success('Product added successfully!');
            console.log(res.data);
            setFormData({
                name: '',
                price: '',
                description: '',
                material: '',
                sizes: '',
                colors: '',
                stock: '',
                discount: '',
                category: '',
                image: '',
            });
        } catch (error) {
            console.error(error);
            toast.success('Error adding product.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h4 className="card-title mb-4 fw-bold">Add New Product</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter product name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="3"
                                    placeholder="Enter product description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Material</label>
                                <input
                                    type="text"
                                    name="material"
                                    className="form-control"
                                    placeholder="e.g. Cotton"
                                    value={formData.material}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Sizes</label>
                                <input
                                    type="text"
                                    name="sizes"
                                    className="form-control"
                                    placeholder="e.g. S, M, L"
                                    value={formData.sizes}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Colors</label>
                                <input
                                    type="text"
                                    name="colors"
                                    className="form-control"
                                    placeholder="e.g. Black, White"
                                    value={formData.colors}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    className="form-control"
                                    value={formData.stock}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Discount (%)</label>
                                <input
                                    type="number"
                                    name="discount"
                                    className="form-control"
                                    value={formData.discount}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    className="form-control"
                                    placeholder="e.g. Streetwear"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                            </div>

                            {formData.image && (
                                <div className="col-12 text-center mt-3">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="img-thumbnail"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            <div className="col-12 mt-4 text-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-dark px-4"
                                >
                                    {loading ? 'Adding...' : 'Add Product'}
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddProducts;