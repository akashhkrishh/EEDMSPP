import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { apiHelper } from '../../utils/apiHandler';


const UserUploadScreen = () => {
    const navigate = useNavigate();
    const [isUploaded,setUploaded] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState(null);
    const [ipaddress, setIP] = useState('');
    const fetchIP = async () => {
      await fetch('https://api.ipify.org/?format=json').then((res) => {
        return res.json();
      }).then((data) => {
          setIP(data)
      })
    }
    const [formData, setForm] = useState({
      miningkeyword:'',
      secretkey:'',
    })
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
          setFileContent(e.target.result);
      };
      reader.readAsText(file);

    };
    useEffect(() => {
      fetchIP();
    }, [])


  const handleSubmit = async() =>{
    
    if(selectedFile == null){
      return toast.error('please select the file!')
    }
    if(formData.miningkeyword == '' || formData.secretkey == ''){
      return toast.error('fill all the fields!')
    }
    let ip = ipaddress.ip
    if(ipaddress == null){
      ip = ' '
    }
    try {

      const form = new FormData();
      form.append('file', selectedFile);
      form.append('keyword', formData.miningkeyword);
      form.append('secretkey', formData.secretkey);
      form.append('ipaddress', ip);
      await apiHelper.post('/api/user/fileupload', form, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      }).then(response => {
          toast.success('File Encrypted successfully!');
          navigate("/dashboard/users/uploadchart")
        
      })
  }
  catch (error) {
    navigate("/dashboard/users/uploadchart")
    toast.error(error.response.data.message);
  }
    
  }
  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <div className='w-full shadow-md  bg-secondary flex flex-col'>
        <div className='bg-cblack px-4 py-3 text-white'>
          File Upload
        </div>
        <div className='min-h-[20vh] bg-secondary p-4 flex flex-col gap-4'>
          <div className='w-full flex gap-4'>
            <label className='py-3 min-w-32' htmlFor="file">Load File</label>
            <input className='py-3 bg-white cursor-pointer w-[30vw] px-4 border' onChange={handleFileChange} type="file" name="file" id="file" />
          </div>
      
          <div className='w-full flex gap-4'>
            <label className='py-3 min-w-32' htmlFor="miningkeyword">Mining Keyword</label>
            <input className='py-3 w-[30vw] outline-none px-4 border' onChange={handleChange} type="text" name="miningkeyword" id="miningkeyword" />
          </div>
          <div className='w-full flex gap-4'>
            <label className='py-3 min-w-32' htmlFor="secretkey">Secret Key</label>
            <input className='py-3 w-[30vw] outline-none px-4 border' onChange={handleChange} type="text" name="secretkey" id="secretkey" />
          </div>
          <div className='w-full flex gap-4'>
            <button onClick={handleSubmit} className='bg-green-600 hover:bg-green-800 text-white py-2 px-4'>Upload</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default UserUploadScreen