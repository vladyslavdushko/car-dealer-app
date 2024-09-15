**Overview**

The Car Dealer App is a Next.js application that allows users to filter vehicles by make and model year. Users can select a vehicle make and model year from dropdowns and navigate to a results page that displays available models for the selected criteria.

Features

Vehicle Make Selector: Dropdown to choose from various vehicle makes fetched from the National Highway Traffic Safety Administration (NHTSA) API.
Model Year Selector: Dropdown to choose a model year ranging from 2015 to the current year.
Results Page: Displays available vehicle models based on the selected make and year.
Responsive Design: Styled with Tailwind CSS to ensure a good user experience on both desktop and mobile devices.
Getting Started

**Prerequisites**

Node.js (>= 16.x)
npm or Yarn
**Installation**

Clone the repository:

_git clone https://github.com/yourusername/car-dealer-app.git_

Navigate into the project directory:

```
cd car-dealer-app
```

Install dependencies:

```
npm install
#or
yarn install
```

Running the Application

To start the development server, run:

```
npm run dev
#or
yarn dev
```

The application will be available at http://localhost:3000.

**Building the Application**

To create a production build, run:

```
npm run build

#or

yarn build
```

To start the production server:

```
npm start

#or

yarn start
```

**Configuration**

Create a .env.local file in the root directory for environment variables if needed. For this project, there are no specific environment variables required.

**Code Quality**

This project uses ESLint and Prettier for code quality and formatting. Ensure that you follow these rules and run the following commands to check and fix issues:

For linting:

```
npm run lint

#or

yarn lint
```

For formatting:

```
npm run format

#or

yarn format
```

Architecture

/src/app: Contains the main application files.
/src/app/result/[makeId]/[year]: Result page displaying vehicle models for the selected make and year.
/src/app/filter: Home page with selectors for vehicle makes and model years.
/public: Static assets such as images.
/styles: Global styles and Tailwind CSS configuration.
**API Endpoints Used**

Vehicle Makes: https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json
Vehicle Models: https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json
