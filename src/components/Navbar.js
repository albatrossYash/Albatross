import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="/">
            <h5>EXPENSES</h5>
          </a>
          <img className='logo' src='https://cdn2.iconfinder.com/data/icons/infographics-2-3/44/108-512.png' alt='logo'></img>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
