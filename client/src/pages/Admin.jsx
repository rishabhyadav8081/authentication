import React, { useEffect, useState } from 'react'
import {  deleteUser, get } from '../services/ApiEndpoint'
import  { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [users,setUsers]=useState('')
  const navigate=useNavigate()


  useEffect(()=>{
         const GetUsers=async()=>{
          try {
                 const request= await get('/api/admin/getuser')
                 const respnse = request.data
                if (request.status===200) {
                   setUsers(respnse.users)
                }
                 
          } catch (error) {
              console.log(error)
          }
         }
         GetUsers()
  },[])

  const handleDelet=async(id)=>{
       try {
            const request=await deleteUser(`/api/admin/delet/${id}`)
            const response=request.data
            if (request.status===200) {
              toast.success(response.message)
              console.log(response)
            }
       } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message)
          }
       }
  }
  const backhome = ()=>{
    navigate('/')
  }
  return (
    <>
      <div className='admin-container'>
        <h2>Mange Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
            <tbody>
            {users && users.map((elem,index)=>{
              return(
                <tr key={index}>
                <td>{elem.name}</td>
                <td>{elem.email}</td>
                <td>
                  <button    onClick={()=>handleDelet(elem._id)}>Delete</button>
                </td>
              </tr>
              )
            })}
              
            </tbody>
           <button className='logout-btn' onClick={backhome}>go back to home </button>

        </table>
      </div>
    </>
  )
}
