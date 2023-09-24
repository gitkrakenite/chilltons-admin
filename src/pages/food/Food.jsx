import {
  AiOutlineArrowUp,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useEffect, useState } from "react";
import "../masonry.css";

import { BsPen, BsTrashFill } from "react-icons/bs";
import logo from "../../assets/chlogo.png";
import { toast } from "react-toastify";
import axios from "../../axios";
import Spinner from "../../components/Spinner";

const Food = () => {
  const [allFood, setAllFood] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchFood = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/food/all");
      if (response) {
        setLoading(false);
        setAllFood(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Fetching Food");
    }
  };

  useEffect(() => {
    handleFetchFood();
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
  const records = allFood?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allFood?.length / recordsPerPage);
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
        const searchResults = allFood?.filter(
          (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.category.toLowerCase().includes(searchText.toLowerCase()) ||
            item.vendor.toLowerCase().includes(searchText.toLowerCase())
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
    let isConform = confirm("Delete this product ? ");
    if (isConform) {
      try {
        const response = await axios.delete("/food/delete/" + id);
        if (response) {
          toast.success("Deleted Succesfully");
          handleFetchFood();
        }
      } catch (error) {
        toast.error("Failed To Delete");
      }
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
        <div className="flex justify-between items-center px-1 sm:px-2 gap-3 flex-wrap">
          <div>
            <img src={logo} alt="" className="w-16 h-16" />
          </div>
          <div className="flex gap-[20px] items-center ">
            <Link to="/drinks">
              <p>DRINKS</p>
            </Link>
            <Link to="/">
              <p>ORDERS</p>
            </Link>
            <Link to="/food-create">
              <p>CREATE</p>
            </Link>
            <Link to="/users">
              <p>USERS</p>
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
              placeholder="Search For Food"
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
                      <div key={item._id} className="flex-shrink-0 mb-3">
                        <div className="relative rounded-lg group ">
                          <div className="overlay absolute inset-0 flex items-center justify-center opacity-100">
                            <div
                              className="bg-gradient-to-t
                                  from-transparent to-black opacity-75 w-full h-full rounded-md"
                            >
                              {/* top stats */}
                              <div>
                                <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                                  <div>
                                    <p className="text-white">{item.title}</p>
                                  </div>
                                  <div className="flex gap-[20px]">
                                    <p className="text-white text-md flex items-center gap-[5px]">
                                      <AiOutlineLike className="text-lg" />
                                      <span>{item.likes?.length}</span>
                                    </p>
                                    <p className="text-white text-md flex items-center gap-[5px]">
                                      <AiOutlineComment className="text-lg" />
                                      <span>{item.comments?.length}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/*  */}
                            </div>
                          </div>

                          <img
                            src={item.image}
                            alt=""
                            className=" rounded-lg"
                          />

                          <div className="flex justify-between items-center mt-[10px]">
                            <div className="flex gap-[20px] text-red-500">
                              <p className="text-zinc-800">Ksh.{item.price}</p>
                              <p>{item.vendor}</p>
                            </div>

                            <div className="text-zinc-800 flex items-center gap-[2em] z-10">
                              <Link to={`/food-edit/${item._id}`}>
                                <BsPen className="bg-teal-800 text-white p-2 rounded-lg text-3xl" />
                              </Link>

                              <BsTrashFill
                                className="bg-red-800 text-white p-2 rounded-lg text-3xl cursor-pointer"
                                title="delete food"
                                onClick={() => handleDelete(item._id)}
                              />
                            </div>
                          </div>
                        </div>
                        {/*  */}
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
                      <div key={item._id} className="flex-shrink-0 mb-3">
                        <div className="relative rounded-lg group ">
                          <div className="overlay absolute inset-0 flex items-center justify-center opacity-100">
                            <div
                              className="bg-gradient-to-t
                                    from-transparent to-black opacity-75 w-full h-full rounded-md"
                            >
                              {/* top stats */}
                              <div>
                                <div className="absolute top-[20px] flex gap-[10%]  w-full justify-between px-2 ">
                                  <div>
                                    <p className="text-white">{item.title}</p>
                                  </div>
                                  <div className="flex gap-[20px]">
                                    <p className="text-white text-md flex items-center gap-[5px]">
                                      <AiOutlineLike className="text-lg" />
                                      <span>{item.likes?.length}</span>
                                    </p>
                                    <p className="text-white text-md flex items-center gap-[5px]">
                                      <AiOutlineComment className="text-lg" />
                                      <span>{item.comments?.length}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/*  */}
                            </div>
                          </div>

                          <img
                            src={item.image}
                            alt=""
                            className=" rounded-lg"
                          />

                          <div className="flex justify-between items-center mt-[10px]">
                            <div className="flex gap-[20px] text-red-500">
                              <p className="text-zinc-800">Ksh.{item.price}</p>
                              <p>{item.vendor}</p>
                            </div>

                            <div className="text-zinc-800 flex items-center gap-[2em] z-10">
                              <Link to={`/food-edit/${item._id}`}>
                                <BsPen className="bg-teal-800 text-white p-2 rounded-lg text-3xl" />
                              </Link>

                              <BsTrashFill
                                className="bg-red-800 text-white p-2 rounded-lg text-3xl cursor-pointer"
                                title="delete food"
                                onClick={() => handleDelete(item._id)}
                              />
                            </div>
                          </div>
                        </div>
                        {/*  */}
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

export default Food;
