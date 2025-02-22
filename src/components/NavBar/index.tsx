import { useLocation, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../utils/config";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedNav =
    NAV_ITEMS.find((n) => n.url === location.pathname)?.id || "";

  const handleNavItemClick = (navItem: any) => navigate(navItem.url);

  return (
    <div className="flex h-14 items-center justify-between gap-4 overflow-x-auto border border-b bg-slate-100 px-3 py-2 sm:h-16 sm:px-5 sm:py-3">
      <div className="whitespace-nowrap text-2xl font-extrabold">
        Shipping Box
      </div>
      <div className="mr-5 flex flex-row gap-3 sm:gap-6 md:gap-8">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`cursor-pointer whitespace-nowrap rounded-md px-2 py-[2px] underline ${item.id === selectedNav ? "bg-blue-200" : "bg-slate-200"}`}
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
