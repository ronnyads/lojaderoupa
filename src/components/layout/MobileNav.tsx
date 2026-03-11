import { Link, useLocation } from "react-router-dom";
import { Home, Camera, Flame, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Camera, label: "Looks", path: "/looks" },
  { icon: Flame, label: "DROP", path: "/drop", isDrop: true },
  { icon: ShoppingBag, label: "Sacola", path: "/carrinho" },
  { icon: User, label: "Conta", path: "/conta" },
];

const MobileNav = () => {
  const location = useLocation();
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-ocean-dark border-t border-ocean-800 h-16">
      <div className="flex items-center justify-around h-full">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors relative ${
                isActive ? "text-coral" : "text-sand/60"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-body">{tab.label}</span>
              {tab.label === "Sacola" && itemCount > 0 && (
                <span className="absolute -top-0.5 right-1 bg-teal text-ocean font-price text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              {tab.isDrop && (
                <span className="absolute -top-0.5 right-1 w-2 h-2 bg-coral rounded-full animate-pulse-coral" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
