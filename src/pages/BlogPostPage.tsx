import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Calendar, User, Tag, Share2, Clock } from 'lucide-react';
import { RootState } from '../store';
import { fetchPostById, clearCurrentPost } from '../store/slices/blogSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { currentPost, isLoading } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(parseInt(id)) as any);
    }
    
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <LoadingSpinner message="Loading article..." />;
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article not found
          </h1>
          <Link
            to="/blog"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentPost.title,
        text: currentPost.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-blue-100 hover:text-white mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </Link>
          
          <div className="mb-6">
            {currentPost.featured && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                Featured Article
              </span>
            )}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {currentPost.title}
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {currentPost.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{currentPost.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(currentPost.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>5 min read</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={currentPost.image}
            alt={currentPost.title}
            className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
            {currentPost.content}
          </div>
        </div>

        {/* Tags */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {currentPost.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
              >
                <Tag className="w-4 h-4" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how we can help bring your vision to life.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
          >
            <span>Get In Touch</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;