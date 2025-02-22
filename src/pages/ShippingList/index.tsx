import React, { JSX, useContext } from "react";
import Table from "../../components/Table";
import { ShippingContext } from "../../Context";
import { ShippingBox } from "../../utils/types";

interface ShippingListColumn {
  key: keyof ShippingBox;
  label: string;
  render?: (value: any) => JSX.Element;
}

const columns: ShippingListColumn[] = [
  { key: "receiverName", label: "Receiver Name" },
  { key: "weight", label: "Weight (Kg)" },
  {
    key: "boxColor",
    label: "Box Color",
    render: (value: string) => (
      <span
        className="inline-block h-7 sm:h-8 w-10 sm:w-20 self-center border border-solid"
        style={{ backgroundColor: `rgb${value}` }}
      />
    ),
  },
  { key: "destinationCountry", label: "Destination Country" },
  {
    key: "cost",
    label: "Cost",
    render: (value: string) => <span>{value ? `${value} INR` : "N/A"}</span>,
  },
];

const ShippingList: React.FC = () => {
  const { shippingList } = useContext(ShippingContext);

  return (
    <div className="m-5 sm:m-7 md:m-10">
      <h1 className="text-2xl font-bold sm:font-extrabold mb-4 sm:mb-8">Shipping Details</h1>
      <Table data={shippingList} columns={columns} />
    </div>
  );
};

export default ShippingList;
