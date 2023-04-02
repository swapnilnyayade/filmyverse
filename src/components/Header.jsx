import React, { useContext, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';
import BasicMenu from './BasicMenu';


const Header = () => {

  const useAppstate = useContext(Appstate)
  const login = localStorage.getItem('login')
  const userName = localStorage.getItem('userName')

  return (
    <div className='sticky top-0 z-10 header text-3xl text-red-500 font-bold p-3 flex justify-between border-b-2 border-gray-500'>
      <Link to={'/'}><span>Filmy<span className='text-white'>Verse</span></span></Link>
      
      {login ?
        <div className='flex items-center'>  
          {/* <h1 className='text-lg text-gray-500'>({userName})</h1> */}
          <BasicMenu userName={userName}/>
          {/* <Link to={'/addmovie'}>
            <h1 className='text-lg flex items-center cursor-pointer'>
              <Button>
                <AddIcon className='mr-1' color='secondary' />
                <span className='text-white'>Add New</span>
              </Button>
            </h1>
          </Link> */}
         
        </div>
        :
        <Link to={'/login'}>
          <h1 className='text-lg bg-green-500 flex items-center cursor-pointer'>
            <Button>
              <span className='text-white font-medium capitalize'>Login</span>
            </Button>
          </h1>
        </Link>
      }

    </div>
  )
}

export default Header