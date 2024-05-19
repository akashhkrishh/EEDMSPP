import React, { useEffect, useState } from 'react'
import {apiHelper}from '../../utils/apiHandler'
const ServerAttacksListScreen = () => {
  const [attackData, setData] = useState([]);
  const fetchData = async() =>{
    await apiHelper.get('/api/server/attacklist').then((res)=>{setData(res.data)});
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return (
    <div className='flex h-full bg-secondary shadow-md p-4 w-full'>
      <div className="flex flex-col w-full">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">#</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">File Name</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Hacker Name</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Ip address</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">message</th>
            

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">

                  {
                    attackData.map((items, index) => {
                      return (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index+1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{items.file?.name}</td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.hackername}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{items.ipaddress}</td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.message}</td>

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
  )
}

export default ServerAttacksListScreen