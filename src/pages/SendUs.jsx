import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useState } from "react";
import axios from "../axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
import { useSelector } from "react-redux";
import { useRef } from "react";
import MySong from "../assets/not.mp3";

const SendUs = () => {
  const [loading, setLoading] = useState(false);
  const [allSend, setAllSend] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const handleFetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("send-us/all");
      if (response) {
        setLoading(false);
        return response.data; // Return the data
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching sent");
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
      setAllSend(data);

      // trying to create notification
      // Get the previously stored data length from local storage
      const storedDataLength = parseInt(localStorage.getItem("sentLength"), 10);

      // Check if the new data length is greater than the stored data length
      if (data.length > storedDataLength) {
        handlePlayAudio();
        toast.success("New sent");
      }

      // Store the current data length in local storage
      localStorage.setItem("sentLength", data.length.toString());
    } catch (error) {
      console.error("Error fetching sent", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function immediately

    const intervalId = setInterval(fetchData, 5000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleDeleteSend = async (id) => {
    if (!id) return toast.error("Error passing id");

    let isDelete = confirm("Are you sure you want to delete ?");

    if (isDelete) {
      try {
        const response = await axios.delete("/send-us/" + id);
        if (response) {
          handleFetchOrders();
          toast.success("Deleted Successfully");
        }
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className="pt-[1em] px-[5px] sm:px-[1em]  md:px-[2em]  lg:px-[3em] xl:px-[5em]">
        <div className="mb-[20px]">
          <Link to="/">
            <AiOutlineArrowLeft className="text-2xl" />
          </Link>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-bold">All Requests</p>
          <button onClick={handlePlayAudio}>Play Audio</button>
          <audio ref={audioRef} src={MySong} />
        </div>
        {loading ? (
          <div className="h-[70vh] w-full flex justify-center items-center">
            <Spinner message="Loading..." />
          </div>
        ) : (
          <div className="mt-[1em]">
            {allSend.length < 1 ? (
              <div className="h-[60vh] w-full flex justify-center items-center">
                {" "}
                <p>😥 No New Requests Yet</p>{" "}
              </div>
            ) : (
              <>
                {allSend.map((item) => (
                  <div key={item._id} className="mb-[2em] bg-zinc-100">
                    <div className="flex items-center justify-between gap-[10px] mb-2">
                      <p className="font-bold">{item.username}</p>
                      <div>
                        <a href={`tel:${item.phone}`}>{item.phone}</a>
                      </div>
                    </div>

                    <p className="mb-2">{item.location}</p>
                    <p className="text-lg my-3">{item.items}</p>
                    <div className="flex justify-between items-center">
                      {user?.username == "krakenite" && (
                        <p>
                          <AiOutlineDelete
                            className="text-2xl text-red-600"
                            onClick={() => handleDeleteSend(item._id)}
                          />
                        </p>
                      )}
                      <p className="text-end text-teal-800 text-sm">
                        {" "}
                        {moment(item.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendUs;
