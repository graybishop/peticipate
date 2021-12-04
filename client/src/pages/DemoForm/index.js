import React, { useState, useEffect } from "react";

const FirstStep = (props) => {
  let [formState] = useState({
    title: 'This is an example',
    description: 'This is an example description. Lorem ipsum'
  });

  return (
    <div className='bg-red-50 flex flex-col gap-2'>
      <h3 className='text-xl'>Tell us about your Biiggie!</h3>
      <form action="" className='flex flex-col gap-2'>
        <label htmlFor="">ENTER BIGGIE TITILE</label>
        <input type="text" />
        <label htmlFor="">ENTER BIGGIE DESCRIPTION</label>
        <input type="text" />
        <button type='submit' onClick={() => { props.moveForward({ ...formState }); }}>Next</button>
      </form>
    </div>
  );
};

const SecondStep = (props) => {
  let [formState] = useState({
    deadline: new Date(),

  });

  return (
    <div className='bg-blue-50 flex flex-col gap-2'>
      <h3 className='text-xl'>What's the deadline?</h3>
      <form action="" className='flex flex-col gap-2'>
        <label htmlFor="">ENTER BIGGIE DEADLINE</label>
        <input type="text" />
        <label htmlFor="">ENTER BIGGIE IMAGES</label>
        <input type="text" />
        <button onClick={props.goBack}>GO BACK</button>
        <button onClick={() => { props.moveForward(formState); }}>Next</button>
      </form>
    </div>
  );
};

const ThirdStep = (props) => {
  let [formState] = useState({
    images: ['image1', 'image2'],
    keywords: ['fake key word', 'another one']
  });

  return (
    <div className='bg-yellow-50 flex flex-col gap-2'>
      <h3 className='text-xl'>How about some keywords and images?</h3>
      <form action="" className='flex flex-col gap-2'>
      <label htmlFor="">ENTER BIGGIE Kewords</label>
      <input type="text" />
      <button onClick={props.goBack}>GO BACK</button>
      <button onClick={() => { props.moveForward(formState); }}>Next</button>
      </form>
    </div>
  );
};




const DemoForm = () => {

  let [stepState, setStepState] = useState(
    {
      currentStep: 1
    }
  );
  let [biiggie, setBiiggie] = useState({
    title: '',
    description: '',
    deadline: 0,
    images: [],
    keywords: []
  });
  // let [helpOptions, setHelpOptions] = useState([])

  useEffect(() => {
    console.log(biiggie);
  });


  const moveForward = (formData) => {
    let clonedState = { ...stepState };
    let nextStep = clonedState.currentStep + 1;


    setBiiggie({ ...biiggie, ...formData });
    setStepState({ currentStep: nextStep });
  };

  const goBack = () => {
    let clonedState = { ...stepState };
    let nextStep = clonedState.currentStep - 1;


    setStepState({ currentStep: nextStep });
  };

  let innerForm;

  switch (stepState.currentStep) {
    case 1:
      innerForm = (<FirstStep moveForward={moveForward} />);
      break;
    case 2:
      innerForm = (<SecondStep moveForward={moveForward} goBack={goBack} />);
      break;
    case 3:
      innerForm = (<ThirdStep moveForward={moveForward} goBack={goBack} />);
      break;
    case 4:
      innerForm = (<div className='bg-green-700'>This is the last step. you can put a link here to send them to the homepage, or their biggie or just redirect them</div>);
      break;

    default:
      break;
  }


  return (
    <div className='container mx-auto flex flex-col bg-body-background-blue'>
      <h1 className='text-2xl px-4 py-2'>This is a form demo</h1>
      <div className='p-4'>
        {innerForm}
      </div>

    </div>

  );


};

export default DemoForm;