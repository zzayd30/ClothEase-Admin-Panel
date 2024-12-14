import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { backendURL } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      // Appending other form data
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));
      const response = await axios.post(
        backendURL + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer format
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setSizes([]);
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
      else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-3 w-full'>
      <div className="">
        <p className='mb-2'>Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Upload Icon" />
            <input onChange={(e) => { setImage1(e.target.files[0]) }} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Upload Icon" />
            <input onChange={(e) => { setImage2(e.target.files[0]) }} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="Upload Icon" />
            <input onChange={(e) => { setImage3(e.target.files[0]) }} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="Upload Icon" />
            <input onChange={(e) => { setImage4(e.target.files[0]) }} type="file" id='image4' hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">
          Product Name
        </p>
        <input onChange={(e) => { setName(e.target.value) }} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type Name Here' required />
      </div>
      <div className="w-full">
        <p className="mb-2">
          Product Description
        </p>
        <textarea onChange={(e) => { setDescription(e.target.value) }} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content Here' required />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => { setCategory(e.target.value) }} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="">
          <p className='mb-2'>Product Subcategory</p>
          <select onChange={(e) => { setSubCategory(e.target.value) }} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="">
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => { setPrice(e.target.value) }} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='200' />
        </div>
      </div>

      <div className="">
        <p className='mb-2'>Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => {
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                );
              }}
              className=""
            >
              <p
                className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input onChange={(e) => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Best Seller</label>
      </div>
      <button className='w-28 py-3 mt-4 bg-black text-white' type='submit'>Add Product</button>
    </form>
  )
}

export default Add
