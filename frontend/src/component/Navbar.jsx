import React, { useState, useRef, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const stateAuth = useSelector((state) => state.auth);
  const stateSign = useSelector((state) => state.signIn);
  const [clickState, setClickState] = useState(false);
  const fullName = stateSign.data.user.userName;
  const id = stateSign.data.user._id;
  const menuRef = useRef(null);

  function handleOpenLink() {
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join("-") : "";
    const constructedId = id
      ? `${firstName}-${lastName}+${id}`
      : `${firstName}-${id}`;
    const endpoint = `https://porifolio-builder-backend-1.onrender.com/${constructedId}`;
    window.open(endpoint, "_blank");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setClickState(false);
      }
    }

    if (clickState) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickState]);

  function sighOut() {
    localStorage.removeItem("token");
    window.location.href = "/";
    return null; // Return null to prevent the click event from propagating further.
  }

  return (
    <div className="max-w-[100%] mx-auto py-[20px] flex drop-shadow-md border justify-between bg-[white] px-[50px] items-center mb-10">
      <div className="text-[30px]">Portfolio Builder</div>
      {clickState ? (
        <div
          className="max-w-[20%] absolute left-[87%] top-[55px] grid grid-cols-1 gap-3 bg-[white] duration-500 p-7 drop-shadow-md rounded-md border"
          ref={menuRef}
        >
          <div className="font-bold border-b p-2">
            {stateSign.data.user.userName}
          </div>
          <div className="hover:cursor-pointer hover:font-medium" onClick={handleOpenLink}>
            My portfolio
          </div>
          <div className="hover:cursor-pointer hover:font-medium">Profile</div>
          <div
            className="hover:cursor-pointer hover:font-medium"
            onClick={sighOut}
          >
            Sign out
          </div>
        </div>
      ) : null}
      <div
        className="text-2xl hover:cursor-pointer relative"
        onClick={() => setClickState((prev) => !prev)}
      >
        {stateAuth.auth ? (
          <img
            src={stateSign.data.user.avtar}
            alt="userAvtar"
            className="h-[30px] w-[30px] rounded-full"
          />
        ) : (
          <FaRegUserCircle />
        )}
      </div>
    </div>
  );
};

export default Navbar;
