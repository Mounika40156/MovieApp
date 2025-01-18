import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faHeart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';
import Display from './Display';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname || 'Guest';
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const emojis = ['😂', '😘', '😁', '😊', '🤗', '😏', '😭', '🥵', '🫨'];
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    console.log('Searching for:', searchQuery);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleHomeClick = () => {
    scrollToTop();
  };

  const handleWelcomeClick = () => {
    scrollToTop(); 
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <nav className="flex items-center justify-between bg-black text-red-600 px-6 py-4 fixed top-0 left-0 w-full z-50">
        <div
          className="text-red-600 text-2xl font-extrabold shadow-lg relative ml-[80px] mt-[10px] fonts-n cursor-pointer"
          onClick={handleWelcomeClick} 
        >
          <span className="text-[25px]">
            Welcome <br />
            <span className="fonts-m absolute text-white ml-[20px] top-4 text-xl">
              {nickname}
              <span className="text-3xl">{emojis[currentEmoji]}</span>
            </span>
          </span>
        </div>

        <div className="relative mt-[20px]">
          <input
            className="bg-zinc-800 min-h-11 w-[40em] rounded-3xl pl-12 pr-14 text-white placeholder:text-white"
            placeholder="Search here"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
          />
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white rounded-e-3xl px-5 py-2.5 hover:bg-red-700"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>

        <div className="flex gap-x-20 mr-[70px] text-[20px] text-white mt-[40px]">
          <button
            onClick={() => {
              handleHomeClick();
            }}
            className="hover:underline flex items-center space-x-2 hover:text-red-600"
          >
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button
            onClick={() => navigate('/saved-list')}
            className="hover:underline flex items-center space-x-2 hover:text-red-600"
          >
            <FontAwesomeIcon icon={faList} />
          </button>
          <button
            onClick={() => navigate('/favorites')}
            className="hover:underline flex items-center space-x-2 hover:text-red-600"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button
            className="hover:underline flex items-center space-x-2 hover:text-red-600"
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </nav>

      <Display searchQuery={searchQuery} />
    </div>
  );
};

export default Navbar;
