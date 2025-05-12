import axios from 'axios';
import { useEffect, useState } from 'react'

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem('token');


  
 useEffect(() => {
    axios.get(`http://localhost:8000/api/blog/getAllPost?page=${page}&limit=3`)
      .then((res) =>{ 
        console.log(res.data.message)
        setPosts(res.data.message)
        setTotalPages(res.data.totalPages);
    })
      .catch(err => console.log(err));
  }, [page]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const createPost = (e) => {
  //    e.preventDefault();
  //   axios.post('http://localhost:8000/api/blog/createPost', formData, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }).then(res => {
  //     setPosts([...posts, res.data]);
  //     setFormData({ title: '', content: '', tags: '' });
  //   }).catch(err => console.log(err));
  // };

  const createPost = (e) => {
  e.preventDefault();
  axios.post('http://localhost:8000/api/blog/createPost', formData, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(() => {
    setFormData({ title: '', content: '', tags: '' });

    // Refresh posts from backend
    axios.get(`http://localhost:8000/api/blog/getAllPost?page=${page}&limit=3`)
      .then((res) => {
        setPosts(res.data.message);
        setTotalPages(res.data.totalPages);
      });
  }).catch(err => console.log(err));
};

  const deletePost = (id) => {
    axios.delete(`http://localhost:8000/api/blog/deletePost/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setPosts(posts.filter(post => post._id !== id));
    }).catch(err => console.log(err));
  };
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={createPost}>
        <div className="form-container">
        <input name="title" placeholder="Title" onChange={handleChange} value={formData.title} />
        <input name="content" placeholder="Content" onChange={handleChange} value={formData.content} />
        <input name="tags" placeholder="Tags" onChange={handleChange} value={formData.tags} />
        {/* <button onClick={createPost}>Create Post</button> */}
        <button type='submit'>CREATE POST</button>
      </div>
      </form>
    {posts.length <= 0 ? <p>No Post available</p> : <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th className='thStyle'>Title</th>
          <th className='thStyle'>Content</th>
          <th className='thStyle'>Tags</th>
          <th className='thStyle'>Action</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post._id}>
            <td className='tdStyle'>{post.title}</td>
            <td className='tdStyle'>{post.content}</td>
            <td className='tdStyle'>{post.tags}</td>
            <td>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>}
      {totalPages > 1 && (
    <div style={{ marginTop: '20px' }}>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <span style={{ margin: '0 10px' }}>
        Page {page} of {totalPages}
      </span>
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  )}
    </div>
  )
}

export default AdminDashboard
