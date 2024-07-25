import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Create a context for managing company-related state and actions
const CompanyContext = createContext();

// Base API URL; falls back to localhost if importMeta is not defined
const apiUrl =
  typeof importMeta !== "undefined"
    ? importMeta.env.VITE_API_URL
    : "http://localhost:5001";

// Initial state for the company context
const initialState = {
  companies: [], // List of companies
  company: null, // Currently selected company
  locations: [], // List of locations for a company
  loading: false, // Loading state indicator
  error: null, // Error message, if any
};

// Reducer function to handle state changes based on actions
const companyReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_COMPANIES_REQUEST":
    case "FETCH_COMPANY_REQUEST":
    case "FETCH_LOCATIONS_REQUEST":
      return { ...state, loading: true, error: null }; // Set loading state and clear errors
    case "FETCH_COMPANIES_SUCCESS":
      return { ...state, loading: false, companies: action.payload }; // Update companies data and clear loading
    case "FETCH_COMPANY_SUCCESS":
      return { ...state, loading: false, company: action.payload }; // Update selected company data and clear loading
    case "FETCH_LOCATIONS_SUCCESS":
      return { ...state, loading: false, locations: action.payload }; // Update locations data and clear loading
    case "FETCH_COMPANIES_FAILURE":
    case "FETCH_COMPANY_FAILURE":
    case "FETCH_LOCATIONS_FAILURE":
      return { ...state, loading: false, error: action.payload }; // Set error message and clear loading
    default:
      return state; // Return current state if action type is not recognized
  }
};

// Provider component to wrap the part of the app that needs access to company context
export const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  // Function to fetch companies with optional search query
  const fetchCompanies = useCallback(async (searchQuery = "") => {
    dispatch({ type: "FETCH_COMPANIES_REQUEST" });
    try {
      const response = await axios.get(`${apiUrl}/companies`, {
        params: { search: searchQuery },
      });
      dispatch({ type: "FETCH_COMPANIES_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "FETCH_COMPANIES_FAILURE",
        payload: error.response ? error.response.data.error : "Network error",
      });
    }
  }, []);

  // Function to fetch a single company by its ID
  const fetchCompany = useCallback(async (companyId) => {
    dispatch({ type: "FETCH_COMPANY_REQUEST" });
    try {
      const response = await axios.get(`${apiUrl}/company/${companyId}`);
      dispatch({ type: "FETCH_COMPANY_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "FETCH_COMPANY_FAILURE",
        payload: error.response ? error.response.data.error : "Network error",
      });
    }
  }, []);

  // Function to fetch locations for a specific company by its ID
  const fetchLocations = useCallback(async (companyId) => {
    dispatch({ type: "FETCH_LOCATIONS_REQUEST" });
    try {
      const response = await axios.get(
        `${apiUrl}/company/${companyId}/locations`
      );
      dispatch({ type: "FETCH_LOCATIONS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "FETCH_LOCATIONS_FAILURE",
        payload: error.response ? error.response.data.error : "Network error",
      });
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      state,
      fetchCompanies,
      fetchCompany,
      fetchLocations,
    }),
    [state, fetchCompanies, fetchCompany, fetchLocations]
  );

  // Provide the context to child components
  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
};

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children prop is required and is a valid React node
};

// Custom hook to use company context
export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};
