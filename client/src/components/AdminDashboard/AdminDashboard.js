import React from 'react';
import {  Outlet } from 'react-router-dom';
import './AdminDashboard.scss';
import HeadDashboard from './HeadDashboard/HeadDashboard';
import AnimatedSidebar from './AnimatedSidebar/AnimatedSidebar';



const AdminDashboard = () => {
 
  return (
    <main className='adminPanel'>
      <AnimatedSidebar />
      <div className='dashboardsWing'>
        <HeadDashboard />
        <Outlet/>
      </div>
    </main>
  
  )
}

export default AdminDashboard;