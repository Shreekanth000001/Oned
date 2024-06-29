import React, { useState,useEffect } from 'react';

function Alert({ message, bgcolor,newRandomNo }) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setShowAlert(true);
  }, [newRandomNo]);
  return (
    <>
      {showAlert && (
        <div id="alert" className={`flex items-center p-4 mb-4 text-black rounded-lg bg-${bgcolor}`} role="alert">
          <div className="ms-3 text-sm font-medium text-text-purple">
            {message}
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 inline-flex items-center justify-center h-8 w-8"
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default Alert;
