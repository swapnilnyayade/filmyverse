import React, { useState } from 'react'
import ReactStars from 'react-stars'
import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { ThreeCircles } from 'react-loader-spinner'
import { getDoc, doc, deleteDoc, getDocs, where, query } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import Reviews from './Reviews'
import {TailSpin} from 'react-loader-spinner'
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { Appstate } from '../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { reviewsRef } from '../firebase/firebase'
import { Link } from 'react-router-dom'

const Detail = () => {

  const userName = localStorage.getItem('userName')
  const useAppstate = useContext(Appstate)
  const navigate = useNavigate()
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [click, setClick] = useState(0)
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    usrName: "",
    rating: 0,
    rated: 0
  })

  const refresh = () =>{
    setClick(click+1)
  }

  const deleteMovie = async () => {
    await deleteDoc(doc(db, "movies", id));
    let quer = query(reviewsRef, where('movieid', '==', id))
    const querySnapshot = await getDocs(quer)
    querySnapshot.forEach( async (review) => {
      await deleteDoc(doc(db, "reviews", review.id));
    })
    navigate('/')
  }
  
  useEffect(()=>{
    async function getData(){
      setLoading(true)
      const _doc = doc(db, "movies", id) 
      const _data = await getDoc(_doc)

      setData(_data.data())
      setLoading(false)
    }
    getData()
  },[click])

  return ( 
     
      <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start justify-center w-full'>
      {
      loading ? <div className='w-full flex justify-center items-center h-96'><ThreeCircles height={70} color="white"/></div> :
      <>      
      <div className='block md:sticky top-24'>
      <img className='h-96' src={data.image} alt="" />
      {userName === data.usrName ?
       <div className='flex justify-between'>
      <Link to={`/updatemovie/${id}`} >  <div className="p-2">
                <button className="flex mx-auto text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg">{loading ? <TailSpin height={25} color='white' /> : <UpdateIcon/>}</button>
      </div></Link>
      <div className="p-2 ">
                <button onClick={deleteMovie} className="flex mx-auto text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg">{loading ? <TailSpin height={25} color='white' /> : <DeleteIcon/>}</button>
      </div>
      </div> :
      <Outlet/>
    }
      </div>
    
      {/* <img className='h-96 block md:sticky top-24' src={data.image} alt="" /> */}
      <div className=' ml-0 md:ml-4 w-full md:w-1/2'>
          <h1 className='text-3xl font-bold text-gray-400'>{data.title} <span className='text-xl' >({data.year})</span> </h1>
        
          <ReactStars
              size={20}
              half={true}
              value={data.rating/data.rated}
              edit={false}
            />
          <p className='mt-2'>{data.description}</p>
          <Reviews id={id} prevRating={data.rating} userRated={data.rated} refresh={refresh}/>
      </div>
      </>
      }
      </div>
  )
}

export default Detail