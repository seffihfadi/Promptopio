'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { SignIn, SignOut, getProviders, signOut, useSession } from 'next-auth/react'

const Nav = () => {
  const isLoggedIn = true
  
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
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* PC Navigation */}
      <div className='sm:flex hidden'>
        {isLoggedIn ? 
        ( <div className="flex gap-3">
          <Link className="black_btn" href='/create-prompt'>Create Prompt</Link>
          <button className="outline_btn" onClick={signOut}>Sing Out</button>
          <Link href='/profile'>
            <Image 
              src='/assets/images/promptopio.png' 
              width={36}
              height={36}
              alt="profile img"
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
        {isLoggedIn ? (
          <div className='flex'>
            <Image
              src='/assets/images/promptopio.png' 
              width={37}
              height={37}
              className='rounded-full'
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