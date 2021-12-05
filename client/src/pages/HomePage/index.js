import { useQuery } from '@apollo/client';
import { GET_BIIGIES } from '../../utils/queries.js';
import BiiggieCard from './BiiggieCard.js';
import { Link } from "react-router-dom";
import honeycombImage from "../../assets/images/hex-bg-5.png";

const Home = (props) => {
  const { data, error } = useQuery(GET_BIIGIES);

  let biggieCards = data?.biiggies.map((item) => {
    return <BiiggieCard biiggie={item} key={item._id} />;
  });

  return (

    <div className='flex flex-col bg-body-background-blue'>
      <section className=' bg-bottom bg-cover' style={{ backgroundImage: `url(${honeycombImage})` }}>
        <div className='flex flex-col gap-8 py-20 px-4 items-center backdrop-filter'>
          <h2 className='text-center text-4xl font-semibold'>What's <em>your</em> <span className='font-extrabold text-orange-primary'>Biiggie</span> idea?</h2>
          <div className='text-center text-xl flex flex-col gap-2 md:w-8/12 lg:w-6/12 xl:w-2/6'>
            <p><span className='font-extrabold text-orange-primary'>Biiggie</span> is how dreams become reality.</p>
            <p>Find collaborators and funds for your idea.</p>
            <p>Support interests closest to your heart with your time, talents, and treasure. </p>
          </div>
          <div className='flex flex-col gap-2 w-8/12 justify-center md:flex-row md:w-full md:gap-4'>
            <Link to='/new-biiggie'
              className='bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg text-center hover:bg-orange-hover'>
              Build My <span className='font-extrabold'>Biiggie</span> Now</Link>
            <Link to='/search'
              className='text-orange-primary bg-white p-4 rounded-lg shadow font-semibold text-lg border border-orange-primary text-center hover:text-orange-hover'>
              Find a <span className='font-extrabold'>Biiggie</span></Link>
          </div>
        </div>
      </section>
      <p>
        {error?.toString()}
      </p>
      <div className='p-4 container mx-auto flex flex-col gap-6 grid-cols-2 md:grid xl:grid-cols-3'>
        {biggieCards}
      </div>
    </div>
  );
};

export default Home;