import { Link } from "react-router-dom";
import { BsTwitter, BsLinkedin, BsInstagram, BsFacebook, BsFillHeartFill } from 'react-icons/bs';

const Footer = () => {
    return (
    <div className="bg-blue-header relative flex-grow">
        <div className="container mx-auto p-6">
            <h1 className="font-bold flex justify-center">Socials</h1>
            <div className="flex justify-center text-2xl gap-4 p-2">
                <Link to=""><BsTwitter /></Link>
                <Link to=""><BsLinkedin /></Link>
                <Link to=""><BsInstagram /></Link>
                <Link to=""><BsFacebook /></Link>
            </div>
            <div>
            <p className="text-center text-sm font-bold italic">Made with <Link to='/thank-you'> <BsFillHeartFill className='inline text-red-600 hover:text-red-900'/> </Link>by Biiggie ©2021</p>
            </div>
        </div>
    </div>
    )
}

export default Footer;