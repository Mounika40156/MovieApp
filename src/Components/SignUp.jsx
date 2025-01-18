import React, { useState } from 'react';
import background_Movie from '../assets/background_Movie.png';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [text, settext] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleTextChange = (e) => settext(e.target.value);

  const handleGetStarted = () => {
    if (email) {
      setShowForm(true);
    } else {
      alert('Please enter a valid email.');
    }
  };

  const handleSignUpClick = () => {
    setIsLogin(false);
    setShowForm(true);
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    setShowForm(true);
  };

  const handleStayLoggedOut = () => {
    navigate('/dashboard');
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Submitted:', { name, email, password });
    navigate('/dashboard', {state: {nickname: text}});
  };

  return (
    <>
      <div className="relative">
        <div
          className={`fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300 ${showForm ? 'blur-sm' : ''
            }`}
          style={{
            backgroundImage: `url(${background_Movie})`,
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}
          ></div>
        </div>

        <div className={`z-10 relative ${showForm ? 'blur-sm' : ''}`}>
          <h1 className="text-red-600 text-3xl font-extrabold shadow-lg ml-[130px] mt-[70px]">
            MOVIES
          </h1>

          <button
            onClick={handleSignUpClick}
            className="absolute top-0 right-[100px] text-white text-lg font-bold bg-red-600 py-2 px-4 rounded shadow-lg hover:bg-red-800 cursor-pointer"
          >
            SignUp
          </button>

          <button
            onClick={handleLoginClick}
            className="absolute top-0 right-[200px] text-white text-lg font-bold bg-transparent py-2 px-4 rounded shadow-lg cursor-pointer"
          >
            Login
          </button>

          <select className='absolute top-0 right-[300px] text-white text-lg font-normal bg-transparent py-2 px-4 rounded shadow-lg cursor-pointer'>
            <option className="text-black" value="en">English</option>
            <option className="text-black" value="te">Telugu</option>
          </select>

          <div className='w-full h-full flex items-center justify-center flex-col space-y-6'>
            <p className="text-slate-100 mt-[150px] text-[55px] font-extrabold px-4 shadow-lg">
              Stream your favorite <br /> movies, TV shows.
            </p>
            <p className="text-slate-100 text-[20px] font-normal shadow-lg">Ready to watch? Enter your email to create</p>

            <div className="flex space-x-4 mt-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email Address"
                className="text-white bg-white/30 backdrop-blur-lg rounded py-4 px-16 shadow-lg"
              />
              <button
                onClick={handleGetStarted}
                className="bg-red-600 text-white text-lg font-bold py-2 px-4 rounded shadow-lg hover:bg-red-800 cursor-pointer"
              >
                Get Started
              </button>
            </div>
            <button
              onClick={handleStayLoggedOut}
              className="text-white text-[12px] font-normal bg-transparent rounded shadow-lg cursor-pointer"
            >
              Don't want to signup then click here <span className='text-red-600 cursor-pointer hover:underline'>Stay Logged Out</span>
            </button>
          </div>
        </div>

        {showForm && (
          <div className="absolute top-[340px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-[70px] rounded-lg shadow-lg z-20">
            <p className='absolute top-4 left-4 text-red-600 cursor-pointer' onClick={()=>setShowForm(false)}> &larr;back</p>
            <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="text" className="block text-sm font-medium">Nick Name</label>
                <input
                  type="text"
                  id="text"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter your Nick Name"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white text-lg font-bold py-2 px-4 rounded-lg hover:bg-red-800"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>
            {!isLogin && (
              <p className="mt-4 text-center text-sm">
                Already have an account?
                <span
                  onClick={handleLoginClick}
                  className="text-red-600 cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </p>
            )}
            {isLogin && (
              <p className="mt-4 text-center text-sm">
                <span
                  onClick={() => alert('Redirect to Forgot Password page')}
                  className="text-black cursor-pointer hover:underline"
                >
                  Forgot Password?
                </span>
                <span onClick={handleSignUpClick} className="text-red-600 cursor-pointer hover:underline"> SignUp here</span>
              </p>
            )}
          </div>
        )}


      </div>
    </>
  );
};

export default SignUp;
