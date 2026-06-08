"use client";

import Image from "next/image";
import {
  Baby,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  XCircle,
  Gift,
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
  { href: "#examples", label: "Örnekler" },
  { href: "#process", label: "Süreç" },
  { href: "#why-us", label: "Neden Biz?" },
  { href: "#pricing", label: "Paketler" },
  { href: "#faq", label: "SSS" }
];

const afterImages = [
  {
    src: "/assets/after-window-clean.png",
    alt: "Doğal ışıklı stüdyo hamile portresi",
    title: "Pencere ışığı"
  },
  {
    src: "/assets/after-golden.png",
    alt: "Sıcak ışıklı profesyonel hamile portresi",
    title: "Sıcak ton"
  },
  {
    src: "/assets/after-studio.png",
    alt: "Sade stüdyo tarzında hamile portresi",
    title: "Sade stüdyo"
  }
];

const processSteps = [
  {
    icon: Upload,
    title: "Uygun fotoğrafları seçeriz",
    text: "WhatsApp'tan gönderdiğiniz kareler arasından AI üretime en uygun referansları birlikte belirleriz."
  },
  {
    icon: Wand2,
    title: "Tarzı fotoğrafçı gözüyle kurarız",
    text: "Poz, ışık, kıyafet hissi ve atmosferi hazır şablon gibi değil, size yakışacak şekilde tarif ederiz."
  },
  {
    icon: Sparkles,
    title: "AI'ı biz yönlendiririz",
    text: "Yapay zekayı doğru referans, kompozisyon ve estetik notlarla çalıştırır; tek denemeye bırakmayız."
  },
  {
    icon: UserCheck,
    title: "Çıktıları eler ve kontrol ederiz",
    text: "Yüz, beden, ten tonu, ışık ve gerçeklik hissi fotoğrafçı gözüyle kontrol edildikten sonra seçilenleri teslim ederiz."
  },
  {
    icon: BookOpen,
    title: "İsterseniz albüme dönüştürürüz",
    text: "Dijital teslimin yanında, beğendiğiniz kareleri baskı veya albüm haline getirme seçeneği de sunarız."
  }
];

const whyItems = [
  "Doğru referans fotoğraf seçimi",
  "Poz, ışık ve atmosfer yönlendirmesi",
  "Doğal olmayan sonuçları eleme",
  "Yüz, beden ve ten tonu kontrolü",
  "İstenirse baskı ve albüm hazırlığı"
];

const styleExamples = [
  {
    src: "/assets/after-window-clean.png",
    title: "Pencere ışığı",
    text: "Yumuşak, doğal ve ev sıcaklığında portre hissi."
  },
  {
    src: "/assets/after-golden.png",
    title: "Editorial sıcak ton",
    text: "Daha sanatsal, albüm kapağı gibi duran kareler."
  },
  {
    src: "/assets/after-studio.png",
    title: "Sade stüdyo",
    text: "Dikkati anne adayına bırakan sakin kompozisyonlar."
  },
  {
    src: "/assets/after-window-clean.png",
    title: "Albüm uyumlu seri",
    text: "Birbirini tamamlayan renk, ışık ve kadraj dili."
  },
  {
    src: "/assets/after-golden.png",
    title: "Romantik kumaş",
    text: "Daha yumuşak, zarif ve hatıra değerinde bir atmosfer."
  },
  {
    src: "/assets/after-studio.png",
    title: "Minimal portre",
    text: "Gösterişten uzak, temiz ve zamansız sonuçlar."
  }
];

const pricing = [
  {
    icon: Baby,
    title: "Yenidoğan Çekimiyle Hediye",
    price: "Ücretsiz",
    text: "Yenidoğan çekimi paketine ek ücret olmadan dahil edilir.",
    items: [
      "Fotoğrafçı yönlendirmeli AI üretim",
      "Doğal görünüm ve seçim kontrolü",
      "Dijital teslim, istenirse albüm opsiyonu"
    ],
    featured: true,
    ctaLabel: "Hediyeli Paketi Sor",
    whatsappMessage:
      "Merhaba, yenidoğan çekimiyle hediye AI hamile portre hizmetiniz hakkında detay almak istiyorum."
  },
  {
    icon: Heart,
    title: "Sadece AI Portre",
    price: "1.500 TL'den başlayan",
    text: "Yenidoğan çekimi düşünmeden, mevcut fotoğraflarından dijital hamile portresi isteyenler için.",
    items: ["Paket kapsamına göre portre adedi", "Fotoğrafçı yönlendirmesi ve eleme", "Dijital teslim"],
    featured: false,
    ctaLabel: "Sadece AI Paketi Sor",
    whatsappMessage: "Merhaba, sadece AI hamile portre paketi hakkında bilgi almak istiyorum."
  }
];

const faqItems = [
  {
    question: "Fotoğraflarım iznim olmadan paylaşılır mı?",
    answer:
      "Hayır. Gönderdiğiniz fotoğraflar ve hazırlanan sonuçlar izniniz olmadan sosyal medyada, portfolyoda veya üçüncü kişilerle paylaşılmaz. Saklama ve silme tercihinizi de baştan konuşuruz."
  },
  {
    question: "Bunu kendim AI araçlarıyla yapamaz mıyım?",
    answer:
      "Yapabilirsiniz. Buradaki fark, sürecin fotoğrafçı gözüyle yönetilmesi: doğru referans seçimi, tarz yönlendirmesi, sonuç eleme, doğal görünüm kontrolü ve gerekirse baskı/albüm hazırlığı."
  },
  {
    question: "Ücretsiz hizmet tam olarak ne zaman geçerli?",
    answer:
      "Yenidoğan çekimi paketiyle birlikte bu hizmeti ek hediye olarak sunuyoruz. Çekim paketi, teslim adedi ve albüm gibi detayları WhatsApp görüşmesinde netleştiriyoruz."
  },
  {
    question: "Sonuçlar bana yüzde yüz benzer mi?",
    answer:
      "AI üretimi olduğu için yüzde yüz birebir benzerlik garantisi veremeyiz. Fotoğraflarınızı referans alır, olabildiğince size yakın ve doğal görünen sonuçları seçeriz."
  },
  {
    question: "Kıyafet ve mahremiyet sınırlarını ben belirleyebilir miyim?",
    answer:
      "Evet. Daha kapalı, daha sade, daha romantik veya daha minimal bir tarz isteyebilirsiniz. Kullanılmasını istemediğiniz kıyafet, poz veya görünüm sınırlarını baştan not alırız."
  },
  {
    question: "Beğenmezsem revize olur mu?",
    answer:
      "Paket kapsamına göre seçki ve küçük düzenleme/revizyon hakkı konuşulur. Amacımız her çıktıyı göndermek değil, doğal ve hatıra değerindeki kareleri ayıklayıp teslim etmektir."
  },
  {
    question: "Bu gerçek hamile çekiminin yerine geçer mi?",
    answer:
      "Bu hizmet gerçek bir stüdyo veya dış çekimin birebir yerine geçmek zorunda değil; hızlı, zahmetsiz ve fotoğrafçı kürasyonlu dijital bir hamilelik hatırası alternatifi olarak düşünülür."
  },
  {
    question: "Albüm veya baskı yapılabilir mi?",
    answer:
      "Evet. Beğendiğiniz kareler teknik olarak uygunsa dijital teslimin yanında baskı veya albüm seçeneği de hazırlanabilir."
  }
];

const defaultWhatsAppMessage =
  "Merhaba, yenidoğan çekimiyle hediye AI hamile portre hizmetiniz hakkında detay almak istiyorum.";
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

      {open ? (
        <div className="mobile-menu is-open" aria-hidden={false}>
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
            <WhatsAppButton label="WhatsApp'tan Sor" />
          </div>
        </div>
      ) : null}
    </header>
  );
}

function BeforeAfterShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
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
    }, AUTO_ADVANCE_MS);

    return clearAutoTimer;
  }, [active]);

  const current = afterImages[active];

  function goTo(offset: number) {
    clearAutoTimer();
    setDirection(offset > 0 ? 1 : -1);
    setActive((currentIndex) => {
      const next = currentIndex + offset;
      return (next + afterImages.length) % afterImages.length;
    });
  }

  function selectImage(index: number) {
    clearAutoTimer();
    setDirection(index >= active ? 1 : -1);
    setActive(index);
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

  const heroImageSrc = `${current.src}?hero=1`;

  return (
    <section className="showcase" aria-label="Önce ve sonra hamile portre örneği">
      <div className="after-column">
        <div
          className="image-frame after-frame hero-stage"
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
        >
          <div className="frame-label">Hazırlanan portre</div>
          <div className={`after-image-layer ${direction > 0 ? "from-right" : "from-left"}`} key={current.src}>
            <Image
              src={heroImageSrc}
              alt={current.alt}
              fill
              preload
              loading="eager"
              unoptimized
              sizes="(min-width: 900px) 380px, 100vw"
            />
          </div>
          <div className="before-reference">
            <div className="frame-label reference-label">Orijinal</div>
            <Image
              src="/assets/before-selfie-v3.png"
              alt="Evde telefonda çekilmiş hamilelik öncesi örnek fotoğraf"
              width={302}
              height={592}
              preload
              loading="eager"
              unoptimized
            />
          </div>
        </div>
        <div className="carousel-footer">
          <div className="style-selector" aria-label="Portre tarzları">
            {afterImages.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className={index === active ? "is-active" : ""}
                onClick={() => selectImage(index)}
                aria-pressed={index === active}
              >
                {item.title}
              </button>
            ))}
          </div>
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
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section process-section" id="process">
      <div className="section-copy narrow">
        <p className="section-kicker">Nasıl çalışır?</p>
        <h2>Fotoğrafları gönderin, üretimi biz yönetelim.</h2>
        <p>Burada amaç tek tıkla çıktı almak değil; hamilelik döneminizden doğal, seçilmiş ve teslim edilebilir kareler hazırlamak.</p>
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

function OfferNoteSection() {
  return (
    <section className="offer-note" aria-label="Yenidoğan çekimi görüşen ailelere özel hediye">
      <div className="offer-note-copy">
        <p className="section-kicker">Bu sayfayı neden gönderiyoruz?</p>
        <h2>Fiyat alırken bilmeniz gereken ek bir hediye.</h2>
        <p>
          Yenidoğan çekimi için görüşen ailelere, mevcut hamilelik fotoğraflarından
          fotoğrafçı kürasyonlu AI portreleri ücretsiz hazırlıyoruz. Önce örnekleri ve süreci inceleyin; ilginizi
          çekerse detayları WhatsApp&apos;ta netleştiririz.
        </p>
      </div>
      <div className="offer-card">
        <Gift aria-hidden="true" />
        <strong>Yenidoğan çekimine ek ücretsiz hizmet</strong>
        <p>Normalde tek başına satın alınabilir; yenidoğan çekimi paketinde hediye olarak sunulur.</p>
      </div>
    </section>
  );
}

function ExampleFlowSection() {
  const flowingExamples = [...styleExamples, ...styleExamples];

  return (
    <section className="section examples-section" id="examples">
      <div className="section-copy">
        <p className="section-kicker">Örnek tarzlar</p>
        <h2>Farklı ışık, poz ve atmosfer seçenekleri.</h2>
        <p>
          Fotoğrafçı yönlendirmesiyle aynı referanslardan farklı portre dilleri hazırlanabilir; sade, romantik,
          sıcak tonlu veya albüm uyumlu seriler gibi.
        </p>
      </div>
      <div className="example-flow" aria-label="AI hamile portre tarzları">
        <div className="example-track">
          {flowingExamples.map((item, index) => (
            <article className="example-card" key={`${item.title}-${index}`}>
              <div className="example-media">
                <Image src={item.src} alt={`${item.title} hamile portre örneği`} fill unoptimized sizes="260px" />
              </div>
              <div>
                <span>{item.title}</span>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="section why-section" id="why-us">
      <div className="why-copy">
        <p className="section-kicker">En önemli fark</p>
        <h2>Neden kendim AI aracıyla yapmayayım?</h2>
        <p>
          Yapabilirsiniz. Bizim farkımız, yapay zekayı tek başına bırakmamak: fotoğrafçı gözüyle yönlendirmek,
          sonuçları elemek, doğal görünmeyen kareleri ayıklamak ve teslim edilebilir bir seçkiye dönüştürmek.
        </p>
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
          <h3>Tek başına AI denemesi</h3>
          <p className="comparison-intro">Hızlı olabilir ama sonuç çoğu zaman seçki, yönlendirme ve teslim standardı ister.</p>
          <ul className="comparison-list negative-list">
            {["Referans fotoğraf seçimi size kalır", "Poz, ışık ve tarz tutarsız olabilir", "Her sonuç teslim edilebilir kalitede olmaz"].map((item) => (
              <li key={item}>
                <XCircle aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="preferred">
          <h3>Fotoğrafçı yönlendirmeli süreç</h3>
          <p className="comparison-intro">AI üretir; fotoğrafçı yönlendirir, seçer, kontrol eder ve gerekiyorsa son dokunuşu yapar.</p>
          <ul className="comparison-list positive-list">
            {["Size uygun tarz ve kompozisyon kurulur", "Doğal görünmeyen kareler ayıklanır", "Dijital teslim ve albüm opsiyonu planlanır"].map((item) => (
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
        <h2>Asıl teklif hediye; isteyen tek başına da alabilir.</h2>
        <p>AI hamile portreleri yenidoğan çekimi paketinde ek hediye olarak sunulur. Sadece portre isteyenler için ayrı paket seçeneği de bulunur.</p>
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
              <WhatsAppButton label={plan.ctaLabel} message={plan.whatsappMessage} />
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
        <span>İzinsiz paylaşım yok</span>
      </div>
      <div>
        <Clock3 aria-hidden="true" />
        <span>24-72 saat teslim planı</span>
      </div>
      <div>
        <Camera aria-hidden="true" />
        <span>Fotoğrafçı seçimi</span>
      </div>
      <div>
        <Sparkles aria-hidden="true" />
        <span>Doğal görünüm kontrolü</span>
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
          <p>Yenidoğan çekimi görüşmelerine ek, fotoğrafçı kürasyonlu AI hamile portreleri hazırlıyoruz.</p>
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
    () => ["AI destekli hediye", "Fotoğrafçı seçimi", "İzinsiz paylaşım yok"],
    []
  );

  return (
    <main id="top">
      <Header />
      <section className="hero-section">
        <div className="hero-copy">
          <h1>
            Yenidoğan çekimine <span className="hero-highlight">AI hamilelik portreniz de dahil.</span>
          </h1>
          <p>
            Fotoğraflarınızı gönderin; AI üretimi fotoğrafçı gözüyle hazırlayıp hediye edelim.
          </p>
          <div className="hero-actions">
            <WhatsAppButton label="WhatsApp'tan Detay Al" />
            <a className="button button-secondary" href="#examples">
              Örnekleri Gör
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
      <OfferNoteSection />
      <ExampleFlowSection />
      <WhyUsSection />
      <ProcessSection />
      <PricingSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
