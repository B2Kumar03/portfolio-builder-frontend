import logo from "./logo.svg";
import "./App.css";
import Allroutes from "./allroute/Allroutes.jsx";
import Sidenavbar from "./component/Sidenavbar.jsx";
import Navbar from "./component/Navbar.jsx";
import { Sign } from "./component/Sign.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { loading } from "./redux/Loading/actionCreator.js";
import { addData } from "./redux/SignInData/actionCreator.js";
import { updataAuth } from "./redux/auth/actionCreator.js";
import { Flex, Spinner } from "@chakra-ui/react";

function App() {
  const stateAuth = useSelector((state) => state.auth);
  const stateLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  async function signData() {
    dispatch(loading());
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const { data } = await axios.get(
        "https://porifolio-builder-backend-1.onrender.com/api/v1/users/getuser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updataAuth());
      dispatch(addData(data));
      dispatch(loading());
    } catch (error) {
      dispatch(loading());
      console.log(error);
    }
  }
  useEffect(() => {
    signData();
  }, []);

  if (stateLoading.isLoading) {
   return <Flex justify="center" align="center" height="100vh">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Flex>

  }

  return (
    <>
      {!stateAuth.auth ? (
        <Sign />
      ) : (
        <>
          <container>
            <Navbar />
          </container>
          <div className="max-w-[1320px] grid  sm:grid-cols-3 grid-cols-1 sm:mx-auto gap-10 ">
            <container>
              <Sidenavbar />
            </container>
            <container className="sm:col-span-2">
              <Allroutes />
            </container>
          </div>
        </>
      )}
    </>
  );
}

export default App;
