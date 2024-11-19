'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'


const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session?.user) return;

    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/users/${session.user.id}/prompts`)
        const data = await response.json()
        setPrompts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPrompts()
  }, [session])

  const [prompts, setPrompts] = useState([])

  const handleEdit = async (prompt) => {
    router.push(`update-prompt/${prompt._id}`)
  }

  const handleDelete = async (prompt) => {
    try {
      const response = await fetch(`/api/prompt/${prompt._id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const newPrompts = prompts.filter((p) => p._id !== prompt._id)
        setPrompts(newPrompts)
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile