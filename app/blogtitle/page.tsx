"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function BlogTitle() {
    const [blogContent, setBlogContent] = useState('');
    const[title,SetTitle]=useState("");
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
      fetchBlogs();
  }, []);
    

    const handleSubmit = async (e:{preventDefault:()=>void;}) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('/api/blog/submit', { title, content: blogContent });
        console.log(response.data); // You can handle the response as needed
        
  
        // Optionally, you can reset the textarea content after successful submission
        setBlogContent('');
        SetTitle("");
        fetchBlogs()
        
      }
       catch (error) {
        console.error('Error:', error);
      }
    };
    const fetchBlogs = async () => {
      try {
          const response = await axios.get('/api/blog/get');
          setBlogs(response.data.blogs || []);
      } catch (error) {
          console.error('Error fetching blogs:', error);
      }
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="container">
          <div className="card offset col-6">
              <div className="card-header">
                <div className="form-group row">
                  <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Title</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" value={title} placeholder="Enter Title"onChange={(e)=>SetTitle(e.target.value)}/>
                  </div>
                </div>    
              </div>
                  <div className="card-body">
                      <div className="form-floating">
                          <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                          value={blogContent}
                          onChange={(e) => setBlogContent(e.target.value)}></textarea>
                          <label htmlFor="floatingTextarea2">Comments</label><br />
                      </div>
                  </div>
                  <div className="card-footer d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary ml-auto">Submit</button>
                  </div>
              
              
          </div>
      </div>
    </form>
    {/* <div className="container">
        <div className="card offset col-8">
            <div className="card-header">
                <h3>Title</h3>
            </div>
            <div className="card-body">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laboriosam, asperiores assumenda dolorem labore explicabo suscipit aspernatur ut nostrum reiciendis repellat doloribus a alias reprehenderit cumque odio distinctio culpa. Commodi.</p>
            </div>
        </div>
      </div> */}
        { <div className="container">
            {blogs.map(blog => (
                <div className="card" key={blog._id}>
                    <div className="card-header">
                        <h3>{blog.title}</h3>
                    </div>
                    <div className="card-body">
                        <p>{blog.blogContent}</p>
                    </div>
                </div>
            ))}
        </div> } 
    </>
  )
}
