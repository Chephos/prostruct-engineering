import { useEffect, useState } from 'react';

// ── TYPES ──────────────────────────────────────────────
interface NavItem { label: string; href: string; }
interface Service { icon: string; title: string; desc: string; }
interface Project { img: string; type: string; title: string; location: string; year: string; featured?: boolean; }
interface WhyItem { icon: string; title: string; desc: string; }

// ── DATA ──────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES: Service[] = [
  { icon: '🏗️', title: 'Structural Engineering', desc: 'Design, analysis and supervision of reinforced concrete, steel and composite structures for residential, commercial and industrial facilities.' },
  { icon: '⚙️', title: 'Steel Fabrication & Installation', desc: 'Custom steel fabrication, erection and welding of structural steel members, frames, trusses and industrial equipment supports.' },
  { icon: '🏢', title: 'Building Construction', desc: 'End-to-end delivery of residential and commercial buildings — from foundation to finishing, on time and within budget.' },
  { icon: '🏭', title: 'Industrial Projects', desc: 'Engineering and construction of factories, warehouses, processing plants and industrial facilities across Nigeria.' },
  { icon: '📋', title: 'Project Management', desc: 'Professional project planning, scheduling, resource management, and delivery oversight to ensure excellence at every stage.' },
  { icon: '🏗️', title: 'Industrial Flooring', desc: 'High-performance industrial floor casting, hardening, finishing and surface treatment for heavy-duty environments.' },
];

const PROJECTS: Project[] = [
  {
    img: '/images/tractor.jpeg',
    type: 'Industrial Construction',
    title: 'Intercontinental Distillers Facility Expansion',
    location: 'Lagos, Nigeria',
    year: '2023',
    featured: true,
  },
  {
    img: '/images/steel isonu.jpeg',
    type: 'Steel Fabrication',
    title: 'Steel Structural Frame — Warehouse Complex',
    location: 'Ogun State, Nigeria',
    year: '2023',
  },
  {
    img: '/images/industrial_floor.jpeg',
    type: 'Industrial Flooring',
    title: 'High-Performance Industrial Floor Casting',
    location: 'Lagos State, Nigeria',
    year: '2022',
  },
  {
    img: '/images/storey.jpeg',
    type: 'Building Construction',
    title: 'Commercial Development — Multi-Storey Block',
    location: 'Victoria Island, Lagos',
    year: '2022',
  },
  {
    img: '/images/steel bokku.jpeg',
    type: 'Infrastructure Development',
    title: 'Reinforced Concrete Structure — Corporate Campus',
    location: 'Abuja, Nigeria',
    year: '2021',
  },
  {
    img: '/images/boys.jpeg',
    type: 'Project Management',
    title: 'Multi-Phase Industrial Plant Development',
    location: 'Ikeja, Lagos',
    year: '2021',
  },
];

const CORPORATE_CLIENTS = [
  { name: 'Intercontinental Distillers Limited', abbr: 'IDL', color: '#1e40af' },
  { name: 'Manufacturers Association of Nigeria', abbr: 'MAN', color: '#065f46' },
  { name: 'Solution Ground Ministry', abbr: 'SGM', color: '#7c3aed' },
];

const INDIVIDUAL_CLIENTS = [
  { name: 'Dr. Oluranti' },
  { name: 'Dr. Oluwafemi' },
  { name: 'Chief Adegoke', title: 'Business Executive' },

];

const WHY_ITEMS: WhyItem[] = [
  { icon: '🎯', title: 'Experienced Engineering Team', desc: 'Our team of COREN-registered engineers brings decades of combined experience across structural, civil and industrial engineering disciplines.' },
  { icon: '🔩', title: 'High-Quality Materials', desc: 'We source and specify only certified, premium-grade materials ensuring structural integrity, safety and long-term durability.' },
  { icon: '⏱️', title: 'Timely Project Delivery', desc: 'We are committed to meeting project milestones and deadlines through disciplined scheduling and proactive site management.' },
  { icon: '📊', title: 'Strong Project Management', desc: 'Our structured project management approach ensures full transparency, cost control and consistent quality from inception to handover.' },
  { icon: '🛡️', title: 'Safety-First Culture', desc: 'We maintain strict HSE standards on every project, prioritising the safety of our workers, clients and the public at all times.' },
  { icon: '🌟', title: 'Client Satisfaction', desc: 'Our long-term client relationships and repeat engagements speak to our commitment to exceeding expectations every time.' },
];

// ── HOOK: Scroll Reveal ────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── COMPONENTS ────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-white/5'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:bg-orange-500 transition-colors">
            PE
          </div>
          <div>
            <div className="font-bebas text-white text-xl tracking-widest leading-none">Prostruct</div>
            <div className="text-orange-400 text-[10px] tracking-[0.2em] uppercase font-medium">Engineering Limited</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link-effect text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 tracking-wide transition-colors"
        >
          Get a Quote <span>→</span>
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/10 px-6 py-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-orange-400 py-3 text-sm font-medium border-b border-white/5 last:border-0 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block mt-4 bg-orange-600 text-white text-center py-3 text-sm font-semibold tracking-wide"
          >
            Get a Quote →
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* BG Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Prostruct Engineering construction site"
          className="w-full h-full object-cover animate-zoom-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/60" />
        <div className="absolute inset-0 stripe-pattern" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 lg:px-10 w-full pt-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="h-px w-12 bg-orange-500" />
            <span className="text-orange-400 text-xs font-semibold tracking-[0.25em] uppercase">
              Construction & Engineering Firm · Lagos, Nigeria
            </span>
          </div>

          <h1 className="font-bebas text-white leading-none mb-6 animate-fade-in-up delay-100"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}>
            Prostruct<br />
            <span className="text-orange-500">Engineering</span><br />
            Limited
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl animate-fade-in-up delay-200">
            Building Excellence with Precision and Integrity. We deliver world-class
            structural engineering, steel fabrication, and construction solutions across Nigeria.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-4 text-sm tracking-wider transition-all hover:gap-3"
            >
              View Our Projects <span>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-orange-500 text-white font-semibold px-8 py-4 text-sm tracking-wider transition-all"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 bg-slate-950/90 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { num: '5+', label: 'Years Experience' },
              { num: '8+', label: 'Projects Delivered' },

            ].map((stat) => (
              <div key={stat.label} className="px-8 py-6 text-center">
                <div className="font-bebas text-orange-400 text-4xl mb-1 tracking-wide">{stat.num}</div>
                <div className="text-gray-400 text-xs tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="reveal-left relative">
            <div className="absolute -top-4 -left-4 right-4 bottom-4 border-2 border-orange-600/30 z-0" />
            <img
              src="/images/about-team.jpg"
              alt="Prostruct Engineering team on site"
              className="relative z-10 w-full aspect-[4/5] object-cover"
            />
            {/* Badge */}
            <div className="absolute -bottom-6 -right-6 z-20 bg-orange-600 text-white p-6 text-center">
              <div className="font-bebas text-5xl leading-none">15+</div>
              <div className="text-xs tracking-widest uppercase mt-1 font-medium">Years of<br />Excellence</div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-right">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-orange-500" />
              <span className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase">Who We Are</span>
            </div>
            <h2 className="font-playfair text-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
              Nigeria's Premier Engineering & Construction Partner
            </h2>
            <p className="text-gray-400 leading-relaxed mb-5 text-[0.95rem]">
              Prostruct Engineering Limited is a construction and engineering firm based in Lagos,
              Nigeria. Founded on principles of quality, precision, and integrity, we have built a strong
              reputation for delivering exceptional structural and industrial projects across the country.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8 text-[0.95rem]">
              Our multidisciplinary team of COREN-registered engineers, project managers, and skilled
              tradespeople work collaboratively to deliver projects that meet international standards while
              addressing the unique challenges of the Nigerian construction environment.
            </p>

            {/* Values */}


            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-7 py-3.5 text-sm tracking-wider transition-all"
            >
              Work With Us →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-28 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4 reveal">
            <div className="h-px w-10 bg-orange-500" />
            <span className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase">What We Do</span>
          </div>
          <h2 className="font-playfair text-white reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
            Our Core Services
          </h2>
          <p className="text-gray-400 mt-4 leading-relaxed text-[0.95rem] reveal">
            From structural design to project delivery, we offer a comprehensive range of
            engineering and construction services tailored to our clients' needs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              className="reveal group bg-slate-900 border border-white/5 p-8 relative overflow-hidden hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Number watermark */}
              <div className="absolute bottom-2 right-4 font-bebas text-8xl text-white/[0.03] select-none leading-none">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-4xl mb-5">{svc.icon}</div>
              <h3 className="font-bebas text-white text-xl tracking-wider mb-3 group-hover:text-orange-400 transition-colors">
                {svc.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>
              <div className="mt-6 h-px w-8 bg-orange-600 group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 reveal">
              <div className="h-px w-10 bg-orange-500" />
              <span className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase">Our Portfolio</span>
            </div>
            <h2 className="font-playfair text-white reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
              Selected Projects
            </h2>
            <p className="text-gray-400 mt-4 leading-relaxed text-[0.95rem] reveal">
              A showcase of our finest engineering and construction work across Nigeria.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`reveal project-card-hover relative overflow-hidden group cursor-pointer ${project.featured ? 'lg:col-span-2' : ''
                }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {project.featured && (
                <div className="absolute top-4 left-4 z-20 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 tracking-widest uppercase">
                  Featured
                </div>
              )}
              <div className={`relative overflow-hidden ${project.featured ? 'aspect-video' : 'aspect-[4/3]'}`}>
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[10%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />

                {/* Always visible badge */}
                <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-sm text-gray-300 text-xs px-3 py-1 font-medium">
                  {project.year}
                </div>

                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-orange-400 text-xs font-semibold tracking-widest uppercase mb-2">
                    {project.type}
                  </div>
                  <h3 className="font-playfair text-white text-xl leading-snug mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span>📍</span>
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section id="clients" className="py-28 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 reveal">
            <div className="h-px w-10 bg-orange-500" />
            <span className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase">Trusted By</span>
            <div className="h-px w-10 bg-orange-500" />
          </div>
          <h2 className="font-playfair text-white reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
            Our Valued Clients
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed text-[0.95rem] reveal">
            We are proud to have partnered with leading corporations and private investors
            who trust Prostruct Engineering to deliver results.
          </p>
        </div>

        {/* Corporate Clients */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8 reveal">
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase">Corporate Clients</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CORPORATE_CLIENTS.map((client, i) => (
              <div
                key={client.name}
                className="reveal client-card bg-slate-900 p-8 flex flex-col items-center text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Logo placeholder */}
                <div
                  className="w-20 h-20 flex items-center justify-center text-white font-bebas text-2xl tracking-widest mb-5 flex-shrink-0"
                  style={{ background: client.color }}
                >
                  {client.abbr}
                </div>
                <div className="text-white font-semibold text-sm text-center leading-snug">
                  {client.name}
                </div>
                <div className="mt-3 text-orange-400/60 text-xs tracking-widest uppercase">Corporate Partner</div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Clients */}
        <div>
          <div className="flex items-center gap-4 mb-8 reveal">
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase">Individual Clients</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {INDIVIDUAL_CLIENTS.map((client, i) => (
              <div
                key={client.name}
                className="reveal client-card bg-slate-900 p-5 text-center"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-slate-700 border border-orange-600/30 flex items-center justify-center text-orange-400 font-bold text-lg mx-auto mb-3">
                  {client.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div className="text-white text-md font-semibold mb-1">{client.name}</div>
                <div className="text-gray-500 text-xs">{client.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 reveal bg-slate-900 border border-orange-500/20 p-10 relative overflow-hidden">
          <div className="absolute top-4 left-8 font-bebas text-orange-600/10 text-9xl leading-none select-none">"</div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="font-playfair text-white text-xl md:text-2xl italic leading-relaxed mb-6">
              "Prostruct Engineering delivered our facility expansion on time and within budget.
              Their attention to structural quality and professional site management exceeded our expectations."
            </p>
            <div className="text-orange-400 font-semibold text-sm tracking-wide">— Management Team</div>
            <div className="text-gray-500 text-xs mt-1 tracking-widest uppercase">Intercontinental Distillers Limited</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: '#0c1525' }}>
      {/* BG Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 reveal">
            <div className="h-px w-10 bg-orange-500" />
            <span className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase">Our Edge</span>
            <div className="h-px w-10 bg-orange-500" />
          </div>
          <h2 className="font-playfair text-white reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
            Why Choose Prostruct?
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed text-[0.95rem] reveal">
            We combine technical excellence with unwavering professionalism to deliver
            results that stand the test of time.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="reveal group bg-slate-900/60 backdrop-blur-sm border border-white/5 p-8 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-14 h-14 bg-orange-600/10 border border-orange-600/20 flex items-center justify-center text-2xl mb-6 group-hover:bg-orange-600/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-semibold text-white text-base mb-3 group-hover:text-orange-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 reveal bg-orange-600 p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bebas text-white text-3xl tracking-wider mb-1">
              Ready to Start Your Project?
            </h3>
            <p className="text-orange-100 text-sm">
              Contact us today for a free consultation and project assessment.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 text-sm tracking-wider hover:bg-gray-100 transition-colors"
          >
            Get In Touch →
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 reveal">
            <div className="h-px w-10 bg-orange-500" />
            <span className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase">Contact Us</span>
            <div className="h-px w-10 bg-orange-500" />
          </div>
          <h2 className="font-playfair text-white reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
            Let's Build Something Great
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed text-[0.95rem] reveal">
            Reach out to discuss your project, request a quote, or schedule a site visit.
            Our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="reveal-left">
            <div className="space-y-6 mb-10">
              {[
                { icon: '📍', label: 'Location', value: '5 KASUNMU OGUNMAKINDE, AKESAN LAGOS STATE.', value_2: 'APPLE ROAD, IRE AKARI ESTATE, IDI OYA, OYO STATE.' },
                { icon: '📞', label: 'Phone', value: '+234 (0) 808 282 2560' },
                { icon: '📧', label: 'Email', value: 'prostructengineeringlimited@gmail.com' },
                { icon: '🌐', label: 'Website', value: 'www.prostructengineering.com' },
                { icon: '⏰', label: 'Working Hours', value: 'Mon – Fri: 8:00 AM – 5:00 PM' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-slate-800 border border-white/5 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-orange-600/10 group-hover:border-orange-500/30 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs tracking-widest uppercase mb-1">{item.label}</div>
                    <div className="text-white font-medium text-sm">{item.value}</div>
                    <div className="text-white font-medium text-sm">{item.value_2}</div>
                  </div>
                </div>
              ))}
            </div>

            
          </div>

          {/* Form */}
          <div className="reveal-right">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="font-playfair text-white text-2xl mb-3">Message Sent!</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  Thank you for reaching out to Prostruct Engineering Limited.
                  Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-slate-800 border border-white/10 text-white placeholder-gray-600 px-4 py-3.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-slate-800 border border-white/10 text-white placeholder-gray-600 px-4 py-3.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={e => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+234 (0) 000 000 0000"
                      className="w-full bg-slate-800 border border-white/10 text-white placeholder-gray-600 px-4 py-3.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">Service Required</label>
                    <select
                      value={formState.service}
                      onChange={e => setFormState({ ...formState, service: e.target.value })}
                      className="w-full bg-slate-800 border border-white/10 text-gray-400 px-4 py-3.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors"
                    >
                      <option value="">Select a service...</option>
                      <option value="structural">Structural Engineering</option>
                      <option value="steel">Steel Fabrication & Installation</option>
                      <option value="building">Building Construction</option>
                      <option value="industrial">Industrial Projects</option>
                      <option value="pm">Project Management</option>
                      <option value="flooring">Industrial Flooring</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">Project Details *</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Briefly describe your project — scope, location, timeline..."
                    className="w-full bg-slate-800 border border-white/10 text-white placeholder-gray-600 px-4 py-3.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 text-sm tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  Send Message →
                </button>
                <p className="text-gray-600 text-xs text-center">
                  We respond within 24 hours on business days.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                PE
              </div>
              <div>
                <div className="font-bebas text-white text-xl tracking-widest leading-none">Prostruct Engineering</div>
                <div className="text-orange-400 text-[10px] tracking-[0.2em] uppercase font-medium">Limited</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-5">
              Building Excellence with Precision and Integrity. Nigeria's trusted partner
              for construction, structural engineering, and industrial projects.
            </p>
            <div className="text-orange-400/60 text-xs tracking-wider font-medium italic">
              "Building Excellence with Precision and Integrity"
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Services', 'Projects', 'Our Clients', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '').replace('ourservices', 'services').replace('ourclients', 'clients').replace('contactus', 'contact').replace('aboutus', 'about')}`}
                    className="text-gray-500 hover:text-orange-400 text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Services</h4>
            <ul className="space-y-3">
              {['Structural Engineering', 'Steel Fabrication', 'Building Construction', 'Industrial Projects', 'Project Management'].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-gray-500 hover:text-orange-400 text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} <span className="text-orange-400/70">Prostruct Engineering Limited</span>. All rights reserved. Lagos, Nigeria.
          </p>
          <div className="flex items-center gap-2 text-gray-600 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for new projects
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── MAIN APP ────────────────────────────────────────────
export default function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Clients />
      <WhyChooseUs />
      <Contact />
      <Footer />

      {/* Back to top */}
      <BackToTop />
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center transition-all duration-300 shadow-lg ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
