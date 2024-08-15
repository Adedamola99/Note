import { Link } from "react-router-dom"
import { useTheme } from "../hooks/ThemeContext"

const SideBar = () => {
  const { isNightMode } = useTheme();

  return (
    <div className={`md:col-span-1 md:flex md:h-screen md:sticky md:top-0 ${isNightMode ? 'bg-gray-800 text-white' : 'bg-teal-500 text-teal-950'}`}>        
      <nav className="flex flex-col gap-4 p-3 w-full">
        <Link 
          to='profile' 
          className={`font-mono mt-4 cursor-pointer p-2 ${isNightMode ? ' hover:text-teal-950 hover:bg-white' : 'hover:text-teal-300 hover:bg-teal-950'} text-sm md:text-base lg:text-lg xl:text-xl`}>
          Profile
        </Link>

        <Link 
          to='.' 
          className={`font-mono p-2 ${isNightMode ? ' hover:text-teal-950 hover:bg-white' : 'hover:text-teal-300 hover:bg-teal-950'} text-sm md:text-base lg:text-lg xl:text-xl`}>
          Journal
        </Link>

        <Link 
          to='todo' 
          className={`font-mono p-2 ${isNightMode ? ' hover:text-teal-950 hover:bg-white' : 'hover:text-teal-300 hover:bg-teal-950'} text-sm md:text-base lg:text-lg xl:text-xl`}>
          To-do List
        </Link>
      </nav>
    </div>
  )
}

export default SideBar