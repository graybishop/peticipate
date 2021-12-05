import { FiThumbsUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BiiggieCard = ({ biiggie }) => {
  const getFullName = () => {
    if (!biiggie.createdBy) {
      return `that's you`;
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

  const helpOptionsTotals = processHelpOptions();

  return (
    <div className='h-full flex flex-col'>
      <div className='flex flex-col border-4 border-blue-secondary shadow relative flex-grow' key={biiggie._id}>
        {/* Rank Flag */}
        <div className='absolute px-4 py-2 bg-blue-secondary rounded-br'>
          <p className=' text-white filter drop-shadow text-lg font-extrabold '> <span className='font-bold'>#1</span> Biggie</p>
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
              <p className='leading-tight'>{biiggie.description}</p>
              <p>{biiggie.sources}</p>
            </div>
          </div>
          <div className='p-2 w-32 flex flex-col items-center justify-center'>
            <img className="object-contain rounded-full border-2 shadow h-3/6 border-blue-secondary"
              id="profileImage" src="https://source.unsplash.com/featured/1000x1000/?profile" alt="user profile" />
            <p className='font-semibold text-center'>{getFullName()}</p>
            <p>{biiggie.createdBy?.username}</p>
          </div>
        </div>
        {/* END BIIGGIE INFO */}
        <div className="bg-blue-secondary flex flex-row px-4 py-2 justify-between">
          <p className='font-bold'>15 <FiThumbsUp className='inline' /></p>
          <p className='font-bold'>
            {helpOptionsTotals.registeredUsersTotal} / {helpOptionsTotals.numOfPeopleReqTotal} Collaborators
          </p>
          <p className='font-bold'>
            ${helpOptionsTotals.moneyReceivedTotal} / ${helpOptionsTotals.moneyRequestedTotal}
          </p>
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