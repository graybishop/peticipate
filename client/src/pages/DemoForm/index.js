import { useEffect, useState } from "react";
// import { useMutation } from "@apollo/client";
// import { CREATE_BIIGGIE } from '../../utils/mutations';
import { DateTime } from "luxon";
import BiiggieCard from "../HomePage/BiiggieCard.js";
import auth from "../../utils/auth.js";
import { useNavigate } from "react-router";

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
          <label htmlFor="deadline">What would you like to call your biiggie?</label>
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
          <label htmlFor="images">Give us a URL that we can display on the page of your Biiggie.</label>
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
          <label htmlFor="keywords">Give us a term that allows other users to search for your Biiggie.</label>
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
    numOfPeople: 10,
    moneyRequested: 150,
  });

  let [needPeopleSelector, setNeedPeopleSelector] = useState('options');

  const updateOptionType = (event) => {
    setNeedPeopleSelector(event.target.value);
    setFormState({ ...formState, numOfPeople: 0, moneyRequested: 0 });
  };

  const handleChange = (event) => {
    if (event.target.name === 'numOfPeople' || event.target.name === 'moneyRequested') {
      setFormState({ ...formState, [event.target.name]: Number(event.target.value) });
      console.log("Handle Form", formState);
      return;
    }
    setFormState({ ...formState, [event.target.name]: event.target.value });
    console.log("Handle Form", formState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addHelpOption({ ...formState });
  };

  const goToNextPage = () =>{
    props.moveForward({})
  }

  useEffect(() => {
    console.log('the current helpoptions formState is', formState);
  });

  let innerElements = (
    <form action="" className='flex flex-col gap-2'>
      <div className='flex flex-col'>
        <label htmlFor="name">Our users want to help you out. What do you need?</label>
        <input type="text" name='name' onBlur={handleChange} />
      </div>
      <div className='flex flex-col'>
        <label htmlFor="description">Can you describe this task?</label>
        <textarea type="text" name='description' onBlur={handleChange} />
      </div>
      <div>
        <label>On our site users can either contribute money or time to your goal. Which one do you need to complete this task?</label>
        <select value={needPeopleSelector} onChange={updateOptionType}>
          <option value="options" disabled>Pick one...</option>
          <option value="people">Labor / Time</option>
          <option value="money">Funding</option>
        </select>
      </div>

      {needPeopleSelector === 'options' ?
        <div>
          <p>Please pick from the dropdown menu above.</p>
        </div>
        :
        <div className='flex flex-col'>
          <label htmlFor={needPeopleSelector === 'people' ? 'numOfPeople' : 'moneyRequested'}>{needPeopleSelector === 'people' ? 'How many people' : 'How much money?'}</label>
          <input type="number" name={needPeopleSelector === 'people' ? 'numOfPeople' : 'moneyRequested'} onChange={handleChange} value={formState[needPeopleSelector === 'people' ? 'numOfPeople' : 'moneyRequested']} />
        </div>
      }
      <button type='submit' onClick={handleSubmit}>Add this option!</button>
    </form>
  );



  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>How can we help? Create some options people may choose from to help make your Biiggie a reality. We recommend three in total.
        <span className='font-bold'> You currently have
          {props.helpOptions.length === 0 ? ' none set up, yet. Follow the form below to create your first option!' : ` ${props.helpOptions.length} setup.`}</span></h3>
      {innerElements}
      <button onClick={goToNextPage}>Next Step</button>
      <button onClick={props.goBack}>Previous Step</button>
    </div>
  );
};


const BiiggiePreview = (props) => {

  let fullBiiggieData = {...props.biiggie, helpOptions: [...props.helpOptions]}
  
  useEffect(()=>{
    console.log(fullBiiggieData)
  })

  const goToNextPage = () =>{
    props.moveForward({})
  }

  return (
    <div className='flex flex-col gap-2'> 
      <h1>Here's a preview of your biiggie</h1>
      <div>
        <BiiggieCard biiggie={fullBiiggieData}/>
      </div>
      <button onClick={goToNextPage}>Next Step</button>
      <button onClick={props.goBack}>Previous Step</button>
    </div>

  )
}



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
  let navigate = useNavigate()

  
  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate('/login')
    }
    console.log(biiggie);
    console.log(helpOptions);
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

  const addHelpOption = (formData) => {
    let clonedState = [...helpOptions];
    clonedState.push(formData);
    setHelpOptions(clonedState);
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
      innerForm = (<HelpOptionsForm moveForward={moveForward} goBack={goBack} helpOptions={helpOptions} addHelpOption={addHelpOption} />);
      break;
    case 6:
      innerForm = (<BiiggiePreview moveForward={moveForward} goBack={goBack} helpOptions={helpOptions} biiggie={biiggie} />);
      break;
    case 7:
      innerForm = (<div className='bg-green-700'>This is the last step. you can put a link here to send them to the homepage, or their biggie or just redirect them <button onClick={goBack}>Previous Step</button></div>);
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