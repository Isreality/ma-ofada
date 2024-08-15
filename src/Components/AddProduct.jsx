import "../style.css";
import { useState, useEffect } from 'react';
import { LiaImage } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../Components/Modal";
import FetchCategory from "../Components/FetchCategory";
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '../Components/AuthContext';

function AddProduct ({ show, handleClose }) {
  const [errors, setErrorMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [spin, setSpin] = useState(null);
  const { categories, error } = FetchCategory();
  const { authToken, setStatusCode } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: null,
    categoryId: '',
    numberOfAvailableStocks: '',
    price: ''
  });

  const BASE_URL = 'https://90cf-102-88-71-130.ngrok-free.app/api';
  const endpoint = '/seller/product/create';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;


  const handleImageChange = (e) => {
    setFormData({
        ...formData,
        image: e.target.files[0]
    });
  };

  const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      image: e.dataTransfer.files[0]
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // const handleRemoveImage = (e) => {
  //   // setImage(null);
  //   setFormData({
  //     ...formData,
  //     image: e.target.files[0]
  //   });
  // };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (!formData.categoryId || !formData.name || !formData.desc || !formData.image || !formData.price || !formData.numberOfAvailableStocks) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      setIsModalOpen(true);
      return;
    }

    if (formData.desc.length < 100) {
      setErrorMessage('Description must be at least 100 characters.');
      setSuccessMessage('');
      setIsModalOpen(true);
      return;
    }

    setSpin(true);
 
    const formPayload = new FormData();
        formPayload.append('name', formData.name);
        formPayload.append('desc', formData.desc);
        formPayload.append('image', formData.image);
        formPayload.append('categoryId', formData.categoryId);
        formPayload.append('numberOfAvailableStocks', formData.numberOfAvailableStocks);
        formPayload.append('price', formData.price);

    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'ngrok-skip-browser-warning': "69420",
        },
        body: formPayload,
      });

      if (!response.ok) {
        setErrorMessage('Product submission unsuccessful');
        setSuccessMessage('');
        setIsModalOpen(true);
        return;
      } else {
        setSuccessMessage('Product added successfully.');
        setErrorMessage('')
        setIsModalOpen(true);
        window.location.reload();
        console.log(result);
      }

      const result = await response.json();
      console.log('Success:', result);
      } catch (error) {
          console.error('Error:', error);
      } finally {
        setSpin(false);
        setIsModalOpen(true);
      }
  };

  return ( 
    <div>
      {show && (
        <div className="fixed inset-0 flex justify-center items-center z-80">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg w-3/4 md:w-3/4 lg:w-3/4 py-8 px-4 lg:px-16 z-10 max-h-[470px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-white">
            <button
              // className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
              className="fixed top-10 right-8 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
              onClick={handleClose}>
              &times;
            </button>

            {/* Modal */}
            <div className="fixed top-4 left-4 md:left-44 w-72 md:w-3/4 mb-4">
              {isModalOpen && (
                <Modal
                  message={errors || successMessage}
                  type={errors ? 'error' : 'success'}
                  onClose={closeModal}
                  className=""
                />
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Category */}
              <div className='space-y-1 md:space-y-2 items-start text-left relative mb-2'>
                <label htmlFor="categoryId" className='text-md text-black2'>Category</label><br/>
                <select 
                  className='block appearance-none border border-disable rounded-md w-full px-4 py-6 text-black2 leading-tight focus:outline-disable bg-white' 
                  id="categoryId" 
                  value={formData.categoryId}
                  onChange={handleChange}
                  name="categoryId"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))} 
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black2">
                  <RiArrowDropDownLine className="h-6 w-6"/>
                </div>
                {errors.categoryId && <span style={{ color: 'red' }}>{errors.categoryId}</span>}<br/>
              </div>

              {/* Name */}
              <div className='space-y-1 md:space-y-2 items-start text-left'>
                <label htmlFor="name" className='text-md text-black2'>Product Name</label><br/>
                <input 
                  className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                  type='text' 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}<br/>
              </div>

              {/* Description */}
              <div className='space-y-2 text-left'>
                <label htmlFor="desc" className='text-md text-left text-black2'>Description</label><br/>
                <textarea 
                  className='border p-4 w-full h-32 rounded-md border-disable bg-white focus:outline-disable text-black2' 
                  id="desc" 
                  value={formData.desc}
                  onChange={handleChange}
                  name="desc"
                />
                {errors.desc && <span style={{ color: 'red' }}>{errors.desc}</span>}<br/>
              </div>

              {/* Image */}
              <div className='space-y-2 text-left mb-4'>
                <label htmlFor="image" className='text-md text-left text-black2'>Upload Image</label><br/>
                {formData.image ? (
                  <div style={{ display: 'inline-block' }}>
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Selected Image"
                      style={{ maxHeight: '300px', borderRadius: '6px' }}
                      className="w-full"
                    /><br/>
                    <div className="flex flex-row gap-5 justify-items-start">
                      <input
                        type="file"
                        accept=".jpg, .png"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="imageInput"
                      />
                      <label
                        htmlFor="imageInput"
                        className="text-white bg-primary px-4 py-2 rounded-md cursor-pointer"
                        onChange={handleImageChange}
                      >
                        Change Image
                      </label>
                      {/* <button 
                        className="text-black2 bg-disable px-4 py-2 rounded-md" 
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </button> */}
                    </div>
                  </div>
                ) : (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{
                      border: '2px dashed #ccc',
                      borderRadius: '5px',
                      padding: '40px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="file"
                      accept=".jpg, .png"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      id="imageInput"
                    />
                    <label htmlFor="imageInput" className="text-black2" style={{ cursor: 'pointer' }}>
                      <div className="grid justify-items-center"><LiaImage className="text-c4 size-32"/></div>
                      Drag and drop files, or <b className="text-primary">Browse</b><br/>
                      <p className="text-xs">JPG, PNG - Max file size (10MB)</p>
                    </label>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className='space-y-2 text-left'>
                <label htmlFor="price" className='text-md text-left text-black2'>Price</label><br/>
                <input 
                  className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black' 
                  type='text' 
                  id="price" 
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="N"
                  name="price"
                />
                {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}<br/>
              </div>

              {/* Sale */}
              <div className='space-y-2 text-left'>
                <label htmlFor="numberOfAvailableStocks" className='text-md text-left text-black2'>Available for sale</label><br/>
                <input 
                  className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                  type='text' 
                  id="numberOfAvailableStocks" 
                  value={formData.numberOfAvailableStocks}
                  onChange={handleChange}
                  name="numberOfAvailableStocks"
                  // onChange={(e) => setNumberOfAvailableStocks(e.target.value)}
                />
                {errors.numberOfAvailableStocks && <span style={{ color: 'red' }}>{errors.numberOfAvailableStocks}</span>}<br/>
              </div>

              {/* Submit Button */}
              <div className="grid justify-items-end">
                <button type="submit"  disabled={spin} className='mt-4 w-full md:w-64 py-4 px-20 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-md font-medium'>
                  {spin ? <div className="px-2 text-md"><FaSpinner className="animate-spin" /> </div> : 'Add'}
                </button>
              </div> 
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
