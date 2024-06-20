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
    <div class="max-w-[1320px] grid grid-cols-2 mx-auto ">
      
      <container>
      <Sidenavbar />
      </container>
      <container>
      <Allroutes />
      </container>
    </div>
    </>
  );
}

export default App;
