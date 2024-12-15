import { createBrowserRouter } from "react-router";

import Home from './pages/home'
import Articles from './pages/articles'
import CompareForm from './pages/compare/compare-form'
import CompareDetail from './pages/compare/compare-detail'
import App from "./App";

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                path: '',
                element: <Home/>
            },
            {
                path:'articles',
                element: <Articles/> 
            },
            {
                path:'detail/:param',
                element: <Articles/> 
            },
            {
                path:'compare',
                element: <CompareForm/>,
                children:[
                    {
                        path:'',
                        element: <CompareForm/>
                    },
                    {
                        path:':param1',
                        element: <CompareForm/>
                    },
                    {
                        path:':param1/n/:param2',
                        element: <CompareDetail/> 
                    }
                ]
            },
        ]
    }
])

export default router;