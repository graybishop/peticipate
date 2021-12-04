import { Link } from "react-router-dom";
import { FiUser, FiSearch, FiPlus, FiLogIn, FiLogOut } from 'react-icons/fi';
import auth from "../../utils/auth";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  }
  return (
    <div className='bg-blue-header'>
      <div className='container mx-auto flex flex-row items-center justify-between py-6 px-6 '>
        {/* <div>
        <h1 className='text-4xl'>Ende<span className='text-sm underline align-top transform scale-150'>a</span><span className='text-purple-700'>V</span>or</h1>
      </div> */}
        <div>
          <h1 className='text-4xl font-extrabold text-orange-primary'><Link to="/">Biiggie</Link></h1>
        </div>
        <div className='flex flex-row items-center gap-2 text-3xl text-blue-nav-button'>
          {/* <Link to="/">Home Page</Link> */}
          {/* <Link to="/login">Login Page</Link> */}
          {/* <Link to="/sign-up">Sign Up</Link> */}
          {auth.loggedIn() ? (
            <>
          <Tippy content={<span>Search <strong>Biiggies</strong></span>}>
            <Link to="/search"><FiSearch /></Link>
          </Tippy>
          <Tippy content={<span>Build Your Own <strong>Biiggie</strong></span>}>
            <Link to="/new-biiggie"><FiPlus /></Link>
          </Tippy>
          <Tippy content="View Profile">
            <Link to="/profile"><FiUser /></Link>
          </Tippy>
          <Tippy content="Log Out">
            <button onClick={logout}><FiLogOut /></button>
          </Tippy>
          </>
          ) : (
            <>
          <Tippy content={<span>Search <strong>Biiggies</strong></span>}>
            <Link to="/search"><FiSearch /></Link>
          </Tippy>
          <Tippy content={<span>Build Your Own <strong>Biiggie</strong></span>}>
            <Link to="/new-biiggie"><FiPlus /></Link>
          </Tippy>
          <Tippy content="Log In">
            <Link to="/login"><FiLogIn /></Link>
          </Tippy>
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;