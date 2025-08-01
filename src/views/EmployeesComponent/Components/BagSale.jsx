import React from 'react'

export default function BagSale() {
  return (
    <>
      <div className="container-fluid my-4">
        <h1 className='mb-3'>Bag Sale</h1>

        <form action="">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-12">
              <label className='mb-2 ms-1'>Buyer Name</label>
              <input type="text" name="buyer_name" className="form-control" placeholder="Enter Buyer Name" />
            </div>

            <div className="col-md-6 col-sm-12 col-12">
              <label className='mb-2 ms-1'>Contact Number</label>
              <input type="text" name="contact_number" className="form-control" placeholder="Enter Buyer Name" />
            </div>

            <div>
              <button className='btn btn-success mt-4 w-25' type='submit'>Submit</button> 
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
