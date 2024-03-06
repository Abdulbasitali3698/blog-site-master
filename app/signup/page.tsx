"use client"
import axios from "axios";
import { create } from "domain"
import { FormEvent, useState } from "react"

export default function SignUp(){
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[Username,setUserName]=useState("");
    const[Password,setPassWord]=useState("");
    const[response,setResponse]=useState(null);
    const handleSubmit=async (e:{preventDefault:()=>void;})=>{
        e.preventDefault();
        try {
            const response =await axios.post('/api/auth/signup',{
                firstName,
                lastName,
                Username,
                Password,
            });
            setResponse(response.data);
            setFirstName("");
            setLastName("");
            setUserName("");
            setPassWord("")
        } catch (error) {
            console.error("Error:",error)
            setResponse(null);
            
        }
    }
  return (
    <div className="container">
        <div className="row">
            <div className="offset-2 col-8">
                <div className="card">
                    <div className="card-header">
                        Signup
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body" >
                        <div className="row">
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" value={firstName} placeholder="Jhon" onChange={(e)=>setFirstName(e.target.value)} />
                                    <label htmlFor="firstName">First Name</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" value={lastName} placeholder="Doe" onChange={(e)=>setLastName(e.target.value)} />
                                    <label htmlFor="lastName">Last Name</label>
                                </div>
                            </div>
                        </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-floating mb-3 ">
                                        <input type="userame" className="form-control" value={Username} placeholder="Johndoe123" onChange={(e)=>setUserName(e.target.value)}/>
                                        <label htmlFor="username">User Name</label>
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
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </div>
                        </div>  
                    </form>
                    {response && (
                            <div>
                            <h2>Server Response:</h2>
                            <pre>{JSON.stringify(response, null, 2)}</pre>
                            </div>
                        )}
                </div>
            </div>
        </div>
    </div>
  )
}
