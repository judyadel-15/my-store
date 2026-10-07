import { Fragment, useEffect, useState } from "react";
import "./style.css";

const TEACHER_EMAILS = ["teacher@gmail.com", "instructor@gmail.com", "drmiller@gmail.com"];

const roleOf = (email) => {
  const m = email.trim().toLowerCase();
  const local = m.split("@")[0];
  return TEACHER_EMAILS.includes(m) || /^(teacher|instructor|prof|professor|dr)([._-]|\d|$)/.test(local) ? "teacher" : "student";
};

const nameOf = (email) =>
  email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ") || "Learner";

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v;
  } catch (e) {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch (e) {}
};

function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const h = (e) => setMatch(e.matches);
    setMatch(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [query]);
  return match;
}

const SIMG = {
  signup: "/images/signup.jpg",
  dashboard: "/images/dashboard.jpg",
  hero: "/images/course.jpg",
  thumb: "/images/course.jpg",
  course: "/images/course.jpg",
  teacher: "/images/teacher.jpg",
  poster: "/images/poster.jpg",
  trophy: "/images/trophy.jpg",
  cert1: "/images/cert1.jpg",
  cert2: "/images/cert2.jpg",
  cert3: "/images/cert3.jpg",
  avatar: "/images/avatar.jpg",
  login: "/images/login.jpg",
};

function Pic({ src, alt = "", className }) {
  const [bad, setBad] = useState(false);
  return bad ? (
    <div className={className} style={{ background: "var(--high)" }} role="img" aria-label={alt} />
  ) : (
    <img className={className} src={src} alt={alt} onError={() => setBad(true)} referrerPolicy="no-referrer" />
  );
}

const ICONS = {
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>,
  school: <><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /></>,
  local_library: <path d="M4 4v16M8 8v12M12 6v14M16 6l4 14" />,
  military_tech: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" /></>,
  settings: <><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  notifications: <><path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 21h4" /></>,
  account_circle: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M6.5 19c1.5-3 9.5-3 11 0" /></>,
  home: <><path d="M3 11 12 3l9 8" /><path d="M5 10v10h14V10" /></>,
  menu_book: <><path d="M12 6c-2-2-5-3-9-3v15c4 0 7 1 9 3 2-2 5-3 9-3V3c-4 0-7 1-9 3z" /><path d="M12 6v15" /></>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  person: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  play_lesson: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M10 8l5 3-5 3z" /></>,
  schedule: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  workspace_premium: <><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" /></>,
  arrow_forward: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrow_back: <path d="M19 12H5m6-6-6 6 6 6" />,
  star: <path d="m12 2 3 6.5 7 .9-5.2 4.9 1.4 7L12 17.8 5.8 21.3l1.4-7L2 9.4l7-.9z" />,
  groups: <><circle cx="9" cy="8" r="3.5" /><path d="M2 20v-1a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v1M16 4.5a3.5 3.5 0 0 1 0 7M22 20v-1a4 4 0 0 0-3-3.8" /></>,
  videocam: <><rect x="2" y="5" width="14" height="14" rx="2" /><path d="m22 8-6 4 6 4z" /></>,
  download: <path d="M12 4v11m-5-4 5 5 5-5M5 20h14" />,
  all_inclusive: <path d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8" />,
  smartphone: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
  play_circle: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></>,
  expand_more: <path d="m6 9 6 6 6-6" />,
  expand_less: <path d="m18 15-6-6-6 6" />,
  chevron_right: <path d="m9 6 6 6-6 6" />,
  play_arrow: <path d="M8 5v14l11-7z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  volume_up: <><path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></>,
  fullscreen: <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />,
  receipt_long: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></>,
  sell: <><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1" /></>,
  open_in_new: <path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  check: <path d="m5 12 5 5 9-10" />,
  credit_card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>,
  account_balance: <path d="M3 10 12 4l9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18" />,
  wallet: <><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M16 13h2M3 10h18" /></>,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  verified_user: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="m9 12 2 2 4-4" /></>,
  check_circle: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
  auto_awesome: <><path d="M10 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /><path d="M19 3v4M17 5h4" /></>,
  trending_up: <path d="m22 7-8.5 8.5-5-5L2 17M16 7h6v6" />,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
  lock: <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  visibility: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  visibility_off: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /><path d="M3 3l18 18" /></>,
  logout: <path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H9" />,
  light_mode: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8" /></>,
  dark_mode: <path d="M20.8 13.6A8.5 8.5 0 1 1 10.4 3.2a7 7 0 0 0 10.4 10.4z" />,
  description: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h6" /></>,
  help_center: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01" /></>,
};

const Svg = ({ n, fill, size }) => (
  <svg
    className="ico-svg"
    viewBox="0 0 24 24"
    fill={fill ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {ICONS[n]}
  </svg>
);

/* ---------- Logo: graduation cap on a two-tone indigo/blue tile with a green tassel ---------- */
function LogoMark({ size = 32 }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#4648d4" />
      <path d="M48 20v16a12 12 0 0 1-12 12H20z" fill="#2170e4" opacity=".75" />
      <path d="M24 10 8 18.5 24 27l16-8.5z" fill="#ffffff" />
      <path d="M14 24v6.5c2.8 3.2 6.2 4.8 10 4.8s7.2-1.6 10-4.8V24l-10 5.2z" fill="#ffffff" opacity=".85" />
      <path d="M40 19v9" stroke="#6bff8f" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="40" cy="31" r="2.6" fill="#6bff8f" />
    </svg>
  );
}

function Logo({ size = 32 }) {
  return (
    <span className="brandmark">
      <LogoMark size={size} />
      <span>Lumina Learning</span>
    </span>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const dark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-fab"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onToggle}
    >
      <Svg n={dark ? "light_mode" : "dark_mode"} />
    </button>
  );
}

const S_NAV = [
  ["dashboard", "Dashboard", "dashboard"],
  ["course", "Courses", "school"],
  ["library", "Library", "local_library"],
  ["certificates", "Achievements", "military_tech"],
];
const S_MOBILE_NAV = [
  ["dashboard", "Home", "home"],
  ["course", "Courses", "menu_book"],
  ["learn", "Learn", "bolt"],
  ["profile", "Profile", "person"],
];

function Shell({ page, go, name, theme, onToggleTheme, children }) {
  const open = (id) => {
    if (id === "profile") return go("settings");
    if (id === "library") return go("course");
    if (["dashboard", "course", "certificates", "learn"].includes(id)) go(id);
  };
  return (
    <>
      <header className="top">
        <div className="logo sm"><Logo size={28} /></div>
        <div className="top-icons">
          <button type="button" className="icon-btn" aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={onToggleTheme}>
            <Svg n={theme === "dark" ? "light_mode" : "dark_mode"} />
          </button>
          <Svg n="search" /><Svg n="notifications" /><Svg n="account_circle" />
        </div>
      </header>

      <nav className="side">
        <div className="brand">
          <div className="logo"><Logo size={34} /></div>
          {page === "dashboard" ? (
            <div className="me">
              <span className="avatar">{Array.from(name)[0]}</span>
              <div><b><bdi>{name}</bdi></b><small>Student</small></div>
            </div>
          ) : (
            <small className="tag">Academic Excellence</small>
          )}
        </div>
        <div className="links">
          {S_NAV.map(([id, label, icon]) => (
            <button key={id} className={"link" + (id === page ? " on" : "")} onClick={() => open(id)}>
              <Svg n={icon} /> {label}
            </button>
          ))}
        </div>
        <div className="foot">
          <button className={"link" + (page === "settings" ? " on" : "")} onClick={() => go("settings")}><Svg n="settings" /> Settings</button>
          <button className="link" onClick={onToggleTheme}>
            <Svg n={theme === "dark" ? "light_mode" : "dark_mode"} /> {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <button className="link" onClick={() => go("logout")}><Svg n="logout" /> Log out</button>
          <button className="upgrade">Upgrade to Pro</button>
        </div>
      </nav>

      <main className="main">{children}</main>

      <nav className="bottom">
        {S_MOBILE_NAV.map(([id, label, icon]) => (
          <button key={id} className={"tab" + (id === page || (id === "profile" && page === "settings") ? " on" : "")} onClick={() => open(id)}>
            <Svg n={icon} />
            <span className="mono">{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}

/* ---------- Legal pages: Terms of Service + Privacy Policy ---------- */
const LEGAL_UPDATED = "October 6, 2026";
const LEGAL = {
  terms: {
    title: "Terms of Service",
    intro: "Welcome to Lumina Learning. These Terms of Service explain the rules for using our website, apps and courses. Please read them carefully.",
    sections: [
      ["1. Accepting these terms", [
        "By creating an account, logging in or using Lumina Learning, you agree to these Terms and to our Privacy Policy. If you do not agree, please do not use the service.",
      ]],
      ["2. Your account", [
        "You must provide accurate information when you sign up and keep your login details private. You are responsible for everything that happens under your account.",
        ["Passwords must be at least 8 characters long.", "Tell us right away if you think someone else has used your account.", "One person per account; do not share your login with others."],
      ]],
      ["3. Student and teacher accounts", [
        "Students can enroll in courses, watch lessons, take part in the community and earn certificates. Teachers can create courses, post announcements, message students and grade work. Teachers must own, or have permission to use, all content they upload.",
      ]],
      ["4. Courses, payments and refunds", [
        "Prices are shown before you pay. Taxes may be added at checkout. When you purchase a course you receive a personal, non-transferable licence to view it for your own learning.",
        ["Paid courses include a 30-day money-back guarantee. Ask for a refund within 30 days of purchase and we will return the full amount.", "Promo codes are valid only as described and may expire or be withdrawn.", "Bank transfers are confirmed only after the payment has arrived."],
      ]],
      ["5. Acceptable use", [
        "You agree not to misuse Lumina Learning. In particular, you will not:",
        ["copy, resell or share paid course content outside your account;", "post content that is unlawful, hateful, harassing or misleading;", "try to break, probe or overload our systems, or access other people's data;", "cheat on quizzes or assignments, or help others to do so."],
      ]],
      ["6. Community and messages", [
        "You are responsible for what you post in forums and messages. Be respectful. We may remove content or limit access if posts break these Terms.",
      ]],
      ["7. Intellectual property", [
        "Lumina Learning, its logo, design and software belong to us. Course materials belong to their authors. You keep ownership of what you create, and you give us permission to host and display it so that we can run the service.",
      ]],
      ["8. Suspension and ending your account", [
        "You can stop using Lumina Learning at any time. We may suspend or close an account that seriously or repeatedly breaks these Terms, with notice where possible.",
      ]],
      ["9. Disclaimers and liability", [
        "We work hard to keep the service running and accurate, but it is provided \"as is\". Certificates show that a course was completed and are not a guarantee of a job or qualification. To the extent allowed by law, we are not liable for indirect or consequential losses.",
      ]],
      ["10. Changes to these terms", [
        "We may update these Terms from time to time. If a change is important we will tell you in the app or by email. Continuing to use Lumina Learning after a change means you accept the new Terms.",
      ]],
      ["11. Contact us", [
        "Questions about these Terms? Email support@lumina.example and our team will get back to you within a few hours.",
      ]],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "Your privacy matters to us. This policy explains what information Lumina Learning collects, how we use it, and the choices you have.",
    sections: [
      ["1. Information we collect", [
        "We collect only what we need to run the service:",
        ["Account details: your name, email address and password.", "Learning activity: courses you open, lessons completed, progress, quiz results, notes and certificates.", "Payment details: the payment method you choose and basic order information. Card numbers are handled by our payment partners and are not stored on our servers.", "Messages and posts: what you send to teachers and write in the community forum.", "Device information: browser type, screen size and theme (light or dark)."],
      ]],
      ["2. How we use your information", [
        ["To create and secure your account and sign you in.", "To deliver courses, track your progress and issue certificates.", "To process payments, send receipts and handle refunds.", "To answer support requests and send important service messages.", "To improve Lumina Learning and keep it safe from misuse."],
      ]],
      ["3. Cookies and local storage", [
        "We store a small amount of data in your browser, such as your login session and your light or dark mode choice, so the site works the way you left it. You can clear this at any time in your browser settings, but you may then need to log in again.",
      ]],
      ["4. Who we share information with", [
        "We do not sell your personal information. We share it only with:",
        ["payment providers, to take payments;", "service providers who host our platform or send emails for us, under strict confidentiality;", "your teachers, who can see your name, progress and submissions for their courses;", "authorities, if the law requires it."],
      ]],
      ["5. How long we keep it", [
        "We keep your information while your account is open and for as long as needed to meet legal, tax and security duties. When you delete your account we remove or anonymise your personal data, except where we must keep it by law.",
      ]],
      ["6. Security", [
        "We use encryption in transit and access controls to protect your data. No system is perfectly secure, so please choose a strong password and keep it private.",
      ]],
      ["7. Your rights", [
        "Depending on where you live, you can ask us to:",
        ["see the information we hold about you;", "correct or update it (you can edit your profile in Settings);", "delete your account and data;", "export your data or object to certain uses of it."],
        "To use any of these rights, contact us using the details below.",
      ]],
      ["8. Children", [
        "Lumina Learning is not meant for children under 13, and we do not knowingly collect their data. If you believe a child has given us information, please contact us and we will delete it.",
      ]],
      ["9. Changes to this policy", [
        "We may update this policy as the service changes. The date at the top shows when it was last updated, and we will notify you about significant changes.",
      ]],
      ["10. Contact us", [
        "For any privacy question or request, email privacy@lumina.example.",
      ]],
    ],
  },
};

function Legal({ page, setPage, onBack, theme, onToggleTheme, signup }) {
  const doc = LEGAL[page];
  useEffect(() => { window.scrollTo(0, 0); }, [page]);
  return (
    <div className="su legal">
      <i className="blob b1" /><i className="blob b2" />
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <header className="legal-head">
        <span className="su-logo"><Logo size={36} /></span>
      </header>
      <main className="legal-main">
        <div className="legal-card">
          <button type="button" className="legal-back" onClick={onBack}>
            <Svg n="arrow_back" /> Back to {signup ? "Create Account" : "Log in"}
          </button>
          <div className="legal-tabs" role="tablist">
            {[["terms", "Terms of Service"], ["privacy", "Privacy Policy"]].map(([id, label]) => (
              <button key={id} type="button" role="tab" aria-selected={page === id} className={"legal-tab" + (page === id ? " on" : "")} onClick={() => setPage(id)}>{label}</button>
            ))}
          </div>
          <h1>{doc.title}</h1>
          <small className="legal-date mono">LAST UPDATED: {LEGAL_UPDATED.toUpperCase()}</small>
          <p className="lead">{doc.intro}</p>
          {doc.sections.map(([heading, items]) => (
            <section key={heading}>
              <h2>{heading}</h2>
              {items.map((it, i) =>
                Array.isArray(it) ? (
                  <ul key={i}>{it.map((li) => <li key={li}>{li}</li>)}</ul>
                ) : (
                  <p key={i}>{it}</p>
                )
              )}
            </section>
          ))}
          <div className="legal-foot">
            <button type="button" className="btn primary" onClick={onBack}><Svg n="arrow_back" /> Back to {signup ? "Create Account" : "Log in"}</button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Auth({ onAuth, theme, onToggleTheme }) {
  const [mode, setMode] = useState("login");
  const [legal, setLegal] = useState(null);
  const [f, setF] = useState({ first: "", last: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const signup = mode === "signup";
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const full = `${f.first.trim()} ${f.last.trim()}`.trim();
    onAuth(f.email.trim(), signup ? full : "");
  };
  const openLegal = (p) => (e) => { e.preventDefault(); setLegal(p); };

  if (legal) {
    return (
      <div className="s-app">
        <Legal page={legal} setPage={setLegal} onBack={() => setLegal(null)} theme={theme} onToggleTheme={onToggleTheme} signup={signup} />
      </div>
    );
  }

  return (
    <div className="s-app">
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <div className="su">
        <i className="blob b1" /><i className="blob b2" />
        <header className="su-head">
          <div className="su-head-in">
            <span className="su-logo"><Logo size={40} /></span>
          </div>
        </header>

        <main className="su-main">
          <div className="su-card">
            <section className="su-art">
              <div className="su-bg" style={{ backgroundImage: `url('${SIMG.signup}')` }} />
              <div className="su-fade" />
              <div className="su-copy">
                <span className="su-badge mono"><Svg n="trending_up" /> ACCELERATE GROWTH</span>
                <h2>Your journey starts here.</h2>
                <p className="lead">Join Lumina Learning to access curated, high-focus educational content designed for modern professionals.</p>
                <div className="su-stats">
                  <div className="glass"><b>10k+</b><span>Active Learners</span></div>
                  <div className="glass"><b>500+</b><span>Expert Courses</span></div>
                </div>
              </div>
            </section>

            <section className="su-side">
              <h1>{signup ? "Create Account" : "Welcome back"}</h1>
              <p className="muted">
                {signup ? "Already have an account? " : "New to Lumina? "}
                <a href="#auth" onClick={(e) => { e.preventDefault(); setMode(signup ? "login" : "signup"); }}>
                  <b>{signup ? "Log in" : "Create an account"}</b>
                </a>
              </p>
              <form onSubmit={submit}>
                {signup && (
                  <div className="su-two">
                    <div className="su-field">
                      <label htmlFor="first">First Name</label>
                      <div className="su-in"><Svg n="person" /><input id="first" value={f.first} onChange={set("first")} placeholder="Jane" required autoComplete="given-name" /></div>
                    </div>
                    <div className="su-field">
                      <label htmlFor="last">Last Name</label>
                      <div className="su-in plain"><input id="last" value={f.last} onChange={set("last")} placeholder="Doe" required autoComplete="family-name" /></div>
                    </div>
                  </div>
                )}
                <div className="su-field">
                  <label htmlFor="email">Email</label>
                  <div className="su-in"><Svg n="mail" /><input id="email" type="email" value={f.email} onChange={set("email")} placeholder="jane.doe@gmail.com" required autoComplete="email" /></div>
                  <small className="su-hint">Teachers sign in with a teacher email, for example teacher@gmail.com. Any other email opens the student dashboard.</small>
                </div>
                <div className="su-field">
                  <label htmlFor="password">Password</label>
                  <div className="su-in">
                    <Svg n="lock" />
                    <input id="password" type={show ? "text" : "password"} value={f.password} onChange={set("password")} placeholder="••••••••" minLength={8} required autoComplete={signup ? "new-password" : "current-password"} />
                    <button type="button" className="eye" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)}>
                      <Svg n={show ? "visibility" : "visibility_off"} />
                    </button>
                  </div>
                  <small className="su-hint">Must be at least 8 characters.</small>
                </div>
                <button className="btn primary wide su-go" type="submit">{signup ? "Continue" : "Log in"} <Svg n="arrow_forward" /></button>
              </form>
              <p className="su-terms">
                By continuing, you agree to our{" "}
                <a href="#terms" onClick={openLegal("terms")}>Terms of Service</a> and{" "}
                <a href="#privacy" onClick={openLegal("privacy")}>Privacy Policy</a>.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

const S_STATS = [
  ["play_lesson", "IN PROGRESS", "3 Courses", "a"],
  ["schedule", "TIME LEARNED", "24.5 Hours", "b"],
  ["workspace_premium", "CERTIFICATES", "2 Earned", "c"],
];

function StudentDashboard({ name, go }) {
  return (
    <div className="wrap">
      <section className="welcome">
        <div>
          <h1>Welcome, <bdi>{name}</bdi>.</h1>
          <p className="lead">Your account is ready. Pick up your first course below.</p>
        </div>
        <button className="btn primary shadow" onClick={() => go("learn")}>Resume Study <Svg n="arrow_forward" /></button>
      </section>

      <section className="stats">
        {S_STATS.map(([icon, label, value, tone]) => (
          <div className="card stat" key={label}>
            <span className={"ico " + tone}><Svg n={icon} /></span>
            <div><div className="mono muted">{label}</div><div className="h-md">{value}</div></div>
          </div>
        ))}
      </section>

      <section className="bento">
        <div className="card learn">
          <div className="row"><h2 className="h-md">Continue Learning</h2><span className="pill mono">UX DESIGN</span></div>
          <div className="course-row">
            <Pic alt="Course thumbnail" src={SIMG.dashboard} />
            <div>
              <h3>Advanced Prototyping Interactions</h3>
              <p className="muted">Module 4: Mastering micro-interactions and scroll-driven animations.</p>
              <div className="row mono muted"><span>Progress</span><span>65%</span></div>
              <div className="bar"><i style={{ width: "65%" }} /></div>
            </div>
          </div>
          <button className="btn soft wide" onClick={() => go("course")}>View Course Details</button>
        </div>

        <div className="card">
          <h2 className="h-md">Upcoming Deadlines</h2>
          <div className="deadline urgent"><div className="date"><small>OCT</small><b>12</b></div><div><b>Wireframe Submission</b><small className="muted">UX Foundations</small></div></div>
          <div className="deadline"><div className="date"><small>OCT</small><b>15</b></div><div><b>Peer Review Quiz</b><small className="muted">Design Thinking</small></div></div>
          <a className="cal" href="#calendar">View Calendar</a>
        </div>
      </section>

      <section className="activity">
        <h2 className="h-md">Learning Activity</h2>
        <p className="muted">Your engagement over the past 30 days.</p>
      </section>
    </div>
  );
}

const INCLUDES = [
  ["videocam", "24 hours of on-demand video"],
  ["download", "15 downloadable resources"],
  ["all_inclusive", "Full lifetime access"],
  ["smartphone", "Access on mobile and desktop"],
  ["workspace_premium", "Certificate of completion"],
];
const MODULES = [
  ["Design Systems & Architecture", ["Building Scalable Component Libraries", "Design Tokens and Theming", "Documenting Systems for Handoff"]],
  ["Advanced Prototyping", ["Micro-interactions That Explain State", "Scroll-driven Animation", "Prototyping with Real Data"]],
  ["Accessibility in Depth", ["Designing for Screen Readers", "Color, Contrast and Motion", "Accessible Forms and Errors"]],
  ["User Psychology", ["Cognitive Load and Choice", "Habit, Feedback and Trust", "Testing Assumptions with Users"]],
];

function CourseDetails({ go }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="course">
      <div>
        <button className="back" onClick={() => go("dashboard")}><Svg n="arrow_back" /> Back to Courses</button>
        <div className="tags mono"><span>DESIGN</span><span>ADVANCED</span></div>
        <h1>Advanced UI/UX Design</h1>
        <p className="lead">Master the art of creating intuitive, accessible, and highly engaging user interfaces. This course delves into complex design systems, advanced prototyping, and user psychology.</p>
        <div className="meta">
          <span><Svg n="star" fill /> <b>4.9/5</b> (2.4k reviews)</span>
          <span><Svg n="schedule" /> 12 Weeks</span>
          <span><Svg n="groups" /> 15k+ Students</span>
        </div>
        <div
          className="hero"
          role="img"
          aria-label="Designer working at a desk with a monitor and tablet"
          style={{ backgroundImage: `url('${SIMG.hero}')` }}
        />

        <h2 className="h-md syl">Course Syllabus</h2>
        {MODULES.map(([title, lessons], i) => (
          <div className="mod" key={title}>
            <button className="mod-head" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              Module {i + 1}: {title} <Svg n={open === i ? "expand_less" : "expand_more"} />
            </button>
            {open === i && (
              <ul>{lessons.map((l) => <li key={l}><Svg n="play_circle" /> {l}</li>)}</ul>
            )}
          </div>
        ))}
      </div>

      <aside className="buy">
        <div className="price">$199</div>
        <s className="mono muted">$289 Original Price</s>
        <button className="btn primary wide" onClick={() => go("checkout")}>Enroll Now <Svg n="arrow_forward" /></button>
        <small className="mono muted center">30-Day Money-Back Guarantee</small>
        <h3>This course includes</h3>
        <ul>{INCLUDES.map(([icon, text]) => <li key={text}><Svg n={icon} /> {text}</li>)}</ul>
      </aside>
    </div>
  );
}

const METHODS = [
  ["card", "Credit / Debit Card", "credit_card"],
  ["paypal", "PayPal", "paypal"],
  ["apple", "Apple Pay", "smartphone"],
  ["google", "Google Pay", "smartphone"],
  ["bank", "Bank Transfer", "account_balance"],
  ["wallet", "Mobile Wallet", "wallet"],
];
const PRICE = 199;
const money = (n) => "$" + n.toFixed(2);
const digits = (v, n) => v.replace(/\D/g, "").slice(0, n);

function PayPalMark() {
  return (
    <svg className="ico-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.08 20.35h2.9l2.03-12.8H9.09z" fill="#003087" />
      <path d="M12.99 7.55h6c1.66 0 2.68.8 2.36 2.8-.32 2-2 4-4.36 4h-2.98z" fill="#009CDE" />
      <path d="M11.08 20.35h2.9l1.03-6h1.98c2.36 0 4.04-2 4.36-4 .32-2-.7-2.8-2.36-2.8h-6z" fill="#012169" />
    </svg>
  );
}

function Checkout({ go }) {
  const [method, setMethod] = useState("card");
  const [c, setC] = useState({ name: "", number: "", exp: "", cvv: "", email: "", phone: "" });
  const [promo, setPromo] = useState("");
  const [rate, setRate] = useState(0);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const set = (k, fn = (v) => v) => (e) => setC({ ...c, [k]: fn(e.target.value) });

  const discount = +(PRICE * rate).toFixed(2);
  const tax = +((PRICE - discount) * 0.1).toFixed(2);
  const total = PRICE - discount + tax;
  const apply = () => {
    const ok = promo.trim().toUpperCase() === "LUMINA10";
    setRate(ok ? 0.1 : 0);
    setMsg(ok ? "Code applied: 10% off" : "That code is not valid");
  };

  return (
    <div className="pay">
      <header className="pay-head">
        <div className="pay-brand"><Logo size={34} /></div>
        <button className="pay-cancel" onClick={() => go("course")}><Svg n="close" /> <span>Cancel</span></button>
      </header>

      <main className="pay-main">
        {done ? (
          <Success go={go} method={method} card={c.number} discount={discount} tax={tax} total={total} code={promo.trim().toUpperCase()} />
        ) : (
          <div className="pay-grid">
            <div className="pay-left">
              <div>
                <h1>Secure Checkout</h1>
                <p className="lead">Complete your purchase to access your new learning materials.</p>
              </div>

              <form id="pay" className="pcard" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                <h2 className="h-md">Payment Method</h2>
                <div className="pm-list" role="radiogroup">
                  {METHODS.map(([id, label, icon]) => (
                    <label key={id} className={"pm" + (method === id ? " on" : "")}>
                      <input type="radio" name="payment_method" checked={method === id} onChange={() => setMethod(id)} />
                      {icon === "paypal" ? <PayPalMark /> : <Svg n={icon} />}
                      <span>{label}</span>
                      {id === "card" && <span className="chips mono"><i>VISA</i><i>MC</i></span>}
                    </label>
                  ))}
                </div>

                <div className="pay-fields">
                  {method === "card" && (<>
                    <div className="pf"><label htmlFor="cn">Name on Card</label><input id="cn" value={c.name} onChange={set("name")} placeholder="Jane Doe" required autoComplete="cc-name" /></div>
                    <div className="pf"><label htmlFor="cc">Card Number</label>
                      <div className="pf-lock"><input id="cc" inputMode="numeric" value={c.number} onChange={set("number", (v) => digits(v, 16).replace(/(.{4})/g, "$1 ").trim())} placeholder="0000 0000 0000 0000" required minLength={19} autoComplete="cc-number" /><Svg n="lock" /></div>
                    </div>
                    <div className="pay-two">
                      <div className="pf"><label htmlFor="ex">Expiry Date</label><input id="ex" inputMode="numeric" value={c.exp} onChange={set("exp", (v) => digits(v, 4).replace(/^(\d{2})(\d)/, "$1/$2"))} placeholder="MM/YY" required minLength={5} autoComplete="cc-exp" /></div>
                      <div className="pf"><label htmlFor="cv">CVV</label><input id="cv" inputMode="numeric" value={c.cvv} onChange={set("cvv", (v) => digits(v, 4))} placeholder="123" required minLength={3} title="3 or 4 digits on the back of the card" autoComplete="cc-csc" /></div>
                    </div>
                  </>)}
                  {method === "paypal" && (<>
                    <div className="pf"><label htmlFor="pe">PayPal Email</label><input id="pe" type="email" value={c.email} onChange={set("email")} placeholder="jane.doe@email.com" required /></div>
                    <p className="note">You'll be sent to PayPal to approve the payment.</p>
                  </>)}
                  {(method === "apple" || method === "google") && (
                    <p className="note">Press Complete Purchase, then confirm the payment on your device.</p>
                  )}
                  {method === "bank" && (
                    <p className="note">We'll email the transfer details with your order number. Your course opens as soon as the payment arrives.</p>
                  )}
                  {method === "wallet" && (<>
                    <div className="pf"><label htmlFor="ph">Wallet Phone Number</label><input id="ph" type="tel" value={c.phone} onChange={set("phone", (v) => v.replace(/[^\d+ ]/g, ""))} placeholder="+1 555 000 0000" required minLength={7} autoComplete="tel" /></div>
                    <p className="note">You'll get a request in your wallet app to approve the payment.</p>
                  </>)}
                </div>
              </form>
            </div>

            <aside className="pcard pay-sum">
              <h2 className="h-md">Order Summary</h2>
              <div className="pay-item">
                <div
                  className="hero pay-thumb"
                  role="img"
                  aria-label="Course thumbnail"
                  style={{ backgroundImage: `url('${SIMG.thumb}')` }}
                />
                <div>
                  <span className="pay-tag mono">DESIGN</span>
                  <h3>Advanced UI/UX Design</h3>
                  <div className="h-md">{money(PRICE)}</div>
                </div>
              </div>
              <div className="pay-promo">
                <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo Code" aria-label="Promo code" />
                <button type="button" onClick={apply}>Apply</button>
              </div>
              {msg && <small className={"promo-msg" + (rate ? " ok" : "")} role="status">{msg}</small>}
              <div className="pay-lines">
                <div><span>Subtotal</span><b>{money(PRICE)}</b></div>
                <div className="green"><span>Discount applied</span><span>-{money(discount)}</span></div>
                <div><span>Tax (Calculated at checkout)</span><b>{money(tax)}</b></div>
              </div>
              <div className="pay-total"><span className="h-md">Total</span><strong>{money(total)}</strong></div>
              <button className="btn primary wide pay-buy" type="submit" form="pay">Complete Purchase <Svg n="arrow_forward" /></button>
              <p className="center muted small">By completing your purchase, you agree to these <a href="#terms">Terms of Service</a>.</p>
              <div className="pay-trust mono"><span><Svg n="lock" /> 256-BIT SSL</span><span><Svg n="verified_user" /> SECURE PAY</span></div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

const ONBOARD = [
  ["Join Course Community & Discord", "Connect with 1,200+ design peers, access private channels, and attend weekly live office hours.", "open_in_new"],
  ["Download Course Assets & Figma Kit", "Grab UI system starter templates, component libraries, typography scale tokens, and case study files.", "download"],
  ["Complete Your Onboarding Quiz", "A 3-minute diagnostic assessment to personalize your study recommendations and mentor assignment.", "arrow_forward"],
];

function Success({ go, method, card, discount, tax, total, code }) {
  const [ref] = useState(() => "LUM-" + Math.floor(10000 + Math.random() * 90000));
  const [ticked, setTicked] = useState([]);
  const [toast, setToast] = useState(false);
  const toggle = (i) => setTicked(ticked.includes(i) ? ticked.filter((x) => x !== i) : [...ticked, i]);
  const pct = Math.round((ticked.length / 3) * 100);
  const pending = method === "bank";
  const label = METHODS.find((m) => m[0] === method);
  const via = method === "card" && card.length >= 4 ? "•••• " + card.slice(-4) : label[1];
  const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const invoice = () => { setToast(true); setTimeout(() => setToast(false), 2500); };

  return (
    <div className="ok">
      <div className="ok-glow" />
      <header className="ok-head">
        <div className="ok-badge"><i className="ping" /><span><Svg n="check" /></span></div>
        <div className="ok-chip mono"><b /> {pending ? "ORDER RECEIVED • AWAITING TRANSFER" : "ORDER CONFIRMED • INSTANT ACCESS GRANTED"}</div>
        <h1>Payment Successful &amp; Enrollment Confirmed!</h1>
        <p className="lead">Congratulations! You have been successfully enrolled in <strong>Advanced UI/UX Design</strong>. Your curriculum workspace is primed and ready.</p>
        <div className="ok-actions">
          <button className="btn primary ok-go" onClick={() => go("learn")}>Start Learning Now <Svg n="arrow_forward" /></button>
          <button className="btn ok-inv" onClick={invoice}><Svg n="download" /> Download Invoice (PDF)</button>
        </div>
      </header>

      <div className="ok-grid">
        <div className="ok-col">
          <div className="ok-card ok-spot">
            <div className="ok-cover"><Pic src={SIMG.course} alt="Course cover" /><span className="mono">COHORT 08</span></div>
            <div className="ok-info">
              <span className="mono ok-pri">PROFESSIONAL SPECIALIZATION</span>
              <h2 className="h-md">Advanced UI/UX Design</h2>
              <p className="muted">Master design systems, cognitive usability, high-fidelity prototyping, and micro-interactions.</p>
              <div className="ok-perks mono"><span className="g"><Svg n="verified_user" /> LIFETIME VALIDITY</span><span><Svg n="military_tech" /> VERIFIED CREDENTIAL</span></div>
            </div>
          </div>

          <div className="ok-card">
            <div className="row ok-rh">
              <h3 className="h-md"><Svg n="receipt_long" /> Transaction Receipt</h3>
              <span className={"ok-paid mono" + (pending ? " wait" : "")}>{pending ? "PENDING TRANSFER" : "PAID IN FULL"}</span>
            </div>
            <dl className="ok-meta">
              <div><dt className="mono">ORDER REF</dt><dd className="mono">#{ref}</dd></div>
              <div><dt className="mono">DATE</dt><dd>{date}</dd></div>
              <div><dt className="mono">PAYMENT VIA</dt><dd className="via">{method === "card" && <Svg n="credit_card" />}{via}</dd></div>
              <div><dt className="mono">STATUS</dt><dd className="g">{pending ? "Pending" : "Completed"}</dd></div>
            </dl>
            <div className="ok-rows">
              <div><span>Enrollment Tuition (Tier 1 Global Access)</span><b>{money(PRICE)}</b></div>
              {discount > 0 && <div className="g"><span><Svg n="sell" /> Early Adopter Credit (CODE: {code})</span><b>-{money(discount)}</b></div>}
              <div><span>Tax (10%)</span><b>{money(tax)}</b></div>
              <div><span>Platform Access &amp; Cloud Sandbox Fee</span><b>$0.00 (Waived)</b></div>
              <div className="ok-total">
                <div><b>Total Amount Paid</b><small className="mono muted">Inclusive of all applicable taxes</small></div>
                <strong>{money(total)}</strong>
              </div>
            </div>
          </div>

          <div className="ok-help">
            <span className="ico a"><Svg n="help_center" /></span>
            <div><b>Need help with your order?</b><small className="muted">Our support team replies within a few hours.</small></div>
            <a href="#support">Contact support</a>
          </div>
        </div>

        <div className="ok-col">
          <div className="ok-card">
            <h3 className="h-md ok-intro">Get ready for day one</h3>
            {ONBOARD.map(([title, text, icon], i) => (
              <button key={title} className="ok-step" onClick={() => toggle(i)}>
                <span className={"mk" + (ticked.includes(i) ? " on" : "")}><Svg n={ticked.includes(i) ? "check" : icon} /></span>
                <span className="tx">
                  <span className="row"><b>{title}</b><Svg n="chevron_right" /></span>
                  <small>{text}</small>
                </span>
              </button>
            ))}
            <div className="row ok-ready mono"><span>WORKSPACE READINESS</span><b>{pct}%</b></div>
            <div className="ok-bar"><i style={{ width: pct + "%" }} /></div>
          </div>

          <div className="ok-guar">
            <span className="ico a"><Svg n="verified_user" /></span>
            <div><b>30-Day Money-Back Guarantee</b><p>Not the right fit? Ask for a full refund within 30 days, no questions asked.</p></div>
          </div>

          <div className="ok-card ok-teach">
            <Pic src={SIMG.teacher} alt="Instructor" />
            <div><b>Dr. Elena Miller</b><small className="muted">Your lead instructor</small></div>
          </div>
        </div>
      </div>

      {toast && <div className="ok-toast" role="status"><Svg n="check_circle" /> Invoice downloaded</div>}
    </div>
  );
}

const LESSONS = MODULES.flatMap(([title, items]) => items.map((l) => [l, title]));

function Learn({ go, theme, onToggleTheme }) {
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [done, setDone] = useState([]);
  const [tab, setTab] = useState("overview");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => setTime((t) => (t >= 100 ? 100 : t + 1)), 400);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (time >= 100) setPlaying(false);
  }, [time]);

  const pick = (i) => { setCur(i); setTime(0); setPlaying(false); };
  const finish = () => {
    if (!done.includes(cur)) setDone([...done, cur]);
    if (cur < LESSONS.length - 1) pick(cur + 1);
  };
  const pct = Math.round((done.length / LESSONS.length) * 100);

  return (
    <div className="lp">
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      <header className="lp-top">
        <button className="back" onClick={() => go("dashboard")}><Svg n="arrow_back" /> Dashboard</button>
        <div className="logo sm"><Logo size={28} /></div>
      </header>
      <div className="lp-main">
        <div className="lp-body">
          <div className="lp-video">
            <Pic src={SIMG.poster} alt="Lesson video" />
            <button className="lp-play" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}>
              <Svg n={playing ? "pause" : "play_arrow"} fill />
            </button>
            <div className="lp-ctrl">
              <button aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}><Svg n={playing ? "pause" : "play_arrow"} /></button>
              <div className="bar lp-seek"><i style={{ width: time + "%" }} /></div>
              <Svg n="volume_up" /><Svg n="fullscreen" />
            </div>
          </div>
          <span className="mono muted">{LESSONS[cur][1].toUpperCase()}</span>
          <h1>{LESSONS[cur][0]}</h1>
          <div className="lp-actions">
            <button className="btn primary" onClick={finish}><Svg n="check" /> {cur === LESSONS.length - 1 ? "Mark complete" : "Complete and continue"}</button>
            <button className="btn soft" disabled={cur === 0} onClick={() => pick(cur - 1)}><Svg n="arrow_back" /> Previous</button>
          </div>
          <div className="lp-tabs" role="tablist">
            {[["overview", "Overview"], ["resources", "Resources"], ["notes", "Notes"]].map(([id, label]) => (
              <button key={id} role="tab" aria-selected={tab === id} className={"lp-tab" + (tab === id ? " on" : "")} onClick={() => setTab(id)}>{label}</button>
            ))}
          </div>
          {tab === "overview" && <p className="lead">In this lesson you will work through the core ideas of {LESSONS[cur][0].toLowerCase()} with guided examples and a short practice task.</p>}
          {tab === "resources" && (
            <ul className="lp-res">
              {["Lesson slides (PDF)", "Figma starter file", "Reading list"].map((r) => <li key={r}><Svg n="description" /> {r}</li>)}
            </ul>
          )}
          {tab === "notes" && <textarea className="lp-notes" rows="6" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Write your notes here" />}
        </div>

        <aside className="lp-side card">
          <h2 className="h-md">Course content</h2>
          <div className="row mono muted"><span>PROGRESS</span><span>{pct}%</span></div>
          <div className="bar"><i style={{ width: pct + "%" }} /></div>
          <div className="lp-list">
            {LESSONS.map(([l], i) => (
              <button key={l} className={"lp-link" + (i === cur ? " on" : "")} onClick={() => pick(i)}>
                <Svg n={done.includes(i) ? "check_circle" : "play_circle"} />
                <span>{l}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Certificates() {
  const certs = [
    [SIMG.cert1, "Design Thinking Foundations", "Earned Aug 2026"],
    [SIMG.cert2, "UX Research Methods", "Earned Sep 2026"],
    [SIMG.cert3, "Advanced UI/UX Design", "In progress"],
  ];
  return (
    <div className="wrap">
      <section>
        <h1>Achievements</h1>
        <p className="lead">Certificates and milestones you have collected.</p>
      </section>
      <section className="certs">
        {certs.map(([img, title, note]) => (
          <div className="card cert" key={title}>
            <Pic src={img} alt={title} />
            <h3>{title}</h3>
            <p className="muted">{note}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function StudentSettings({ user, onUpdate, theme, onToggleTheme, go }) {
  const [f, setF] = useState({ name: user.name, email: user.email });
  const [saved, setSaved] = useState(false);
  const submit = (e) => { e.preventDefault(); onUpdate({ name: f.name.trim() || user.name, email: f.email.trim() || user.email }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="wrap">
      <section>
        <h1>Settings</h1>
        <p className="lead">Manage your profile and appearance.</p>
      </section>
      <form className="card set-card" onSubmit={submit}>
        <h2 className="h-md">Profile</h2>
        <div className="pf"><label htmlFor="sn">Full name</label><input id="sn" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
        <div className="pf"><label htmlFor="se">Email</label><input id="se" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
        <div className="row">
          <button className="btn primary" type="submit">Save changes</button>
          {saved && <small className="promo-msg ok" role="status">Saved</small>}
        </div>
      </form>
      <div className="card set-card">
        <h2 className="h-md">Appearance</h2>
        <div className="row">
          <span>{theme === "dark" ? "Dark mode is on" : "Light mode is on"}</span>
          <button className="btn soft" onClick={onToggleTheme}><Svg n={theme === "dark" ? "light_mode" : "dark_mode"} /> Switch</button>
        </div>
      </div>
      <div className="card set-card">
        <h2 className="h-md">Account</h2>
        <button className="btn soft" onClick={() => go("logout")}><Svg n="logout" /> Log out</button>
      </div>
    </div>
  );
}

function StudentApp({ user, onUpdate, onLogout, theme, onToggleTheme }) {
  const [page, setPage] = useState("dashboard");
  const go = (p) => {
    if (p === "logout") onLogout();
    else if (p) setPage(p);
  };

  if (page === "checkout") return <div className="s-app"><ThemeToggle theme={theme} onToggle={onToggleTheme} /><Checkout go={go} /></div>;
  if (page === "learn") return <div className="s-app"><Learn go={go} theme={theme} onToggleTheme={onToggleTheme} /></div>;

  return (
    <div className="s-app">
      <Shell page={page} go={go} name={user.name} theme={theme} onToggleTheme={onToggleTheme}>
        {page === "course" ? <CourseDetails go={go} />
          : page === "certificates" ? <Certificates />
          : page === "settings" ? <StudentSettings user={user} onUpdate={onUpdate} theme={theme} onToggleTheme={onToggleTheme} go={go} />
          : <StudentDashboard name={user.name} go={go} />}
      </Shell>
    </div>
  );
}

const TIMG = {
  instructor: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgzM3Eq3IKnyzih2zkq8y6Z1AYx4WYy_yJwZ_VWQItexGMQJln6CpqtYsNRcJmSRXpV7SFECYt9ss3H3o0JqU89tuIAkAgT38VfRwvjsEHKnohg4oustr4I8vcHzXEhbFt8b_id-Y0-xovUun-TxiHaYILnMflROLY1TNZr_ABo_8As__hSjiK6m3reUeyrEAMGIe-s_RnT6SBIl8Ivb5ops2u8OKjRySCoBiMK94BBciitXnBkAD8",
  uiux: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3wEDW59Ows3W6Y2qdmBGtg469mtSY9ySxX0FT_Otp3j3ANHyjSHLKCpMlOUJ9spDMMWj2cO3wbAMlDhQ1bv-un2nKNpVBzQo910G6N23qxHASRmp7cgKMLvZCXHMxBVqWpLVv74kEZJQQO43OfIeJDpxjxXESBhieya3zWqKe4e3RHrq47tIsIQxrBp-hIdRbGZ4cHEkWO1YS06RYpMT3MDWFK1BhNm-yevGZ0ScxUy3occATmy6N",
  dataScience: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmpNMcVFI8NkVsxjstJ0LpEumf0nsbu8cq6_tFSugmZiqKgBfrHBCkavDt74QT4q_9agEpHLiWjggIhqak0XXqYxhqSbtwl_fueeBFvXlYvv3DScH80bW6xUrBpSMv_rb64zi1kDZNeJR-IxYy7e7vhwg84iy6mGpk2jG-E0AWO07_gra1ELskDZufCvhrK80FkhSQ2oqqqxwm7ybX4NTaFfG8OYNddy_VON9J6nP1laaPE1FPQSIC",
  meAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_cNtcgh5FhfioWt_mNcZuFqVCJtgT7d4OQPp-lqhqQMjN852_3MgZ7svzoKHrF2PG3mYkMxJHnV8ganHu8Ja8T6kHhuB_LoNPoY51DgMFEVxnVbNC_xhsSKhuXY32oxJPzuGp-bRKtzTLvLiJw-Dk6P6_LB2Hu24O1-CXL6O3X4iy08XYFwrc8m9KK0GsIwMOHM1WSQCHWguEC72eSuG7-GVJxSmlQDFFEIEUF2q4cKvyYvCtBsrq",
  thorneList: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEJmeFkRQU2Bh1vrN46_H0ZicZ9fxceWU8MUyJHNmpoKnM_DfcQD8YiVljCz3K3e7nMA1v704ld1S6KM0bO77btAtvZP9NEqea06AlsAQ0DYRb719PQom0wbAqE4lV-Qn9Ozl2rAUDf8ecHdSiFugcPVrGUdpi0iuC0uGbC5nJ5q7s-TjVLX5sxkMHLC6GpdwgWsisuuK6xfm-nhEEhifOqVc0g8E9zuVoqdG1Vsn5_q424ITo0I_R",
  elenaList: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXtvM5ODZeZbY3H5cWMpjCNkoW3gjjJwiHHWIce7I6LmsMiBELjIRtdV2prMpYwZr7vUkPdFLhFtxgagH8UCigCYI8ZNWihzcXcO24K_oNhcuQf7OeDZd1bYJUqeksNSsTUs7GvLw9CEqc6BgD5QS27Ds8N2O940im7zJCJHpCROjHxPGUSpXQL-l-q1dgAiyNPMAGIiVFGfJLGAYFKM-AV9tsCKnH-Wt5EOptF-j5pCqc9w2eWJFa",
  groupList: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO4hzZ6T-v4RFmLouNpfHRFSfppLNFsat9NhFjc5TqWrfitb2tOTKtvkoRtF55tZjdG56791gGgWCJy8VokNNxxX9Tpe66NlDzWF45m969gKqgo8sqfLwxUGpbdYffIXWcX2rlhm5b64xZ6EmNTQ4IPpcPTPsa75tXFcrnmn_DtVrFFwLDw1atwgP4BkRCEfJWJr6Ux1DeobqWyicK7OYJuMK3gdFk7QaIPY_2azK-N7cpgGi60xdO",
  thorneHeader: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg6qFVSxjPp_Ly2wOWY4VUDjmzZyaBlrgmzyVW9yDgH2baxHzNXt3rcTrVQ2uyhHM5VQO3io75vi4oVGZqBndDmw2xUab6Oc2j18oDJMFp0OuLaSXn-l_gBso22l-pHOSQIQ7d9qo4DP6zVAIAgx47Z7Zm6YwSbKffScECxvd072lvcp9cHk_sXyp39pOt8-NxJr2iEyuQBFUrkamC0p5tM1u0L-jhggCSxZd1jhvCnG3mVC8BoNcs",
  thorneMsgA: "https://lh3.googleusercontent.com/aida-public/AB6AXuAthBlsy3avEciTAswRMUBjaHzZ2jLTLjd4LQs8apunKtgvNwSyPDtchA6USd4WZ9PePWl90-mSIMpcko6OlZvyu0A84h_2IjpZV2awnyfey5stA8ZH645OkVuJj0wzhY2oyFkblR4sd7OCT7pO1Zp7u0kOoA30MhazwfRQ98J8jp9XJ1IXFDY7ovY6JJr5jDn9SaKF1XJMrcL-yGewlfr62hKWzQLerd63-qPPUgiiN3eN0_G1Tx84",
  thorneMsgB: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyiCrhrzEH7qOsTM4xvznQs8k3ku5pdXOmWfRelbbLdpKNwgDRRvEUvImDvDd7oaEgTrn6K9kzEKUE9fcuNgMQSeCp3Xbo4UWaE70H4Hj930WAipMLsmJ4XLSathPARnh5iVkjG00hz_lp0bit69cbn6iVSRtl-6bgBiuXVv5ra6SDpYc18PTUFcF1yMNEn2gXld7oB6gQkrXf2Tvadx6k2YjFuR5SQO9iaMte_7-XZULSPoFAL2SL",
  forumMobileAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCypKWa70drEDbuVH81jOd83eavwziZgnxg2-nuIS9LeaMRPPAWcpUW-uL7muNJ_Me-v8Rq_kTSSmos8xtx-uzoumsCn91pVpEuy0JXNSWW81UdRL_R3mDpP4i3pnmlU0auAnkdb6VOaC3BI80nFW-TuO8-nZcfWyWRHs6mkRiNZZG8SfyMOFOXv8d_nDP_LhM-SR9rmll2tgIJN8zuJNOCGVCD91-OMk1AUkAEoOIYn85FDb54keh_",
  studentSidebar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwQe_-nkX6IcewjjTq7eDCd5IwWevp70jmZnGBM72tj6H1P81I6CFCbxD14qRBNDWn-Go_AF2j2wtTafzaZwKA8S2Zq5p9fEqLwUtMYUf40sbBu_2JfpFg4SbFTvuIpPFFOjp8cjZ2k8pH7xCf2R1GfHyNybxiNdsZYFVHQE5-YNl-nmcnFYitwBck9QIuFy7Rin8nSOdz_ZqtECIJIkGjwm64QyiHzIG2Nun6j7SYnV_XU3pWhLOD",
  sarah: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMJxqGgbhhGeS1GXYexJcoqPVIbNHaioL-H-5t2Yk4XgVZpfn6olLrS2Ky6iXN8rvgQBkXbR2YIcjymreVo0zNHHjLar5HDnBi7WND0QRy7uEmFEpk9toDG0CvgeqyiYmOfyMAvsmiYZXfYxHadNUzOL_sEZxezEHJJUMlB0EAN2U7T7oDP9PGlJNVHpx2MuV_xMhvpQAwc1Vxn6wabc1dy3kgWKUJBii-3GLXsTsJEuIAzqM7JzJi",
  alex: "https://lh3.googleusercontent.com/aida-public/AB6AXuDncf7-QM1F3bfTA1cnSVIpdWwuNC-QPUe0AkCjOp6YHeBEtkDqHU9kx_Z2-uNVK2azrJxP1RW1djRw6wLsb8rJEfRzNAGom4LRpzn6yuKs92VR1sNTa6_FiFjgm88RtRJ5mM2sog_aKq51bIYlJDDmZOuxlpRMsuYuz6ME6VPFHnY3XE3Sf65I49iBMVixnSWqdj5--60qaILSJ3UXqIlAoJWshU_08NeLzOHzd9_d_lv8tsJ3emt6",
  helpProfile: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJKqbCcKjg_YUAtbeBSLC_lqaWlpfEJheZ3XNjxWGhucwZdt4-ObhVlGlRkyB0nCwSfnUCZ6-bN1LMIqXRkGmZHY7evl6eaqVsdaZgCa_DkdEKDScEEfnWfL2UTNy6Qe_TRbhQhMqMukJ-FEwh8HWi4J3VW8Wj-w-ZXbMc6KPXLAtY6c-0mmGFMOiNwYlSdTUX_V_WD_3Gj-nRs7-o_VSiaam5Lb4TG6WUeuq3_wKY6zLr_hikLNZD",
};

const T_NAV = [
  { key: "dashboard", icon: "dashboard", label: "Dashboard", page: "dashboard" },
  { key: "courses", icon: "school", label: "Courses", page: "courses" },
  { key: "messages", icon: "chat", label: "Messages", page: "messages" },
  { key: "community", icon: "groups", label: "Community", page: "forum" },
  { key: "help", icon: "help", label: "Help Center", page: "help" },
  { key: "settings", icon: "settings", label: "Settings", page: "settings" },
];

const Icon = ({ name, fill, className = "" }) => (
  <span className={`material-symbols-outlined ${fill ? "fill" : ""} ${className}`}>{name}</span>
);

const Toggle = ({ on, onChange }) => (
  <button role="switch" aria-checked={on} className={`switch ${on ? "on" : ""}`} onClick={() => onChange(!on)} />
);

function TeacherSidebar({ variant, avatar, subtitle, items, active, onNav, cta, onlyLarge }) {
  return (
    <nav className={`sidebar ${variant === "dashboard" ? "bordered" : ""} ${onlyLarge ? "lg-only" : ""}`}>
      <div className={`sidebar-brand ${variant === "dashboard" ? "center" : ""} ${!avatar ? "plain" : ""}`}>
        {avatar && (
          <div className={variant === "dashboard" ? "avatar-lg" : "avatar-md"}>
            <img src={avatar} alt="User avatar" />
          </div>
        )}
        <h1 className="brand-title brandmark"><LogoMark size={30} /><span>Lumina Learning</span></h1>
        <p className={`brand-sub ${variant === "dashboard" ? "" : "sm"}`}>{subtitle}</p>
      </div>
      <div className="nav">
        {items.map((it) => (
          <a
            key={it.key}
            href="#"
            className={`nav-link ${active === it.key ? "active" : ""} ${onlyLarge ? "hover-bg" : ""}`}
            onClick={(e) => { e.preventDefault(); onNav && onNav(it.page); }}
          >
            <Icon name={it.icon} fill={active === it.key && variant !== "messages"} />
            <span>{it.label}</span>
          </a>
        ))}
        <a href="#" className="nav-link hover-bg" onClick={(e) => { e.preventDefault(); onNav && onNav("logout"); }}>
          <Icon name="logout" />
          <span>Log out</span>
        </a>
      </div>
      <div className="sidebar-cta">
        <button className="btn-primary full">{cta}</button>
      </div>
    </nav>
  );
}

const T_STATS = [
  { icon: "group", label: "Total Students", value: "2,451", trend: "+12%", bg: "var(--tertiary-container)", fg: "var(--on-tertiary)" },
  { icon: "local_library", label: "Active Courses", value: "8", bg: "var(--primary-container)", fg: "#fffbff" },
  { icon: "payments", label: "Total Revenue", value: "$14,200", trend: "+5%", bg: "var(--surface-variant)", fg: "var(--on-surface)" },
  { icon: "star", label: "Average Rating", value: "4.8 / 5.0", bg: "var(--tertiary)", fg: "var(--on-tertiary)" },
];
const T_COURSES = [
  { title: "Advanced UI/UX Design", meta: "1,240 Students • Last updated 2 days ago", pct: 75, img: TIMG.uiux },
  { title: "Data Science Fundamentals", meta: "850 Students • Last updated 1 week ago", pct: 45, img: TIMG.dataScience, alt: true },
];
const SUBMISSIONS = [
  { i: "JD", name: "John Doe", task: "Module 3: Wireframing Assignment", when: "Submitted 2 hours ago", bg: "var(--tertiary-fixed)", fg: "var(--on-tertiary-fixed)" },
  { i: "AS", name: "Alice Smith", task: "Final Project Proposal", when: "Submitted 5 hours ago", bg: "var(--primary-fixed)", fg: "var(--on-primary-fixed)" },
  { i: "MJ", name: "Michael Johnson", task: "Module 1 Quiz Review", when: "Submitted 1 day ago", bg: "var(--surface-dim)", fg: "var(--on-surface)" },
];

function TeacherDashboard({ onNav, user }) {
  return (
    <>
      <TeacherSidebar variant="dashboard" avatar={TIMG.instructor} subtitle="Instructor Dashboard" active="dashboard" onNav={onNav} cta="Create Course" items={T_NAV} />
      <main className="main">
        <header className="page-header">
          <div>
            <h2 className="display">Welcome back, {user.name}.</h2>
            <p className="body-lg">Here's an overview of your teaching performance today.</p>
          </div>
          <div className="header-actions">
            <button className="btn-outline">Post Announcement</button>
            <button className="btn-primary" onClick={() => onNav("courses")}>Create New Course</button>
          </div>
        </header>
        <div className="stats">
          {T_STATS.map((s) => (
            <div key={s.label} className="glass-card stat-card">
              <div className="stat-top">
                <div className="stat-icon" style={{ background: s.bg, color: s.fg }}><Icon name={s.icon} /></div>
                {s.trend && <span className="trend"><Icon name="trending_up" className="sm" /> {s.trend}</span>}
              </div>
              <div>
                <p className="label-caps stat-label">{s.label}</p>
                <p className="headline stat-value">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="dash-grid">
          <div>
            <div className="section-head">
              <h3 className="headline">Active Courses</h3>
              <a href="#" className="link">View All</a>
            </div>
            <div className="stack">
              {T_COURSES.map((c) => (
                <div key={c.title} className={`glass-card course ${c.alt ? "alt" : ""}`}>
                  <div className="course-thumb"><img src={c.img} alt="Course Thumbnail" /></div>
                  <div className="course-body">
                    <h4>{c.title}</h4>
                    <p className="muted small">{c.meta}</p>
                    <div className="progress"><div style={{ width: `${c.pct}%` }} /></div>
                    <p className="label-caps muted xs">{c.pct}% Avg Completion</p>
                  </div>
                  <div className="course-actions">
                    <button className="btn-soft">Manage</button>
                    <button className="btn-line">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="section-head">
              <h3 className="headline">Pending Grading</h3>
              <span className="label-caps badge-error xs">12 Tasks</span>
            </div>
            <div className="glass-card grading">
              {SUBMISSIONS.map((s) => (
                <div key={s.name} className="sub">
                  <div className="initials" style={{ background: s.bg, color: s.fg }}>{s.i}</div>
                  <div className="sub-body">
                    <p className="sub-name">{s.name}</p>
                    <p className="muted small">{s.task}</p>
                    <p className="outline-text xs">{s.when}</p>
                  </div>
                  <button className="chev"><Icon name="chevron_right" /></button>
                </div>
              ))}
            </div>
            <button className="btn-line block">View All Submissions</button>
          </div>
        </div>
      </main>
    </>
  );
}

const CHATS = [
  { name: "Dr. Aris Thorne", time: "10:42 AM", text: "Excellent progress on the final module. Let's discuss the project scope tomorrow.", img: TIMG.thorneList, active: true, online: true },
  { name: "Elena Rostova", time: "Yesterday", text: "Thanks for sharing those resources!", img: TIMG.elenaList },
  { name: "Study Group Alpha", time: "Mon", text: "Marcus: I'll compile the notes tonight.", img: TIMG.groupList },
];
const THREAD = [
  { from: "them", text: "Hello! I reviewed your submission for Module 4. Really solid work on the theoretical analysis.", time: "10:30 AM", img: TIMG.thorneMsgA },
  { from: "me", text: "Thank you, Dr. Thorne! I struggled a bit with the final theorem, but the reading materials helped clarify it.", time: "10:35 AM" },
  { from: "them", text: "Excellent progress on the final module. Let's discuss the project scope tomorrow.", time: "10:42 AM", img: TIMG.thorneMsgB },
];

function Messages({ onNav }) {
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState(THREAD);
  const send = () => {
    if (!draft.trim()) return;
    setMsgs([...msgs, { from: "me", text: draft, time: "Now" }]);
    setDraft("");
  };
  return (
    <div className="msg-app">
      <TeacherSidebar onlyLarge subtitle="Pro Scholar" active="messages" onNav={onNav} cta="Upgrade to Pro" items={T_NAV} />
      <div className="msg-wrap">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-brand"><Logo size={30} /></div>
            <div className="topbar-links">
              <a href="#">Explore</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNav("forum"); }}>Community</a>
            </div>
          </div>
          <div className="topbar-right">
            <div className="search-pill"><Icon name="search" /><input type="text" placeholder="Search..." /></div>
            <button className="icon-btn"><Icon name="notifications" /></button>
            <button className="icon-btn"><Icon name="account_circle" /></button>
            <img className="avatar-sm" src={TIMG.meAvatar} alt="User profile" />
          </div>
        </header>
        <main className="msg-main">
          <aside className="inbox">
            <div className="inbox-head">
              <h2 className="headline">Messages</h2>
              <div className="search-box"><Icon name="search" className="md" /><input type="text" placeholder="Search conversations..." /></div>
            </div>
            <div className="inbox-list">
              {CHATS.map((c) => (
                <div key={c.name} className={`chat-item ${c.active ? "active" : ""}`}>
                  <div className="presence"><img className="pic" src={c.img} alt={c.name} />{c.online && <i />}</div>
                  <div className="chat-info">
                    <div className="chat-row"><h3>{c.name}</h3><span className="label-caps muted xs">{c.time}</span></div>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <section className="chat">
            <div className="chat-head">
              <div className="who">
                <img src={TIMG.thorneHeader} alt="Dr. Aris Thorne" />
                <div><h2>Dr. Aris Thorne</h2><p className="muted small">Senior Mentor • Active Now</p></div>
              </div>
              <div className="actions">
                <button className="icon-btn"><Icon name="call" /></button>
                <button className="icon-btn"><Icon name="videocam" /></button>
                <button className="icon-btn"><Icon name="more_vert" /></button>
              </div>
            </div>
            <div className="history">
              <div className="divider"><span className="label-caps xs">Today</span></div>
              {msgs.map((m, i) => (
                <div key={i} className={`bubble-row ${m.from === "me" ? "sent" : ""}`}>
                  {m.from === "them" && <img src={m.img} alt="Dr. Aris Thorne" />}
                  <div className="bubble-col">
                    <div className={`bubble ${m.from === "me" ? "out" : "in"}`}><p>{m.text}</p></div>
                    <span className="time">{m.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="composer">
              <div className="composer-box">
                <button className="icon-btn outline"><Icon name="attach_file" /></button>
                <input type="text" placeholder="Type a message..." value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
                <button className="icon-btn outline"><Icon name="mood" /></button>
                <button className="send" onClick={send}><Icon name="send" className="md" /></button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const CATS = [
  { name: "General", count: 24 },
  { name: "UI Design", count: 18 },
  { name: "Coding", count: 42 },
  { name: "Career Advice", count: 9 },
];
const THREADS = [
  { avatar: TIMG.sarah, tags: [["blue", "UI DESIGN"], ["green", "FEEDBACK"]], title: "Best practices for accessible color contrast in dashboard design?", author: "Sarah J.", when: "2 hours ago", replies: 12, last: "15m ago" },
  { avatar: TIMG.alex, tags: [["indigo", "CODING"], ["grey", "REACT"]], title: "Struggling with useEffect dependencies causing infinite loops. Help!", author: "Alex M.", when: "5 hours ago", replies: 34, last: "2m ago" },
  { letter: "K", faded: true, tags: [["dim", "GENERAL"]], title: "Introduce yourself! Weekly networking thread.", author: "System", when: "Yesterday", replies: 128, last: "1h ago" },
];

function Forum({ onNav }) {
  const [cat, setCat] = useState("General");
  return (
    <>
      <header className="mobile-bar">
        <span className="brand"><Logo size={30} /></span>
        <div className="right">
          <button className="icon-btn"><Icon name="notifications" /></button>
          <img className="avatar-sm" style={{ border: "none" }} src={TIMG.forumMobileAvatar} alt="User profile photo" />
        </div>
      </header>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <TeacherSidebar variant="forum" avatar={TIMG.studentSidebar} subtitle="Active Student" active="community" onNav={onNav} cta="Upgrade to Pro" items={T_NAV} />
        <main className="forum-main">
          <div className="forum-inner">
            <div className="forum-head">
              <div>
                <h2 className="display">Community Forum</h2>
                <p className="body-lg">Connect, share, and learn with peers.</p>
              </div>
              <button className="btn-pill"><Icon name="add" /> New Topic</button>
            </div>
            <div className="forum-grid">
              <aside>
                <div className="panel">
                  <h3 className="headline">Categories</h3>
                  <ul className="cats">
                    {CATS.map((c) => (
                      <li key={c.name}>
                        <a href="#" className={`cat ${cat === c.name ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setCat(c.name); }}>
                          <span>{c.name}</span><span className="count">{c.count}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
              <section className="threads">
                <div className="sort"><button><Icon name="sort" className="sm" /> Latest</button></div>
                {THREADS.map((t) => (
                  <article key={t.title} className={`thread ${t.faded ? "faded" : ""}`}>
                    <div className="thread-avatar">{t.avatar ? <img src={t.avatar} alt={t.author} /> : <div className="letter">{t.letter}</div>}</div>
                    <div className="thread-body">
                      <div className="tags">{t.tags.map(([color, label]) => (<span key={label} className={`tag label-caps ${color}`}>{label}</span>))}</div>
                      <h4>{t.title}</h4>
                      <div className="meta">
                        <span className="mobile-only">{t.author}</span>
                        <span className="desktop-only">Started by {t.author}</span>
                        <span>•</span><span>{t.when}</span>
                      </div>
                    </div>
                    <div className="thread-stats">
                      <div className="replies"><b>{t.replies}</b><span className="upper">Replies</span></div>
                      <div className="last"><span className="upper">Last Active</span><span className="when"><Icon name="schedule" className="md" /> {t.last}</span></div>
                    </div>
                  </article>
                ))}
                <div className="load-more"><button>Load More Topics</button></div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

const LESSON_TYPES = {
  video: { icon: "play_circle", label: "Video" },
  text: { icon: "article", label: "Text" },
  quiz: { icon: "quiz", label: "Quiz" },
};
const CC_STEPS = [
  ["Basic Info", "Title, description, category"],
  ["Curriculum Mapping", "Modules, lessons, and quizzes"],
  ["Pricing & Promo", "Set cost and preview video"],
  ["Publish", "Final review and launch"],
];
let uid = 100;

function CourseCreate({ onNav }) {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ title: "Introduction to Advanced AI Models", desc: "", cat: "Data Science" });
  const [price, setPrice] = useState("49");
  const [modules, setModules] = useState([
    { id: 1, title: "Foundations of Neural Networks", open: true, lessons: [
      { id: 11, type: "video", title: "What is Deep Learning?" },
      { id: 12, type: "text", title: "History of Perceptrons" },
      { id: 13, type: "quiz", title: "Knowledge Check: Basic Concepts" },
    ] },
    { id: 2, title: "Advanced Architectures", open: true, lessons: [] },
  ]);
  const upd = (id, fn) => setModules(modules.map((m) => (m.id === id ? fn(m) : m)));
  const addModule = () => setModules([...modules, { id: ++uid, title: "New Module", open: true, lessons: [] }]);
  const addLesson = (id, type = "video") => upd(id, (m) => ({ ...m, lessons: [...m.lessons, { id: ++uid, type, title: "New " + LESSON_TYPES[type].label + " Lesson" }] }));
  const setLesson = (mid, lid, title) => upd(mid, (m) => ({ ...m, lessons: m.lessons.map((l) => (l.id === lid ? { ...l, title } : l)) }));
  const delLesson = (mid, lid) => upd(mid, (m) => ({ ...m, lessons: m.lessons.filter((l) => l.id !== lid) }));
  const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <>
      <header className="cc-top">
        <div className="l">
          <button className="icon-btn" onClick={() => onNav("dashboard")}><Icon name="close" /></button>
          <div><h1>Course Creation</h1><p className="muted small">{info.title}</p></div>
        </div>
        <div className="r">
          <button className="btn-outline">Save Draft</button>
          <button className="btn-primary">Preview</button>
        </div>
      </header>
      <div className="cc-body">
        <aside className="cc-steps">
          <h2 className="label-caps muted" style={{ marginBottom: 24 }}>CREATION STEPS</h2>
          {CC_STEPS.map(([t, s], i) => (
            <button key={t} className={`cc-step ${step === i + 1 ? "active" : ""}`} onClick={() => setStep(i + 1)}>
              <div className={`cc-dot ${step > i + 1 ? "done" : ""}`}>{step > i + 1 ? <Icon name="check" className="md" fill /> : i + 1}</div>
              <div><h3>{t}</h3><p className="muted small">{s}</p></div>
            </button>
          ))}
        </aside>

        <main className="cc-main">
          {step === 1 && (
            <>
              <h2 className="display" style={{ marginBottom: 32 }}>Basic Info</h2>
              <div className="field"><label>Course Title</label><input value={info.title} onChange={(e) => setInfo({ ...info, title: e.target.value })} /></div>
              <div className="field"><label>Description</label><textarea rows="4" value={info.desc} onChange={(e) => setInfo({ ...info, desc: e.target.value })} placeholder="What will students learn?" /></div>
              <div className="field"><label>Category</label>
                <select value={info.cat} onChange={(e) => setInfo({ ...info, cat: e.target.value })}>
                  {["Data Science", "UI Design", "Coding", "Career"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="cc-head">
                <div>
                  <h2 className="display">Build your Curriculum</h2>
                  <p className="body-lg">Organize your content into modules and lessons.</p>
                </div>
                <button className="btn-primary" onClick={addModule} style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="add" /> Add Module</button>
              </div>
              {modules.map((m, mi) => (
                <div key={m.id} className="cc-module">
                  <div className="cc-mhead">
                    <Icon name="drag_indicator" className="muted" />
                    <div className="t">
                      <span className="label-caps tag indigo">MODULE {mi + 1}</span>
                      <input value={m.title} onChange={(e) => upd(m.id, (x) => ({ ...x, title: e.target.value }))} />
                    </div>
                    <button className="icon-btn" onClick={() => upd(m.id, (x) => ({ ...x, open: !x.open }))}><Icon name={m.open ? "expand_less" : "expand_more"} /></button>
                    <button className="icon-btn" onClick={() => setModules(modules.filter((x) => x.id !== m.id))}><Icon name="delete" /></button>
                  </div>
                  {m.open && (
                    <div className="cc-lessons">
                      {m.lessons.length === 0 && <div className="cc-empty">No lessons added yet.</div>}
                      {m.lessons.map((l) => (
                        <div key={l.id} className="cc-lesson">
                          <div className="cc-ico"><Icon name={LESSON_TYPES[l.type].icon} fill /></div>
                          <div className="grow">
                            <input value={l.title} onChange={(e) => setLesson(m.id, l.id, e.target.value)} />
                            <p className="muted small">{LESSON_TYPES[l.type].label}</p>
                          </div>
                          <button className="icon-btn" onClick={() => delLesson(m.id, l.id)}><Icon name="delete" className="md" /></button>
                        </div>
                      ))}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {Object.keys(LESSON_TYPES).map((t) => (
                          <button key={t} className="cc-add" style={{ flex: 1 }} onClick={() => addLesson(m.id, t)}>
                            <Icon name="add" className="md" /> {LESSON_TYPES[t].label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="display" style={{ marginBottom: 32 }}>Pricing &amp; Promo</h2>
              <div className="field"><label>Price (USD)</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
              <div className="field"><label>Preview video link</label><input placeholder="https://..." /></div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="display" style={{ marginBottom: 32 }}>Publish</h2>
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 className="headline">{info.title}</h3>
                <p className="muted" style={{ margin: "8px 0" }}>{info.cat} • {modules.length} modules • {lessonCount} lessons • ${price || 0}</p>
                <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => onNav("dashboard")}>Publish Course</button>
              </div>
            </>
          )}
        </main>
      </div>
      <div className="cc-bottom">
        <button className="btn-line" disabled={step === 1} onClick={() => setStep(step - 1)}>Back</button>
        {step < 4 && <button className="btn-primary" onClick={() => setStep(step + 1)}>Continue to {CC_STEPS[step][0]}</button>}
      </div>
    </>
  );
}

const ST_TABS = [
  ["profile", "person", "Profile Settings"],
  ["security", "lock", "Security"],
  ["notifications", "notifications_active", "Notifications"],
  ["billing", "credit_card", "Billing"],
  ["appearance", "palette", "Appearance"],
];

function TeacherSettings({ onNav, theme, setTheme, user }) {
  const [tab, setTab] = useState("profile");
  const parts = user.name.split(" ");
  const [p, setP] = useState({ first: parts[0] || "", last: parts.slice(1).join(" "), email: user.email, bio: "Lifelong learner focused on cognitive science and digital design." });
  const [pw, setPw] = useState({ cur: "", next: "", conf: "" });
  const [msg, setMsg] = useState("");
  const [twoFA, setTwoFA] = useState(true);
  const [notif, setNotif] = useState({ email: true, push: true, replies: false, news: false, grades: true });
  const savePw = () => setMsg(!pw.next || pw.next !== pw.conf ? "Passwords do not match." : "Password updated.");
  const notifRows = [
    ["email", "Email notifications", "Course updates sent to your inbox"],
    ["push", "Push notifications", "Alerts on your device"],
    ["replies", "Forum replies", "When someone replies to your topics"],
    ["grades", "Grades & feedback", "When an instructor grades your work"],
    ["news", "Product news", "Tips and new features"],
  ];

  return (
    <>
      <TeacherSidebar variant="forum" avatar={TIMG.meAvatar} subtitle="Pro Scholar" active="settings" onNav={onNav} cta="Upgrade to Pro" items={T_NAV} />
      <main className="main">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="display">Settings</h2>
          <p className="body-lg" style={{ marginBottom: 32 }}>Manage your account preferences and security.</p>
          <div className="st-grid">
            <div className="st-tabs">
              {ST_TABS.map(([k, ic, l]) => (
                <button key={k} className={`st-tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}><Icon name={ic} /> {l}</button>
              ))}
            </div>

            <div className="st-card">
              {tab === "profile" && (
                <>
                  <h3 className="headline">Profile Information</h3>
                  <div className="st-avatar">
                    <img src={TIMG.meAvatar} alt="Profile" />
                    <div><button className="btn-line" style={{ marginBottom: 8 }}>Change Avatar</button><p className="label-caps muted xs">JPG, GIF or PNG. Max size 800K</p></div>
                  </div>
                  <div className="two">
                    <div className="field"><label>First Name</label><input value={p.first} onChange={(e) => setP({ ...p, first: e.target.value })} /></div>
                    <div className="field"><label>Last Name</label><input value={p.last} onChange={(e) => setP({ ...p, last: e.target.value })} /></div>
                  </div>
                  <div className="field"><label>Email Address</label><input type="email" value={p.email} onChange={(e) => setP({ ...p, email: e.target.value })} /></div>
                  <div className="field"><label>Short Bio</label><textarea rows="3" value={p.bio} onChange={(e) => setP({ ...p, bio: e.target.value })} /></div>
                  <div className="st-actions"><button className="btn-line">Cancel</button><button className="btn-primary">Save Changes</button></div>
                </>
              )}

              {tab === "security" && (
                <>
                  <h3 className="headline">Security</h3>
                  <div className="field"><label>Current Password</label><input type="password" value={pw.cur} onChange={(e) => setPw({ ...pw, cur: e.target.value })} /></div>
                  <div className="two">
                    <div className="field"><label>New Password</label><input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} /></div>
                    <div className="field"><label>Confirm Password</label><input type="password" value={pw.conf} onChange={(e) => setPw({ ...pw, conf: e.target.value })} /></div>
                  </div>
                  {msg && <p className="small" style={{ color: msg.startsWith("Password updated") ? "var(--secondary)" : "var(--error)" }}>{msg}</p>}
                  <div className="st-actions"><button className="btn-primary" onClick={savePw}>Update Password</button></div>
                  <div className="st-row" style={{ marginTop: 24 }}>
                    <div><b>Two-factor authentication</b><p className="muted small">Add an extra layer of security to your account</p></div>
                    <Toggle on={twoFA} onChange={setTwoFA} />
                  </div>
                  <h4 className="headline" style={{ margin: "24px 0 8px", fontSize: 18 }}>Active Sessions</h4>
                  {[["Chrome on Windows", "Cairo • Current session"], ["Safari on iPhone", "Cairo • 2 days ago"]].map(([d, w], i) => (
                    <div key={d} className="st-row">
                      <div><b>{d}</b><p className="muted small">{w}</p></div>
                      {i > 0 && <button className="link">Sign out</button>}
                    </div>
                  ))}
                </>
              )}

              {tab === "notifications" && (
                <>
                  <h3 className="headline">Notifications</h3>
                  {notifRows.map(([k, t, d]) => (
                    <div key={k} className="st-row">
                      <div><b>{t}</b><p className="muted small">{d}</p></div>
                      <Toggle on={notif[k]} onChange={(v) => setNotif({ ...notif, [k]: v })} />
                    </div>
                  ))}
                </>
              )}

              {tab === "billing" && (
                <>
                  <h3 className="headline">Billing</h3>
                  <div className="plan">
                    <div><p className="label-caps">CURRENT PLAN</p><p className="headline">Pro Scholar • $19/mo</p><p className="small">Renews on Oct 30, 2026</p></div>
                    <button>Manage Plan</button>
                  </div>
                  <div className="st-row">
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}><Icon name="credit_card" /><div><b>Visa ending in 4242</b><p className="muted small">Expires 08/28</p></div></div>
                    <button className="link">Update</button>
                  </div>
                  <h4 className="headline" style={{ margin: "24px 0 8px", fontSize: 18 }}>Invoices</h4>
                  <div style={{ overflowX: "auto" }}>
                    <table className="inv">
                      <thead><tr><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
                      <tbody>
                        {[["Sep 30, 2026", "$19.00"], ["Aug 30, 2026", "$19.00"], ["Jul 30, 2026", "$19.00"]].map(([d, a]) => (
                          <tr key={d}><td>{d}</td><td>{a}</td><td><span className="pill-ok">Paid</span></td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {tab === "appearance" && (
                <>
                  <h3 className="headline">Appearance</h3>
                  <div className="theme-opts">
                    {[["light", "Light", "#faf8ff"], ["dark", "Dark", "#131b2e"]].map(([k, l, c]) => (
                      <button key={k} className={`theme-opt ${theme === k ? "active" : ""}`} onClick={() => setTheme(k)}>
                        <div className="theme-prev" style={{ background: c }} />
                        <b>{l}</b>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const HELP_CATS = [
  { icon: "account_circle", fill: true, title: "Account & Billing", text: "Manage your profile, subscription plans, payment methods, and invoices.", bg: "var(--primary)", fg: "var(--on-primary)", tint: "rgba(70,72,212,.05)" },
  { icon: "key", fill: true, title: "Course Access", text: "Troubleshoot login issues, access course materials, and track your progress.", bg: "var(--tertiary)", fg: "var(--on-tertiary)", tint: "rgba(0,88,190,.05)" },
  { icon: "devices", fill: true, title: "Technical Support", text: "Fix video playback issues, browser compatibility, and app glitches.", bg: "#006e2f", fg: "#ffffff", tint: "rgba(0,110,47,.05)" },
  { icon: "workspace_premium", title: "Certificates & Credits", text: "Learn how to claim, download, and verify your course completion certificates.", bg: "var(--surface-variant)", fg: "var(--on-surface)", tint: "rgba(118,117,134,.05)" },
];
const HELP_ARTICLES = [
  "How do I reset my password?",
  "Where can I find my course certificates?",
  "Updating your billing information",
  "Video playback troubleshooting guide",
];
const HELP_SIDE = [
  ["dashboard", "Dashboard", "dashboard"],
  ["school", "Courses", "courses"],
  ["local_library", "Library", null],
  ["emoji_events", "Achievements", null],
  ["settings", "Settings", "settings"],
];

function HelpDesktop({ onNav }) {
  const [q, setQ] = useState("");
  const articles = HELP_ARTICLES.filter((a) => a.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <>
      <header className="hd-top">
        <div className="hd-top-in">
          <div className="hd-left">
            <a href="#" className="hd-logo" onClick={(e) => { e.preventDefault(); onNav("dashboard"); }}>
              <Logo size={34} />
            </a>
            <div className="hd-search">
              <Icon name="search" />
              <input type="text" placeholder="Search knowledge base..." value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
          </div>
          <div className="hd-right">
            <button className="icon-btn"><Icon name="notifications" /></button>
            <button className="icon-btn on"><Icon name="help" fill /></button>
            <div className="hd-me"><img src={TIMG.helpProfile} alt="User profile photo" /></div>
          </div>
        </div>
      </header>

      <div className="hd-main">
        <aside className="hd-side glass-panel">
          <nav>
            {HELP_SIDE.map(([ic, label, page]) => (
              <a key={label} href="#" className="nav-link hover-bg" onClick={(e) => { e.preventDefault(); page && onNav(page); }}>
                <Icon name={ic} /> {label}
              </a>
            ))}
            <a href="#" className="nav-link hover-bg" onClick={(e) => { e.preventDefault(); onNav("logout"); }}>
              <Icon name="logout" /> Log out
            </a>
          </nav>
          <div className="hd-live">
            <div>
              <h4>Need Live Help?</h4>
              <p>Our support team is online 24/7.</p>
              <button>Contact Support</button>
            </div>
          </div>
        </aside>

        <section className="hd-content">
          <div className="hd-hero">
            <h1 className="display">How can we help you today?</h1>
            <p className="body-lg">Search our knowledge base or browse categories below to find answers to your questions.</p>
            <div className="hd-hero-search">
              <Icon name="search" />
              <input type="text" placeholder="e.g., How to reset my password..." value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
          </div>

          <div className="hd-cats">
            {HELP_CATS.map((c) => (
              <a key={c.title} href="#" className="hd-cat" style={{ "--tint": c.tint }} onClick={(e) => e.preventDefault()}>
                <div className="hd-cat-ico" style={{ background: c.bg, color: c.fg }}><Icon name={c.icon} fill={c.fill} /></div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </a>
            ))}
          </div>

          <div>
            <h2 className="headline hd-art-h"><Icon name="trending_up" /> Popular Articles</h2>
            <div className="hd-list">
              {articles.map((a) => (
                <a key={a} href="#" className="hd-art" onClick={(e) => e.preventDefault()}>
                  <div><Icon name="article" className="a" /><span className="t">{a}</span></div>
                  <Icon name="chevron_right" className="c" />
                </a>
              ))}
              {articles.length === 0 && <div className="hd-empty">No articles match “{q}”.</div>}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const HM_CATS = [
  ["manage_accounts", "Account"],
  ["credit_card", "Billing"],
  ["build", "Technical"],
  ["school", "Courses"],
];
const HM_FAQ = [
  ["How do I reset my password?", 'Go to the login screen and tap "Forgot Password". Enter your registered email address and we\'ll send you a link to create a new one.'],
  ["Can I download courses for offline?", "Yes! Premium users can download any course module by tapping the download icon next to the lesson title while connected to Wi-Fi."],
  ["Where is my certificate?", 'Once you complete all modules and pass the final assessment, your certificate will appear in the "Achievements" section of your Profile.'],
];

function HelpMobile({ onNav }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState({});
  const faq = HM_FAQ.filter(([a]) => a.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div className="hm">
      <header className="hm-top">
        <div className="hm-top-in">
          <button className="hm-back" aria-label="Go back" onClick={() => onNav("dashboard")}><Icon name="arrow_back" /></button>
          <h1>Help Center</h1>
          <button className="hm-back" aria-label="Log out" onClick={() => onNav("logout")}><Icon name="logout" /></button>
        </div>
      </header>

      <main className="hm-main">
        <section>
          <h2>How can we help?</h2>
          <div className="hm-search">
            <Icon name="search" />
            <input type="text" placeholder="Search for answers..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </section>

        <section>
          <h3 className="hm-label">CATEGORIES</h3>
          <div className="hm-cats">
            {HM_CATS.map(([ic, label]) => (
              <a key={label} href="#" className="hm-glass hm-cat" onClick={(e) => e.preventDefault()}>
                <Icon name={ic} /><span>{label}</span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h3 className="hm-label">FREQUENTLY ASKED</h3>
          <div className="hm-faq">
            {faq.map(([qq, a]) => (
              <div key={qq} className="hm-glass hm-item">
                <button className={`hm-q ${open[qq] ? "open" : ""}`} onClick={() => setOpen({ ...open, [qq]: !open[qq] })}>
                  <span>{qq}</span><Icon name="expand_more" />
                </button>
                <div className={`hm-a ${open[qq] ? "open" : ""}`}><div><p>{a}</p></div></div>
              </div>
            ))}
            {faq.length === 0 && <div className="hm-empty">No answers match “{q}”.</div>}
          </div>
        </section>

        <section className="hm-cta">
          <p>Still need help?</p>
          <button><Icon name="chat" /> Chat with Support</button>
        </section>
      </main>
    </div>
  );
}

function HelpCenter({ onNav, isMobile }) {
  return isMobile ? <HelpMobile onNav={onNav} /> : <HelpDesktop onNav={onNav} />;
}

function TeacherApp({ user, onLogout, theme, setTheme }) {
  const [page, setPage] = useState("dashboard");
  const isMobile = useMedia("(max-width: 767px)");
  const go = (p) => {
    if (p === "logout") onLogout();
    else if (p) setPage(p);
  };
  const hideFab = page === "courses" || (page === "help" && isMobile);
  return (
    <div className="t-app">
      {page === "messages" ? <Messages onNav={go} />
        : page === "forum" ? <Forum onNav={go} />
        : page === "courses" ? <CourseCreate onNav={go} />
        : page === "settings" ? <TeacherSettings onNav={go} theme={theme} setTheme={setTheme} user={user} />
        : page === "help" ? <HelpCenter onNav={go} isMobile={isMobile} />
        : <TeacherDashboard onNav={go} user={user} />}
      {!hideFab && (
        <button className="fab" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          <Icon name={theme === "dark" ? "light_mode" : "dark_mode"} />
        </button>
      )}
    </div>
  );
}

const readUser = () => {
  try {
    const raw = load("lumina-user", null);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export default function App() {
  const [theme, setTheme] = useState(() => load("lumina-theme", "light"));
  const [user, setUser] = useState(readUser);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    save("lumina-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const persist = (u) => {
    save("lumina-user", u ? JSON.stringify(u) : null);
    setUser(u);
  };
  const signIn = (email, name) => persist({ email, name: name || nameOf(email), role: roleOf(email) });
  const signOut = () => persist(null);
  const update = (patch) => persist({ ...user, ...patch });

  if (!user) return <Auth onAuth={signIn} theme={theme} onToggleTheme={toggleTheme} />;

  return user.role === "teacher" ? (
    <TeacherApp user={user} onLogout={signOut} theme={theme} setTheme={setTheme} />
  ) : (
    <StudentApp user={user} onUpdate={update} onLogout={signOut} theme={theme} onToggleTheme={toggleTheme} />
  );
}