import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { set_admin_auth, set_name } from '../store/slices/TokenSlice'

const Protected_Route = () => {
  const { isAdmin } = useSelector((data) => data.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const role = localStorage.getItem("role")
    const name = localStorage.getItem("name")

    if (role === "admin") {
      dispatch(set_admin_auth())
      dispatch(set_name(name || "Admin"))
    } else if (!isAdmin) {
      navigate('/')
    }
  }, [isAdmin, navigate, dispatch])

  return isAdmin ? <Outlet /> : null
}

export default Protected_Route
