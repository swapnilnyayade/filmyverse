import React from 'react'
import { db } from '../firebase/firebase'
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

import DeleteIcon from '@mui/icons-material/Delete';

const UserReview = ({movid, prevRating, userRated, cmtid, refresh}) => {


    const delCmt = async () => {
    
          console.log(cmtid)

          const _doc = doc(db, "reviews", cmtid) 
          const _data = await getDoc(_doc)

          const ref = doc(db, 'movies', movid)
          await updateDoc(ref, {
          rating: prevRating - _data.data().rating,
          rated: userRated - 1
        })
          await deleteDoc(doc(db, "reviews", cmtid));

          
          refresh()
      }

  
    return (
        <div onClick={delCmt}> <DeleteIcon className='cursor-pointer' /> </div>
    )
}

export default UserReview