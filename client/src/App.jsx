import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import CreateListing from './pages/CreateListing';

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet /> {/* This is where the child routes will render */}
    </>
  );
}

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />, // Header will be included for all child routes
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <SignUp />
        },
        // Wrap the Profile route inside PrivateRoute
        {
          path: 'profile',
          element: <PrivateRoute />, // Use PrivateRoute for protecting profile route
          children: [
            {
              path: '',
              element: <Profile /> // Render Profile if the user is authenticated
            }
          ]
        },
        {
          path: 'listing',
          element: <PrivateRoute />, // Use PrivateRoute for protecting profile route
          children: [
            {
              path: '',
              element: <CreateListing /> // Render Profile if the user is authenticated
            }
          ]
        }
      ]
    }
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
