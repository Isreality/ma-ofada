import "../style.css";
import fisher from '../img/fisher.jpg';
import { RxCaretRight } from "react-icons/rx";
// import { useAuth } from '../Components/AuthContext';

const OpenOrders = () => {
  

  return (
    <div>
      <div className="flex flex-row justify-between items-center bg-fa p-4">
        <div className="flex flex-row gap-5">
          <div><img src={fisher} alt="" className="h-16 w-16 rounded-md"/></div>
          <div className="">
              <h1 className="text-xl text-left font-medium">jk</h1>
              <h1 className="text-md text-left font-normal">kl</h1>    
          </div>
        </div>
        
        <div><RxCaretRight className="text-black2 font-medium cursor-pointer size-5"/></div>
        
      </div>
    </div>
  );
}

export default OpenOrders;