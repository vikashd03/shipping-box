import { createContext, ReactNode, useEffect, useState } from "react";
import { ShippingBox, ShippingContextDefault } from "./utils/types";
import React from "react";

export const defaultState: ShippingContextDefault = {
  shippingList: [],
  setShippingList: () => null,
};

export const ShippingContext = createContext(defaultState);

interface ShippingProviderProps {
  children: ReactNode;
}

const getStoredShippingList = () => {
  let storedShippingList = [];
  try {
    storedShippingList = JSON.parse(
      localStorage.getItem("shipping-list") || "",
    );
  } catch (err) {
    console.log("error getting shpping list from local storage");
  }
  return storedShippingList;
};

export const ShippingProvider: React.FC<ShippingProviderProps> = ({
  children,
}) => {
  const [shippingList, setShippingList] = useState<ShippingBox[]>(
    getStoredShippingList(),
  );

  useEffect(
    () => localStorage.setItem("shipping-list", JSON.stringify(shippingList)),
    [shippingList],
  );

  return (
    <ShippingContext.Provider value={{ shippingList, setShippingList }}>
      {children}
    </ShippingContext.Provider>
  );
};
