import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import PropTypes from "prop-types";

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
    case "FETCH_COMPANY_REQUEST":
    case "FETCH_LOCATIONS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_COMPANIES_SUCCESS":
      return { ...state, loading: false, companies: action.payload };
    case "FETCH_COMPANY_SUCCESS":
      return { ...state, loading: false, company: action.payload };
    case "FETCH_LOCATIONS_SUCCESS":
      return { ...state, loading: false, locations: action.payload };
    case "FETCH_COMPANIES_FAILURE":
    case "FETCH_COMPANY_FAILURE":
    case "FETCH_LOCATIONS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialState);

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

  const contextValue = useMemo(
    () => ({
      state,
      fetchCompanies,
      fetchCompany,
      fetchLocations,
    }),
    [state, fetchCompanies, fetchCompany, fetchLocations]
  );

  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
};

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};
