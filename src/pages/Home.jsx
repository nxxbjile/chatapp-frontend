import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Righbar from '../components/Righbar';
import ChatArea from '../components/ChatArea';
import { GlobalContext } from '../contexts/Global';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/Socket';

const Home = () => {
  const { isSidebarOpen } = useContext(GlobalContext);
  const socket = useSocket();
  const navigate = useNavigate();

  // Check for user authentication
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        console.warn('No user found. Redirecting to login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Manage socket connection and events
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // socket.on('response', (data) => {
    //   console.log('Server response:', data);
    // });

    // Cleanup on component unmount
    return () => {
      // socket.off('response');
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className={`overflow-hidden`}>
      <div>
        <Header />
      </div>
      <div
        className={`flex h-screen overflow-hidden mt-12 max-h-screen ${
          isSidebarOpen ? 'ml-1/4' : 'ml-0'
        } transition-all duration-300 ease-in-out`}
      >
        <Sidebar />
        <ChatArea />
        <Righbar />
      </div>
    </div>
  );
};

export default Home;
