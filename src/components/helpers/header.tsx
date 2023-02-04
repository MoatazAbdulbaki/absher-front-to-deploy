import logo from '../../assets/images/absherLogoEdited.jpg'
import { Link } from 'react-router-dom';
import Notifcations from './../home/notifcation';
import SideBar from './sidebar';
import { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex justify-between items-center w-full container'>
      <Link to="/">
        <div className='w-[120px] h-[100px]'>
          <img src={logo} />
        </div>
      </Link>
      <div className='flex gap-5 items-center'>
        <Notifcations />
        <button onClick={() => setIsOpen(true)}>
          <svg width="36" height="36" fill="currentColor" className="bi bi-list fill-main-red" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>
      </div>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Header;