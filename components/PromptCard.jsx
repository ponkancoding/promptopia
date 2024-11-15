'use client'

import { useState } from "react"
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from "next/navigation"

const PromptCard = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete
}) => {

  const [copied, setCopied] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-center gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt="profile_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{prompt.creator.username}</h3>
            {/* <p className="font-inter text-sm text-gray-500">{prompt.creator.email}</p> */}
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied ? 'assets/icons/tick.svg' : 'assets/icons/copy.svg'}
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={handleTagClick && handleTagClick(prompt.tag)}>
          {prompt.tag}
      </p>
    </div>
  )
}

export default PromptCard