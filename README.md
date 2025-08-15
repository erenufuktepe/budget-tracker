# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Budget Tracker

A simple web application to help you track your income, expenses, and visualize your budget.

## Features
- Add, edit, and delete income and expenses
- View summary tables for income and expenses
- Interactive charts for budget visualization
- Import and export data

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)

### Installation
1. Clone the repository:
	```powershell
	git clone https://github.com/erenufuktepe/budget-tracker.git
	cd budget-tracker
	```

	## Deployment to GitHub Pages

	To deploy your app to GitHub Pages:

	1. Install the gh-pages package:
		```powershell
		npm install --save gh-pages
		```

	2. In your `package.json`, add:
		- `"homepage": "https://<your-github-username>.github.io/<repository-name>"`
		- Under `scripts`, add:
		  ```json
		  "predeploy": "npm run build",
		  "deploy": "gh-pages -d build"
		  ```

	3. Build and deploy:
		```powershell
		npm run deploy
		```

	Your app will be published to GitHub Pages at the URL specified in the `homepage` field.
2. Install dependencies:
	```powershell
	npm install
	```
3. Start the development server:
	```powershell
	npm start
	```
	The app will open at [http://localhost:3000](http://localhost:3000).

## Scripts
- `npm start` — Run the app in development mode
- `npm run build` — Build the app for production
- `npm test` — Run tests (if available)
