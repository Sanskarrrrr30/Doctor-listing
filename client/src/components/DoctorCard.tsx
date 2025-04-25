import React from "react";
import { Doctor } from "@/types/doctor";
import { Avatar } from "@/components/ui/avatar";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  // Add null/undefined checks for all doctor properties
  const name = doctor?.name || "Unknown";
  const speciality = doctor?.speciality || [];
  const experience = doctor?.experience || 0;
  const fees = doctor?.fees || 0;
  const consultMode = doctor?.consultMode || [];
  const photo = doctor?.photo;
  
  // Generate a consistent avatar based on doctor's ID (as number)
  // Parse ID to number or use a fallback number
  const idAsNumber = parseInt(doctor?.id || "0", 10);
  const avatarIndex = idAsNumber % 5 + 1; // Ensure it cycles through 5 different avatars (1-5)
  const gender = idAsNumber % 2 === 0 ? 'men' : 'women';
  
  // Use real photo if available, otherwise use placeholder
  const avatarUrl = photo || `https://randomuser.me/api/portraits/${gender}/${avatarIndex}.jpg`;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden" data-testid="doctor-card">
      <div className="p-4 md:p-5 flex flex-col md:flex-row">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-5 flex justify-center">
          <Avatar className="w-24 h-24 md:w-28 md:h-28 border-2 border-neutral-light">
            <img
              src={avatarUrl}
              alt={`Dr. ${name}`}
              className="object-cover"
            />
          </Avatar>
        </div>
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold" data-testid="doctor-name">Dr. {name}</h3>
              <p className="text-neutral-dark mb-1" data-testid="doctor-specialty">{speciality.join(', ')}</p>
              <p className="text-neutral-dark mb-3" data-testid="doctor-experience">{experience} years experience</p>
            </div>
            <div className="mt-2 md:mt-0 md:text-right">
              <p className="font-semibold text-primary" data-testid="doctor-fee">₹{fees}</p>
              <p className="text-sm text-neutral mb-3">Consultation fee</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {consultMode.map((mode, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-neutral-lightest rounded-full flex items-center">
                {mode === 'Video Consult' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )}
                {mode}
              </span>
            ))}
          </div>
          <div className="flex mt-2 gap-2 flex-col sm:flex-row">
            <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-dark">
              Book Appointment
            </button>
            <button className="px-4 py-2 border border-primary text-primary rounded-md font-medium hover:bg-neutral-lightest">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
