import { useState, useRef } from "react";
import axios from "../axios";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { AiOutlineArrowUp, AiOutlineClose } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MySong from "../assets/not.mp3";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleFetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("orders/all");
      if (response) {
        setLoading(false);
        return response.data; // Return the data
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching orders");
      throw error;
    }
  };

  // play a song function
  const audioRef = useRef(null);

  const handlePlayAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
    }
  };

  const fetchData = async () => {
    try {
      const data = await handleFetchOrders();
      setAllOrders(data);

      // trying to create notification
      // Get the previously stored data length from local storage
      const storedDataLength = parseInt(localStorage.getItem("dataLength"), 10);

      // Check if the new data length is greater than the stored data length
      if (data.length > storedDataLength) {
        handlePlayAudio();
        toast.success("New order");
      }

      // Store the current data length in local storage
      localStorage.setItem("dataLength", data.length.toString());
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function immediately
  }, []);

  // search  states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setsearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  // search user func
  const handleSearchChange = async (e) => {
    e.preventDefault();
    clearTimeout(setsearchTimeout);

    setSearchText(e.target.value);

    // console.log(searchText);

    setsearchTimeout(
      setTimeout(() => {
        const searchResults = allOrders?.filter(
          (item) =>
            item.username.toLowerCase().includes(searchText.toLowerCase()) ||
            item.progress.toLowerCase().includes(searchText.toLowerCase()) ||
            item.newPhone.toLowerCase().includes(searchText.toLowerCase()) ||
            item.location.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  // scroll to top functionality
  const [showArrow, setShowArrow] = useState(false);

  // const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteOrder = async (id) => {
    let isConfirm = confirm("Are you sure you want to proceed?");

    if (isConfirm) {
      try {
        let response = await axios.delete("/orders/delete/" + id);
        if (response) {
          toast.success("Delete Succesful");
          await handleFetchOrders();
        }
      } catch (error) {
        toast.error("Failed to delete order");
      }
    }
  };

  return (
    <div>
      {/* arrow to scroll to top */}
      {showArrow && (
        <div
          className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-orange-700 text-zinc-50 rounded-full p-[5px]"
          onClick={handleScrollTop}
        >
          <AiOutlineArrowUp />
        </div>
      )}

      {/* <button onClick={handlePlayAudio}>Play Audio</button> */}
      {/* wrapper */}
      <div>
        {/* searchbar */}
        <div className="w-full flex justify-center">
          <form className=" w-[98%] md:w-[50%]">
            <input
              type="text"
              placeholder="search order"
              className="bg-zinc-300 w-full p-[8px] rounded-md"
              value={searchText}
              onChange={handleSearchChange}
            />
          </form>
          {/* {console.log(searchedResults)} */}
        </div>
        {!loading && (
          <FiRefreshCcw
            className="text-2xl text-end w-full my-[15px]"
            onClick={handleFetchOrders}
          />
        )}
        {/* data to show */}
        <div>
          {loading ? (
            <div className="mt-[5em]">
              <Spinner message="Fetching orders" />
            </div>
          ) : (
            <>
              {searchText ? (
                <>
                  {searchedResults?.length >= 1 ? (
                    <>
                      <div className="flex flex-col gap-3 mt-[1em] ">
                        {searchedResults?.map((order) => (
                          <Link to={`/order/${order._id}`} key={order._id}>
                            <div key={order._id} className="bg-slate-200 p-1">
                              <div className="flex justify-between">
                                <div>
                                  <p>{order.username}</p>
                                  <p>{order.location.substring(0, 10)}...</p>
                                  <p>{order.newPhone}</p>
                                </div>
                                <div>
                                  <p className="mb-3">
                                    STATUS : {order.progress}
                                  </p>
                                  <p> {moment(order.createdAt).fromNow()}</p>
                                </div>
                                {user?.username == "krakenite" && (
                                  <div>
                                    <AiOutlineClose
                                      className="text-3xl bg-red-700 p-1 text-white rounded-full z-10 pr-1 "
                                      title="delete order"
                                      onClick={() =>
                                        handleDeleteOrder(order._id)
                                      }
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div>
                      <p>😥No results for {searchText}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-3 mt-[1em] ">
                    {allOrders?.map((order) => (
                      <div key={order._id} className="bg-slate-200 p-1">
                        <div className="flex justify-between gap-[20px] ">
                          <Link
                            to={`/order/${order._id}`}
                            key={order._id}
                            className="flex-[0.9]"
                          >
                            <div className="flex justify-between flex-wrap gap-[10px]">
                              <div>
                                <p>{order.username}</p>
                                <p>{order.location.substring(0, 10)}...</p>
                                <p>{order.newPhone}</p>
                              </div>
                              <div className="flex gap-[4em] items-center">
                                <div>
                                  <p className="mb-3">
                                    STATUS : {order.progress}
                                  </p>

                                  <p
                                    className={
                                      moment(order.createdAt).fromNow() ==
                                        "a few seconds ago" && "text-red-600"
                                    }
                                  >
                                    {moment(order.createdAt).fromNow()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>

                          {user?.username == "krakenite" && (
                            <div>
                              <AiOutlineClose
                                className="text-3xl bg-red-700 p-1 text-white rounded-full z-10 pr-1 "
                                title="delete order"
                                onClick={() => handleDeleteOrder(order._id)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <audio ref={audioRef} src={MySong} />
    </div>
  );
};

export default Orders;
