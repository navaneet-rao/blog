import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../layouts/layout";
import DOMPurify from "dompurify";
import Loading from "../../Loading/Loading";
import CommentsSection from "../../../components/Comments/CommentsSection";

import "./ViewPost.css";

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
          `http://192.168.29.252:5000/api/posts/${postId}`,
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
      <div className="h-full bg-background-2 w-full pt-28">
        <div className="min-h-screen">
          <main className="container mx-auto rounded px-5">
            <div>
              {post ? (
                <div className="prose lg:prose-xl">
                  <h1 className="text-3xl font-bold text-text-1">
                    {post.title}
                  </h1>
                  <p className="text-sm text-gray-500">
                    By {post.author.name} | {post.category} |{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <div
                    className="ViewPost-contant-section mt-4"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.content),
                    }}
                  />
                </div>
              ) : (
                <p>No post found</p>
              )}
            </div>
            <div className="mt-10 border-t text-text-1 pb-10 border-text-1">
              <CommentsSection postId={postId!} />
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default PostView;
