import Nav from '@components/Nav'
import '@styles/globals.scss'
import Provider from '@components/Provider'

export const metadata = {
  title: "Promptopia",
  description: "A prompt generator for writers, artists, and other creatives.",
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  )
}

export default RootLayout