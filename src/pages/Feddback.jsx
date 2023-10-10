import { useEffect, useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import moment from "moment";
import Spinner from "../components/Spinner";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const Feddback = () => {
  const [allFeedback, setAllFeedback] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/feedback/all");
      if (response) {
        setLoading(false);
        setAllFeedback(response.data);
        console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching Feedback");
    }
  };

  useEffect(() => {
    handleFetchFeedback();
  }, []);

  // handle delete
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete("/feedback/" + id);
      if (res) {
        toast.success("deleted");
        setLoading(false);
        await handleFetchFeedback();
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className="px-[15px] pt-[10px]">
        <div className="flex gap-[10px] items-center mb-[20px] ">
          <Link to="/">
            <AiOutlineArrowLeft className="text-2xl" />
          </Link>
          <h2 className="font-bold">All Feedback</h2>
        </div>
        <div>
          {allFeedback?.map((item) => (
            <div key={item._id} className="mb-[10px] bg-zinc-200 p-2">
              <div className="flex justify-between mb-[10px]">
                <p>{item.sender}</p>
                <p>{item.category}</p>
              </div>
              <p className="mb-[10px]">{item.message}</p>
              <div className="text-sm flex justify-between gap-[15px] flex-wrap">
                <p> {moment(item.createdAt).fromNow()}</p>
                <p
                  className="bg-red-700 text-white px-3 py-1"
                  onClick={() => handleDelete(item._id)}
                >
                  del
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feddback;
