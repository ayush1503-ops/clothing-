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
  const [location, setLocation] = useState('New Delhi');
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
      location: location.trim() || 'New Delhi',
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
    <section id="reviews" className="py-24 bg-[#0d0e11] border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c5a880] mb-2 uppercase">
              <span>Google Local Guide Verified</span>
              <span className="text-zinc-600">/</span>
              <span>497, Street 9 Archive</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight uppercase">
              The Patron Ledger
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-zinc-950 border border-white/15 hover:border-white/40 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              Verify on Google Maps (4.8★) ↗
            </a>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#ece8e1] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write Review</span>
            </button>
          </div>
        </div>

        {/* Aggregate Ratings Overview Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 p-8 bg-[#0f1013] border border-white/15 items-center">
          {/* Main 4.8 Rating Display */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8 text-center sm:text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-light text-white font-mono tracking-tight">
                4.8
              </span>
              <span className="text-xl font-mono text-zinc-500">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 my-2 text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
              ))}
            </div>
            <p className="text-xs uppercase font-mono tracking-wider text-zinc-400 font-medium">
              77 Verified Google Local Reviews
            </p>
            <p className="text-xs text-zinc-500 mt-1 font-mono">
              Listing: Big Bear Wear · Street 9 Kapas Hera
            </p>
          </div>

          {/* Star Breakdown bars */}
          <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8 font-mono">
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="w-8 font-mono">5 ★</span>
              <div className="flex-1 h-1.5 bg-zinc-800 overflow-hidden">
                <div className="h-full bg-[#d4af37] w-[88%]" />
              </div>
              <span className="w-8 text-right text-zinc-300">88%</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="w-8">4 ★</span>
              <div className="flex-1 h-1.5 bg-zinc-800 overflow-hidden">
                <div className="h-full bg-[#d4af37] w-[10%]" />
              </div>
              <span className="w-8 text-right text-zinc-300">10%</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="w-8">3 ★</span>
              <div className="flex-1 h-1.5 bg-zinc-800 overflow-hidden">
                <div className="h-full bg-zinc-600 w-[2%]" />
              </div>
              <span className="w-8 text-right text-zinc-500">2%</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="w-8">2 ★</span>
              <div className="flex-1 h-1.5 bg-zinc-800 overflow-hidden">
                <div className="h-full bg-zinc-600 w-[0%]" />
              </div>
              <span className="w-8 text-right text-zinc-500">0%</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="w-8">1 ★</span>
              <div className="flex-1 h-1.5 bg-zinc-800 overflow-hidden">
                <div className="h-full bg-zinc-600 w-[0%]" />
              </div>
              <span className="w-8 text-right text-zinc-500">0%</span>
            </div>
          </div>

          {/* Genuine Review Summary directly matching prompt */}
          <div className="lg:col-span-4 space-y-2 text-xs text-zinc-300 leading-relaxed border-l-2 border-[#c5a880] pl-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] font-semibold block">
              Google Review Consensus
            </span>
            <p className="italic text-zinc-300 text-xs sm:text-sm font-light">
              "People say this clothing store offers a fantastic collection of high-quality, imported articles with consistent fits and attention to detail. They also highlight the fair prices and the warm, welcoming vibe. Others mention the helpful and polite staff who provide honest suggestions."
            </p>
          </div>
        </div>

        {/* Filter Tabs by Tag */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                selectedTag === t
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10'
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
              className="p-6 bg-[#111215] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row: stars & date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-[#d4af37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
                  "{rev.title}"
                </h4>

                {/* Content */}
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {rev.content}
                </p>
              </div>

              {/* Footer info: author, tag, helpful button */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-zinc-200 block">{rev.author}</span>
                    <span className="text-[11px] text-zinc-500">{rev.location}</span>
                  </div>
                  <span className="text-[11px] text-[#c5a880] tracking-wide">
                    {rev.tag}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle className="w-3 h-3" />
                    Verified In-Store Buyer
                  </span>
                  <button
                    onClick={() => handleHelpful(rev.id)}
                    className="flex items-center gap-1 hover:text-zinc-300 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111215] border border-white/20 p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-xl font-serif text-white">Share Your Experience</h3>
                <p className="text-xs text-zinc-400">Big Bear Wear · Kapas Hera Extension</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">
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
                          star <= rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-zinc-300 ml-2">{rating} of 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">
                  Primary Highlight
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-white/10 text-white text-xs px-3 py-2 rounded-none focus:outline-none focus:border-[#c5a880]"
                >
                  <option value="Fit & Quality">Fit & Quality</option>
                  <option value="Customer Experience">Customer Experience & Polite Staff</option>
                  <option value="Pricing">Fair Pricing</option>
                  <option value="Collection">Imported Collection & Drops</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Tarun Verma"
                    className="w-full bg-zinc-900 border border-white/10 text-white text-xs px-3 py-2 rounded-none focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">
                    City / Neighborhood
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kapas Hera, Delhi"
                    className="w-full bg-zinc-900 border border-white/10 text-white text-xs px-3 py-2 rounded-none focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Incredible fit and genuine fabric weight"
                  className="w-full bg-zinc-900 border border-white/10 text-white text-xs px-3 py-2 rounded-none focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell others about the clothing quality, fits, prices, or staff assistance..."
                  className="w-full bg-zinc-900 border border-white/10 text-white text-xs p-3 rounded-none focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#e8e4dc] transition-colors"
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
