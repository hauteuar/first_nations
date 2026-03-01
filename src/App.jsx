import { useState, useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0D2545;
    --navy-mid: #1A3D6B;
    --navy-light: #2A5298;
    --teal: #1B6CA8;
    --gold: #C8962E;
    --gold-light: #E8B84B;
    --cream: #FAF8F4;
    --white: #FFFFFF;
    --text: #1A2B3C;
    --muted: #5A7088;
    --border: rgba(13,37,69,0.1);
    --F: 'Sora', sans-serif;
    --B: 'DM Sans', sans-serif;
  }
  html { scroll-behavior: smooth; }
  body { font-family: var(--B); background: var(--cream); color: var(--text); overflow-x: hidden; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    background: rgba(13,37,69,0.98); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(200,150,46,0.2);
    height: 68px; display: flex; align-items: center;
    padding: 0 48px; gap: 32px;
  }
  .nav-logo { display: flex; align-items: center; cursor: pointer; flex-shrink: 0; }
  .nav-logo img { height: 38px; width: auto; filter: brightness(0) invert(1); }
  .nav-sep { width: 1px; height: 28px; background: rgba(255,255,255,0.12); }
  .nav-links { display: flex; align-items: center; gap: 2px; flex: 1; }
  .nav-btn {
    background: none; border: none; color: rgba(255,255,255,0.72); font-size: 13px;
    font-weight: 500; padding: 7px 14px; border-radius: 6px; cursor: pointer;
    font-family: var(--B); transition: all 0.18s; white-space: nowrap;
  }
  .nav-btn:hover { color: white; background: rgba(255,255,255,0.08); }
  .nav-btn.active { color: var(--gold); }
  .nav-right { display: flex; align-items: center; gap: 10px; margin-left: auto; }
  .nav-platform {
    background: rgba(200,150,46,0.12); border: 1px solid rgba(200,150,46,0.35);
    color: var(--gold-light); font-size: 12px; font-weight: 600;
    padding: 6px 16px; border-radius: 20px; cursor: pointer;
    font-family: var(--F); transition: all 0.2s; white-space: nowrap;
  }
  .nav-platform:hover { background: rgba(200,150,46,0.22); }
  .nav-donate {
    background: var(--gold); color: var(--navy); font-weight: 700; font-size: 13px;
    padding: 8px 20px; border-radius: 6px; cursor: pointer; border: none;
    font-family: var(--F); transition: all 0.2s;
  }
  .nav-donate:hover { background: var(--gold-light); }

  /* SWITCHER */
  .switcher {
    position: fixed; top: 78px; left: 50%; transform: translateX(-50%); z-index: 199;
    background: var(--navy); border: 1px solid rgba(200,150,46,0.25);
    border-radius: 30px; padding: 4px; display: flex;
    box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  }
  .sw-btn {
    padding: 7px 22px; border-radius: 22px; font-size: 12px; font-weight: 700;
    cursor: pointer; border: none; font-family: var(--F); transition: all 0.22s; white-space: nowrap;
  }
  .sw-btn.on { background: var(--gold); color: var(--navy); }
  .sw-btn.off { background: transparent; color: rgba(255,255,255,0.55); }
  .sw-btn.off:hover { color: white; }

  /* SHARED */
  .wrap { padding-top: 68px; }
  .sec { padding: 88px 72px; }
  .sec-sm { padding: 64px 72px; }
  .lbl { font-family: var(--F); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: var(--gold); text-transform: uppercase; margin-bottom: 10px; }
  .h1 { font-family: var(--F); font-size: clamp(36px,4.5vw,64px); font-weight: 800; line-height: 1.05; color: var(--navy); }
  .h2 { font-family: var(--F); font-size: clamp(26px,3vw,42px); font-weight: 800; line-height: 1.1; color: var(--navy); }
  .h3 { font-family: var(--F); font-size: 20px; font-weight: 700; color: var(--navy); }
  .h1-w { color: white; }
  .h2-w { color: white; }
  .p { font-size: 16px; color: var(--muted); line-height: 1.75; }
  .p-w { color: rgba(255,255,255,0.62); }
  .btn-gold {
    background: var(--gold); color: var(--navy); font-weight: 700; font-size: 14px;
    padding: 13px 28px; border-radius: 8px; cursor: pointer; border: none;
    font-family: var(--F); transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,150,46,0.3); }
  .btn-outline {
    background: rgba(255,255,255,0.08); color: white; font-weight: 600; font-size: 14px;
    padding: 13px 28px; border-radius: 8px; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.2); font-family: var(--F); transition: all 0.2s;
  }
  .btn-outline:hover { background: rgba(255,255,255,0.14); }
  .btn-ghost {
    background: none; border: 1px solid var(--border); color: var(--navy-light); font-weight: 600;
    font-size: 13px; padding: 9px 20px; border-radius: 6px; cursor: pointer;
    font-family: var(--F); transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: var(--navy-light); background: rgba(42,82,152,0.06); }

  /* HERO */
  .hero {
    background: var(--navy); min-height: 90vh;
    display: grid; grid-template-columns: 1fr 420px; gap: 48px;
    align-items: center; padding: 100px 72px 80px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 55% 70% at 80% 50%, rgba(200,150,46,0.07) 0%, transparent 65%),
                radial-gradient(ellipse 40% 60% at 10% 80%, rgba(27,108,168,0.1) 0%, transparent 60%);
  }
  .hero-welcome {
    font-family: var(--F); font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
    color: var(--gold); text-transform: uppercase; margin-bottom: 10px;
    animation: up 0.6s ease both;
  }
  .hero-titles { margin-bottom: 8px; animation: up 0.6s 0.1s ease both; }
  .hero-title-main { font-family: var(--F); font-size: clamp(38px,4.5vw,66px); font-weight: 800; line-height: 1.05; color: white; display: block; }
  .hero-title-accent { font-family: var(--F); font-size: clamp(38px,4.5vw,66px); font-weight: 800; line-height: 1.05; color: var(--gold); display: block; }
  .hero-sub { font-size: 17px; color: rgba(255,255,255,0.6); line-height: 1.7; max-width: 500px; margin: 20px 0 40px; animation: up 0.6s 0.2s ease both; }
  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; animation: up 0.6s 0.3s ease both; }
  .hero-stats { display: flex; gap: 40px; margin-top: 60px; padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.1); animation: up 0.6s 0.4s ease both; }
  .stat-n { font-family: var(--F); font-size: 38px; font-weight: 800; color: var(--gold); }
  .stat-l { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 4px; line-height: 1.4; }

  /* HERO CARD */
  .hero-card { animation: left 0.8s 0.3s ease both; }
  .hc {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; padding: 28px; backdrop-filter: blur(8px);
  }
  .hc-title { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 18px; }
  .hc-item {
    display: flex; align-items: center; gap: 12px; padding: 11px 14px;
    background: rgba(255,255,255,0.04); border-radius: 8px; margin-bottom: 8px;
    border: 1px solid rgba(255,255,255,0.06); cursor: pointer; transition: all 0.2s;
  }
  .hc-item:hover { background: rgba(255,255,255,0.08); border-color: rgba(200,150,46,0.3); }
  .hc-icon { font-size: 18px; flex-shrink: 0; }
  .hc-name { font-size: 13px; color: rgba(255,255,255,0.82); font-weight: 500; }
  .hc-tag { font-size: 10px; color: rgba(255,255,255,0.38); margin-top: 2px; }
  .hc-dot { width: 6px; height: 6px; border-radius: 50%; margin-left: auto; flex-shrink: 0; }
  .hc-dot.green { background: #48C78E; animation: pulse 2s infinite; }
  .hc-dot.gold { background: var(--gold); }

  /* TERRITORIAL */
  .territorial {
    background: rgba(200,150,46,0.07); border-top: 1px solid rgba(200,150,46,0.15);
    border-bottom: 1px solid rgba(200,150,46,0.15);
    padding: 14px 72px; font-size: 13px; color: var(--muted); line-height: 1.5;
  }
  .territorial strong { color: var(--text); }

  /* MANDATE GRID */
  .mandate-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .mandate-card {
    display: flex; gap: 16px; align-items: flex-start; padding: 22px 24px;
    background: var(--white); border: 1px solid var(--border); border-radius: 12px;
    margin-bottom: 14px; transition: all 0.25s;
  }
  .mandate-card:hover { box-shadow: 0 8px 28px rgba(13,37,69,0.1); transform: translateX(4px); }
  .mc-icon { width: 42px; height: 42px; border-radius: 10px; background: linear-gradient(135deg, var(--navy), var(--teal)); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .mc-title { font-family: var(--F); font-weight: 700; font-size: 14px; color: var(--navy); margin-bottom: 5px; }
  .mc-body { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* IMPACT BAND */
  .impact {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
    padding: 72px; display: grid; grid-template-columns: repeat(4,1fr); gap: 32px;
  }
  .impact-item { text-align: center; }
  .impact-n { font-family: var(--F); font-size: 48px; font-weight: 800; color: var(--gold); line-height: 1; }
  .impact-l { font-size: 13px; color: rgba(255,255,255,0.55); margin-top: 8px; line-height: 1.4; }

  /* COURSES */
  .courses-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px; }
  .course-tiers { display: flex; flex-direction: column; gap: 32px; }
  .tier-label { font-family: var(--F); font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
  .tier-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .course-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
  .course-card {
    background: var(--white); border: 1px solid var(--border); border-radius: 10px;
    padding: 18px 20px; cursor: pointer; transition: all 0.22s; position: relative;
  }
  .course-card:hover { box-shadow: 0 6px 24px rgba(13,37,69,0.1); transform: translateY(-3px); border-color: rgba(13,37,69,0.2); }
  .cc-tier { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px; margin-bottom: 10px; display: inline-block; }
  .tier-fund { background: rgba(72,199,142,0.12); color: #2EA87A; }
  .tier-found { background: rgba(27,108,168,0.1); color: var(--teal); }
  .tier-focus { background: rgba(200,150,46,0.12); color: #A0761A; }
  .tier-fut { background: rgba(150,80,200,0.1); color: #7B44B8; }
  .cc-name { font-family: var(--F); font-weight: 600; font-size: 14px; color: var(--navy); line-height: 1.3; }
  .cc-free { position: absolute; top: 12px; right: 14px; font-size: 10px; font-weight: 700; color: #2EA87A; }

  /* RESEARCH */
  .research-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; margin-top: 40px; }
  .rc {
    background: var(--white); border: 1px solid var(--border); border-radius: 14px;
    padding: 32px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden;
  }
  .rc::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--navy), var(--teal)); }
  .rc:hover { box-shadow: 0 10px 36px rgba(13,37,69,0.12); transform: translateY(-3px); }
  .rc-title { font-family: var(--F); font-weight: 700; font-size: 17px; color: var(--navy); margin-bottom: 12px; line-height: 1.3; }
  .rc-body { font-size: 13px; color: var(--muted); line-height: 1.65; }
  .rc-link { margin-top: 18px; font-size: 13px; font-weight: 600; color: var(--teal); }

  /* NEWS */
  .news-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 40px; }
  .news-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; cursor: pointer; transition: all 0.25s; }
  .news-card:hover { box-shadow: 0 10px 32px rgba(13,37,69,0.1); transform: translateY(-3px); }
  .news-img { height: 140px; background: linear-gradient(135deg, var(--navy), var(--teal)); display: flex; align-items: center; justify-content: center; font-size: 40px; }
  .news-body { padding: 20px; }
  .news-date { font-size: 11px; color: var(--muted); margin-bottom: 8px; }
  .news-title { font-family: var(--F); font-weight: 600; font-size: 14px; color: var(--navy); line-height: 1.4; }
  .news-read { font-size: 12px; color: var(--teal); font-weight: 600; margin-top: 12px; }

  /* CTA */
  .cta-sec { background: var(--navy); padding: 88px 72px; text-align: center; }

  /* FOOTER */
  .footer { background: #071629; padding: 60px 72px 36px; border-top: 1px solid rgba(200,150,46,0.15); }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  .f-logo img { height: 36px; filter: brightness(0) invert(1); margin-bottom: 16px; }
  .f-tagline { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7; max-width: 280px; margin-bottom: 20px; }
  .f-contact { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.8; }
  .f-contact a { color: rgba(255,255,255,0.5); text-decoration: none; }
  .f-col-title { font-family: var(--F); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: var(--gold); text-transform: uppercase; margin-bottom: 16px; }
  .f-link { display: block; color: rgba(255,255,255,0.5); font-size: 13px; margin-bottom: 10px; cursor: pointer; transition: color 0.2s; text-decoration: none; }
  .f-link:hover { color: white; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; gap: 12px; }
  .f-copy { font-size: 11px; color: rgba(255,255,255,0.28); }
  .f-artist { font-size: 11px; color: rgba(255,255,255,0.28); }
  .f-territorial { font-size: 11px; color: rgba(255,255,255,0.28); margin-top: 4px; }

  /* ═══ LEARNING PLATFORM ═══ */
  .plat { background: #0C1520; min-height: 100vh; padding-top: 68px; }
  .plat-hero {
    background: linear-gradient(135deg, #0C1520, #142236);
    padding: 96px 72px 72px; position: relative; overflow: hidden;
  }
  .plat-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 50% 60% at 75% 50%, rgba(200,150,46,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .plat-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(200,150,46,0.1); border: 1px solid rgba(200,150,46,0.28);
    color: var(--gold-light); font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
    padding: 6px 16px; border-radius: 20px; margin-bottom: 22px;
    font-family: var(--F); width: fit-content;
  }
  .plat-title { font-family: var(--F); font-size: clamp(34px,4vw,58px); font-weight: 800; color: white; line-height: 1.06; margin-bottom: 18px; max-width: 620px; }
  .plat-title span { color: var(--gold); }
  .plat-sub { font-size: 17px; color: rgba(255,255,255,0.52); line-height: 1.7; max-width: 500px; margin-bottom: 36px; }
  .plat-search {
    display: flex; max-width: 520px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; overflow: hidden; margin-bottom: 40px;
  }
  .plat-search input { flex: 1; background: none; border: none; outline: none; padding: 13px 18px; color: white; font-size: 14px; font-family: var(--B); }
  .plat-search input::placeholder { color: rgba(255,255,255,0.28); }
  .plat-search-btn { background: var(--gold); color: var(--navy); border: none; padding: 11px 22px; font-weight: 700; font-size: 13px; cursor: pointer; font-family: var(--F); }
  .plat-tags { display: flex; gap: 8px; flex-wrap: wrap; }
  .plat-tag { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); color: rgba(255,255,255,0.6); font-size: 12px; padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all 0.2s; }
  .plat-tag:hover { background: rgba(200,150,46,0.14); border-color: rgba(200,150,46,0.38); color: var(--gold-light); }

  /* TRACKS */
  .tracks-sec { padding: 72px; background: #101D2D; }
  .tracks-hdr { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px; }
  .tracks-t { font-family: var(--F); font-size: 26px; font-weight: 800; color: white; }
  .tracks-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
  .track {
    border-radius: 14px; padding: 26px; cursor: pointer; border: 1px solid rgba(255,255,255,0.06);
    transition: all 0.25s; position: relative; overflow: hidden;
  }
  .track-1 { background: linear-gradient(135deg, #162D4F, #0C1929); }
  .track-2 { background: linear-gradient(135deg, #1A2D1A, #0F1E0F); }
  .track-3 { background: linear-gradient(135deg, #2A2010, #1A1408); }
  .track-4 { background: linear-gradient(135deg, #1E2030, #12141E); }
  .track-5 { background: linear-gradient(135deg, #2A1625, #1A0E18); }
  .track-6 { background: linear-gradient(135deg, #162828, #0C1818); }
  .track:hover { transform: translateY(-4px); box-shadow: 0 14px 44px rgba(0,0,0,0.5); border-color: rgba(200,150,46,0.28); }
  .track-emoji { font-size: 28px; margin-bottom: 14px; }
  .track-lvl { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; margin-bottom: 10px; display: inline-block; }
  .lvl-beg { background: rgba(72,199,142,0.18); color: #48C78E; }
  .lvl-int { background: rgba(255,183,77,0.18); color: #FFB74D; }
  .lvl-adv { background: rgba(255,100,100,0.18); color: #FF7070; }
  .track-name { font-family: var(--F); font-size: 16px; font-weight: 700; color: white; margin-bottom: 8px; line-height: 1.3; }
  .track-desc { font-size: 13px; color: rgba(255,255,255,0.48); line-height: 1.6; margin-bottom: 14px; }
  .track-meta { display: flex; gap: 14px; }
  .track-meta-i { font-size: 11px; color: rgba(255,255,255,0.3); }
  .track-partner { font-size: 10px; color: var(--gold-light); margin-top: 8px; font-weight: 600; }

  /* PROMPT LIB */
  .prompts-sec { padding: 72px; background: #0C1520; }
  .prompts-hdr { margin-bottom: 32px; }
  .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
  .fbtn { padding: 7px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid rgba(255,255,255,0.1); font-family: var(--F); transition: all 0.18s; }
  .fbtn.on { background: var(--gold); color: var(--navy); border-color: var(--gold); }
  .fbtn.off { background: transparent; color: rgba(255,255,255,0.52); }
  .fbtn.off:hover { color: white; border-color: rgba(255,255,255,0.28); }
  .prompts-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
  .pc { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 20px 22px; cursor: pointer; transition: all 0.2s; }
  .pc:hover { background: rgba(255,255,255,0.06); border-color: rgba(200,150,46,0.28); }
  .pc-cat { font-size: 10px; font-weight: 700; color: var(--gold); letter-spacing: 0.08em; margin-bottom: 7px; }
  .pc-title { font-weight: 600; font-size: 14px; color: white; margin-bottom: 7px; line-height: 1.4; }
  .pc-prev { font-size: 12px; color: rgba(255,255,255,0.38); line-height: 1.5; font-style: italic; }
  .pc-copy { margin-top: 12px; background: rgba(200,150,46,0.12); border: 1px solid rgba(200,150,46,0.28); color: var(--gold-light); font-size: 11px; font-weight: 600; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-family: var(--F); transition: all 0.2s; display: inline-flex; align-items: center; gap: 5px; }
  .pc-copy:hover { background: rgba(200,150,46,0.22); }

  /* CHATBOT */
  .chat-sec { padding: 72px; background: #101D2D; }
  .chat-wrap { max-width: 700px; margin: 0 auto; }
  .chat-win { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; overflow: hidden; }
  .chat-msgs { padding: 22px; min-height: 300px; max-height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 14px; }
  .msg { display: flex; gap: 10px; animation: up 0.28s ease; }
  .msg.u { flex-direction: row-reverse; }
  .av { width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; font-family: var(--F); }
  .av.ai { background: linear-gradient(135deg, var(--navy), var(--teal)); color: var(--gold); }
  .av.you { background: var(--gold); color: var(--navy); }
  .bubble { max-width: 80%; padding: 11px 15px; border-radius: 10px; font-size: 14px; line-height: 1.6; }
  .bubble.ai { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); border-radius: 3px 10px 10px 10px; white-space: pre-line; }
  .bubble.you { background: var(--gold); color: var(--navy); font-weight: 500; border-radius: 10px 3px 10px 10px; }
  .typing-row { display: flex; align-items: center; gap: 4px; padding: 10px 14px; }
  .dot { width: 5px; height: 5px; background: rgba(255,255,255,0.35); border-radius: 50%; animation: bounce 1.1s infinite; }
  .dot:nth-child(2) { animation-delay: 0.18s; }
  .dot:nth-child(3) { animation-delay: 0.36s; }
  .chat-in { display: flex; border-top: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02); }
  .chat-input { flex: 1; background: none; border: none; outline: none; padding: 15px 18px; color: white; font-size: 14px; font-family: var(--B); }
  .chat-input::placeholder { color: rgba(255,255,255,0.22); }
  .chat-send { background: var(--gold); color: var(--navy); border: none; padding: 12px 18px; font-size: 17px; cursor: pointer; transition: all 0.2s; }
  .chat-send:hover { background: var(--gold-light); }
  .chat-sugg { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
  .sugg { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); color: rgba(255,255,255,0.58); font-size: 12px; padding: 7px 14px; border-radius: 20px; cursor: pointer; transition: all 0.2s; font-family: var(--B); }
  .sugg:hover { background: rgba(200,150,46,0.1); border-color: rgba(200,150,46,0.32); color: var(--gold-light); }

  /* PATH BUILDER */
  .path-sec { padding: 72px; background: #0C1520; }
  .path-builder { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 32px; max-width: 620px; }
  .path-step { margin-bottom: 24px; }
  .path-q { font-size: 12px; font-weight: 700; color: var(--gold); margin-bottom: 10px; font-family: var(--F); }
  .path-opts { display: flex; gap: 8px; flex-wrap: wrap; }
  .popt { padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); background: transparent; transition: all 0.18s; font-family: var(--B); }
  .popt.sel { background: rgba(200,150,46,0.18); border-color: var(--gold); color: var(--gold-light); }
  .popt:hover:not(.sel) { border-color: rgba(255,255,255,0.25); color: white; }
  .path-gen { width: 100%; background: var(--gold); color: var(--navy); border: none; padding: 14px; border-radius: 10px; font-weight: 700; font-size: 15px; cursor: pointer; font-family: var(--F); transition: all 0.2s; margin-top: 6px; }
  .path-gen:hover { background: var(--gold-light); }
  .path-result { margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 22px; }
  .path-result-lbl { font-size: 11px; font-weight: 700; color: var(--gold); letter-spacing: 0.08em; margin-bottom: 14px; font-family: var(--F); }
  .path-mod { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.04); border-radius: 10px; padding: 11px 14px; margin-bottom: 8px; }
  .path-num { width: 26px; height: 26px; border-radius: 50%; background: var(--navy-mid); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--gold); flex-shrink: 0; font-family: var(--F); }
  .path-mname { font-size: 14px; color: rgba(255,255,255,0.8); font-weight: 500; flex: 1; }
  .path-mtime { font-size: 11px; color: rgba(255,255,255,0.32); }

  /* PLATFORM FOOTER */
  .plat-footer { background: #070E17; padding: 36px 72px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .plat-f-l { font-size: 12px; color: rgba(255,255,255,0.28); }
  .plat-f-r { font-size: 12px; color: rgba(255,255,255,0.28); }
  .plat-f-r span { color: var(--gold); }

  /* ANIMATIONS */
  @keyframes up { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes left { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
  @keyframes bounce { 0%,60%,100% { transform:translateY(0); opacity:.38; } 30% { transform:translateY(-6px); opacity:1; } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
`;

// ─── REAL DATA ───────────────────────────────────────────────────────────────
const courses = {
  Fundamentals: ["Introduction to Computers"],
  Foundations: ["Artificial Intelligence","Computer Aided Design (CAD)","Data Analytics","Digital Transformation","Foundations Exploratory","GIS/GPS Mapping","Intro to Web Development"],
  Focus: ["Artificial Intelligence","Digital Transformation","Web Development","Network Technician"],
  Futures: ["Business of Drones","Cybersecurity","Data Analytics","Data Science","Digital Marketing","Drone Stewardship","GIS/GPS Mapping","Network Technology","Product Management","UX Design","UI Design","Web Development"],
};
const tierStyle = { Fundamentals:"tier-fund", Foundations:"tier-found", Focus:"tier-focus", Futures:"tier-fut" };

const research = [
  { title:"Digital Transformation (AI)", body:"We heard from First Nations about the opportunities and barriers of AI and how it's already being used in communities. This is guiding the development of AI resources that support Nation-building.", link:"LEARN MORE ►" },
  { title:"Skills Shaped by Community", body:"Indigenous voices are shaping how the Technology Council designs digital skills training, ensuring it supports long-term success for learners across BC.", link:"LEARN MORE ►" },
  { title:"Indigenous Digital Enablement Series", body:"First Nations across BC are leading digital work to support their community priorities. This series highlights what's possible and what still needs to be done.", link:"LEARN MORE ►" },
  { title:"Labour Market Studies", body:"Our labour market studies bridge gaps in labour market intelligence, driving Indigenous representation and leadership in the tech sector.", link:"LEARN MORE ►" },
];

const news = [
  { emoji:"🎨", date:"Feb 2026", title:"Request for Proposals: Indigenous Artist / Artist Collective — Digital Illustration & Visual Collaboration" },
  { emoji:"🌐", date:"Feb 2026", title:"Request for Proposals: Branding, Website & Digital Learning Platform" },
  { emoji:"💼", date:"Jan 2026", title:"Launch Your Technology Career with Our Summer Internship Program" },
  { emoji:"📡", date:"Dec 2025", title:"When the Digital World Does Not Work for Everyone — Connectivity and First Nations" },
  { emoji:"🤖", date:"Nov 2025", title:"AI Opportunity Fund Announced Alongside Google.org in Toronto" },
  { emoji:"🏆", date:"Oct 2025", title:"Amplify Awards 2025: Celebrating the Innovative Community or Organization Award" },
];

const tracks = [
  { emoji:"🤖", lvl:"beginner", lvlLabel:"Beginner", name:"Artificial Intelligence Foundations", desc:"Understand what AI is, how it works, and how it's already shaping life in First Nations communities.", modules:6, hours:"4 hrs", partner:null, cls:"track-1" },
  { emoji:"⚡", lvl:"beginner", lvlLabel:"Beginner", name:"Digital Transformation Foundations", desc:"Build practical digital skills for everyday work and community life, grounded in Indigenous values.", modules:8, hours:"5 hrs", partner:null, cls:"track-2" },
  { emoji:"📊", lvl:"intermediate", lvlLabel:"Intermediate", name:"Data Analytics Focus", desc:"Learn to work with data — collecting, analyzing, and visualizing it to support community decisions.", modules:10, hours:"8 hrs", partner:"With BrainStation", cls:"track-3" },
  { emoji:"🔐", lvl:"intermediate", lvlLabel:"Intermediate", name:"Cybersecurity", desc:"Protect your community's digital assets. Understand threats, secure networks, and build resilience.", modules:12, hours:"10 hrs", partner:"With BrainStation", cls:"track-4" },
  { emoji:"🚁", lvl:"advanced", lvlLabel:"Advanced", name:"Drone Stewardship", desc:"Learn responsible drone operation for environmental monitoring, land management, and community use.", modules:8, hours:"7 hrs", partner:null, cls:"track-5" },
  { emoji:"🎨", lvl:"advanced", lvlLabel:"Advanced", name:"UX Design", desc:"Design digital experiences that are accessible, community-informed, and rooted in Indigenous perspectives.", modules:14, hours:"12 hrs", partner:"With BrainStation", cls:"track-6" },
];

const allPrompts = [
  { cat:"Grant Writing", title:"Technology funding proposal introduction", prev:"Write a compelling introduction for a grant application for a digital literacy program that serves..." },
  { cat:"Community Communication", title:"Newsletter about new digital programs", prev:"Write a friendly community newsletter announcing our new technology training program available to..." },
  { cat:"Data & Privacy", title:"Explain data sovereignty to your council", prev:"Write a plain-language explanation of data sovereignty and OCAP principles to present to..." },
  { cat:"AI at Work", title:"Summarize a government policy document", prev:"Summarize the following document and highlight the key points that affect First Nations digital..." },
  { cat:"Grant Writing", title:"Write measurable project outcomes", prev:"Help me articulate 4-5 measurable outcomes for a digital literacy program that will be..." },
  { cat:"Community Communication", title:"Translate technical language to plain English", prev:"Rewrite the following technical content in plain language for community members who are new to..." },
  { cat:"AI at Work", title:"Compare two AI tools for community use", prev:"Compare [Tool A] and [Tool B] for use by a First Nations organization. Consider ease of use..." },
  { cat:"Data & Privacy", title:"Data governance policy for your Nation", prev:"Draft a simple data governance policy for a First Nations organization covering data collection..." },
];
const promptFilters = ["All","Grant Writing","Community Communication","Data & Privacy","AI at Work"];

const aiAnswers = {
  default: "Tansi! I'm the FNTC Learning Assistant. I can help you find the right course, explain AI concepts in plain language, or help you build a personalized learning path. What's on your mind?",
  ai: "Great question! Artificial Intelligence means computer systems that can do things normally requiring human thinking — like understanding language, recognizing images, or making recommendations.\n\nFNTC offers two AI courses: **AI Foundations** (beginner, free, 4 hrs) and **AI Focus** (intermediate). Both are Indigenous-designed and free of cost. Would you like to start there?",
  data: "Data sovereignty means your Nation has the right to decide how your community's data is collected, stored, used, and shared.\n\nFNTC follows **OCAP® principles** — Ownership, Control, Access, and Possession — in all our research. Our **Digital Transformation** courses cover practical ways to apply these principles when adopting new tech tools.\n\nWould you like me to add a data sovereignty module to your learning path?",
  path: "Here's a recommended starting path based on what most community members find most useful:\n\n1. **AI Foundations** (4 hrs) — Build your foundation\n2. **Digital Transformation Foundations** (5 hrs) — Practical everyday skills\n3. **Cybersecurity** (10 hrs) — Protect your community's data\n\nAll three are free and self-paced. Ready to get started?",
  drone: "Drone Stewardship is one of our most popular Futures programs! It covers responsible drone operation, environmental monitoring, land stewardship, and regulatory requirements.\n\nIt's available at no cost to Indigenous Peoples living in BC, 18+. Applications open for Spring 2026. Want me to walk you through the course modules?",
};

export default function App() {
  const [site, setSite] = useState("main");
  const [scrollTo, setScrollTo] = useState(null);

  const refs = {
    main: { home: useRef(), about: useRef(), learn: useRef(), research: useRef(), news: useRef(), contact: useRef() },
    plat: { tracks: useRef(), prompts: useRef(), chat: useRef(), path: useRef() },
  };

  const [filter, setFilter] = useState("All");
  const [msgs, setMsgs] = useState([{ r:"ai", t: aiAnswers.default }]);
  const [inp, setInp] = useState("");
  const [typing, setTyping] = useState(false);
  const [copied, setCopied] = useState(null);
  const [path, setPath] = useState({ role:null, level:null, goal:null });
  const [pathResult, setPathResult] = useState(null);
  const msgEnd = useRef();

  useEffect(() => {
    if (scrollTo) {
      const r = site === "main" ? refs.main[scrollTo] : refs.plat[scrollTo];
      if (r?.current) { r.current.scrollIntoView({ behavior:"smooth", block:"start" }); }
      setScrollTo(null);
    }
  }, [scrollTo, site]);

  useEffect(() => { msgEnd.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, typing]);

  const switchSite = (s) => { setSite(s); setScrollTo(null); window.scrollTo({ top:0, behavior:"smooth" }); };
  const goTo = (s) => { setScrollTo(null); setTimeout(() => setScrollTo(s), 40); };

  const send = (text) => {
    const m = text || inp.trim(); if (!m) return;
    setInp(""); setMsgs(p => [...p, { r:"user", t:m }]); setTyping(true);
    const lo = m.toLowerCase();
    let ans = aiAnswers.default;
    if (lo.includes("ai") || lo.includes("artificial")) ans = aiAnswers.ai;
    else if (lo.includes("data") || lo.includes("sovereignty") || lo.includes("ocap")) ans = aiAnswers.data;
    else if (lo.includes("path") || lo.includes("start") || lo.includes("course") || lo.includes("begin")) ans = aiAnswers.path;
    else if (lo.includes("drone")) ans = aiAnswers.drone;
    setTimeout(() => { setTyping(false); setMsgs(p => [...p, { r:"ai", t: ans }]); }, 1300);
  };

  const genPath = () => {
    setPathResult([
      { name:"Introduction to AI Concepts", time:"45 min" },
      { name:"Digital Tools for Your Role", time:"60 min" },
      { name:"Data Privacy & Your Community", time:"30 min" },
      { name:"Hands-on Practice Lab", time:"50 min" },
      { name:"Building Your AI Action Plan", time:"40 min" },
    ]);
  };

  const filtered = filter === "All" ? allPrompts : allPrompts.filter(p => p.cat === filter);

  // LOGO — using real FNTC logo from their site (the colour version)
  const LOGO = "https://www.technologycouncil.ca/wp-content/uploads/2026/02/first-nations-technoloy-council-logo.png";
  const LOGO_MONO = "https://www.technologycouncil.ca/wp-content/uploads/2026/02/Technology-Council-Logo-Monochrome.svg";

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => { switchSite("main"); }}>
          <img src={LOGO_MONO} alt="First Nations Technology Council" onError={e => e.target.style.display="none"} />
        </div>
        <div className="nav-sep" />
        {site === "main" ? (
          <div className="nav-links">
            <button className="nav-btn" onClick={() => goTo("about")}>About</button>
            <button className="nav-btn" onClick={() => goTo("learn")}>Learn</button>
            <button className="nav-btn" onClick={() => goTo("research")}>Research</button>
            <button className="nav-btn" onClick={() => goTo("news")}>News</button>
            <button className="nav-btn" onClick={() => goTo("contact")}>Our Community</button>
          </div>
        ) : (
          <div className="nav-links">
            <button className="nav-btn" onClick={() => goTo("tracks")}>Courses</button>
            <button className="nav-btn" onClick={() => goTo("prompts")}>Prompt Library</button>
            <button className="nav-btn" onClick={() => goTo("chat")}>AI Assistant</button>
            <button className="nav-btn" onClick={() => goTo("path")}>My Path</button>
          </div>
        )}
        <div className="nav-right">
          {site === "main"
            ? <button className="nav-platform" onClick={() => switchSite("plat")}>✦ Digital Learning Platform</button>
            : <button className="nav-platform" onClick={() => switchSite("main")}>← Back to Main Site</button>
          }
          <button className="nav-donate">{site === "main" ? "Donate" : "Enroll Free"}</button>
        </div>
      </nav>

      {/* SWITCHER */}
      <div className="switcher">
        <button className={`sw-btn ${site==="main"?"on":"off"}`} onClick={() => switchSite("main")}>🏛 Organizational Website</button>
        <button className={`sw-btn ${site==="plat"?"on":"off"}`} onClick={() => switchSite("plat")}>🎓 Digital Learning Platform</button>
      </div>

      {/* ═══ MAIN SITE ═══ */}
      {site === "main" && (
        <div className="wrap">

          {/* HERO */}
          <section ref={refs.main.home} className="hero">
            <div>
              <div className="hero-welcome">Mandated by the First Nations Leadership Council</div>
              <div className="hero-titles">
                <span className="hero-title-main">Co-creating bright</span>
                <span className="hero-title-accent">digital futures</span>
                <span className="hero-title-main">for First Nations in BC</span>
              </div>
              <p className="hero-sub">
                We advance digital literacy, connectivity, and technology strategy for all 204 First Nations
                in British Columbia — so communities can use technology on their own terms.
              </p>
              <div className="hero-btns">
                <button className="btn-gold" onClick={() => goTo("learn")}>Explore Training Programs →</button>
                <button className="btn-outline" onClick={() => switchSite("plat")}>Digital Learning Platform</button>
              </div>
              <div className="hero-stats">
                {[["204","First Nations in BC"],["18+","Free digital courses"],["2,400+","Learners trained"],["2002","Established"]]
                  .map(([n,l]) => <div key={l}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>)}
              </div>
            </div>
            <div className="hero-card">
              <div className="hc">
                <div className="hc-title">Current Programs &amp; Initiatives</div>
                {[
                  { icon:"🤖", name:"AI Foundations — Spring 2026", tag:"Applications open now", dot:"green" },
                  { icon:"🚁", name:"Drone Stewardship", tag:"Futures program · Free", dot:"green" },
                  { icon:"📡", name:"BC Broadband Expansion", tag:"47 communities connected", dot:"gold" },
                  { icon:"🏆", name:"Amplify Awards 2026", tag:"Nominations opening soon", dot:"gold" },
                  { icon:"🎨", name:"Digital Illustration RFP", tag:"Indigenous artist sought", dot:"green" },
                ].map((i,idx) => (
                  <div key={idx} className="hc-item">
                    <div className="hc-icon">{i.icon}</div>
                    <div><div className="hc-name">{i.name}</div><div className="hc-tag">{i.tag}</div></div>
                    <div className={`hc-dot ${i.dot}`} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TERRITORIAL ACKNOWLEDGEMENT */}
          <div className="territorial">
            <strong>Territorial Acknowledgement:</strong> The First Nations Technology Council is located on the traditional and unceded territories of the Skwxwú7mesh (Squamish), xwmeθkweyem (Musqueam) and Selilwetal (Tsleil-Waututh) Nations.
          </div>

          {/* WHO WE ARE */}
          <section ref={refs.main.about} className="sec" style={{ background:"#fff" }}>
            <div className="mandate-grid">
              <div>
                <div className="lbl">Who We Are</div>
                <h2 className="h2" style={{ marginBottom:20 }}>An Indigenous-led organization built for all 204 First Nations</h2>
                <p className="p" style={{ marginBottom:18 }}>
                  We are an Indigenous-led, innovative non-profit mandated by the First Nations Leadership Council —
                  the BC Assembly of First Nations, the First Nations Summit, and the Union of BC Indian Chiefs.
                </p>
                <p className="p" style={{ marginBottom:32 }}>
                  Our board of directors represents Nations from across the province, and our team brings together
                  Indigenous professionals and committed allies with strengths in education, community engagement,
                  research, and technology leadership.
                </p>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                  <button className="btn-gold">Meet Our Team →</button>
                  <button className="btn-ghost">Annual Reports</button>
                </div>
              </div>
              <div>
                {[
                  { icon:"📚", title:"Digital Skills Training", body:"From introductory computer courses to advanced programs in cybersecurity, data science, AI, and drone stewardship — all at no cost to Indigenous learners in BC." },
                  { icon:"🔬", title:"Community-Led Research", body:"We research connectivity, spectrum, AI, and the digital economy so that Nations have the information they need to make their own decisions about technology." },
                  { icon:"💼", title:"Career Services", body:"We support our alumni as they move into technology careers and bring those skills home to their communities." },
                  { icon:"🤝", title:"Advocacy & Partnerships", body:"We advocate for equitable digital access and facilitate meaningful relationships between First Nations and technology sector partners." },
                ].map((c,i) => (
                  <div key={i} className="mandate-card">
                    <div className="mc-icon">{c.icon}</div>
                    <div><div className="mc-title">{c.title}</div><div className="mc-body">{c.body}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* IMPACT */}
          <div className="impact">
            {[["204","First Nations represented across BC"],["$4.2M+","Funding secured for community digital programs"],["38","Research publications and policy briefs"],["120K+","Tech sector jobs in BC — less than 1% held by Indigenous people. We're changing that."]]
              .map(([n,l]) => <div key={l} className="impact-item"><div className="impact-n">{n}</div><div className="impact-l">{l}</div></div>)}
          </div>

          {/* COURSES */}
          <section ref={refs.main.learn} className="sec" style={{ background:"var(--cream)" }}>
            <div className="courses-header">
              <div>
                <div className="lbl">Digital Skills Training</div>
                <h2 className="h2">Free, Indigenous-designed courses</h2>
              </div>
              <button className="btn-gold" onClick={() => switchSite("plat")}>Learning Platform →</button>
            </div>
            <p className="p" style={{ maxWidth:640, marginBottom:36 }}>
              Our Indigenous-designed courses are available to Indigenous Peoples living in BC, 18+, at no cost.
              Whether you're new to tech or ready to advance, there's a program for you.
            </p>
            <div className="course-tiers">
              {Object.entries(courses).map(([tier, list]) => (
                <div key={tier}>
                  <div className="tier-label">{tier}</div>
                  <div className="course-row">
                    {list.map(name => (
                      <div key={name} className="course-card">
                        <span className="cc-free">FREE</span>
                        <div className={`cc-tier ${tierStyle[tier]}`}>{tier}</div>
                        <div className="cc-name">{name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RESEARCH */}
          <section ref={refs.main.research} className="sec" style={{ background:"#fff" }}>
            <div className="lbl">Research</div>
            <h2 className="h2" style={{ marginBottom:12 }}>Community-grounded research that leads to action</h2>
            <p className="p" style={{ maxWidth:620 }}>
              Our research is grounded in place, relationship, and responsibility. We work alongside Nations,
              respecting OCAP® and treating data as a living relationship, not a resource to extract.
            </p>
            <div className="research-grid">
              {research.map((r,i) => (
                <div key={i} className="rc">
                  <div className="rc-title">{r.title}</div>
                  <div className="rc-body">{r.body}</div>
                  <div className="rc-link">{r.link}</div>
                </div>
              ))}
            </div>
          </section>

          {/* NEWS */}
          <section ref={refs.main.news} className="sec" style={{ background:"var(--cream)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:8 }}>
              <div><div className="lbl">News & Stories</div><h2 className="h2">What's happening at FNTC</h2></div>
              <button className="btn-ghost">See All News →</button>
            </div>
            <div className="news-grid" style={{ marginTop:32 }}>
              {news.map((n,i) => (
                <div key={i} className="news-card">
                  <div className="news-img">{n.emoji}</div>
                  <div className="news-body">
                    <div className="news-date">{n.date}</div>
                    <div className="news-title">{n.title}</div>
                    <div className="news-read">Read More →</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section ref={refs.main.contact} className="cta-sec">
            <div className="lbl" style={{ color:"var(--gold)", textAlign:"center" }}>Get Involved</div>
            <h2 className="h2 h2-w" style={{ maxWidth:560, margin:"0 auto 18px", textAlign:"center" }}>
              There are many ways to be part of this work
            </h2>
            <p className="p p-w" style={{ maxWidth:480, margin:"0 auto 36px", textAlign:"center" }}>
              Explore our training programs, browse our research, be part of the Amplify Awards,
              or get in touch to learn more.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="btn-gold" onClick={() => switchSite("plat")}>Explore Training →</button>
              <button className="btn-outline">Partner With Us</button>
              <button className="btn-outline">Donate to the Bursary Fund</button>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer">
            <div className="footer-top">
              <div>
                <div className="f-logo"><img src={LOGO_MONO} alt="FNTC" onError={e=>e.target.style.display="none"} /></div>
                <div className="f-tagline">An Indigenous-led, innovative non-profit mandated by First Nations leadership in British Columbia to advance digital literacy, connectivity, and technology strategy.</div>
                <div className="f-contact">
                  <div><a href="tel:16049219939">(604) 921-9939</a></div>
                  <div><a href="mailto:info@technologycouncil.ca">info@technologycouncil.ca</a></div>
                  <div>70 Orwell St. Unit 102, North Vancouver, BC V7J 3R5</div>
                </div>
              </div>
              <div>
                <div className="f-col-title">About</div>
                {["Our Team","News","Our Partners","Annual Reports","Employment"].map(l => <span key={l} className="f-link">{l}</span>)}
              </div>
              <div>
                <div className="f-col-title">Learn</div>
                {["Upcoming Courses","All Courses","FAQ","Career Services","Amplify Awards"].map(l => <span key={l} className="f-link">{l}</span>)}
              </div>
              <div>
                <div className="f-col-title">Research</div>
                {["Digital Transformation (AI)","Skills Shaped by Community","Digital Enablement Series","Labour Market Studies"].map(l => <span key={l} className="f-link">{l}</span>)}
              </div>
            </div>
            <div className="footer-bottom">
              <div>
                <div className="f-copy">© 2026 First Nations Technology Council. Located on the traditional and unceded territories of the Skwxwú7mesh (Squamish), xwmeθkweyem (Musqueam) and Selilwetal (Tsleil-Waututh) Nations.</div>
                <div className="f-artist">Art by Jamin Zuroski | Demo built by Haute-U AI Systems</div>
              </div>
              <div className="f-copy"><a href="https://technologycouncil.ca" className="f-link" style={{display:"inline"}}>technologycouncil.ca</a></div>
            </div>
          </footer>
        </div>
      )}

      {/* ═══ LEARNING PLATFORM ═══ */}
      {site === "plat" && (
        <div className="plat">

          {/* PLATFORM HERO */}
          <section className="plat-hero">
            <div className="plat-badge">✦ FNTC Digital Learning Platform — Coming 2026</div>
            <h1 className="plat-title">
              Learn AI &amp; digital skills<br /><span>on your own terms.</span>
            </h1>
            <p className="plat-sub">
              Practical, self-paced courses and AI tools designed for First Nations communities —
              grounded in Indigenous values and built for real-world use. Free for all Indigenous Peoples in BC, 18+.
            </p>
            <div className="plat-search">
              <input placeholder="Search courses, prompts, tools..." />
              <button className="plat-search-btn">Search</button>
            </div>
            <div className="plat-tags">
              {["AI Basics","Data Sovereignty","Grant Writing with AI","Drone Stewardship","Cybersecurity","Digital Transformation","No-Code Tools","Career Pathways"].map(t => (
                <button key={t} className="plat-tag">{t}</button>
              ))}
            </div>
          </section>

          {/* TRACKS */}
          <section ref={refs.plat.tracks} className="tracks-sec">
            <div className="tracks-hdr">
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8, fontFamily:"var(--F)" }}>Learning Tracks</div>
                <div className="tracks-t">Start Learning Today — All Free</div>
              </div>
              <button className="nav-donate">View All Courses</button>
            </div>
            <div className="tracks-grid">
              {tracks.map((t,i) => (
                <div key={i} className={`track ${t.cls}`}>
                  <div className="track-emoji">{t.emoji}</div>
                  <div className={`track-lvl lvl-${t.lvl.slice(0,3)}`}>{t.lvlLabel}</div>
                  <div className="track-name">{t.name}</div>
                  <div className="track-desc">{t.desc}</div>
                  <div className="track-meta">
                    <div className="track-meta-i">📚 {t.modules} modules</div>
                    <div className="track-meta-i">⏱ {t.hours}</div>
                    <div className="track-meta-i">🆓 Free</div>
                  </div>
                  {t.partner && <div className="track-partner">{t.partner}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* PROMPT LIBRARY */}
          <section ref={refs.plat.prompts} className="prompts-sec">
            <div className="prompts-hdr">
              <div style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10, fontFamily:"var(--F)" }}>Prompt Library</div>
              <h2 style={{ fontFamily:"var(--F)", fontSize:28, fontWeight:800, color:"white", marginBottom:8 }}>Ready-to-Use AI Prompts</h2>
              <p style={{ color:"rgba(255,255,255,0.48)", fontSize:15, maxWidth:540 }}>
                Copy and customize these prompts for your community work. No AI experience needed.
                Built specifically for First Nations community contexts.
              </p>
            </div>
            <div className="filters">
              {promptFilters.map(f => <button key={f} className={`fbtn ${filter===f?"on":"off"}`} onClick={() => setFilter(f)}>{f}</button>)}
            </div>
            <div className="prompts-grid">
              {filtered.map((p,i) => (
                <div key={i} className="pc">
                  <div className="pc-cat">{p.cat}</div>
                  <div className="pc-title">{p.title}</div>
                  <div className="pc-prev">"{p.prev}..."</div>
                  <button className="pc-copy" onClick={() => { setCopied(i); setTimeout(()=>setCopied(null),2000); }}>
                    {copied===i ? "✓ Copied!" : "⧉ Copy Prompt"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* AI CHATBOT */}
          <section ref={refs.plat.chat} className="chat-sec">
            <div className="chat-wrap">
              <div style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10, fontFamily:"var(--F)" }}>AI Learning Assistant</div>
              <h2 style={{ fontFamily:"var(--F)", fontSize:30, fontWeight:800, color:"white", marginBottom:8 }}>Ask anything about AI &amp; digital skills</h2>
              <p style={{ color:"rgba(255,255,255,0.48)", fontSize:15, marginBottom:26 }}>Powered by Claude API — grounded in FNTC courses, research, and community context.</p>
              <div className="chat-win">
                <div className="chat-msgs">
                  {msgs.map((m,i) => (
                    <div key={i} className={`msg ${m.r==="user"?"u":""}`}>
                      <div className={`av ${m.r==="ai"?"ai":"you"}`}>{m.r==="ai"?"AI":"You"}</div>
                      <div className={`bubble ${m.r==="ai"?"ai":"you"}`}>{m.t}</div>
                    </div>
                  ))}
                  {typing && <div className="msg"><div className="av ai">AI</div><div className="bubble ai"><div className="typing-row"><div className="dot"/><div className="dot"/><div className="dot"/></div></div></div>}
                  <div ref={msgEnd} />
                </div>
                <div className="chat-in">
                  <input className="chat-input" placeholder="Ask about courses, AI, data sovereignty, career paths..." value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} />
                  <button className="chat-send" onClick={()=>send()}>→</button>
                </div>
              </div>
              <div className="chat-sugg">
                {["What is AI?","Tell me about data sovereignty","Build my learning path","What's the Drone Stewardship course?"].map(s => (
                  <button key={s} className="sugg" onClick={()=>send(s)}>{s}</button>
                ))}
              </div>
            </div>
          </section>

          {/* PERSONALIZED PATH */}
          <section ref={refs.plat.path} className="path-sec">
            <div style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10, fontFamily:"var(--F)" }}>Personalized Learning</div>
            <h2 style={{ fontFamily:"var(--F)", fontSize:28, fontWeight:800, color:"white", marginBottom:8 }}>Build Your Learning Path</h2>
            <p style={{ color:"rgba(255,255,255,0.48)", fontSize:15, marginBottom:32 }}>Answer 3 quick questions and our AI will recommend a personalized course sequence.</p>
            <div className="path-builder">
              {[
                { q:"What best describes your role?", key:"role", opts:["Community Member","Band Staff / Administration","Elected Leader","Educator","Healthcare Worker","Youth (18-24)"] },
                { q:"How familiar are you with AI?", key:"level", opts:["Complete beginner","Heard of it but haven't used it","Used tools like ChatGPT a few times","Fairly comfortable with AI tools"] },
                { q:"What's your primary goal?", key:"goal", opts:["Save time at work","Protect my community's data","Build a career in tech","Understand AI risks & opportunities","Write better grant applications"] },
              ].map(({ q, key, opts }) => (
                <div key={key} className="path-step">
                  <div className="path-q">{q}</div>
                  <div className="path-opts">
                    {opts.map(o => <button key={o} className={`popt ${path[key]===o?"sel":""}`} onClick={()=>setPath(p=>({...p,[key]:o}))}>{o}</button>)}
                  </div>
                </div>
              ))}
              <button className="path-gen" onClick={genPath}>✦ Generate My Learning Path with AI</button>
              {pathResult && (
                <div className="path-result">
                  <div className="path-result-lbl">YOUR PERSONALIZED PATH — {path.role || "Learner"} · {path.level || "All Levels"}</div>
                  {pathResult.map((m,i) => (
                    <div key={i} className="path-mod">
                      <div className="path-num">{i+1}</div>
                      <div className="path-mname">{m.name}</div>
                      <div className="path-mtime">{m.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* PLATFORM FOOTER */}
          <div className="plat-footer">
            <div className="plat-f-l">© 2026 First Nations Technology Council · Digital Learning Platform (Demo)</div>
            <div className="plat-f-r">Built by <span>Haute-U AI Systems</span> · Powered by Claude API (Anthropic)</div>
          </div>
        </div>
      )}
    </>
  );
}
