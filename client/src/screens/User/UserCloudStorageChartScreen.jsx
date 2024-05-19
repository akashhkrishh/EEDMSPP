import React, { useEffect, useState } from 'react'
import GraphComponent from '../../components/GraphComponent'
import { apiHelper } from '../../utils/apiHandler';

const UserCloudStorageChartScreen = () => {
  const [dataFile, setData] = useState(null);
  const getData = async() =>{
    await apiHelper.get('/api/user/myfileData').then((res)=>setData(res.data))
  } 
  useEffect(()=>{
    getData()
  },[])
  const data = {
    labels: dataFile?.fileName,
    datasets: [
      {
        label: 'My File',
        backgroundColor: '#407BFF',
        borderColor: '#407BFF',
        borderWidth: 1,
        hoverBackgroundColor: '#407BFF',
        hoverBorderColor: '#407BFF',
        data: dataFile?.fileSize,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'File Size ( kb )',
        }
      },
      x: {
        title: {
          display: true,
          text: 'File Name',
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    }
  };

  return (
    <div className='w-full h-full flex justify-center items-center  bg-white shadow-md p-4'>
     {
      dataFile != null &&
      <GraphComponent graphData={data}  options={options} type={"bar"} />
     }
    </div>
  )
}

export default UserCloudStorageChartScreen