import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import OpenOrders from "../Components/OpenOrders";
import ClosedOrders from "../Components/ClosedOrders";
import { useState, useEffect } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import { RiFileList3Line } from "react-icons/ri";
// import { useAuth } from '../Components/AuthContext';
// import { Link } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  // const { authToken, setStatusCode } = useAuth();
  // const [empty, setEmpty] = useState(true);
  // const [data, setData] = useState([]);
  const [tab1Data, setTab1Data] = useState(null);
  const [tab2Data, setTab2Data] = useState(null);
  const [error, setError] = useState(null);

  // const BASE_URL = 'https://d153-102-89-23-118.ngrok-free.app/api';
  // const endpoint = '/seller/dashboard/get-stats';
  // const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }, [])

  // useEffect(() => {
  //   // Replace with your actual API endpoints
  //   const fetchTab1Data = async () => {
  //     try {
  //       const response = await fetch(BASE_URL + endpoint, {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${Atoken}`,
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json',
  //           'ngrok-skip-browser-warning': "69420",
  //           'origin': '*',
  //         },
  //       });

  //       setStatusCode(response.status);

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const result = await response.json();
  //       if (result.status) {
  //         // console.log(result);
  //         setTab1Data(result.data);
  //       } else {
  //         throw new Error('Data fetch unsuccessful');
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //     // const response = await fetch('https://api.example.com/tab1');
  //     const data = await response.json();
  //     setTab1Data(data);
  //   };

  //   const fetchTab2Data = async () => {
  //     const response = await fetch('https://api.example.com/tab2');
  //     const data = await response.json();
  //     setTab2Data(data);
  //   };

  //   fetchTab1Data();
  //   fetchTab2Data();
  //   // setLoading(false);
  // }, [Atoken, setStatusCode]);

    return ( 
        <div>

          {loading ? (
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <BeatLoader
                  color={'#481986'}
                  loading={loading}
                  // cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
              /> 
            </div>
          ) : (
            <div className="flex flex-row">
              {/* Sidebar */}
              <div>
                <Sidebar/>
              </div>

              {/* Header */}
              <div className="w-full">
                <div className="mb-4 items-center"><Header title="Orders" link="/order"/></div>
                
                <div className="px-4 md:px-8">
                  <div className="mb-4"><Heading title="Orders"/></div>
                </div>
                
                {/* Body */}
                <div className="border border-white md:border-disable rounded-md px-0 md:px-10 py-2 md:py-6 mx-4 md:mx-8">
                    <div className="flex flex-row justify-between space-x-2 bg-fa rounded-md p-2">
                      {/* Tabs */}
                      <button
                        onClick={() => handleTabClick('tab1')}
                        className={`py-4 px-10 md:px-44 focus:outline-none ${activeTab === 'tab1' ? 'bg-primary text-white text-md rounded-md' : 'text-md text-black2'}`}
                      >
                        Open Orders
                      </button>

                      <button
                        onClick={() => handleTabClick('tab2')}
                        className={`py-4 px-10 md:px-44 focus:outline-none ${activeTab === 'tab2' ? 'bg-primary text-white text-md rounded-md' : 'text-md text-black2'}`}
                      >
                        Closed Orders
                      </button>
                    </div>

                    <div className="px-0 py-4">
                      {/* OPen Orders */}
                      {activeTab === 'tab1' && 
                        // <div className="flex flex-col items-center justify-center h-64">
                        //   <RiFileList3Line className="text-9xl text-c4"/>
                        //    <p className="text-lg text-black2">No Orders Yet</p>
                        //    <p className="text-sm text-black2">Order from buyers will appear here</p>
                        // </div>
                        <OpenOrders/>
                      }

                      
                      
                      {/* Closed Orders */}
                      {activeTab === 'tab2' && 
                        // <div className="flex flex-col items-center justify-center h-64">
                        //   <RiFileList3Line className="text-9xl text-c4"/>
                        //   <p className="text-lg text-black2">No Orders Yet</p>
                        //   <p className="text-sm text-black2">Order from buyers will appear here</p>
                        // </div>
                        <ClosedOrders/>
                      }

                      {/* {activeTab === 'tab1' && (
                        tab1Data && tab1Data.length > 0 ? (
                          <div>{tab1Data.map(item => <div key={item.id}>{item.name}</div>)}</div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-64">
                            <RiFileList3Line className="text-9xl text-c4"/>
                            <p className="text-lg text-black2">No Orders Yet</p>
                            <p className="text-sm text-black2">Order from buyers will appear here</p>
                          </div>
                        )
                      )}

                      {activeTab === 'tab2' && (
                        tab2Data && tab2Data.length > 0 ? (
                          <div>{tab2Data.map(item => <div key={item.id}>{item.name}</div>)}</div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-64">
                            <RiFileList3Line className="text-9xl text-c4"/>
                            <p className="text-lg text-black2">No Orders Yet</p>
                            <p className="text-sm text-black2">Order from buyers will appear here</p>
                          </div>
                        )
                      )} */}
                    </div>
                </div>

                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Order;
