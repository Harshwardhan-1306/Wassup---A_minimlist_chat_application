import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

export default function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/signup' element={ <SignUpPage /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/setting' element={ <SettingsPage /> } />
        <Route path='/profile' element={ <ProfilePage /> } />
      </Routes>
    </div>
  )
}

