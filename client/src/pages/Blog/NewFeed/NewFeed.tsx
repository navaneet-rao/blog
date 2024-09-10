import  { useEffect, useState } from "react";

import Layout from "../../../layouts/layout";
import DOMPurify from "dompurify"; // For sanitizing HTML content
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string; // May contain HTML content
  createdAt: string;
  author: {
    name: string;
  };
  commentsCount: number; // Number of comments
  category: string; // Post category
}

const NewFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/allposts");
        const data = await response.json();

         console.log(data.posts);

        if (response.ok) {
          setPosts(data.posts);
        } else {
          setError(data.error || "Error fetching posts");
        }
      } catch (err) {
        setError("Failed to fetch posts");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  if (loading) {
    return <Loading />;
  }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <Layout>
      <div className="h-full bg-gradient-to-b from-background-1 to-background-2 pt-28">
        <main className="container mx-auto min-h-screen">
          <h1 className="mb-8 text-center text-3xl font-bold">Latest Posts</h1>
          {posts.length === 0 ? (
            <p className="text-center text-lg">No posts available</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md"
                >
                  {/* Author Name and Category */}
                  <div className="mb-4 flex items-center text-sm text-gray-500">
                    <span className="mr-2">By {post.author.name}</span>
                    <span className="text-gray-400">|</span>
                    <span className="ml-2">{post.category}</span>
                  </div>

                  {/* Post Title */}
                  <h2 className="mb-2 text-xl font-semibold text-gray-800">
                    {post.title}
                  </h2>

                  {/* Render HTML content safely */}
                  <div
                    className="mb-4 line-clamp-3 text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.content),
                    }}
                  />

                  {/* Footer with Comments Count, Date, and Read More button */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                      <span className="mr-2">
                        {post.commentsCount} Comment
                        {post.commentsCount !== 1 ? "s" : ""}
                      </span>
                      <span className="mr-2">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Link
                      to={`/post/${post.id}`}
                      target="_blank"
                      className="text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default NewFeed;
