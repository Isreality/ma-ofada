import "../style.css";
import { useAuth } from '../Components/AuthContext';
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
// import { useNavigate } from 'react-router-dom';

const FetchProduct = () => {
  const { authToken, setStatusCode } = useAuth();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  // const navigate = useNavigate();

  const BASE_URL = 'https://c0ed-102-89-34-235.ngrok-free.app/api';
  const endpoint = '/seller/product/fetch?minPrice=&maxPrice=&ratings=&page=1';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Atoken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': "69420",
            'origin': '*',
          },
        });

        setStatusCode(response.status);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.status) {
          // console.log(result);
          setData(result.data);
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [Atoken, setStatusCode]);

  // const openModal = () => {
  //   setShowModal(true);
  // };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/seller/product/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Atoken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': "69420",
          'origin': '*',
        },
        body: JSON.stringify({ productId: productToDelete?.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else{
        setProducts(products.filter((product) => product.id !== productToDelete?.id));
        setShowModal(false);
        setSuccessMessage(`Product "${productToDelete?.name}" was successfully deleted.`);
        setErrorMessage(``);
        setIsModalOpen(true);
        setProductToDelete(null);
        // console.log('Delete Result:', result);
      }

      setTimeout(() => {
        setSuccessMessage('');
        setIsModalOpen(false);
        // navigate('/product');
        window.location.reload();
      }, 3000);
    } catch (error) {
      setError(error.message);
      setShowModal(false);
    }
  };

  return (
    <div>
      <div className="">
            {/* Modal */}
            <div className="fixed top-4  w-3/4 mb-4">
              {isModalOpen && (
                <Modal
                  message={errors || successMessage}
                  type={errors ? 'error' : 'success'}
                  onClose={removeModal}
                  className=""
                />
            )}
            </div>
                {data.map((product) => (
                    <div key={product.id} className="flex flex-row justify-between items-center border-b border-disable p-4">
                      <div className="flex flex-row gap-5 items-center p-4">
                        <div><img src={product.imageUrl} alt="" className="h-10 w-10 md:h-16 md:w-16 rounded-md"/></div>
                        <div className="">
                            <h1 className="text-sm md:text-md text-left text-black2 font-medium">{product.name}</h1>
                            <h1 className="text-sm text-left text-black2 font-normal">N{product.price}</h1>    
                        </div>
                      </div>

                      <button  onClick={() => handleDelete(product)} className="cursor-pointer ">
                        <HiOutlineTrash className="text-red size-6 cursor-pointer" />
                      </button>
                      
                    </div> 
                ))}
                <Delete 
                  show={showModal} 
                  handleClose={closeModal} 
                  onConfirm={confirmDelete} 
                  header="Delete Product" 
                  body={`Are you sure you want to delete this product "${productToDelete?.name}"?`}
                />
      </div>
    </div>
  );
}

export default FetchProduct;