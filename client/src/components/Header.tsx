import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">MediConnect</h1>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-neutral-dark hover:text-primary">Home</a>
          <a href="#" className="text-neutral-dark hover:text-primary">Appointments</a>
          <a href="#" className="text-neutral-dark hover:text-primary">Health Records</a>
          <a href="#" className="text-primary font-medium">Find Doctors</a>
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-neutral-lightest">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
