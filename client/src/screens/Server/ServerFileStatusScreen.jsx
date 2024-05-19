import React, { useEffect, useState } from 'react'
import GraphComponent from '../../components/GraphComponent';
import { apiHelper } from '../../utils/apiHandler';

const ServerFileStatusScreen = () => {
    const [count,setCount] = useState(null);
    const fetchData = async() =>{
        await apiHelper.get('/api/server/count').then((res)=>setCount(res.data.count))
    }
    useEffect(()=>{
        fetchData()
    },[])
    console.log(count)
    const data = {
        labels: ['','Safe','Corrupted','Attacked',''],
        datasets: [
          {
            label: 'Uploaded File',
            backgroundColor: [
                '',
                'rgb(22 163 74)',
                'rgb(202 138 4)',
                'rgb(220 38 38)',
                ''
              ],
              borderColor: [
                '',
                'rgb(22 163 74)',
                'rgb(202 138 4)',
                'rgb(220 38 38)',
                ''
              ],
            borderWidth: 1,
            data: count,
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
        <div className='w-full h-full text-red-600 flex justify-center items-center  bg-white shadow-md p-4'>
            {
                count&&
         <GraphComponent graphData={data}  options={options} type={"bar"} />
            }
        </div>
      )
}

export default ServerFileStatusScreen