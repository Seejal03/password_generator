import { useState,useCallback ,useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numallowed, setnum]= useState(false)
  const [charallowed, setchar]=useState(false)
  const [password, setpassword]=useState("")
  // setting empty string filhal ke liye hame values ko add krna hai yeh hum neeche dekhte hai. ham generate krayenge.default mai nhi denge isss project mai

const passwordref=useRef(null)
const copyToClip=useCallback(()=>{
  passwordref.current?.select();
  passwordref.current?.setSelectionRange(0,17)
  window.navigator.clipboard.writeText(password,length);
  
},[password])


  const passwordGenerator = useCallback(()=>{
let pass =""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm"
if(numallowed) str += "0123456789"
if(charallowed) str += "!@#$%^&*~`"
for(let i=1; i<=length; i++){
  let index=Math.floor(Math.random() * str.length + 1)
  pass+=str.charAt(index)
}
setpassword(pass)
  }, [length, numallowed, charallowed,setpassword])



  useEffect(()=>{
    passwordGenerator()
  }
  ,[length,charallowed,numallowed,passwordGenerator])
  //jab jab inn arrays ki value mai change aayega unko array mai rakhna hai 



  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-60 bg-gray-800">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg gap-1  overflow-hidden mb-10">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            // agar hame refrence dena hai toa us us field mai ref pass kr dp
            ref={passwordref}
            // abb hamare pass reference hai abb jo iss input field mai value hogi wahi copy hogi
            
        />
        <button onClick={()=>{
          copyToClip()}} className='bg-blue-500 text-white outline-none px-3'>Copy</button>
        </div>

        
        <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-1'>
        <input 
        type="range"
       min={8}
       max={16}
       value={length}
       className='cursor-pointer'
       onChange={(key)=>{
        setlength(key.target.value)
       }}
        ></input>
        <label className='text-white shadow'>Length:{length}</label>
        </div>
        <div className='flex items-center gap-1 '>
        <input 
        type="checkbox"
       defaultChecked={numallowed}
       onChange={()=>{
        setnum((prev)=>!(prev))
       }}
        ></input>
        <label className='text-white shadow' >numbers</label>
        </div>
        <div className='flex items-center gap-1 '>
        <input 
        type="checkbox"
       defaultChecked={charallowed}
       onChange={()=>{
        setchar((previous)=>!(previous))
        // previous is not a keyword here hum kuch bhi daal sakte hai iski jagah pe
       }}
        ></input>
        <label className='text-white shadow' >characters</label>
        </div>
        
        </div>
      </div>
    </>
  )
}

export default App
