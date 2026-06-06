"use client";

import Image from "next/image";
import {
  Baby,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  XCircle,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Upload,
  UserCheck,
  Wand2,
  X
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const AUTO_ADVANCE_MS = 5200;

const navItems = [
  { href: "#process", label: "Süreç" },
  { href: "#why-us", label: "Neden Biz?" },
  { href: "#pricing", label: "Paketler" },
  { href: "#faq", label: "SSS" }
];

const afterImages = [
  {
    src: "/assets/after-window-clean.png",
    alt: "Doğal ışıklı stüdyo hamile portresi",
    caption: "Doğal ışık ve zarif kumaş dokusu"
  },
  {
    src: "/assets/after-golden.png",
    alt: "Sıcak ışıklı profesyonel hamile portresi",
    caption: "Sıcak stüdyo ışığıyla sanat portresi"
  },
  {
    src: "/assets/after-studio.png",
    alt: "Sade stüdyo tarzında hamile portresi",
    caption: "Sade, dergi hissinde stüdyo karesi"
  }
];

const processSteps = [
  {
    icon: Upload,
    title: "Fotoğraflarınızı alırız",
    text: "Selfie ve boydan fotoğrafınızı WhatsApp üzerinden alırız."
  },
  {
    icon: Wand2,
    title: "Tarzı birlikte belirleriz",
    text: "Poz, ışık ve atmosferi fotoğrafçı gözüyle netleştiririz."
  },
  {
    icon: Sparkles,
    title: "AI'ı biz yönlendiririz",
    text: "Referanslarımız ve fotoğrafçı notlarıyla AI'ı doğru tarza yönlendiririz."
  },
  {
    icon: UserCheck,
    title: "Sonuçları teslim ederiz",
    text: "En doğal kareleri seçer, kontrol eder ve dijital olarak teslim ederiz."
  }
];

const whyItems = [
  "Hazır prompt değil, fotoğrafçı yönlendirmesi",
  "Sonuç eleme ve doğal görünüm kontrolü",
  "Gizlilik hassasiyetiyle paylaşım",
  "Yenidoğan çekimiyle uyumlu estetik"
];

const pricing = [
  {
    icon: Heart,
    title: "Sadece AI Portre",
    price: "1.500 TL'den başlayan",
    text: "Yenidoğan çekimi olmadan dijital portre isteyenler için.",
    items: ["Portre adedi pakete göre", "Fotoğrafçı kontrolü", "Dijital teslim"],
    featured: false,
    whatsappMessage: "Merhaba, sadece AI hamile portre paketi hakkında bilgi almak istiyorum."
  },
  {
    icon: Baby,
    title: "Yenidoğan Paketiyle",
    price: "Ücretsiz",
    text: "Yenidoğan çekim paketiyle ücretsiz sunulur.",
    items: [
      "Portre adedi pakete göre belirlenir",
      "Yenidoğan çekim ücreti için iletişime geçin",
      "Detaylar WhatsApp'ta netleşir"
    ],
    featured: true,
    whatsappMessage:
      "Merhaba, yenidoğan çekim paketiyle ücretsiz AI hamile portre hizmeti hakkında bilgi almak istiyorum. Yenidoğan çekim ücretleri ve paket detayları için bilgi alabilir miyim?"
  }
];

const faqItems = [
  {
    question: "Fotoğraflarımı paylaşmak güvenli mi?",
    answer:
      "Evet. Fotoğraflar yalnızca bu hizmet için değerlendirilir. Saklama, silme ve paylaşım tercihlerinizi baştan netleştiririz."
  },
  {
    question: "Fotoğrafları kendim AI araçlarıyla yapamaz mıyım?",
    answer:
      "Yapabilirsiniz; farkımız fotoğrafçı gözüyle stil seçimi, doğru yönlendirme, sonuç eleme ve doğal görünüm kontrolüdür."
  },
  {
    question: "Sıradan AI çıktılarından farkı ne?",
    answer:
      "Tek deneme sonucu paylaşmıyoruz. Poz, ışık, ten tonu ve gerçeklik hissi kontrol edildikten sonra seçilen kareleri teslim ediyoruz."
  },
  {
    question: "Yüzüm ve bedenim doğal görünür mü?",
    answer:
      "Amaç sizi bambaşka biri yapmak değil; hamilelik anınızı doğal, zarif ve fotoğrafçı estetiğiyle yorumlamak."
  },
  {
    question: "Sonuçlar bana yüzde yüz benzer mi?",
    answer:
      "AI üretimi olduğu için yüzde yüz birebir benzerlik garantisi veremeyiz. Fotoğraflarınızı referans alır, olabildiğince size yakın ve doğal görünen sonuçları seçeriz."
  },
  {
    question: "Yenidoğan çekimiyle nasıl ücretsiz oluyor?",
    answer:
      "Yenidoğan çekim paketiyle anlaşıldığında AI hamile portreleri ek hizmet olarak sunulur. Çekim ücretleri için WhatsApp'tan bilgi alabilirsiniz."
  },
  {
    question: "Teslim süresi ne kadar?",
    answer: "Paket kapsamına göre değişir; çoğu dijital teslim 24-72 saat aralığında planlanır."
  }
];

const defaultWhatsAppMessage = "Merhaba, AI destekli hamile portre hizmetiniz hakkında bilgi almak istiyorum.";
const whatsappPhone = (process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "905541604811").replace(/\D/g, "");

function getWhatsAppHref(message = defaultWhatsAppMessage) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function WhatsAppButton({
  label = "WhatsApp'tan Yazın",
  message = defaultWhatsAppMessage
}: {
  label?: string;
  message?: string;
}) {
  return (
    <a className="button button-primary" href={getWhatsAppHref(message)} target="_blank" rel="noreferrer">
      <MessageCircle aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Maternal Moments anasayfa">
        <span>Maternal</span>
        <span>Moments</span>
      </a>

      <nav className="desktop-nav" aria-label="Ana navigasyon">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a href="#contact">İletişim</a>
      </nav>

      <div className="header-actions">
        <button
          className="icon-button"
          type="button"
          onClick={() => setDark((current) => !current)}
          aria-label={dark ? "Açık temaya geç" : "Koyu temaya geç"}
          title={dark ? "Açık tema" : "Koyu tema"}
        >
          {dark ? <SunMedium aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </button>
        <WhatsAppButton label="Yazın" />
        <button
          className="icon-button mobile-menu-button"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Menüyü aç"
          title="Menü"
        >
          <Menu aria-hidden="true" />
        </button>
      </div>

      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-panel">
          <div className="mobile-menu-top">
            <span className="brand menu-brand">
              <span>Maternal</span>
              <span>Moments</span>
            </span>
            <button
              className="icon-button"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Menüyü kapat"
              title="Kapat"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobil navigasyon">
            {[...navItems, { href: "#contact", label: "İletişim" }].map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <WhatsAppButton label="WhatsApp'tan Bilgi Al" />
        </div>
      </div>
    </header>
  );
}

function BeforeAfterShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressRun, setProgressRun] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  function clearAutoTimer() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    clearAutoTimer();
    timerRef.current = window.setTimeout(() => {
      setDirection(1);
      setActive((current) => (current + 1) % afterImages.length);
      setProgressRun((current) => current + 1);
    }, AUTO_ADVANCE_MS);

    return clearAutoTimer;
  }, [active, progressRun]);

  const current = afterImages[active];

  function goTo(offset: number) {
    clearAutoTimer();
    setDirection(offset > 0 ? 1 : -1);
    setActive((currentIndex) => {
      const next = currentIndex + offset;
      return (next + afterImages.length) % afterImages.length;
    });
    setProgressRun((currentRun) => currentRun + 1);
  }

  function selectImage(index: number) {
    clearAutoTimer();
    setDirection(index >= active ? 1 : -1);
    setActive(index);
    setProgressRun((currentRun) => currentRun + 1);
  }

  function handleTouchEnd(clientX: number) {
    if (touchStart === null) {
      return;
    }

    const distance = touchStart - clientX;
    if (Math.abs(distance) > 36) {
      goTo(distance > 0 ? 1 : -1);
    }
    setTouchStart(null);
  }

  return (
    <section className="showcase" aria-label="Önce ve sonra hamile portre örneği">
      <div className="image-frame before-frame">
        <div className="frame-label">Önce: evde çekilen fotoğraf</div>
        <Image
          src="/assets/before-selfie-v3.png"
          alt="Evde telefonda çekilmiş hamilelik öncesi örnek fotoğraf"
          width={302}
          height={592}
          priority
          unoptimized
        />
      </div>

      <div className="after-column">
        <div
          className="image-frame after-frame"
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
        >
          <div className="frame-label">Sonra: fotoğrafçı kürasyonlu AI portre</div>
          <div className={`after-image-layer ${direction > 0 ? "from-right" : "from-left"}`} key={current.src}>
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              unoptimized
              sizes="(min-width: 900px) 380px, 100vw"
            />
          </div>
          <div className="carousel-caption">
            <span>{current.caption}</span>
            <div className="carousel-controls">
              <button type="button" onClick={() => goTo(-1)} aria-label="Önceki portre" title="Önceki">
                <ChevronLeft aria-hidden="true" />
              </button>
              <button type="button" onClick={() => goTo(1)} aria-label="Sonraki portre" title="Sonraki">
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="carousel-footer">
          <div className="carousel-progress" key={`${active}-${progressRun}`} aria-hidden="true">
            <span />
          </div>
          <div className="dots" aria-label="Portreler">
            {afterImages.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className={index === active ? "is-active" : ""}
                onClick={() => selectImage(index)}
                aria-label={`${index + 1}. portreyi göster`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section process-section" id="process">
      <div className="section-copy narrow">
        <p className="section-kicker">Nasıl çalışır?</p>
        <h2>Fotoğrafları gönderin, biz özenle hazırlayalım.</h2>
      </div>
      <div className="process-list">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article className="process-step" key={step.title}>
              <div className="step-mark" aria-hidden="true">
                <Icon />
              </div>
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="section why-section" id="why-us">
      <div className="why-copy">
        <p className="section-kicker">Neden Maternal Moments?</p>
        <h2>Sıradan AI çıktısı değil, fotoğrafçı onaylı hatıra.</h2>
        <p>AI üretir; fotoğrafçı yönlendirir, seçer ve onaylar.</p>
        <ul className="check-list">
          {whyItems.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="comparison" aria-label="AI aracı ve Maternal Moments karşılaştırması">
        <article>
          <h3>Sıradan AI aracı</h3>
          <div className="comparison-media">
            <Image
              src="/assets/after-studio.png"
              alt="Kontrolsüz AI sonucu örneği"
              fill
              unoptimized
              sizes="(min-width: 900px) 280px, 100vw"
            />
          </div>
          <ul className="comparison-list negative-list">
            {["Tek deneme hissi", "Tutarsız ışık", "Kişisel yönlendirme yok"].map((item) => (
              <li key={item}>
                <XCircle aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="preferred">
          <h3>Maternal Moments</h3>
          <div className="comparison-media">
            <Image
              src="/assets/after-golden.png"
              alt="Fotoğrafçı onaylı hamile portresi"
              fill
              unoptimized
              sizes="(min-width: 900px) 280px, 100vw"
            />
          </div>
          <ul className="comparison-list positive-list">
            {["Fotoğrafçı seçimi", "Doğal görünüm kontrolü", "Baskıya uygun teslim"].map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="section-copy">
        <p className="section-kicker">Paketler</p>
        <h2>Yenidoğan çekimiyle ücretsiz, tek başına da alınabilir.</h2>
        <p>Yenidoğan çekim ücretleri ve paket detayları için WhatsApp&apos;tan bilgi alın.</p>
      </div>
      <div className="pricing-grid">
        {pricing.map((plan) => {
          const Icon = plan.icon;
          return (
            <article className={`pricing-card ${plan.featured ? "featured" : ""}`} key={plan.title}>
              <Icon aria-hidden="true" />
              <h3>{plan.title}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.text}</p>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <WhatsAppButton label="Teklif Al" message={plan.whatsappMessage} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="trust-band" aria-label="Hizmet güven detayları">
      <div>
        <ShieldCheck aria-hidden="true" />
        <span>Gizlilik hassasiyeti</span>
      </div>
      <div>
        <Clock3 aria-hidden="true" />
        <span>24-72 saat teslim planı</span>
      </div>
      <div>
        <Camera aria-hidden="true" />
        <span>Fotoğrafçı kontrolü</span>
      </div>
      <div>
        <Sparkles aria-hidden="true" />
        <span>İnsan kontrollü AI üretimi</span>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq-section" id="faq">
      <div className="section-copy narrow">
        <p className="section-kicker">Sıkça sorulan sorular</p>
        <h2>Karar vermeden önce merak edilenler.</h2>
      </div>
      <div className="faq-list">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article className="faq-item" key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-${index}`}
              >
                <span>{item.question}</span>
                <ChevronDown aria-hidden="true" />
              </button>
              <div id={`faq-${index}`} className="faq-answer" hidden={!isOpen}>
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-grid">
        <div>
          <a className="brand footer-brand" href="#top" aria-label="Maternal Moments anasayfa">
            <span>Maternal</span>
            <span>Moments</span>
          </a>
          <p>Hamileliğinizin en özel dönemini fotoğrafçı gözü ve dijital zanaatla saklıyoruz.</p>
          <div className="socials" aria-label="Sosyal bağlantılar">
            <a href="#" aria-label="Instagram" title="Instagram">
              <Instagram aria-hidden="true" />
            </a>
            <a href={getWhatsAppHref()} aria-label="WhatsApp" title="WhatsApp" target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
            </a>
          </div>
        </div>
        <div>
          <h3>Hızlı erişim</h3>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <h3>İletişim</h3>
          <a href={getWhatsAppHref()} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            WhatsApp&apos;tan yazın
          </a>
          <a href="mailto:info@maternal-moments.com">
            <Mail aria-hidden="true" />
            info@maternal-moments.com
          </a>
          <span>
            <MapPin aria-hidden="true" />
            İstanbul, Türkiye
          </span>
        </div>
      </div>
      <div className="copyright">© 2026 Maternal Moments. Tüm hakları saklıdır.</div>
    </footer>
  );
}

export default function Home() {
  const heroProof = useMemo(
    () => ["Güvenli paylaşım", "24-72 saat teslim planı", "Fotoğrafçı kontrolü"],
    []
  );

  return (
    <main id="top">
      <Header />
      <section className="hero-section">
        <div className="hero-copy">
          <h1>
            Fotoğraflarınızdan <span className="hero-highlight">AI destekli</span> hamile portreleri.
          </h1>
          <p>
            Paylaştığınız selfie, boydan fotoğraf ya da mevcut kareleri; istediğiniz yerden, zahmetsizce ve hızlıca
            zarif hamile portrelerine dönüştürüyoruz.
          </p>
          <div className="hero-actions">
            <WhatsAppButton label="WhatsApp'tan Bilgi Al" />
            <a className="button button-secondary" href="#process">
              Süreci Gör
            </a>
          </div>
          <ul className="hero-proof">
            {heroProof.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <BeforeAfterShowcase />
      </section>
      <TrustSection />
      <ProcessSection />
      <WhyUsSection />
      <PricingSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
