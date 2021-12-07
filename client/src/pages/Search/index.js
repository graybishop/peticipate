// import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { GET_BIIGIES, GET_KEYWORDS } from '../../utils/queries.js';
import { Link } from "react-router-dom";
import BiiggieCard from "../../pages/HomePage/BiiggieCard.js";
import honeycombImage from "../../assets/images/hex-bg-5.png";

const SearchPage = () => {
    const { data: biiggiesData, error: biiggiesError } = useQuery(GET_BIIGIES);
    console.log(biiggiesData);

    const { data: keywordsData, error: keywordsError} = useQuery(GET_KEYWORDS);
    console.log(keywordsData);

    document.title = 'Search || Search Keywords';

    let biiggieCards = biiggiesData?.biiggies.map((item, index) => {
        return <BiiggieCard biiggie={item} key={item._id} rank={index+1}/>;
    })

    return (

        <div className='flex flex-col bg-body-background-blue'>
      <section className=' bg-bottom bg-cover' style={{ backgroundImage: `url(${honeycombImage})` }}>
        <div className='flex flex-col justify-center gap-8 py-20 px-4 items-center backdrop-filter h-xl'>
          <h2 className='text-center text-4xl font-semibold'>Search <span className='font-extrabold text-orange-primary'>Biiggies</span> by <em>keyword!</em></h2>
          <div className='text-center text-xl flex flex-col gap-2 md:w-8/12 lg:w-6/12 xl:w-2/6'>
            <p><span className='font-extrabold text-orange-primary'>Biiggie</span> is how dreams become reality.</p>
            <p>Find biiggies to donate your time skills and funds using <em>keywords.</em></p>
            <p>Support interests closest to your heart with your time, talents, and treasure. </p>
          </div>
          <div className='flex flex-col gap-2 w-8/12 justify-center md:flex-row md:w-full md:gap-4'>
            <Link to='/search'
              className='text-orange-primary bg-white p-4 rounded-lg shadow font-semibold text-lg border border-orange-primary text-center hover:text-orange-hover'>
              Find a <span className='font-extrabold'>Biiggie</span></Link>
              <Link to='/new-biiggie'
              className='bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg text-center hover:bg-orange-hover'>
              Build My <span className='font-extrabold'>Biiggie</span> Now</Link>
          </div>
        </div>
      </section>
      <p>
        {biiggiesError?.toString()}
      </p>
      <div className='p-4 container mx-auto flex flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3'>
        {biiggieCards}
      </div>
    </div>
    );
};

export default SearchPage;