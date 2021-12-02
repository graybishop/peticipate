import React, { useState } from "react";

import { useMutation } from "@apollo/client";

import { CREATE_BIIGGIE } from '../../utils/mutations';
// import navbar links here

export function NewBiiggieForm() {
  const [formState, setFormState] = useState({
    title: "", // title of Biiggie
    deadline: "", // deadline for user Biiggie
    description: "", // description for user biggie
    sources: [], // links to help get your Biiggie across
    images: [], // images to add to your Biiggie
  });

  const [createBiiggie] = useMutation(CREATE_BIIGGIE);

  // const [errorMessage, setErrorMessage] = useState('');
  const { title, deadline, description, sources, images } = formState;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createBiiggie({
        variables: {
          ...formState,
        },
      });
    } catch (err) {
      console.error(err);
    }
    console.log("form submitted");
  };

  const handleChange = (event) => {
    if (event.target.name === 'images') {
       const imagesArray = [event.target.value];
       setFormState({ ...formState, [event.target.name]: imagesArray });
       console.log("images changed", formState)
       return;
    }
    if (event.target.name === 'sources') {
       const sourcesArray = [event.target.value];
       setFormState({ ...formState, [event.target.name]: sourcesArray });
       console.log("sources changed", formState)
       return;
    }
    if (event.target.name === 'deadline') {
       const deadline = event.target.value;
       const dateNum = new Date(deadline);
       console.log(dateNum);
       setFormState({ ...formState, [event.target.name]: dateNum.valueOf() });
       console.log(dateNum.valueOf());
       console.log("deadline changed", formState)
       console.dir(deadline);
       return;
    }
    setFormState({ ...formState, [event.target.name]: event.target.value });
    console.log("Handle Form", formState);
  };

  return (
    <section className='container mx-auto'>
      <form id="pageData" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pageData">
            Must fill out all sections to get your BIIGGIE published
          </label>
        </div>
        <div>
          <label htmlFor="title">Desired title for BIIGGIE:</label>
          <input
            type="text"
            name="title"
            defaultValue={title}
            onBlur={handleChange}
          />
        </div>
        {/* <div>
          <label htmlFor="type">
            Describe what your cause pertains to: ie: Health, Environment,
            Political
          </label>
          <input
            type="text"
            name="type"
            defaultValue={type}
            onBlur={handleChange}
          />
        </div> */}
        <div>
          <label htmlFor="deadline">
            What is the deadline for your BIIGGIE (YYYY-MM-DD):
          </label>
          <input
            type="date"
            name="deadline"
            defaultValue={deadline}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Tell us all about your BIIGGIE:</label>
          <input
            type="text"
            name="description"
            rows="7"
            defaultValue={description}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="sources">Provide a link that you want associated with your BIIGGIE :</label>
          <input
            type="text"
            name="sources"
            defaultValue={sources}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="images">Provide a link to an image you want associated with your BIIGGIE (image, image, etc.):</label>
          <input
            type="text"
            name="images"
            defaultValue={images}
            onBlur={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default NewBiiggieForm