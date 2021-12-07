// import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BIIGIES, GET_KEYWORDS, QUERY_ME } from "../../utils/queries.js";
import { Link } from "react-router-dom";
import BiiggieCard from "../../pages/HomePage/BiiggieCard.js";
import honeycombImage from "../../assets/images/hex-bg-5.png";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import React, { useState } from "react";



const SearchPage = () => {
  const [foundBiiggies, setFoundBiiggies] = useState([]);
  const { data: biiggiesData, error: biiggiesError } = useQuery(GET_BIIGIES);
  console.log(biiggiesData);

  const { data: keywordsData, error: keywordsError } = useQuery(GET_KEYWORDS);
  console.log(keywordsData);

  const { data: userData, error: userError } = useQuery(QUERY_ME);
  let user = userData?.me || userData?.user || {};

  document.title = "Search || Search Keywords";

  if (keywordsError || biiggiesError || userError) {
    console.log("error");
  }

  let keywordsArray = [];
  let i = 0;
  if (keywordsData != null) {
    for (let keyword of keywordsData.keywords) {
      if (keyword.biiggie.length !== 0) {
        keywordsArray.push({
          id: i,
          word: keyword.keyword,
        });
        i++;
      }
    }
  }

  console.log(keywordsArray);

  //   console.log("Handle Form", biiggiesState);

  let searchedBiiggieCards = foundBiiggies.map((item, index) => {
    return <BiiggieCard biiggie={item} key={item._id} rank={index + 1} user={user} />;
  });

  let biiggieCards = biiggiesData?.biiggies.map((item, index) => {
    return <BiiggieCard biiggie={item} key={item._id} rank={index + 1} user={user} />;
  });

  //   const [biiggiesState, setBiiggiesState] = useState({
  //     freshBiiggieCards: [...biiggieCards],
  //   });

  //   const updateBiiggieState = (newState) =>
  //     setBiiggiesState(Object.assign({}, biiggiesState, newState));

  //   const { freshBiiggieCards } = biiggiesState;

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  let searchedBiiggiesArray = [];
  const handleOnSelect = (item) => {
    // event.preventDefault();
    console.log(item);
    for (let keyword of keywordsData.keywords) {
      console.log(keyword);
      console.log(item.word);
      if (keyword.keyword === item.word) {
        console.log("made it");
        console.log(keyword.biiggie);
        if (keyword.biiggie.length !== 0) {
          for (let searchedBiiggie of keyword.biiggie) {
            searchedBiiggiesArray.push(searchedBiiggie);
            console.log(searchedBiiggiesArray);
          }
        } else {
          searchedBiiggiesArray.push(keywordsData.keywords.biiggie);
        }

      }
    }
    // updateBiiggieState({ freshBiiggieCards: [] });
    biiggieCards = searchedBiiggiesArray.map((item, index) => {
      return <BiiggieCard biiggie={item} key={item._id} rank={index + 1} />;
    });
    console.log(searchedBiiggiesArray);
    setFoundBiiggies(searchedBiiggiesArray);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  return (
    <div className="flex flex-col bg-body-background-blue">
      <section
        className=" bg-bottom bg-cover"
        style={{ backgroundImage: `url(${honeycombImage})` }}
      >
        <div className="flex flex-col justify-center gap-8 py-20 px-4 items-center backdrop-filter h-xl">
          <h2 className="text-center text-4xl font-semibold">
            Search{" "}
            <span className="font-extrabold text-orange-primary">Biiggies</span>{" "}
            by <em>keyword!</em>
          </h2>
          <div className="text-center text-xl flex flex-col gap-2 md:w-8/12 lg:w-6/12 xl:w-2/6">
            <p>
              <span className="font-extrabold text-orange-primary">
                Biiggie
              </span>{" "}
              is how dreams become reality.
            </p>
            <p>
              Find biiggies to donate your time skills and funds using{" "}
              <em>keywords.</em>
            </p>
            <p>
              Support interests closest to your heart with your time, talents,
              and treasure.{" "}
            </p>
          </div>
          <div className="flex flex-row w-11/12 justify-center gap-4 md:w-6/12 lg:w-4/12">
            <form aciton="/" method="get" className='w-full'>
              <ReactSearchAutocomplete
                items={keywordsArray}
                fuseOptions={{ keys: ["word"] }} // Search on both fields
                resultStringKeyName="word" // String to display in the results
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                onClear={handleOnClear}
                showIcon={true}
                styling={{
                  height: "3rem",
                  borderRadius: "1rem",
                  backgroundColor: "white",
                  boxShadow: "none",
                  hoverBackgroundColor: "#D9EFFF",
                  color: "#FF6F00",
                  fontSize: "12px",
                  fontFamily:
                    '"ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                  iconColor: "#FF6F00",
                  lineColor: "#FF6F00",
                  placeholderColor: "#FF6F00",
                  clearIconMargin: "3px 8px 0 0",
                }}
              />
            </form>
          </div>
        </div>
      </section>
      {/* <p>{biiggiesError?.toString()}</p> */}
      {foundBiiggies.length === 0 ? (
        <div>
          <h3 className="text-center text-2xl font">
            Use the search bar above to filter through these biiggies
          </h3>
          <div className="p-4 container mx-auto flex flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
            {biiggieCards}
          </div>
        </div>
      ) :
        (<div>
          <h3 className="text-center text-4xl font-semibold">
            Your Search Results
          </h3>
          <div className="p-4 container mx-auto flex flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
            {searchedBiiggieCards}
          </div>
        </div>)
      }
    </div>
  );
};

export default SearchPage;
