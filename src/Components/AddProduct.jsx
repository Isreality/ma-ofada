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
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [numberOfAvailableStocks, setNumberOfAvailableStocks] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrorMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [spin, setSpin] = useState(null);
  const { authToken, setStatusCode } = useAuth();

  const BASE_URL = 'https://c0ed-102-89-34-235.ngrok-free.app/api';
  const endpoint = '/seller/product/create';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedImage = e.dataTransfer.files[0];
    setImage(selectedImage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (!categoryId || !name || !desc || !image || !price || !numberOfAvailableStocks) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      setIsModalOpen(true);
      return;
    }

    setSpin(true);

    const formData = new FormData();
    formData.append('categoryId', categoryId);
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('price', price);
    formData.append('numberOfAvailableStocks', numberOfAvailableStocks);
    formData.append('image', image);

    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': "69420",
          'origin': '*',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Data submission unsuccessful');
      }

      const result = await response.json();
      if (result.status) {
        setSuccessMessage('A new product has been added');
        setErrorMessage({});
        setCategoryId('');
        setName('');
        setDesc('');
        setImage(null);
        setPrice('');
        setNumberOfAvailableStocks('');
      } else {
        throw new Error('Data submission unsuccessful');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
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
          <div className="relative bg-white rounded-lg w-3/4 md:w-3/4 lg:w-3/4 py-8 px-4 lg:px-16 z-10 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-white">
            <button
              className="absolute top-0 right-0 m-4 bg-disable rounded-full text-gray-600 text-2xl hover:text-gray-800 w-10 h-10"
              onClick={handleClose}>
              &times;
            </button>

            {/* Modal */}
            <div className=" mb-4">
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
            <form onSubmit={onSubmit} className='space-y-4'>
              {/* Category */}
              <div className='space-y-1 md:space-y-2 items-start text-left relative mb-2'>
                <label htmlFor="categoryId" className='text-md text-black2'>Category</label><br/>
                <select 
                  className='block appearance-none border border-disable rounded-md w-full px-4 py-6 text-black2 leading-tight focus:outline-disable bg-white' 
                  id="categoryId" 
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  name="categoryId"
                >
                  <option value="" disabled>Select a category</option>
                  {/* <FetchCategory/> */}
                  <option value="3" className="p-4">3</option>
                  {/* <option value="Meat" className="p-4">Meat</option>
                  <option value="Egg" className="p-4">Egg</option>  */} 
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}<br/>
              </div>

              {/* Description */}
              <div className='space-y-2 text-left'>
                <label htmlFor="desc" className='text-md text-left text-black2'>Description</label><br/>
                <textarea 
                  className='border p-4 w-full h-32 rounded-md border-disable bg-white focus:outline-disable text-black2' 
                  id="desc" 
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                {errors.desc && <span style={{ color: 'red' }}>{errors.desc}</span>}<br/>
              </div>

              {/* Image */}
              <div className='space-y-2 text-left mb-4'>
                <label htmlFor="image" className='text-md text-left text-black2'>Upload Image</label><br/>
                {image ? (
                  <div style={{ display: 'inline-block' }}>
                    <img
                      src={URL.createObjectURL(image)}
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
                      <button 
                        className="text-black2 bg-disable px-4 py-2 rounded-md" 
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </button>
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="N"
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
                  value={numberOfAvailableStocks}
                  onChange={(e) => setNumberOfAvailableStocks(e.target.value)}
                />
                {errors.numberOfAvailableStocks && <span style={{ color: 'red' }}>{errors.numberOfAvailableStocks}</span>}<br/>
              </div>

              {/* Submit Button */}
              <div className="grid justify-items-end">
                <button type="submit" onClick={handleSubmit} disabled={spin} className='mt-4 w-full md:w-64 py-4 px-20 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-md font-medium'>
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
