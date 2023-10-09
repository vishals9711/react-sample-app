import { UserDataProvider } from './components/UserDataContext';
import Header from './components/Header';
import MainContent from './pages/MainPage';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatBot from './components/Chatbot/ChatBot';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socketUrl = `${window.location.protocol}//${window.location.hostname}:5001/`;

console.log('socketUrl:: ', socketUrl);

export const socket = io(socketUrl, {
  transports: ['websocket'],
});

console.log('socket:: ', socket);

const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to socket ', socket.id);
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  return (
    <UserDataProvider>
      <Header />
      <MainContent />
      <ChatBot />
      <ToastContainer />
    </UserDataProvider>
  );
};

export default App;
