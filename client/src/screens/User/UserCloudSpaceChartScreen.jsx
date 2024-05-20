import React, { useEffect, useState } from 'react';
import { CloudSpace_2 }from '../../assets/images/index'
import HeaderComponent from '../../components/HeaderComponent'
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';
import { sizeConvert } from '../../utils/sizeConvert';

const UserCloudSpaceChartScreen = () => {
  const [count, setCount] = useState(null);
  const fetchData = async() =>{
    await apiHelper.get('/api/user/myfilesize')
    .then((res)=>{
      setCount(res.data)
    }).catch((err)=>{
      toast.error(JSON.stringify(err.response.data))
    })
  }

  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div className='w-full flex flex-col gap-4  h-full'>
     
      <div className='w-full  h-full flex flex-col'>
        <div className='bg-cblack h-[7%] px-4 py-3 text-white'>
          Cloud Space
        </div>
        <div className='min-h-[10vh] max-h-[%] bg-secondary shadow-md w-full overflow-auto '>
          <div className='w-full h-full flex gap-4'>
            <div className="w-1/2 flex items-center justify-center h-full">
              <img className='h-full' src={CloudSpace_2} alt="" />
            </div>
            <div className="w-1/2 text-2xl  flex flex-col justify-center gap-4 h-full">
              <h1>Used Space : <span className='font-medium text-green-600'>{count?.KB.toFixed(4)+ ' MB'}</span></h1>
              <h1>Available Space : <span className='font-medium '>{(count?.Total - count?.KB).toFixed(4)+ ' MB'}</span></h1>
              <h1>Total Space : <span className='font-medium '>{count?.Total.toFixed(0)+ ' MB'}</span></h1>
              
            </div>


          </div>

        </div>
      </div>
    </div>
  )
}

export default UserCloudSpaceChartScreen