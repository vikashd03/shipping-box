import { Route, Routes } from "react-router-dom";
import AddShippingBox from "./pages/AddShippingBox";
import ShippingList from "./pages/ShippingList";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <div className="flex h-screen w-full flex-col">
      <NavBar />
      <div className="h-full flex-auto overflow-y-auto">
        <Routes>
          <Route path="/shipping/add" element={<AddShippingBox />} />
          <Route path="/shipping/list" element={<ShippingList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
