import { async } from '@firebase/util'
import { query, where } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { usersRef } from '../firebase/firebase'
import bcrypt from 'bcryptjs'
import { Appstate } from '../App'
import { useNavigate } from 'react-router-dom'
import { getDocs } from 'firebase/firestore'
import swal from 'sweetalert'

const Login = () => {

    const navigate = useNavigate()
    const useAppstate = useContext(Appstate)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    })

    const login = async () => {
        setLoading(true)
        try {
            console.log("vdd")
            const quer = query(usersRef, where('mobile', '==', form.mobile))
            const querySnapshot = await getDocs(quer)

            querySnapshot.forEach((doc) => {
                const _data = doc.data()
                const isUser = bcrypt.compareSync(form.password, _data.password)
                if (isUser) {
                    // useAppstate.setLogin(true)
                    // useAppstate.setUserName(_data.name)

                    localStorage.setItem("userName", JSON.stringify(_data.name))
                    localStorage.setItem("login", true)
                    navigate('/')
                    window.location.reload()
                } else {
                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    })
                }
            })
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false)
    }

    return (
        <div className='w-full flex flex-col items-center mt-8 '>
            <h1 className='text-xl font-bold'>Login</h1>
            <div className="p-2 w-full md:w-1/3">
                <div className="relative">
                    <label htmlFor="message" className="leading-7 text-sm text-gray-300">Mobile No.</label>
                    <input type='number' id="message" name="message" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div className="p-2 w-full md:w-1/3">
                <div className="relative">
                    <label htmlFor="message" className="leading-7 text-sm text-gray-300">Password</label>
                    <input id="message" name="message" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div className="p-2 w-full">
                <button onClick={login}
                    className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">{loading ? <TailSpin height={25} color='white' /> : 'Login'}</button>
            </div>
            <p>Do not have account? <Link to={'/signup'}> <span className='text-blue-500'>Sign Up</span></Link></p>
        </div>
    )
}

export default Login