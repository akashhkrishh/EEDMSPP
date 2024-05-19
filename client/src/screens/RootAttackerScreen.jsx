import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { apiHelper } from '../utils/apiHandler'
import { useNavigate } from 'react-router-dom'
const RootAttackerScreen = () => {
  const navigate = useNavigate()
  const [ipaddress, setIP] = useState('');
  const [fileDetails, setFile] = useState(null);
  const [formData, setForm] = useState({
    hackername:'',
    message:'',
    username:'',
    keyword:'',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const searchFile = async() =>{
    await apiHelper.post('/api/attacker/search',{
      keyword:formData.keyword,
      username: formData.username,
    }).then((res)=>{
      setFile(res.data);
      toast.success("File Found")

    }).catch((err)=>{
  
      toast.error(err.response.data.message);
    })
  }
  const handleSubmit = async () => {
    
    if(fileDetails == null || formData.hackername == '' || ipaddress == '' || formData.message == ''){
      return  toast.error("Must fill all the field!");
    }
    await apiHelper.post('/api/attacker/attack',{
      fileid:fileDetails.fileid,
      hackername: formData.hackername,
      ipaddress:ipaddress.ip,
      message:formData.message
    }).then((res)=>{
      toast.success("Attack Performed");
      navigate('/')

    }).catch((err)=>{
      toast.error(err.response.data.message);
      navigate('/')
    })
  }
  const fetchIP = async () => {
    await fetch('https://api.ipify.org/?format=json').then((res) => {
      return res.json();
    }).then((data) => {
        setIP(data)
    })
  }
  useEffect(() => {

    fetchIP();
  }, [])

  return (
    <div className='h-full w-full flex flex-col gap-4 '>
      <div>
        <div className='capitalize bg-cblack px-4 py-3 w-full text-white'>
          Attack the File
        </div>
        <div className='w-full bg-secondary justify-evenly shadow-md p-4 flex gap-6 '>
          <div className='w-2/5 flex gap-4'>
            <label className='py-3 ' htmlFor="username">Owner Name</label>
            <input className='py-3 focus:border-cblack flex-1 outline-none px-4 border' placeholder='username' type="text" name="username" id="username" onChange={handleChange} />
          </div>
          <div className=' w-2/5 flex gap-4'>
            <label className='py-3 ' htmlFor="keyword">Keyword</label>
            <input className='py-3  focus:border-cblack flex-1 outline-none px-4 border' placeholder='keyword' type="text" name="keyword" id="keyword" onChange={handleChange} />
          </div>
          <div className='w-1/5 flex gap-4'>
            <button onClick={searchFile} className='bg-green-600 flex-1 hover:bg-green-800 text-white py-2 px-4'>Search</button>
          </div>
        </div>
      </div>
      {
      fileDetails&&

      <div className='w-full flex flex-1  gap-4 '>
        <div className='border w-1/3 h-full flex flex-col gap-4'>
          <div className=' bg-secondary w-full  shadow-md '>
            <div className='capitalize bg-cblack px-4 py-3 w-full text-white'>
              File Details
            </div>
            <div className='w-full h-full border flex flex-col gap-2 p-4'>
                <h1>IP Address : <span className='font-medium text-lg text-red-600'>{!ipaddress ?'Connection Lost':ipaddress.ip}</span> </h1>
                <h1>User name : <span className='font-medium text-lg'>{formData.hackername}</span> </h1>
                <h1>File name : <span className='font-medium text-lg'>{fileDetails.filename}</span></h1>
                <h1>Owner name : <span className='font-medium text-lg'>{formData.username}</span></h1>
                <h1>Message : <span className='font-medium text-lg'>{formData.message}</span></h1>
            </div>
          </div>
          <div className='h-1/2 flex-1 space-y-4 shadow-md p-4 bg-secondary w-full'>
          <div className=' w-full flex flex-col gap-2'>
            <label className='' htmlFor="hackername">User Name</label>
            <input className='py-3  focus:border-cblack flex-1 outline-none px-4 border' placeholder='mr.hacker' type="text" name="hackername" id="hackername" onChange={handleChange}/>
          </div>
          <div className=' w-full flex flex-col gap-2'>
            <label className='' htmlFor="message">Message</label>
            <input className='py-3  focus:border-cblack flex-1 outline-none px-4 border' placeholder='write any ...' type="text" name="message" id="message" onChange={handleChange}/>
          </div>
          <button onClick={handleSubmit} className='bg-red-600 flex-1 hover:bg-red-800 text-white py-2 px-4'>Attack</button>
          </div>

        </div>
        <div className='p-4 break-words bg-white shadow-md text-cblack w-2/3 overflow-auto h-[76vh]'>
          <p className='w-full font-mono h-full overflow-auto'>
          {fileDetails.fileContent}
          {fileDetails.fileContent}
          </p>
          

        </div>
      </div>
      }
    </div>
  )
}

export default RootAttackerScreen