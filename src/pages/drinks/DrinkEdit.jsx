import axios from "../../axios";
import { toast } from "react-toastify";

import { Link, useParams, useNavigate } from "react-router-dom";

import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";
import imageCompression from "browser-image-compression";

const DrinkEdit = () => {
  // fetch the post
  const { id } = useParams();
  const [singleDrink, setSingleDrink] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDrink = async () => {
    try {
      setLoading(true);

      let checkParam = id;
      const response = await axios.get("/drinks/specific/" + checkParam);
      if (response) {
        setLoading(false);
        setSingleDrink([response.data]);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching Product.");
      toast.error("Network error or doesn't exist");
    }
  };

  useEffect(() => {
    fetchDrink();
  }, []);

  // update

  // upload photot to cloudinary
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const postPhoto = async (pic) => {
    if (pic === null || undefined) {
      toast.error("Please select photo");
      return;
    }

    // Compress the image
    const options = {
      maxSizeMB: 1, // Adjust the maximum size of the compressed image
      maxWidthOrHeight: 1920, // Adjust the maximum width or height of the compressed image
      useWebWorker: true, // Use Web Worker for better performance
    };

    try {
      setLoadingPhoto(true);
      const compressedFile = await imageCompression(pic, options);
      const data = new FormData();
      data.append("file", compressedFile);
      data.append("upload_preset", "p2jnu3t2");
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/ddqs3ukux/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setLoadingPhoto(false);
      setImage(urlData.url);
      toast.success("Uploaded Photo", { theme: "dark" });
    } catch (error) {
      setLoadingPhoto(false);
      toast.error("Error uploading Photo", { theme: "dark" });
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(true);

  const [updatetitle, setUpdateTitle] = useState("");
  const [uodateprice, setUpdatePrice] = useState("");
  const [updatedescription, setUpdateDescription] = useState("");
  const [updatecategory, setUpdateCategory] = useState("");
  const [updateimage, setUpdateImage] = useState("");
  const [updatequantity, setUpdateQuantity] = useState(1);
  const [updateavailable, setUpdateAvailable] = useState(true);

  useEffect(() => {
    setTitle(updatetitle);
    setPrice(uodateprice);
    setDescription(updatedescription);
    setCategory(updatecategory);
    setImage(updateimage);
    setQuantity(updatequantity);
    setAvailable(updateavailable);
  }, [updatetitle, updatequantity]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !price ||
      !description ||
      !category ||
      !image ||
      !quantity ||
      !available
    ) {
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
      const response = await axios.put("/drinks/edit/" + id, dataToSend);
      if (response) {
        setLoading(true);
        toast.success("Updated Succesfully");
        navigate("/drinks");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed To Update");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className=" px-[10px] sm:px-[3em] pt-[1em]">
        {/* data */}
        <div>
          {singleDrink?.map((item) => (
            <>
              <h2
                className="font-bold mb-[20px] text-red-600 underline cursor-pointer"
                onClick={() => {
                  setShowForm(true);
                  setUpdateTitle(item.title);
                  setUpdatePrice(item.price);
                  setUpdateDescription(item.description);
                  setUpdateCategory(item.category);
                  setUpdateImage(item.image);
                  setUpdateQuantity(item.quantity);
                  setUpdateAvailable(item.available);
                }}
              >
                Click Here To Update {item.title}
              </h2>
              {showForm && (
                <div key={item._id}>
                  <form
                    className=" w-[98%] sm:w-[80%] md:w-[60%] m-auto"
                    onSubmit={handleUpdate}
                  >
                    <div className="flex flex-col gap-[10px] mb-[20px]">
                      <label htmlFor="title">Update Title</label>
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
                      <label htmlFor="price">Update Price. Just Number</label>
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
                      <label htmlFor="description">
                        Update Drink Description
                      </label>
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
                      <label htmlFor="category">Update Drink Category</label>
                      <select
                        name="category"
                        id="category"
                        className="bg-transparent border border-zinc-500 p-[6px] rounded-lg"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">Choose</option>
                        <option value="fruit">Fruit Drink</option>
                        <option value="soda">Soda</option>
                        <option value="yoghurt">Youghurt</option>
                        <option value="new">New</option>
                        <option value="tasty">Tasty</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-[10px] mb-[20px]">
                      <label htmlFor="quantity">
                        Update Drink Quantity To Be Ordered at a time
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
                      <label htmlFor="available">
                        Update Drink Availability
                      </label>
                      <select
                        name="available"
                        id="available"
                        className="bg-transparent border border-zinc-500 p-[6px] rounded-lg"
                        value={available}
                        onChange={(e) => setAvailable(e.target.value)}
                        required
                      >
                        <option value="">Choose</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>
                    {/* upload image */}
                    <div className="flex flex-col items-start gap-[20px] sm:gap-0 sm:flex-row sm:items-center mt-[20px] mb-[20px]  px-[5px] rounded-lg">
                      <div className="flex flex-col gap-2 mt-[20px]">
                        <label
                          htmlFor="mainPhoto"
                          className="flex items-center gap-[20px] flex-wrap"
                        >
                          <p>Please Select Photo</p>
                          <div className="flex flex-col items-center">
                            {loadingPhoto ? (
                              <Spinner message="uploading ..." />
                            ) : (
                              <img
                                src={
                                  image
                                    ? image
                                    : "https://pixel-share-25.netlify.app/assets/preview-35b286f0.png"
                                }
                                alt=""
                                className="w-[100px] h-[100px] object-cover"
                              />
                            )}
                          </div>
                        </label>
                        <input
                          type="file"
                          placeholder="Add Image"
                          accept="image/*"
                          onChange={(e) => postPhoto(e.target.files[0])}
                          required
                          id="mainPhoto"
                          className="hidden"
                        />
                      </div>
                    </div>
                    <div>
                      {loading ? (
                        <div>
                          {" "}
                          <Spinner message="Updating ..." />{" "}
                        </div>
                      ) : (
                        <button
                          className="bg-red-800 p-[10px] rounded-lg text-white w-full "
                          onClick={handleUpdate}
                        >
                          Update Drink
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinkEdit;
