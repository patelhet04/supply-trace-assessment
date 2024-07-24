import React from "react";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import "./companylist.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
const CompanyList = () => {
  const companies = [
    {
      company_id: 1,
      companyName: "Tech Innovators Inc.",
      address: "123 Silicon Valley, CA",
      about: "Leading tech solutions provider",
    },
    {
      company_id: 2,
      companyName: "Green Energy Ltd.",
      address: "456 Greenway Blvd, TX",
      about: "Sustainable energy solutions",
    },
    {
      company_id: 3,
      companyName: "Fintech Solutions",
      address: "789 Finance St, NY",
      about: "Revolutionizing financial services",
    },
    {
      company_id: 4,
      companyName: "Health First Co.",
      address: "101 Wellness Rd, FL",
      about: "Innovative health products",
    },
    {
      company_id: 5,
      companyName: "Creative Designs",
      address: "202 Artistry Ave, CA",
      about: "Leading graphic design firm",
    },
    {
      company_id: 6,
      companyName: "EcoBuilders",
      address: "303 Eco Park, WA",
      about: "Eco-friendly construction solutions",
    },
    {
      company_id: 7,
      companyName: "Future Robotics",
      address: "404 Robotics Ln, MA",
      about: "Advanced robotics and automation",
    },
    {
      company_id: 8,
      companyName: "Urban Agriculture Co.",
      address: "505 Green Thumb Blvd, IL",
      about: "Innovative urban farming solutions",
    },
    {
      company_id: 9,
      companyName: "Smart Home Tech",
      address: "606 Home Comfort Dr, OR",
      about: "Cutting-edge smart home devices",
    },
    {
      company_id: 10,
      companyName: "Digital Media Hub",
      address: "707 Media Ave, NV",
      about: "Next-gen media and entertainment",
    },
    {
      company_id: 11,
      companyName: "AeroDynamics",
      address: "808 Flight Path Rd, CO",
      about: "Innovative aerospace engineering",
    },
    {
      company_id: 12,
      companyName: "Oceanic Ventures",
      address: "909 Sea View Blvd, HI",
      about: "Marine exploration and technology",
    },
    {
      company_id: 13,
      companyName: "Precision Analytics",
      address: "1010 Data St, MD",
      about: "Advanced data analysis and insights",
    },
    {
      company_id: 14,
      companyName: "NextGen Apparel",
      address: "1111 Fashion Ave, NY",
      about: "Modern fashion and textiles",
    },
    {
      company_id: 15,
      companyName: "Quantum Computing Corp.",
      address: "1212 Quantum Dr, TX",
      about: "Pioneering quantum computing solutions",
    },
  ];

  return (
    <>
      <h1>Browse Companies</h1>
      <SearchBar />
      <div className="company-container">
        {companies.map((company) => (
          <Link
            key={company.company_id}
            to={`/company/${company.company_id}`}
            className="company-link"
            style={{ textDecoration: "none" }}
          >
            <CompanyCard companyData={company} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default CompanyList;
