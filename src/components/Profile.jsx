import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import profileImg from '../assets/profileimage.png'
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserAPI } from '../services/allAPI';


function Profile() {

  const [preview, setPreview] = useState("")
  const [existingImg, setExistingImg] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profileImage: ""
  })

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const existingUserDetails = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({
        ...userDetails, username: existingUserDetails.username, email: existingUserDetails.email, password: existingUserDetails.password, github: existingUserDetails.github, linkedin: existingUserDetails.linkedin
      })
      setExistingImg(existingUserDetails.profile)
    }
  }, [open])

  useEffect(() => {
    if (userDetails.profileImage) {
      setPreview(URL.createObjectURL(userDetails.profileImage))
    } else {
      setPreview("")
    }
  }, [userDetails.profileImage])

  const handleUserProfile = async () => {
    const {username, email, password, github, linkedin, profileImage} = userDetails
    if (!github || !linkedin) {
      toast.warning("Please fill the form completely!!!")
    } else {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profileImage", profileImage) : reqBody.append("profileImage", existingImg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        //api call
        const result=await updateUserAPI(reqBody,reqHeader)
        if(result.status==200){
          setOpen(!open)
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        }else{
          console.log(result);
        }
      }
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h3>User Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn fw-bolder text-primary'> <i className='fa-solid fa-chevron-down'></i></button>
      </div>
      <Collapse in={open}>
        <div className='row justify-content-center align-items-center p-3 rounded shadow' id="example-collapse-text">
          <label className='text-center mb-3'>
            <input onChange={e => setUserDetails({ ...userDetails, profileImage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
            {existingImg == "" ?
              <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : profileImg} alt="" />
              :
              <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : `${SERVER_URL}/uploads/${existingImg}`} alt="" />
            }
          </label>
          <div className="mb-2">
            <input value={userDetails.github} onChange={e => setUserDetails({ ...userDetails, github: e.target.value })} type="text" className='form-control' placeholder='GitHub URL' />
          </div>
          <div className="mb-2">
            <input value={userDetails.linkedin} onChange={e => setUserDetails({ ...userDetails, linkedin: e.target.value })} type="text" className='form-control' placeholder='LinkedIn URL' />
          </div>
          <div className="d-grid">
            <button onClick={handleUserProfile} className='btn btn-primary'>Update Profile</button>
          </div>
        </div>
      </Collapse>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </div>

  )
}

export default Profile