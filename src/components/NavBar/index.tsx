import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../utils/config";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavItemClick = (navItem: any) => {
    navigate(navItem.url);
  };

  return (
    <div className="flex h-16 items-center justify-between border-b border px-5 py-5 bg-slate-100">
      <div className="text-2xl font-extrabold">Shipping Box</div>
      <div className="flex flex-row gap-6 mr-5">
        {NAV_ITEMS.map((item, index) => (
          <button
            key={index}
            className="underline cursor-pointer bg-blue-200 px-2 py-[2px] rounded-md"
            onClick={() => handleNavItemClick(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
