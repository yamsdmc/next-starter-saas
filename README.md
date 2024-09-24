# Launch Kit SAAS

Welcome to the Project! This document provides an overview of the necessary steps to set up and run the project.

## Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** (version 18.x)
- **pnpm** (package manager)

### Installing Node.js

If you don't have Node.js installed, you can download it from [nodejs.org](https://nodejs.org/).

### Installing pnpm

To install `pnpm`, you can use npm (which is included with Node.js):

```bash
npm install -g pnpm
```


### Read Other README Files

Before proceeding with the installation and setup of the main project, please ensure you read the specific README.md files located in the README directory. These files contain important information related to authentication, payment configuration, and other essential aspects of the application.


### Technology Stack

This SaaS project is built with modern and powerful technologies, ensuring a robust and scalable application. Here’s what’s included:

- **TypeScript**: A statically typed language that enhances JavaScript, providing better tooling and reducing runtime errors.
- **Next.js** (14.1.0): A popular React framework for server-side rendering, static site generation, and API routes, making it ideal for building fast and user-friendly web applications.
- **React** (18): The latest version of React, providing features like automatic batching, transitions, and improved performance.
- **Tailwind CSS**: A utility-first CSS framework that enables rapid design without leaving your HTML, ensuring a responsive and modern UI.
- **Auth0 Integration**: Easily manage user authentication and authorization with a secure and scalable solution.
- **Stripe Payments**: Seamlessly handle payments with Stripe, including subscription management and webhooks for real-time payment notifications.
- **Sentry Monitoring**: Track and fix errors in real-time, improving application reliability and user experience.
- **Vercel**:
  - **Analytics**: Monitor and analyze application performance with Vercel’s built-in analytics.
  - **Speed Insights**: Improve application speed and user experience with Vercel’s speed insights.


### Install
```
pnpm install
```


### Run the project
```
pnpm run dev
```

The application will be running on http://localhost:3000.
