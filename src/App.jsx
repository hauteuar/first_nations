import { useState, useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --navy:#0D2545;--navy-mid:#1A3D6B;--teal:#1B6CA8;
    --gold:#C8962E;--gold-l:#E8B84B;--cream:#FAF8F4;
    --white:#fff;--text:#1A2B3C;--muted:#5A7088;
    --border:rgba(13,37,69,0.1);--green:#2EA87A;
    --F:'Sora',sans-serif;--B:'DM Sans',sans-serif;
  }
  html{scroll-behavior:smooth}
  body{font-family:var(--B);background:var(--cream);color:var(--text);overflow-x:hidden}

  /* ── NAV ── */
  .nav{position:fixed;top:0;left:0;right:0;z-index:300;background:rgba(13,37,69,0.98);
    backdrop-filter:blur(16px);border-bottom:1px solid rgba(200,150,46,0.2);
    height:64px;display:flex;align-items:center;padding:0 40px;gap:24px}
  .nav-logo{display:flex;align-items:center;cursor:pointer;flex-shrink:0}
  .nav-logo img{height:34px;width:auto;filter:brightness(0) invert(1)}
  .nav-sep{width:1px;height:26px;background:rgba(255,255,255,0.12)}
  .nav-links{display:flex;align-items:center;gap:2px;flex:1}
  .nbtn{background:none;border:none;color:rgba(255,255,255,0.7);font-size:13px;font-weight:500;
    padding:6px 13px;border-radius:6px;cursor:pointer;font-family:var(--B);transition:all .18s;white-space:nowrap}
  .nbtn:hover{color:#fff;background:rgba(255,255,255,0.08)}
  .nbtn.active{color:var(--gold)}
  .nav-right{display:flex;align-items:center;gap:10px;margin-left:auto}
  .nav-plat{background:rgba(200,150,46,0.12);border:1px solid rgba(200,150,46,0.35);
    color:var(--gold-l);font-size:12px;font-weight:600;padding:5px 14px;border-radius:20px;
    cursor:pointer;font-family:var(--F);transition:all .2s;white-space:nowrap}
  .nav-plat:hover{background:rgba(200,150,46,0.22)}
  .nav-donate{background:var(--gold);color:var(--navy);font-weight:700;font-size:13px;
    padding:7px 18px;border-radius:6px;cursor:pointer;border:none;font-family:var(--F);transition:all .2s}
  .nav-donate:hover{background:var(--gold-l)}

  /* ── SWITCHER ── */
  .switcher{position:fixed;top:74px;left:50%;transform:translateX(-50%);z-index:299;
    background:var(--navy);border:1px solid rgba(200,150,46,0.25);border-radius:30px;
    padding:4px;display:flex;box-shadow:0 8px 32px rgba(0,0,0,0.35)}
  .sw{padding:6px 20px;border-radius:22px;font-size:12px;font-weight:700;cursor:pointer;
    border:none;font-family:var(--F);transition:all .22s;white-space:nowrap}
  .sw.on{background:var(--gold);color:var(--navy)}
  .sw.off{background:transparent;color:rgba(255,255,255,0.55)}
  .sw.off:hover{color:#fff}

  /* ── SHARED ── */
  .wrap{padding-top:64px}
  .lbl{font-family:var(--F);font-size:11px;font-weight:700;letter-spacing:.12em;color:var(--gold);text-transform:uppercase;margin-bottom:10px}
  .btn-gold{background:var(--gold);color:var(--navy);font-weight:700;font-size:14px;
    padding:11px 24px;border-radius:8px;cursor:pointer;border:none;font-family:var(--F);
    transition:all .2s;display:inline-flex;align-items:center;gap:8px}
  .btn-gold:hover{background:var(--gold-l);transform:translateY(-1px)}
  .btn-outline-d{background:rgba(255,255,255,0.08);color:#fff;font-weight:600;font-size:13px;
    padding:10px 22px;border-radius:8px;cursor:pointer;border:1px solid rgba(255,255,255,0.2);
    font-family:var(--F);transition:all .2s}
  .btn-outline-d:hover{background:rgba(255,255,255,0.14)}
  .btn-ghost{background:none;border:1px solid var(--border);color:var(--navy-mid);font-weight:600;
    font-size:13px;padding:9px 20px;border-radius:6px;cursor:pointer;font-family:var(--F);transition:all .2s}
  .btn-ghost:hover{border-color:var(--navy-mid);background:rgba(42,82,152,.06)}

  /* ══════════════════════════════════════
     MAIN SITE
  ══════════════════════════════════════ */
  .main{background:var(--cream)}
  .hero{background:var(--navy);min-height:88vh;display:grid;grid-template-columns:1fr 400px;
    gap:40px;align-items:center;padding:96px 72px 72px;position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(ellipse 55% 70% at 78% 50%,rgba(200,150,46,.07) 0%,transparent 65%)}
  .hero-welcome{font-family:var(--F);font-size:11px;font-weight:700;letter-spacing:.12em;
    color:var(--gold);text-transform:uppercase;margin-bottom:10px;animation:up .6s ease both}
  .hero-title{font-family:var(--F);font-size:clamp(36px,4.5vw,62px);font-weight:800;
    line-height:1.05;color:#fff;margin-bottom:18px;animation:up .6s .1s ease both}
  .hero-title span{color:var(--gold);display:block}
  .hero-sub{font-size:17px;color:rgba(255,255,255,.6);line-height:1.7;max-width:500px;
    margin-bottom:36px;animation:up .6s .2s ease both}
  .hero-btns{display:flex;gap:14px;flex-wrap:wrap;animation:up .6s .3s ease both}
  .hero-stats{display:flex;gap:40px;margin-top:56px;padding-top:44px;
    border-top:1px solid rgba(255,255,255,.1);animation:up .6s .4s ease both}
  .stat-n{font-family:var(--F);font-size:36px;font-weight:800;color:var(--gold)}
  .stat-l{font-size:12px;color:rgba(255,255,255,.45);margin-top:4px;line-height:1.4}
  .hero-card{animation:fadeL .8s .3s ease both}
  .hc{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
    border-radius:16px;padding:24px;backdrop-filter:blur(8px)}
  .hc-t{font-size:10px;font-weight:700;letter-spacing:.12em;color:rgba(255,255,255,.4);
    text-transform:uppercase;margin-bottom:16px}
  .hc-item{display:flex;align-items:center;gap:12px;padding:10px 13px;
    background:rgba(255,255,255,.04);border-radius:8px;margin-bottom:8px;
    border:1px solid rgba(255,255,255,.06);cursor:pointer;transition:all .2s}
  .hc-item:hover{background:rgba(255,255,255,.08);border-color:rgba(200,150,46,.3)}
  .hc-icon{font-size:18px;flex-shrink:0}
  .hc-name{font-size:13px;color:rgba(255,255,255,.82);font-weight:500}
  .hc-tag{font-size:10px;color:rgba(255,255,255,.38);margin-top:2px}
  .hc-dot{width:6px;height:6px;border-radius:50%;margin-left:auto;flex-shrink:0}
  .hc-dot.g{background:#48C78E;animation:pulse 2s infinite}
  .hc-dot.gold{background:var(--gold)}

  .territorial{background:rgba(200,150,46,.07);border-top:1px solid rgba(200,150,46,.15);
    border-bottom:1px solid rgba(200,150,46,.15);padding:13px 72px;font-size:13px;color:var(--muted)}
  .territorial strong{color:var(--text)}

  .sec{padding:80px 72px}
  .sec-w{background:#fff}
  .sec-c{background:var(--cream)}
  .sec-s{background:#EEF3F9}
  .sec-d{background:var(--navy)}
  .h2{font-family:var(--F);font-size:clamp(24px,3vw,40px);font-weight:800;line-height:1.1;color:var(--navy)}
  .h2-w{color:#fff}
  .p{font-size:16px;color:var(--muted);line-height:1.75}
  .p-w{color:rgba(255,255,255,.62)}

  .mandate-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
  .mc{display:flex;gap:14px;align-items:flex-start;padding:20px 22px;
    background:#fff;border:1px solid var(--border);border-radius:12px;margin-bottom:12px;transition:all .25s}
  .mc:hover{box-shadow:0 8px 28px rgba(13,37,69,.1);transform:translateX(4px)}
  .mc-icon{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,var(--navy),var(--teal));
    display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
  .mc-title{font-family:var(--F);font-weight:700;font-size:14px;color:var(--navy);margin-bottom:4px}
  .mc-body{font-size:13px;color:var(--muted);line-height:1.6}

  .impact{background:linear-gradient(135deg,var(--navy),var(--navy-mid));padding:64px 72px;
    display:grid;grid-template-columns:repeat(4,1fr);gap:32px}
  .impact-n{font-family:var(--F);font-size:46px;font-weight:800;color:var(--gold);line-height:1;text-align:center}
  .impact-l{font-size:13px;color:rgba(255,255,255,.55);margin-top:8px;line-height:1.4;text-align:center}

  .programs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
  .prog{background:#fff;border:1px solid var(--border);border-radius:14px;padding:28px;
    cursor:pointer;transition:all .25s;position:relative;overflow:hidden}
  .prog::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--navy),var(--teal))}
  .prog:hover{box-shadow:0 12px 40px rgba(13,37,69,.12);transform:translateY(-4px)}
  .prog-n{font-family:var(--F);font-size:11px;font-weight:700;color:var(--gold);letter-spacing:.1em;margin-bottom:14px}
  .prog-title{font-family:var(--F);font-weight:700;font-size:17px;color:var(--navy);margin-bottom:10px;line-height:1.3}
  .prog-body{font-size:13px;color:var(--muted);line-height:1.65}
  .prog-link{margin-top:18px;color:var(--teal);font-size:13px;font-weight:600}

  .news-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:32px}
  .news-card{background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden;cursor:pointer;transition:all .25s}
  .news-card:hover{box-shadow:0 10px 32px rgba(13,37,69,.1);transform:translateY(-3px)}
  .news-img{height:130px;display:flex;align-items:center;justify-content:center;font-size:40px}
  .news-body{padding:18px}
  .news-date{font-size:11px;color:var(--muted);margin-bottom:7px}
  .news-title{font-family:var(--F);font-weight:600;font-size:14px;color:var(--navy);line-height:1.4}
  .news-read{font-size:12px;color:var(--teal);font-weight:600;margin-top:10px}

  .footer{background:#071629;padding:52px 72px 32px;border-top:1px solid rgba(200,150,46,.15)}
  .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px}
  .f-logo img{height:32px;filter:brightness(0) invert(1);margin-bottom:14px}
  .f-tag{font-size:13px;color:rgba(255,255,255,.4);line-height:1.7;max-width:260px;margin-bottom:16px}
  .f-contact{font-size:13px;color:rgba(255,255,255,.45);line-height:1.8}
  .f-col-t{font-family:var(--F);font-size:10px;font-weight:700;letter-spacing:.12em;color:var(--gold);text-transform:uppercase;margin-bottom:14px}
  .f-link{display:block;color:rgba(255,255,255,.48);font-size:13px;margin-bottom:9px;cursor:pointer;transition:color .2s}
  .f-link:hover{color:#fff}
  .footer-bot{border-top:1px solid rgba(255,255,255,.07);padding-top:20px;display:flex;justify-content:space-between;align-items:center}
  .f-copy{font-size:11px;color:rgba(255,255,255,.28)}

  /* ══════════════════════════════════════
     LEARNING PLATFORM
  ══════════════════════════════════════ */
  .plat{background:#0C1520;min-height:100vh;padding-top:64px}
  .plat-hero{background:linear-gradient(135deg,#0C1520,#142236);padding:88px 72px 64px;position:relative;overflow:hidden}
  .plat-hero::before{content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse 50% 60% at 75% 50%,rgba(200,150,46,.07) 0%,transparent 70%);pointer-events:none}
  .plat-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(200,150,46,.1);
    border:1px solid rgba(200,150,46,.28);color:var(--gold-l);font-size:11px;font-weight:700;
    letter-spacing:.08em;padding:5px 14px;border-radius:20px;margin-bottom:20px;font-family:var(--F);width:fit-content}
  .plat-title{font-family:var(--F);font-size:clamp(32px,4vw,56px);font-weight:800;color:#fff;
    line-height:1.06;margin-bottom:16px;max-width:600px}
  .plat-title span{color:var(--gold)}
  .plat-sub{font-size:16px;color:rgba(255,255,255,.52);line-height:1.7;max-width:480px;margin-bottom:32px}
  .plat-search{display:flex;max-width:500px;background:rgba(255,255,255,.05);
    border:1px solid rgba(255,255,255,.1);border-radius:10px;overflow:hidden;margin-bottom:36px}
  .plat-search input{flex:1;background:none;border:none;outline:none;padding:12px 16px;
    color:#fff;font-size:14px;font-family:var(--B)}
  .plat-search input::placeholder{color:rgba(255,255,255,.28)}
  .plat-search-btn{background:var(--gold);color:var(--navy);border:none;padding:10px 20px;
    font-weight:700;font-size:13px;cursor:pointer;font-family:var(--F)}
  .plat-tags{display:flex;gap:8px;flex-wrap:wrap}
  .ptag{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:rgba(255,255,255,.6);
    font-size:12px;padding:6px 13px;border-radius:20px;cursor:pointer;transition:all .2s}
  .ptag:hover{background:rgba(200,150,46,.14);border-color:rgba(200,150,46,.38);color:var(--gold-l)}

  .tracks-sec{padding:64px 72px;background:#101D2D}
  .tracks-hdr{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px}
  .tracks-t{font-family:var(--F);font-size:24px;font-weight:800;color:#fff}
  .tracks-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .track{border-radius:14px;padding:24px;cursor:pointer;border:1px solid rgba(255,255,255,.06);
    transition:all .25s;position:relative;overflow:hidden}
  .t1{background:linear-gradient(135deg,#162D4F,#0C1929)}
  .t2{background:linear-gradient(135deg,#1A2D1A,#0F1E0F)}
  .t3{background:linear-gradient(135deg,#2A2010,#1A1408)}
  .t4{background:linear-gradient(135deg,#1E2030,#12141E)}
  .t5{background:linear-gradient(135deg,#2A1625,#1A0E18)}
  .t6{background:linear-gradient(135deg,#162828,#0C1818)}
  .track:hover{transform:translateY(-4px);box-shadow:0 14px 44px rgba(0,0,0,.5);border-color:rgba(200,150,46,.28)}
  .t-emoji{font-size:26px;margin-bottom:12px}
  .t-lvl{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
    padding:3px 8px;border-radius:4px;margin-bottom:10px;display:inline-block}
  .lvl-b{background:rgba(72,199,142,.18);color:#48C78E}
  .lvl-i{background:rgba(255,183,77,.18);color:#FFB74D}
  .lvl-a{background:rgba(255,100,100,.18);color:#FF7070}
  .t-name{font-family:var(--F);font-size:15px;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.3}
  .t-desc{font-size:12px;color:rgba(255,255,255,.48);line-height:1.6;margin-bottom:12px}
  .t-meta{display:flex;gap:12px}
  .t-mi{font-size:11px;color:rgba(255,255,255,.3)}
  .t-enroll{margin-top:14px;background:rgba(200,150,46,.15);border:1px solid rgba(200,150,46,.35);
    color:var(--gold-l);font-size:12px;font-weight:700;padding:7px 16px;border-radius:6px;
    cursor:pointer;font-family:var(--F);transition:all .2s;display:inline-block}
  .t-enroll:hover{background:rgba(200,150,46,.28)}

  /* ── COURSE DETAIL VIEW ── */
  .course-detail{min-height:100vh;background:#0C1520;padding-top:64px}
  .cd-back{padding:20px 72px 0;cursor:pointer;display:inline-flex;align-items:center;gap:8px;
    color:rgba(255,255,255,.5);font-size:13px;font-weight:600;transition:color .2s;
    font-family:var(--F)}
  .cd-back:hover{color:var(--gold)}
  .cd-hero{background:linear-gradient(135deg,#0D2545,#1B6CA8);padding:48px 72px 40px}
  .cd-breadcrumb{font-size:12px;color:rgba(255,255,255,.4);margin-bottom:16px;font-family:var(--F)}
  .cd-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(72,199,142,.15);
    border:1px solid rgba(72,199,142,.35);color:#48C78E;font-size:11px;font-weight:700;
    padding:4px 12px;border-radius:20px;margin-bottom:16px;font-family:var(--F)}
  .cd-title{font-family:var(--F);font-size:clamp(28px,3.5vw,48px);font-weight:800;color:#fff;
    line-height:1.1;margin-bottom:14px;max-width:700px}
  .cd-desc{font-size:16px;color:rgba(255,255,255,.65);line-height:1.7;max-width:580px;margin-bottom:28px}
  .cd-meta-row{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:32px}
  .cd-meta-item{display:flex;align-items:center;gap:7px;font-size:13px;color:rgba(255,255,255,.6)}
  .cd-meta-item span{color:#fff;font-weight:600}
  .cd-actions{display:flex;gap:12px;flex-wrap:wrap}

  .cd-body{display:grid;grid-template-columns:1fr 340px;gap:32px;padding:40px 72px;align-items:start}

  /* Modules list */
  .modules-panel{}
  .mod-section-label{font-family:var(--F);font-size:11px;font-weight:700;letter-spacing:.1em;
    color:var(--gold);text-transform:uppercase;margin-bottom:16px}
  .mod-item{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
    border-radius:12px;padding:16px 20px;margin-bottom:10px;cursor:pointer;transition:all .22s;
    display:flex;align-items:center;gap:14px}
  .mod-item:hover{background:rgba(255,255,255,.08);border-color:rgba(200,150,46,.3)}
  .mod-item.active{background:rgba(200,150,46,.12);border-color:rgba(200,150,46,.5)}
  .mod-item.locked{opacity:.5;cursor:not-allowed}
  .mod-item.done{border-color:rgba(72,199,142,.4)}
  .mod-num{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;
    justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;font-family:var(--F)}
  .mod-num.active{background:var(--gold);color:var(--navy)}
  .mod-num.done{background:rgba(72,199,142,.2);color:#48C78E}
  .mod-num.todo{background:rgba(255,255,255,.08);color:rgba(255,255,255,.5)}
  .mod-num.locked{background:rgba(255,255,255,.05);color:rgba(255,255,255,.25)}
  .mod-info{flex:1}
  .mod-name{font-size:14px;font-weight:600;color:#fff;margin-bottom:3px}
  .mod-item.locked .mod-name{color:rgba(255,255,255,.4)}
  .mod-sub{font-size:12px;color:rgba(255,255,255,.38)}
  .mod-dur{font-size:11px;color:rgba(255,255,255,.3);flex-shrink:0}
  .mod-check{color:#48C78E;font-size:16px;flex-shrink:0}

  /* Video/content player */
  .player{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
    border-radius:14px;overflow:hidden;margin-bottom:20px}
  .player-screen{background:linear-gradient(135deg,#0D1E30,#142236);aspect-ratio:16/9;
    display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer}
  .player-screen:hover .play-btn{transform:scale(1.1)}
  .play-btn{width:72px;height:72px;background:rgba(200,150,46,.9);border-radius:50%;
    display:flex;align-items:center;justify-content:center;font-size:28px;transition:all .2s}
  .player-overlay{position:absolute;bottom:0;left:0;right:0;padding:20px;
    background:linear-gradient(transparent,rgba(0,0,0,.7))}
  .player-title{color:#fff;font-family:var(--F);font-weight:700;font-size:16px;margin-bottom:4px}
  .player-sub{color:rgba(255,255,255,.5);font-size:12px}
  .player-controls{padding:14px 16px;display:flex;align-items:center;gap:12px;
    background:rgba(0,0,0,.2);border-top:1px solid rgba(255,255,255,.06)}
  .progress-bar{flex:1;height:4px;background:rgba(255,255,255,.1);border-radius:2px;overflow:hidden;cursor:pointer}
  .progress-fill{height:100%;background:var(--gold);border-radius:2px;transition:width .3s}
  .ctrl-btn{background:none;border:none;color:rgba(255,255,255,.6);font-size:16px;cursor:pointer;
    padding:4px;transition:color .2s}
  .ctrl-btn:hover{color:#fff}
  .ctrl-time{font-size:12px;color:rgba(255,255,255,.4);font-family:var(--F)}

  .player-content{padding:20px}
  .pc-title{font-family:var(--F);font-weight:700;font-size:16px;color:#fff;margin-bottom:10px}
  .pc-body{font-size:14px;color:rgba(255,255,255,.6);line-height:1.7}
  .pc-key-points{margin-top:16px}
  .pc-kp-label{font-size:11px;font-weight:700;color:var(--gold);letter-spacing:.08em;margin-bottom:10px;font-family:var(--F)}
  .pc-kp-item{display:flex;gap:10px;margin-bottom:8px;font-size:13px;color:rgba(255,255,255,.7)}
  .pc-kp-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);flex-shrink:0;margin-top:5px}
  .quiz-section{margin-top:20px;padding:20px;background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);border-radius:12px}
  .quiz-label{font-size:11px;font-weight:700;color:var(--gold);letter-spacing:.08em;margin-bottom:14px;font-family:var(--F)}
  .quiz-q{font-size:14px;font-weight:600;color:#fff;margin-bottom:14px}
  .quiz-opt{padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,.1);
    color:rgba(255,255,255,.7);font-size:13px;cursor:pointer;margin-bottom:8px;transition:all .2s}
  .quiz-opt:hover{border-color:rgba(200,150,46,.4);background:rgba(200,150,46,.08)}
  .quiz-opt.correct{border-color:#48C78E;background:rgba(72,199,142,.12);color:#48C78E}
  .quiz-opt.wrong{border-color:#FF7070;background:rgba(255,112,112,.08);color:#FF7070}
  .next-mod-btn{width:100%;background:var(--gold);color:var(--navy);border:none;padding:13px;
    border-radius:10px;font-weight:700;font-size:14px;cursor:pointer;font-family:var(--F);
    transition:all .2s;margin-top:16px}
  .next-mod-btn:hover{background:var(--gold-l)}

  /* Sidebar */
  .cd-sidebar{}
  .sidebar-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
    border-radius:14px;padding:24px;margin-bottom:16px}
  .sb-title{font-family:var(--F);font-weight:700;font-size:15px;color:#fff;margin-bottom:16px}
  .progress-ring-wrap{text-align:center;margin-bottom:20px}
  .progress-circle{position:relative;display:inline-block}
  .prog-num-big{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
    font-family:var(--F);font-size:22px;font-weight:800;color:var(--gold)}
  .prog-label{font-size:12px;color:rgba(255,255,255,.45);margin-top:8px}
  .sb-stat{display:flex;justify-content:space-between;align-items:center;
    padding:10px 0;border-bottom:1px solid rgba(255,255,255,.07)}
  .sb-stat:last-child{border-bottom:none}
  .sb-stat-l{font-size:13px;color:rgba(255,255,255,.5)}
  .sb-stat-v{font-size:13px;font-weight:600;color:#fff}
  .cert-preview{background:linear-gradient(135deg,var(--navy),var(--teal));border-radius:10px;
    padding:20px;text-align:center;margin-top:12px}
  .cert-icon{font-size:32px;margin-bottom:8px}
  .cert-title{font-family:var(--F);font-weight:700;font-size:13px;color:#fff;margin-bottom:4px}
  .cert-sub{font-size:11px;color:rgba(255,255,255,.5)}
  .instructor-card{display:flex;gap:12px;align-items:center;margin-bottom:16px}
  .instructor-avatar{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--navy),var(--teal));
    display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
  .instructor-name{font-weight:600;font-size:14px;color:#fff}
  .instructor-role{font-size:12px;color:rgba(255,255,255,.45)}

  /* Onboarding welcome banner */
  .onboard-banner{background:linear-gradient(135deg,rgba(13,37,69,.9),rgba(27,108,168,.8));
    border:1px solid rgba(200,150,46,.35);border-radius:14px;padding:24px 28px;margin:0 72px 32px;
    display:flex;align-items:center;gap:20px}
  .ob-icon{font-size:36px;flex-shrink:0}
  .ob-title{font-family:var(--F);font-weight:700;font-size:16px;color:#fff;margin-bottom:4px}
  .ob-body{font-size:13px;color:rgba(255,255,255,.6);line-height:1.5}
  .ob-dismiss{background:none;border:none;color:rgba(255,255,255,.4);font-size:18px;
    cursor:pointer;margin-left:auto;padding:4px;flex-shrink:0;transition:color .2s}
  .ob-dismiss:hover{color:#fff}

  /* ── PROMPTS ── */
  .prompts-sec{padding:64px 72px;background:#0C1520}
  .filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
  .fbtn{padding:6px 15px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;
    border:1px solid rgba(255,255,255,.1);font-family:var(--F);transition:all .18s}
  .fbtn.on{background:var(--gold);color:var(--navy);border-color:var(--gold)}
  .fbtn.off{background:transparent;color:rgba(255,255,255,.52)}
  .fbtn.off:hover{color:#fff;border-color:rgba(255,255,255,.28)}
  .prompts-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:13px}
  .pc{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;
    padding:18px 20px;cursor:pointer;transition:all .2s}
  .pc:hover{background:rgba(255,255,255,.06);border-color:rgba(200,150,46,.28)}
  .pc-cat{font-size:10px;font-weight:700;color:var(--gold);letter-spacing:.08em;margin-bottom:6px}
  .pc-title{font-weight:600;font-size:14px;color:#fff;margin-bottom:6px;line-height:1.4}
  .pc-prev{font-size:12px;color:rgba(255,255,255,.38);line-height:1.5;font-style:italic}
  .pc-copy{margin-top:10px;background:rgba(200,150,46,.12);border:1px solid rgba(200,150,46,.28);
    color:var(--gold-l);font-size:11px;font-weight:600;padding:5px 11px;border-radius:6px;
    cursor:pointer;font-family:var(--F);transition:all .2s;display:inline-flex;align-items:center;gap:5px}
  .pc-copy:hover{background:rgba(200,150,46,.22)}

  /* ── CHATBOT ── */
  .chat-sec{padding:64px 72px;background:#101D2D}
  .chat-wrap{max-width:680px;margin:0 auto}
  .chat-win{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden}
  .chat-msgs{padding:20px;min-height:280px;max-height:360px;overflow-y:auto;display:flex;flex-direction:column;gap:13px}
  .msg{display:flex;gap:10px;animation:up .28s ease}
  .msg.u{flex-direction:row-reverse}
  .av{width:28px;height:28px;border-radius:7px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;font-family:var(--F)}
  .av.ai{background:linear-gradient(135deg,var(--navy),var(--teal));color:var(--gold)}
  .av.you{background:var(--gold);color:var(--navy)}
  .bubble{max-width:80%;padding:10px 14px;border-radius:10px;font-size:14px;line-height:1.6;white-space:pre-line}
  .bubble.ai{background:rgba(255,255,255,.06);color:rgba(255,255,255,.85);border-radius:3px 10px 10px 10px}
  .bubble.you{background:var(--gold);color:var(--navy);font-weight:500;border-radius:10px 3px 10px 10px}
  .typing-row{display:flex;align-items:center;gap:4px;padding:8px 12px}
  .dot{width:5px;height:5px;background:rgba(255,255,255,.35);border-radius:50%;animation:bounce 1.1s infinite}
  .dot:nth-child(2){animation-delay:.18s}.dot:nth-child(3){animation-delay:.36s}
  .chat-in{display:flex;border-top:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.02)}
  .chat-input{flex:1;background:none;border:none;outline:none;padding:13px 16px;color:#fff;font-size:14px;font-family:var(--B)}
  .chat-input::placeholder{color:rgba(255,255,255,.22)}
  .chat-send{background:var(--gold);color:var(--navy);border:none;padding:11px 16px;font-size:17px;cursor:pointer;transition:all .2s}
  .chat-send:hover{background:var(--gold-l)}
  .chat-sugg{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
  .sugg{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);color:rgba(255,255,255,.58);
    font-size:12px;padding:6px 13px;border-radius:20px;cursor:pointer;transition:all .2s;font-family:var(--B)}
  .sugg:hover{background:rgba(200,150,46,.1);border-color:rgba(200,150,46,.32);color:var(--gold-l)}

  /* ═══════════════════════════════════════
     SANITY STUDIO — CMS ADMIN VIEW
  ═══════════════════════════════════════ */
  .cms{display:flex;height:100vh;padding-top:64px;background:#1A1A1A;font-family:var(--B)}

  /* Sidebar */
  .cms-sidebar{width:220px;background:#111;border-right:1px solid rgba(255,255,255,.08);
    flex-shrink:0;display:flex;flex-direction:column;overflow:hidden}
  .cms-brand{padding:20px 16px 14px;border-bottom:1px solid rgba(255,255,255,.08)}
  .cms-brand-title{font-family:var(--F);font-size:13px;font-weight:700;color:#fff;margin-bottom:2px}
  .cms-brand-sub{font-size:11px;color:rgba(255,255,255,.35)}
  .cms-nav{padding:12px 8px;flex:1;overflow-y:auto}
  .cms-nav-label{font-size:10px;font-weight:700;color:rgba(255,255,255,.3);letter-spacing:.1em;
    text-transform:uppercase;padding:8px 8px 6px;font-family:var(--F)}
  .cms-nav-item{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;
    cursor:pointer;transition:all .18s;margin-bottom:2px}
  .cms-nav-item:hover{background:rgba(255,255,255,.07)}
  .cms-nav-item.active{background:rgba(200,150,46,.15);border:1px solid rgba(200,150,46,.25)}
  .cms-nav-icon{font-size:15px;width:20px;text-align:center}
  .cms-nav-text{font-size:13px;color:rgba(255,255,255,.7);font-weight:500}
  .cms-nav-item.active .cms-nav-text{color:var(--gold)}
  .cms-nav-badge{background:var(--gold);color:var(--navy);font-size:10px;font-weight:700;
    padding:2px 6px;border-radius:8px;margin-left:auto;font-family:var(--F)}

  /* Main area */
  .cms-main{flex:1;display:flex;flex-direction:column;overflow:hidden}
  .cms-topbar{background:#1A1A1A;border-bottom:1px solid rgba(255,255,255,.08);
    padding:0 24px;height:52px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
  .cms-topbar-title{font-family:var(--F);font-weight:700;font-size:15px;color:#fff}
  .cms-topbar-actions{display:flex;gap:8px;align-items:center}
  .cms-btn{padding:7px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;
    border:none;font-family:var(--F);transition:all .2s}
  .cms-btn.primary{background:var(--gold);color:var(--navy)}
  .cms-btn.primary:hover{background:var(--gold-l)}
  .cms-btn.secondary{background:rgba(255,255,255,.08);color:rgba(255,255,255,.8);border:1px solid rgba(255,255,255,.1)}
  .cms-btn.secondary:hover{background:rgba(255,255,255,.14)}
  .cms-btn.danger{background:rgba(255,80,80,.1);color:#FF6464;border:1px solid rgba(255,80,80,.2)}
  .cms-content{flex:1;overflow-y:auto;padding:0}

  /* Course list */
  .cms-list{padding:20px 24px}
  .cms-list-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
  .cms-search{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 14px;flex:1;max-width:360px}
  .cms-search input{background:none;border:none;outline:none;color:#fff;font-size:13px;flex:1;font-family:var(--B)}
  .cms-search input::placeholder{color:rgba(255,255,255,.3)}
  .cms-table{width:100%;border-collapse:collapse}
  .cms-table th{text-align:left;padding:10px 14px;font-size:11px;font-weight:700;color:rgba(255,255,255,.4);
    letter-spacing:.08em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.08);font-family:var(--F)}
  .cms-table td{padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.05);vertical-align:middle}
  .cms-table tr:hover td{background:rgba(255,255,255,.03)}
  .cms-table tr.selected td{background:rgba(200,150,46,.05)}
  .cms-course-title{font-size:14px;font-weight:600;color:#fff}
  .cms-course-sub{font-size:12px;color:rgba(255,255,255,.4);margin-top:2px}
  .status-badge{font-size:11px;font-weight:700;padding:3px 9px;border-radius:4px;font-family:var(--F)}
  .status-pub{background:rgba(72,199,142,.15);color:#48C78E}
  .status-draft{background:rgba(255,183,77,.15);color:#FFB74D}
  .status-arch{background:rgba(255,255,255,.08);color:rgba(255,255,255,.4)}
  .cms-action-btns{display:flex;gap:6px}
  .cms-icon-btn{background:rgba(255,255,255,.06);border:none;color:rgba(255,255,255,.6);
    padding:6px 10px;border-radius:6px;cursor:pointer;font-size:13px;transition:all .2s;font-family:var(--B)}
  .cms-icon-btn:hover{background:rgba(255,255,255,.12);color:#fff}

  /* Course editor */
  .cms-editor{display:flex;height:100%;overflow:hidden}
  .cms-form-panel{flex:1;overflow-y:auto;padding:24px;border-right:1px solid rgba(255,255,255,.08)}
  .cms-preview-panel{width:320px;overflow-y:auto;padding:20px;flex-shrink:0;background:#141414}
  .field-group{margin-bottom:24px}
  .field-label{font-size:12px;font-weight:600;color:rgba(255,255,255,.6);margin-bottom:8px;
    display:flex;align-items:center;gap:6px;font-family:var(--F)}
  .field-required{color:#FF7070;font-size:11px}
  .field-hint{font-size:11px;color:rgba(255,255,255,.3);margin-top:5px}
  .cms-input{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
    border-radius:8px;padding:10px 14px;color:#fff;font-size:14px;font-family:var(--B);
    outline:none;transition:all .2s}
  .cms-input:focus{border-color:rgba(200,150,46,.5);background:rgba(255,255,255,.08)}
  .cms-input::placeholder{color:rgba(255,255,255,.25)}
  .cms-textarea{resize:vertical;min-height:90px;line-height:1.6}
  .cms-select{appearance:none;cursor:pointer}
  .cms-select option{background:#222;color:#fff}
  .field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .cms-tag-input{display:flex;flex-wrap:wrap;gap:8px;background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;min-height:44px;
    align-items:center;cursor:text}
  .cms-tag{background:rgba(200,150,46,.2);color:var(--gold-l);font-size:12px;padding:3px 8px;
    border-radius:4px;display:flex;align-items:center;gap:5px;font-family:var(--F)}
  .cms-tag-x{cursor:pointer;opacity:.6;font-size:14px;line-height:1}
  .cms-tag-x:hover{opacity:1}
  .cms-tag-in{background:none;border:none;outline:none;color:#fff;font-size:13px;
    font-family:var(--B);min-width:80px;flex:1}

  /* Module builder */
  .module-builder{margin-top:8px}
  .mod-builder-item{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
    border-radius:10px;padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;
    cursor:grab;transition:all .2s}
  .mod-builder-item:hover{border-color:rgba(200,150,46,.3)}
  .mod-drag{color:rgba(255,255,255,.2);font-size:16px;cursor:grab}
  .mod-builder-num{width:26px;height:26px;border-radius:50%;background:rgba(200,150,46,.15);
    display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;
    color:var(--gold-l);flex-shrink:0;font-family:var(--F)}
  .mod-builder-name{flex:1;font-size:13px;color:rgba(255,255,255,.8)}
  .mod-builder-type{font-size:11px;color:rgba(255,255,255,.3);margin-top:2px}
  .mod-builder-del{background:none;border:none;color:rgba(255,255,255,.25);
    cursor:pointer;font-size:14px;padding:4px;transition:color .2s}
  .mod-builder-del:hover{color:#FF7070}
  .add-module-btn{width:100%;background:rgba(255,255,255,.04);border:1px dashed rgba(255,255,255,.12);
    border-radius:10px;padding:12px;color:rgba(255,255,255,.4);font-size:13px;cursor:pointer;
    transition:all .2s;font-family:var(--B)}
  .add-module-btn:hover{border-color:rgba(200,150,46,.35);color:var(--gold-l);background:rgba(200,150,46,.05)}

  /* Live preview */
  .cms-preview-label{font-size:11px;font-weight:700;color:rgba(255,255,255,.35);
    letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px;font-family:var(--F)}
  .preview-card{background:linear-gradient(135deg,#162D4F,#0C1929);border-radius:12px;
    padding:20px;border:1px solid rgba(255,255,255,.08)}
  .preview-emoji{font-size:28px;margin-bottom:10px}
  .preview-lvl{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
    padding:3px 8px;border-radius:4px;display:inline-block;margin-bottom:8px}
  .preview-title{font-family:var(--F);font-size:15px;font-weight:700;color:#fff;margin-bottom:6px;line-height:1.3}
  .preview-desc{font-size:12px;color:rgba(255,255,255,.48);line-height:1.6;margin-bottom:12px}
  .preview-meta{display:flex;gap:12px}
  .preview-mi{font-size:11px;color:rgba(255,255,255,.3)}
  .save-indicator{position:fixed;bottom:24px;right:24px;background:var(--green);color:#fff;
    font-size:13px;font-weight:600;padding:10px 20px;border-radius:8px;font-family:var(--F);
    animation:fadeUp .3s ease;z-index:1000;display:flex;align-items:center;gap:8px}

  /* plat footer */
  .plat-footer{background:#070E17;padding:28px 72px;border-top:1px solid rgba(255,255,255,.05);
    display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}
  .plat-f{font-size:12px;color:rgba(255,255,255,.28)}
  .plat-f span{color:var(--gold)}

  /* optional banner */
  .optional-banner{background:rgba(200,150,46,.08);border:1px solid rgba(200,150,46,.25);
    border-radius:10px;padding:10px 16px;margin-bottom:24px;display:flex;align-items:center;gap:10px}
  .ob-text{font-size:13px;color:rgba(255,255,255,.6)}
  .ob-text strong{color:var(--gold-l)}

  /* ── ACCESSIBILITY ── */
  .skip-link{position:fixed;top:-100px;left:16px;z-index:9999;background:var(--gold);
    color:var(--navy);font-weight:700;font-size:14px;padding:10px 20px;border-radius:8px;
    font-family:var(--F);text-decoration:none;transition:top .2s}
  .skip-link:focus{top:16px}
  :focus-visible{outline:3px solid var(--gold) !important;outline-offset:3px !important;border-radius:4px}
  :focus:not(:focus-visible){outline:none}
  .t-desc{color:rgba(255,255,255,.62) !important}
  .t-mi{color:rgba(255,255,255,.5) !important}
  .mod-sub{color:rgba(255,255,255,.55) !important}
  .mod-dur{color:rgba(255,255,255,.5) !important}
  .plat-f{color:rgba(255,255,255,.5) !important}
  .hc-tag{color:rgba(255,255,255,.55) !important}
  .f-copy{color:rgba(255,255,255,.45) !important}
  .a11y-bar{background:linear-gradient(135deg,rgba(13,37,69,.98),rgba(27,108,168,.85));
    border-bottom:1px solid rgba(200,150,46,.25);padding:11px 72px;
    display:flex;align-items:center;gap:16px;flex-wrap:wrap}
  .a11y-bar-title{font-family:var(--F);font-size:11px;font-weight:700;color:var(--gold);
    letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
  .a11y-badges{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
  .a11y-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.07);
    border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.8);font-size:11px;
    font-weight:600;padding:4px 11px;border-radius:20px;font-family:var(--F);white-space:nowrap}
  .a11y-badge.green{background:rgba(46,168,122,.15);border-color:rgba(46,168,122,.4);color:#48C78E}
  .a11y-badge.gold{background:rgba(200,150,46,.15);border-color:rgba(200,150,46,.4);color:var(--gold-l)}
  .a11y-badge.blue{background:rgba(27,108,168,.2);border-color:rgba(27,108,168,.4);color:#6AB4F5}
  .a11y-sep{width:1px;height:18px;background:rgba(255,255,255,.1)}
  .a11y-bar-note{font-size:11px;color:rgba(255,255,255,.45);margin-left:auto}
  .quiz-opt.correct::before{content:"✓  "}
  .quiz-opt.wrong::before{content:"✗  "}
  .mod-item.locked{cursor:not-allowed}
  .mod-item.locked .mod-name{color:rgba(255,255,255,.35) !important}
  @media(prefers-reduced-motion:reduce){
    *{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important}
  }
  @media(forced-colors:active){
    .a11y-badge,.nav-plat,.nav-donate,.btn-gold{border:2px solid ButtonText}
  }

  /* ANIMATIONS */
  @keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeL{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
  @keyframes bounce{0%,60%,100%{transform:translateY(0);opacity:.38}30%{transform:translateY(-6px);opacity:1}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px}
`;

// ── DATA ─────────────────────────────────────────────────────────────────────
const LOGO = "https://www.technologycouncil.ca/wp-content/uploads/2026/02/Technology-Council-Logo-Monochrome.svg";

const tracks = [
  { id:1, emoji:"🤖", lvl:"beginner", lvlLabel:"Beginner", name:"Artificial Intelligence Foundations",
    desc:"Understand what AI is, how it works, and how it's already shaping life in First Nations communities.",
    modules:6, hours:"4 hrs", cls:"t1", partner:null,
    instructor:"Kim Henderson", instrRole:"Director, Digital Skills & Career Development",
    longDesc:"This course provides a practical, jargon-free introduction to artificial intelligence designed specifically for First Nations community members. You don't need any technical background — just curiosity and a willingness to explore how AI might serve your community.",
    mods:[
      {name:"What Is Artificial Intelligence?", type:"Video + Reading", dur:"35 min", done:true},
      {name:"How AI Uses Data — and Your Data", type:"Video + Quiz", dur:"40 min", done:true},
      {name:"AI Tools You Can Use Today", type:"Hands-on Lab", dur:"45 min", done:false, active:true},
      {name:"AI in Indigenous Community Contexts", type:"Video + Discussion", dur:"35 min", done:false},
      {name:"Recognising Bias in AI Systems", type:"Video + Reading", dur:"40 min", done:false},
      {name:"Building Your AI Action Plan", type:"Workshop", dur:"45 min", done:false, locked:true},
    ],
    keyPoints:["AI is pattern recognition — not magic or thinking","Your data has value; you have the right to know how it's used","AI tools like Claude, ChatGPT, and Copilot are already accessible and free","Bias in AI comes from biased training data — always question outputs"],
    quiz:{q:"Which OCAP principle relates to who decides how your community's data is used?", opts:["Ownership","Control","Access","Possession"], correct:1}
  },
  { id:2, emoji:"⚡", lvl:"beginner", lvlLabel:"Beginner", name:"Digital Transformation Foundations",
    desc:"Build practical digital skills for everyday work and community life, grounded in Indigenous values.",
    modules:8, hours:"5 hrs", cls:"t2", partner:null,
    instructor:"FNTC Training Team", instrRole:"Digital Skills Instructors",
    longDesc:"A practical course covering the digital tools and workflows that make everyday community work easier — from cloud collaboration to digital communications and online safety.",
    mods:[
      {name:"Navigating the Digital Landscape", type:"Video", dur:"30 min", done:false, active:true},
      {name:"Cloud Tools for Community Work", type:"Hands-on Lab", dur:"45 min", done:false},
      {name:"Online Safety and Privacy", type:"Video + Quiz", dur:"40 min", done:false},
      {name:"Digital Communications", type:"Video", dur:"35 min", done:false},
      {name:"Working with Documents Online", type:"Hands-on Lab", dur:"50 min", done:false, locked:true},
    ],
    keyPoints:["Cloud tools let your team collaborate across remote distances","Strong passwords and 2FA are your first line of defence","Your community's digital footprint matters — learn to manage it"],
    quiz:{q:"What does 2FA stand for?", opts:["Two-Factor Authentication","Two-File Access","Trusted Folder Access","Two-Form Application"], correct:0}
  },
  { id:3, emoji:"📊", lvl:"intermediate", lvlLabel:"Intermediate", name:"Data Analytics Focus",
    desc:"Learn to work with data — collecting, analyzing, and visualizing it to support community decisions.",
    modules:10, hours:"8 hrs", cls:"t3", partner:"With BrainStation",
    instructor:"BrainStation Instructors", instrRole:"Certified Data Analytics Educators",
    longDesc:"An intermediate course covering data collection, cleaning, analysis, and visualization using accessible tools. Built in partnership with BrainStation for First Nations learners.",
    mods:[
      {name:"Introduction to Data Thinking", type:"Video", dur:"40 min", done:false, active:true},
      {name:"Collecting Community Data Responsibly", type:"Video + Reading", dur:"45 min", done:false},
      {name:"Working with Spreadsheets", type:"Hands-on Lab", dur:"60 min", done:false},
      {name:"Data Visualization Basics", type:"Hands-on Lab", dur:"55 min", done:false, locked:true},
    ],
    keyPoints:["Data collected from communities should be governed by those communities","Spreadsheets are the entry point — master them before dashboards","Visualizations tell stories — make sure yours tell the truth"],
    quiz:{q:"Which OCAP principle is most directly about community members being able to see their own data?", opts:["Ownership","Control","Access","Possession"], correct:2}
  },
  { id:4, emoji:"🔐", lvl:"intermediate", lvlLabel:"Intermediate", name:"Cybersecurity",
    desc:"Protect your community's digital assets. Understand threats, secure networks, and build resilience.",
    modules:12, hours:"10 hrs", cls:"t4", partner:"With BrainStation",
    instructor:"BrainStation Instructors", instrRole:"Certified Cybersecurity Educators",
    longDesc:"A practical cybersecurity course covering threat identification, network security, incident response, and building a security-first culture within your organization.",
    mods:[
      {name:"Understanding Cyber Threats", type:"Video", dur:"45 min", done:false, active:true},
      {name:"Securing Your Organisation's Accounts", type:"Hands-on Lab", dur:"50 min", done:false},
      {name:"Network Security Fundamentals", type:"Video + Quiz", dur:"55 min", done:false, locked:true},
    ],
    keyPoints:["Phishing is the #1 entry point for attacks — learn to spot it","Password managers reduce human error dramatically","A security incident response plan is as important as the prevention measures"],
    quiz:{q:"What is the most common way attackers gain access to an organisation's systems?", opts:["Hacking the server directly","Phishing emails","Guessing passwords","USB drives"], correct:1}
  },
  { id:5, emoji:"🚁", lvl:"advanced", lvlLabel:"Advanced", name:"Drone Stewardship",
    desc:"Learn responsible drone operation for environmental monitoring, land management, and community use.",
    modules:8, hours:"7 hrs", cls:"t5", partner:null,
    instructor:"FNTC Drone Program Team", instrRole:"Transport Canada Certified Instructors",
    longDesc:"Covering the full spectrum of drone use for Indigenous land stewardship — from regulatory requirements to practical flight operations, environmental monitoring, and community governance of aerial data.",
    mods:[
      {name:"Introduction to Drone Technology", type:"Video", dur:"40 min", done:false, active:true},
      {name:"Transport Canada Regulations", type:"Video + Quiz", dur:"50 min", done:false},
      {name:"Flight Planning and Safety", type:"Simulation", dur:"60 min", done:false, locked:true},
    ],
    keyPoints:["Transport Canada requires drone registration for most use cases","Airspace awareness is critical — always check NOTAMs","Data collected by drones over traditional territories is community data"],
    quiz:{q:"Under Transport Canada rules, which drone weight requires registration?", opts:["Over 100g","Over 250g","Over 500g","Over 1kg"], correct:1}
  },
  { id:6, emoji:"🎨", lvl:"advanced", lvlLabel:"Advanced", name:"UX Design",
    desc:"Design digital experiences that are accessible, community-informed, and rooted in Indigenous perspectives.",
    modules:14, hours:"12 hrs", cls:"t6", partner:"With BrainStation",
    instructor:"BrainStation UX Faculty", instrRole:"Certified UX Design Educators",
    longDesc:"A comprehensive UX design course covering research, wireframing, prototyping, and accessibility — with a specific module on designing for Indigenous community contexts.",
    mods:[
      {name:"Introduction to User Experience Design", type:"Video", dur:"45 min", done:false, active:true},
      {name:"Research Methods for Community Contexts", type:"Video + Workshop", dur:"60 min", done:false},
      {name:"Wireframing and Prototyping", type:"Hands-on Lab", dur:"75 min", done:false, locked:true},
    ],
    keyPoints:["Good design starts with deep user research — not assumptions","Accessibility is not a feature, it's a foundation","Indigenous UX requires understanding cultural context, not just usability heuristics"],
    quiz:{q:"What is the first step in a user-centred design process?", opts:["Wireframing","Prototyping","User research","Visual design"], correct:2}
  },
];

const cmsCoursesInit = [
  { id:1, title:"Artificial Intelligence Foundations", tier:"Foundations", status:"published", learners:342, updated:"Feb 14, 2026" },
  { id:2, title:"Digital Transformation Foundations", tier:"Foundations", status:"published", learners:218, updated:"Jan 28, 2026" },
  { id:3, title:"Data Analytics Focus", tier:"Focus", status:"published", learners:156, updated:"Feb 2, 2026" },
  { id:4, title:"Cybersecurity", tier:"Futures", status:"published", learners:89, updated:"Feb 10, 2026" },
  { id:5, title:"Drone Stewardship", tier:"Futures", status:"draft", learners:0, updated:"Feb 20, 2026" },
  { id:6, title:"UX Design", tier:"Futures", status:"published", learners:72, updated:"Jan 15, 2026" },
];

const aiAnswers = {
  default:"Tansi! I'm the FNTC Learning Assistant. I can help you find the right course, explain AI concepts, or build a personalized learning path. What would you like to explore?",
  ai:"Great question! Artificial Intelligence means computer systems that can do things normally requiring human thinking — like understanding language or making recommendations.\n\nFNTC offers **AI Foundations** (beginner, free, 4 hrs) and **AI Focus** (intermediate). Both are Indigenous-designed and free. Would you like to start there?",
  data:"Data sovereignty means your Nation has the right to decide how your community's data is collected, stored, used, and shared.\n\nFNTC follows **OCAP® principles** — Ownership, Control, Access, and Possession — in all our research and digital systems. Our Digital Transformation course covers practical applications of these principles.",
  path:"Here's a recommended starting path:\n\n1. **AI Foundations** (4 hrs) — Build your foundation\n2. **Digital Transformation Foundations** (5 hrs) — Practical everyday skills\n3. **Cybersecurity** (10 hrs) — Protect your community's data\n\nAll three are free and self-paced. Ready to get started?",
  drone:"Drone Stewardship is one of our most popular Futures programs! It covers responsible drone operation, environmental monitoring, land stewardship, and Transport Canada regulations.\n\nFree to Indigenous Peoples in BC, 18+. Applications open for Spring 2026.",
};

const prompts = [
  {cat:"Grant Writing",title:"Technology funding proposal introduction",prev:"Write a compelling introduction for a grant application for a digital literacy program that serves..."},
  {cat:"Community Communication",title:"Newsletter about new digital programs",prev:"Write a friendly community newsletter announcing our new technology training program available to..."},
  {cat:"Data & Privacy",title:"Explain data sovereignty to your council",prev:"Write a plain-language explanation of data sovereignty and OCAP principles to present to..."},
  {cat:"AI at Work",title:"Summarize a government policy document",prev:"Summarize the following document and highlight the key points that affect First Nations digital..."},
  {cat:"Grant Writing",title:"Write measurable project outcomes",prev:"Help me articulate 4-5 measurable outcomes for a digital literacy program that will be..."},
  {cat:"Community Communication",title:"Translate technical language to plain English",prev:"Rewrite the following technical content in plain language for community members who are new to..."},
  {cat:"AI at Work",title:"Compare two AI tools for community use",prev:"Compare [Tool A] and [Tool B] for use by a First Nations organization. Consider ease of use..."},
  {cat:"Data & Privacy",title:"Data governance policy draft",prev:"Draft a simple data governance policy for a First Nations organization covering data collection..."},
];

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [site, setSite]           = useState("main");  // main | plat | cms
  const [platView, setPlatView]   = useState("home");  // home | course | detail
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [showOnboard, setShowOnboard] = useState(true);
  const [progress, setProgress]   = useState(40);     // video progress %
  const [filter, setFilter]       = useState("All");
  const [msgs, setMsgs]           = useState([{r:"ai",t:aiAnswers.default}]);
  const [inp, setInp]             = useState("");
  const [typing, setTyping]       = useState(false);
  const [copied, setCopied]       = useState(null);

  // navigation helpers
  const [activeMainLink,setActiveMainLink] = useState("About");
  const [activePlatLink,setActivePlatLink]   = useState("Courses");
  const scrollToId = id => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth'});
  };
  const handleMainNav = label => {
    setActiveMainLink(label);
    switch(label) {
      case "About":
        scrollToId('about');
        break;
      case "Learn":
        setSite('plat');
        setPlatView('home');
        window.scrollTo({top:0,behavior:'smooth'});
        break;
      case "Research":
        scrollToId('research');
        break;
      case "News":
        scrollToId('news');
        break;
      case "Our Community":
        scrollToId('community');
        break;
      default:
        break;
    }
  };
  const handlePlatNav = label => {
    setActivePlatLink(label);
    switch(label) {
      case "Courses":
        scrollToId('tracks');
        break;
      case "Prompt Library":
        scrollToId('prompts');
        break;
      case "AI Assistant":
        scrollToId('assistant');
        break;
      case "My Path":
        alert('My Learning Path is coming soon!');
        break;
      default:
        break;
    }
  };

  // CMS state
  const [cmsView, setCmsView]     = useState("list");  // list | editor
  const [cmsCourses, setCmsCourses] = useState(cmsCoursesInit);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [cmsNav, setCmsNav]       = useState("courses");
  const [newTag, setNewTag]       = useState("");
  const [formData, setFormData]   = useState({
    title:"", tier:"Foundations", level:"beginner", emoji:"🤖",
    shortDesc:"", longDesc:"", hours:"", partner:"", status:"draft",
    tags:[], modules:[
      {name:"Introduction & Welcome", type:"Video"},
      {name:"Core Concepts", type:"Video + Reading"},
      {name:"Hands-on Practice", type:"Hands-on Lab"},
    ]
  });

  const msgEnd = useRef();
  useEffect(() => { msgEnd.current?.scrollIntoView({behavior:"smooth"}); }, [msgs, typing]);

  const switchSite = (s) => { setSite(s); window.scrollTo({top:0,behavior:"smooth"}); };
  const openCourse = (course) => { setSelectedCourse(course); setActiveModule(0); setQuizAnswer(null); setPlatView("detail"); window.scrollTo({top:0,behavior:"smooth"}); };

  const sendMsg = (text) => {
    const m = text||inp.trim(); if(!m) return;
    setInp(""); setMsgs(p=>[...p,{r:"user",t:m}]); setTyping(true);
    const lo = m.toLowerCase();
    let ans = aiAnswers.default;
    if(lo.includes("ai")||lo.includes("artificial")) ans = aiAnswers.ai;
    else if(lo.includes("data")||lo.includes("sovereignty")||lo.includes("ocap")) ans = aiAnswers.data;
    else if(lo.includes("path")||lo.includes("start")||lo.includes("course")) ans = aiAnswers.path;
    else if(lo.includes("drone")) ans = aiAnswers.drone;
    setTimeout(()=>{ setTyping(false); setMsgs(p=>[...p,{r:"ai",t:ans}]); }, 1300);
  };

  const saveForm = () => {
    if(editingCourse) {
      setCmsCourses(p => p.map(c => c.id===editingCourse.id
        ? {...c, title:formData.title||c.title, tier:formData.tier, status:formData.status, updated:"Feb 28, 2026"} : c));
    } else {
      const newId = Math.max(...cmsCourses.map(c=>c.id))+1;
      setCmsCourses(p=>[...p,{id:newId,title:formData.title||"Untitled Course",
        tier:formData.tier,status:formData.status,learners:0,updated:"Feb 28, 2026"}]);
    }
    setShowSaved(true); setTimeout(()=>setShowSaved(false),2500);
    setCmsView("list"); setEditingCourse(null);
  };

  const openEditor = (course=null) => {
    setEditingCourse(course);
    if(course) {
      setFormData({...formData, title:course.title, tier:course.tier, status:course.status});
    } else {
      setFormData({title:"",tier:"Foundations",level:"beginner",emoji:"🤖",shortDesc:"",longDesc:"",
        hours:"",partner:"",status:"draft",tags:[],
        modules:[{name:"Introduction & Welcome",type:"Video"},{name:"Core Concepts",type:"Video + Reading"},{name:"Hands-on Practice",type:"Hands-on Lab"}]});
    }
    setCmsView("editor");
  };

  const addModule = () => setFormData(p=>({...p, modules:[...p.modules,{name:"New Module",type:"Video"}]}));
  const removeModule = (i) => setFormData(p=>({...p, modules:p.modules.filter((_,idx)=>idx!==i)}));
  const addTag = (e) => {
    if(e.key==="Enter"&&newTag.trim()) {
      setFormData(p=>({...p,tags:[...p.tags,newTag.trim()]}));
      setNewTag("");
    }
  };
  const removeTag = (i) => setFormData(p=>({...p,tags:p.tags.filter((_,idx)=>idx!==i)}));

  const course = selectedCourse ? tracks.find(t=>t.id===selectedCourse) : null;
  const filteredPrompts = filter==="All" ? prompts : prompts.filter(p=>p.cat===filter);
  const completedMods = course ? course.mods.filter(m=>m.done).length : 0;

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>

      <a className="skip-link" href="#main-content">Skip to main content</a>

      {/* NAV */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-logo" onClick={()=>{ switchSite("main"); setPlatView("home"); }}
          role="button" tabIndex={0} aria-label="First Nations Technology Council — go to homepage"
          onKeyDown={e=>e.key==="Enter"&&(switchSite("main"),setPlatView("home"))}>
          <img src={LOGO} alt="First Nations Technology Council" onError={e=>e.target.style.display="none"} />
        </div>
        <div className="nav-sep" />
        {site==="main" && <div className="nav-links" role="list">
          <button
            className={`nbtn ${activeMainLink==="About"?"active":""}`}
            role="listitem" aria-label="About FNTC"
            onClick={()=>handleMainNav("About")}
          >About</button>
          <button
            className={`nbtn ${activeMainLink==="Learn"?"active":""}`}
            role="listitem" aria-label="Learn — courses and training"
            onClick={()=>handleMainNav("Learn")}
          >Learn</button>
          <button
            className={`nbtn ${activeMainLink==="Research"?"active":""}`}
            role="listitem" aria-label="Research publications"
            onClick={()=>handleMainNav("Research")}
          >Research</button>
          <button
            className={`nbtn ${activeMainLink==="News"?"active":""}`}
            role="listitem" aria-label="News and stories"
            onClick={()=>handleMainNav("News")}
          >News</button>
          <button
            className={`nbtn ${activeMainLink==="Our Community"?"active":""}`}
            role="listitem" aria-label="Our Community programs"
            onClick={()=>handleMainNav("Our Community")}
          >Our Community</button>
        </div>}
        {site==="plat" && <div className="nav-links" role="list">
          <button
            className={`nbtn ${activePlatLink==="Courses"?"active":""}`}
            role="listitem" onClick={()=>handlePlatNav("Courses")} aria-label="View all courses"
          >Courses</button>
          <button
            className={`nbtn ${activePlatLink==="Prompt Library"?"active":""}`}
            role="listitem" onClick={()=>handlePlatNav("Prompt Library")} aria-label="Prompt Library"
          >Prompt Library</button>
          <button
            className={`nbtn ${activePlatLink==="AI Assistant"?"active":""}`}
            role="listitem" onClick={()=>handlePlatNav("AI Assistant")} aria-label="AI Learning Assistant"
          >AI Assistant</button>
          <button
            className={`nbtn ${activePlatLink==="My Path"?"active":""}`}
            role="listitem" onClick={()=>handlePlatNav("My Path")} aria-label="My Learning Path"
          >My Path</button>
        </div>}
        {site==="cms" && <div className="nav-links">
          <button className="nbtn" style={{color:"var(--gold-l)"}} aria-current="page">⚙ Sanity Studio — Content Management</button>
        </div>}
        <div className="nav-right">
          {site==="main" && <button className="nav-plat" onClick={()=>switchSite("plat")}>✦ Learning Platform</button>}
          {site==="plat" && <button className="nav-plat" onClick={()=>switchSite("main")}>← Main Site</button>}
          {site==="cms" && <button className="nav-plat" onClick={()=>switchSite("plat")}>← Learning Platform</button>}
          <button className="nav-donate">{site==="cms" ? "🌐 View Live Site" : site==="main" ? "Donate" : "Enroll Free"}</button>
        </div>
      </nav>

      {/* SITE SWITCHER */}
      <div className="switcher" role="tablist" aria-label="Switch between site views">
        <button className={`sw ${site==="main"?"on":"off"}`} role="tab" aria-selected={site==="main"} aria-label="View organizational website" onClick={()=>{switchSite("main");setPlatView("home");}}>🏛 Website</button>
        <button className={`sw ${site==="plat"?"on":"off"}`} role="tab" aria-selected={site==="plat"} aria-label="View learning platform" onClick={()=>{switchSite("plat");setPlatView("home");}}>🎓 Learning Platform</button>
        <button className={`sw ${site==="cms"?"on":"off"}`} role="tab" aria-selected={site==="cms"} aria-label="View CMS admin" onClick={()=>switchSite("cms")}>⚙ CMS Admin</button>
      </div>

      {/* ══ MAIN SITE ══ */}
      {site==="main" && (
        <div className="wrap main">
          <section className="hero" id="main-content" aria-labelledby="hero-heading">
            <div>
              <div className="hero-welcome">Mandated by the First Nations Leadership Council</div>
              <h1 className="hero-title" id="hero-heading">Co-creating bright<span>digital futures</span>for First Nations in BC</h1>
              <p className="hero-sub">We advance digital literacy, connectivity, and technology strategy for all 204 First Nations in British Columbia — so communities can use technology on their own terms.</p>
              <div className="hero-btns">
                <button className="btn-gold" onClick={()=>switchSite("plat")}>Explore Training →</button>
                <button className="btn-outline-d" onClick={()=>handleMainNav("Research")}>Our Research</button>
              </div>
              <div className="hero-stats">
                {[["204","First Nations in BC"],["18+","Free courses"],["2,400+","Learners trained"],["2002","Est."]].map(([n,l])=>(
                  <div key={l}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
                ))}
              </div>
            </div>
            <div className="hero-card">
              <div className="hc">
                <div className="hc-t">Current Programs</div>
                {[
                  {icon:"🤖",name:"AI Foundations — Spring 2026",tag:"Applications open",dot:"g"},
                  {icon:"🚁",name:"Drone Stewardship",tag:"Futures program · Free",dot:"g"},
                  {icon:"📡",name:"BC Broadband Expansion",tag:"47 communities connected",dot:"gold"},
                  {icon:"🏆",name:"Amplify Awards 2026",tag:"Nominations opening soon",dot:"gold"},
                ].map((i,idx)=>(
                  <div key={idx} className="hc-item">
                    <div className="hc-icon">{i.icon}</div>
                    <div><div className="hc-name">{i.name}</div><div className="hc-tag">{i.tag}</div></div>
                    <div className={`hc-dot ${i.dot}`}/>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="territorial"><strong>Territorial Acknowledgement:</strong> Located on the traditional and unceded territories of the Skwxwú7mesh (Squamish), xwmeθkweyem (Musqueam) and Selilwetal (Tsleil-Waututh) Nations.</div>
          <section id="about" className="sec sec-w">
            <div className="mandate-grid">
              <div>
                <div className="lbl">Who We Are</div>
                <h2 className="h2" style={{marginBottom:18}}>An Indigenous-led organization for all 204 First Nations</h2>
                <p className="p" style={{marginBottom:16}}>We are an Indigenous-led, innovative non-profit mandated by the First Nations Leadership Council — the BC Assembly of First Nations, the First Nations Summit, and the Union of BC Indian Chiefs.</p>
                <p className="p" style={{marginBottom:32}}>Our board of directors represents Nations from across the province, and our team brings together Indigenous professionals and committed allies with strengths in education, community engagement, research, and technology leadership.</p>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <button className="btn-gold">Meet Our Team →</button>
                  <button className="btn-ghost">Annual Reports</button>
                </div>
              </div>
              <div>
                {[
                  {icon:"📚",title:"Digital Skills Training",body:"From introductory courses to advanced programs in cybersecurity, data science, AI, and drone stewardship — all at no cost to Indigenous learners in BC."},
                  {icon:"🔬",title:"Community-Led Research",body:"We research connectivity, spectrum, AI, and the digital economy so Nations have the information they need to make their own technology decisions."},
                  {icon:"💼",title:"Career Services",body:"We support our alumni as they move into technology careers and bring those skills home to their communities."},
                  {icon:"🤝",title:"Advocacy & Partnerships",body:"We facilitate meaningful relationships between First Nations and technology sector partners, funding bodies, and government."},
                ].map((c,i)=>(
                  <div key={i} className="mc">
                    <div className="mc-icon">{c.icon}</div>
                    <div><div className="mc-title">{c.title}</div><div className="mc-body">{c.body}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="impact">
            {[["204","First Nations represented across BC"],["$4.2M+","Funding secured"],["38","Research publications"],["120K+","Tech jobs in BC — less than 1% held by Indigenous people. We're changing that."]].map(([n,l])=>(
              <div key={l}><div className="impact-n">{n}</div><div className="impact-l">{l}</div></div>
            ))}
          </div>
          <section className="sec sec-s">
            <div className="lbl">Programs</div>
            <h2 className="h2" style={{marginBottom:12}}>What We Do</h2>
            <p className="p" style={{marginBottom:0,maxWidth:600}}>Six core program areas form the foundation of our work with First Nations communities across BC.</p>
            <div className="programs-grid">
              {[
                {n:"01",t:"Digital Literacy for Communities",b:"Foundational programs helping community members build confidence with everyday digital tools, online safety, and internet connectivity."},
                {n:"02",t:"Internet Connectivity & Infrastructure",b:"Advocacy and implementation support to expand broadband access across 204 First Nations communities."},
                {n:"03",t:"Data & Digital Sovereignty",b:"Supporting First Nations in developing data governance frameworks grounded in OCAP® principles."},
                {n:"04",t:"Workforce & Career Development",b:"Training pathways connecting Indigenous people with careers in technology, digital media, and innovation."},
                {n:"05",t:"Emerging Technology Research",b:"Applied research into AI, AR/VR, and other emerging technologies — exploring implications and opportunities."},
                {n:"06",t:"Government & Industry Partnerships",b:"Facilitating relationships between First Nations and technology sector partners, funders, and government."},
              ].map((p,i)=>(
                <div key={i} className="prog">
                  <div className="prog-n">{p.n}</div>
                  <div className="prog-title">{p.t}</div>
                  <div className="prog-body">{p.b}</div>
                  <div className="prog-link">Learn more →</div>
                </div>
              ))}
            </div>
          </section>

          {/* research and news placeholders for anchor links */}
          <section id="research" className="sec sec-c" style={{textAlign:"center"}}>
            <h2 className="h2" style={{marginBottom:16}}>Our Research</h2>
            <p className="p">Explore our latest publications and applied technology studies.</p>
          </section>
          <section id="news" className="sec sec-w" style={{textAlign:"center"}}>
            <h2 className="h2">News &amp; Stories</h2>
            <p className="p">Stay tuned for updates about our programs and community impact.</p>
          </section>

          <section id="community" className="sec sec-d" style={{textAlign:"center"}}>
            <div className="lbl">Get Involved</div>
            <h2 className="h2 h2-w" style={{maxWidth:520,margin:"0 auto 16px"}}>Ready to advance digital equity together?</h2>
            <p className="p p-w" style={{maxWidth:460,margin:"0 auto 36px"}}>Explore our training programs, browse our research, be part of the Amplify Awards, or get in touch.</p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn-gold" onClick={()=>switchSite("plat")}>Explore Training →</button>
              <button className="btn-outline-d">Partner With Us</button>
            </div>
          </section>
          <footer className="footer">
            <div className="footer-top">
              <div>
                <div className="f-logo"><img src={LOGO} alt="First Nations Technology Council"/></div>
                <div className="f-tag">An Indigenous-led non-profit mandated by First Nations leadership in BC to advance digital literacy, connectivity, and technology strategy.</div>
                <div className="f-contact"><div>(604) 921-9939</div><div>info@technologycouncil.ca</div><div>70 Orwell St. Unit 102, North Vancouver, BC</div></div>
              </div>
              {[["About",["Our Team","News","Partners","Annual Reports","Employment"]],
                ["Learn",["Upcoming Courses","All Courses","FAQ","Career Services","Amplify Awards"]],
                ["Research",["Digital Transformation (AI)","Skills Shaped by Community","Enablement Series","Labour Market Studies"]]
              ].map(([title,links])=>(
                <div key={title}>
                  <div className="f-col-t">{title}</div>
                  {links.map(l=>{
                    const onClick = () => {
                      if(title === "About") handleMainNav("About");
                      else if(title === "Learn") handleMainNav("Learn");
                      else if(title === "Research") handleMainNav("Research");
                    };
                    return (
                      <button key={l} className="f-link" onClick={onClick} aria-label={l}>
                        {l}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="footer-bot">
              <div className="f-copy">© 2026 First Nations Technology Council | Art by Jamin Zuroski | Demo by Haute-U AI Systems</div>
              <div className="f-copy">technologycouncil.ca</div>
            </div>
          </footer>
        </div>
      )}

      {/* ══ LEARNING PLATFORM ══ */}
      {site==="plat" && platView==="home" && (
        <div className="wrap plat" id="main-content">
          {/* ── ACCESSIBILITY COMMITMENT BAR ── */}
          <div className="a11y-bar" role="region" aria-label="Accessibility commitments">
            <div className="a11y-bar-title">Accessibility</div>
            <div className="a11y-badges">
              <span className="a11y-badge green" title="Meets WCAG 2.1 AA standards">✓ WCAG 2.1 AA</span>
              <span className="a11y-badge green" title="Designed for mobile-first experience">📱 Mobile-First</span>
              <span className="a11y-badge gold" title="Optimised for low-bandwidth and 3G connections">⚡ Low-Bandwidth Optimised</span>
              <span className="a11y-badge blue" title="Keyboard navigable — no mouse required">⌨ Keyboard Nav</span>
              <span className="a11y-badge blue" title="Compatible with screen readers">👁 Screen Reader Ready</span>
              <span className="a11y-badge" title="Works without JavaScript for core content">🔄 Progressive Enhancement</span>
              <div className="a11y-sep" aria-hidden="true"/>
              <span className="a11y-badge green" title="Plain language throughout — no assumed technical vocabulary">💬 Plain Language</span>
            </div>
            <div className="a11y-bar-note">Designed for all 204 First Nations in BC</div>
          </div>
          {showOnboard && (
            <div style={{paddingTop:32}}>
              <div className="onboard-banner">
                <div className="ob-icon">👋</div>
                <div>
                  <div className="ob-title">Welcome to the FNTC Digital Learning Platform</div>
                  <div className="ob-body">You're new here — start with <strong style={{color:var_gold()}}>AI Foundations</strong>, our most popular beginner course. Free, self-paced, and built for First Nations community members. No prior experience needed.</div>
                </div>
                <button className="btn-gold" style={{flexShrink:0}} onClick={()=>openCourse(1)}>Start Learning →</button>
                <button className="ob-dismiss" onClick={()=>setShowOnboard(false)}>✕</button>
              </div>
            </div>
          )}
          <section className="plat-hero">
            <div className="plat-badge">✦ FNTC Digital Learning Platform — Coming 2026</div>
            <h1 className="plat-title">Learn AI & digital skills<br/><span>on your own terms.</span></h1>
            <p className="plat-sub">Practical, self-paced courses designed for First Nations communities — grounded in Indigenous values. Free for Indigenous Peoples in BC, 18+.</p>
            <div className="plat-search">
              <input placeholder="Search courses, prompts, tools..."/>
              <button className="plat-search-btn">Search</button>
            </div>
            <div className="plat-tags">
              {["AI Basics","Data Sovereignty","Grant Writing with AI","Drone Stewardship","Cybersecurity","Digital Transformation"].map(t=>(
                <button key={t} className="ptag">{t}</button>
              ))}
            </div>
          </section>
          <section id="tracks" className="tracks-sec">
            <div className="tracks-hdr">
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"var(--gold)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:8,fontFamily:"var(--F)"}}>Learning Tracks</div>
                <div className="tracks-t">Start Learning Today — All Free</div>
              </div>
              <button className="nav-donate" onClick={()=>handlePlatNav("Courses")}>View All Courses</button>
            </div>
            <div className="tracks-grid">
              {tracks.map((t,i)=>(
                <div key={i} className={`track ${t.cls}`}
                  role="article"
                  aria-label={`${t.name} — ${t.lvlLabel} level, ${t.modules} modules, ${t.hours}`}>
                  <div className="t-emoji" aria-hidden="true">{t.emoji}</div>
                  <div className={`t-lvl lvl-${t.lvl.slice(0,1)}`}>{t.lvlLabel}</div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-desc">{t.desc}</div>
                  <div className="t-meta" aria-label={`Course details: ${t.modules} modules, ${t.hours}, free`}>
                    <div className="t-mi">📚 {t.modules} modules</div>
                    <div className="t-mi">⏱ {t.hours}</div>
                    <div className="t-mi">🆓 Free</div>
                  </div>
                  {t.partner && <div style={{fontSize:10,color:"var(--gold-l)",marginTop:8,fontWeight:600}}>{t.partner}</div>}
                  <button className="t-enroll" onClick={()=>openCourse(t.id)}
                    aria-label={`View ${t.name} course details`}>View Course →</button>
                </div>
              ))}
            </div>
          </section>
          <section id="prompts" className="prompts-sec">
            <div style={{fontSize:11,fontWeight:700,color:"var(--gold)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10,fontFamily:"var(--F)"}}>Prompt Library</div>
            <h2 style={{fontFamily:"var(--F)",fontSize:26,fontWeight:800,color:"#fff",marginBottom:8}}>Ready-to-Use AI Prompts</h2>
            <p style={{color:"rgba(255,255,255,.48)",fontSize:15,maxWidth:520,marginBottom:24}}>Copy and customize for your community work. No AI experience needed.</p>
            <div className="filters" role="group" aria-label="Filter prompts by category">
              {["All","Grant Writing","Community Communication","Data & Privacy","AI at Work"].map(f=>(
                <button key={f} className={`fbtn ${filter===f?"on":"off"}`}
                  onClick={()=>setFilter(f)}
                  aria-pressed={filter===f}
                  aria-label={`Filter by ${f}`}>{f}</button>
              ))}
            </div>
            <div className="prompts-grid" role="list" aria-label="AI prompt library">
              {filteredPrompts.map((p,i)=>(
                <div key={i} className="pc" role="listitem" aria-label={`${p.cat}: ${p.title}`}>
                  <div className="pc-cat">{p.cat}</div>
                  <div className="pc-title">{p.title}</div>
                  <div className="pc-prev" aria-label="Prompt preview">"{p.prev}..."</div>
                  <button className="pc-copy"
                    aria-label={copied===i ? "Prompt copied to clipboard" : `Copy prompt: ${p.title}`}
                    aria-live="polite"
                    onClick={()=>{setCopied(i);setTimeout(()=>setCopied(null),2000);}}>
                    {copied===i?"✓ Copied!":"⧉ Copy Prompt"}
                  </button>
                </div>
              ))}
            </div>
          </section>
          <section id="assistant" className="chat-sec">
            <div className="chat-wrap">
              <div style={{fontSize:11,fontWeight:700,color:"var(--gold)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10,fontFamily:"var(--F)"}}>AI Learning Assistant</div>
              <h2 style={{fontFamily:"var(--F)",fontSize:28,fontWeight:800,color:"#fff",marginBottom:6}}>Ask anything about AI</h2>
              <div className="optional-banner">
                <span style={{fontSize:16}}>⚡</span>
                <div className="ob-text"><strong>Phase 2 Feature Preview:</strong> This AI assistant is powered by Claude API + RAG over FNTC course content. Activatable when the Technology Council is ready — no additional build cost.</div>
              </div>
              <div className="chat-win" role="region" aria-label="AI Learning Assistant chat">
                <div className="chat-msgs" role="log" aria-live="polite" aria-label="Chat messages">
                  {msgs.map((m,i)=>(
                    <div key={i} className={`msg ${m.r==="user"?"u":""}`} role="listitem">
                      <div className={`av ${m.r==="ai"?"ai":"you"}`} aria-hidden="true">{m.r==="ai"?"AI":"You"}</div>
                      <div className={`bubble ${m.r==="ai"?"ai":"you"}`} aria-label={m.r==="ai"?"Assistant: "+m.t:"You: "+m.t}>{m.t}</div>
                    </div>
                  ))}
                  {typing && <div className="msg" aria-label="Assistant is typing"><div className="av ai" aria-hidden="true">AI</div><div className="bubble ai" aria-live="polite"><div className="typing-row" aria-label="typing"><div className="dot" aria-hidden="true"/><div className="dot" aria-hidden="true"/><div className="dot" aria-hidden="true"/></div></div></div>}
                  <div ref={msgEnd}/>
                </div>
                <div className="chat-in" role="group" aria-label="Send a message">
                  <input className="chat-input"
                    placeholder="Ask about courses, AI, data sovereignty..."
                    value={inp}
                    onChange={e=>setInp(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&sendMsg()}
                    aria-label="Type your message"
                    autoComplete="off"
                  />
                  <button className="chat-send" onClick={()=>sendMsg()} aria-label="Send message">→</button>
                </div>
              </div>
              <div className="chat-sugg" role="group" aria-label="Suggested questions">
                {["What is AI?","Data sovereignty?","Build my learning path","Tell me about Drone Stewardship"].map(s=>(
                  <button key={s} className="sugg" onClick={()=>sendMsg(s)} aria-label={`Ask: ${s}`}>{s}</button>
                ))}
              </div>
            </div>
          </section>
          <div className="plat-footer">
            <div className="plat-f">© 2026 First Nations Technology Council · Digital Learning Platform</div>
            <div className="plat-f">Built by <span>Haute-U AI Systems</span> · Future phase: <span>Claude API</span></div>
          </div>
        </div>
      )}

      {/* ══ COURSE DETAIL ══ */}
      {site==="plat" && platView==="detail" && course && (
        <div className="wrap course-detail" id="main-content">
          <button className="cd-back" onClick={()=>setPlatView("home")}
            aria-label="Back to all courses">← Back to Courses</button>
          <div className="cd-hero" role="banner">
            <nav className="cd-breadcrumb" aria-label="Breadcrumb">Learning Platform › {course.lvlLabel} › {course.name}</nav>
            <div className="cd-badge">🆓 Free Course · {course.lvlLabel}</div>
            <h1 className="cd-title">{course.name}</h1>
            <p className="cd-desc">{course.longDesc}</p>
            <div className="cd-meta-row">
              <div className="cd-meta-item">{course.emoji} <span>{course.modules} modules</span></div>
              <div className="cd-meta-item">⏱ <span>{course.hours} total</span></div>
              <div className="cd-meta-item">📜 <span>Certificate on completion</span></div>
              <div className="cd-meta-item">🌐 <span>Self-paced · Online</span></div>
              {course.partner && <div className="cd-meta-item">🤝 <span>{course.partner}</span></div>}
            </div>
            <div className="cd-actions">
              <button className="btn-gold">Enroll Now — It's Free</button>
              <button className="btn-outline-d">Download Course Guide (PDF)</button>
            </div>
          </div>

          <div className="cd-body">
            {/* LEFT — Module player */}
            <div className="modules-panel">
              {/* Video player */}
              <div className="player" style={{marginBottom:24}} role="region" aria-label={`Video player: ${course.mods[activeModule]?.name}`}>
                <div className="player-screen"
                  role="button" tabIndex={0}
                  aria-label="Play video — click to advance progress"
                  onClick={()=>setProgress(p=>Math.min(p+15,100))}
                  onKeyDown={e=>e.key==="Enter"&&setProgress(p=>Math.min(p+15,100))}>
                  <button className="play-btn" aria-label="Play" tabIndex={-1}>▶</button>
                  <div className="player-overlay" aria-hidden="true">
                    <div className="player-title">{course.mods[activeModule]?.name}</div>
                    <div className="player-sub">{course.mods[activeModule]?.type} · {course.mods[activeModule]?.dur}</div>
                  </div>
                </div>
                <div className="player-controls" role="toolbar" aria-label="Video controls">
                  <button className="ctrl-btn" aria-label="Previous">⏮</button>
                  <button className="ctrl-btn" aria-label="Play / Pause">▶</button>
                  <button className="ctrl-btn" aria-label="Next">⏭</button>
                  <div className="progress-bar"
                    role="slider" aria-label="Video progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={`${progress}% complete`}
                    tabIndex={0}
                    onClick={e=>{const r=e.currentTarget.getBoundingClientRect();setProgress(Math.round(((e.clientX-r.left)/r.width)*100));}}
                    onKeyDown={e=>{if(e.key==="ArrowRight")setProgress(p=>Math.min(p+5,100));if(e.key==="ArrowLeft")setProgress(p=>Math.max(p-5,0));}}>
                    <div className="progress-fill" style={{width:`${progress}%`}} aria-hidden="true"/>
                  </div>
                  <div className="ctrl-time" aria-label={`${Math.floor(progress*0.4)} minutes elapsed`}>{Math.floor(progress*0.4)}:{String(Math.floor((progress*0.4%1)*60)).padStart(2,"0")} / {Math.floor(parseInt(course.mods[activeModule]?.dur||"30")*0.6)}:00</div>
                  <button className="ctrl-btn" aria-label="Fullscreen">⛶</button>
                </div>
              </div>

              {/* Module content */}
              <div className="player-content" style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:24,marginBottom:20}}>
                <div className="pc-title">{course.mods[activeModule]?.name}</div>
                <div className="pc-body">In this module you'll explore the foundational concepts behind {course.name.toLowerCase()}. The content is designed to be accessible to all experience levels, with real examples drawn from First Nations community contexts across British Columbia.</div>
                <div className="pc-key-points">
                  <div className="pc-kp-label">Key Points — Module {activeModule+1}</div>
                  {course.keyPoints.slice(0,3).map((kp,i)=>(
                    <div key={i} className="pc-kp-item"><div className="pc-kp-dot"/>{kp}</div>
                  ))}
                </div>
              </div>

              {/* Quiz */}
              <div className="quiz-section">
                <div className="quiz-label">Quick Check — Module {activeModule+1}</div>
                <div className="quiz-q" id="quiz-question">{course.quiz.q}</div>
                <div role="radiogroup" aria-labelledby="quiz-question">
                {course.quiz.opts.map((opt,i)=>(
                  <div key={i}
                    role="radio"
                    tabIndex={0}
                    aria-checked={quizAnswer===i}
                    aria-label={`Option ${String.fromCharCode(65+i)}: ${opt}${quizAnswer===i?(i===course.quiz.correct?" — correct":" — incorrect"):"" }`}
                    className={`quiz-opt ${quizAnswer===i?(i===course.quiz.correct?"correct":"wrong"):""}`}
                    onClick={()=>setQuizAnswer(i)}
                    onKeyDown={e=>e.key==="Enter"&&setQuizAnswer(i)}>
                    {String.fromCharCode(65+i)}. {opt}
                  </div>
                ))}
                </div>
                {quizAnswer!==null && (
                  <button className="next-mod-btn" onClick={()=>{setActiveModule(m=>Math.min(m+1,course.mods.length-1));setQuizAnswer(null);setProgress(0);}}>
                    {activeModule<course.mods.length-1 ? "Next Module →" : "Complete Course 🎉"}
                  </button>
                )}
              </div>

              {/* Module list */}
              <div style={{marginTop:28}}>
                <div className="mod-section-label">All Modules</div>
                {course.mods.map((m,i)=>{
                  const state = m.done?"done":m.active?"active":m.locked?"locked":"todo";
                  return (
                    <div key={i} className={`mod-item ${state}`}
                      role="button"
                      tabIndex={state==="locked" ? -1 : 0}
                      aria-label={`Module ${i+1}: ${m.name} — ${m.type}, ${m.dur}${m.done?" (completed)":m.locked?" (locked — complete previous modules first)":""}`}
                      aria-disabled={state==="locked"}
                      aria-current={state==="active" ? "step" : undefined}
                      onClick={()=>{ if(state!=="locked"){setActiveModule(i);setQuizAnswer(null);setProgress(0);} }}
                      onKeyDown={e=>{ if(e.key==="Enter"&&state!=="locked"){setActiveModule(i);setQuizAnswer(null);setProgress(0);} }}>
                      <div className={`mod-num ${state}`} aria-hidden="true">{m.done?"✓":i+1}</div>
                      <div className="mod-info">
                        <div className="mod-name">{m.name}</div>
                        <div className="mod-sub">{m.type}</div>
                      </div>
                      <div className="mod-dur" aria-hidden="true">{m.dur}</div>
                      {m.done && <div className="mod-check" aria-hidden="true">✓</div>}
                      {m.locked && <div style={{fontSize:14,color:"rgba(255,255,255,.2)"}} aria-hidden="true">🔒</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — Sidebar */}
            <div className="cd-sidebar">
              {/* Progress */}
              <div className="sidebar-card">
                <div className="sb-title">Your Progress</div>
                <div className="progress-ring-wrap">
                  <div className="progress-circle">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="8"/>
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#C8962E" strokeWidth="8"
                        strokeDasharray={`${2*Math.PI*42}`}
                        strokeDashoffset={`${2*Math.PI*42*(1-completedMods/course.mods.length)}`}
                        transform="rotate(-90 50 50)" strokeLinecap="round"/>
                    </svg>
                    <div className="prog-num-big">{Math.round(completedMods/course.mods.length*100)}%</div>
                  </div>
                  <div className="prog-label">{completedMods} of {course.mods.length} modules complete</div>
                </div>
                {[["Status","In Progress"],["Time spent","1h 15min"],["Est. remaining",course.hours],["Enrolled","Feb 28, 2026"]].map(([l,v])=>(
                  <div key={l} className="sb-stat"><div className="sb-stat-l">{l}</div><div className="sb-stat-v">{v}</div></div>
                ))}
              </div>

              {/* Certificate */}
              <div className="sidebar-card">
                <div className="sb-title">Certificate</div>
                <div className="cert-preview">
                  <div className="cert-icon">📜</div>
                  <div className="cert-title">Certificate of Completion</div>
                  <div className="cert-sub">{course.name}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:8}}>Issued by First Nations Technology Council</div>
                </div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:12,lineHeight:1.5}}>Complete all modules to unlock your downloadable certificate.</div>
              </div>

              {/* Instructor */}
              <div className="sidebar-card">
                <div className="sb-title">Instructor</div>
                <div className="instructor-card">
                  <div className="instructor-avatar">👤</div>
                  <div>
                    <div className="instructor-name">{course.instructor}</div>
                    <div className="instructor-role">{course.instrRole}</div>
                  </div>
                </div>
                <div style={{fontSize:13,color:"rgba(255,255,255,.45)",lineHeight:1.6}}>All FNTC courses are designed by and for Indigenous learners in British Columbia.</div>
              </div>

              {/* Share */}
              <div className="sidebar-card">
                <div className="sb-title">Share This Course</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {["📧 Email","💬 SMS","🔗 Copy Link"].map(s=>(
                    <button key={s} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.7)",padding:"7px 12px",borderRadius:6,cursor:"pointer",fontSize:12,fontFamily:"var(--B)"}}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ CMS ADMIN — SANITY STUDIO ══ */}
      {site==="cms" && (
        <div className="wrap cms">
          {/* Sidebar */}
          <div className="cms-sidebar">
            <div className="cms-brand">
              <div className="cms-brand-title">FNTC Content Studio</div>
              <div className="cms-brand-sub">Powered by Sanity.io</div>
            </div>
            <div className="cms-nav">
              <div className="cms-nav-label">Content</div>
              {[
                {icon:"🎓",label:"Courses",key:"courses",badge:cmsCourses.length},
                {icon:"💬",label:"Prompt Library",key:"prompts",badge:8},
                {icon:"📰",label:"News & Stories",key:"news",badge:6},
                {icon:"📄",label:"Pages",key:"pages"},
                {icon:"🔬",label:"Research",key:"research",badge:4},
                {icon:"👥",label:"Team Members",key:"team"},
              ].map(item=>(
                <div key={item.key} className={`cms-nav-item ${cmsNav===item.key?"active":""}`} onClick={()=>{setCmsNav(item.key);if(item.key!=="courses")setCmsView("list");}}>
                  <div className="cms-nav-icon">{item.icon}</div>
                  <div className="cms-nav-text">{item.label}</div>
                  {item.badge && <div className="cms-nav-badge">{item.badge}</div>}
                </div>
              ))}
              <div className="cms-nav-label" style={{marginTop:16}}>Settings</div>
              {[
                {icon:"🎨",label:"Brand Assets",key:"brand"},
                {icon:"⚙",label:"Site Settings",key:"settings"},
                {icon:"🌐",label:"Navigation",key:"nav"},
              ].map(item=>(
                <div key={item.key} className={`cms-nav-item ${cmsNav===item.key?"active":""}`} onClick={()=>setCmsNav(item.key)}>
                  <div className="cms-nav-icon">{item.icon}</div>
                  <div className="cms-nav-text">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Main */}
          <div className="cms-main">
            {/* Topbar */}
            <div className="cms-topbar">
              <div className="cms-topbar-title">
                {cmsView==="list" ? `🎓 Courses (${cmsCourses.length})` : editingCourse ? `Edit: ${editingCourse.title}` : "✦ New Course"}
              </div>
              <div className="cms-topbar-actions">
                {cmsView==="list" ? (
                  <button className="cms-btn primary" onClick={()=>openEditor(null)}>+ New Course</button>
                ) : (
                  <>
                    <button className="cms-btn secondary" onClick={()=>setCmsView("list")}>← Back</button>
                    <button className="cms-btn secondary" onClick={()=>setFormData(p=>({...p,status:p.status==="draft"?"published":"draft"}))}>
                      {formData.status==="draft" ? "📤 Publish" : "📥 Unpublish"}
                    </button>
                    <button className="cms-btn primary" onClick={saveForm}>💾 Save</button>
                  </>
                )}
              </div>
            </div>

            <div className="cms-content">
              {/* Course list */}
              {cmsView==="list" && (
                <div className="cms-list">
                  <div className="cms-list-header">
                    <div className="cms-search">
                      <span style={{color:"rgba(255,255,255,.3)"}}>🔍</span>
                      <input placeholder="Search courses..."/>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button className="cms-btn secondary">Filter</button>
                      <button className="cms-btn secondary">Sort</button>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
                    {[["Total Courses",cmsCourses.length,"📚"],["Published",cmsCourses.filter(c=>c.status==="published").length,"✅"],["Draft",cmsCourses.filter(c=>c.status==="draft").length,"📝"],["Total Learners",cmsCourses.reduce((s,c)=>s+c.learners,0).toLocaleString(),"👥"]].map(([l,v,ic])=>(
                      <div key={l} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"16px 18px"}}>
                        <div style={{fontSize:22,marginBottom:6}}>{ic}</div>
                        <div style={{fontFamily:"var(--F)",fontSize:24,fontWeight:800,color:"var(--gold)"}}>{v}</div>
                        <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:4}}>{l}</div>
                      </div>
                    ))}
                  </div>

                  <table className="cms-table">
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Tier</th>
                        <th>Status</th>
                        <th>Learners</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cmsCourses.map(c=>(
                        <tr key={c.id}>
                          <td>
                            <div className="cms-course-title">{c.title}</div>
                            <div className="cms-course-sub">ID: course-{c.id}</div>
                          </td>
                          <td><span style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>{c.tier}</span></td>
                          <td><span className={`status-badge status-${c.status==="published"?"pub":c.status==="draft"?"draft":"arch"}`}>{c.status}</span></td>
                          <td><span style={{fontSize:14,color:"#fff",fontWeight:600}}>{c.learners.toLocaleString()}</span></td>
                          <td><span style={{fontSize:12,color:"rgba(255,255,255,.5)"}}>{c.updated}</span></td>
                          <td>
                            <div className="cms-action-btns">
                              <button className="cms-icon-btn" onClick={()=>openEditor(c)}>✏ Edit</button>
                              <button className="cms-icon-btn" onClick={()=>openCourse(c.id)||switchSite("plat")}>👁 Preview</button>
                              <button className="cms-icon-btn" style={{color:"#FF6464"}} onClick={()=>setCmsCourses(p=>p.filter(x=>x.id!==c.id))}>🗑</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Course editor */}
              {cmsView==="editor" && (
                <div className="cms-editor">
                  <div className="cms-form-panel">
                    <div style={{background:"rgba(200,150,46,.08)",border:"1px solid rgba(200,150,46,.2)",borderRadius:10,padding:"12px 16px",marginBottom:24,fontSize:13,color:"rgba(255,255,255,.6)"}}>
                      <strong style={{color:"var(--gold-l)"}}>How this works:</strong> Fill in the fields below and click Save. Your course will appear on the live learning platform immediately if status is set to Published. The preview panel on the right updates as you type.
                    </div>

                    <div className="field-row">
                      <div className="field-group">
                        <div className="field-label">Course Title <span className="field-required">*</span></div>
                        <input className="cms-input" placeholder="e.g. Introduction to Data Sovereignty" value={formData.title} onChange={e=>setFormData(p=>({...p,title:e.target.value}))}/>
                      </div>
                      <div className="field-group">
                        <div className="field-label">Course Emoji / Icon</div>
                        <input className="cms-input" placeholder="🤖" value={formData.emoji} onChange={e=>setFormData(p=>({...p,emoji:e.target.value}))} style={{fontSize:20}}/>
                      </div>
                    </div>

                    <div className="field-row">
                      <div className="field-group">
                        <div className="field-label">Tier <span className="field-required">*</span></div>
                        <select className="cms-input cms-select" value={formData.tier} onChange={e=>setFormData(p=>({...p,tier:e.target.value}))}>
                          <option>Fundamentals</option>
                          <option>Foundations</option>
                          <option>Focus</option>
                          <option>Futures</option>
                        </select>
                        <div className="field-hint">Fundamentals → Foundations → Focus → Futures (most advanced)</div>
                      </div>
                      <div className="field-group">
                        <div className="field-label">Level</div>
                        <select className="cms-input cms-select" value={formData.level} onChange={e=>setFormData(p=>({...p,level:e.target.value}))}>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    <div className="field-group">
                      <div className="field-label">Short Description <span className="field-required">*</span></div>
                      <input className="cms-input" placeholder="One sentence shown on the course card (max 120 chars)" value={formData.shortDesc} onChange={e=>setFormData(p=>({...p,shortDesc:e.target.value}))} maxLength={120}/>
                      <div className="field-hint">{formData.shortDesc.length}/120 characters · Shown on course card and search results</div>
                    </div>

                    <div className="field-group">
                      <div className="field-label">Full Description</div>
                      <textarea className="cms-input cms-textarea" placeholder="Detailed description shown on the course detail page. Explain who this course is for, what they'll learn, and why it matters for their community." value={formData.longDesc} onChange={e=>setFormData(p=>({...p,longDesc:e.target.value}))}/>
                    </div>

                    <div className="field-row">
                      <div className="field-group">
                        <div className="field-label">Estimated Duration</div>
                        <input className="cms-input" placeholder="e.g. 4 hrs" value={formData.hours} onChange={e=>setFormData(p=>({...p,hours:e.target.value}))}/>
                      </div>
                      <div className="field-group">
                        <div className="field-label">Partner / Provider</div>
                        <input className="cms-input" placeholder="e.g. With BrainStation (optional)" value={formData.partner} onChange={e=>setFormData(p=>({...p,partner:e.target.value}))}/>
                      </div>
                    </div>

                    <div className="field-group">
                      <div className="field-label">Tags</div>
                      <div className="cms-tag-input" onClick={e=>e.currentTarget.querySelector("input").focus()}>
                        {formData.tags.map((tag,i)=>(
                          <div key={i} className="cms-tag">{tag}<span className="cms-tag-x" onClick={()=>removeTag(i)}>×</span></div>
                        ))}
                        <input className="cms-tag-in" placeholder="Type a tag and press Enter..." value={newTag} onChange={e=>setNewTag(e.target.value)} onKeyDown={addTag}/>
                      </div>
                      <div className="field-hint">Suggested: AI, Data, Cybersecurity, Drone, OCAP, Career</div>
                    </div>

                    <div className="field-group">
                      <div className="field-label">Course Modules <span className="field-required">*</span></div>
                      <div className="module-builder">
                        {formData.modules.map((mod,i)=>(
                          <div key={i} className="mod-builder-item">
                            <div className="mod-drag">⠿</div>
                            <div className="mod-builder-num">{i+1}</div>
                            <div style={{flex:1}}>
                              <input
                                style={{background:"none",border:"none",outline:"none",color:"rgba(255,255,255,.8)",fontSize:13,fontFamily:"var(--B)",width:"100%"}}
                                value={mod.name}
                                onChange={e=>setFormData(p=>({...p,modules:p.modules.map((m,mi)=>mi===i?{...m,name:e.target.value}:m)}))}
                              />
                              <select
                                style={{background:"none",border:"none",outline:"none",color:"rgba(255,255,255,.35)",fontSize:12,fontFamily:"var(--B)",cursor:"pointer"}}
                                value={mod.type}
                                onChange={e=>setFormData(p=>({...p,modules:p.modules.map((m,mi)=>mi===i?{...m,type:e.target.value}:m)}))}
                              >
                                {["Video","Video + Reading","Video + Quiz","Hands-on Lab","Workshop","Simulation","Discussion"].map(t=><option key={t} style={{background:"#222"}}>{t}</option>)}
                              </select>
                            </div>
                            <button className="mod-builder-del" onClick={()=>removeModule(i)}>✕</button>
                          </div>
                        ))}
                        <button className="add-module-btn" onClick={addModule}>+ Add Module</button>
                      </div>
                    </div>

                    <div className="field-group">
                      <div className="field-label">Publication Status</div>
                      <div style={{display:"flex",gap:10}}>
                        {["draft","published"].map(s=>(
                          <div key={s}
                            onClick={()=>setFormData(p=>({...p,status:s}))}
                            style={{padding:"10px 20px",borderRadius:8,cursor:"pointer",border:`1px solid ${formData.status===s?"var(--gold)":"rgba(255,255,255,.1)"}`,background:formData.status===s?"rgba(200,150,46,.15)":"transparent",color:formData.status===s?"var(--gold-l)":"rgba(255,255,255,.5)",fontSize:13,fontWeight:600,fontFamily:"var(--F)",transition:"all .2s"}}>
                            {s==="draft"?"📝 Draft":"📤 Published"}
                          </div>
                        ))}
                      </div>
                      <div className="field-hint">{formData.status==="draft" ? "Visible only to admins. Not shown on the live platform." : "Visible to all learners on the live platform immediately."}</div>
                    </div>

                    <div style={{display:"flex",gap:12,paddingTop:8,borderTop:"1px solid rgba(255,255,255,.08)",marginTop:8}}>
                      <button className="cms-btn primary" onClick={saveForm}>💾 Save Course</button>
                      <button className="cms-btn secondary" onClick={()=>setCmsView("list")}>Cancel</button>
                    </div>
                  </div>

                  {/* Live preview panel */}
                  <div className="cms-preview-panel">
                    <div className="cms-preview-label">Live Preview</div>
                    <div className="preview-card">
                      <div className="preview-emoji">{formData.emoji||"🎓"}</div>
                      <div className={`preview-lvl lvl-${(formData.level||"beginner").slice(0,1)}`}>{formData.level||"Beginner"}</div>
                      <div className="preview-title">{formData.title||"Course Title"}</div>
                      <div className="preview-desc">{formData.shortDesc||"Short description will appear here..."}</div>
                      <div className="preview-meta">
                        <div className="preview-mi">📚 {formData.modules.length} modules</div>
                        <div className="preview-mi">⏱ {formData.hours||"–"}</div>
                        <div className="preview-mi">🆓 Free</div>
                      </div>
                      {formData.partner && <div style={{fontSize:10,color:"var(--gold-l)",marginTop:8,fontWeight:600}}>{formData.partner}</div>}
                    </div>

                    <div style={{marginTop:20}}>
                      <div className="cms-preview-label">Modules ({formData.modules.length})</div>
                      {formData.modules.map((m,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:8,marginBottom:7}}>
                          <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(200,150,46,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"var(--gold-l)",flexShrink:0,fontFamily:"var(--F)"}}>{i+1}</div>
                          <div style={{flex:1}}>
                            <div style={{fontSize:12,color:"rgba(255,255,255,.75)",fontWeight:500}}>{m.name}</div>
                            <div style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>{m.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{marginTop:20,padding:"14px",background:formData.status==="published"?"rgba(72,199,142,.1)":"rgba(255,183,77,.1)",border:`1px solid ${formData.status==="published"?"rgba(72,199,142,.3)":"rgba(255,183,77,.3)"}`,borderRadius:10}}>
                      <div style={{fontSize:12,fontWeight:700,color:formData.status==="published"?"#48C78E":"#FFB74D",marginBottom:4,fontFamily:"var(--F)"}}>{formData.status==="published"?"✓ Will be published":"📝 Draft — not visible to learners"}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Tags: {formData.tags.length>0?formData.tags.join(", "):"None added yet"}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showSaved && (
        <div className="save-indicator">✓ Course saved successfully</div>
      )}
    </>
  );
}

function var_gold() { return "var(--gold)"; }