import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './views/component/ThemeContext';
import UserProfile from './views/component/Admin/UserProfile'
import AddDepartment from './views/component/Department/AddDepartment'
import AddEmployee from './views/component/Employee/AddEmployee'
import AddAreaWard from './views/component/Location/AddAreaWard'
import AddComplaint from './views/component/Complaint/AddComplaint'
import SignIn from './views/component/SignIn'
import TopNavbar from './views/component/TopNavbar'
import Footer from './views/component/Footer'
import AddResource_Tool_Vehicle from './views/component/Resource_Tool_Vehicle/AddResource_Tool_Vehicle'
import ResourceToolVehicleList from './views/component/Resource_Tool_Vehicle/ResourceToolVehicleList';
import AddNgo from './views/component/NGO/AddNgo';
import NgoList from './views/component/NGO/NgoList';

function App() {

  return (
    <>
      <ThemeProvider>
        <TopNavbar/>
        {/* <UserProfile /> */}
        {/* <AddDepartment/> */}
        {/* <AddEmployee/> */}
        {/* <AddAreaWard/> */}
        {/* <AddComplaint/> */}
        {/* <SignIn /> */}
        {/* <AddResource_Tool_Vehicle/> <ResourceToolVehicleList/> */}

        <AddNgo/> <NgoList/>
        <Footer/>
      </ThemeProvider>
      
    </>
  )
}

export default App
