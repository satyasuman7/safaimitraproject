import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// ROUTING
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// PrimeReact core
import 'primereact/resources/themes/lara-light-blue/theme.css';

// TOASTR
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

// DARK MODE
import { ThemeProvider } from './views/component/ThemeContext.jsx'

// PAGES FOR EMPLOYEE-COMPONENT
import Error404 from './views/component/Error404.jsx'
import SignIn from './views/component/SignIn.jsx'
import { Dashboard } from './views/component/Dashboard/Dashboard.jsx'
import SidebarEmp from './views/EmployeesComponent/SidebarEmp.jsx'
import DashboardEmp from './views/EmployeesComponent/Components/DashboardEmp.jsx'
import Attendence from './views/EmployeesComponent/Components/Attendence.jsx'
import RoadCleanReport from './views/EmployeesComponent/Components/RoadCleanReport.jsx'
import ReportPartyWaste from './views/EmployeesComponent/Components/ReportPartyWaste.jsx'
// import ConservancyReport from './views/EmployeesComponent/Components/ConservancyReport.jsx'
// import CommercialCleaning from './views/EmployeesComponent/Components/CommercialCleaning.jsx'
import CndWaste from './views/EmployeesComponent/Components/CndWaste.jsx'
import GarbageSpotted from './views/EmployeesComponent/Components/GarbageSpotted.jsx'
// import BagSale from './views/EmployeesComponent/Components/BagSale.jsx'
import MoKhataSale from './views/EmployeesComponent/Components/MoKhataSale.jsx'

//PAGES FOR DEPARTMENT-COMPONENT
// import SidebarDept from './views/DepatmentComponent/SidebarDept.jsx'
// import DashboardDept from './views/DepatmentComponent/components/DashboardDept.jsx'
// import DepartmentWorker from './views/DepatmentComponent/components/DepartmentWorker.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path='/app' element={<App />} />
        {/* <Route path='/verify-otp' element={<OtpVerification/>} /> */}
        <Route path='*' element={<Error404 />} />
        <Route path='/login' element={<SignIn />} />

        <Route path='/' element={<SidebarEmp />}>
          <Route index element={<DashboardEmp />} />
          <Route path='/employee/attendence' element={<Attendence />} />
          <Route path='/employee/roadcleanreport' element={<RoadCleanReport />} />
          <Route path='/employee/reportpartywaste' element={<ReportPartyWaste />} />
          {/* <Route path='/employee/conservancylanereport' element={<ConservancyReport />} />
          <Route path='/employee/commercialcleaningreport' element={<CommercialCleaning />} /> */}
          <Route path='/employee/cndwaste' element={<CndWaste />} />
          <Route path='/employee/garbagespotted' element={<GarbageSpotted />} />
          {/* <Route path='/employee/bagsale' element={<BagSale />} /> */}
          <Route path='/employee/mokhatasale' element={<MoKhataSale/>}/>
        </Route>

        {/* <Route path='/dept' element={<SidebarDept />}>
          <Route index element={<DashboardDept/>}/>
          <Route path='/dept/departworker' element={<DepartmentWorker/>} />
        </Route> */}
      </Routes>
      <ToastContainer theme="colored" transition={Flip}/>
    </ThemeProvider>
  </BrowserRouter>
)
