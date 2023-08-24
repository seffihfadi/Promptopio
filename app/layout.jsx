import '@styles/globals.css' 
import Nav from '@components/Nav'
import Provider from '@components/Provider'


export const metadata = {
  title: 'Promptopio',
  description: 'Discover and Share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <Provider>
          <main className='app'>
            <Nav />
            { children }
          </main>
        </Provider>
      </body>
    </html>
  )
}
