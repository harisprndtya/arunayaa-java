/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  MapPin,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import {
  BcaLogo,
  GoldCornerFiligree,
  MandalaLaceBackdrop,
  OrchidBotanicalSpray,
  SongketDiamondBorder,
  WeddingGiftDivider,
} from './components/Ornaments';
import { FlipClockCountdown } from './components/FlipClockCountdown';
import { SafeImage } from './components/SafeImage';
import { gamelanPlayer } from './utils/gamelanAudio';

const IMAGES = {
  keratonBg: '/src/assets/images/javanese_keraton_bg_1791721574276.jpg',
  coupleWide: '/src/assets/images/couple_wide_gebyok_1791721588168.jpg',
  groomSolo: '/src/assets/images/groom_solo_portrait_1791721607972.jpg',
  brideSolo: '/src/assets/images/bride_solo_portrait_1791721619099.jpg',
  coupleSeated: '/src/assets/images/couple_portrait_seated_1791721635561.jpg',
  coupleGaze: '/src/assets/images/couple_portrait_gaze_1791721646889.jpg',
};

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'bride-solo',
    src: IMAGES.brideSolo,
    title: 'Dinda',
    caption: 'Potret mempelai wanita dalam balutan kebaya beludru hitam adat Jawa',
  },
  {
    id: 'groom-solo',
    src: IMAGES.groomSolo,
    title: 'Gusti',
    caption: 'Potret mempelai pria dalam balutan beskap beludru hitam dan blangkon batik',
  },
  {
    id: 'couple-seated',
    src: IMAGES.coupleSeated,
    title: 'Awal Bertemu & Lamaran',
    caption: 'Dinda & Gusti di depan gebyok ukir kayu jati dan tirai beludru merah',
  },
  {
    id: 'couple-gaze',
    src: IMAGES.coupleGaze,
    title: 'Kasih & Ketenteraman',
    caption: 'Momen hangat menjelang hari bahagia pernikahan Dinda & Gusti',
  },
  {
    id: 'couple-wide',
    src: IMAGES.coupleWide,
    title: 'Dinda & Gusti — 23.08.2025',
    caption: 'Potret utama pelaminan adat Jawa klasik',
  },
];

interface WishEntry {
  id: string;
  name: string;
  attendance: 'Hadir' | 'Berhalangan';
  message: string;
  timestamp: string;
}

const INITIAL_WISHES: WishEntry[] = [
  {
    id: 'w1',
    name: 'Eka dan Pasangan',
    attendance: 'Hadir',
    message:
      'Selamat menempuh hidup baru Dinda & Gusti! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah hingga akhir hayat.',
    timestamp: 'Minggu, 23 Agustus 2025',
  },
  {
    id: 'w2',
    name: 'Keluarga Besar Bapak Hendra',
    attendance: 'Hadir',
    message:
      'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair. Lancar sampai hari H di Orchid Cikole Bandung.',
    timestamp: 'Minggu, 23 Agustus 2025',
  },
];

export default function App() {
  const [guestName, setGuestName] = useState<string>('Eka dan Pasangan');
  const [isGuestModalOpen, setIsGuestModalOpen] = useState<boolean>(false);
  const [guestInput, setGuestInput] = useState<string>('Eka dan Pasangan');

  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [mapModalEvent, setMapModalEvent] = useState<'Akad' | 'Resepsi' | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // RSVP & Wishes state
  const [wishes, setWishes] = useState<WishEntry[]>(INITIAL_WISHES);
  const [rsvpName, setRsvpName] = useState<string>('');
  const [rsvpAttendance, setRsvpAttendance] = useState<'Hadir' | 'Berhalangan'>('Hadir');
  const [rsvpMessage, setRsvpMessage] = useState<string>('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);

  // Read ?to= query parameter if provided
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('kepada');
    if (toParam && toParam.trim()) {
      setGuestName(toParam.trim());
      setGuestInput(toParam.trim());
    }
  }, []);

  // Keyboard navigation for Lightbox & Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setMapModalEvent(null);
        setIsGuestModalOpen(false);
      } else if (lightboxIndex !== null && e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
      } else if (lightboxIndex !== null && e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleOpenInvitation = () => {
    if (!isPlayingAudio) {
      gamelanPlayer.start();
      setIsPlayingAudio(true);
    }
    const heroEl = document.getElementById('hero-welcome');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToOurLove = () => {
    const loveEl = document.getElementById('our-love');
    if (loveEl) {
      loveEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAudio = () => {
    const nextState = gamelanPlayer.toggle();
    setIsPlayingAudio(nextState);
  };

  const handleCopyAccount = (recipient: string, accountNumber: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(accountNumber).catch(() => {});
    }
    setCopiedAccount(recipient);
    setTimeout(() => {
      setCopiedAccount((prev) => (prev === recipient ? null : prev));
    }, 2500);
  };

  const handleSaveGuestName = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestInput.trim()) {
      setGuestName(guestInput.trim());
      const url = new URL(window.location.href);
      url.searchParams.set('to', guestInput.trim());
      window.history.replaceState({}, '', url.toString());
    }
    setIsGuestModalOpen(false);
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) return;
    const newEntry: WishEntry = {
      id: `w-${Date.now()}`,
      name: rsvpName.trim(),
      attendance: rsvpAttendance,
      message: rsvpMessage.trim(),
      timestamp: 'Baru saja',
    };
    setWishes((prev) => [newEntry, ...prev]);
    setRsvpName('');
    setRsvpMessage('');
    setRsvpSubmitted(true);
    setTimeout(() => setRsvpSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#E8E0D0] text-[#1A1715] flex flex-col items-center">
      {/* Top Bar Contract: 3 zones (Brand — 5 single-line nav links — 1 primary CTA) */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF5EC]/95 backdrop-blur-md border-b border-[#D8CBB3] px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
          <a
            href="#cover-gate"
            className="font-script text-2xl sm:text-3xl text-[#1A1715] whitespace-nowrap shrink-0"
          >
            Dinda &amp; Gusti
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-serif-editorial font-semibold text-[#4A3F32]">
            <a
              href="#our-love"
              className="hover:text-[#A63A3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Our Love
            </a>
            <a
              href="#bride-groom"
              className="hover:text-[#A63A3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Bride &amp; Groom
            </a>
            <a
              href="#save-date"
              className="hover:text-[#A63A3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Save Date
            </a>
            <a
              href="#event-gift"
              className="hover:text-[#A63A3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Akad &amp; Gift
            </a>
            <a
              href="#love-story"
              className="hover:text-[#A63A3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Love Story
            </a>
            <a
              href="#our-gallery"
              className="hover:text-[#A63A3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Gallery
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setGuestInput(guestName);
                setIsGuestModalOpen(true);
              }}
              className="px-4 py-2 text-xs sm:text-sm font-serif-editorial font-semibold text-[#1A1715] btn-gold-pill rounded-full transition-transform active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Ubah Nama Tamu
            </button>
          </div>
        </div>
      </header>

      {/* Main Invitation Vertical Story Stream (matching all 8 screenshots in exact sequence) */}
      <main className="w-full max-w-[520px] bg-[#FAF5EC] shadow-[0_12px_50px_rgba(26,23,21,0.16)] overflow-hidden">
        {/* =====================================================================
            SCREEN 1 (1.png): COVER / OPENING INVITATION GATE
           ===================================================================== */}
        <section
          id="cover-gate"
          className="relative w-full min-h-[840px] sm:min-h-[900px] flex items-center justify-center px-6 py-14 overflow-hidden"
        >
          {/* Keraton & Gunungan Watercolor Background */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={IMAGES.keratonBg}
              alt="Latar Keraton Jawa dan Gunungan Wayang"
              containerClassName="w-full h-full"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#FAF5EC]/20" />
          </div>

          {/* Double-lined Maroon Oval / Stadium Frame */}
          <div className="relative z-10 w-full max-w-[410px] min-h-[700px] sm:min-h-[740px] rounded-full bg-[#F7F3EA]/85 backdrop-blur-[2px] border border-[#A63A3A] p-[4px] flex items-stretch justify-center shadow-[0_8px_32px_rgba(26,23,21,0.08)]">
            <div className="w-full rounded-full border border-[#A63A3A]/85 px-6 sm:px-10 py-16 flex flex-col items-center justify-center text-center">
              <p className="font-serif-editorial text-3xl sm:text-4xl text-[#1A1715] tracking-normal mb-3">
                Wedding of
              </p>

              <h1 className="font-script text-5xl sm:text-6xl text-[#1A1715] leading-tight my-2">
                Dinda &amp; Gusti
              </h1>

              <p className="font-serif-editorial text-base sm:text-lg tracking-[0.14em] text-[#1A1715] mt-3 mb-14 tabular-nums">
                Minggu, 23-08-2025
              </p>

              <div className="space-y-1 mb-6">
                <p className="font-serif-editorial text-lg sm:text-xl text-[#1A1715]">
                  Kepada Yth.
                </p>
                <p className="font-serif-editorial text-lg sm:text-xl text-[#1A1715]">
                  Bapak/Ibu/Saudara/i
                </p>
              </div>

              <p className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#1A1715] mb-10 px-2 text-balance">
                {guestName}
              </p>

              <button
                type="button"
                onClick={handleOpenInvitation}
                className="btn-gold-pill px-8 py-2.5 rounded-full font-serif-editorial text-base sm:text-lg font-medium text-[#1A1715] transition-transform duration-150 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                Open Invitation
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SCREEN 2 (2.png): HERO SECTION WITH GUNUNGAN & SCROLL DOWN
           ===================================================================== */}
        <section
          id="hero-welcome"
          className="relative w-full min-h-[840px] sm:min-h-[900px] flex flex-col items-center justify-between px-6 pt-28 pb-14 overflow-hidden"
        >
          {/* Keraton & Gunungan Watercolor Background */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={IMAGES.keratonBg}
              alt="Ilustrasi Gunungan Wayang dan Pendopo Keraton"
              containerClassName="w-full h-full"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5EC]/15 via-transparent to-[#FAF5EC]/20" />
          </div>

          {/* Center Typography Over Gunungan Emblem */}
          <div className="relative z-10 flex flex-col items-center text-center mt-6 sm:mt-10 px-5 py-6 rounded-3xl bg-[#FAF5EC]/35 backdrop-blur-[1px]">
            <p className="font-serif-editorial text-2xl sm:text-3xl text-[#111111] mb-2">
              Wedding of
            </p>
            <h2 className="font-script text-6xl sm:text-7xl text-[#111111] leading-[1.05]">
              Dinda
            </h2>
            <span className="font-script text-4xl sm:text-5xl text-[#111111] my-0.5">
              &amp;
            </span>
            <h2 className="font-script text-6xl sm:text-7xl text-[#111111] leading-[1.05]">
              Gusti
            </h2>
            <p className="font-serif-editorial text-2xl sm:text-3xl tracking-[0.18em] text-[#111111] mt-4 tabular-nums">
              23.08.2025
            </p>
          </div>

          {/* Bottom Scroll Down Affordance */}
          <div className="relative z-10 flex flex-col items-center mt-auto pt-16">
            <button
              type="button"
              onClick={handleScrollToOurLove}
              aria-label="Scroll ke bagian Our Love"
              className="w-13 h-13 rounded-full border-2 border-[#111111] bg-[#FAF5EC]/60 hover:bg-[#FAF5EC] flex items-center justify-center text-[#111111] transition-transform duration-150 hover:translate-y-1 cursor-pointer"
            >
              <ArrowDown className="w-6 h-6 stroke-[2]" />
            </button>
            <span className="font-serif-editorial text-xl sm:text-2xl text-[#111111] mt-3">
              Scroll down
            </span>
          </div>
        </section>

        {/* =====================================================================
            SCREEN 3 (3.png): "our LOVE" & Q.S AR-RUM : 21
           ===================================================================== */}
        <section
          id="our-love"
          className="relative w-full bg-[#FAF5EC] pt-16 pb-24 overflow-hidden"
        >
          {/* Top Gold Filigree Corner Ornaments */}
          <GoldCornerFiligree
            position="top-left"
            className="absolute top-0 left-0 w-36 sm:w-44 h-36 sm:h-44 z-10"
          />
          <GoldCornerFiligree
            position="top-right"
            className="absolute top-0 right-0 w-36 sm:w-44 h-36 sm:h-44 z-10"
          />

          {/* Heading: "our LOVE" */}
          <div className="relative z-20 text-center px-6 mb-8 pt-2">
            <p className="font-script text-5xl sm:text-6xl text-[#B6862C] leading-none -mb-2">
              our
            </p>
            <h2 className="font-display-gold text-5xl sm:text-6xl text-[#C59B38] tracking-wide">
              LOVE
            </h2>
          </div>

          {/* Full-width Couple Landscape Photo */}
          <div className="relative z-20 w-full mb-8">
            <SafeImage
              src={IMAGES.coupleWide}
              alt="Dinda dan Gusti dalam busana pengantin adat Jawa"
              containerClassName="w-full aspect-[4/3]"
              onClick={() => setLightboxIndex(4)}
            />
          </div>

          {/* Rounded Cream Verse Card with Lifted Curved Paper Shadow */}
          <div className="relative z-20 px-7 sm:px-10 mb-6">
            <div className="paper-lifted-shadow">
              <div className="relative z-10 bg-[#FCF9F2] rounded-[28px] px-6 sm:px-9 py-9 sm:py-11 text-center border border-[#EFE7D6]">
                <p className="font-serif-editorial text-[16.5px] sm:text-[18px] leading-[1.65] text-[#2B2623]">
                  &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
                  menciptakan pasangan-pasangan untukmu dari jenismu sendiri,
                  agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
                  menjadikan di antaramu rasa kasih dan sayang.&rdquo;
                </p>
                <p className="font-serif-editorial text-[16.5px] sm:text-[18px] font-medium text-[#2B2623] mt-2">
                  Q.S Ar-Rum : 21
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Gold Filigree Corner Ornaments */}
          <GoldCornerFiligree
            position="bottom-left"
            className="absolute bottom-0 left-0 w-36 sm:w-44 h-36 sm:h-44 z-10"
          />
          <GoldCornerFiligree
            position="bottom-right"
            className="absolute bottom-0 right-0 w-36 sm:w-44 h-36 sm:h-44 z-10"
          />
        </section>

        {/* =====================================================================
            SCREEN 4 & 5 (4.0.png & 4.1.png): BRIDE AND GROOM ARCH + SAVE DATE
           ===================================================================== */}
        <section
          id="bride-groom"
          className="relative w-full bg-[#FAF5EC] pt-8 pb-6 overflow-hidden"
        >
          {/* Decorative Orchid Botanical Sprays Overlapping Arch Frame */}
          <OrchidBotanicalSpray
            side="right"
            className="absolute right-[-14px] top-[340px] w-40 sm:w-44 h-48 z-30"
          />
          <OrchidBotanicalSpray
            side="left"
            className="absolute left-[-14px] top-[690px] w-40 sm:w-44 h-48 z-30"
          />

          {/* Tall Double-Lined Maroon Arch Frame */}
          <div className="relative z-20 mx-5 sm:mx-8 rounded-full border border-[#A63A3A] p-[3.5px] bg-[#F7F2E7]/60">
            <div className="w-full rounded-full border border-[#A63A3A]/85 px-6 sm:px-10 pt-20 pb-24 flex flex-col items-center text-center">
              {/* "Bride and Groom" Title */}
              <h2 className="font-script text-4xl sm:text-5xl text-[#C89D3C] drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)] mb-8">
                Bride and Groom
              </h2>

              {/* Groom Portrait (Gusti) */}
              <div className="w-52 sm:w-60 aspect-[3/4] mb-5 shadow-md">
                <SafeImage
                  src={IMAGES.groomSolo}
                  alt="Gusti — Mempelai Pria"
                  containerClassName="w-full h-full"
                  onClick={() => setLightboxIndex(1)}
                />
              </div>

              <h3 className="font-serif-editorial text-4xl sm:text-5xl font-medium text-[#111111] mb-1">
                Gusti
              </h3>
              <p className="font-serif-editorial text-base sm:text-lg font-medium text-[#1A1715]">
                Anak dari Bapak Ikhsan dan Ibu wati
              </p>

              {/* Ornate Ampersand */}
              <div className="font-calligraphy text-5xl sm:text-6xl text-[#1A1715] my-7 select-none">
                &amp;
              </div>

              {/* Bride Portrait (Dinda) */}
              <div className="w-52 sm:w-60 aspect-[3/4] mb-6 shadow-md">
                <SafeImage
                  src={IMAGES.brideSolo}
                  alt="Dinda — Mempelai Wanita"
                  containerClassName="w-full h-full"
                  onClick={() => setLightboxIndex(0)}
                />
              </div>

              <h3 className="font-serif-editorial text-4xl sm:text-5xl font-medium text-[#111111] mb-1">
                Dinda
              </h3>
              <p className="font-serif-editorial text-base sm:text-lg font-medium text-[#1A1715] mb-6">
                Anak dari Bapak Ikhsan dan Ibu wati
              </p>
            </div>
          </div>

          {/* ===================================================================
              4.1.png LOWER HALF: "save DATE" + MANDALA LACE + FLIP CLOCK
             =================================================================== */}
          <div id="save-date" className="relative w-full pt-14 pb-2 text-center">
            <div className="mb-8 px-6">
              <p className="font-script text-5xl sm:text-6xl text-[#B6862C] leading-none -mb-2">
                save
              </p>
              <h2 className="font-display-gold text-5xl sm:text-6xl text-[#C59B38] tracking-wide">
                DATE
              </h2>
            </div>

            {/* Ornate Quatrefoil Mandala Lace Pattern with Centered Flip Clock */}
            <div className="relative w-full">
              <MandalaLaceBackdrop />
              <div className="absolute inset-0 flex items-center justify-center pt-10">
                <FlipClockCountdown />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SCREEN 6 (5.png): AKAD, RESEPSI & WEDDING GIFT (BCA)
           ===================================================================== */}
        <section
          id="event-gift"
          className="relative w-full py-12 px-6 sm:px-9 overflow-hidden"
        >
          {/* Keraton & Gunungan Watercolor Background */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={IMAGES.keratonBg}
              alt="Latar Keraton dan Bunga untuk Akad, Resepsi, dan Wedding Gift"
              containerClassName="w-full h-full"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#FAF5EC]/20" />
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            {/* AKAD CARD */}
            <div className="bg-[#FAF8F3]/80 backdrop-blur-sm rounded-[28px] px-6 sm:px-8 py-6 shadow-[0_4px_20px_rgba(26,23,21,0.06)] border border-white/60">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="font-script text-4xl sm:text-5xl text-[#1A1715]">
                  Akad
                </h3>
                <span className="font-serif-editorial text-sm sm:text-base font-semibold tracking-wider text-[#1A1715] tabular-nums">
                  Minggu, 23-08-2025
                </span>
              </div>

              <div className="text-center space-y-1.5">
                <p className="font-serif-editorial text-lg sm:text-xl font-semibold text-[#111111]">
                  Orchid Cikole, Bandung
                </p>
                <p className="font-serif-editorial text-xs sm:text-sm text-[#3A342E] max-w-[300px] mx-auto leading-relaxed">
                  Genteng, Cikole, Kec. Lembang, Kabupaten Bandung Barat, Jawa
                  Barat 40391
                </p>
                <p className="font-serif-editorial text-sm sm:text-base font-bold text-[#111111] pt-1 tabular-nums">
                  Pukul: 10:00 WIB - 11:00 WIB
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setMapModalEvent('Akad')}
                    className="btn-gold-pill px-6 py-1.5 rounded-full font-serif-editorial text-sm font-semibold text-[#1A1715] transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Google Maps
                  </button>
                </div>
              </div>
            </div>

            {/* RESEPSI CARD */}
            <div className="bg-[#FAF8F3]/80 backdrop-blur-sm rounded-[28px] px-6 sm:px-8 py-6 shadow-[0_4px_20px_rgba(26,23,21,0.06)] border border-white/60">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="font-script text-4xl sm:text-5xl text-[#1A1715]">
                  Resepsi
                </h3>
                <span className="font-serif-editorial text-sm sm:text-base font-semibold tracking-wider text-[#1A1715] tabular-nums">
                  Minggu, 23-08-2025
                </span>
              </div>

              <div className="text-center space-y-1.5">
                <p className="font-serif-editorial text-lg sm:text-xl font-semibold text-[#111111]">
                  Orchid Cikole, Bandung
                </p>
                <p className="font-serif-editorial text-xs sm:text-sm text-[#3A342E] max-w-[300px] mx-auto leading-relaxed">
                  Genteng, Cikole, Kec. Lembang, Kabupaten Bandung Barat, Jawa
                  Barat 40391
                </p>
                <p className="font-serif-editorial text-sm sm:text-base font-bold text-[#111111] pt-1 tabular-nums">
                  Pukul: 10:00 WIB - 11:00 WIB
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setMapModalEvent('Resepsi')}
                    className="btn-gold-pill px-6 py-1.5 rounded-full font-serif-editorial text-sm font-semibold text-[#1A1715] transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Google Maps
                  </button>
                </div>
              </div>
            </div>

            {/* WEDDING GIFT HEADING */}
            <div className="pt-4 pb-1 text-center">
              <h2 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#111111]">
                Wedding Gift
              </h2>
              <WeddingGiftDivider />
            </div>

            {/* BCA CARD 1: GUSTI */}
            <div className="relative bg-[#FAF8F3]/80 backdrop-blur-sm rounded-[28px] px-7 sm:px-9 py-6 shadow-[0_4px_20px_rgba(26,23,21,0.06)] border border-white/60 overflow-hidden">
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="text-left space-y-1">
                  <p className="font-serif-editorial text-lg sm:text-xl tracking-[0.18em] text-[#1A1715] tabular-nums">
                    987654321
                  </p>
                  <p className="font-serif-editorial text-lg sm:text-xl text-[#1A1715] tracking-wider">
                    a/n Gusti
                  </p>
                </div>
                <BcaLogo />
              </div>

              <div className="relative z-10 border-b border-[#1A1715]/45 my-4" />

              <div className="relative z-10 flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyAccount('Gusti', '987654321')}
                  className="btn-gold-pill min-w-[140px] px-6 py-1.5 rounded-full font-serif-editorial text-sm font-semibold text-[#1A1715] inline-flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedAccount === 'Gusti' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>
            </div>

            {/* BCA CARD 2: DINDA */}
            <div className="relative bg-[#FAF8F3]/80 backdrop-blur-sm rounded-[28px] px-7 sm:px-9 py-6 shadow-[0_4px_20px_rgba(26,23,21,0.06)] border border-white/60 overflow-hidden">
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="text-left space-y-1">
                  <p className="font-serif-editorial text-lg sm:text-xl tracking-[0.18em] text-[#1A1715] tabular-nums">
                    987654321
                  </p>
                  <p className="font-serif-editorial text-lg sm:text-xl text-[#1A1715] tracking-wider">
                    a/n Dinda
                  </p>
                </div>
                <BcaLogo />
              </div>

              <div className="relative z-10 border-b border-[#1A1715]/45 my-4" />

              <div className="relative z-10 flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyAccount('Dinda', '987654321')}
                  className="btn-gold-pill min-w-[140px] px-6 py-1.5 rounded-full font-serif-editorial text-sm font-semibold text-[#1A1715] inline-flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedAccount === 'Dinda' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SCREEN 7 (6.png): "our LOVE STORY" WITH SONGKET TOP BORDER
           ===================================================================== */}
        <section id="love-story" className="relative w-full bg-[#F5F1E8] pb-16">
          {/* Geometric Songket Diamond Top Border */}
          <SongketDiamondBorder />

          {/* Title: "our LOVE STORY" */}
          <div className="text-center pt-8 pb-10 px-6">
            <p className="font-script text-5xl sm:text-6xl text-[#B6862C] leading-none -mb-2">
              our
            </p>
            <h2 className="font-display-gold text-4xl sm:text-5xl text-[#C59B38] tracking-wide">
              LOVE STORY
            </h2>
          </div>

          {/* 2-Column Editorial Layout matching 6.png */}
          <div className="px-6 sm:px-9 grid grid-cols-12 gap-5 sm:gap-6 items-start">
            {/* Left Column: 3 Story Chapters */}
            <div className="col-span-6 space-y-7 text-left">
              <div>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#111111] mb-2.5">
                  Awal bertemu
                </h3>
                <p className="font-serif-editorial text-[13.5px] sm:text-[15px] leading-[1.55] text-[#2B2623]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat
                  enirta. Ne discipulum abducam, times. Primum quid tu dicis
                  breconsectetur adipiscing elit. Erat enim res aperta. Ne
                  discipulum abducam, times. Primum quid tu dicis breve? An haec
                  ab eo non dicuntur?
                </p>
              </div>

              <div>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#111111] mb-2.5">
                  Lamaran
                </h3>
                <p className="font-serif-editorial text-[13.5px] sm:text-[15px] leading-[1.55] text-[#2B2623]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat
                  enirta. Ne discipulum abducam, times. Primum quid tu dicis
                  breconsectetur adipiscing elit. Erat enim res aperta. Ne
                  discipulum abducam, times. Primum quid tu dicis breve? An haec
                  ab eo non dicuntur?
                </p>
              </div>

              <div>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#111111] mb-2.5">
                  Pernikahan
                </h3>
                <p className="font-serif-editorial text-[13.5px] sm:text-[15px] leading-[1.55] text-[#2B2623]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat
                  enirta. Ne discipulum abducam, times. Primum quid tu dicis
                  breconsectetur adipiscing elit. Erat enim res aperta. Ne
                  discipulum abducam, times. Primum quid tu dicis breve? An haec
                  ab eo non dicuntur?
                </p>
              </div>
            </div>

            {/* Right Column: 2 Stacked Vertical Portraits */}
            <div className="col-span-6 flex flex-col gap-6 pt-3">
              <SafeImage
                src={IMAGES.coupleSeated}
                alt="Awal bertemu dan lamaran Dinda & Gusti"
                containerClassName="w-full aspect-[3/4] shadow-md"
                onClick={() => setLightboxIndex(2)}
              />
              <SafeImage
                src={IMAGES.coupleGaze}
                alt="Momen bahagia pernikahan Dinda & Gusti"
                containerClassName="w-full aspect-[3/4] shadow-md"
                onClick={() => setLightboxIndex(3)}
              />
            </div>
          </div>
        </section>

        {/* =====================================================================
            SCREEN 8 (7.png): "Our Gallery" 5-PHOTO EDITORIAL GRID
           ===================================================================== */}
        <section
          id="our-gallery"
          className="relative w-full bg-[#F5F1E8] pt-8 pb-16 px-7 sm:px-10"
        >
          <h2 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-center text-[#111111] mb-10">
            Our Gallery
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {/* Top-Left: Bride Solo (with white border frame matching 7.png) */}
            <div className="bg-white p-1 shadow-sm">
              <SafeImage
                src={IMAGES.brideSolo}
                alt="Galeri Mempelai Wanita — Dinda"
                containerClassName="w-full aspect-[3/4]"
                onClick={() => setLightboxIndex(0)}
              />
            </div>

            {/* Top-Right: Groom Solo */}
            <div className="shadow-sm">
              <SafeImage
                src={IMAGES.groomSolo}
                alt="Galeri Mempelai Pria — Gusti"
                containerClassName="w-full aspect-[3/4]"
                onClick={() => setLightboxIndex(1)}
              />
            </div>

            {/* Middle-Left: Couple Seated */}
            <div className="shadow-sm">
              <SafeImage
                src={IMAGES.coupleSeated}
                alt="Galeri Pasangan Dinda & Gusti"
                containerClassName="w-full aspect-[3/4]"
                onClick={() => setLightboxIndex(2)}
              />
            </div>

            {/* Middle-Right: Couple Gaze */}
            <div className="shadow-sm">
              <SafeImage
                src={IMAGES.coupleGaze}
                alt="Galeri Tatapan Kasih Dinda & Gusti"
                containerClassName="w-full aspect-[3/4]"
                onClick={() => setLightboxIndex(3)}
              />
            </div>

            {/* Bottom Full-Width: Couple Wide Gebyok */}
            <div className="col-span-2 shadow-sm pt-1">
              <SafeImage
                src={IMAGES.coupleWide}
                alt="Galeri Pelaminan Adat Jawa Dinda & Gusti"
                containerClassName="w-full aspect-[4/3]"
                onClick={() => setLightboxIndex(4)}
              />
            </div>
          </div>
        </section>

        {/* =====================================================================
            RSVP & UCAPAN DOA RESTU SECTION
           ===================================================================== */}
        <section
          id="ucapan-doa"
          className="relative w-full bg-[#FAF5EC] border-t border-[#E5DEC9] py-14 px-7 sm:px-10"
        >
          <div className="text-center mb-8">
            <p className="font-script text-4xl text-[#B6862C] -mb-1">Best</p>
            <h2 className="font-display-gold text-3xl sm:text-4xl text-[#C59B38]">
              WISHES &amp; RSVP
            </h2>
            <p className="font-serif-editorial text-sm sm:text-base text-[#4A3F32] mt-2">
              Kirimkan doa dan konfirmasi kehadiran Anda untuk Dinda &amp; Gusti
            </p>
          </div>

          <form onSubmit={handleSubmitWish} className="space-y-4 mb-8">
            <div>
              <label
                htmlFor="rsvp-name"
                className="block font-serif-editorial text-sm font-semibold text-[#2B2623] mb-1"
              >
                Nama Lengkap
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Contoh: Eka dan Pasangan"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D8CBB3] font-serif-editorial text-base text-[#1A1715] focus:outline-none focus:border-[#C59B38]"
              />
            </div>

            <div>
              <label
                htmlFor="rsvp-attendance"
                className="block font-serif-editorial text-sm font-semibold text-[#2B2623] mb-1"
              >
                Konfirmasi Kehadiran
              </label>
              <select
                id="rsvp-attendance"
                value={rsvpAttendance}
                onChange={(e) =>
                  setRsvpAttendance(e.target.value as 'Hadir' | 'Berhalangan')
                }
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D8CBB3] font-serif-editorial text-base text-[#1A1715] focus:outline-none focus:border-[#C59B38]"
              >
                <option value="Hadir">Hadir di Acara</option>
                <option value="Berhalangan">Maaf, Berhalangan Hadir</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="rsvp-message"
                className="block font-serif-editorial text-sm font-semibold text-[#2B2623] mb-1"
              >
                Ucapan &amp; Doa
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                required
                value={rsvpMessage}
                onChange={(e) => setRsvpMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D8CBB3] font-serif-editorial text-base text-[#1A1715] focus:outline-none focus:border-[#C59B38]"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <button
                type="submit"
                className="btn-gold-pill px-7 py-2 rounded-full font-serif-editorial text-base font-semibold text-[#1A1715] transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                Kirim Ucapan
              </button>
              {rsvpSubmitted && (
                <span className="font-serif-editorial text-sm font-semibold text-[#2E6F40]">
                  Terima kasih atas doa &amp; konfirmasi Anda!
                </span>
              )}
            </div>
          </form>

          {/* Wishes Feed (Zero-Pill Unboxed Metadata with · separator) */}
          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="bg-[#FCF9F2] rounded-2xl p-4 border border-[#E6DEC8]"
              >
                <div className="flex items-center gap-2 text-xs font-serif-editorial text-[#6E5E48] mb-1">
                  <span className="font-bold text-sm text-[#1A1715]">
                    {item.name}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.attendance}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.timestamp}</span>
                </div>
                <p className="font-serif-editorial text-sm sm:text-base text-[#2B2623] leading-relaxed">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#EFE8D8] border-t border-[#DCD0B8] py-10 px-6 text-center">
          <p className="font-script text-4xl text-[#1A1715] mb-1">
            Dinda &amp; Gusti
          </p>
          <p className="font-serif-editorial text-sm text-[#5A4E3C] tracking-widest tabular-nums">
            23 . 08 . 2025 · Orchid Cikole, Bandung
          </p>
        </footer>
      </main>

      {/* Floating Audio Mute/Unmute Button */}
      <button
        type="button"
        onClick={handleToggleAudio}
        aria-label={isPlayingAudio ? 'Matikan musik latar' : 'Putar musik latar'}
        className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full bg-[#1A1715]/90 text-[#F5D076] shadow-lg flex items-center justify-center hover:bg-[#1A1715] transition-transform active:scale-95 cursor-pointer"
      >
        {isPlayingAudio ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>

      {/* =====================================================================
          GOOGLE MAPS MODAL (Orchid Cikole, Bandung)
         ===================================================================== */}
      {mapModalEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setMapModalEvent(null)}
        >
          <div
            className="bg-[#FAF5EC] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#D8CBB3] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-script text-4xl text-[#1A1715]">
                  Lokasi {mapModalEvent}
                </h3>
                <p className="font-serif-editorial text-sm text-[#5A4E3C]">
                  Minggu, 23-08-2025 · Pukul 10:00 WIB - 11:00 WIB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMapModalEvent(null)}
                aria-label="Tutup peta"
                className="w-9 h-9 rounded-full bg-[#E8E0D0] flex items-center justify-center text-[#1A1715] hover:bg-[#D8CBB3] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#D8CBB3] bg-[#E8E0D0] h-56 mb-4">
              <iframe
                title={`Peta Lokasi ${mapModalEvent} Orchid Cikole Bandung`}
                src="https://www.openstreetmap.org/export/embed.html?bbox=107.625%2C-6.790%2C107.650%2C-6.770&layer=mapnik&marker=-6.7805%2C107.6375"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            <div className="flex items-start gap-2.5 text-left mb-6">
              <MapPin className="w-5 h-5 text-[#A63A3A] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif-editorial text-lg font-bold text-[#111111]">
                  Orchid Cikole, Bandung
                </p>
                <p className="font-serif-editorial text-sm text-[#3A342E]">
                  Genteng, Cikole, Kec. Lembang, Kabupaten Bandung Barat, Jawa
                  Barat 40391
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  handleCopyAccount(
                    'Alamat',
                    'Orchid Cikole, Genteng, Cikole, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391'
                  );
                }}
                className="px-4 py-2 rounded-full border border-[#C59B38] font-serif-editorial text-sm font-semibold text-[#1A1715] inline-flex items-center gap-1.5 hover:bg-[#EFE8D8] cursor-pointer whitespace-nowrap shrink-0"
              >
                <Copy className="w-4 h-4" />
                <span>
                  {copiedAccount === 'Alamat' ? 'Alamat Tersalin' : 'Salin Alamat'}
                </span>
              </button>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Orchid+Forest+Cikole+Lembang+Bandung"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-pill px-5 py-2 rounded-full font-serif-editorial text-sm font-semibold text-[#1A1715] whitespace-nowrap shrink-0"
              >
                Buka Google Maps
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          GUEST NAME CUSTOMIZER MODAL
         ===================================================================== */}
      {isGuestModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsGuestModalOpen(false)}
        >
          <div
            className="bg-[#FAF5EC] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#D8CBB3] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-serif-editorial text-2xl font-bold text-[#1A1715]">
                Kustomisasi Nama Tamu Undangan
              </h3>
              <button
                type="button"
                onClick={() => setIsGuestModalOpen(false)}
                aria-label="Tutup dialog"
                className="w-9 h-9 rounded-full bg-[#E8E0D0] flex items-center justify-center text-[#1A1715] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGuestName} className="space-y-4">
              <div>
                <label
                  htmlFor="guest-name-input"
                  className="block font-serif-editorial text-sm font-semibold text-[#3A342E] mb-1"
                >
                  Nama Tamu pada Sampul Undangan
                </label>
                <input
                  id="guest-name-input"
                  type="text"
                  value={guestInput}
                  onChange={(e) => setGuestInput(e.target.value)}
                  placeholder="Eka dan Pasangan"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D8CBB3] font-serif-editorial text-base text-[#1A1715] focus:outline-none focus:border-[#C59B38]"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGuestModalOpen(false)}
                  className="px-4 py-2 rounded-full font-serif-editorial text-sm font-semibold text-[#4A3F32] hover:bg-[#E8E0D0] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-gold-pill px-6 py-2 rounded-full font-serif-editorial text-sm font-semibold text-[#1A1715] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Simpan Nama Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          FULLSCREEN PHOTO LIGHTBOX MODAL
         ===================================================================== */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Tutup galeri foto"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-2xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[#14110F]">
              <img
                src={GALLERY_ITEMS[lightboxIndex].src}
                alt={GALLERY_ITEMS[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between w-full gap-4 text-white">
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + GALLERY_ITEMS.length) %
                      GALLERY_ITEMS.length
                  )
                }
                aria-label="Foto sebelumnya"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-center">
                <p className="font-serif-editorial text-xl font-semibold">
                  {GALLERY_ITEMS[lightboxIndex].title}
                </p>
                <p className="font-serif-editorial text-sm text-white/75">
                  {GALLERY_ITEMS[lightboxIndex].caption}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length)
                }
                aria-label="Foto berikutnya"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
