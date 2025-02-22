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
        className="inline-block h-10 w-20 self-center border border-solid"
        style={{ backgroundColor: `rgb${value}` }}
      />
    ),
  },
  { key: "destinationCountry", label: "Destination" },
  {
    key: "cost",
    label: "Cost",
    render: (value: string) => <span>{value ? `${value} INR` : "N/A"}</span>,
  },
];

const ShippingList: React.FC = () => {
  const { shippingList } = useContext(ShippingContext);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Shipping Details</h1>
      <Table data={shippingList} columns={columns} />
    </div>
  );
};

export default ShippingList;
