import { Link, useParams } from "react-router-dom";
import { BIIGGIE } from "../../utils/queries";
import { USER_COMMIT_TO_HELP } from '../../utils/mutations.js';
import { useQuery, useMutation } from '@apollo/client';
import CommentForm from "./CommentForm";
import CommentSection from "./CommentSection";
import { BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs';
import auth from "../../utils/auth.js";
import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';

const HelpOptionCard = ({ helpOption, userId }) => {
  const [userCommittedState, setUserCommittedState] = useState(false);
  const [moneyRemaining, setMoneyRemaining] = useState(helpOption.moneyRequested - helpOption.moneyReceived);
  const [numberOfPeopleRemaining, setNumberOfPeopleRemaining] = useState(helpOption.numOfPeople - helpOption.registeredUsers.length);
  const [addToHelpOption] = useMutation(USER_COMMIT_TO_HELP);


  let moneyGoal = false;
  if (!helpOption.numOfPeople) {
    moneyGoal = true;
  }

  const percentageDone = () => {
    if (moneyGoal) {
      return Math.floor((1 - (moneyRemaining / helpOption.moneyRequested)) * 100);
    }
    return Math.floor((1 - (numberOfPeopleRemaining / helpOption.numOfPeople)) * 100);
  };

  useEffect(() => {
    const isUserCommitted = () => {
      let userHasCommit = false;

      for (const user of helpOption.registeredUsers) {
        if (user._id === userId) {
          userHasCommit = true;
          break;
        }
      }
      setUserCommittedState(userHasCommit);
    };

    isUserCommitted();
  },
    [helpOption, userId]
  );

  const handleCommit = async (amount) => {
    let mutationVars = {
      helpOptionId: helpOption._id,
      moneyCommitted: 0
    };
    if (amount) {
      mutationVars.moneyCommitted = amount;
      setMoneyRemaining(moneyRemaining - amount);
    } else {
      setNumberOfPeopleRemaining(numberOfPeopleRemaining - 1);
    }
    try {
      await addToHelpOption({
        variables: { ...mutationVars }
      });
      confetti({
        colors: ['#FF6F00', '#8FD3FF', '#009BFF', '#D9F0FF'],
        particleCount: 200
      });
      setUserCommittedState(true);
    } catch (error) {
      console.error(error);
    }
  };

  const moneyButtons = (
    <div className='flex flex-row justify-center px-4 pt-4 gap-3'>
      <button
        className='bg-white text-orange-primary p-2 px-2 rounded-lg shadow font-semibold  text-center hover:text-orange-hover border border-orange-primary'
        onClick={() => { handleCommit(5); }}>Commit <span className='font-bold'>$5</span>!</button>
      <button
        className='bg-white text-orange-primary p-2 px-2 rounded-lg shadow font-semibold  text-center hover:text-orange-hover border border-orange-primary'
        onClick={() => { handleCommit(20); }}>Commit <span className='font-bold'>$20</span>!</button>
      <button
        className='bg-orange-primary text-white p-2 px-2 rounded-lg shadow font-semibold text-center hover:bg-orange-hover'
        onClick={() => { handleCommit(moneyRemaining); }}>Commit <span className='font-bold'>${moneyRemaining}</span>!</button>
    </div>
  );

  const peopleButton = (
    <div className='flex flex-row justify-center px-4 pt-4'>
      <button className='bg-orange-primary text-white p-2 px-2 rounded-lg shadow font-semibold  text-center hover:bg-orange-hover' onClick={() => { handleCommit(); }}>Commit to Help!</button>
    </div>
  );

  return (
    <div className={`shadow rounded ${percentageDone() === 100 ? 'bg-green-200' : 'bg-white'} p-4 flex flex-col gap-2`}>
      <div>
        <h3 className='text-xl font-semibold'>{helpOption.name}</h3>
        <p className=''>{helpOption.description}</p>
      </div>
      {percentageDone() === 100 ? (
        <div>Wow, this option has been completely filled out. Thank you everyone! 🎉</div>
      ) : (
        <div>
          <p>
            Currently {percentageDone()}% of the way there with {moneyGoal ?
              `$${moneyRemaining} left to go.` :
              `${numberOfPeopleRemaining} ${numberOfPeopleRemaining === 1 ?
                'person' : 'people'} still needed.`}
          </p>
          {userId === null ?
            (<p>You need to be logged-in to help!</p>) :
            userCommittedState ?
              (<p className='bg-white text-green-600 p-2 px-2 rounded-lg shadow font-semibold  text-center border border-green-600 mt-3'>Thanks for your commitment! 🙏</p>) :
              moneyGoal ?
                moneyButtons : peopleButton}
        </div>
      )}
    </div>
  );
};


const BiiggiePage = ({ biiggie }) => {
  let { biiggieId } = useParams();
  let { data, loading, refetch } = useQuery(BIIGGIE, { variables: { id: biiggieId } });

  if (loading) return <p>Loading ...</p>;
  let userId = null;
  if (auth.loggedIn()) {
    userId = auth.getProfile().data._id;
  }
  data = data.biiggie;

  const mappedHelpOptions = data.helpOptions.map((item) => <HelpOptionCard helpOption={item} key={item._id} userId={userId} />);

  console.log(data.createdBy._id);
  let userOwnsBiggie = false;
  if (data.createdBy._id === userId) {
    userOwnsBiggie = true;
  }

  return (
    <div className='bg-body-background-blue'>
      {userOwnsBiggie && <div className='text-center p-4 bg-green-100 m-2 border border-green-200 rounded'>This is your biiggie! You can go over the details below, and find a link to it on your profile page. <Link to='/profile' className='underline'>Here's a link to your profile page.</Link></div>}
      <div className='relative w-full h-xl overflow-hidden text-white'>
        <img className='w-full object-cover h-full' src={data.images} alt="" />
        <div className='flex flex-col items-center justify-center gap-2 absolute inset-0 backdrop-filter backdrop-blur backdrop-brightness-75'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <h1 className="text-4xl px-2 text-center w-max py-1 bg-blue-nav-button rounded-b shadow text-white font-bold">{data.title}</h1>
            <div className='flex flex-row items-center gap-2 text-white'>
              <img className="object-cover rounded-full border-2 shadow h-20 w-20 border-blue-nav-button"
                src={data.createdBy.image} alt='profile' />
              <div>
                <p className="font-bold">{data.createdBy.firstName} {data.createdBy.lastName}</p>
                <p className="italic">{data.createdBy.username}</p>
              </div>
            </div>
            <div className='flex flex-col items-center mt-6'>
              <h2 className='text-2xl px-2 text-center w-max py-1 bg-blue-nav-button rounded-b shadow text-white font-bold'>Description</h2>
              <p className=" p-2 m-2 border-blue-nav-button border-b-2 rounded bg-black bg-opacity-20">{data.description}</p>
            </div>
            <p className="text-2xl text-center text-orange-light font-semibold animate-pulse"><span className='font-bold'>{Math.floor((new Date(data.deadline) - new Date()) / 1000 / 86400)}</span> Days Left</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col p-4 gap-16 filter drop-shadow items-center mt-4">
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col items-center'>
            <h2 className='px-2 text-2xl w-max py-1 border-b-2 border-blue-nav-button font-bold'>Ways to Help</h2>
            <p className='p-2'>You can help make this <span className='font-extrabold text-orange-primary'>Biiggie</span> a reality by committing to help make these goals come true.</p>
          </div>
          {mappedHelpOptions}
        </div>
        <div>
          <h2 className='px-2 text-2xl w-max py-1 border-b-2 border-blue-nav-button font-bold'>Share this <span className='font-extrabold text-orange-primary'>Biiggie</span></h2>
          <div className="flex justify-center text-2xl gap-2 p-2">
            <Link to="https://www.instagram.com/">
              <button className="bg-orange-primary text-white italic p-2 shadow font-semibold rounded-full" ><BsInstagram /></button>
            </Link>
            <Link to="https://www.facebook.com/">
              <button className="bg-orange-primary text-white italic p-2 shadow font-semibold rounded-full"><BsFacebook /></button>
            </Link>
            <Link to="https://www.twitter.com/">
              <button className="bg-orange-primary text-white italic p-2 shadow font-semibold rounded-full"><BsTwitter /></button>
            </Link>
          </div>
        </div>
        <div className='flex flex-col container items-center'>
          <h2 className='px-2 text-2xl w-max py-1 border-b-2 border-blue-nav-button font-bold'>Leave a Comment</h2>
          <CommentForm refetch={refetch} biiggieId={biiggieId} />
        </div>
        <CommentSection comments={data.comments} />
      </div>
    </div>
  );
};

export default BiiggiePage;
