import React from "react";
import { SPECIALTIES, CONSULT_TYPES, SORT_OPTIONS, FilterState } from "@/types/doctor";

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (type: keyof FilterState, value: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  // Handle consultation type change
  const handleConsultTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange("consultType", e.target.value);
  };

  // Handle specialty change
  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const specialty = e.target.value;
    
    const updatedSpecialties = e.target.checked
      ? [...filters.specialties, specialty]
      : filters.specialties.filter(item => item !== specialty);
    
    onFilterChange("specialties", updatedSpecialties);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange("sort", e.target.value);
  };

  return (
    <aside className="md:w-80 flex-shrink-0">
      <div className="bg-white rounded-lg shadow p-4 mb-4 sticky top-4">
        <h3 className="font-semibold text-lg mb-4">Filters</h3>
        
        {/* Consultation Mode Filter */}
        <div className="mb-6">
          <h4 data-testid="filter-header-moc" className="font-medium text-neutral-darkest mb-3">
            Consultation Mode
          </h4>
          <div className="space-y-2">
            {CONSULT_TYPES.map((type) => (
              <label key={type} className="flex items-center">
                <input 
                  type="radio" 
                  name="consultType" 
                  value={type} 
                  data-testid={`filter-${type.toLowerCase().replace(' ', '-')}`}
                  className="h-4 w-4 text-primary focus:ring-primary"
                  checked={filters.consultType === type}
                  onChange={handleConsultTypeChange}
                />
                <span className="ml-2 text-neutral-dark">{type}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Speciality Filter */}
        <div className="mb-6">
          <h4 data-testid="filter-header-speciality" className="font-medium text-neutral-darkest mb-3">
            Speciality
          </h4>
          <div className="max-h-64 overflow-y-auto space-y-1 pr-2">
            <div className="space-y-2">
              {SPECIALTIES.map((specialty) => {
                const testId = `filter-specialty-${specialty.replace('/', '-')}`;
                return (
                  <label key={specialty} className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="specialty" 
                      value={specialty} 
                      data-testid={testId}
                      className="h-4 w-4 rounded text-primary focus:ring-primary"
                      checked={filters.specialties.includes(specialty)}
                      onChange={handleSpecialtyChange}
                    />
                    <span className="ml-2 text-neutral-dark">{specialty}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Sort Filter */}
        <div>
          <h4 data-testid="filter-header-sort" className="font-medium text-neutral-darkest mb-3">
            Sort By
          </h4>
          <div className="space-y-2">
            {SORT_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center">
                <input 
                  type="radio" 
                  name="sortBy" 
                  value={option.value} 
                  data-testid={`sort-${option.value}`}
                  className="h-4 w-4 text-primary focus:ring-primary"
                  checked={filters.sort === option.value}
                  onChange={handleSortChange}
                />
                <span className="ml-2 text-neutral-dark">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
