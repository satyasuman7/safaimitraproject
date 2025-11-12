import React from 'react'
import { useTheme } from '../../component/ThemeContext.jsx';

export default function AddDeptWorker() {
  const { darkMode } = useTheme();
  return (
    <>
      <div className="container-fluid my-5" data-bs-theme={darkMode ? 'dark' : 'light'}>
        <div class="card">
          <div class="card-body">
            <form action="">
              <div className="row p-3">
                <div className="col-md-4 col-sm-12 col-12 mb-4">
                  <input type="text" placeholder='Name' name='name' className='form-control'/>
                </div>

                <div className="col-md-4 col-sm-12 col-12 mb-4">
                  <input type="text" placeholder='Email' name='email' className='form-control'/>
                </div>

                <div className="col-md-4 col-sm-12 col-12 mb-4">
                  <input type="number" placeholder='Mobile No.' name='mobile' className='form-control'/>
                </div>

                <div className="col-md-12 col-sm-12 col-12 mb-4">
                  <textarea name="location" placeholder='Location' className='form-control'></textarea>
                </div>

                <div className="col-md-3 col-sm-12 col-12 mb-4">
                  <input type="number" name="pincode" placeholder='Pincode' className='form-control' />
                </div>

                <div className="col-md-3 col-sm-12 col-12 mb-4">
                  <select name="" id=""></select>
                </div>
                
                <div className="col-md-3 col-sm-12 col-12 mb-4"></div>

                <div className="col-md-3 col-sm-12 col-12 mb-4"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
