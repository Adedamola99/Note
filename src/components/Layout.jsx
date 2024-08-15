import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"
import Header from "./Header"
import { useTheme } from "../hooks/ThemeContext"

const Layout = () => {
  const { isNightMode } = useTheme();

  return (
    <div className="grid md:grid-cols-5">
      <SideBar />
      <div className={`md:col-span-4 ${isNightMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout