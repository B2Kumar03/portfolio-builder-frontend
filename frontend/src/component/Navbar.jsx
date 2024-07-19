import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const stateAuth = useSelector((state) => state.auth);
  const stateSign = useSelector((state) => state.signIn);
  const [clickState, setClickState] = useState(false);
  console.log(stateSign.data.user);
  function sighOut() {
    localStorage.removeItem("token");
    window.location.href = "/";
    return null; // Return null to prevent the click event from propagating further.  This is a common pattern for handling logout actions.  In a real-world application, you might want to redirect to a login page.  But for this simple example, we'll just return null.  The state change will trigger a re-render, and the click event will be handled correctly.  Note: This is not a secure way to handle logout.  In a real-world application, you would want to use a backend API to send a request to log the user out, and then remove the user's token from the client-side.  Also, this example does not handle the case where the user is not authenticated.  In a real-world application, you would want to add error handling to the sighOut function
  }
  return (
    <div class="max-w-[100%] mx-auto py-[20px] flex  drop-shadow-md border justify-between bg-[white] px-[50px] items-center mb-10">
      <div class="text-[30px] ">Portfolio Builder</div>
      {clickState ? (
        <div className="max-w-[20%] absolute left-[87%] top-[55px] grid grid-cols-1 gap-3 bg-[white] duration-500  p-7 drop-shadow-md rounded-md border">
          <div className="font-bold border-b p-2">Bittu Kumar</div>
          <div className="hover:cursor-pointer hover:font-medium">
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
        class="text-2xl hover:cursor-pointer relative"
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
