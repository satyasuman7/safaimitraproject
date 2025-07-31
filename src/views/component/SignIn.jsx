import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useActionState } from 'react'; // ✅ React 19 feature
import { toast } from 'react-toastify';

const languages = [
  { code: "en", name: "English", flag: "/united-states.svg" },
  { code: "es", name: "Spanish", flag: "/spain.svg" },
  { code: "de", name: "German", flag: "/germany.svg" },
  { code: "ja", name: "Japanese", flag: "/japan.svg" },
  { code: "fr", name: "French", flag: "/france.svg" },
];

const SignIn = () => {
  const [selected, setSelected] = useState(languages[0]);

  const handleSelect = (lang) => {
    setSelected(lang);
  };

  // ✅ useActionState hook for handling form submission
  const [state, submitAction, isPending] = useActionState(async (prevState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    // Simulating login request (replace with real API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "admin@techzex.com" && password === "123456") {
      return toast.success("Login successful!");
    } else {
      return toast.error("Invalid email or password");
    }
  }, { success: null, message: "" });

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
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-5">
            <div className="card p-4 d-flex align-items-center">
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

                {/* ✅ Form with useActionState */}
                <form action={submitAction} style={{ marginBottom: '11rem' }}>
                  <div className="mb-3">
                    <input type="email" name="email" className="form-control p-2" placeholder="Enter email" required />
                  </div>
                  <div className="mb-3">
                    <input type="password" name="password" className="form-control p-2" placeholder="Enter password" required />
                  </div>
                  <div className='d-flex justify-content-end mb-3'>
                    <NavLink to="#">Forgot Password?</NavLink>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 p-2" disabled={isPending}>
                    {isPending ? "Signing in..." : "Sign In"}
                  </button>
                </form>

                <div className='d-flex justify-content-between align-items-center mt-4'>
                  <div className="dropup">
                    <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={selected.flag} alt={selected.name} className="flag-icon" />{selected.name}
                    </button>
                    <ul className="dropdown-menu shadow-sm">
                      {languages.map((lang) => (
                        <li key={lang.code}>
                          <button className="dropdown-item d-flex align-items-center gap-2" type="button" onClick={() => handleSelect(lang)}>
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
  );
};

export default SignIn;
