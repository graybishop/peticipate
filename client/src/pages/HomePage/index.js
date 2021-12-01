import { useQuery } from '@apollo/client';
import { GET_BIIGIES } from '../../utils/queries.js';

const Home = (props) => {
  const {data,error} = useQuery(GET_BIIGIES)

  console.log(data?.biiggies)

  let mappedBs = data?.biiggies.map((item)=>{
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
            item.helpOptions?.map(option=>{
              return (
              <div>
                <p className='font-bold'>{option.name}</p>
                <p>{option.description}</p>
                <p>Number Required:{option.numOfPeople}</p>
              </div>
              )
            })
          }
        </div>
      </div>
    )
  })
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
    </div>
  )
}

export default Home