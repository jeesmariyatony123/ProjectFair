import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../contexts/TokenAuth';

function Header({ insideDashBoard }) {

  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const navigate = useNavigate()
  
  const logout = () => {
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }

  return (
    <div>
      <Navbar style={{ zIndex: '1' }} className="bg-primary top-0 position-fixed w-100 ">
        <Container>
          <Navbar.Brand >
            <Link to={'/'} style={{ textDecoration: 'none' }} className='fw-bolder text-white fs-1 text-capitalize'><i className="fa-solid fa-feather pe-2"></i> Project Fair</Link>
          </Navbar.Brand>
          {insideDashBoard &&
            <div className="ms-auto">
              <button onClick={logout} className='btn btn-link text-white' style={{ textDecoration: 'none' }}>Logout <i className="fa-solid fa-arrow-right"></i></button>
            </div>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header