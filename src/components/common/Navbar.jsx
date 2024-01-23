import React, { useEffect, useState } from 'react'
import { Link, NavLink, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { PiShoppingCartLight } from "react-icons/pi";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiconnecter } from '../../services/apiconnecter'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from "react-icons/io";


const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    // const [subLinks, setSubLinks] = useState([]);

    // const fetchSubLinks = async () => {
    //     try {
    //         const result = await apiconnecter("GET", categories.CATEGORIES_API)
    //         console.log("All Sublinks here : " + result);
    //         setSubLinks(result.data.data)
    //     } catch (error) {
    //         console.log("Could not fetch the Category list");
    //     }
    // }

    useEffect(() => {
        // fetchSubLinks();
    }, [])

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

                {/* Image */}
                <Link to="/">
                    <img src={logo} alt="logoImage" width={160} height={42} loading='lazy' />
                </Link>

                {/* Nav Links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => {
                                return (
                                    <li key={index} className=''>
                                        {
                                            link.title === "Catalog" ? (
                                                <div className='flex cursor-pointer relative items-center gap-2 group'>
                                                    <p>{link.title}</p>
                                                    <IoIosArrowDropdownCircle />

                                                    <div className='invisible absolute left-[50%] top-[50%] flex flex-col rounded-md translate-x-[-50%] translate-y-[80%] bg-richblack-5 p-4 text-richblue-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                                                        <div className='absolute left-[50%] top-0 translate-y-[-45%] translate-x-[88%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                                        </div>

                                                        {/* {
                                                            subLinks.length ? (
                                                                subLinks.map((subLink, index) => (
                                                                    <Link key={index} to={`${subLink.link}`}>
                                                                        <p>{subLink.title}</p>
                                                                    </Link>
                                                                ))
                                                            ) : (<div></div>)
                                                        } */}

                                                    </div>

                                                </div>) : (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* Login/signup/Dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <Link to="/dashboard/cart" className='relative'>
                                <PiShoppingCartLight className="text-2xl text-richblack-100" />
                                {
                                    totalItems > 0 && (
                                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token != null && <ProfileDropDown />
                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar