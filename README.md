# Integrating MSW (Mock Service Worker) with the browswer, storybook and tests

This repo's objective is to be a reference point when intergrating both [MSW](https://mswjs.io/) and [MSW/data](https://github.com/mswjs/data) into a development workflow. The premise of the app is viewing and adding book reviews. MSW/data is used to create a mock database that can store data provided by the user when creating a new review as well as pass reviews via the API to be rendered on the UI. These API routes are mocked via MSW and called by the components in the `src/routes` directory. 

The setup of these mocked routes and databse are only defined once and consumed when navigating through the app in a browser, rendering each page individually in [Storybook](https://storybook.js.org/) and tested with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Runs all tests in watch mode. Tests are written in [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). The components that are tested are imported from their associated .stories.tsx file. The api requests each page makes are mocked with MSW.

### `yarn storybook`

Launches [storybook](https://storybook.js.org/) where you can view each page via a story. The api requests each page makes are mocked with MSW.

