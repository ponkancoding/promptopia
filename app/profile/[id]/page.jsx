
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Profile from '@components/Profile';

const UserProfile = () => {
  const params = useParams();
  const userId = params.id;

  const [prompts, setPrompts] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    // Fetch data from the server
    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/prompts`)
        const data = await response.json()
        setPrompts(data)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`)
        const data = await response.json()
        setUser(data)
        fetchPrompts()
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [userId])

  return (
    user && <Profile
      name={user.username}
      desc="Welcome to the user's profile page"
      data={prompts}
    />
  )
}

export default UserProfile