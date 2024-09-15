import Loader from "@/app/loader";
import Link from "next/link";
import React, { Suspense } from "react";

async function getVehicleModels(makeId, year) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vehicle models");
  }

  const data = await res.json();

  // Check if results are available
  if (!data.Results || data.Results.length === 0) {
    throw new Error("No models found for the selected make and year.");
  }

  return data.Results;
}

// Component to display a list of vehicle models
function ModelList({ models }) {
  return (
    <div>
      <Link href="/" className="p-2 bg-blue-500 text-white rounded">
        Back
      </Link>
      <ul className="space-y-2 mt-4">
        {models.map((model) => (
          <li key={model.Model_ID} className="border p-4 rounded bg-gray-50">
            {model.Model_Name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Wrapper component for loading vehicle models
async function ModelListWrapper({ makeId, year }) {
  try {
    const models = await getVehicleModels(makeId, year);
    return <ModelList models={models} />;
  } catch (error) {
    return <div>{error.message}</div>;
  }
}

// Main component for the result page
export default function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Vehicle models for ID {makeId} and year {year}
      </h1>
      {/* Using Suspense for loading vehicle models */}
      <Suspense fallback={<Loader />}>
        <ModelListWrapper makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}

// Generate static parameters for pre-rendering pages
export async function generateStaticParams() {
  // Fetch the list of vehicle makes
  const res = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const data = await res.json();
  const makes = data.Results;

  // Generate paths for each make with years from 2015 to the current year
  const paths = makes.flatMap((make) => {
    return Array.from({ length: 10 }, (_, i) => {
      const year = 2015 + i;
      return {
        makeId: String(make.MakeId),
        year: String(year),
      };
    });
  });

  return paths;
}
