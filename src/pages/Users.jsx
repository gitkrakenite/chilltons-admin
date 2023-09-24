import {
  AiOutlineArrowUp,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineSearch,
} from "react-icons/ai";

import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
// import "../masonry.css";

import { BsPen, BsTrashFill, BsTrash } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import logo from "../assets/chlogo.png";
import { toast } from "react-toastify";
import axios from "../axios";
import Spinner from "../components/Spinner";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users/all");
      if (response) {
        setLoading(false);
        setAllUsers(response.data);
        //   console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching users");
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    3000: 5,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1,
  };

  //   pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allUsers?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allUsers?.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(4);

  const handleClick = (number) => {
    setStart(number);
    setEnd(number + 3);
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handleClick(currentPage);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
      handleClick(currentPage);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

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
        const searchResults = allUsers?.filter(
          (item) =>
            item.username.toLowerCase().includes(searchText.toLowerCase()) ||
            item.phone.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  // scroll to top functionality
  const [showArrow, setShowArrow] = useState(false);

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

  const handleDelete = async (id) => {
    // alert(id);
    let isConform = confirm("Delete this User ? ");
    if (isConform) {
      try {
        const response = await axios.delete("/users/delete/" + id);
        if (response) {
          toast.success("Deleted Succesfully");
          handleFetchUsers();
        }
      } catch (error) {
        toast.error("Failed To Delete");
      }
    }
  };

  //   handleUpdate
  const [isPaid, setIsPaid] = useState("nope");

  const handleUpdate = async (id) => {
    // e.preventDefault();
    if (!isPaid) {
      return toast.error("Please Enter value");
    }
    try {
      let dataToSend = { isPaid };
      const response = await axios.put("/users/update/" + id, dataToSend);
      if (response) {
        toast.success("Updated Succesfully");
      }
    } catch (error) {
      toast.error("Failed To Update");
    }
  };

  return (
    <div>
      {/* arrow to scroll to top */}

      {showArrow && (
        <div
          className="fixed bottom-20 right-4 text-3xl z-[999] cursor-pointer bg-red-700 text-zinc-50 rounded-full p-[5px]"
          onClick={handleScrollTop}
        >
          <AiOutlineArrowUp />
        </div>
      )}

      {/* logo and options */}

      {!searchText && (
        <div className="flex justify-between items-center px-1 sm:px-2">
          <div>
            <img src={logo} alt="" className="w-16 h-16" />
          </div>
          <div className="flex gap-[20px] items-center">
            <Link to="/drinks">
              <p>DRINKS</p>
            </Link>
            <Link to="/">
              <p>ORDERS</p>
            </Link>
            <Link to="/food">
              <p>FOOD</p>
            </Link>
          </div>
        </div>
      )}

      {/* search bar & categories */}
      <div className=" w-full mt-[1em]">
        {/* searchbar */}
        <div className="w-full flex justify-center">
          <form className=" w-[98%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] bg-zinc-300 flex gap-[5px] items-center p-[8px] rounded-xl">
            <AiOutlineSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search For Users"
              className="bg-transparent outline-none w-full "
              required
              // maxLength={15}
              // minLength={2}
              value={searchText}
              onChange={handleSearchChange}
            />
          </form>
        </div>
        {/* categories */}
      </div>

      {/* wrapper */}

      <div>
        {/* pagination */}
        {!searchText && (
          <nav className="flex justify-center">
            <ul className="flex gap-[2em] mt-[10px] px-[5px] py-[10px] items-center ">
              {/* map */}

              <>
                <li>
                  <a href="#" onClick={prevPage} className="text-zinc-800">
                    <p className="text-zinc-500 font-bold hover:text-zinc-900">
                      Prev
                    </p>
                  </a>
                </li>
                <li className="flex gap-[10px] ">
                  {numbers.slice(start - 1, end).map((item, index) => (
                    <li
                      key={index}
                      className={`normal-nav ${
                        currentPage === item && "active-nav"
                      }`}
                    >
                      <a
                        href="#"
                        onClick={() => {
                          handleClick(item);
                          changeCurrentPage(item);
                        }}
                      >
                        <p className="">{item}</p>
                      </a>
                    </li>
                  ))}
                </li>

                <li>
                  <a href="#" onClick={nextPage}>
                    <p className="text-zinc-500 font-bold hover:text-zinc-900">
                      Next
                    </p>
                  </a>
                </li>
              </>
            </ul>
          </nav>
        )}
        {/* food */}
        <div>
          <p className="text-end font-bold pr-2">
            You have {allUsers?.length} users
          </p>
        </div>
        <div className="px-[10px]">
          {searchText ? (
            <>
              <div className="mb-[15px] text-zinc-400">
                {searchText && <p>Results For : {searchText}</p>}
              </div>

              {searchedResults?.length > 0 ? (
                <div>
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid "
                    columnClassName="my-masonry-grid_column"
                  >
                    {searchedResults?.map((item) => (
                      <div
                        key={item._id}
                        className="flex-shrink-0 mb-3 bg-zinc-200 p-2 rounded-lg mt-5"
                      >
                        <div className="flex justify-center">
                          <AiOutlineUser className="text-2xl" />
                        </div>

                        <div className="flex justify-between mb-[10px]">
                          <p>{item.username}</p>
                          <p>{item.phone}</p>
                        </div>

                        <p>{item.isPaid == "yes" ? "admin" : "standard"}</p>
                        {/* options */}
                        <div className="mt-[1em]">
                          {/* change to admin */}
                          <form className=" flex justify-between items-center">
                            <p>Switch Admin Priviledges</p>
                            <select
                              name=""
                              id=""
                              className="p-1"
                              value={isPaid}
                              onChange={(e) => setIsPaid(e.target.value)}
                            >
                              <option value="yes">Yes</option>
                              <option value="nope">No</option>
                            </select>
                            <button
                              className="bg-teal-800 text-white px-2 py-1 rounded-md"
                              onClick={() => handleUpdate(item._id)}
                            >
                              Change
                            </button>
                          </form>
                          {/* delete user */}
                          {/* <div className=" mt-[1em] text-red-500 cursor-pointer">
                            <BsTrash
                              className="text-xl"
                              onClick={() => handleDelete(item._id)}
                            />
                          </div> */}
                        </div>
                      </div>
                    ))}
                  </Masonry>
                </div>
              ) : (
                <div className="w-full h-[65vh] flex justify-between items-center">
                  <p className="text-center w-full justify-center flex">
                    😥No results for :
                    <span className="text-red-600">{searchText}</span>
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <div className="mt-[8em]">
                  <Spinner message="Fetching ..." />
                </div>
              ) : (
                <>
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid "
                    columnClassName="my-masonry-grid_column"
                  >
                    {records?.map((item) => (
                      <div
                        key={item._id}
                        className="flex-shrink-0 mb-3 bg-zinc-200 p-2 rounded-lg mt-5"
                      >
                        <div className="flex justify-center">
                          <AiOutlineUser className="text-2xl" />
                        </div>
                        <div className="flex justify-between mb-[10px]">
                          <p>{item.username}</p>
                          <p>{item.phone}</p>
                        </div>
                        <p>{item.isPaid == "yes" ? "admin" : "standard"}</p>
                        {/* options */}
                        <div className="mt-[1em]">
                          {/* change to admin */}
                          <form className=" flex justify-between items-center">
                            <p>Switch Admin Priviledges</p>
                            <select
                              name=""
                              id=""
                              className="p-1"
                              value={isPaid}
                              onChange={(e) => setIsPaid(e.target.value)}
                            >
                              <option value="yes">Yes</option>
                              <option value="nope">No</option>
                            </select>
                            <button
                              className="bg-teal-800 text-white px-2 py-1 rounded-md"
                              onClick={() => handleUpdate(item._id)}
                            >
                              Change
                            </button>
                          </form>
                          {/* delete user */}
                          {/* <div className=" mt-[1em] text-red-500 cursor-pointer">
                            <BsTrash
                              className="text-xl"
                              onClick={() => handleDelete(item._id)}
                            />
                          </div> */}
                        </div>
                      </div>
                    ))}
                  </Masonry>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* end wrapper */}
    </div>
  );
};

export default Users;
