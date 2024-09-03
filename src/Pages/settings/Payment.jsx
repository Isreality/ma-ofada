import "../../style.css";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import Heading from "../../Components/Heading";
import FetchBanks from "../../Components/FetchBanks";
import { useState, useEffect } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSpinner } from 'react-icons/fa';
import BeatLoader from "react-spinners/BeatLoader";
// import { useAuth } from '../Components/AuthContext';
// import { Link } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrorMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [spin, setSpin] = useState(null);
  const { banks, error } = FetchBanks();
  // const { authToken, setStatusCode } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
  };

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }, [])

    return ( 
        <div>

          {loading ? (
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <BeatLoader
                  color={'#00923F'}
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
                <div className="mb-4 items-center"><Header title="Payment Details" link=""/></div>
                
                <div className="px-8">
                  <div className="mb-4"><Heading title="Payment Details"/></div>
                </div>
                
                {/* Body */}
                <div className="border border-white md:border-disable rounded-md px-0 md:px-10 py-2 md:py-8 mx-8">
                  <form className='space-y-4'>
                      {/* Bank Name */}
                      <div className='space-y-1 md:space-y-2 items-start text-left relative mb-2'>
                        <label htmlFor="name" className='text-md text-black2'>Bank Name</label><br/>
                        <select 
                          className='block appearance-none border border-disable rounded-md w-full px-4 py-6 text-black2 leading-tight focus:outline-disable bg-white' 
                          id="name" 
                          value={formData.name}
                          onChange={handleChange}
                          name="name"
                        >
                          {banks.map((bank) => (
                            <option key={bank.id} value={bank.id}>
                              {bank.name}
                            </option>
                          ))} 
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black2">
                          <RiArrowDropDownLine className="h-6 w-6"/>
                        </div>
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}<br/>
                      </div>

                      {/* Account*/}
                      <div className='space-y-1 md:space-y-2 items-start text-left'>
                        <label htmlFor="number" className='text-md text-black2'>Account Number</label><br/>
                        <input 
                          className='border p-4 w-full rounded-md border-disable bg-white focus:outline-disable text-black2' 
                          type='text' 
                          id="number" 
                          value={formData.number}
                          onChange={handleChange}
                          name="number"
                        />
                        {errors.number && <span style={{ color: 'red' }}>{errors.number}</span>}<br/>
                      </div>

                      {/* Submit Button */}
                      <div className="grid justify-items-end">
                        <button type="submit"  disabled={spin} className='mt-4 w-full md:w-64 py-4 px-20 rounded-md border-fa bg-primary hover:bg-black cursor-pointer text-white text-md font-medium'>
                          {spin ? <div className="px-2 text-md"><FaSpinner className="animate-spin" /> </div> : 'Save'}
                        </button>
                      </div> 
                  </form>
                </div>

                
              </div>

            </div>
          )}

         
           
        </div>
     );
}
 
export default Payment;
