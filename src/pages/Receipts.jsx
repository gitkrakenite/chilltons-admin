import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Spinner from "../components/Spinner";
import { logout } from "../features/auth/authSlice";

const Receipts = () => {
  const [allReceipts, setAllReceipts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleFetchReceipts = async () => {
    // check whether username exist in DB
    let username = user?.username;
    const nameToCheck = { username };
    const { data } = await axios.post("/users/check", nameToCheck);
    if (data == "not exist") {
      setLoading(false);
      handleLogout();
      toast.warning("Please sign in again");
      return;
    } else {
      try {
        try {
          setLoading(true);
          let username = user.username;
          let dataToSend = { username };
          const response = await axios.get("/receipts/all", dataToSend);
          if (response) {
            setLoading(false);
            setAllReceipts(response.data);
            // console.log(response.data);
          }
        } catch (error) {
          setLoading(false);
          toast.error("Error Fetching Receipts");
        }
      } catch (error) {
        toast.error("Error Fetching Receipts");
      }
    }
  };

  useEffect(() => {
    handleFetchReceipts();
  }, []);

  const handleDeleteReceipts = async (id) => {
    try {
      let response = await axios.delete("/receipts/" + id);
      if (response) {
        toast.success("Receipt deleted");
        await handleFetchReceipts();
      }
    } catch (error) {
      toast.error("failed to delete");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className=" pt-[1em] px-[10px] sm:px-[2em] md:px-[3em] lg:px-[5em]">
        {/* topbar */}
        <div className="flex justify-between items-center">
          <div>
            <Link to="/">
              <AiOutlineArrowLeft className="text-2xl" />
            </Link>
          </div>
        </div>
        {/*  */}
        <div className="mt-[20px]">
          <h2>All Receipts</h2>
          {/* {console.log(allReceipts)} */}

          {/* data */}
          {loading ? (
            <div className="h-[65vh] w-full flex justify-center items-center">
              <Spinner message="Fetching ..." />
            </div>
          ) : (
            <div>
              {allReceipts?.length < 1 ? (
                <div className="h-[65vh] w-full flex justify-center items-center">
                  <p>No Recent Receipts</p>
                </div>
              ) : (
                <>
                  {allReceipts?.map((item) => (
                    <div key={item._id} className="bg-zinc-200 mb-[15px]">
                      <div className="flex justify-between">
                        <p className="text-sm">Creator: {item.creator}</p>
                        <p className="my-[5px] text-sm text-red-600">
                          Generated : {moment(item.createdAt).fromNow()}
                        </p>
                        <p
                          className="text-red font-bold cursor-pointer"
                          onClick={() => handleDeleteReceipts(item._id)}
                        >
                          del
                        </p>
                      </div>
                      <div className="text-sm">
                        <p>Customer : {item.customerName}</p>
                        <p>Address : {item.deliveryAddress}</p>
                      </div>
                      {/* table data */}
                      <table className="min-w-full mt-[10px]">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                              Receipt Details
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white">
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                              Container Fee
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                              {item.containerFee}
                            </td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                              Delivery Fee
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                              {item.deliveryFee}
                            </td>
                          </tr>

                          {/*  */}
                          {/* Food Items */}

                          {item.foodItems.map((foodItem, index) => (
                            <tr key={index} className="bg-gray-50">
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                {foodItem.foodName}
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500">
                                {foodItem.price}
                              </td>
                            </tr>
                          ))}

                          {/*  */}

                          <tr className="bg-white">
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                              Total Price
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                              Ksh. {item.totalPrice}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/*  */}
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Receipts;
