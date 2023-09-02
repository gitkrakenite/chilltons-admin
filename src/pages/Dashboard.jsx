import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/chlogo.png";
import Orders from "../components/Orders";
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return toast.error("Please login");
    }
    if (user?.isPaid == "nope") {
      navigate("/login");
      return toast.error("Not an admin account");
    }
  }, [user]);

  return (
    <div>
      {/* wrapper */}
      <div className=" px-[10px] sm:px-[3em] pt-[1em]">
        {/* topbar */}
        <div className="flex justify-between items-center">
          <div>
            {/* <h2>CHILLTONS</h2> */}
            <img src={logo} alt="" className="w-20 h-20" />
          </div>
          <div>
            <ul className="flex items-start gap-[15px]">
              <li>FOOD</li>
              <li>DRINKS</li>
              <li>USERS</li>
            </ul>
          </div>
        </div>
        {/* orders */}
        <div className="mt-[3em]">
          {/* <h2>ALL ORDERS</h2> */}
          <div>
            <Orders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
