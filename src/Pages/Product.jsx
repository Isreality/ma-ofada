// // import { Link } from "react-router-dom";
import "../style.css";
import { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { FaEllipsisV } from 'react-icons/fa';
import { SlSocialDropbox } from 'react-icons/sl';
import { FaPlus } from "react-icons/fa6";
import Sidebar from "../Components/Sidebar";
import FetchProduct from "../Components/FetchProduct";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import AddProduct from "../Components/AddProduct";
import { useAuth } from '../Components/AuthContext';


function Product () {
    const [data, setData] = useState([]);
    // const { authToken, setStatusCode } = useAuth();
    // const [search, setSearch] = useState('');
    // const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [empty, setEmpty] = useState(true);
    const [error, setError] = useState(false);


    const openModal = () => {
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };
  
    const BASE_URL = 'https://c0ed-102-89-34-235.ngrok-free.app/api';
    const endpoint = '/product/4';
    const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    // const handleAction = (action, id) => {
    //     // Handle different actions here
    //     console.log(`${action} action on row with ID: ${id}`);
    //     setDropdownRowId(null);
    //   };
    
      // const handleSearch = (event) => {
      //   const value = event.target.value;
      //   setSearch(value);
      //   const filteredItems = data.filter((item) =>
      //     item.name.toLowerCase().includes(value.toLowerCase())
      //   );
      //   setFilteredData(filteredItems);
      //   // setCurrentPage(1);
      // };
    
    //   const toggleDropdown = (id) => {
    //     setDropdownRowId(dropdownRowId === id ? null : id);
    //   };

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
                
                <div className="flex md:flex-row flex-col justify-between items-left md:items-center px-8 mb-4">
                  <div className="mb-4 text-left"><Heading title="Products"/></div>
                  <div className="flex flex-col lg:flex-row gap-3 items-left lg:items-center">
                      
                      {/* Search */}
                      <div className="">
                            <input
                            type="text"
                            placeholder="Search"
                            // value={search}
                            // onChange={handleSearch}
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

                <div className="border border-white md:border-disable rounded-md px-0 md:px-10 py-2  md:py-6 mx-4 md:mx-8">
                    <FetchProduct/>
                </div>
                
                {/* Body */}
                {/* {empty ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    {/* <SlSocialDropbox className="text-9xl text-c4"/>
                    <div className="mt-2 text-lg text-black3">No product has been added</div> */}
                    {/* <p>Loading...</p>
                  </div>
                ) : error || filteredData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <SlSocialDropbox className="text-9xl text-c4" />
                    <div className="mt-2 text-lg text-black3">No product has been added</div>
                  </div>
                ) : (
                  <div className="text-left px-8 gap-5">
                    {data.map((open) => (
                      <div key={open.id} className="flex flex-row gap-5 items-center border-b border-disable p-4">
                          <div><img src={open.category.imageUrl} alt="" className="h-10 w-10 md:h-16 md:w-16 rounded-md"/></div>
                          <div className="">
                              <h1 className="text-sm md:text-md text-left text-black2 font-medium">{open.category.name}</h1>
                              <h1 className="text-sm text-left text-black2 font-normal">N{open.price}</h1>    
                          </div>
                      </div> 
                    ))}
                      
                                        
                  </div> */}
                {/* )}  */}

                
                  {/* <div className="text-left px-8 gap-5">
                    {data.map((open) => (
                      <div key={open.id} className="flex flex-row gap-5 items-center border-b border-disable p-4">
                          <div><img src={open.category.imageUrl} alt="" className="h-10 w-10 md:h-16 md:w-16 rounded-md"/></div>
                          <div className="">
                              <h1 className="text-sm md:text-md text-left text-black2 font-medium">{open.category.name}</h1>
                              <h1 className="text-sm text-left text-black2 font-normal">N{open.price}</h1>    
                          </div>
                      </div> 
                    ))}
                                                              
                  </div> */}

                  
                
              </div>

            </div>
          )}                    
        </div>
     );
};

// const Pagination = ({ rowsPerPage, totalRows, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="inline-flex -space-x-px">
//         {pageNumbers.map((number) => (
//           <li key={number}>
//             <button
//               onClick={() => paginate(number)}
//               className={`px-3 py-2 leading-tight ${
//                 currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
//               } border border-gray-300 hover:bg-gray-200`}
//             >
//               {number}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }; 
export default Product;
