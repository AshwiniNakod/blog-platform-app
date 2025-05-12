import axios from 'axios';
import  { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';

function BlogList() {
      const [posts, setPosts] = useState([]);
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const navigate = useNavigate();
      useEffect(() => {
        axios.get(`http://localhost:8000/api/blog/getAllPost?page=${page}&limit=3`)
        .then(res => {
          // console.log(res);
          setPosts(res.data.message); 
          setTotalPages(res.data.totalPages);
      })
      .catch(err => console.log(err));
      }, [page]);
  return ( 
  <div>
    <h2>BLOG POSTS</h2>
    <div>
    <button style={{ float: 'right', margin: '10px', padding: '10px'}} onClick={()=>navigate('/login')}>LOGIN</button>
    </div>
    { posts.length <= 0 ? <p>No post available</p> :<table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th className='thStyle'>Title</th>
          <th className='thStyle'>Content</th>
          <th className='thStyle'>Tags</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post._id}>
            <td className='tdStyle'>{post.title}</td>
            <td className='tdStyle'>{post.content}</td>
            <td className='tdStyle'>{post.tags}</td>
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

export default BlogList
