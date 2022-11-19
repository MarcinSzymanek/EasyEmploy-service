import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PostJobView from './Pages/postJobView';
import MainSelection from './Pages/mainSelection';
import ViewJobs from './Pages/viewJobs';
import {createBrowserRouter,
  RouterProvider,
}   from "react-router-dom";

const router = createBrowserRouter([
  {
      path: "/",
      element: <App component = {<MainSelection/>} title = {"What would you like to do?"}/>
  },
  {
      path: "/postJob",
      element: <App component = {<PostJobView/>} title = {"Post your job"}/>
  },
  {
      path: "/viewJobs",
      element: <App component = {<ViewJobs/>} title = {"Available jobs:"}/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

