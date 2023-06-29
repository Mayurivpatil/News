
import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  render() {
    return (
      <>
      <div>
         <Navbar/>
      </div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<News pageSize={6} apiKey={this.apiKey} category="general" country="in"/>} />
        <Route path="/Business" element={<News pageSize={6} apiKey={this.apiKey} category="business" country="in"/>} />
        <Route path="/Entertainment" element={<News pageSize={6} apiKey={this.apiKey} category="entertainment" country="in"/>} />
        <Route path="/Health" element={<News pageSize={6} apiKey={this.apiKey} category="health" country="in"/>} />
        <Route path="/Science" element={<News pageSize={6} apiKey={this.apiKey} category="science" country="in"/>} />
        <Route path="/Sports" element={<News pageSize={6} apiKey={this.apiKey} category="sports" country="in"/>} />
        <Route path="/Technology" element={<News pageSize={6} apiKey={this.apiKey} category="technology" country="in"/>} />
      </Routes>
     </BrowserRouter>
      </>
    )
  }
}
