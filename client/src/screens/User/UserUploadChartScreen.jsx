import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent'
import { apiHelper } from '../../utils/apiHandler';
import { formatDateTime } from '../../utils/timeUtils';
import ReactModal from 'react-modal';
import { Download, X } from 'lucide-react';
import toast from 'react-hot-toast';

const UserUploadChartScreen = () => {
  const [uploadData, setData] = useState([]);
  const [isViewModel,setViewModel] = useState(false);
  const [isDetails, setDetails] = useState(false);
  const [fileId, setFileID] = useState(null);
  const [attackfile, setAttackFile] = useState(null);
  const [secretkey,setKey] = useState(null);
  const [fileContent,setContent] = useState(null)
  const handleView = async() =>{
    setContent(null)
    await apiHelper.post('/api/user/decrypt',{
      secretkey:secretkey,
      fileid:fileId,
    }).then((res)=>{
      setContent(res.data)
      toast.success("Decryption Successful")
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  }
  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([fileContent.fileContent], { type: fileContent.type });
    element.href = URL.createObjectURL(file);
    element.download = fileContent.name;
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
    setFileID(null)
    setKey(null)
    setContent(null)
    setViewModel(false)
  };
  const fetchData = async() =>{
    await apiHelper.get('/api/user/myfiles').then((res)=>{setData(res.data)});
  }
  const fetchAttackDetails = async(id) =>{
    setDetails(true)
    await apiHelper.post('/api/user/attackfiles',{
      fileid:id
    }).then((res)=>{
      setAttackFile(res.data)
    })
  }
  useEffect(()=>{
    fetchData();
  },[]);

  return (
    <>
    <div className='flex h-full bg-secondary shadow-md p-4 w-full'>
      <div className="flex flex-col w-full">
        <div className="-m-1.5 overflow-auto ">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">#</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">File name</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Keyword</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">File size</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">

                  {
                    uploadData.map((items, index) => {
                      return (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index+1}</td>
                          
                      
                          
                          <td className="px-6 max-w-[350px] truncate py-4 whitespace-nowrap text-sm text-gray-800">{items.name}</td> 
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{items.keyword}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{(items.size/1024).toFixed(4)+ ' kb'}</td>
                          
                          <td className={`flex items-center justify-center px-4 py-4 whitespace-nowrap text-sm text-gray-800`}>
                            {
                              (items.isAttacked == 'safe') &&
                                <span className='text-green-600 px-2 '>Uploaded</span>
                            }
                            {
                              (items.isAttacked == 'corrupted') &&
                                <span className='text-yellow-600  px-2 '>Corrupted Owner</span>
                            }
                            {
                              (items.isAttacked == 'attacked') && 
                                <span className='text-red-600 px-2 '>File Attacked</span> 
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.isAttacked == 'corrupted'? '---':formatDateTime(items.createdAt).date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.isAttacked == 'corrupted'? '---':formatDateTime(items.createdAt).time}</td>
                          <td className="px-6 py-4 font-medium flex items-center justify-center whitespace-nowrap text-sm text-gray-800">
                            {
                              (items.isAttacked == 'safe') 
                              && <button onClick={()=>{
                                setViewModel(true)
                                
                                setFileID(items._id)
                              }} className='text-white px-6 py-1 bg-cblack hover:bg-black'>View</button>
                            }
                            {
                              (items.isAttacked == 'attacked') 
                              && <button onClick={()=>{fetchAttackDetails(items._id)
                                
                              }} className='text-white px-4 py-1 bg-red-600 hover:bg-red-800'>Details</button>
                            }
                            {
                              (items.isAttacked == 'corrupted') 
                              && <button disabled className='text-gray-600 px-4 py-1 bg-primary '>Denied</button>
                            }
                            
                          </td> 

                        </tr>
                      );
                    })
                  }



                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
    <ReactModal 
    className={'w-screen flex items-center bg-primary justify-center h-screen'} 
    isOpen={isViewModel} 
    >
    <div className='w-[500px] h-[300px] flex-col flex gap-4 bg-secondary shadow-xl'>
      <div className='flex justify-between  bg-cblack text-white'>
        <p className='py-3 px-4'>{"File View "}</p>
        <button onClick={()=>{
          setViewModel(false)
          setFileID(null)
          setKey(null)
          setContent(null)
        }} className='py-3 px-4 hover:text-red-600'><X/></button>
      </div>
      <div className=' h-full w-full p-4 flex flex-col gap-4'>
        <div className=' w-full flex flex-col gap-2'>
            <label className='' htmlFor="secretkey">Secret Key</label>
            <input onChange={(e)=>setKey(e.target.value)} className='py-3  focus:border-cblack flex-1 outline-none px-4 border'  type="text" name="secretkey" id="secretkey"/>
          </div>
          <div className='flex gap-4'>
            <button  onClick={handleView} className='p-2 font-medium min-w-[100px] bg-green-600 text-white'>View</button>
            {
              fileContent != null && 
              <button onClick={downloadFile} className='p-2 font-medium min-w-[100px] flex gap-2 items-center bg-blue-600 text-white'><Download size={20}/>Download</button>
            }
          </div>
      </div>
      
    </div>
    </ReactModal>
    <ReactModal 
    className={'w-screen flex items-center bg-primary justify-center h-screen'} 
    isOpen={isDetails} 
    >
    <div className='w-[500px] h-[300px] flex-col flex gap-4 bg-secondary shadow-xl'>
      <div className='flex justify-between  bg-cblack text-white'>
        <p className='py-3 px-4'>{"Attack Details "}</p>
        <button onClick={()=>{
         setDetails(false)
         setAttackFile(null)
        }} className='py-3 px-4 hover:text-red-600'><X/></button>
      </div>
      <div className=' h-full w-full p-4 flex flex-col gap-4'>
        <h1>Filename : <span className='text-xl font-semibold text-red-500'>{attackfile?.file?.name}</span></h1>
        <h1>IP Address : <span className='text-xl font-semibold text-red-500'>{attackfile?.ipaddress}</span></h1>
        <h1>Hackername : <span className='  text-red-500'>{attackfile?.hackername}</span></h1>
        <h1>Message : <span className='  text-red-500'>{attackfile?.message}</span></h1>
        <h1 className='flex gap-2'>Date & Time :  <span className='  text-red-500 flex gap-2'>
          <p>{formatDateTime(attackfile?.createdAt).date}</p>
          
        {formatDateTime(attackfile?.createdAt).time}
        </span></h1>
       
        
     
        
      </div>
      
    </div>
    </ReactModal>
    </>
  )
}

export default UserUploadChartScreen