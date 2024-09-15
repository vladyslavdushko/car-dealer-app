"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function FilterPage() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Function to get the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  // Function to fetch vehicle makes from the API
  useEffect(() => {
    async function fetchMakes() {
      const res = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const data = await res.json();
      setMakes(data.Results);
    }
    fetchMakes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <main>
        <h1 className="text-2xl font-bold mb-4">Car Dealer Filter</h1>
        {/* Vehicle makes selector */}
        <div className="mb-4">
          <label htmlFor="make" className="block mb-2">
            Select Vehicle Make:
          </label>
          <select
            id="make"
            className="border p-2 rounded w-full"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">Select a make</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>
        {/* Model year selector */}
        <div className="mb-4">
          <label htmlFor="year" className="block mb-2">
            Select Model Year:
          </label>
          <select
            id="year"
            className="border p-2 rounded w-full"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select a year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {/* "Next" button */}
        <div>
          <Link href={`/result/${selectedMake}/${selectedYear}`} passHref>
            <button
              className={`p-2 bg-blue-500 text-white rounded ${
                !selectedMake || !selectedYear
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!selectedMake || !selectedYear}
            >
              Next
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
