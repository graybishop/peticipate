import { useQuery } from '@apollo/client';
import { GET_BIIGIES } from '../../utils/queries.js';

const Home = (props) => {
  const {data, loading, error} = useQuery(GET_BIIGIES)
  console.log(error)
  return (

    <div>
      This is the homepage, dude.
      <p>
      {data?.toString()}
      </p>
      <p>
      {loading?.toString()}
      </p>
      <p>
      {error?.toString()}
      </p>
    </div>
  )
}

export default Home