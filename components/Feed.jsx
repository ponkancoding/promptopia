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

  const [searchText, setSearchText] = useState('')
  const [prompts, setPrompts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    // Fetch data from the server
    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/prompt`)
        const data = await response.json()
        console.log("🚀 ~ fetchPrompts ~ data:", data)
        setPrompts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPrompts()
  }
  , [searchText])

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
        data={prompts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed