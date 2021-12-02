import { useQuery, useMutation } from '@apollo/client';
import { USER_COMMIT_TO_HELP } from '../../utils/mutations.js';
import { AUTH_BIGGIES } from '../../utils/queries.js';

const TestPage = (props) => {
  const { data, error } = useQuery(AUTH_BIGGIES);

  const [testMutation] = useMutation(USER_COMMIT_TO_HELP, );

  const [testMutationForMoney] = useMutation(USER_COMMIT_TO_HELP);

  const runMutation = async () => {
    try {
      let mutationResponse = await testMutation({
        variables: {
          "helpOptionId": "61a831f09eef024cac40a409"
        }
      });
      console.log(mutationResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const runMutation2 = async () => {
    try {
      let mutationResponse2 = await testMutationForMoney({
        variables: {
          "helpOptionId": "61a831f09eef024cac40a40a",
           moneyCommitted: 5
        }
      });
      console.log(mutationResponse2.data);
    } catch (error) {
      console.error(error);
    }
  };

  let mappedBs = data?.authBiggiesReq.map((item) => {
    return (
      <div className='flex flex-col gap-1'>
        <p className='text-2xl'>{item.title}</p>
        <p>{item.description}</p>
        <img src={item.images} alt="" />
        <p>{item.sources}</p>
        <p>Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
        <div className='flex flex-col gap-1'>
          <h2 className='text-xl'>What can you do to help?</h2>
          {
            item.helpOptions?.map(option => {
              return (
                <div>
                  <p className='font-bold'>{option.name}</p>
                  <p>{option.description}</p>
                  <p>Number Required:{option.numOfPeople}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  });

  return (

    <div className='flex flex-col bg-gray-100 gap-2 container mx-auto py-4 rounded-sm my-2 shadow- p-4'>
      <h1 className='text-3xl'>
        This is the homepage, dude.
      </h1>
      <p>
        {error?.toString()}
      </p>
      <div>
        {mappedBs}
      </div>
      <div>
        <h2 className='text-2xl text-center border-b'>Test Buttons Here</h2>
        <div className='flex flex-row gap-2 justify-center'>
        <button className='border p-2 bg-yellow-600 rounded' onClick={() => { runMutation(); }}>Test the User Mutation</button>
        <button className='border p-2 bg-green-600 rounded' onClick={() => { runMutation2(); }}>Test the Money Mutation</button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;