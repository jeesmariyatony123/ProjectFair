import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import image from '../assets/landing.png'
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../services/allAPI';

function Home() {

  const [homeProjects, setHomeProjects] = useState([])

  const navigate = useNavigate()
  const [loginStatus, setLoginStatus] = useState(false)

  console.log(homeProjects);

  useEffect(() => {
    getHomeProjects()
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  const handleProjects = () => {
    if (loginStatus) {
      navigate('/projects')
    } else {
      toast.warning("Please Login to get full access to our projects!!!")
    }
  }

  const getHomeProjects = async () => {
    try {
      const result = await getHomeProjectsAPI()
      console.log(result);
      if (result.status == 200) {
        setHomeProjects(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='bg-light'>
      <Container>
        <Row style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
          <Col sm={12} md={6} lg={6}>
            <h1 style={{ fontSize: '80px' }}><i className="fa-solid fa-feather pe-2"></i>Project Fair</h1>
            <p style={{ textAlign: 'justify' }} className='py-4'> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad eligendi incidunt perspiciatis vel laboriosam blanditiis porro modi ullam neque dolor a quisquam, fugit minus, aliquam assumenda alias, ipsum necessitatibus veniam.</p>
            {loginStatus ?
              <Link to={'/dashboard'} className='btn btn-primary'> Manage Your Projects<i className="fa-solid fa-arrow-right ps-3"></i></Link> :
              <Link to={'/login'} className='btn btn-primary'> Starts to Explore<i className="fa-solid fa-arrow-right ps-3"></i></Link>
            }
          </Col>

          <Col sm={12} md={6} lg={6}><img width={600} src={image} alt="" /></Col>
        </Row>

      </Container>

      <div className=" pb-5 text-center">
        <h1 className="text-center mb-5">Explore Our Projects</h1>
        <marquee >
          <div className="d-flex">
            {homeProjects?.length > 0 &&
              homeProjects?.map(project => (
                <div key={project} className="me-5">
                  <ProjectCard displayData={project} />
                </div>
              ))
            }
          </div>
        </marquee>

        <button onClick={handleProjects} className='btn btn-link mt-3'>Click here to View more Projects...</button>
      </div>


      <div className="d-flex justify-content-center align-items-center mt-5 pb-5 flex-column">
        <h1>Our Testimonials</h1>
        <div className="d-flex justify-content-evenly align-items-center  mt-5 w-100 ">
          <Card style={{ width: '18rem' }} className='shadow'>
            <Card.Body >
              <Card.Title className='d-flex justify-content-between align-items-center flex-column'>
                <img width={'70px'} height={'70px'} className='rounded-circle img-fluid' src="https://cdn.dribbble.com/userupload/3376074/file/original-cab3ec0b49bc02416617e28e91c4fb78.jpg?resize=400x0" alt="" />
                <span>Alexia Montae</span>
              </Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center pt-2">
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>

                </div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla eum illum adipisci dolorem. Fuga esse quos voluptatem facilis! Iure illo aut blanditiis nam porro non! Ipsam distinctio labore nam. Harum?</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }} className='shadow'>
            <Card.Body >
              <Card.Title className='d-flex justify-content-between align-items-center flex-column'>
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://img.freepik.com/premium-vector/people-happy-face-man-icon_24640-19215.jpg" alt="" />
                <span>Luke Damian</span>
              </Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center pt-2">
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-regular fa-star "></i>

                </div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla eum illum adipisci dolorem. Fuga esse quos voluptatem facilis! Iure illo aut blanditiis nam porro non! Ipsam distinctio labore nam. Harum?</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }} className='shadow'>
            <Card.Body >
              <Card.Title className='d-flex justify-content-between align-items-center flex-column'>
                <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png" alt="" />
                <span>Max MIller</span>
              </Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center pt-2">
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-regular fa-star "></i>
                  <i className="fa-regular fa-star "></i>

                </div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla eum illum adipisci dolorem. Fuga esse quos voluptatem facilis! Iure illo aut blanditiis nam porro non! Ipsam distinctio labore nam. Harum?</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>


  )
}

export default Home