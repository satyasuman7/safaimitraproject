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
import AddEnforcement from './views/component/EnforcementCase/AddEnforcement';
import EnforcementList from './views/component/EnforcementCase/EnforcementList';
// import Sidebar from './views/component/Sidebar';
import { Dashboard } from './views/component/Dashboard/Dashboard';
import UnassignedTicket from './views/component/TicketManagement/unassignedTicket';
// import Table2 from './views/component/Table2';



function App() {

  return (
    <>
      <ThemeProvider>
        {/* <Sidebar/> */}
        {/* <TopNavbar/> */}
        {/* <Dashboard/> */}
        {/* <UserProfile /> */}
        {/* <AddDepartment/> */}
        {/* <AddEmployee/> */}
        {/* <AddAreaWard/> */}
        {/* <AddComplaint/> */}
        {/* <SignIn /> */}
        {/* <AddResource_Tool_Vehicle/> <ResourceToolVehicleList/> */}

        {/* <AddNgo/> <NgoList/> */}
        {/* <AddEnforcement/> */}
        {/* <EnforcementList/> */}
        {/* <Table2/> */}
        <UnassignedTicket/>
        {/* <Footer/> */}


      </ThemeProvider>
      
    </>
  )
}

export default App
