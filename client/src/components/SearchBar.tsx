import React, { useState, useRef, useEffect } from "react";
import { Doctor } from "@/types/doctor";

interface SearchBarProps {
  onSearch: (query: string) => void;
  getSuggestions: (query: string) => string[];
  searchValue: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, getSuggestions, searchValue }) => {
  const [inputValue, setInputValue] = useState(searchValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update input value when searchValue changes (for URL params)
  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      const results = getSuggestions(value);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      onSearch("");
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  // Handle enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Highlight matching text in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    
    if (index >= 0) {
      const before = text.substring(0, index);
      const match = text.substring(index, index + query.length);
      const after = text.substring(index + query.length);
      
      return (
        <>
          {before}
          <strong className="text-primary">{match}</strong>
          {after}
        </>
      );
    }
    
    return text;
  };

  return (
    <div className="bg-primary py-6 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-white text-xl md:text-2xl font-bold mb-6 text-center">
          Find & Book Appointments with Top Doctors
        </h2>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              ref={inputRef}
              type="text" 
              data-testid="autocomplete-input"
              className="block w-full pl-10 pr-4 py-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary-light" 
              placeholder="Search doctors by name..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => inputValue.trim() && setSuggestions(getSuggestions(inputValue)) && setShowSuggestions(true)}
            />
          </div>
          
          {showSuggestions && suggestions.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  data-testid="suggestion-item"
                  className="p-3 cursor-pointer hover:bg-neutral-lightest"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {highlightMatch(suggestion, inputValue)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
