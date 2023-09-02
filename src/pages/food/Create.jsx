import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(true);

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !price || !description || !category || !image || !quantity) {
      return toast.error("A value is missing");
    }

    try {
      setLoading(true);
      let dataToSend = {
        title,
        price,
        description,
        category,
        image,
        quantity,
        available,
      };
      const response = await axios.post("/food/create", dataToSend);
      if (response) {
        setLoading(true);
        toast.success("Added Succesfully");
        navigate("/food");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed To Create");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className=" px-[10px] sm:px-[3em] pt-[10px]">
        <div>
          <Link to="/">
            <AiOutlineArrowLeft className="text-2xl" />
          </Link>
        </div>
        <h2 className="font-bold my-[1em]">CREATE A DELICACY</h2>
        <form
          className=" w-[98%] sm:w-[80%] md:w-[60%] m-auto"
          onSubmit={handleCreate}
        >
          <div className="flex flex-col gap-[10px] mb-[20px]">
            <label htmlFor="title">Enter The Title</label>
            <input
              type="text"
              placeholder="title of food"
              id="title"
              className="bg-transparent border border-zinc-500 p-[6px] rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={30}
            />
          </div>
          <div className="flex flex-col gap-[10px] mb-[20px]">
            <label htmlFor="price">Enter The Price. Just Number</label>
            <input
              type="text"
              placeholder="price of food"
              id="price"
              className="bg-transparent border border-zinc-500 p-[6px] rounded-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-[10px] mb-[20px]">
            <label htmlFor="description">Enter Food Description</label>
            <textarea
              name=""
              id="description"
              cols="30"
              rows="2"
              placeholder="description"
              className="bg-transparent border border-zinc-500 p-[6px] rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              maxLength={100}
            ></textarea>
          </div>
          <div className="flex flex-col gap-[10px] mb-[20px]">
            <label htmlFor="category">Enter Food Category</label>
            <select
              name="category"
              id="category"
              className="bg-transparent border border-zinc-500 p-[6px] rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Choose</option>
              <option value="breakfast">BreakFast</option>
              <option value="meal">Meal</option>
              <option value="snack">Snack</option>
              <option value="dinner">Dinner</option>
              <option value="tasty">Tasty</option>
            </select>
          </div>
          <div className="flex flex-col gap-[10px] mb-[20px]">
            <label htmlFor="quantity">
              Enter Food Quantity To Be Ordered at a time
            </label>
            <input
              type="number"
              id="quantity"
              placeholder="Enter quantity"
              className="bg-transparent border border-zinc-500 p-[6px] rounded-lg"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-[10px] mb-[20px]">
            <label htmlFor="image">Enter Image URL</label>
            <input
              type="text"
              id="image"
              placeholder="Enter image url"
              className="bg-transparent border border-zinc-500 p-[6px] rounded-lg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div>
            {loading ? (
              <div>
                {" "}
                <Spinner message="Adding ..." />{" "}
              </div>
            ) : (
              <button
                className="bg-red-800 p-[10px] rounded-lg text-white w-full "
                onClick={handleCreate}
              >
                Create Food
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
