import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_1234";
const TEMPLATE_ID = "template_p1rr1el";
const PUBLIC_KEY = "JZkCd3W0tiObHbs8A";

export const sendOtp = async (email, name) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const params = {
    to_email: email,
    // to_name: name || "User",
    to_name: name,
    otp_code: otp,
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);

  localStorage.setItem("emailOtp", otp); // Store OTP locally
  return otp;
};

export const verifyOtp = (enteredOtp) => {
  const storedOtp = localStorage.getItem("emailOtp");
  return enteredOtp === storedOtp;
};
