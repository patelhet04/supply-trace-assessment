import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CompanyList from "./CompanyList";
import { CompanyProvider } from "../../context/CompanyContext";
import axios from "axios";

jest.mock("axios");

const mockCompanies = [
  {
    company_id: 1,
    name: "TechNova Solutions",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    latitude: 37.7749,
    longitude: -122.4194,
  },
];

describe("CompanyList", () => {
  it("renders company cards", async () => {
    axios.get.mockResolvedValueOnce({ data: mockCompanies });

    const { getByText } = render(
      <Router>
        <CompanyProvider>
          <CompanyList />
        </CompanyProvider>
      </Router>
    );

    await waitFor(() => {
      expect(getByText("TechNova Solutions")).toBeInTheDocument();
    });
  });

  //   it("renders loading state", async () => {
  //     axios.get.mockImplementationOnce(() => new Promise(() => {})); // Never resolves

  //     render(
  //       <Router>
  //         <CompanyProvider>
  //           <CompanyList />
  //         </CompanyProvider>
  //       </Router>
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByText("Loading...")).toBeInTheDocument();
  //     });
  // Add more assertions for loading state if needed
  //   });

  it("renders error state", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    const { getByText } = render(
      <Router>
        <CompanyProvider>
          <CompanyList />
        </CompanyProvider>
      </Router>
    );

    await waitFor(() => {
      expect(
        getByText("Error loading data: Network error")
      ).toBeInTheDocument();
      // Add assertions for error state if you have error handling UI
    });
  });
});
