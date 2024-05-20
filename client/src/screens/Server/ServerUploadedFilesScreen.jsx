import React, { useEffect, useState } from 'react'
import { formatDateTime } from '../../utils/timeUtils'
import { apiHelper } from '../../utils/apiHandler';

const ServerUploadedFilesScreen = () => {
  const [uploadData, setData] = useState([]);
  const fetchData = async() =>{
    await apiHelper.get('/api/server/allfilelist').then((res)=>{setData(res.data)});
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
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Owner</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">File name</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Keyword</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">File size</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Time</th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">

                  {
                    uploadData.map((items, index) => {
                      return (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index+1}</td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{ items.isAttacked == 'corrupted'? '---':items.owner.name}</td>
                          
                          <td className="px-6 py-4 whitespace-nowrap max-w-[350px] truncate text-sm text-gray-800">{items.name}</td> 
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
                                <span className='text-red-600 px-2 '>Attacked</span> 
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.isAttacked == 'corrupted'? '---':formatDateTime(items.createdAt).date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{items.isAttacked == 'corrupted'? '---':formatDateTime(items.createdAt).time}</td>
                         

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

export default ServerUploadedFilesScreen