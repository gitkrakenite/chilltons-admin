import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";

const Charges = () => {
  const breakpointColumnsObj = {
    default: 4,
    3000: 5,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1,
  };
  return (
    <div className="w-full h-full px-[8px] sm:px-[2em] lg:px-[3em] xl:px-[5em]">
      {/*  */}
      <div className="my-[20px]">
        <Link to="/">
          <AiOutlineArrowLeft className="text-2xl" />
        </Link>
      </div>
      <h2 className="my-[10px]">Our Delivery Fee Pricing. Based on Distance</h2>
      {/* wrapper */}
      <div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid "
          columnClassName="my-masonry-grid_column"
        >
          <div className="border border-zinc-300 p-1 mb-3">
            <h2 className="mb-4 font-bold">Vendor : Food Palace</h2>
            <ul>
              <li className="mb-2">
                <p>To Heri Homes, OC, Monique, Muthaiga</p>
                <p>Ksh. 20</p>
              </li>
              <li>
                <p>To inside campus and the rest up to Mexico</p>
                <p>Ksh. 40</p>
              </li>
              <li>
                <p></p>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="border border-zinc-300 p-1 mb-3">
            <h2 className="mb-4 font-bold">Vendor : School Cafeteria</h2>
            <ul>
              <li className="mb-2">
                <p>To inside campus</p>
                <p>Ksh. 20</p>
              </li>
              <li>
                <p>The rest up to Mexico</p>
                <p>Ksh. 40</p>
              </li>
              <li>
                <p></p>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="border border-zinc-300 p-1 mb-3">
            <h2 className="mb-4 font-bold">Vendor : Chilltons</h2>
            <ul>
              <li className="mb-2">
                <p>To inside campus</p>
                <p>Ksh. 20</p>
              </li>
              <li>
                <p>The rest up to Mexico</p>
                <p>Ksh. 40</p>
              </li>
              <li>
                <p></p>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="border border-zinc-300 p-1 mb-3">
            <h2 className="mb-4 font-bold">Vendor : Kioko</h2>
            <ul>
              <li className="mb-2">
                <p>To inside campus</p>
                <p>Ksh. 20</p>
              </li>
              <li className="mb-2">
                <p>To OC, Heri, Muthaiga</p>
                <p>Ksh. 30</p>
              </li>
              <li>
                <p>The rest up to Mexico</p>
                <p>Ksh. 40</p>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="border border-zinc-300 p-1 mb-3">
            <h2 className="mb-4 font-bold">Vendor : Dowells</h2>
            <ul>
              <li className="mb-2">
                <p>To OC, Heri, Monique, Sterling Muthaiga</p>
                <p>Ksh. 20</p>
              </li>
              <li className="mb-2">
                <p>To inside campus</p>
                <p>Ksh. 40</p>
              </li>
              <li>
                <p>The rest up to Mexico</p>
                <p>Ksh. 40</p>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="border border-zinc-300 p-1 mb-3">
            <h2 className="mb-4 font-bold">Vendor : Supa Fries</h2>
            <ul>
              <li className="mb-2">
                <p>To inside campus</p>
                <p>Ksh. 20</p>
              </li>
              <li className="mb-2">
                <p>To OC, Heri, Monique, Sterling Muthaiga</p>
                <p>Ksh. 30</p>
              </li>

              <li>
                <p>The rest up to Mexico</p>
                <p>Ksh. 40</p>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="border border-zinc-300 p-1 mb-3">
            <h2 className="mb-4 font-bold">Vendor : Njuguna</h2>
            <ul>
              <li className="mb-2">
                <p>To OC, Heri, Monique, Sterling Muthaiga</p>
                <p>Ksh. 20</p>
              </li>
              <li className="mb-2">
                <p>To inside campus</p>
                <p>Ksh. 30</p>
              </li>
              <li>
                <p>The rest up to Mexico</p>
                <p>Ksh. 40</p>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="border border-zinc-300 p-1 mb-3">
            <h2 className="mb-4 font-bold">Vendor : J&S</h2>
            <ul>
              <li className="mb-2">
                <p>To inside campus</p>
                <p>Ksh. 20</p>
              </li>
              <li className="mb-2">
                <p>To OC, Heri, Monique, Sterling Muthaiga</p>
                <p>Ksh. 30</p>
              </li>

              <li>
                <p>The rest up to Mexico</p>
                <p>Ksh. 40</p>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="border border-zinc-300 p-1 mb-3">
            <h2 className="mb-4 font-bold">Vendor : Shawarma Hub</h2>
            <ul>
              <li className="mb-2">
                <p>To Heri Homes, OC, Monique, Muthaiga</p>
                <p>Ksh. 20</p>
              </li>
              <li className="mb-2">
                <p>To inside campus and the rest up to Mexico</p>
                <p>Ksh. 40</p>
              </li>
              <li>
                <p></p>
              </li>
            </ul>
          </div>
          {/*  */}
        </Masonry>
      </div>
    </div>
  );
};

export default Charges;
