import React from 'react'
import Nav from '../Nav'
import Menu from '../Menu'

const Wrapper = (props) => {
  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            {props.children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Wrapper
