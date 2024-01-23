import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input'; 
import { BiArrowBack } from 'react-icons/bi';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {

    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signupData, loading } = useSelector((state) => state.auth);
 
    useEffect(()=>{
      if(!signupData){
        navigate("/signup")
      }
    },[])

    const handleOnSubmit = (e)=>{
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email, 
            password,
            confirmPassword
        } = signupData;

        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }

    return (
        <div>
            {
                loading ? <div className='spinner'></div>
                : (
                   <div>
                     <h1>Verify Email</h1>
                     <p>A verification code has been sent to you. Enter the code below</p>

                     {/* form verify email*/}
                     <form onSubmit={handleOnSubmit}>
                        <OTPInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          renderInput={(props) => <input {...props} />}
                        />
                        <button type='submit'>
                            Verify Email
                        </button>
                     </form>

                <div>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                            <p className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack /> Back To Login
                            </p>
                        </Link>
                   </div>

                   <button onClick={()=> dispatch(sendOtp(signupData.email,navigate))}>
                       Resend it
                   </button>
                </div>

            </div> 
                )
            }
        </div>
    )
}

export default VerifyEmail