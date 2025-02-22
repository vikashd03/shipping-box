import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddShippingBox from "./pages/AddShippingBox";
import ShippingList from "./pages/ShippingList";
import NavBar from "./components/NavBar";
import { useContext, useEffect } from "react";
import { ShippingContext } from "./Context";

function App() {
  const { shippingList } = useContext(ShippingContext);

  useEffect(() => console.log("shippingList -", shippingList), [shippingList]);

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
