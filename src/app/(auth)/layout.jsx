import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-1/2 h-screen relative md:flex hidden">
        <img src="/cobach.gif" className="w-full h-full object-cover brightness-50 absolute" />
        <img src="/logoBachi.gif" className="w-[50%] m-auto object-contain z-10"/>
        <Link 
          href="/" 
          className="absolute top-4 left-4 font-medium text-green-500 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 bg-white/10 backdrop-blur-sm z-10"
        >
          <FaHome className="text-lg" /> Volver al inicio
        </Link>
      </div>
      <div className="m-auto h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
}