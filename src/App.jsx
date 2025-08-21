import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Layout from "./components/Layout/Layout"
import NotFound from "./components/NotFound/NotFound"
import { Toaster } from "react-hot-toast"
import Profile from "./pages/Profile/Profile"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import GuesRoute from "./components/GuestRoute/GuesRoute"
import TokenProvider from "./context/token.context"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import PostDetails from "./pages/PostDetails/PostDetails"


// guesROute
const routes = createBrowserRouter([
  {
    path: '', element: <ProtectedRoute> <Layout /> </ProtectedRoute>, children: [
      { path: '/home', element: <Home /> },
      { path: '/profile', element: <Profile /> },
      { path: '/PostDetails/:id', element: <PostDetails /> },
      { path: '*', element: <NotFound /> },

    ]
  },


  {
    path: '', element: <GuesRoute> <Layout /> </GuesRoute>, children: [

      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ]
  }

])


const client = new QueryClient()

function App() {


  return (
    <>
      <TokenProvider>
        <QueryClientProvider client={client} >

          <RouterProvider router={routes} />
          <Toaster />

        </QueryClientProvider>
      </TokenProvider>
    </>
  )
}

export default App
