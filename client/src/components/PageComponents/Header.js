import { Link } from "react-router-dom";
import { FiUser, FiSearch, FiPlus, FiLogIn, FiLogOut } from 'react-icons/fi';
import auth from "../../utils/auth";


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
          <Link to="/search"><FiSearch /></Link>
          <Link to="/new-biiggie"><FiPlus /></Link>
          <Link to="/profile"><FiUser /></Link>
          <button onClick={logout}><FiLogOut /></button>
          </>
          ) : (
            <>
          <Link to="/search"><FiSearch /></Link>
          <Link to="/new-biiggie"><FiPlus /></Link>
          <Link to="/login"><FiLogIn /></Link>
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;