import "../style.css";
import { useAuth } from '../Components/AuthContext';
import { useState, useEffect } from 'react';

const OpenOrders = () => {
  const { authToken, setStatusCode } = useAuth();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const BASE_URL = 'https://c0ed-102-89-34-235.ngrok-free.app/api';
  const endpoint = '/order/fetch-open-orders?page=1';
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

  return (
    <div>
      <div className="">
                {data.map((open) => (
                    <div key={open.id} className="flex flex-row gap-5 items-center border-b border-disable p-4">
                        <div><img src={open.product.imageUrl} alt="" className="h-10 w-10 md:h-16 md:w-16 rounded-md"/></div>
                        <div className="">
                            <h1 className="text-sm md:text-md text-left text-black2 font-medium">{open.product.name}</h1>
                            <h1 className="text-sm text-left text-black2 font-normal">N{open.product.price}</h1>    
                        </div>
                    </div> 
                ))}
            </div><br/>
    </div>
  );
}

export default OpenOrders;