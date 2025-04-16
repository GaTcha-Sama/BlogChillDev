// import { useState, useEffect } from 'react';
// import { postService } from '../services/postService';

// export const Home = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const data = await postService.getAllPosts();
//         setPosts(data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <section className="">
//       <button>
//         Ajouter un post
//       </button>
      
//       <select aria-label="Filtrer par type">
//         <option value="all">Tous</option>
//         <option value="post">Post</option>
//         <option value="comment">Commentaire</option>
//       </select>

//       <button>
//         Rechercher
//       </button>

//       {/* Affichage des posts */}
//       <div>
//         {posts.map((post) => (
//           <div key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.content}</p>
//             <p>{post.author}</p>
//             <p>{post.created_at}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };
