import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/chlogo.png";
import Orders from "../components/Orders";

import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Please login");
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {/* {console.log(user)} */}
      {user?.isAdmin == "yes" ? (
        <>
          {/* wrapper */}
          <div className=" px-[10px] sm:px-[3em] pt-[1em]">
            {/* topbar */}
            <div className="flex flex-col justify-between items-center gap-3 flex-wrap">
              <div>
                {/* <h2>CHILLTONS</h2> */}
                <img src={logo} alt="" className="w-20 h-20" />
              </div>
              <div>
                <ul className="flex items-start gap-[15px]">
                  <Link to="/charges">
                    <li>Charges</li>
                  </Link>

                  {user?.username == "krakenite" && (
                    <>
                      <Link to="/food">
                        <li>FOOD</li>
                      </Link>
                      <Link to="/drinks">
                        <li>DRINKS</li>
                      </Link>
                      <Link to="/users">
                        <li>USERS</li>
                      </Link>
                    </>
                  )}

                  <p onClick={handleLogout} className="cursor-pointer">
                    LOGOUT
                  </p>
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
        </>
      ) : (
        <div className="mt-[7em]">
          <p className="text-center mb-[1em]">Your Account Is Not Admin</p>
          <Link to="/login" className="text-center " onClick={handleLogout}>
            <p className="text-red-600 underline">LOGIN AGAIN</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
