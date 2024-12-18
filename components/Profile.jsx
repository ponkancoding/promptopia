import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete
}) => {
  return (
    <section className='w-full px-4'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc'>{desc}</p>
      <div className='my-10 prompt_layout'>
        {data?.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile