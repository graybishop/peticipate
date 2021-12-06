import { Link, useParams } from "react-router-dom";
import { BIIGGIE } from "../../utils/queries";
import { USER_COMMIT_TO_HELP } from '../../utils/mutations.js';
import { useQuery, useMutation } from '@apollo/client';
import CommentForm from "./CommentForm";
import CommentSection from "./CommentSection";
import { BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs';
import auth from "../../utils/auth.js";
import { useEffect, useState } from "react";

const HelpOptionCard = ({ helpOption, userId }) => {
  const [userCommittedState, setUserCommittedState] = useState(false);
  const [moneyRemaining, setMoneyRemaining] = useState(helpOption.moneyRequested - helpOption.moneyReceived);
  const [addToHelpOption] = useMutation(USER_COMMIT_TO_HELP);


  let moneyGoal = false;
  if (!helpOption.numOfPeople) {
    moneyGoal = true;
  }

  useEffect(() => {
    const isUserCommitted = () => {
      let userHasCommit = false;

      for (const user of helpOption.registeredUsers) {
        if (user._id === userId) {
          userHasCommit = true;
          break;
        }
      }
      console.log('Setting userhascommit to:', userHasCommit);
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
    }
    try {
      await addToHelpOption({
        variables: { ...mutationVars }
      });
      setUserCommittedState(true);
    } catch (error) {
      console.error(error);
    }
  };

  const moneyButtons = (
    <div>
      <button className='border' onClick={() => { handleCommit(5); }}>Commit <span className='font-bold'>$5</span>!</button>
      <button className='border' onClick={() => { handleCommit(20); }}>Commit <span className='font-bold'>$20</span>!</button>
      <button className='border' onClick={() => { handleCommit(moneyRemaining); }}>Commit <span className='font-bold'>${moneyRemaining}</span>!</button>
    </div>
  );

  const peopleButton = (
    <div>
      <button className='border' onClick={() => { handleCommit(); }}>Commit to Help!</button>
    </div>
  );

  return (
    <div className='shadow rounded bg-white p-4'>
      <div>
        <h4 className='text-lg'>{helpOption.name}</h4>
        <p className=''>{helpOption.description}</p>
      </div>
      <div>
        {userCommittedState ? (<div>Thanks for your commitment!</div>) : moneyGoal ? moneyButtons : peopleButton}
      </div>
    </div>
  );
};


const BiiggiePage = ({ biiggie }) => {
  let { biiggieId } = useParams();
  let { data, loading } = useQuery(BIIGGIE, { variables: { id: biiggieId } });

  if (loading) return <p>Loading ...</p>;
  let userId = null;
  if (auth.loggedIn()) {
    userId = auth.getProfile().data._id;
  }
  data = data.biiggie;

  const mappedHelpOptions = data.helpOptions.map((item) => <HelpOptionCard helpOption={item} key={item._id} userId={userId} />);

  return (
    <div className='bg-body-background-blue'>
      <div className="container mx-auto flex flex-col p-4 gap-4 filter drop-shadow items-center">
        <div className='border-l border-blue-secondary pl-2'>
          <h1 className="text-4xl">{data.title}</h1>
          <div className='flex flex-row items-center gap-2'>
            <img className="object-cover rounded-full border-2 shadow h-20 w-20 border-blue-secondary"
              src={data.createdBy.image} alt='profile' />
            <div>
              <p className="font-bold">{data.createdBy.firstName} {data.createdBy.lastName}</p>
              <p className="italic">{data.createdBy.username}</p>
            </div>
          </div>
        </div>
        <img className='shadow rounded' src={data.images} alt="" />
        <div className='border-t border-blue-secondary '>
          <p className="p-2 ">{data.description}</p>
        </div>
        <div className='flex flex-col gap-2'>
          {mappedHelpOptions}
        </div>
        <p className="text-2xl text-center text-orange-hover font-semibold animate-pulse">{Math.floor((new Date(data.deadline) - new Date()) / 1000 / 86400)} Days Left</p>
        <div>
          <h2 className='text-center'>Share this <span className='font-extrabold text-orange-primary'>Biggie</span></h2>
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
        <div>
          <CommentForm />
        </div>
        <div>
          <CommentSection comments={data.comments} />
        </div>
      </div>
    </div>
  );
};

export default BiiggiePage;
