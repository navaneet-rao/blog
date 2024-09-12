//
// CommentsSection.tsx 
//
// This component is responsible for displaying the comments section of a post. 
// It allows users to add new comments and delete their own comments. 
// It fetches the comments for a post from the server and displays them in a list. 
// It also displays any errors or success messages that occur while adding or deleting comments.
// The component uses the UserContext to access the current user and token,
//


import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

interface Comment {
  id: string;
  content: string;
  author?: {
    id?: string;
    name?: string;
  };
  createdAt: string;
}

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { user, token } = useContext(UserContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://0.0.0.0:5000/api/posts/${postId}/comments`,
        );
        const data = await response.json();

        if (response.ok) {
          setComments(data.comments || []); // Ensure that data.comments is an array
        } else {
          setError(data.error || "Failed to load comments.");
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong while fetching comments.");
      }
    };

    fetchComments();
  }, [postId, success]); // Re-fetch comments after adding or deleting a comment

  const handleCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    setError(null);
    setSuccess(null);

    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        `http://0.0.0.0:5000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: comment,
            authorId: user?.id,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to submit comment.");
      } else {
        setComment("");
        setSuccess("Comment added successfully!");
        setComments((prevComments) => [...prevComments, data.comment]); // Add the new comment to the list
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Something went wrong.");
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    if (!user?.id) return;

    try {
      const response = await fetch(
        `http://0.0.0.0:5000/api/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user.id }), // Include userId in the request body
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to delete comment.");
      } else {
        setSuccess("Comment deleted successfully!");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId),
        ); // Remove the deleted comment from the list
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-text-1">Comments Section</h3>
      <form onSubmit={handleCommentSubmit} className="mt-4 text-text-1">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded p-2 text-black"
          placeholder="Add your comment here..."
          rows={5}
        />
        {error && (
          <p className="mt-2 text-red-500">
            Please login or check your internet connection: {error}
          </p>
        )}
        {success && <p className="mt-2 text-green-500">{success}</p>}
        <button
          type="submit"
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>

      {/* Comments List */}
      <div className="mt-8">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mt-4 border-t pt-4">
              <p className="text-lg">{comment.content}</p>
              <p className="text-sm text-gray-500">
                By {comment.author?.name || "Unknown"} |{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              {comment.author?.id === user?.id && (
                <button
                  onClick={() => handleCommentDelete(comment.id)}
                  className="mt-2 text-red-500 hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
