// 
// CreateBlog.tsx 
// This file contains the CreateBlog page component.
// It imports the AddPost component and wraps it in the Layout component.
// The CreateBlog component is used to create a new blog post.
// It is accessible only to authenticated users.
// 

import { lazy } from "react";
import Layout from "../../../layouts/layout";
const AddPost = lazy(() => import("../../../components/Post/AddPost"));

function CreateBlog() {
  return (
    <Layout>
      <div className="h-full bg-background-2">
        <div className="min-h-screen pt-28">
          <AddPost />
        </div>
      </div>
    </Layout>
  );
}

export default CreateBlog;
