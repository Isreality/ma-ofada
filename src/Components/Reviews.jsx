import "../style.css";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../Components/AuthContext';
import ScaleLoader from "react-spinners/ScaleLoader";
import { FiStar } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";


const Reviews = () => {
  const { authToken, setStatusCode } = useAuth();
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = '/seller/dashboard/get-ratings?rating=1';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL + endpoint, {
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
          setRating(result.data);
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
    }, 3000)
  }, [])

  // const renderStars = (rating) => {
  //   const filledStars = Array(rating).fill(<FaStar className="text-pend text-lg" />);
  //   const unfilledStars = Array(5 - rating).fill(<FaRegStar className="text-c4 text-lg" />);
  //   return [...filledStars, ...unfilledStars];
  // };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="text-pend text-lg" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-c4 text-lg" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div 
      // style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
              <ScaleLoader
                  color={'#c4c4c4'}
                  loading={loading}
                  // cssOverride={override}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
              /> 
      </div>
    );
  }

  if (rating.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FiStar className="text-9xl text-c4"/>
        <p className="text-lg text-black2">No Ratings Yet</p>
      </div>
    );
  }

    return ( 
        <div>
            {/* Nav */}
            <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                {rating.map((rate) => (
                    <div key={rate.id} className="flex flex-col bg-fa rounded-md text-black2 gap-1 p-6">
                          <h1 className="text-left text-primary text-md font-bold">{rate.user.fullname}</h1>
                          <div className="flex text-xs text-left gap-1">
                            {renderStars(rate.rating).map((star, index) => (
                              <div key={index}>{star}</div>
                            ))}
                          </div>
                          <h1 className="text-sm text-left text-black2">{rate.review}</h1>
                    </div> 
                ))}
            </div><br/>
            </div>
        </div>
       
     );
}
 
export default Reviews;
