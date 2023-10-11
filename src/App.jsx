import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import SpecificOrder from "./pages/SpecificOrder";
import Create from "./pages/food/Create";
import Food from "./pages/food/Food";
import Edit from "./pages/food/Edit";
import Drinks from "./pages/drinks/Drinks";
import DrinkCreate from "./pages/drinks/DrinkCreate";
import DrinkEdit from "./pages/drinks/DrinkEdit";
import Users from "./pages/Users";
import SendUs from "./pages/SendUs";
import Charges from "./pages/Charges";
import Feddback from "./pages/Feddback";
import Receipts from "./pages/Receipts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/order/:id" element={<SpecificOrder />} />
          <Route path="/send-us" element={<SendUs />} />
          <Route path="/feedback" element={<Feddback />} />
          {/* food routes */}
          <Route path="/food" element={<Food />} />
          <Route path="/food-create" element={<Create />} />
          <Route path="/food-edit/:id" element={<Edit />} />
          {/* drinks routes */}
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/drinks-create" element={<DrinkCreate />} />
          <Route path="/drinks-edit/:id" element={<DrinkEdit />} />

          <Route path="/users" element={<Users />} />
          <Route path="/charges" element={<Charges />} />
          <Route path="/receipts" element={<Receipts />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
