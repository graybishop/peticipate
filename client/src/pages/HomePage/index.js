import { useQuery } from '@apollo/client';
import { GET_BIIGIES } from '../../utils/queries.js';
import BiiggieCard from './BiiggieCard.js';

const Home = (props) => {
  const { data, error } = useQuery(GET_BIIGIES);

  console.log(data?.biiggies);

  let biggieCards = data?.biiggies.map((item)=>{
    return <BiiggieCard biiggie={item}/>
  })

  return (

    <div className='flex flex-col bg-body-background-blue'>
      <section className='flex flex-col gap-8 py-16 px-4 container mx-auto'>
        <h2 className='text-center text-4xl font-semibold'>What's <em>your</em> <span className='font-extrabold text-orange-primary'>Biiggie</span> idea?</h2>
        <div className='text-center text-xl flex flex-col gap-2'>
          <p><span className='font-extrabold text-orange-primary'>Biiggie</span> is how dreams become reality.</p>
          <p>Find collaborators and funds for your idea.</p>
          <p>Support interests closest to your heart with your time, talents, and treasure. </p>
        </div>
        <div className='text-center'>
          <button className='bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg'>Build My <span className='font-extrabold'>Biggie</span> Now</button>
        </div>
        <div className='text-center'>
          <button className='text-orange-primary p-4 rounded-lg shadow font-semibold text-lg border border-orange-primary'>Find a <span className='font-extrabold'>Biggie</span></button>
        </div>
      </section>
      <p>
        {error?.toString()}
      </p>
      <div className='p-4 container mx-auto'>
        {biggieCards}
      </div>
    </div>
  );
};

export default Home;