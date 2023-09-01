'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'

const Nav = () => {
  const {data: session} = useSession()
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })()
  }, [])



  return (
    <nav className="flex w-full py-3 mb-12 justify-between items-center">
      <Link className="flex items-center gap-2" href='/' >
        <Image 
          src='/assets/images/promptopio.png'
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopio</p>
      </Link>

      {/* PC Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? 
        ( <div className="flex gap-3">
          <Link className="black_btn" href='/create-prompt'>Create Prompt</Link>
          <button className="outline_btn" onClick={signOut}>Sing Out</button>
          <Link href='/profile'>
            <Image 
              src={session?.user.image}
              width={36}
              height={36}
              alt="profile img"
              className="rounded-full"
            />
          </Link>
        </div> ) 
        : 
        ( <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className='black_btn'
              >
                Sign in
              </button>
            ))
          }
        </> )
        }
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              className="rounded-full"
              width={37}
              height={37}
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav