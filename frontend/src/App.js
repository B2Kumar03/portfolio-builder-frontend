import logo from "./logo.svg";
import "./App.css";
import Allroutes from "./allroute/Allroutes.jsx"
import Sidenavbar from "./component/Sidenavbar.jsx";
import Navbar from "./component/Navbar.jsx";

function App() {
  return (
    <>
    <container>
      <Navbar />
      </container>
    <div class="max-w-[1320px] grid  sm:grid-cols-3 grid-cols-1 sm:mx-auto gap-10 ">
      
      <container >
      <Sidenavbar />
      </container>
      <container class="sm:col-span-2">
      <Allroutes />
      </container>
    </div>
    </>
  );
}

export default App;
