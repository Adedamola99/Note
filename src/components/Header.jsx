import { FaSun, FaMoon, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';
import { useTheme } from '../hooks/ThemeContext';

const Header = ({ weather }) => {
  const { isNightMode, toggleNightMode } = useTheme();

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clear':
        return <FaSun className="text-yellow-500 text-2xl" />;
      case 'Clouds':
        return <FaCloud className="text-gray-400 text-2xl" />;
      case 'Rain':
        return <FaCloudRain className="text-blue-500 text-2xl" />;
      case 'Snow':
        return <FaSnowflake className="text-white text-2xl" />;
      default:
        return <FaCloud className="text-gray-400 text-2xl" />;
    }
  };

  return (
    <div className={`h-11 w-full shadow-lg px-4 flex items-center justify-end gap-2 ${isNightMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {getWeatherIcon(weather.weather[0].main)}
            <span className="text-lg font-medium">
              {weather.main.temp}°C
            </span>
          </div>
      </div>
      <button
        className="p-2 rounded-full focus:outline-none"
        onClick={toggleNightMode}
      >
        {isNightMode ? (
          <FaSun className="text-yellow-500 text-2xl" />
        ) : (
          <FaMoon className="text-gray-500 text-2xl" />
        )}
      </button>
    </div>
  );
};

export default Header;
