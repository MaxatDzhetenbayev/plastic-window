import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout'
import { Home } from '../pages'

function App() {

  const routes = createBrowserRouter([
    {
      element: <BaseLayout />,
      children: [
        {
          path: '/',
          element: <Home/>
        },
      ]
    }
  ])


  return (
    <RouterProvider router={routes}/>
  )
}

export default App
