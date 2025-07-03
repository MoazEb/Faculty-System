# Faculty System

This is a web application for a Faculty System. It provides a platform for managing students, teaching staff, courses, schedules, and timetables.

## Features

- **User Authentication**: Secure login, signup, and password recovery.
- **Role-Based Access Control**: Different views and permissions for Admins, Students, and Teaching Staff.
- **Dashboard**: A central hub for all users.
- **Profile Management**: Users can view and update their profiles.
- **Personalized Schedules**: Students and Teaching Staff can view their own schedules.
- **Admin Management Panels**:
    - **Course Management**: Add, edit, and delete courses.
    - **Student Management**: Manage student information.
    - **Teaching Staff Management**: Manage staff details.
    - **Teaching Places Management**: Manage lecture halls and labs.
    - **Schedule Management**: Create and manage schedules.
    - **Timetable Management**: Generate and manage timetables.

## Technologies Used

- **Frontend**:
    - [React](https://reactjs.org/)
    - [React Router](https://reactrouter.com/) for routing.
    - [Zustand](https://github.com/pmndrs/zustand) for state management.
    - [Tailwind CSS](https://tailwindcss.com/) for styling.
    - [Axios](https://axios-http.com/) for HTTP requests.
    - [SignalR](https://dotnet.microsoft.com/apps/aspnet/signalr) for real-time communication.
- **Build Tool**:
    - [Vite](https://vitejs.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/)) installed on your machine.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/moazeb/faculty-system.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Running the Application

To run the app in the development mode, use:
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) (or whatever port is shown in your terminal) to view it in the browser.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the code using ESLint.
- `npm run preview`: Serves the production build locally. 
