// // import { Link } from "react-router-dom";
import "../style.css";
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { FaEllipsisV } from 'react-icons/fa';
import { SlSocialDropbox } from 'react-icons/sl';
import { FaPlus } from "react-icons/fa6";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import AddProduct from "../Components/AddProduct";
import { useAuth } from '../Components/AuthContext';


function Product () {
    const [data, setData] = useState([]);
    const { authToken, setStatusCode, fetchNewToken } = useAuth();
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [dropdownRowId, setDropdownRowId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [empty, setEmpty] = useState(true);
    const [error, setError] = useState(false);

    // const openModal = () => {
  
    //   // Validate the form inputs
    //   // if (!title || !body) {
    //   //   setErrorMessage('Both title and body are required.');
    //     // setSuccessMessage('');
    //   //   setIsModalOpen(true);
    //   //   return;
    //   // } 
  
    //   // setErrorMessage('');
    //   // setSuccessMessage('');
    //   setIsOpen(true);
    // };

    const openModal = () => {
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };
  
    const BASE_URL = 'https://d153-102-89-23-118.ngrok-free.app/api';
    const endpoints = [
      '/product/4',
      '/product/search?searchQuery=DISCOUNT_SALES&minPrice=&maxPrice=&ratings=&page=1&categoryId=',
      '/product/keyword-search?searchQuery=Plastic Foldable',
      '/product/category/3',
      // '/seller/dashboard/get-stats5',
      // '/seller/dashboard/get-stats6',
    ];
    const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchPromises = endpoints.map((endpoint) =>
            fetch(BASE_URL + endpoint, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${Atoken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'ngrok-skip-browser-warning': "69420",
                'origin': '*',
              },
            })
          );
    
          const responses = await Promise.all(fetchPromises);
    
          // Check for any unauthorized responses
          const unauthorized = responses.find((response) => response.status === 401);
    
          if (unauthorized) {
            // Token is invalid, refresh it
            await fetchNewToken();
          } else {
            const results = await Promise.all(responses.map((response) => response.json()));
    
            // Collect data and status codes
            const data = results.map((result, index) => {
              setStatusCode(responses[index].status);
              if (responses[index].ok && result.status) {
                return result.data;
              } else {
                throw new Error('Data fetch unsuccessful');
              }
            });
    
            setData(data);
          }
        } catch (error) {
          setError(error.message);
        }
      };
    fetchData();
    }, [Atoken, setStatusCode]);
  
    // useEffect(() => {
    //   if (authToken) {
    //     fetchData(authToken);
    //   }
    // }, [Atoken, setStatusCode]);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const handleAction = (action, id) => {
        // Handle different actions here
        console.log(`${action} action on row with ID: ${id}`);
        setDropdownRowId(null);
      };
    
      const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
        const filteredItems = data.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filteredItems);
        setCurrentPage(1);
      };
    
      const toggleDropdown = (id) => {
        setDropdownRowId(dropdownRowId === id ? null : id);
      };

      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return ( 
        <div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-row">
              {/* Sidebar */}
              <div>
                <Sidebar/>
              </div>

              {/* Header */}
              <div className="w-full">
                <div className="mb-4 items-center"><Header title="Products" link="/product"/></div>
                
                <div className="flex md:flex-row flex-col justify-between items-left md:items-center px-8">
                  <div className="mb-4 text-left"><Heading title="Products"/></div>
                  <div className="flex flex-col lg:flex-row gap-3 items-left lg:items-center">
                      
                      {/* Search */}
                      <div className="">
                            <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                            className="w-full px-3 py-3 border rounded text-black2 focus:outline-disable"
                            />
                      </div>

                      {/* Add Product */}
                      <div>
                        <button onClick={openModal} className="flex flex-row w-full gap-1 items-center p-4 bg-primary text-white text-sm text-center rounded-md"><FaPlus/>Add Product</button>
                        <AddProduct show={showModal} handleClose={closeModal}/>
                      </div>
                  </div> 
                </div>
                
                {/* Body */}
                {empty ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <SlSocialDropbox className="text-9xl text-c4"/>
                    <div className="mt-2 text-lg text-black3">No product has been added</div>
                  </div>
                ) : error || filteredData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <SlSocialDropbox className="text-9xl text-c4" />
                    <div className="mt-2 text-lg text-black3">No product has been added</div>
                  </div>
                ) : (
                  <div className="text-left px-8 gap-5">
                    <table className="min-w-full border-collapse border border-disable">
                          <thead className="bg-fa text-sm">
                          <tr className="">
                              <div className="p-2 text-center items-center"><th className="p-4 text-black2 font-normal">ID</th></div>
                              <th className="p-4 text-black2 font-normal">Product</th>
                              <th className="p-4 text-black2 font-normal">Available</th>
                              <th className="p-4 text-black2 font-normal">Price</th>
                              <th className="p-4 text-black2 font-normal">Date Added</th>
                              <th className="p-4 text-black2 font-normal">Action</th>
                          </tr>
                          </thead>

                          <tbody>
                          {currentRows.map((item) => (
                              <tr key={item.id} className="text-black2 text-sm border-b border-disable">
                                  <div className="bg-white p-4 text-center text-sm items-center"><td className="bg-fa px-4 py-2 rounded-sm">{item.id}</td></div>
                                  <td className="p-4">{item.name}</td>
                                  {/* <td className="p-4">{item.state}</td> */}
                                  <td className="p-4">{item.price}</td>
                                  <td className="p-4">June, 2024</td>
                                  <td className="flex flex-row gap-2 p-2 items-center">
                                    <div className="relative">
                                      <button onClick={() => toggleDropdown(item.id)} className="focus:outline-none">
                                        <FaEllipsisV />
                                      </button>
                                      {dropdownRowId === item.id && (
                                        <div className="absolute right-0 z-10 w-40 py-2 mt-2 bg-white rounded shadow-xl">
                                          <button
                                            onClick={() => handleAction('Accept', item.id)}
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                          >
                                            Accept
                                          </button>
                                          <button
                                            onClick={() => handleAction('Decline', item.id)}
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                          >
                                            Decline
                                          </button>
                                          <button
                                            onClick={() => handleAction('Ban', item.id)}
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                          >
                                            Ban
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                      {/* <FaEye className="text-c4 size-5 cursor-pointer" onClick={() => openDetailsModal(item)}/>
                                      <HiOutlineTrash className="text-red size-5 cursor-pointer" onClick={() => openModal(item.id)}/> */}
                                  </td>
                              </tr>
                          ))}
                          </tbody>
                      </table>
                      
                      {!loading && !error && filteredData.length > 0 && (
                        <div className="mt-4">
                          <Pagination
                            rowsPerPage={rowsPerPage}
                            totalRows={filteredData.length}
                            paginate={paginate}
                            currentPage={currentPage}
                          />    
                        </div>
                      )}                          
                  </div>
                )}
                
              </div>

            </div>
          )}                    
        </div>
     );
};

const Pagination = ({ rowsPerPage, totalRows, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 leading-tight ${
                currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
              } border border-gray-300 hover:bg-gray-200`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}; 
export default Product;
