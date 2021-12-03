import { Link } from "react-router-dom";
import { BsTwitter, BsLinkedin, BsInstagram, BsFacebook } from 'react-icons/bs';

const Footer = () => {
    return (
    <div className="bg-blue-header">
        <div className="container mx-auto p-6">
            <h1 className="font-bold flex justify-center">Socials</h1>
            <div className="flex justify-center text-2xl gap-4 p-2">
                <Link to=""><BsTwitter /></Link>
                <Link to=""><BsLinkedin /></Link>
                <Link to=""><BsInstagram /></Link>
                <Link to=""><BsFacebook /></Link>
            </div>
            <div>
            <p className="text-center text-sm font-bold italic">Made with ❤ by Biiggie ©2021</p>
            </div>
        </div>
    </div>
    )
}

export default Footer;