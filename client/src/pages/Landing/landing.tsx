// 
// Landing.tsx
// This file contains the Landing page component.
// It is the home page of the application and provides an overview of the platform.
// The Landing component is accessible to all users.
//


import { Link } from "react-router-dom";
import Layout from "../../layouts/layout";

function Landing() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        {/* Hero Section */}
        <section className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-6xl font-bold">
              Welcome to My Blog Platform
            </h1>
            <p className="mb-8 text-lg">
              Discover insightful articles, share your thoughts, and be part of
              our community!
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/signup"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-indigo-500 transition hover:bg-gray-200"
              >
                Get Started
              </Link>
              <Link
                to="/newfeed"
                className="rounded-lg border border-white bg-transparent px-6 py-3 transition hover:bg-white hover:text-indigo-500"
              >
                Explore Posts
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-8 text-4xl font-bold text-indigo-500">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold">
                  Engaging Content
                </h3>
                <p>
                  Read a variety of articles from different categories, written
                  by passionate authors.
                </p>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold">Easy to Use</h3>
                <p>
                  Our platform is user-friendly and designed for a seamless
                  reading and writing experience.
                </p>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold">
                  Community Driven
                </h3>
                <p>
                  Connect with other readers and authors by commenting and
                  sharing posts.
                </p>
              </div>
            </div>
          </div>
        </section>



        

        {/* Call to Action */}
        <section className="bg-indigo-600 py-16">
          <div className="container mx-auto text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Start Your Blogging Journey Today!
            </h2>
            <a
              href="/signup"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 transition hover:bg-gray-200"
            >
              Sign Up Now
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Landing;
