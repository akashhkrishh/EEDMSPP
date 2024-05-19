import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import UserLayout from './layouts/UserLayout'
import ServerLayout from './layouts/ServerLayout'
import RootHomeScreen from './screens/RootHomeScreen';
import RootUserScreen from './screens/RootUserScreen';
import RootServerScreen from './screens/RootServerScreen';
import Dashboard from './screens/Dashboard';
import RootAttackerScreen from './screens/RootAttackerScreen';
import UserHomeScreen from './screens/User/UserHomeScreen';
import UserUploadScreen from './screens/User/UserUploadScreen'
import UserCloudSpaceChartScreen from './screens/User/UserCloudSpaceChartScreen';
import UserCloudStorageChartScreen from './screens/User/UserCloudStorageChartScreen';
import UserUploadChartScreen from './screens/User/UserUploadChartScreen';
import ServerHomeScreen from './screens/Server/ServerHomeScreen';
import ServerAttacksListScreen from './screens/Server/ServerAttacksListScreen';
import ServerDataOwnersScreen from './screens/Server/ServerDataOwnersScreen';
import ServerUploadedFilesScreen from './screens/Server/ServerUploadedFilesScreen';
import ServerFileStatusScreen from './screens/Server/ServerFileStatusScreen'


const App = () => {
  return (
    <>
      <Toaster position='top-center'/>
      <Routes>
        <Route path='/' element={<RootLayout/>}>
          <Route index element={<RootHomeScreen/>}/>
          <Route path='/users' element={<RootUserScreen/>} />
          <Route path='/server' element={<RootServerScreen/>} />
          <Route path='/attacker' element={<RootAttackerScreen/>} />
        </Route>
        <Route path='/dashboard'>
          <Route index element={<Dashboard/>} />
          <Route path='/dashboard/users' element={<UserLayout/>}>
            <Route index element={<UserHomeScreen/>} />
            <Route path='/dashboard/users/fileupload' element={<UserUploadScreen/>} />
            <Route path='/dashboard/users/uploadchart' element={<UserUploadChartScreen/>} />
            <Route path='/dashboard/users/cloudspacechart' element={<UserCloudSpaceChartScreen/>} />
            <Route path='/dashboard/users/cloudstoragechart' element={<UserCloudStorageChartScreen/>} />
          </Route>
          <Route path='/dashboard/server' element={<ServerLayout/>}>
            <Route index element={<ServerHomeScreen/>} />
            <Route path='/dashboard/server/uploadedfiles' element={<ServerUploadedFilesScreen/>} />
            <Route path='/dashboard/server/dataowners' element={<ServerDataOwnersScreen/>} />
            <Route path='/dashboard/server/attacks' element={<ServerAttacksListScreen/>} />
            <Route path='/dashboard/server/graph' element={<ServerFileStatusScreen/>} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App