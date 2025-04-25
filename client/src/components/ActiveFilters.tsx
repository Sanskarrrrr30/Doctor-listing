import React from "react";
import { FilterState, FilterType, SORT_OPTIONS } from "@/types/doctor";

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveFilter: (type: keyof FilterState, value?: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onRemoveFilter }) => {
  // Check if there are any active filters
  const hasActiveFilters = 
    !!filters.search || 
    !!filters.consultType || 
    filters.specialties.length > 0 || 
    !!filters.sort;

  if (!hasActiveFilters) return null;

  // Get sort label
  const getSortLabel = (value: string) => {
    const option = SORT_OPTIONS.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {/* Search filter */}
      {filters.search && (
        <FilterPill 
          type="search" 
          label="Search" 
          value={filters.search} 
          onRemove={() => onRemoveFilter("search")} 
        />
      )}

      {/* Consultation type filter */}
      {filters.consultType && (
        <FilterPill 
          type="consultType" 
          label="Consultation" 
          value={filters.consultType} 
          onRemove={() => onRemoveFilter("consultType")} 
        />
      )}

      {/* Specialty filters */}
      {filters.specialties.map((specialty) => (
        <FilterPill 
          key={specialty}
          type="specialties" 
          label="Specialty" 
          value={specialty} 
          onRemove={() => onRemoveFilter("specialties", specialty)} 
        />
      ))}

      {/* Sort filter */}
      {filters.sort && (
        <FilterPill 
          type="sort" 
          label="Sort" 
          value={getSortLabel(filters.sort)} 
          onRemove={() => onRemoveFilter("sort")} 
          removable={true}
        />
      )}
    </div>
  );
};

interface FilterPillProps {
  type: keyof FilterState;
  label: string;
  value: string;
  onRemove: () => void;
  removable?: boolean;
}

const FilterPill: React.FC<FilterPillProps> = ({ 
  type, 
  label, 
  value, 
  onRemove, 
  removable = true 
}) => {
  return (
    <div className="inline-flex items-center bg-neutral-lightest rounded-full px-3 py-1 text-sm">
      <span className="font-medium mr-1">{label}:</span>
      <span className="text-neutral-dark">{value}</span>
      {removable && (
        <button 
          className="ml-1 text-neutral-dark hover:text-neutral-darkest" 
          onClick={onRemove}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ActiveFilters;
