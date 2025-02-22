import { useContext, useState } from "react";
import { ShippingContext } from "../../Context";
import { ShippingBox } from "../../utils/types";
import Dropdown from "../../components/Dropdown";
import ColorPicker from "../../components/ColorPicker";
import { useNavigate } from "react-router-dom";

const defaultShippingBox = {
  receiverName: "",
  weight: 0,
  boxColor: "(255, 255, 255)",
  destinationCountry: "",
  cost: 0,
};

const countryOptions = [
  { label: "Sweden", value: "swedon" },
  { label: "China", value: "china" },
  { label: "Brazil", value: "brazil" },
  { label: "Australia", value: "australia" },
];

const countryCost: { [key in string]: number } = {
  swedon: 7.35,
  china: 11.53,
  brazil: 15.63,
  australia: 50.09,
};

const fieldLabelMap: { [key in string]: string } = {
  receiverName: "Receiver Name",
  weight: "Weight",
  boxColor: "Box Color",
  destinationCountry: "Destination Country",
  cost: "Cost",
};

const AddShippingBox = () => {
  const [shippingBox, setShippingBox] =
    useState<ShippingBox>(defaultShippingBox);
  const { shippingList, setShippingList } = useContext(ShippingContext);
  const [saveErrorMsg, setSaveErrorMsg] = useState("");
  const [weightErroMsg, setWeightErroMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = <K extends keyof ShippingBox>(
    id: K,
    value: ShippingBox[K],
  ) => {
    setSaveErrorMsg("");
    const prevData = { ...shippingBox };
    prevData[id] = value;

    switch (id) {
      case "destinationCountry":
        prevData["cost"] = countryCost[value as string];
        break;
      case "weight":
        if (!/^-?\d*$/.test(value.toString())) {
          setWeightErroMsg("Enter Valid Number");
          prevData["weight"] = 0;
        } else {
          setWeightErroMsg("");
        }
    }

    setShippingBox(prevData);
  };

  const handleSave = () => {
    const emptyFields = Object.keys(shippingBox).filter(
      (key) => key !== "cost" && !shippingBox[key as keyof ShippingBox],
    );
    if (emptyFields.length > 0) {
      setSaveErrorMsg(
        emptyFields.map((field) => fieldLabelMap[field]).join("/ ") +
          " can't be empty",
      );
      return;
    }
    const prevData = [...shippingList];
    prevData.push(shippingBox);
    setShippingList(prevData);
    setTimeout(() => navigate("/shipping/list"), 100);
  };

  return (
    <div className="m-5 sm:m-7 md:m-10">
      <div className="text-2xl font-extrabold">Add Shipping Box</div>
      <div className="mt-8 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <label className="w-[120px] sm:w-[200px] text-lg font-medium">
            {fieldLabelMap["receiverName"]}:
          </label>
          <input
            type="text"
            name="receiverName"
            className="border-300 rounded border px-3 py-2 text-base placeholder-shown:text-base w-[200px] sm:w-[300px]"
            placeholder="Enter receiver's name"
            value={shippingBox.receiverName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("receiverName", e.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-[120px] sm:w-[200px] text-lg font-medium">
            {fieldLabelMap["weight"]}:
          </label>
          <input
            type="text"
            name="weight"
            className="border-300 w-28 rounded border px-3 py-2 text-base placeholder-shown:text-base"
            placeholder="Enter Weight"
            value={shippingBox.weight.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("weight", Number(e.target.value))
            }
          />
          <span>Kg</span>
          {weightErroMsg && (
            <span className="text-red-400">{weightErroMsg}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label className="w-[120px] sm:w-[200px] text-lg font-medium">
            {fieldLabelMap["boxColor"]}:
          </label>
          <ColorPicker
            value={shippingBox.boxColor}
            onChange={(value: string) => handleChange("boxColor", value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-[120px] sm:w-[200px] text-lg font-medium">
            {fieldLabelMap["destinationCountry"]}:
          </label>
          <Dropdown
            width={200}
            value={shippingBox.destinationCountry}
            placeHolder="Select Country"
            options={countryOptions}
            onChange={(value: string) =>
              handleChange("destinationCountry", value)
            }
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-[120px] sm:w-[200px] text-lg font-medium">
            {fieldLabelMap["cost"]}
          </label>
          <span>{shippingBox.cost} INR</span>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="mt-10 cursor-pointer rounded-lg border-2 border-solid bg-slate-100 px-8 py-2 text-xl font-bold hover:border-blue-500 focus:outline-none"
      >
        Save
      </button>
      {saveErrorMsg && (
        <span className="ml-3 text-red-400 block sm:inline">{saveErrorMsg}</span>
      )}
    </div>
  );
};

export default AddShippingBox;
