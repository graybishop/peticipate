import { Link } from "react-router-dom";
import {FiUser, FiSearch, FiPlus} from 'react-icons/fi'


const Header = () => {
  return (
    <div className='container mx-auto flex flex-row items-center justify-between py-6 px-6 bg-blue-header'>
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
        <Link to="/search"><FiSearch /></Link>
        <Link to="/profile"><FiUser /></Link>
        <Link to="/new-biiggie"><FiPlus /></Link>
        {/* <Link to="/test">Test Page</Link> */}
      </div>
    </div>
  );
};

export default Header;