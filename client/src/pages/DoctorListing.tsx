import React from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import DoctorCard from "@/components/DoctorCard";
import ActiveFilters from "@/components/ActiveFilters";
import { useDoctors } from "@/hooks/useDoctors";

const DoctorListing: React.FC = () => {
  const { 
    doctors, 
    isLoading, 
    error, 
    filters, 
    updateFilter, 
    removeFilter, 
    clearAllFilters,
    getSearchSuggestions
  } = useDoctors();

  return (
    <div className="font-sans bg-neutral-lightest min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Search Container */}
      <SearchBar 
        onSearch={(query) => updateFilter("search", query)} 
        getSuggestions={getSearchSuggestions}
        searchValue={filters.search}
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Panel */}
          <FilterPanel filters={filters} onFilterChange={updateFilter} />
          
          {/* Doctor List */}
          <div className="flex-grow">
            {/* Active Filters */}
            <ActiveFilters filters={filters} onRemoveFilter={removeFilter} />
            
            {/* Results Count */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-neutral-darkest">
                {doctors.length} Doctors Available
              </h2>
            </div>
            
            {/* Loading State */}
            {isLoading && (
              <div className="py-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neutral-light border-t-primary"></div>
                <p className="mt-2 text-neutral-dark">Loading doctors...</p>
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                Unable to load doctor data. Please try again later.
              </div>
            )}
            
            {/* Doctor Cards */}
            {!isLoading && !error && doctors.length > 0 && (
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
            
            {/* No Results State */}
            {!isLoading && !error && doctors.length === 0 && (
              <div className="py-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-neutral-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-2 text-neutral-dark text-lg">No doctors found matching your criteria</p>
                <button 
                  className="mt-3 text-primary hover:text-primary-dark font-medium"
                  onClick={clearAllFilters}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-neutral-light mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-neutral">
            <p>© 2023 MediConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DoctorListing;
