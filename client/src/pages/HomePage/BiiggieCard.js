import { FiThumbsUp, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_LIKE } from '../../utils/mutations.js';
import { useEffect, useState } from 'react';

const BiiggieCard = ({ biiggie, rank, user }) => {
  const [biiggieLiked, setBiiggieLiked] = useState(false);
  const [addLike] = useMutation(ADD_LIKE);

  const handleLikeClick = async (event) => {
    event.preventDefault();
    const biiggieId = biiggie._id;
    try {
      await addLike({
        variables: {
          biiggieId
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    if(user.liked){
      for (const item of user.liked) {
        if(item._id === biiggie._id){
          setBiiggieLiked(true)
        }
      }
    }
  }, [user.liked, biiggie._id])

  const getFullName = () => {
    if (!biiggie.createdBy) {
      return `Your Name Here!`;
    }

    if (!biiggie.createdBy.firstName) {
      return 'Anonymous';
    }
    return `${biiggie.createdBy.firstName} ${biiggie.createdBy.lastName}`;
  };

  const processHelpOptions = () => {
    let moneyRequestedTotal = 0;
    let moneyReceivedTotal = 0;
    let numOfPeopleReqTotal = 0;
    let registeredUsersTotal = 0;

    for (const option of biiggie.helpOptions) {
      if (option.numOfPeople) {
        numOfPeopleReqTotal += option.numOfPeople;
        if (!option.registeredUsers) {
          registeredUsersTotal = 0;
        } else {
          registeredUsersTotal += option.registeredUsers.length;
        }
      }

      if (option.moneyRequested) {
        moneyRequestedTotal += option.moneyRequested;
        moneyReceivedTotal += option.moneyReceived;
        if (!option.moneyReceived) {
          moneyReceivedTotal = 0;
        } else {
          moneyReceivedTotal += option.moneyReceived;
        }
      }
    }

    return { moneyRequestedTotal, moneyReceivedTotal, numOfPeopleReqTotal, registeredUsersTotal };
  };

  const daysRemaining = () => {
    return Math.floor((new Date(biiggie.deadline) - new Date()) / 1000 / 86400) + 1;
  };

  const helpOptionsTotals = processHelpOptions();

  return (
    <div className='h-full flex flex-col'>
      <div className='flex flex-col border-4 border-blue-secondary shadow relative flex-grow' key={biiggie._id}>
        {/* Rank Flag */}
        <div className='absolute px-4 py-2 bg-blue-secondary rounded-br'>
          <p className=' text-white filter drop-shadow text-lg font-extrabold '> <span className='font-bold'>#{rank || '1'}</span> Biiggie</p>
        </div>
        {/* End Rank Flag */}
        {/* IMG */}
        <img src={biiggie.images} alt="" className='object-cover h-72' />
        {/* END IMG */}
        {/* BIIGGIE INFO */}
        <div className='border-blue-secondary bg-blue-header flex flex-row p-4 items-center flex-grow'>
          <div className='flex-1 flex flex-col gap-4'>
            <div>
              <h3 className='text-2xl font-bold'>{biiggie.title}</h3>
            </div>
            <div>
              <p className='leading-tight line-clamp-3'>{biiggie.description}</p>
              <p>{biiggie.sources}</p>
            </div>
          </div>
          <div className='p-2 w-32 flex flex-col items-center justify-center'>
            <img className="object-cover rounded-full border-2 shadow h-20 w-20 border-blue-secondary"
              id="profileImage" src={biiggie.createdBy?.image || 'https://images.unsplash.com/photo-1521754040860-ed38b308ac9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'} alt="user profile" />
            <p className='font-semibold text-center'>{getFullName()}</p>
            <p>{biiggie.createdBy?.username}</p>
          </div>
        </div>
        {/* END BIIGGIE INFO */}
        <div className="bg-blue-secondary flex flex-row px-4 py-2 justify-between">
          {biiggieLiked ? <p className='text-green-600 bg-green-200 px-2  rounded shadow font-semibold border border-green-600 text-center flex flex-row items-center gap-2'>
            Saved <FiCheck className='' />
          </p> :
          <button onClick={handleLikeClick} className='text-orange-primary bg-white px-2 rounded shadow font-semibold border border-orange-primary text-center hover:text-orange-hover flex flex-row items-center gap-2'>
            {biiggie.likes || '0'} <FiThumbsUp className='' />
          </button>
          }
          <p className='font-bold'>
            {helpOptionsTotals.registeredUsersTotal} / {helpOptionsTotals.numOfPeopleReqTotal} Collaborators
          </p>
          <p className='font-bold'>
            ${helpOptionsTotals.moneyReceivedTotal} / ${helpOptionsTotals.moneyRequestedTotal}
          </p>
        </div>
      </div>
      <div className="bg-blue-nav-button flex flex-row px-4 py-2 justify-evenly text-white rounded-b-lg text-lg font-semibold shadow">
        {daysRemaining() < 0 ? (<p className='w-6/12 text-center border-r-2 text-red-300'>EXPIRED</p>) : daysRemaining() === 0 ? (<p className='w-6/12 text-center border-r-2'>Expires Tonight</p>) : (<p className='w-6/12 text-center border-r-2'>
          {daysRemaining() < 7 ? 'ONLY ' : ''}{daysRemaining()} {daysRemaining() === 1 ? 'Day ' : 'Days'} Left!
        </p>)}
        <Link to={`/biiggie/${biiggie._id}`} className='w-6/12 text-center'>View <span className='font-extrabold'>Biiggie</span></Link>
      </div>
    </div>
  );
};

export default BiiggieCard;
