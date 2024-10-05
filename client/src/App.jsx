import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

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
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'signup',
          element: <SignUp />
        }
      ]
    }
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}



export default App;
