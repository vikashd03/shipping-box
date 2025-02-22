import React from "react";

export interface ShippingBox {
  receiverName: string;
  weight: number;
  boxColor: string;
  destinationCountry: string;
  cost: number;
}

export interface ShippingContextDefault {
  shippingList: ShippingBox[];
  setShippingList: React.Dispatch<React.SetStateAction<ShippingBox[]>>;
}
