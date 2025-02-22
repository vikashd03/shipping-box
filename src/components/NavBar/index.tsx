import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../utils/config";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavItemClick = (navItem: any) => {
    navigate(navItem.url);
  };

  return (
    <div className="h-14 sm:h-16 flex gap-4 items-center justify-between border-b border px-3 sm:px-5 py-5 bg-slate-100 overflow-x-auto">
      <div className="text-2xl font-extrabold whitespace-nowrap">Shipping Box</div>
      <div className="flex flex-row gap-3 sm:gap-6 md:gap-8 mr-5">
        {NAV_ITEMS.map((item, index) => (
          <button
            key={index}
            className="underline cursor-pointer bg-blue-200 px-2 py-[2px] rounded-md whitespace-nowrap"
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
