import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const CompanyContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  companies: [],
  company: null,
  locations: [],
  loading: false,
  error: null,
};

const companyReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_COMPANIES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_COMPANIES_SUCCESS":
      return { ...state, loading: false, companies: action.payload };
    case "FETCH_COMPANIES_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_COMPANY_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_COMPANY_SUCCESS":
      return { ...state, loading: false, company: action.payload };
    case "FETCH_COMPANY_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_LOCATIONS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_LOCATIONS_SUCCESS":
      return { ...state, loading: false, locations: action.payload };
    case "FETCH_LOCATIONS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  // Function to fetch companies with optional search query
  const fetchCompanies = useCallback(async (searchQuery = "") => {
    dispatch({ type: "FETCH_COMPANIES_REQUEST" });
    try {
      const response = await axios.get(apiUrl + "/companies", {
        params: { search: searchQuery },
      });
      dispatch({ type: "FETCH_COMPANIES_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_COMPANIES_FAILURE", payload: error.message });
    }
  }, []);

  // Function to fetch company by ID
  const fetchCompany = async (companyId) => {
    dispatch({ type: "FETCH_COMPANY_REQUEST" });
    try {
      const response = await axios.get(apiUrl + `/company/${companyId}`);
      dispatch({ type: "FETCH_COMPANY_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_COMPANY_FAILURE", payload: error.message });
    }
  };

  // Function to fetch locations for a company
  const fetchLocations = async (companyId) => {
    dispatch({ type: "FETCH_LOCATIONS_REQUEST" });
    try {
      const response = await axios.get(
        apiUrl + `/company/${companyId}/locations`
      );
      dispatch({ type: "FETCH_LOCATIONS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_LOCATIONS_FAILURE", payload: error.message });
    }
  };

  return (
    <CompanyContext.Provider
      value={{ state, fetchCompanies, fetchCompany, fetchLocations }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => useContext(CompanyContext);
