import Link from 'next/link'

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prmpts with world and let your imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-4 glassmorphism'>
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Your AI Prompt
            </span>
          </label>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            className='form_textarea'
            placeholder='Write your prompt here...'
            required
          />

          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Tag {` `}
              <span className='font-normal'>(#reactjs, #product, #idea)</span>
            </span>
          </label>
          <input
            type='text'
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="form_input"
            placeholder='#tag'
            required
          />

          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>

            <button
              type='submit'
              className='px-5 py-1.5 text-sm bg-primary-orange text-white rounded-full'
              disabled={submitting}
            >
              {submitting ? `${type}...` : `${type}`}
            </button>
          </div>
      </form>
    </section>
  )
}

export default Form