import "../style.css";
import { useAuth } from '../Components/AuthContext';
import Delete from '../Components/Delete';
import Modal from '../Components/Modal';
import EditProduct from '../Components/EditProduct';
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";
import { SlSocialDropbox } from "react-icons/sl";
import ScaleLoader from "react-spinners/ScaleLoader";
// import { useNavigate } from 'react-router-dom';

const FetchProduct = ({searchQuery}) => {
  const { authToken, setStatusCode } = useAuth();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
   const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  // const [searchQuery, setSearchQuery] = useState('');
  // const navigate = useNavigate();

  const BASE_URL = 'https://c0ed-102-89-34-235.ngrok-free.app/api';
  const endpoint = '/seller/product/fetch?minPrice=&maxPrice=&ratings=&page=1';
  // const productSearchEndpoint = '/seller/product/search?searchQuery=cat fish&minPrice=&maxPrice=&ratings=&categoryId=';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  // useEffect(() => {
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

  //   fetchData();
  // }, [Atoken, setStatusCode]);

  // const openModal = () => {
  //   setShowModal(true);
  // };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [Atoken, setStatusCode]);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.price.toString().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  // const handleEdit = (productId) => {
  //   setSelectedProduct(productId);
  //   setShowEditModal(true);
  // };

  // const closeEditModal = () => {
  //   setShowEditModal(false);
  //   setSelectedProduct(null);
  // };

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

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 3000)
  }, [])

  if (loading) {
    return (
      <div>
        <ScaleLoader
          color={'#c4c4c4'}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> 
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <SlSocialDropbox className="text-9xl text-c4"/>
        <p className="text-lg text-black2">No Product added</p>
      </div>
    );
  }

  // const handleSearch = async (e) => {
  //   const query = e.target.value.toLowerCase();
  //   setSearchQuery(query);

  //   if (query.trim() === '') {
  //     // If the search query is empty, fetch all products
  //     fetchData();
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${BASE_URL}${productSearchEndpoint}?q=${query}`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${Atoken}`,
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'ngrok-skip-browser-warning': "69420",
  //         'origin': '*',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const result = await response.json();
  //     console.log('Search Results:', result.data);
  //     setProducts(result.data);
  //   } catch (error) {
  //     setError(error.message);
  //     console.error('Search Error:', error);
  //   }
  // };

  return (
    <div>
      <div className="">
            {/* Modal */}
            <div className="fixed top-4 w-72 md:w-3/4 mb-4">
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
                      <div className="flex flex-row gap-5 items-center px-2 py-4">
                        <div><img src={product.imageUrl} alt="" className="h-10 w-10 md:h-16 md:w-16 rounded-md"/></div>
                        <div className="">
                            <h1 className="text-sm md:text-md text-left text-black2 font-medium">{product.name}</h1>
                            <h1 className="text-sm text-left text-black2 font-normal">N{product.price}</h1>    
                        </div>
                      </div>

                      <div className="flex flex-row gap-2">
                        {/* <button onClick={() => handleEdit(product.id)} className="cursor-pointer ">
                          <BiSolidEdit className="text-success size-6 cursor-pointer" />
                        </button> */}
                        <button onClick={() => handleDelete(product)} className="cursor-pointer ">
                          <HiOutlineTrash className="text-red size-6 cursor-pointer" />
                        </button>
                      </div>
                      
                    </div> 
                ))}
                {/* <EditProduct
                  productId={selectedProduct}
                  show={showEditModal}
                  handleClose={closeEditModal}
                /> */}
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