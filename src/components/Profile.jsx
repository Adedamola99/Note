import React, { useState, useEffect } from 'react';
import { FaPenFancy, FaStickyNote, FaBookmark, FaTasks, FaBookOpen } from 'react-icons/fa';
import { useTheme } from '../hooks/ThemeContext';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import Header from './Header';

const Profile = () => {
  const { isNightMode } = useTheme();
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get('https://randomuser.me/api/');
        const data = userResponse.data.results[0];
        setUser({
          name: `${data.name.first} ${data.name.last}`,
          email: data.email,
          country: data.location.country,
          dob: data.dob.date,
          avatar: data.picture.large,
          phoneNumber: data.phone,
          address: `${data.location.street.number} ${data.location.street.name}, ${data.location.city}`,
          bio: 'Passionate writer and avid learner. Loves to explore new topics and share knowledge with others.',
          writingStreak: 5,
          completedTodos: 20,
          incompleteTask: 7,
          notes: 10,
          bookmarkedNotes: 3,
        });

        // Fetch weather data
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.location.city}&units=metric&appid=bc9e4e95d6a17f2de47c723d5d6afae0`);
        setWeather(weatherResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color={isNightMode ? "#ffffff" : "#000000"}
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (!user || !weather) {
    return <div className='flex align-middle justify-center'><p className='mt-48 text-2xl'>Error loading data...</p></div>;
  }

  return (
    <>
      <Header weather={weather} />
      <div className={`px-8 py-6 ${isNightMode ? 'text-white' : 'text-black'}`}>
        <div className={`shadow-lg rounded-lg overflow-hidden ${isNightMode ? 'bg-gray-800 bg-opacity-75' : 'bg-white bg-opacity-75'}`}>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-32 h-32 rounded-full mr-6"
              />
              <div>
                <h2 className="text-3xl font-semibold">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-gray-400">{user.phoneNumber}</p>
                <p className="text-gray-400">{user.country}</p>
                <p className="text-gray-400">{user.address}</p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">About Me</h3>
              <p>{user.bio}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileCard icon={<FaPenFancy className="text-blue-500 text-2xl mr-4" />} title="Writing Streak" value={`${user.writingStreak} days`} isNightMode={isNightMode} />
              <ProfileCard icon={<FaTasks className="text-green-500 text-2xl mr-4" />} title="Completed Task" value={user.completedTodos} isNightMode={isNightMode} />
              <ProfileCard icon={<FaTasks className="text-red-500 text-2xl mr-4" />} title="Incomplete Task" value={user.incompleteTask} isNightMode={isNightMode} />
              <ProfileCard icon={<FaBookOpen className="text-green-500 text-2xl mr-4" />} title="Word Count" value={user.completedTodos} isNightMode={isNightMode} />
              <ProfileCard icon={<FaStickyNote className="text-yellow-500 text-2xl mr-4" />} title="Notes" value={user.notes} isNightMode={isNightMode} />
              <ProfileCard icon={<FaBookmark className="text-red-500 text-2xl mr-4" />} title="Bookmarked Notes" value={user.bookmarkedNotes} isNightMode={isNightMode} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProfileCard = ({ icon, title, value, isNightMode }) => (
  <div className={`flex items-center p-4 rounded-lg shadow-md ${isNightMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
    {icon}
    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p>{value}</p>
    </div>
  </div>
);

export default Profile;
