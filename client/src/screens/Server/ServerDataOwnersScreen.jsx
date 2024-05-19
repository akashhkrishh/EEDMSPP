import React, { useEffect, useState } from 'react'
import { formatDateTime } from '../../utils/timeUtils'
import { apiHelper } from '../../utils/apiHandler';

const ServerDataOwnersScreen = () => {
  const [userData, setData] = useState([]);
  const fetchData = async() =>{
    await apiHelper.get('/api/server/userlist').then((res)=>{setData(res.data)});
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
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Username</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Gender</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Place</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Pincode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">

                  {
                    userData.map((items, index) => {
                      return (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index+1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{items.name}</td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{'@'+items.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.email}</td>
                         
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{items.gender}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.place}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.pincode}</td>

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

export default ServerDataOwnersScreen