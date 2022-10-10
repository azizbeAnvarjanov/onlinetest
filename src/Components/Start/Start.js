import React from 'react'
import './Start.css'

import { Link } from 'react-router-dom';
import { FaUserAlt, FaUserGraduate } from 'react-icons/fa';

function Start() {
  return (
      <>
          <div className="start">
              <Link to='/admin' className="admin">
                  <FaUserAlt />
                  <h1>Admin</h1>
              </Link>
              <Link to='/student' className="student">
                  <FaUserGraduate />
                  <h1>Talabalar</h1>
              </Link>
          </div>
      </>
  )
}

export default Start