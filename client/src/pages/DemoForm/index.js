import { useEffect, useState } from "react";
// import { useMutation } from "@apollo/client";
// import { CREATE_BIIGGIE } from '../../utils/mutations';
import { DateTime } from "luxon";

const FirstStep = (props) => {
  let [formState, setFormState] = useState({
    title: '',
    description: ''
  });

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
    console.log("Handle Form", formState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.moveForward({ ...formState });
  };


  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>Title & Description</h3>
      <form action="" className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label htmlFor="title">What would you like to call your biiggie?</label>
          <input type="text" name='title' onBlur={handleChange} defaultValue={props.biiggie.title} />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">How would you describe your biiggie? Let people know why you want this to happen, who you are, and why you've decided to reach out.</label>
          <textarea name='description' onBlur={handleChange} defaultValue={props.biiggie.description} />
        </div>
        <button type='submit' onClick={handleSubmit}>Next Step</button>
      </form>
    </div>
  );
};

const SecondStep = (props) => {
  let [formState, setFormState] = useState({
    deadline: props.biiggie.deadline
  });

  const handleChange = (event) => {
    let newDeadline = DateTime.fromISO(event.target.value).toMillis();
    setFormState({ ...formState, [event.target.name]: newDeadline });
    console.log("Handle Form", formState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.moveForward({ ...formState });
  };

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>What's the deadline?</h3>
      <form action="" className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label htmlFor="title">What would you like to call your biiggie?</label>
          <input type="date" name='deadline' onBlur={handleChange} defaultValue={DateTime.fromMillis(props.biiggie.deadline).toISODate()} />
        </div>
        <button type='submit' onClick={handleSubmit}>Next Step</button>
        <button onClick={props.goBack}>Previous Step</button>
      </form>
    </div>
  );
};

const ThirdStep = (props) => {
  let [formState, setFormState] = useState({
    images: []
  });

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: [event.target.value] });
    console.log("Handle Form", formState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.moveForward({ ...formState });
  };


  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>The Big Picture</h3>
      <form action="" className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label htmlFor="title">Give us a URL that we can display on the page of your Biiggie.</label>
          <input type="text" name='images' onBlur={handleChange} defaultValue={props.biiggie.images[0]} />
        </div>
        <button type='submit' onClick={handleSubmit}>Next Step</button>
        <button onClick={props.goBack}>Previous Step</button>
      </form>
    </div>
  );
};


const ForthStep = (props) => {
  let [formState, setFormState] = useState({
    keywords: []
  });

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: [event.target.value] });
    console.log("Handle Form", formState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.moveForward({ ...formState });
  };


  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>Slap a Label on It</h3>
      <form action="" className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label htmlFor="title">Give us a term that allows other users to search for your Biiggie.</label>
          <input type="text" name='keywords' onBlur={handleChange} defaultValue={props.biiggie.keywords[0]} />
        </div>
        <button type='submit' onClick={handleSubmit}>Next Step</button>
        <button onClick={props.goBack}>Previous Step</button>
      </form>
    </div>
  );
};


const HelpOptionsForm = (props) => {
  let [formState, setFormState] = useState({
    name: "",
    description: "",
    numOfPeople: 3,
    moneyRequested: null,
  });

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: [event.target.value] });
    console.log("Handle Form", formState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.moveForward({ ...formState });
  };

  let innerElements;

  if (props.helpOptions.length === 0) {
    innerElements = (
      <form action="" className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label htmlFor="title">Give us a term that allows other users to search for your Biiggie.</label>
          <input type="text" name='keywords' onBlur={handleChange} defaultValue={'none'} />
        </div>
        <button type='submit' onClick={handleSubmit}>Next Step</button>
        <button onClick={props.goBack}>Previous Step</button>
      </form>
    );
  }


  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>Slap a Label on It</h3>
      {innerElements}
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
    deadline: DateTime.now().toMillis(),
    images: [],
    keywords: []
  });

  let [helpOptions, setHelpOptions] = useState([]);

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
      innerForm = (<FirstStep moveForward={moveForward} biiggie={biiggie} />);
      break;
    case 2:
      innerForm = (<SecondStep moveForward={moveForward} goBack={goBack} biiggie={biiggie} />);
      break;
    case 3:
      innerForm = (<ThirdStep moveForward={moveForward} goBack={goBack} biiggie={biiggie} />);
      break;
    case 4:
      innerForm = (<ForthStep moveForward={moveForward} goBack={goBack} biiggie={biiggie} />);
      break;
    case 5:
      innerForm = (<HelpOptionsForm moveForward={moveForward} goBack={goBack} helpOptions={helpOptions} />);
      break;
    case 6:
      innerForm = (<div className='bg-green-700'>This is the last step. you can put a link here to send them to the homepage, or their biggie or just redirect them</div>);
      break;

    default:
      break;
  }


  return (
    <div className='bg-body-background-blue'>
      <div className='container mx-auto flex flex-col px-4'>
        <h1 className='text-2xl py-8'>Create your new Biiggie</h1>
        <div>
          {innerForm}
        </div>

      </div>
    </div>

  );


};

export default DemoForm;