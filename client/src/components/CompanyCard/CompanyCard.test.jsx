import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";

const mockCompanyData = {
  company_id: 1,
  name: "TechNova Solutions",
  address: "123 Innovation Drive, San Francisco, CA 94105",
  latitude: 37.7749,
  longitude: -122.4194,
};

describe("CompanyCard", () => {
  it("renders the company name", () => {
    const { getByText } = render(<CompanyCard companyData={mockCompanyData} />);
    expect(getByText("TechNova Solutions")).toBeInTheDocument();
  });

  it("renders the company address", () => {
    const { getByText } = render(<CompanyCard companyData={mockCompanyData} />);
    expect(
      getByText("123 Innovation Drive, San Francisco, CA 94105")
    ).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <CompanyCard companyData={mockCompanyData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
