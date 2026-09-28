import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeData';
import { MapPin, Phone, Clock, Navigation, Calendar, Check, MessageSquare, Copy, Compass, Car, Train } from 'lucide-react';

export const StoreExperience: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<'interior' | 'exterior'>('exterior');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [conciergeSubmitted, setConciergeSubmitted] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [interestedItems, setInterestedItems] = useState('Heavyweight Boxy Tees & Denim');

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(STORE_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone) return;
    const generatedVoucher = `ATELIER-${Math.floor(100 + Math.random() * 900)}`;
    setVoucherCode(generatedVoucher);
    setConciergeSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Vesper Atelier! I'd like to check item availability and plan a visit to your Flagship Atelier.`
  );

  const transitRoutes = [
    { from: 'North Skyline District', time: '10 Mins', dist: '4.2 km', via: 'Via Aurora Expressway' },
    { from: 'Central Commerce Hub', time: '12 Mins', dist: '6.8 km', via: 'Via Metro Boulevard' },
    { from: 'West Coast Promenade', time: '15 Mins', dist: '7.5 km', via: 'Via Crescent Parkway' },
    { from: 'Garden District Galleria', time: '14 Mins', dist: '6.1 km', via: 'Via Velvet Avenue' },
  ];

  return (
    <section id="store" className="py-20 sm:py-28 bg-white border-b border-zinc-200 text-zinc-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-200 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-700 uppercase font-bold">
              <span>Physical Destination</span>
              <span className="text-zinc-300">/</span>
              <span>Atelier Visit</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-zinc-950 uppercase tracking-tight">
              The Flagship <span className="font-serif font-normal italic text-zinc-800">Sanctuary.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-md font-light leading-relaxed">
            Clothing of this weight must be touched, draped, and judged in person. We invite you to experience our collections at our flagship atelier with unhurried hospitality.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Dual Photo View (Exterior Facade vs Interior) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 border border-zinc-200 rounded-2xl group shadow-sm">
              <img
                src={
                  activePhoto === 'exterior'
                    ? '/src/assets/images/storefront_facade_kapas_hera_1790427639255.jpg'
                    : '/src/assets/images/store_interior_boutique_1790427218123.jpg'
                }
                alt="Vesper Atelier Flagship Atelier"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md border border-zinc-200 rounded-full text-xs shadow-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-zinc-900 font-semibold">OPEN TODAY TILL 10:30 PM</span>
              </div>

              {/* View Switcher Overlay on bottom right */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 border border-zinc-200 rounded-lg shadow-sm">
                <button
                  type="button"
                  onClick={() => setActivePhoto('exterior')}
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-md transition-colors ${
                    activePhoto === 'exterior'
                      ? 'bg-zinc-900 text-white font-bold'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  Atelier Facade
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto('interior')}
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-md transition-colors ${
                    activePhoto === 'interior'
                      ? 'bg-zinc-900 text-white font-bold'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  Interior Lounge
                </button>
              </div>

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-200">
                  {activePhoto === 'exterior'
                    ? 'Suite 404, Velvet Arcade Facade · Fashion District'
                    : 'Private Fitting Racks & Steaming Lounge'}
                </p>
              </div>
            </div>

            {/* Commuter Proximity Guide Table */}
            <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-600 border-b border-zinc-200 pb-2">
                <span className="flex items-center gap-1.5 text-zinc-900 font-bold">
                  <Car className="w-4 h-4 text-emerald-700" />
                  <span>COMMUTER PROXIMITY GUIDE</span>
                </span>
                <span className="text-emerald-700 font-semibold">FREE GUEST PARKING AT ATELIER VALET</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {transitRoutes.map((tr, i) => (
                  <div key={i} className="p-3 bg-white border border-zinc-200 rounded-lg space-y-0.5 shadow-2xs">
                    <span className="text-[10px] text-zinc-500 block truncate font-medium">{tr.from}</span>
                    <span className="text-zinc-950 font-bold text-sm block">{tr.time}</span>
                    <span className="text-[10px] text-zinc-400 block">{tr.dist}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Address, Direct Contact & Fitting Concierge */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="space-y-6">
              {/* Address card */}
              <div className="space-y-2 pb-6 border-b border-zinc-200">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Flagship Destination</span>
                </div>
                <h3 className="text-lg font-serif text-zinc-950 font-bold">
                  {STORE_INFO.address}
                </h3>
                <p className="text-xs font-mono text-zinc-600">
                  {STORE_INFO.city} {STORE_INFO.pincode}
                </p>
                <p className="text-xs text-zinc-500 pt-1 leading-relaxed">
                  Located in the heart of the Fashion District. Easily accessible via Aurora Expressway and Metro Boulevard.
                </p>
              </div>

              {/* Hours & Contact */}
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-zinc-200 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block">Hours</span>
                  <p className="text-zinc-950 font-bold text-sm">11:00 AM – 10:30 PM</p>
                  <span className="text-emerald-700 text-[11px] block font-semibold">Open 7 Days a Week</span>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block">Direct Line</span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${STORE_INFO.phone}`}
                      className="text-zinc-950 font-bold hover:text-emerald-700 transition-colors text-sm"
                    >
                      {STORE_INFO.phone}
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      title="Copy phone"
                      className="text-zinc-400 hover:text-black p-0.5"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="text-zinc-500 text-[10px] block">Direct In-Store Counter</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-zinc-900 hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Maps Route</span>
                </a>

                <a
                  href={`https://wa.me/919999900000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-900 font-mono font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Staff</span>
                </a>
              </div>
            </div>

            {/* In-Store Concierge / Fitting Room Hold Form */}
            <div className="pt-4 border-t border-zinc-200">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-zinc-900 font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>RESERVE FITTING ROOM HOLD</span>
                </span>
                <span className="text-[10px] text-zinc-500">NO ADVANCE PAYMENT</span>
              </div>

              {conciergeSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                    <span className="text-emerald-800 font-semibold">HOLD VOUCHER CODE:</span>
                    <span className="text-emerald-950 font-bold text-sm tracking-widest">{voucherCode}</span>
                  </div>
                  <p className="text-emerald-900 text-[11px] leading-relaxed">
                    Confirmed for <strong className="text-emerald-950">{visitorName}</strong>. Show this voucher upon arrival at our flagship atelier to test your requested articles pre-steamed.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConciergeSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-white border border-zinc-300 rounded-lg text-zinc-900 text-xs px-3 py-2 font-mono focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400"
                    />
                    <input
                      type="tel"
                      required
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder="Mobile / WhatsApp"
                      className="w-full bg-white border border-zinc-300 rounded-lg text-zinc-900 text-xs px-3 py-2 font-mono focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-lg text-zinc-700 text-xs px-3 py-2 font-mono focus:outline-none focus:border-zinc-900"
                    />
                    <select
                      value={interestedItems}
                      onChange={(e) => setInterestedItems(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-lg text-zinc-900 text-xs px-2.5 py-2 font-mono focus:outline-none focus:border-zinc-900"
                    >
                      <option value="Heavyweight Boxy Tees & Denim">Tees & Denim</option>
                      <option value="Outerwear & Winter Jackets">Jackets & Coats</option>
                      <option value="Linen Resort Shirts">Resort Shirts</option>
                      <option value="Complete Wardrobe Consultation">Full Wardrobe</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-zinc-900 hover:bg-black text-white text-xs font-mono uppercase tracking-wider font-bold rounded-lg transition-colors shadow-sm"
                  >
                    Generate In-Store Hold Voucher →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
