'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Profile from '@components/Profile'


const MyProfile = () => {
  const { data: session } = useSession()

  const [prompts, setPrompts] = useState([])

  const handleEdit = () => {
  }

  const handleDelete = async () => {
  }

  useEffect(() => {
    console.log('123', session)
    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/user/${session.user.id}/prompts`)
        const data = await response.json()
        console.log("🚀 ~ fetchPrompts ~ data:", data)
        setPrompts(data)
      } catch (error) {
        console.error(error)
      }
    }

    if (session?.user.id)fetchPrompts()
  }, [])

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={[]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile