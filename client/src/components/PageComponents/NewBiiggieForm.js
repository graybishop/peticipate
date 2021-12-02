import React, { useState } from "react";

import { useMutation } from "@apollo/client";

import { CREATE_BIIGGIE } from '../../utils/mutations';
// import navbar links here

export function NewBiiggieForm() {
  const [formState, setFormState] = useState({
    title: "", // title of Biiggie
    deadline: "", // deadline for user Biiggie
    description: "", // description for user biggie
    sources: "", // links to help get your Biiggie across
    images: "", // images to add to your Biiggie
  });

  const [createBiiggie] = useMutation(CREATE_BIIGGIE);

  // const [errorMessage, setErrorMessage] = useState('');
  // const { name, type, title, action, biiggie } = formState;

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
    setFormState({ ...formState, [event.target.name]: event.target.value });
    console.log("Handle Form", formState);
  };

  return (
    <section>
      <form id="pageData" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pageData">
            Must fill out all sections to generate biiggie
          </label>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            defaultValue={name}
            onBlur={handleChange}
          />
        </div>
        <div>
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
        </div>
        <div>
          <label htmlFor="title">Desired title for biiggie:</label>
          <input
            type="text"
            name="title"
            defaultValue={title}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="action">Summarize who can take action</label>
          <input
            type="text"
            name="action"
            defaultValue={action}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="biiggie">Tell us all about your big Idea!</label>
          <textarea
            name="biiggie"
            rows="7"
            defaultValue={biiggie}
            onBlur={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default NewBiiggieForm