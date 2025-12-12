import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './src/about'
import Contact from './src/contact'
import Qualification from './src/qualification'
import Project from './src/project'
import Layout from './components/Layout'
import Services from './src/services'
import Login from './src/login'
import Signup from './src/signup'
import ForgotPassword from './src/forgotpassword'
const MainRouter = () => {
return (<div>
<Layout/>
<Routes>
<Route exact path="/" element={<Home />} />
<Route exact path="/login" element={<Login />} />
<Route exact path="/signup" element={<Signup />} />
<Route exact path="/forgot-password" element={<ForgotPassword />} />
<Route exact path="/about" element={<About />} />
<Route exact path="/qualification" element={<Qualification />} />
<Route exact path="/project" element={<Project />} />
<Route exact path="/contact" element={<Contact />} />
<Route exact path="/services" element={<Services />} />
</Routes>
</div>
)
}
export default MainRouter