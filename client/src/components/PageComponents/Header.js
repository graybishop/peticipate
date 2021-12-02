import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='container mx-auto flex flex-row items-center justify-between'>
      <div>
        <h1 className='text-4xl'>Ende<span className='text-sm underline align-top transform scale-150'>a</span><span className='text-purple-700'>V</span>or</h1>
      </div>
      <div className='flex flex-row items-center gap-2'>
      <Link to="/">Home Page</Link>
      <Link to="/login">Login Page</Link>
      <Link to="/sign-up">Sign Up</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/new-biiggie">Make a new Biiggie</Link>
      <Link to="/test">Test Page</Link>
      </div>
    </div>
  )
}

export default Header