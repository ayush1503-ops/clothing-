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
    const generatedVoucher = `KAPAS-${Math.floor(100 + Math.random() * 900)}`;
    setVoucherCode(generatedVoucher);
    setConciergeSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Big Bear Wear! I'd like to check item availability and plan a visit to your Street 9, Kapas Hera store.`
  );

  const transitRoutes = [
    { from: 'DLF CyberCity / Gurugram', time: '10 Mins', dist: '4.2 km', via: 'Via Shankar Chowk / NH-48' },
    { from: 'Aerocity / T3 Terminal', time: '12 Mins', dist: '6.8 km', via: 'Via Dwarka Link Road' },
    { from: 'Dwarka Sector 21', time: '15 Mins', dist: '7.5 km', via: 'Via Bijwasan Road' },
    { from: 'Vasant Kunj / Ambience', time: '14 Mins', dist: '6.1 km', via: 'Via Kapas Hera Border' },
  ];

  return (
    <section id="store" className="py-24 bg-[#08090b] border-t border-white/10 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c5a880] uppercase">
              <span>Physical Destination</span>
              <span className="text-zinc-600">/</span>
              <span>Atelier Visit</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight uppercase">
              The Kapas Hera <span className="italic text-[#ece8e1]">Sanctuary.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light leading-relaxed">
            Clothing of this weight must be touched, draped, and judged in person. We invite you to experience our collections at Street 9 with unhurried hospitality.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Dual Photo View (Exterior Facade vs Interior) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 border border-white/15 group">
              <img
                src={
                  activePhoto === 'exterior'
                    ? '/src/assets/images/storefront_facade_kapas_hera_1790427639255.jpg'
                    : '/src/assets/images/store_interior_boutique_1790427218123.jpg'
                }
                alt="Big Bear Wear Flagship Boutique Kapas Hera New Delhi"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/85 backdrop-blur-md border border-white/15 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-zinc-200">OPEN TODAY TILL 10:30 PM</span>
              </div>

              {/* View Switcher Overlay on bottom right */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 border border-white/15">
                <button
                  onClick={() => setActivePhoto('exterior')}
                  className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors ${
                    activePhoto === 'exterior'
                      ? 'bg-white text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Street 9 Facade
                </button>
                <button
                  onClick={() => setActivePhoto('interior')}
                  className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors ${
                    activePhoto === 'interior'
                      ? 'bg-white text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Interior Lounge
                </button>
              </div>

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-300">
                  {activePhoto === 'exterior'
                    ? '497, Street 9 Facade · Kapas Hera Extension'
                    : 'Private Fitting Racks & Steaming Lounge'}
                </p>
              </div>
            </div>

            {/* Delhi NCR Transit Guide Table */}
            <div className="p-4 bg-[#0f1013] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5 text-white">
                  <Car className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>COMMUTER PROXIMITY GUIDE</span>
                </span>
                <span className="text-[#c5a880]">FREE GUEST PARKING ON STREET 9</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {transitRoutes.map((tr, i) => (
                  <div key={i} className="p-2.5 bg-zinc-950 border border-white/5 space-y-0.5">
                    <span className="text-[10px] text-zinc-400 block truncate">{tr.from}</span>
                    <span className="text-white font-bold text-sm block">{tr.time}</span>
                    <span className="text-[10px] text-zinc-400 block">{tr.dist}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Address, Direct Contact & Fitting Concierge */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#0f1013] border border-white/15 p-6 sm:p-8">
            <div className="space-y-6">
              {/* Address card */}
              <div className="space-y-2 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c5a880]">
                  <MapPin className="w-4 h-4 text-[#c5a880]" />
                  <span>Flagship Destination</span>
                </div>
                <h3 className="text-lg font-serif text-white">
                  497, Street 9, Kapas Hera Extension
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Kapas Hera, New Delhi, Delhi 110097
                </p>
                <p className="text-xs text-zinc-500 pt-1 leading-relaxed">
                  Located near the Delhi–Gurugram state border. Easily accessible via NH-48, Aerocity, and Dwarka Link Road.
                </p>
              </div>

              {/* Hours & Contact */}
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-white/10 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block">Hours</span>
                  <p className="text-white font-bold">11:00 AM – 10:30 PM</p>
                  <span className="text-emerald-400 text-[11px] block">Open 7 Days a Week</span>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block">Direct Line</span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${STORE_INFO.phone}`}
                      className="text-white font-bold hover:text-[#c5a880] transition-colors"
                    >
                      {STORE_INFO.phone}
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      title="Copy phone"
                      className="text-zinc-400 hover:text-white p-0.5"
                    >
                      {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <span className="text-zinc-400 text-[10px] block">Direct In-Store Counter</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-white text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ece8e1] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps Route</span>
                </a>

                <a
                  href={`https://wa.me/918750110001?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-zinc-900 border border-white/20 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:border-white/50 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Staff</span>
                </a>
              </div>
            </div>

            {/* In-Store Concierge / Fitting Room Hold Form */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-zinc-200 font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>RESERVE FITTING ROOM HOLD</span>
                </span>
                <span className="text-[10px] text-zinc-400">NO ADVANCE PAYMENT</span>
              </div>

              {conciergeSubmitted ? (
                <div className="p-4 bg-zinc-950 border border-[#c5a880]/40 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-zinc-400">HOLD VOUCHER CODE:</span>
                    <span className="text-white font-bold text-sm tracking-widest text-[#c5a880]">{voucherCode}</span>
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">
                    Confirmed for <strong className="text-white">{visitorName}</strong>. Show this voucher upon arrival at 497 Street 9 to test your requested articles pre-steamed.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConciergeSubmit} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-zinc-950 border border-white/15 text-white text-xs px-2.5 py-2 font-mono focus:outline-none focus:border-white"
                    />
                    <input
                      type="tel"
                      required
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder="Mobile / WhatsApp"
                      className="w-full bg-zinc-950 border border-white/15 text-white text-xs px-2.5 py-2 font-mono focus:outline-none focus:border-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/15 text-zinc-300 text-xs px-2.5 py-2 font-mono focus:outline-none focus:border-white"
                    />
                    <select
                      value={interestedItems}
                      onChange={(e) => setInterestedItems(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/15 text-white text-xs px-2 py-2 font-mono focus:outline-none focus:border-white"
                    >
                      <option value="Heavyweight Boxy Tees & Denim">Tees & Denim</option>
                      <option value="Outerwear & Winter Jackets">Jackets & Coats</option>
                      <option value="Linen Resort Shirts">Resort Shirts</option>
                      <option value="Complete Wardrobe Consultation">Full Wardrobe</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono uppercase tracking-wider font-bold border border-white/20 hover:border-white/40 transition-colors"
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

