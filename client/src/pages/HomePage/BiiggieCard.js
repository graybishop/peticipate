import {FiThumbsUp} from 'react-icons/fi'
import { Link } from 'react-router-dom';

const BiiggieCard = ({ biiggie }) => {

  return (
    <div>
      <div className='flex flex-col border-4 border-blue-secondary shadow relative' key={biiggie._id}>
        <div className='absolute px-4 py-2 bg-blue-secondary rounded-br'>
          <p className=' text-white filter drop-shadow text-lg font-extrabold '> <span className='font-bold'>#1</span> Biggie</p>
        </div>
        <img src={biiggie.images} alt="" className='object-cover h-80' />
        <div className='border-blue-secondary bg-blue-header flex flex-row p-4 items-center'>
          <div className='flex-1 flex flex-col gap-4'>
            <div>
              <h3 className='text-2xl font-bold'>{biiggie.title}</h3>
            </div>
            <div>
              <p className='leading-tight'>{biiggie.description}</p>
              <p>{biiggie.sources}</p>

            </div>
          </div>
          <div className='p-2 w-32 flex flex-col items-center justify-center'>
            <img className="object-contain rounded-full border-2 shadow h-3/6 border-blue-secondary" id="profileImage" src="https://source.unsplash.com/featured/1000x1000/?profile" alt="user profile" />
            <p className='font-semibold'>Your Name </p>
            <p>Orlando, FL</p>
          </div>
        </div>
        <div className="bg-blue-secondary flex flex-row px-4 py-2 justify-between">
          <p className='font-bold'>15 <FiThumbsUp  className='inline'/></p>
          <p className='font-bold'>1 / 3 Collaborators</p>
          <p className='font-bold'>$273 / $1,200</p>
        </div>
      </div>
        <div className="bg-blue-nav-button flex flex-row px-4 py-2 justify-evenly text-white rounded-b-lg text-lg font-semibold shadow">
          <p className='w-6/12 text-center border-r-2'>ONLY {Math.floor((new Date(biiggie.deadline) - new Date()) / 1000 / 86400)} Days Left!</p>
          <Link to={`/biiggie/${biiggie._id}`} className='w-6/12 text-center'>View <span className='font-extrabold'>Biiggie</span></Link>
        </div>
    </div>
  );
};

export default BiiggieCard;