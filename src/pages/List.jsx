import React, { useState, useEffect } from 'react';
import { backendURL, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendURL + "/api/product/list");
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError(response.data.message || "Failed to fetch products");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(backendURL + `/api/product/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setProducts(products.filter(product => product._id !== productId));
        toast.success("Product deleted successfully!");
      } else {
        toast.error(response.data.message || "Failed to delete product.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while deleting the product.");
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b className='text-center'>Action</b>
        </div>

        {
          products.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
              <img className='w-12' src={`http://localhost:4000${item.image[0]}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <div className="flex justify-end md:justify-center">
                <img onClick={() => handleDelete(item._id)} src={assets.Delete_icon} alt="Delete Icon" className='w-8 cursor-pointer' />
              </div>
            </div>
          ))
        }

      </div>
      {/* <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow-md">
              <img
                src={`http://localhost:4000${product.image[0]}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
              <div className="mt-4 flex justify-between ">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white w-full px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default List;
