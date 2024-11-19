'use client'

import { useState, useEffect } from 'react'
import PromptCard from '@components/PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return <div className="my-16 prompt_layout">
    {data.map((prompt) => (
      <PromptCard
        key={prompt._id}
        prompt={prompt}
        handleTagClick={(value) => handleTagClick(value)}
      />
    ))}
  </div>
}

const Feed = () => {

  const [prompts, setPrompts] = useState([])
  const [filteredPrompts, setFilteredPrompts] = useState([])
  const [searchText, setSearchText] = useState('')

  const handleTagClick = (value) => {
    setSearchText(value.toLowerCase())
  }

  const searchPrompts = (searchText) => {
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
        setFilteredPrompts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPrompts()
  }, [])

  useEffect(() => {
    searchPrompts(searchText)
  }, [searchText])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for tag or a username'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={filteredPrompts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed