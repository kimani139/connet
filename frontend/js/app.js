* {
  box-sizing: border-box;
}

:root {
  --navy-900: #081b2e;
  --navy-800: #0d233e;
  --navy-700: #102d4d;
  --navy-600: #1d3d5d;
  --orange-500: #ff8a1d;
  --orange-600: #f36d00;
  --orange-100: #fff2e7;
  --white: #ffffff;
  --gray-50: #f5f7fb;
  --gray-100: #edf1f6;
  --gray-200: #dfe5ee;
  --gray-300: #c8ced8;
  --gray-500: #71819a;
  --gray-700: #31445f;
  --dark: #091321;
  --shadow-soft: 0 20px 45px rgba(8, 27, 46, 0.08);
  --shadow-card: 0 14px 32px rgba(15, 37, 60, 0.12);
  --radius: 22px;
  --max-width: 1180px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: var(--gray-50);
  color: var(--dark);
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.container {
  width: min(var(--max-width), calc(100% - 32px));
  margin: 0 auto;
}

.section {
  padding: 96px 0;
}

.alt-bg {
  background: rgba(255, 255, 255, 0.78);
}

.center {
  text-align: center;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--orange-600);
  margin-bottom: 16px;
}

.eyebrow.accent {
  color: var(--orange-600);
}

h1, h2, h3, h4, p {
  margin-top: 0;
}

h1 {
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 1.05;
  letter-spacing: -0.05em;
  font-weight: 800;
  margin-bottom: 18px;
}

h2 {
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.15;
  letter-spacing: -0.04em;
  margin-bottom: 18px;
}

h3 {
  font-size: 1.4rem;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}

p {
  color: var(--gray-700);
}

.btn {
  border: none;
  border-radius: 999px;
  padding: 0.92rem 1.5rem;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--orange-500), var(--orange-600));
  color: var(--white);
  box-shadow: 0 12px 24px rgba(243, 109, 0, 0.25);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.34);
  color: var(--white);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(14px);
  background: rgba(8, 27, 46, 0.72);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--white);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.brand-mark {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--orange-500), var(--orange-600));
  color: var(--white);
  font-size: 1.1rem;
  box-shadow: 0 12px 24px rgba(243, 109, 0, 0.28);
}

.nav-panel {
  display: flex;
  align-items: center;
  gap: 22px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 24px;
  padding: 0;
  margin: 0;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.82);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: var(--white);
}

.nav-toggle {
  display: none;
  width: 46px;
  height: 46px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 10px 12px;
}

.nav-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--white);
  margin: 5px 0;
}

.hero {
  position: relative;
  min-height: 760px;
  display: flex;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=80');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(8, 27, 46, 0.85), rgba(8, 27, 46, 0.52));
}

.hero-content {
  position: relative;
  z-index: 1;
  width: min(var(--max-width), calc(100% - 32px));
  padding: 80px 0 60px;
}

.hero-copy {
  max-width: 700px;
  color: var(--white);
}

.hero-copy p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  max-width: 620px;
  margin-bottom: 30px;
}

.hero-search {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 20px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  max-width: 760px;
  backdrop-filter: blur(10px);
}

.field {
  display: flex;
  align-items: center;
}

.hero-search input {
  width: 100%;
  border: none;
  background: rgba(255, 255, 255, 0.96);
  min-height: 56px;
  border-radius: 16px;
  padding: 0 18px;
  color: var(--dark);
}

.hero-search .btn {
  min-height: 56px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 20px;
}

.trust-indicators {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 32px 0 0;
  gap: 24px;
  color: rgba(255, 255, 255, 0.85);
}

.trust-indicators li {
  position: relative;
  padding-left: 18px;
}

.trust-indicators li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--orange-500);
  font-size: 1.5rem;
  line-height: 1;
}

.section-heading {
  margin-bottom: 40px;
}

.services-grid,
.business-cards,
.steps-grid,
.account-grid,
.footer-grid {
  display: grid;
  gap: 24px;
}

.services-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.service-card,
.card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft);
}

.service-card {
  overflow: hidden;
  border: 1px solid rgba(18, 35, 56, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.service-card:hover,
.step-card:hover,
.info-card:hover,
.professional-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-card);
}

.service-media {
  position: relative;
  height: 220px;
  background-size: cover;
  background-position: center;
}

.service-caption {
  padding: 22px 20px 24px;
}

.service-caption p {
  min-height: 58px;
}

.service-card .explore-link {
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: var(--navy-800);
}

.service-card .explore-link::after {
  content: '→';
  color: var(--orange-600);
}

.directory-toolbar {
  padding: 18px;
  margin-bottom: 28px;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.search-wrap input,
.filter-row select,
.auth-form input,
.auth-form select,
.booking-form input,
.booking-form textarea {
  width: 100%;
  border: 1px solid var(--gray-200);
  background: var(--gray-50);
  border-radius: 14px;
  min-height: 52px;
  padding: 0 16px;
  color: var(--dark);
}

.directory-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.professional-card {
  overflow: hidden;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(18, 35, 56, 0.03);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.professional-cover {
  height: 150px;
  background-size: cover;
  background-position: center;
}

.professional-body {
  padding: 18px 18px 20px;
}

.professional-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.professional-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 20px rgba(9, 19, 33, 0.16);
}

.professional-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  color: var(--gray-700);
  font-size: 0.88rem;
  margin-bottom: 12px;
}

.professional-meta span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.badge.verified {
  background: rgba(28, 177, 118, 0.12);
  color: #1a8d63;
}

.badge.unverified {
  background: rgba(255, 138, 29, 0.15);
  color: var(--orange-600);
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0 16px;
}

.skill-list span {
  display: inline-flex;
  background: var(--gray-100);
  border-radius: 999px;
  padding: 7px 10px;
  font-size: 0.75rem;
  color: var(--gray-700);
}

.professional-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.professional-actions .btn {
  flex: 1;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
}

.btn-ghost {
  background: var(--gray-100);
  color: var(--navy-800);
}

.steps-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.step-card {
  padding: 28px 20px;
  border: 1px solid rgba(18, 35, 56, 0.04);
  background: var(--white);
  border-radius: var(--radius);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.step-icon {
  width: 56px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: var(--orange-100);
  color: var(--orange-600);
  font-weight: 800;
  margin-bottom: 20px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 42px;
  align-items: center;
}

.about-image {
  min-height: 520px;
  background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  border-radius: 30px;
  box-shadow: var(--shadow-card);
}

.check-list {
  list-style: none;
  padding: 0;
  margin: 26px 0 0;
  display: grid;
  gap: 14px;
  color: var(--navy-800);
  font-weight: 600;
}

.check-list li::before {
  content: '✓';
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(29, 161, 120, 0.12);
  color: #1e9a6a;
  margin-right: 10px;
}

.business-cards {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.info-card {
  position: relative;
  padding: 24px 20px;
  border: 1px solid rgba(18, 35, 56, 0.04);
}

.info-card.marked {
  background: linear-gradient(180deg, var(--navy-800), var(--navy-700));
  color: var(--white);
}

.info-card.marked p,
.info-card.marked h3 {
  color: var(--white);
}

.sponsored-tag {
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 138, 29, 0.18);
  color: var(--orange-100);
  font-size: 0.72rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.account-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.auth-card {
  padding: 26px 22px;
}

.auth-form {
  display: grid;
  gap: 12px;
}

.auth-form button,
.booking-form button {
  margin-top: 10px;
}

.dashboard-card {
  padding: 24px;
}

.demo-credentials {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 18px 0 22px;
  padding: 18px;
  border-radius: 16px;
  background: rgba(243, 109, 0, 0.06);
  color: var(--navy-800);
  font-weight: 600;
}

.admin-content {
  margin-top: 24px;
  display: grid;
  gap: 16px;
}

.admin-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.admin-stat {
  padding: 18px;
  border-radius: 18px;
  background: var(--gray-100);
}

.admin-stat strong {
  display: block;
  font-size: 1.8rem;
  color: var(--navy-800);
}

.site-footer {
  padding: 48px 0 26px;
  background: var(--navy-900);
  color: rgba(255, 255, 255, 0.9);
}

.footer-grid {
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
}

.site-footer h3,
.site-footer h4 {
  color: var(--white);
}

.site-footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.site-footer a {
  color: rgba(255, 255, 255, 0.8);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 30px;
  padding-top: 20px;
}

.modal {
  position: fixed;
  inset: 0;
  display: none;
  z-index: 200;
}

.modal.is-open {
  display: block;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(8, 27, 46, 0.64);
}

.modal-content {
  position: relative;
  width: min(720px, calc(100% - 32px));
  margin: 5vh auto;
  padding: 28px 24px 22px;
  z-index: 1;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  background: var(--gray-100);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-size: 1.5rem;
  color: var(--navy-800);
}

.booking-form {
  display: grid;
  gap: 14px;
}

.input-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.form-status {
  min-height: 24px;
  margin: 0;
  font-weight: 600;
}

.form-status.success {
  color: #197d5b;
}

.form-status.error {
  color: #b8452b;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .directory-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .business-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filter-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .nav-toggle {
    display: inline-block;
  }

  .nav-panel {
    position: absolute;
    top: 82px;
    right: 16px;
    left: 16px;
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 22px 18px;
    background: rgba(8, 27, 46, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    box-shadow: 0 18px 36px rgba(8, 27, 46, 0.28);
  }

  .nav-panel.is-open {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    gap: 12px;
    margin-bottom: 14px;
  }

  .hero {
    min-height: 650px;
  }

  .hero-search {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .services-grid,
  .directory-grid,
  .steps-grid,
  .account-grid,
  .business-cards,
  .footer-grid,
  .about-grid,
  .admin-stat-grid {
    grid-template-columns: 1fr;
  }

  .filter-row,
  .input-row {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 72px 0;
  }
}
