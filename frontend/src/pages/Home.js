import React, { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import Header from "../components/Header"
import { useDispatch } from "react-redux"
import { logout, setOnlineUser, setSocketConnection, setUser } from "../redux/userSlice"
import SideBar from "../components/SideBar"
import logo from '../assets/logo.png'
import io from 'socket.io-client';

const Home = () => {
    // const user = useSelector(state => state.user)
    // console.log("redux user", user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation()
    // console.log("user",user)
    const fetchUserDetails = async () => {
        try {
            const URL = ` ${process.env.REACT_APP_BACKEND_URL}/api/user-details`
            const response = await axios({
                url: URL,
                withCredentials: true
            })
            dispatch(setUser(response.data.data))
            if (response.data.data.logout) {
                dispatch(logout())

                navigate('/email')
            }
            // console.log("current user", response)
        } catch (error) {
            console.log("error", error)
        }
    }
    useEffect(() => {
        fetchUserDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // socket connection
    useEffect(() => {
        const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
            auth: {
                token: localStorage.getItem('token')
            }
        })
        // onlineUser from index.socket.js in array form
        socketConnection.on('onlineUser', (data) => {
            // console.log(data)
            dispatch(setOnlineUser(data))
        })
        dispatch(setSocketConnection(socketConnection))

        return () => {
            socketConnection.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const basePath = location.pathname === '/chat'
    return (
        <>
            <Header />
            {/* <div className="grid grid-flow-col">
                <section className={` h-[90vh]  ${!basePath && "hidden"} lg:block`}>
                    <SideBar />
                </section> 

                Message components 
                <section className={`${basePath && "hidden"}`}>
                    <Outlet />
                </section>

                <div className={`justify-center items-center flex-col gap-2  ${!basePath ? "hidden" : "lg:flex"}`}>
                    <div>
                        <img src={logo} alt='Logo' width='250' />
                    </div>
                    <p className="text-lg text-slate-500">Select user to start chat</p>
                </div>
            </div> */}


            <div className="flex flex-col lg:flex-row h-[calc(100%-5rem)]">
                {/* Sidebar Section h-full*/}
                <section className={`${!basePath && "hidden"} lg:block lg:w-1/4 h-full`}>
                    <SideBar />
                </section>

                {/* Message Components */}
                <section className={`flex-grow ${basePath && "hidden"}`}>
                    <Outlet />
                </section>

                <div className={`hidden flex-col justify-center items-center gap-2 p-4 bg-orange-100 ${!basePath ? "hidden" : "flex lg:flex lg:w-3/4"}`}>
                    <div className="hidden lg:block">
                        <img src={logo} alt='Logo' className="w-40 lg:w-64" />
                    </div>
                    <p className=" hidden lg:block text-base lg:text-lg text-slate-500 text-center">
                        Select user to start chat
                    </p>
                </div>
            </div>

        </>
    )
}

export default Home




// import React, { useEffect } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import Header from "../components/Header";
// import { useDispatch } from "react-redux";
// import { logout, setOnlineUser, setUser } from "../redux/userSlice";
// import SideBar from "../components/SideBar";
// import logo from '../assets/logo.png';
// import { useSocket } from "./socketContext"; // Import Socket context

// const Home = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const socket = useSocket(); // Use socket from context

//     const fetchUserDetails = async () => {
//         try {
//             const URL = ` ${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
//             const response = await axios({
//                 url: URL,
//                 withCredentials: true
//             });
//             dispatch(setUser(response.data.data));
//             if (response.data.data.logout) {
//                 dispatch(logout());
//                 navigate('/email');
//             }
//         } catch (error) {
//             console.log("error", error);
//         }
//     };

//     useEffect(() => {
//         fetchUserDetails();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     // Use the socket to listen for events
//     useEffect(() => {
//         if (socket) {
//             socket.on('onlineUser', (data) => {
//                 dispatch(setOnlineUser(data));
//             });
//         }
//     }, [socket,dispatch]);

//     const basePath = location.pathname === '/chat';
    
//     return (
//         <>
//             <Header />
//             <div className="flex flex-col lg:flex-row h-[calc(100%-5rem)]">
//                 <section className={`${!basePath && "hidden"} lg:block lg:w-1/4 h-full`}>
//                     <SideBar />
//                 </section>
//                 <section className={`flex-grow ${basePath && "hidden"}`}>
//                     <Outlet />
//                 </section>
//                 <div className={`hidden flex-col justify-center items-center gap-2 p-4 bg-orange-100 ${!basePath ? "hidden" : "flex lg:flex lg:w-3/4"}`}>
//                     <div className="hidden lg:block">
//                         <img src={logo} alt='Logo' className="w-40 lg:w-64" />
//                     </div>
//                     <p className="hidden lg:block text-base lg:text-lg text-slate-500 text-center">
//                         Select user to start chat
//                     </p>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Home;
