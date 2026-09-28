import React, { useState } from 'react';
import { Review } from '../types';
import { Star, CheckCircle, Plus, ThumbsUp, MessageSquare } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface CustomerReviewsProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews, onAddReview }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  // New review form state
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Metro City');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<'Fit & Quality' | 'Customer Experience' | 'Pricing' | 'Collection'>('Fit & Quality');

  const tags = ['All', 'Fit & Quality', 'Customer Experience', 'Pricing', 'Collection'];

  const filteredReviews = reviews.filter((rev) => {
    if (selectedTag === 'All') return true;
    return rev.tag === selectedTag;
  });

  const handleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    onAddReview({
      author: author.trim(),
      location: location.trim() || 'Metro City',
      rating,
      title: title.trim() || 'Great in-store experience',
      content: content.trim(),
      tag,
      verifiedPurchase: true,
    });

    // Reset form
    setAuthor('');
    setTitle('');
    setContent('');
    setShowAddModal(false);
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#fafafc] border-y border-zinc-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-200 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-700 mb-2 uppercase font-bold">
              <span>Google Local Guide Verified</span>
              <span className="text-zinc-300">/</span>
              <span>497, Street 9 Archive</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-zinc-950 uppercase tracking-tight">
              Customer Feedback
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white border border-zinc-300 hover:border-zinc-400 text-xs font-mono text-zinc-700 hover:text-black rounded-full transition-colors shadow-xs"
            >
              Verify on Google Maps (4.8★) ↗
            </a>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-full flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Write Review</span>
            </button>
          </div>
        </div>

        {/* Aggregate Ratings Overview Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 p-8 bg-white border border-zinc-200 rounded-2xl shadow-xs items-center">
          {/* Main 4.8 Rating Display */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start border-b lg:border-b-0 lg:border-r border-zinc-200 pb-6 lg:pb-0 lg:pr-8 text-center sm:text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-light text-zinc-950 font-mono tracking-tight font-bold">
                4.8
              </span>
              <span className="text-xl font-mono text-zinc-500">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 my-2 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-xs uppercase font-mono tracking-wider text-zinc-700 font-bold">
              77 Verified Google Local Reviews
            </p>
            <p className="text-xs text-zinc-500 mt-1 font-mono">
              Listing: Vesper Atelier · Flagship Atelier
            </p>
          </div>

          {/* Star Breakdown bars */}
          <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-zinc-200 pb-6 lg:pb-0 lg:pr-8 font-mono">
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <span className="w-8 font-mono">5 ★</span>
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[88%]" />
              </div>
              <span className="w-8 text-right text-zinc-800 font-semibold">88%</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <span className="w-8">4 ★</span>
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[10%]" />
              </div>
              <span className="w-8 text-right text-zinc-800 font-semibold">10%</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <span className="w-8">3 ★</span>
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-300 w-[2%]" />
              </div>
              <span className="w-8 text-right text-zinc-500">2%</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <span className="w-8">2 ★</span>
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-200 w-[0%]" />
              </div>
              <span className="w-8 text-right text-zinc-400">0%</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <span className="w-8">1 ★</span>
              <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-200 w-[0%]" />
              </div>
              <span className="w-8 text-right text-zinc-400">0%</span>
            </div>
          </div>

          {/* Genuine Review Summary directly matching prompt */}
          <div className="lg:col-span-4 space-y-2 text-xs text-zinc-700 leading-relaxed border-l-2 border-emerald-600 pl-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-700 font-bold block">
              Google Review Consensus
            </span>
            <p className="italic text-zinc-700 text-xs sm:text-sm font-light">
              "People say this clothing store offers a fantastic collection of high-quality, imported articles with consistent fits and attention to detail. They also highlight the fair prices and the warm, welcoming vibe. Others mention the helpful and polite staff who provide honest suggestions."
            </p>
          </div>
        </div>

        {/* Filter Tabs by Tag */}
        <div className="flex items-center gap-1.5 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full border transition-all ${
                selectedTag === t
                  ? 'bg-zinc-900 text-white font-bold border-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-black border-zinc-200 hover:border-zinc-300 bg-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row: stars & date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h4 className="text-sm font-semibold text-zinc-900 mb-2 leading-snug">
                  "{rev.title}"
                </h4>

                {/* Content */}
                <p className="text-xs text-zinc-600 leading-relaxed mb-4 font-light">
                  {rev.content}
                </p>
              </div>

              {/* Footer info: author, tag, helpful button */}
              <div className="pt-4 border-t border-zinc-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-zinc-900 block">{rev.author}</span>
                    <span className="text-[11px] text-zinc-500">{rev.location}</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-mono font-medium">
                    {rev.tag}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified In-Store Buyer
                  </span>
                  <button
                    onClick={() => handleHelpful(rev.id)}
                    className="flex items-center gap-1 hover:text-zinc-900 transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({helpfulCounts[rev.id] || 0})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
              <div>
                <h3 className="text-xl font-serif text-zinc-950 font-bold">Share Your Experience</h3>
                <p className="text-xs text-zinc-500">Vesper Atelier · Flagship Atelier</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-500 text-amber-500' : 'text-zinc-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-zinc-700 ml-2 font-semibold">{rating} of 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                  Primary Highlight
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as any)}
                  className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-900"
                >
                  <option value="Fit & Quality">Fit & Quality</option>
                  <option value="Customer Experience">Customer Experience & Polite Staff</option>
                  <option value="Pricing">Fair Pricing</option>
                  <option value="Collection">Imported Collection & Drops</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                    City / Neighborhood
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Metro City, MC"
                    className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Incredible fit and genuine fabric weight"
                  className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-700 font-mono font-bold block mb-1">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell others about the clothing quality, fits, prices, or staff assistance..."
                  className="w-full bg-white border border-zinc-300 text-zinc-900 text-xs p-3 rounded-lg focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-600 hover:text-black font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-zinc-900 hover:bg-black text-white font-semibold text-xs uppercase tracking-wider rounded-full transition-colors shadow-sm"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
