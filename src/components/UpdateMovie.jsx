import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import swal from 'sweetalert'
import { useState } from 'react'
import { moviesRef } from '../firebase/firebase'
import { useContext } from 'react'
import { Appstate } from '../App'
import { updateDoc, getDoc, doc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '../firebase/firebase'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateMovie = () => {

    const {id} = useParams()
    const useAppstate = useContext(Appstate)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        title: "",
        year: "",
        description: "",
        image: "",
        usrName: "",
        rating: 0,
        rated: 0
    })

    const updateMovie = async () =>{
        try{
            setLoading(true)
            const ref = doc(db, 'movies', id)
            await updateDoc(ref, form)
            swal({
                title: "Successfully updated",
                icon: "success",
                buttons: false,
                timer: 3000
            })
            setLoading(false)
            navigate(`/detail/${id}`)

        }catch(err){
            swal({
                title: err,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
    }

    useEffect(()=>{
        async function getData(){
          setLoading(true)
          const _doc = doc(db, "movies", id) 
          const _data = await getDoc(_doc)
          setForm(_data.data())
          setLoading(false)
        }
        getData()
      },[])

  return (
    <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-8 mx-auto">
                    <div className="flex flex-col text-center w-full mb-4">
                        <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">Update Movie</h1>
                      
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-300">Title</label>
                                    <input type="text" id="name" name="name" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-300">Year</label>
                                    <input type="email" id="email" name="email" value={form.year} onChange={(e)=>setForm({...form, year: e.target.value})} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-300">Image Link</label>
                                    <input id="message" name="message" value={form.image} onChange={(e)=>setForm({...form, image: e.target.value})} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-300">Description</label>
                                    <textarea id="message" name="message" value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={updateMovie} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">{loading ? <TailSpin height={25} color='white' /> : 'Submit'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default UpdateMovie