'use client'

import { useState, useEffect } from 'react'
import PromptCard from '@components/PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return <div className="mt-16 prompt_layout">
    {data.map((prompt) => (
      <PromptCard
        key={prompt._id}
        prompt={prompt}
        handleTagClick={handleTagClick}
      />
    ))}
  </div>
}

const Feed = () => {

  const [prompts, setPrompts] = useState([])
  const [filteredPrompts, setFilteredPrompts] = useState([])

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase()

    // Filter the prompts based on the search text
    const filteredPrompts = prompts.filter((prompt) => {
      return prompt?.tag?.toLowerCase().includes(searchText) ||  prompt?.prompt?.toLowerCase().includes(searchText) || prompt?.creator?.username.toLowerCase().includes(searchText)
    })

    if (filteredPrompts.length === 0) {
      // If no prompts are found, show all the prompts
      setFilteredPrompts(prompts)
      return
    } else {
      setFilteredPrompts(filteredPrompts)
    }
  }

  useEffect(() => {
    // Fetch data from the server
    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/prompt`)
        const data = await response.json()
        setPrompts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPrompts()
  }
  , [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={filteredPrompts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed