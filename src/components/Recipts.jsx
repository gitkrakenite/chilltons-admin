import { useState } from "react";
import axios from "../axios";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Recipts = ({ customer, delivery }) => {
  const [foodItems, setFoodItems] = useState([{ foodName: "", price: 0 }]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [containerFee, setcontainerFee] = useState(0);
  // const [customerName, setCustomerName] = useState("");
  // const [deliveryAddress, setDeliveryAddress] = useState("");
  // const [creatot, setDeliveryAddress] = useState("");

  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const handleFoodItemChange = (index, event) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index][event.target.name] = event.target.value;
    setFoodItems(updatedFoodItems);
  };

  const addFoodItem = () => {
    setFoodItems([...foodItems, { foodName: "", price: 0 }]);
  };

  //   username, food items and prices, containerFee, deliveryFee, totalFee

  const [cumPrice, setCumPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!containerFee) return toast.error("Container fee missing");
    if (!deliveryFee) return toast.error("Delivery fee missing");

    // first of all calculate totalPrice
    let totalPrice = parseFloat(containerFee) + parseFloat(deliveryFee);
    // Iterate through foodItems and add each food item's price to the total price
    for (const foodItem of foodItems) {
      // Assuming there's a 'price' key in each food item
      if (foodItem.price) {
        totalPrice += parseFloat(foodItem.price);
        setCumPrice(totalPrice);
      }
    }

    // Here, you can send the form data to your server for order creation
    const orderData = {
      customerName: customer,
      deliveryAddress: delivery,
      foodItems,
      containerFee: parseFloat(containerFee),
      deliveryFee: parseFloat(deliveryFee),
      creator: user?.username,
      totalPrice,
    };
    console.log(orderData);

    // Send the orderData to your server using Axios or another HTTP library

    try {
      const response = await axios.post("/receipts", orderData);
      if (response) {
        setLoading(false);
        toast.success("receipt generated");
        navigate("/");
        // console.log(response.data);
        console.log(response.data);
        // calculateTotalFoodPrice(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("failed to generate");
    }
  };

  return (
    <div>
      <h2 className="mb-[10px] font-bold">Generate receipt for {customer}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-[20px]">
          {foodItems.map((foodItem, index) => (
            <div key={index}>
              <input
                type="text"
                name="foodName"
                placeholder="Food Name"
                className="border border-zinc-700 mb-[3px] p-1 rounded-md"
                value={foodItem.foodName}
                onChange={(e) => handleFoodItemChange(index, e)}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="border border-zinc-700 mb-[3px] p-1 rounded-md"
                value={foodItem.price}
                onChange={(e) => handleFoodItemChange(index, e)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addFoodItem}
            className="mt-[14px] bg-red-500 text-white"
          >
            Add Food Item
          </button>
        </div>
        {/* other details */}
        <div className="flex flex-col gap-3">
          <div className="mb-[10px] flex flex-col gap-[5px] ">
            <div className="flex flex-col gap-2">
              <label htmlFor="deliveryFee">Enter Delivery Fee</label>
              <input
                type="number"
                name="deliveryFee"
                id="deliveryFee"
                placeholder="Delivery Fee"
                className="border border-zinc-700 mb-[3px] p-1 rounded-md"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="containerFee">Container Fee</label>
              <input
                type="number"
                name="containerFee"
                id="containerFee"
                placeholder="Container Fee"
                className="border border-zinc-700 mb-[3px] p-1 rounded-md"
                value={containerFee}
                onChange={(e) => setcontainerFee(e.target.value)}
              />
            </div>
            {/* <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              type="text"
              name="deliveryAddress"
              placeholder="Delivery Address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            /> */}
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <button type="submit" className="bg-teal-700 text-white p-1">
              Generate
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Recipts;
