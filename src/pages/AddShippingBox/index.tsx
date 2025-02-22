import { useContext, useState } from "react";
import { ShippingContext } from "../../Context";
import { ShippingBox } from "../../utils/types";
import Dropdown from "../../components/Dropdown";
import ColorPicker from "../../components/ColorPicker";
import { useNavigate } from "react-router-dom";

const defaultShippingBox = {
  receiverName: "",
  weight: 0,
  boxColor: "(50, 150, 250)",
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
      <div className="text-2xl font-bold sm:font-extrabold">Add Shipping Box</div>
      <div className="mt-5 sm:mt-8 flex flex-col gap-3 sm:gap-5">
        <div className="flex items-center gap-2 sm:gap-4">
          <label className="w-[120px] sm:w-[200px] text-md sm:text-lg font-normal sm:font-medium">
            {fieldLabelMap["receiverName"]}:
          </label>
          <input
            type="text"
            name="receiverName"
            className="border-300 rounded border px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base placeholder-shown:text-sm sm:placeholder-shown:text-base w-[180px] sm:w-[300px]"
            placeholder="Enter Receiver's name..."
            value={shippingBox.receiverName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("receiverName", e.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <label className="w-[120px] sm:w-[200px] text-md sm:text-lg font-normal sm:font-medium">
            {fieldLabelMap["weight"]}:
          </label>
          <input
            type="text"
            name="weight"
            className="border-300 rounded border px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base placeholder-shown:text-sm sm:placeholder-shown:text-base w-[120px] sm:wi-[150px]"
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
        <div className="flex items-center gap-2 sm:gap-4">
          <label className="w-[120px] sm:w-[200px] text-md sm:text-lg font-normal sm:font-medium">
            {fieldLabelMap["boxColor"]}:
          </label>
          <ColorPicker
            value={shippingBox.boxColor}
            onChange={(value: string) => handleChange("boxColor", value)}
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <label className="w-[120px] sm:w-[200px] text-md sm:text-lg font-normal sm:font-medium">
            {fieldLabelMap["destinationCountry"]}:
          </label>
          <Dropdown
            wclassName="w-[160px] sm:w-[200px]"
            hclassName="h-[30px] sm:h-[40px]"
            value={shippingBox.destinationCountry}
            placeHolder="Select Country..."
            options={countryOptions}
            onChange={(value: string) =>
              handleChange("destinationCountry", value)
            }
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <label className="w-[120px] sm:w-[200px] text-md sm:text-lg font-normal sm:font-medium">
            {fieldLabelMap["cost"]}:
          </label>
          <span>{shippingBox.cost} INR</span>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="mt-7 sm:mt-10 cursor-pointer rounded-lg border sm:border-2 border-solid border-black bg-slate-100 px-4 py-1 sm:px-8 sm:py-2 text-blue-500 text-base sm:text-xl font-semibold sm:font-bold hover:border-blue-500 focus:outline-none"
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
