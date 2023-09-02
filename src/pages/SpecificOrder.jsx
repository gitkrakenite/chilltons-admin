import { Link, useParams } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-toastify";
import moment from "moment";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlinePhone } from "react-icons/ai";
import { BsPersonCheck } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const SpecificOrder = () => {
  // fetch the order
  const { id } = useParams();
  const [singleOrder, setSingleOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      let checkParam = id;
      const response = await axios.get("/orders/specific/" + checkParam);
      if (response) {
        setLoading(false);
        setSingleOrder([response.data]);
        // console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching order.");
      toast.error("Network error or doesn't exist");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const [progress, setProgress] = useState("");

  const handleUpdateProgress = async (e) => {
    e.preventDefault();
    if (!progress) {
      return toast.error("Please set progress b4 updating");
    }

    try {
      let dataToSend = { progress };

      // console.log(dataToSend);
      let response = await axios.put("/orders/edit/" + id, dataToSend);

      if (response) {
        toast.success("Updated succesfully");
        window.location.reload();
      } else {
        toast.error("Failed To Update");
      }
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className="px-[1em] pt-[10px]">
        {/* topbar */}
        <div>
          <Link to="/">
            <AiOutlineArrowLeft className="text-3xl" />
          </Link>
        </div>

        {/* data */}
        <div className="mt-[20px]">
          {singleOrder?.map((item) => (
            <div key={item._id}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                {/* user details */}
                <div>
                  <h2 className="mb-[1em] font-bold">User Details</h2>
                  <div className="flex gap-[10px] mb-[20px]">
                    <BsPersonCheck className="text-2xl" />
                    <p>{item.username}</p>
                  </div>
                  <div className="flex ">
                    <div className="">
                      <a
                        href={`tel:${item.newPhone}`}
                        className="flex gap-[10px] mb-[20px] items-center"
                      >
                        <AiOutlinePhone className="text-2xl" />
                        <p>Press To Call</p>
                      </a>
                    </div>
                  </div>
                </div>
                {/* shipping details */}
                <div>
                  <h2 className="mb-[1em] font-bold">Shipping Details</h2>
                  <div className="flex gap-[10px] mb-[20px] items-center">
                    <CiLocationOn />
                    <p>{item.location}</p>
                  </div>
                </div>
                {/* Extra information */}
                <div>
                  <p className="font-bold">Extra Information</p>
                  <p>{item.moreInfo}</p>

                  <p>Progress : {item.progress}</p>
                </div>
              </div>
              {/* products */}
              <div className="mt-[2em] ">
                {item.product.map((p) => (
                  <div
                    key={p._id}
                    className="bg-slate-200 p-1 mb-[20px] flex flex-col sm:flex-row justify-between"
                  >
                    <div>
                      <p className="text-red-600 mb-[5px]">
                        {" "}
                        {moment(item.createdAt).fromNow()}
                      </p>
                      <img
                        src={p.image}
                        alt=""
                        className="h-64 object-contain"
                      />
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold mb-[15px]">{p.title}</p>
                        <p>{p.description}</p>
                        <p>{p.available ? "Available" : "Unavailable"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-4">
                        Quantity Ordered : {p.newQuantity}pcs
                      </p>
                      <p className="font-bold text-lg">
                        Price Before Delivery : Ksh. {p.newPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* options */}
              <div className="pb-[1em]">
                {/* update progress & delete order */}

                <h2 className="font-bold my-[1em]">Options Below</h2>

                <form
                  className="flex flex-col sm:flex-row gap-4 items-center"
                  onSubmit={handleUpdateProgress}
                >
                  <label htmlFor="progress">Update Order Progress</label>
                  <select
                    name=""
                    id=""
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="received">Received</option>
                    <option value="preparing">Preparing</option>
                    <option value="shipping">Shipping</option>
                    <option value="rejected">Rejected</option>
                    <option value="delivered">delivered</option>
                  </select>
                  <button
                    className="bg-red-700 text-white px-2 py-1 rounded-md"
                    onClick={handleUpdateProgress}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificOrder;
