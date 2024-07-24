import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

const CompanyContext = createContext();

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

  const fetchCompanies = async () => {
    dispatch({ type: "FETCH_COMPANIES_REQUEST" });
    try {
      const response = await axios.get("http://127.0.0.1:5000/companies");
      dispatch({ type: "FETCH_COMPANIES_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_COMPANIES_FAILURE", payload: error.message });
    }
  };

  const fetchCompany = async (companyId) => {
    dispatch({ type: "FETCH_COMPANY_REQUEST" });
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/company/${companyId}`
      );
      dispatch({ type: "FETCH_COMPANY_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_COMPANY_FAILURE", payload: error.message });
    }
  };

  const fetchLocations = async (companyId) => {
    dispatch({ type: "FETCH_LOCATIONS_REQUEST" });
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/company/${companyId}/locations`
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
