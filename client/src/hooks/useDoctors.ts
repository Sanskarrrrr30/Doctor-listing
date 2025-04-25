import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import { Doctor, ApiDoctor, FilterState, CONSULT_TYPES } from "@/types/doctor";
import { useLocation, useSearch } from "wouter";

// API URL for fetching doctor data
const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

// Helper function to transform API data to our app structure
const transformApiResponse = (apiDoctors: ApiDoctor[]): Doctor[] => {
  return apiDoctors.map(apiDoctor => {
    // Extract years from experience string (e.g., "13 Years of experience" => 13)
    const experienceMatch = apiDoctor.experience.match(/(\d+)/);
    const experienceYears = experienceMatch ? parseInt(experienceMatch[1], 10) : 0;
    
    // Extract fee amount from fees string (e.g., "₹ 500" => 500)
    const feesMatch = apiDoctor.fees.match(/(\d+)/);
    const feeAmount = feesMatch ? parseInt(feesMatch[1], 10) : 0;
    
    // Extract specialities as array of strings
    const specialities = apiDoctor.specialities.map(s => s.name);
    
    // For demo, randomly assign consultation modes
    // In a real app, this would come from the API
    const randomConsultMode = [];
    if (Math.random() > 0.5) randomConsultMode.push(CONSULT_TYPES[0]);
    if (Math.random() > 0.3) randomConsultMode.push(CONSULT_TYPES[1]);
    
    // If no consult modes were randomly assigned, add at least one
    if (randomConsultMode.length === 0) {
      randomConsultMode.push(CONSULT_TYPES[Math.floor(Math.random() * CONSULT_TYPES.length)]);
    }
    
    return {
      id: apiDoctor.id,
      name: apiDoctor.name.replace('Dr. ', ''), // Remove 'Dr.' prefix if present
      speciality: specialities,
      consultMode: apiDoctor.consultMode || randomConsultMode,
      experience: experienceYears,
      fees: feeAmount,
      photo: apiDoctor.photo,
      languages: apiDoctor.languages
    };
  });
};

export const useDoctors = () => {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  
  // Initialize filter state from URL parameters
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    consultType: searchParams.get("consultType") || "",
    specialties: searchParams.getAll("specialty") || [],
    sort: searchParams.get("sort") || ""
  });

  // Fetch doctors data
  const { data: apiDoctors = [], isLoading, error } = useQuery<ApiDoctor[]>({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      return response.json();
    }
  });

  // Transform API data to our app structure
  const doctors = useMemo(() => {
    return transformApiResponse(apiDoctors);
  }, [apiDoctors]);

  // Apply filters to doctors list
  const filteredDoctors = useMemo(() => {
    if (!doctors.length) return [];

    let result = [...doctors];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply consultation type filter
    if (filters.consultType) {
      result = result.filter(doctor => 
        doctor.consultMode.includes(filters.consultType)
      );
    }

    // Apply specialty filters
    if (filters.specialties.length > 0) {
      result = result.filter(doctor => 
        filters.specialties.some(specialty => 
          doctor.speciality.includes(specialty)
        )
      );
    }

    // Apply sorting
    if (filters.sort) {
      switch (filters.sort) {
        case "fees":
          result.sort((a, b) => a.fees - b.fees);
          break;
        case "experience":
          result.sort((a, b) => b.experience - a.experience);
          break;
      }
    }

    return result;
  }, [doctors, filters]);

  // Get search suggestions
  const getSearchSuggestions = (query: string): string[] => {
    if (!query || !doctors.length) return [];
    
    const normalizedQuery = query.toLowerCase();
    return doctors
      .filter(doctor => doctor.name.toLowerCase().includes(normalizedQuery))
      .slice(0, 3) // Limit to top 3 suggestions
      .map(doctor => doctor.name);
  };

  // Update URL parameters based on filters
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) {
      params.append("search", filters.search);
    }
    
    if (filters.consultType) {
      params.append("consultType", filters.consultType);
    }
    
    filters.specialties.forEach(specialty => {
      params.append("specialty", specialty);
    });
    
    if (filters.sort) {
      params.append("sort", filters.sort);
    }
    
    const newUrl = `${params.toString() ? '?' + params.toString() : ''}`;
    
    // Update URL without re-rendering
    window.history.pushState(null, '', newUrl);
  }, [filters, setLocation]);

  // Update filters
  const updateFilter = (type: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Remove filter
  const removeFilter = (type: keyof FilterState, value?: string) => {
    setFilters(prev => {
      if (type === "specialties" && value) {
        return {
          ...prev,
          specialties: prev.specialties.filter(item => item !== value)
        };
      }
      
      return {
        ...prev,
        [type]: type === "specialties" ? [] : ""
      };
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      search: "",
      consultType: "",
      specialties: [],
      sort: ""
    });
  };

  return {
    doctors: filteredDoctors,
    allDoctors: doctors,
    isLoading,
    error,
    filters,
    updateFilter,
    removeFilter,
    clearAllFilters,
    getSearchSuggestions
  };
};
