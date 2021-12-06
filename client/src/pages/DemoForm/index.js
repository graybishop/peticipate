import { useEffect, useState } from "react";
// import { useMutation } from "@apollo/client";
// import { CREATE_BIIGGIE } from '../../utils/mutations';
import { DateTime } from "luxon";
import BiiggieCard from "../HomePage/BiiggieCard.js";
import auth from "../../utils/auth.js";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { CREATE_BIIGGIE } from '../../utils/mutations';
import { Link } from "react-router-dom";
import honeycombImage from "../../assets/images/hex-bg-5.png";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const FirstStep = (props) => {
  let [formState, setFormState] = useState({
    title: '',
    description: ''
  });

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.moveForward({ ...formState });
  };


  return (    
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>Every<span className='font-extrabold text-orange-primary'> Biiggie</span> starts with a great name and a great story.<br></br>
      Make sure yours are descriptive <em>and</em> interesting.<br></br><br></br></h3>
      <form action="" className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label htmlFor="title" className='text-xl'>What would you like to call your <span className='font-extrabold text-orange-primary'> Biiggie</span>?<br></br><span className='text-base'><em>(40 characters max.)</em></span></label>
          <input className="custom-inputs" type="text" maxLength="40" name='title' onBlur={handleChange} defaultValue={props.biiggie.title} />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="" className='text-xl'><br></br>What's your<span className='font-extrabold text-orange-primary'> Biiggie</span> story?<br></br><span className='text-base'>Now, it's time to tell the world why your<span className='font-extrabold text-orange-primary'> Biiggie</span>  dreams should come true. <br></br>Are you changing the world? Your community? Why and how? <br></br>Why are you the most qualified person to lead this effort? Provide details about everything that you are bringing to the table: What kind of resources and hours are you personally going to invest? Do you have anything to offer to contributors in exchange for their support?</span></label>
          <textarea className="custom-inputs" name='description' onBlur={handleChange} defaultValue={props.biiggie.description} />
        </div>
        <button type='submit' onClick={handleSubmit} className='bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg text-center hover:bg-orange-hover'>Next Step: Deadline</button>
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
          <label htmlFor="deadline">How much time do you have to collect your resources and get started?<br></br>We <em>strongly</em> recommend the shortest timeframe possible. Only in extraordinary circumstances should you have a completion date more than 60 days out. Work fast and work hard to keep excitement and momentum building for your campaign.</label>
          <input className="custom-inputs" type="date" name='deadline' onBlur={handleChange} defaultValue={DateTime.fromMillis(props.biiggie.deadline).toISODate()} />
        </div>
        <button type='submit' onClick={handleSubmit} className='bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg text-center hover:bg-orange-hover'>Next Step: Add Picture</button>
        <button onClick={props.goBack} className='text-orange-primary bg-white p-4 rounded-lg shadow font-semibold text-lg border border-orange-primary text-center hover:text-orange-hover'>Previous Step: Name &amp; Story</button>
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.moveForward({ ...formState });
  };


  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>The<span className='font-extrabold text-orange-primary'> Biiggie</span> Picture</h3>
      <form action="" className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label htmlFor="images">As the saying goes, "A picture is worth a thousand words." On<span className='font-extrabold text-orange-primary'> Biiggie</span>, a picture is often worth thousands of likes and sometimes dollars, too. Choose your image very carefully!<br></br>You must enter a URL address for the image you want to use. Usually, the simplest way to do this is to right-click your mouse on the image you want to use, and select "Copy Image Link." You can then paste it into the blank field below.</label>
          <input className="custom-inputs" type="text" name='images' onBlur={handleChange} defaultValue={props.biiggie.images[0]} />
        </div>
        <button type='submit' onClick={handleSubmit} className='bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg text-center hover:bg-orange-hover'>Next Step: Choose Keyword</button>
        <button onClick={props.goBack} className='text-orange-primary bg-white p-4 rounded-lg shadow font-semibold text-lg border border-orange-primary text-center hover:text-orange-hover'>Previous Step: Deadline</button>
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.moveForward({ ...formState });
  };


  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>If you had to describe your <span className='font-extrabold text-orange-primary'> Biiggie</span> in one word, what would it be?</h3>
      <form action="" className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label htmlFor="keywords">Please choose one word or short phrase that will help potential contributors find your <span className='font-extrabold text-orange-primary'> Biiggie</span> when searching.<br></br><span className='text-base'><em>(i.e. Music, Science, Education, Politics, Issues, Business)</em></span></label>
          <input className="custom-inputs" type="text" name='keywords' onBlur={handleChange} defaultValue={props.biiggie.keywords[0]} />
        </div>
        <button type='submit' onClick={handleSubmit} className='bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg text-center hover:bg-orange-hover'>Next Step: Find Contributors</button>
        <button onClick={props.goBack} className='text-orange-primary bg-white p-4 rounded-lg shadow font-semibold text-lg border border-orange-primary text-center hover:text-orange-hover'>Previous Step: Add Picture</button>
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
  let [visible, setVisible] = useState(false);

  const updateOptionType = (event) => {
    setNeedPeopleSelector(event.target.value);
    setFormState({ ...formState, numOfPeople: null, moneyRequested: null });
  };

  const handleChange = (event) => {
    if (event.target.name === 'numOfPeople' || event.target.name === 'moneyRequested') {
      setFormState({ ...formState, [event.target.name]: Number(event.target.value) });
      return;
    }
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();    
    console.log(event);
    event.target.parentElement.reset();
    props.addHelpOption({ ...formState });
    setNeedPeopleSelector("options")
    if (!visible) {
      show()
    } else {
      hide()
    }
  };

  const goToNextPage = () => {
    props.moveForward({});
  };

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  
  let innerElements = (
    <form action="" className='flex flex-col gap-2'>
      <div className='flex flex-col'>
        <label htmlFor="name">Give a brief description of what your project needs.<br></br><span className='text-base'><em>(i.e. Volunteers, Financing, Graphic Designer, Legal Advice)</em></span></label>
        <input id="help-title" className="custom-inputs" type="text" name='name' onBlur={handleChange} />
      </div>
      <div className='flex flex-col'>
        <label htmlFor="description"><br></br>Now, provide exact details: How much money? How many hours? How about a job description? Are you providing a reward or compensation of any kind in exchange for help? <br></br>The more descriptive you are, the more likely you are to get candidates. Sometimes clarifying what you DON'T need and setting clear boundaries is more important than anything else.</label>
        <textarea id="help-description" className="custom-inputs" type="text" name='description' onBlur={handleChange} />
      </div>
      <div>
        <label><br></br>Is this option a request for money or time/labor?</label>
        <select id ="people-selector" className="h-10 ml-6 pl-3 pr-6 text-base bg-orange-light border rounded-lg focus:ring-2" value={needPeopleSelector} onChange={updateOptionType} >
          <option value="options" disabled>Pick one...</option>
          <option value="people">Labor / Time</option>
          <option value="money">Funding</option>
        </select>
      </div>

      {needPeopleSelector === 'options' ?
        <div>
        </div>
        :
        <div className='flex flex-col'>
          <label htmlFor={needPeopleSelector === 'people' ? 'numOfPeople' : 'moneyRequested'}>{needPeopleSelector === 'people' ? 'How many people' : 'How much money?'}</label>
          <input id="quantity" className="custom-inputs" type="number" name={needPeopleSelector === 'people' ? 'numOfPeople' : 'moneyRequested'} onChange={handleChange} value={formState[needPeopleSelector === 'people' ? 'numOfPeople' : 'moneyRequested']} />
        </div>
      }
      
      <Tippy  theme={"light"} content="Support option added! To add another option, complete the form and click here again. When finished, click the 'Next Step' button to finalize." visible={visible} onClickOutside={hide}>
        <button type='submit' onClick={handleSubmit} id="add-option-button" className='bg-blue-nav-button text-white p-4 my-14 rounded-lg shadow font-semibold text-lg text-center hover:bg-blue-hover'>Add This Option!</button>
      </Tippy>

    </form>
  );

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>It's recruitment time! Let's get some help!<br></br>Now you'll create some options people can choose from to help make your<span className='font-extrabold text-orange-primary'> Biiggie</span> a reality. We recommend three or more.
        <span className='font-bold'><br></br><br></br>You currently have
          {props.helpOptions.length === 0 ? ' NONE set up, yet. Simply answer the questions below, select the correct type of support for this option, and then click the "Add This Option" button to add your first option!' : ` ${props.helpOptions.length} options setup. To add more options, complete the form and click the "Add This Option" button again. When finished, click the "Next Step" button to finalize.`}<br></br><br></br></span></h3>
      {innerElements}
      <button onClick={goToNextPage} className='bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg text-center hover:bg-orange-hover'>Next Step: Final Review</button>
      <button onClick={props.goBack} className='text-orange-primary bg-white p-4 rounded-lg shadow font-semibold text-lg border border-orange-primary text-center hover:text-orange-hover'>Previous Step: Choose Keyword</button>
    </div>
  );
};


const BiiggiePreview = (props) => {

  let fullBiiggieData = { ...props.biiggie, helpOptions: [...props.helpOptions] };

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xl'>You did it! The future's already looking so bright!<br></br>Now, introducing... <em>Your</em><span className='font-extrabold text-orange-primary'> Biiggie</span>!</h3>
      <div>
        <p>
          Take some time to check for any errors and make sure you've included every support option you need to succeed. When you're ready, then publish this beautiful baby!<br></br>Wishing you all the<span className='font-extrabold text-orange-primary'> Biiggie</span> Blessings!
        </p>
      </div>
      <div className="mt-4">
        <BiiggieCard biiggie={fullBiiggieData} />
      </div>
      <button onClick={props.submitBiiggie} className='bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg text-center hover:bg-orange-hover'>Next Step: Publish My<span className='font-extrabold'> Biiggie</span>!</button>
      <button onClick={props.goBack} className='text-orange-primary bg-white p-4 rounded-lg shadow font-semibold text-lg border border-orange-primary text-center hover:text-orange-hover'>Previous Step: Add Another Support Option</button>
    </div>

  );
};

const ConfirmationPage = ({ newBiiggieId }) => {



  return (
    <div className='flex flex-col gap-2'>
      <h1><span className='font-extrabold text-orange-primary'> Biiggie</span> Created!</h1>
      <p>Here is a link to your new<span className='font-extrabold text-orange-primary'> Biiggie</span>!</p>
      <Link to={`/biiggie/${newBiiggieId}`}>Link</Link>
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
  let [newBiiggieId, setNewBiiggieId] = useState('');

  let navigate = useNavigate();

  const [createBiiggie] = useMutation(CREATE_BIIGGIE);


  const submitBiiggie = async (event) => {
    event.preventDefault();
    let fullBiiggieData = { ...biiggie, helpOptions: [...helpOptions] };
    try {
      let newBiiggie = await createBiiggie({
        variables: {
          ...fullBiiggieData,
        },
      });
      setNewBiiggieId(newBiiggie.data.createBiiggie._id);
      moveForward({});
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate('/login');
    }
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
      innerForm = (<BiiggiePreview moveForward={moveForward} goBack={goBack} helpOptions={helpOptions} biiggie={biiggie} submitBiiggie={submitBiiggie} />);
      break;
    case 7:
      innerForm = (<ConfirmationPage newBiiggieId={newBiiggieId} />);
      break;

    default:
      break;
  }


  return (
    
      <div className='bg-body-background-blue'>
        <section className=' bg-top bg-cover' style={{ backgroundImage: `url(${honeycombImage})` }}>
        <div className='container mx-auto flex flex-col px-4'>
          <h1 className='text-4xl font-semibold py-8'>It's time for <em>your</em><span className='font-extrabold text-orange-primary'> Biiggie</span>!</h1>
          <div>
            {innerForm}
          </div>

        </div>
        </section>
      </div>
  );


};

export default DemoForm;