import { FormEvent, useState } from 'react'
import AccountForm from "./AccountForm"
import AddressForm from "./AddressForm"
import NameForm from "./NameForm"
import useForm from "./useForm"

type isPopup = {
  isPopup: boolean
}

type FormData = {
  firstName: string,
  lastName: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  email: string,
  password: string,
  userName: string
}
const STARTING_DATA: FormData = {
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  password: '',
  userName: ''
}

export default function Form({ isPopup }: isPopup){
  const [ data, setData ] = useState(STARTING_DATA)

  function updateFields(fieldsData: Partial<FormData>){
    setData(prevData => {
      return {...prevData, ...fieldsData}
    })
  }
  const { steps, currentStepIndex, step, isNotFirstStep, isLastStep, back, next } = useForm([
    <NameForm {...data} updateField={updateFields} isPopup={isPopup}/>, 
    <AddressForm {...data} updateField={updateFields} isPopup={isPopup}/>, 
    <AccountForm {...data} updateField={updateFields} isPopup={isPopup}/>
  ])

  function onSubmit(e: FormEvent){
    e.preventDefault()
    if(!isLastStep) return next()
    alert("Finished form! Check console for data")
    console.log(data)
  }

  return(
    <div className="relative bg-white border h-80 w-80 border-black pt-8 px-8 mx-4 mt-8 rounded-lg">
      <form onSubmit={onSubmit}>
        <div className='absolute top-2 right-2'>
          {currentStepIndex + 1}/{steps.length}
        </div>
        {step}
        
        <div className='m-4 flex justify-end gap-2'>
          {isNotFirstStep && <button onClick={back} type='button' className='absolute bottom-4 right-24 border-black border px-4 rounded-md text-sm hover:text-white hover:bg-highlightRed'>Back</button>}
          <button type='submit' className='absolute bottom-4 right-4 border-black border px-4 rounded-md text-sm hover:text-white hover:bg-highlightRed'>{isLastStep ?'Finish' : 'Next'}</button>
          
        </div>
      </form>
    </div>
  )
}