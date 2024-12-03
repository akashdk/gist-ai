import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Sidepanel from './sidepanel'
import '../../assets/tailwind.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Sidepanel />
    <div className="text-red-500 p-4 bg-gray-100 rounded-lg">sidepanel</div>
  </React.StrictMode>
)