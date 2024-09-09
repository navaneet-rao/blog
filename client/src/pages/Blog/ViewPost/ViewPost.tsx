import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../layouts/layout";
import DOMPurify from "dompurify";
import Loading from "../../Loading/Loading";

interface Post {
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
  category: string;
}

const PostView = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/posts/${postId}`,
        );
        const data = await response.json();

        if (response.ok) {
          setPost(data.post);
        } else {
          setError(data.error || "Error fetching post");
        }
      } catch (err) {
        setError("Failed to fetch post");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Layout>
      <div className="h-full bg-gradient-to-b from-background-1 to-background-2 pt-28">
        <div className="min-h-screen">
          <main className="container mx-auto  rounded bg-white px-16 py-10">
            {post ? (
              <div className="prose lg:prose-xl">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <p className="text-sm text-gray-500">
                  By {post.author.name} | {post.category} |{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content),
                  }}
                />
              </div>
            ) : (
              <p>No post found</p>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default PostView;
