import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../services/serverUrl';

function ProjectCard({displayData}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card onClick={handleShow} style={{ width: '25rem' }} className='p-3 shadow btn'>
        <Card.Img height={'220px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} alt={displayData?.title} />
        <Card.Body>
          <Card.Title>{displayData?.title}</Card.Title>

        </Card.Body>
      </Card>


      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="row">
            <div className="col-lg-6">
              <img className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} alt={displayData?.title} />
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              <h6 ><span className='fw-bolder '>Languages Used</span>: {displayData?.language}</h6>
              <p style={{ textAlign: 'justify' }}><span className='fw-bolder'>Description: </span>{displayData?.overview}</p>
            </div>
          </div>
          <div className='float-start mt-4'>
            <a href={displayData?.github} className='btn btn-secondary' target='_blank'>
              <i className='fa-brands fa-github'></i>
            </a>
            <a href={displayData?.website} className='btn btn-secondary ms-2' target='_blank' >
              <i className='fa-solid fa-link'></i>

            </a>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  )
}

export default ProjectCard