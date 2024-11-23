import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

const AuthScreen = () => {
  const [email, setEmail] = useState('')

  return (
    <div className='hero-bg relative'>
      {/* Navbar */}
      <header className='mx-auto flex items-center justify-between p-4 pb-10'>
        <img src='/netflix-logo.png' alt='/Netflix logo' className='w-32 md:w-52' />
        <Link to={'/login'} className='text-white bg-red-600 py-1 px-2 rounded'>Sign In</Link>
      </header>

      {/* Hero */}

      <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
        <p className="'mb-4">Ready to watch? Enter your email to create or restart your membership.</p>

        <form className='flex flex-col md:flex-row gap-4 w-1/2'>
          <input type="email"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            placeholder="you@example.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </button>


        </form>
      </div>

      {/* seperator */}

      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* 1 section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">

          {/* Left Side  */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Enjoy on your TV</h2>
            <p className="text-lg md:text-xl"> Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
          </div>

          {/* Right Side */}
          <div className="flex-1 relative">
            <img src="/tv.png" alt="TV" className="relative mt-4 z-20" />
            <video autoPlay playsInline muted loop className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10">
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>


        </div>
      </div>


      {/* seperator */}

      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* 2 section */}

      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">

          {/* Left Side  */}
          <div className="flex-1">
            <div className="relative">
              <img src="stranger-things-lg.png" alt="Stranger Things img" className="mt-4" />

              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                <img src="/stranger-things-sm.png" alt="image" className="h-full" />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">Stranger Things</span>
                    <span className="text-sm text-blue-500">Downloading...</span>
                  </div>
                  <img src="/download-icon.gif" alt="" className="h-12" />
                </div>

              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1">

          </div>
        </div>

      </div>
    </div>
  )
}

export default AuthScreen