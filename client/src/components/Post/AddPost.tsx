import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import JoditEditor from "jodit-react";
import Modal from "../Modal/Modal";

interface Category {
  id: string;
  name: string;
}

const AddPost: React.FC = () => {
  const { user } = useContext(UserContext);
  const editor = useRef(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!user?.id) {
      console.error("User ID is missing");
      setModalMessage("User ID is missing. Please try again.");
      setIsSuccess(false);
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category: selectedCategory,
          authorId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Post added successfully:", result);

      setModalMessage("Post added successfully!");
      setIsSuccess(true);
      setIsModalOpen(true);

      resetForm(); 
    } catch (error) {
      console.error("Error adding post:", error);

      setModalMessage("Error adding post. Please try again.");
      setIsSuccess(false);
      setIsModalOpen(true);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedCategory("");
  };

  return (
    <div className="mx-auto my-8  max-w-6xl rounded bg-background-card px-8 py-6 shadow-md">
      <h1 className="mb-6 text-3xl font-semibold text-text-1">
        Create New Post
      </h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-text-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded border border-gray-900 bg-gray-200 px-3 py-2 text-base placeholder-gray-600"
            placeholder="Enter the title"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-medium text-text-1"
          >
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block rounded border border-gray-900 bg-gray-200 px-3 py-2 text-base placeholder-gray-600"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Jodit Editor */}
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-text-1"
          >
            Content Editor
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSubmit} // Submit the form
            className="rounded bg-blue-600 px-6 py-2 font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Post
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="rounded bg-gray-300 px-6 py-2 font-medium text-gray-800 shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        message={modalMessage} 
        isSuccess={isSuccess} 
      />
    </div>
  );
};

export default AddPost;
