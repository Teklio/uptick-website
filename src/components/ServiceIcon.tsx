import { FiCloud, FiGlobe, FiGrid, FiLayers, FiPenTool, FiShield, FiShoppingCart, FiSmartphone, FiCode } from "react-icons/fi";

const icons = {
  globe: FiGlobe,
  layers: FiLayers,
  grid: FiGrid,
  shield: FiShield,
  phone: FiSmartphone,
  cart: FiShoppingCart,
  cloud: FiCloud,
  pen: FiPenTool,
} as const;

export default function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name as keyof typeof icons] ?? FiCode;
  return <Icon className={className} />;
}
