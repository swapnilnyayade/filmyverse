import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import { reviewsRef, db } from '../firebase/firebase'
import swal from 'sweetalert'
import { addDoc, doc, updateDoc, query, where, getDocs} from 'firebase/firestore'
import { Appstate } from '../App'
import { Outlet, useNavigate } from 'react-router-dom'
import UserReview from './UserReview'


const Reviews = ({ id, prevRating, userRated, refresh }) => {
  const login = localStorage.getItem('login')
  const userName = localStorage.getItem('userName')
  const navigate = useNavigate()
  const useAppstate = useContext(Appstate)
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [form, setForm] = useState("")
  const [data, setData] = useState([])

  const sendReview = async () => {
    try {
      if (login) {
        setLoading(true)
        await addDoc(reviewsRef, {
          movieid: id,
          name: userName,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime()
        })

        const ref = doc(db, 'movies', id)
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1
        })

        swal({
          title: "Review Sent",
          icon: "success",
          buttons: false,
          timer: 3000
        })
        refresh()
        setRating(0)
        setForm("")
        setLoading(false)
      } else {
        navigate('/login')
      }

    } catch (err) {
      swal({
        title: err.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
  }

  useEffect(() => {
    async function getData() {
      setReviewLoading(true)
      let quer = query(reviewsRef, where('movieid', '==', id))
      const querySnapshot = await getDocs(quer)
      querySnapshot.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), cmtid: doc.id }])
      })
      setReviewLoading(false)
    }
    getData()
  }, [])

  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full'>
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input type="text"
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder='Share your thoughts...'
        className='w-full p-2 outline-none header'
      />
      <button onClick={sendReview} className='bg-green-600 w-full p-2 flex justify-center'>
        {loading ? <TailSpin height={20} color='white' /> : 'Share'}
      </button>
      {
        reviewLoading ? <div className='mt-6 flex justify-center'> <ThreeDots height={10} color='white' /></div> :
          <div className='mt-4'>
            {data.map((e, i) => {
              return (
                <div className='p-2 w-full mt-2 border-b border-gray-600 bg-opacity-50 header' key={i}>
                  <div className='flex justify-between'>
                    <div className='flex items-center'>
                      <p className='text-blue-500'>{e.name}</p>
                      {/* <p className='text-blue-500'>{e.cmtid}</p> */}
                      <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                    </div>

                    {
                      userName === e.name ? <UserReview user movid={id} prevRating={prevRating} userRated={userRated} cmtid={e.cmtid} refresh={refresh}/> :
                        <Outlet />
                    }

                  </div>
                  <ReactStars
                    size={15}
                    half={true}
                    value={e.rating}
                    edit={false}
                  />
                  <p>{e.thought}</p>
                </div>
              )
            })

            }
          </div>
      }
    </div>
  )
}

export default Reviews