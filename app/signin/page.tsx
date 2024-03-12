"use client"
import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'

export default function SignIn() {
    const[Username,setUserName]=useState("");
    const[Password,setPassWord]=useState("");
    const[response,setResponse]=useState(null);
    const [token, setToken] = useState("");
    const handleSubmit=async (e:{preventDefault:()=>void;})=>{
        e.preventDefault();
        try {
            const response =await axios.post('/api/auth/signin',{
                
                Username,
                Password,
            });
            setResponse(response.data);
            setUserName("");
            setPassWord("");
            // If sign-in is successful, store the JWT token
            if (response.data.token) {
                setToken(response.data.token);
            }

        } catch (error) {
            console.error("Error:",error)
            setResponse(null);
            
        }
    }

  return (
    <form onSubmit={handleSubmit}>
    
        <div className="container">
            <div className="row">
                <div className="offset-2 col-8">
                   <div className="card">
                        <div className="card-header">
                        SignIn
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" value={Username} placeholder="Jhondoe123" onChange={(e)=>setUserName(e.target.value)}/>
                                            <label htmlFor="userName">User Name</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-floating mb-3 ">
                                        <input type="password" className="form-control" value={Password} placeholder="Password" onChange={(e)=>setPassWord(e.target.value)}/>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Sign In</button>
                            </div>
                        </div>
                        <div className="">
                            <p className="">Don't have an account?<Link href="/signup">Get Register</Link></p>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {response && (
                        <div>
                        <h2>Server Response:</h2>
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                        </div>
                        )}
                        {/* Display the token if available */}
            {token && (
                <div>
                    <h2>JWT Token:</h2>
                    <pre>{token}</pre>
                </div>
            )}
    </form>
    
  )
}
