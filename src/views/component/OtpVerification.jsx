import React, { useState } from "react";
import { verifyOtp } from "../../api";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (verifyOtp(fullOtp)) {
      alert("✅ Email OTP verified successfully!");
      // redirect or continue
    } else {
      alert("❌ Invalid OTP");
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-box">
        <h4>Verify</h4>
        <p>Code sent to: {localStorage.getItem("email")}</p>

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input key={index} id={`otp-${index}`} type="text" className="otp-input" maxLength="1" value={digit} onChange={(e) => handleChange(e.target.value, index)} />
            ))}
          </div>

          <button type="submit" className="verify-btn">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
