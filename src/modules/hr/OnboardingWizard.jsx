import React, { useState } from "react";

// Placeholder for onboarding. Extend with document upload and more fields.
const OnboardingWizard = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [staffInfo, setStaffInfo] = useState({
    name: "",
    email: "",
    role: "",
    // Add more fields as needed
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    setStaffInfo({ ...staffInfo, [e.target.name]: e.target.value });
  };

  const handleFinish = () => {
    // TODO: Save to Firestore
    if (onComplete) onComplete(staffInfo);
  };

  return (
    <div>
      <h4>Staff Onboarding</h4>
      {step === 1 && (
        <div>
          <input
            name="name"
            value={staffInfo.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            name="email"
            value={staffInfo.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            name="role"
            value={staffInfo.role}
            onChange={handleChange}
            placeholder="Role"
          />
          {/* Add file upload for docs here */}
          <button onClick={handleBack}>Back</button>
          <button onClick={handleFinish}>Finish</button>
        </div>
      )}
    </div>
  );
};

export default OnboardingWizard;