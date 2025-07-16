import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const languages = [
  { code: "en", name: "English", flag: "/united-states.svg" },
  { code: "es", name: "Spanish", flag: "/public/spain.svg" },
  { code: "de", name: "German", flag: "/public/germany.svg" },
  { code: "ja", name: "Japanese", flag: "/public/japan.svg" },
  { code: "fr", name: "French", flag: "/public/france.svg" },
];

const SignIn = () => {
  const [selected, setSelected] = useState(languages[0]);

  const handleSelect = (lang) => {
    setSelected(lang);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          {/* PRODUCTIVE INFORMATION */}
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="feature-section text-center p-3 mt-4">
              <img src="/20944201.png" alt="Interview Illustration" className="img-fluid mb-4" style={{ maxWidth: "400px" }} />

              <h2 className="fw-bold mb-3">Fast, Efficient and Productive</h2>

              <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
                In this kind of post, <NavLink to="#" className="link-primary text-decoration-none">the blogger</NavLink> introduces a person they’ve
                interviewed and provides some background information about{" "}
                <NavLink to="#" className="link-primary text-decoration-none">the interviewee</NavLink> and their work.
                Following this is a transcript of the interview.
              </p>
            </div>
          </div>

          {/* SIGNIN FORM */}
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-5 ">
            <div className="card p-4 d-flex align-items-center " >
              <div className="col-8">
                <div className="text-center mb-4">
                  <h2 className="card-title mb-2">Sign In</h2>
                  <span className="mb-2 text-secondary">Your Social Campaigns</span>
                </div>

                <div className="d-flex align-items-center my-4">
                  <div className="flex-grow-1 border-top"></div>
                  <span className="px-3 text-muted small">Or with email</span>
                  <div className="flex-grow-1 border-top"></div>
                </div>

                <form action="" style={{ marginBottom: '11rem' }}>
                  <div className="mb-3">
                    <input type="email" className="form-control p-2" id="email" placeholder="Enter email" />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control p-2" id="password" placeholder="Enter password" />
                  </div>
                  <div className='d-flex justify-content-end mb-3'>
                    <NavLink to="#">Forgot Password?</NavLink>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 p-2">Sign In</button>
                </form>

                <div className='d-flex justify-content-between align-items-center mt-4'>
                  <div className="dropup">
                    <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={selected.flag} alt={selected.name} className="flag-icon" />{selected.name}
                    </button>
                    <ul className="dropdown-menu shadow-sm">
                      {languages.map((lang) => (
                        <li key={lang.code}>
                          <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => handleSelect(lang)}>
                            <img src={lang.flag} alt={lang.name} className="flag-icon" />{lang.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <NavLink to="#" className="text-decoration-none me-3">Terms</NavLink>
                    <NavLink to="#" className="text-decoration-none me-3">Plans</NavLink>
                    <NavLink to="#" className="text-decoration-none">Contact Us</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
