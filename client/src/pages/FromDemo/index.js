import React, { useState, useEffect } from "react";

const FirstStep = (props) => {
  let [formState] = useState({
    title: 'This is an example',
    description: 'This is an example description. Lorem ipsum'
  })
  
  return(
    <div className='bg-red-50 flex flex-col gap-2'>
      Tell us about your biiggie
      <label htmlFor="">ENTER BIGGIE TITILE</label>
      <input type="text"/>
      <label htmlFor="">ENTER BIGGIE DESCRIPTION</label>
      <input type="text" />
      <button onClick={()=>{props.moveForward({...formState})}}>SUBMIT (Move onto next form)</button>
    </div>
  )
}

const SecondStep = (props) => {
  let [formState] = useState({
    deadline: new Date(),
    images: ['image1', 'image2']
  })
  
  return(
    <div className='bg-blue-50 flex flex-col gap-2'>
      when does it need to be done?
      <label htmlFor="">ENTER BIGGIE DEADLINE</label>
      <input type="text" />
      <label htmlFor="">ENTER BIGGIE IMAGES</label>
      <input type="text" />
      <button  onClick={props.goBack}>GO BACK (Move onto next form)</button>
      <button onClick={()=>{props.moveForward(formState)}}>SUBMIT (Move onto next form)</button>
    </div>
  )
}

const ThirdStep = (props) => {
  let [formState] = useState({
    keywords: ['fake key word', 'another one']
  })
  
  return(
    <div className='bg-yellow-50 flex flex-col gap-2'>
      Enter some keywords 
      <label htmlFor="">ENTER BIGGIE Kewords</label>
      <input type="text" />
      <button  onClick={props.goBack}>GO BACK (Move onto next form)</button>
      <button onClick={()=>{props.moveForward(formState)}}>SUBMIT (Move onto next form)</button>
    </div>
  )
}




const TestForm = () => {

  let [stepState, setStepState] = useState(
    {
      currentStep: 1
    }
  )
  let [biiggie, setBiiggie] = useState({
    title: '',
    description: '',
    deadline: 0,
    images: [],
    keywords: []
  })
  // let [helpOptions, setHelpOptions] = useState([])

  useEffect(()=>{
    console.log(biiggie)
  })


  const moveForward = (formData) => {
    let clonedState = {...stepState}
    let nextStep = clonedState.currentStep + 1


    setBiiggie({...biiggie, ...formData})
    setStepState({currentStep: nextStep})
  }

  const goBack = () => {
    let clonedState = {...stepState}
    let nextStep = clonedState.currentStep - 1


    setStepState({currentStep: nextStep})
  }

  switch (stepState.currentStep) {
    case 1:
      return (<FirstStep moveForward={moveForward}/>)
    case 2:
      return (<SecondStep moveForward={moveForward} goBack={goBack}/>)
    case 3:
      return (<ThirdStep moveForward={moveForward} goBack={goBack}/>)
    case 4:
      return (<div className='bg-green-700'>This is the last step. you can put a link here to send them to the homepage, or their biggie or just redirect them</div>)  
    
    default:
      break;
  }
}

export default TestForm