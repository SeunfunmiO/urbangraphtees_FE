
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrash, FaEdit, FaShoppingBag } from "react-icons/fa";
// import { toast } from "react-toastify";

// const ManageProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [deleting, setDeleting] = useState(false)

//     const BASE_URL = "https://urbangraphtees-be.onrender.com/products/product";

//     const fetchProducts = async () => {
//         try {
//             const res = await axios.get(BASE_URL);
//             setProducts(res.data);
//         } catch (error) {
//             toast.error('Error fetching products')
//             console.error("Error fetching products:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);


//     const handleDelete = async (id) => {
//         try {
//             setDeleting(true)
//             await axios.delete(`${BASE_URL}/${id}`);
//             setProducts((prev) => prev.filter((p) => p._id !== id));
//             toast.success('Product deleted')
//         } catch (error) {
//             console.error("Error deleting product:", error);
//             toast.error("Error deleting product")
//         }
//         finally{
//             setDeleting(false)
//         }
//     };

//     // Toggle in-stock status
//     const toggleStock = async (id, current) => {
//         try {
//             const res = await axios.put(`${BASE_URL}/${id}`, { inStock: !current });
//             setProducts((prev) =>
//                 prev.map((p) => (p._id === id ? res.data : p))
//             );
//             toast.success("Product updated Successfully")
//         } catch (error) {
//             console.error("Error updating stock:", error);
//             toast.error("Error updating stock")
//         }
//     };

//     // Update discount (simple inline edit)
//     const handleDiscountChange = async (id, value) => {
//         try {
//             const res = await axios.put(`${BASE_URL}/${id}`, { discount: Number(value) });
//             setProducts((prev) =>
//                 prev.map((p) => (p._id === id ? res.data : p))
//             );
//         } catch (error) {
//             console.error("Error updating discount:", error);
//         }
//     };
//     if (loading)
//         return (
//             <div className="text-center py-5 mt-2">
//                 Loading products...
//             </div>
//         );


//     return (
//         <div className="p-5">
//             <h2 className="mb-4"> <FaShoppingBag /> Product Management</h2>
//             <div className="overflow-x-auto bg-white rounded-2 shadow">
//                 <table className=" min-vw-100">
//                     <thead className="bg-black text-white">
//                         <tr>
//                             <th className="p-3 text-start">Image</th>
//                             <th className="p-3 text-start">Name</th>
//                             <th className="p-3 text-start">Price</th>
//                             <th className="p-3 text-start">Stock</th>
//                             <th className="p-3 text-start">Discount</th>
//                             <th className="p-3 text-start">Last Updated</th>
//                             <th className="p-3 text-center">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {products.map((product) => (
//                             <tr
//                                 key={product._id}
//                                 className="border-bottom border-black "
//                             >
//                                 <td className="p-3">
//                                     <img
//                                         src={product.images?.[0]?.url}
//                                         alt={product.name}
//                                         style={{ width: 60, height: 60 }}
//                                         className="object-fit-cover rounded"
//                                     />
//                                 </td>
//                                 <td className="p-3">{product.name}</td>
//                                 <td className="p-3">₦{product.price?.toLocaleString()}</td>
//                                 <td className="p-3" style={{ fontSize: '13px' }}>
//                                     <button
//                                         onClick={() => toggleStock(product._id, product.inStock)}
//                                         className={`px-3 py-1 rounded ${product.inStock
//                                             ? "bg-success border-0 text-white"
//                                             : "bg-danger text-white border-0"
//                                             }`}
//                                     >
//                                         {product.inStock ? "In Stock" : "Out of Stock"}
//                                     </button>
//                                     <p className="text-muted mt-1">
//                                         {product.stock} items
//                                     </p>
//                                 </td>
//                                 <td className="p-3">
//                                     <input
//                                         type="number"
//                                         min="0"
//                                         max="100"
//                                         value={product.discount}
//                                         onChange={(e) =>
//                                             handleDiscountChange(product._id, e.target.value)
//                                         }
//                                         className="border px-2 py-1  rounded"
//                                     />
//                                     <span className="ms-1 text-muted">%</span>
//                                 </td>
//                                 <td className="p-3 text-secondary">
//                                     {new Date(product.updatedAt).toLocaleString()}
//                                 </td>
//                                 <td className="p-3 text-center d-flex align-items-center gap-2 justify-content-center">
//                                     <button className="text-info btn-0 btn border-0">
//                                         <FaEdit size={18} />
//                                     </button>
//                                     <button
//                                         type='button' data-bs-toggle="modal" data-bs-target="#deleteModal"
//                                         className="text-danger btn btn-0 border-0"
//                                     >
//                                         <FaTrash />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>


//             {products.map((product) => (

//                 <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h1 className="modal-title fs-5" id="deleteModalLabel">Confirm Product Deletion</h1>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 {`  Are you sure you want to delete ${product.name}? This cannot be undone.`}
//                             </div>
//                             <div className="modal-footer border-0">
//                                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//                                 <button disabled={deleting} onClick={() => handleDelete(product._id)} type="button" className="btn btn-danger">{deleting ? 'Deleting' : 'Yes, Delete'}</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}


//         </div>
//     );
// };

// export default ManageProducts



import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaShoppingBag } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null); // store the product to edit
    const [editForm, setEditForm] = useState({});
    const [editImage, setEditImage] = useState("");
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false)
    const [deleteProduct, setDeleteProduct] = useState(null)
    const navigate = useNavigate()
    const BASE_URL = "https://urbangraphtees-be.onrender.com/products/product";

    const fetchProducts = async () => {
        try {
            const res = await axios.get(BASE_URL);
            setProducts(res.data);
        } catch (error) {
            toast.error("Error fetching products");
            console.log("Error fetching products:", error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 🗑 Delete product
    const handleDelete = async (id) => {
        try {
            setDeleting(true)
            const token = localStorage.getItem("token");
            await axios.delete(`https://urbangraphtees-be.onrender.com/products/delete-product/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts((prev) => prev.filter((p) => p._id !== id));
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Error deleting product");
            console.log("Error deleting product:", error);
        }
        finally {
            setDeleting(false)
        }
    };

    // 🧠 Handle edit form input change
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    // 🖼 Handle new image upload
    const handleEditImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setEditImage(reader.result);
    };

    // ✏ Open modal with selected product data
    const openEditModal = (product) => {
        setEditingProduct(product);
        setEditForm(product);
        setEditImage("");
        const modal = new window.bootstrap.Modal(document.getElementById("editModal"));
        modal.show();
    };

    // ✅ Save changes
    const handleSaveEdit = async () => {
        if (!editingProduct) return;
        const token = localStorage.getItem("token");

        try {
            setEditing(true)
            const payload = { ...editForm };
            if (editImage) payload.image = editImage; // attach new image if changed

            const res = await axios.put(`${BASE_URL}/${editingProduct._id}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update product in the state
            setProducts((prev) =>
                prev.map((p) => (p._id === editingProduct._id ? res.data : p))
            );
            console.log(res.data);

            toast.success("Product updated successfully");
            const modal = window.bootstrap.Modal.getInstance(document.getElementById("editModal"));
            modal.hide();
            navigate('/admin/products')
        } catch (error) {
            toast.error("Error updating product");
            console.error(error);
        }
        finally {
            setEditing(false)
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

    if (loading)
        return (
            <div className="text-center py-5 mt-2">Loading products...</div>
        );
    if (products.length === 0) {
        return <div>No product yet</div>
    }
    return (
        <div>
            <h2 className="mb-4">
                <FaShoppingBag /> Product Management
            </h2>
            <div className="overflow-x-auto bg-white rounded-2 shadow">
                <table className="table table-hover">
                    <thead className="bg-black text-white">
                        <tr>
                            <th>#</th>
                            <th className="p-3 text-start">Image</th>
                            <th className="p-3 text-start">Name</th>
                            <th className="p-3 text-start">Price</th>
                            <th className="p-3 text-start">Stock</th>
                            <th className="p-3 text-start">Discount</th>
                            <th className="p-3 text-start">Tag</th>
                            <th className="p-3 text-start">Last Updated</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id} className="align-middle">
                                <td>{index + 1}.</td>
                                <td className="p-3">
                                    <img
                                        src={product.images?.[0]?.url || product.img}
                                        alt={product.name}
                                        className="rounded"
                                        width="80"
                                        height="80"
                                        style={{ objectFit: "cover" }}
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
                                <td className="p-3">{product.discount || 0}%</td>
                                <td className="p-3">{product.tag}</td>
                                <td className="p-3 text-muted">
                                    {new Date(product.updatedAt).toLocaleString()}
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        className="btn btn-sm btn-0 border-0 text-info"
                                        onClick={() => openEditModal(product)}
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-0 border-0 text-danger"
                                        type='button' data-bs-toggle="modal" data-bs-target="#deleteModal"
                                        onClick={() => setDeleteProduct(product)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✏ Edit Product Modal */}
            <div
                className="modal fade"
                id="editModal"
                tabIndex="-1"
                aria-labelledby="editModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-sm">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title fw-semibold" id="editModalLabel">
                                Edit Product
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={editForm.name || ""}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        value={editForm.price || ""}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        className="form-control"
                                        value={editForm.description || ""}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        className="form-control"
                                        value={editForm.stock || ""}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Discount (%)</label>
                                    <input
                                        type="number"
                                        name="discount"
                                        className="form-control"
                                        value={editForm.discount || ""}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">tag</label>
                                    <select
                                        className="form-select"
                                        name="tag"
                                        value={editForm.tag}
                                        onChange={handleEditChange}
                                    >
                                        <option value="none">None</option>
                                        <option value="new">New</option>
                                        <option value="trending">Trending</option>
                                        <option value="best-seller">Best Seller</option>
                                    </select>
                                </div>

                                {/* Image */}
                                <div className="col-md-6">
                                    <label className="form-label">Change Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control"
                                        onChange={handleEditImage}
                                    />
                                    {(editImage || editingProduct?.images?.[0]?.url) && (
                                        <div className="mt-3 text-center">
                                            <img
                                                src={editImage || editingProduct?.images?.[0]?.url}
                                                alt="Preview"
                                                className="rounded img-thumbnail"
                                                width="150"
                                                height="150"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button disabled={editing} className="btn btn-dark" onClick={handleSaveEdit} data-bs-toggle="modal" >
                                {editing ? 'Saving...' : ' Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteModalLabel">Confirm Product Deletion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {deleteProduct ?
                                (<>  Are you sure you want to delete <strong>{deleteProduct.name}</strong>? This cannot be undone.</>)
                                : (
                                    'No product selected'
                                )
                            }
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={deleting} onClick={() => handleDelete(deleteProduct._id)} type="button" className="btn btn-danger">{deleting ? 'Deleting' : 'Yes, Delete'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;