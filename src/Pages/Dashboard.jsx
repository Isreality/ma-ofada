// import { Link } from "react-router-dom";
import "../style.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Heading from "../Components/Heading";
import Card from "../Components/Card";
import Reviews from "../Components/Reviews";
import { useState, useEffect } from 'react';
import { useAuth } from '../Components/AuthContext';
import { FaUsers } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { RiListView } from "react-icons/ri";
import { TbMathGreater } from "react-icons/tb";
import { Link } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { authToken, setStatusCode } = useAuth();
  const [stat, setStat] = useState([]);
  const [error, setError] = useState(null);

  const BASE_URL = 'https://d153-102-89-23-118.ngrok-free.app/api';
  const endpoint = '/seller/dashboard/get-stats';
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
          console.log(result);
          setStat(result.data);
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [Atoken, setStatusCode]);
  

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }, [])


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
                <div className="mb-4 items-center"><Header title="Dashboard" link="/dashboard"/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Dashboard"/></div>
                </div>
                
                {/* Body */}
                {/* Card */}
                <div className=" grid lg:grid-cols-2 sm:grid-cols-1 px-8 gap-5 mb-4">
                  {/* <Card className="bg-primary text-white" title="Total Revenue" icons={<TbCurrencyNaira className="size-10 text-white bg-[#fefefe] p-2 rounded-full"/>} info="10M"/> */}
                  <Card className="bg-primary text-white" title="Total Products" icons={<FiBox className="size-10 text-primary bg-white p-2 rounded-full"/>} info={stat.productCount}/>
                  <Card title="Total Orders" icons={<RiListView className="size-10 text-white bg-pend p-2 rounded-full"/>} info={stat.ordersCount}/>
                </div>
                
                {/* Reviews */}
                <div className="px-8 items-left">
                  <div className="text-primary text-left text-xl font-semibold mb-2">Reviews</div>
                    <Reviews/>

                </div>
                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Dashboard;