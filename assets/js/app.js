
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

const progress = $('.scroll-progress');
if(progress){
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const ratio = max > 0 ? scrollY / max : 0;
    progress.style.transform = `scaleX(${Math.min(1, ratio)})`;
  };
  addEventListener('scroll', updateProgress, {passive:true});
  addEventListener('resize', updateProgress);
  updateProgress();
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0, rootMargin:'0px 0px 200px 0px'});
$$('[data-reveal]').forEach(el => revealObserver.observe(el));

// Separate observer for image-reveal with threshold 0 to fix Chrome clip-path intersection bug
const imageRevealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      imageRevealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0, rootMargin:'0px 0px 200px 0px'});
$$('.image-reveal').forEach(el => imageRevealObserver.observe(el));

// Safety fallback for local file:// mode or Safari IntersectionObserver edge cases
const revealAllOnScrollOrTimeout = () => {
  $$('[data-reveal], .image-reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight + 300){
      el.classList.add('visible');
    }
  });
};
addEventListener('scroll', revealAllOnScrollOrTimeout, {passive:true});
addEventListener('load', revealAllOnScrollOrTimeout);
setTimeout(revealAllOnScrollOrTimeout, 200);
setTimeout(revealAllOnScrollOrTimeout, 600);

const timeline = $('.documentary-timeline');
if(timeline){
  const timelineObserver = new IntersectionObserver(([entry]) => {
    if(entry.isIntersecting){
      timeline.style.setProperty('--timeline-progress','100%');
      timelineObserver.disconnect();
    }
  }, {threshold:.35});
  timelineObserver.observe(timeline);
}

const caseGallery = $('#case-gallery');
const galleryPrev = $('.gallery-prev');
const galleryNext = $('.gallery-next');
if(caseGallery && galleryPrev && galleryNext){
  const updateGalleryButtons = () => {
    const maxScroll = caseGallery.scrollWidth - caseGallery.clientWidth;
    galleryPrev.disabled = caseGallery.scrollLeft <= 2;
    galleryNext.disabled = caseGallery.scrollLeft >= maxScroll - 2;
  };
  const scrollGallery = direction => {
    const card = $('figure', caseGallery);
    const gap = 12;
    const distance = card ? card.getBoundingClientRect().width + gap : caseGallery.clientWidth;
    caseGallery.scrollBy({left: direction * distance, behavior:'smooth'});
  };
  galleryPrev.addEventListener('click', () => scrollGallery(-1));
  galleryNext.addEventListener('click', () => scrollGallery(1));
  caseGallery.addEventListener('scroll', updateGalleryButtons, {passive:true});
  addEventListener('resize', updateGalleryButtons);
  updateGalleryButtons();
}

const flagshipGallery = $('#flagship-gallery');
const flagshipPrev = $('.flagship-prev');
const flagshipNext = $('.flagship-next');
if(flagshipGallery && flagshipPrev && flagshipNext){
  const updateFlagshipButtons = () => {
    const maxScroll = flagshipGallery.scrollWidth - flagshipGallery.clientWidth;
    flagshipPrev.disabled = flagshipGallery.scrollLeft <= 2;
    flagshipNext.disabled = flagshipGallery.scrollLeft >= maxScroll - 2;
  };
  const scrollFlagship = direction => {
    const card = $('figure', flagshipGallery);
    const gap = 12;
    const distance = card ? card.getBoundingClientRect().width + gap : flagshipGallery.clientWidth;
    flagshipGallery.scrollBy({left: direction * distance, behavior:'smooth'});
  };
  flagshipPrev.addEventListener('click', () => scrollFlagship(-1));
  flagshipNext.addEventListener('click', () => scrollFlagship(1));
  flagshipGallery.addEventListener('scroll', updateFlagshipButtons, {passive:true});
  addEventListener('resize', updateFlagshipButtons);
  updateFlagshipButtons();
}

const partnersGallery = $('#partners-gallery');
const partnersPrev = $('.partners-prev');
const partnersNext = $('.partners-next');
if(partnersGallery && partnersPrev && partnersNext){
  const updatePartnersButtons = () => {
    const maxScroll = partnersGallery.scrollWidth - partnersGallery.clientWidth;
    partnersPrev.disabled = partnersGallery.scrollLeft <= 2;
    partnersNext.disabled = partnersGallery.scrollLeft >= maxScroll - 2;
  };
  const scrollPartners = direction => {
    const card = $('.partner-card', partnersGallery);
    const gap = 24;
    const distance = card ? card.getBoundingClientRect().width + gap : partnersGallery.clientWidth;
    partnersGallery.scrollBy({left: direction * distance, behavior:'smooth'});
  };
  partnersPrev.addEventListener('click', () => scrollPartners(-1));
  partnersNext.addEventListener('click', () => scrollPartners(1));
  partnersGallery.addEventListener('scroll', updatePartnersButtons, {passive:true});
  addEventListener('resize', updatePartnersButtons);
  updatePartnersButtons();
}

const partnerGallerySlider = $('#partner-gallery-slider');
const partnerGalleryPrev = $('.partner-gallery-prev');
const partnerGalleryNext = $('.partner-gallery-next');
if(partnerGallerySlider && partnerGalleryPrev && partnerGalleryNext){
  const updatePartnerSliderButtons = () => {
    const maxScroll = partnerGallerySlider.scrollWidth - partnerGallerySlider.clientWidth;
    partnerGalleryPrev.disabled = partnerGallerySlider.scrollLeft <= 2;
    partnerGalleryNext.disabled = partnerGallerySlider.scrollLeft >= maxScroll - 2;
  };
  const scrollPartnerSlider = direction => {
    const card = $('.slider-photo-card', partnerGallerySlider);
    const gap = 16;
    const distance = card ? card.getBoundingClientRect().width + gap : partnerGallerySlider.clientWidth;
    partnerGallerySlider.scrollBy({left: direction * distance, behavior:'smooth'});
  };
  partnerGalleryPrev.addEventListener('click', () => scrollPartnerSlider(-1));
  partnerGalleryNext.addEventListener('click', () => scrollPartnerSlider(1));
  partnerGallerySlider.addEventListener('scroll', updatePartnerSliderButtons, {passive:true});
  addEventListener('resize', updatePartnerSliderButtons);
  updatePartnerSliderButtons();
}

$$('.track-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.track-tab').forEach(x => x.classList.remove('active'));
    $$('.track-panel').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    $(`.track-panel[data-panel="${btn.dataset.tab}"]`)?.classList.add('active');
  });
});

$$('.voice-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.voice-tab').forEach(x => x.classList.remove('active'));
    $$('.voice-panel').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    $(`.voice-panel[data-voice="${btn.dataset.voice}"]`)?.classList.add('active');
  });
});

const modal = $('.video-modal');
const frame = $('.video-frame');
const openVideo = (e) => {
  const trigger = e.currentTarget;
  const videoId = trigger.getAttribute('data-video') || 'vOjOEKsJE44';
  frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" title="HR1Vietnam Video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
};
const closeVideo = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  frame.innerHTML='';
  document.body.style.overflow='';
};
$$('[data-video]').forEach(btn => btn.addEventListener('click', openVideo));
$('.video-close')?.addEventListener('click', closeVideo);
modal?.addEventListener('click', e => { if(e.target === modal) closeVideo(); });
addEventListener('keydown', e => { if(e.key === 'Escape' && modal?.classList.contains('open')) closeVideo(); });

const nav = $('.main-nav');
$('.mobile-toggle')?.addEventListener('click', () => {
  nav.classList.toggle('mobile-open');
  if(nav.classList.contains('mobile-open')){
    Object.assign(nav.style,{display:'flex',position:'fixed',inset:'70px 0 auto',padding:'24px',background:'#F7F4EE',flexDirection:'column',alignItems:'flex-start',borderBottom:'1px solid rgba(16,24,40,.16)'});
  } else {
    nav.removeAttribute('style');
  }
});

$$('a[href^="#"]').forEach(a => a.addEventListener('click', () => {
  if(nav?.classList.contains('mobile-open')) {
    nav.classList.remove('mobile-open');
    nav.removeAttribute('style');
  }
}));

// GOOGLE APPS SCRIPT WEB APP URL (Cấu hình Endpoint của bạn tại đây)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJnr2mpcXbzE9vR8aZU_Mzy0acLpQweNdEGeDjHS9hWnGTOqb9dmja16N4GYhvolKm/exec'; 

const form = $('#partnership-form');
const successModal = $('#lead-success-modal');

// =========================================================================
// ANTI-SPAM & SECURITY FIREWALL (HONEYPOT + TIMETRAP + SMART CAPTCHA + RATE LIMIT)
// =========================================================================
let currentCaptcha = 0;
let formStartedTime = 0;

// Hàm tạo phép tính xác thực ngẫu nhiên
const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 9) + 3; // 3 - 11
  const num2 = Math.floor(Math.random() * 8) + 2; // 2 - 9
  currentCaptcha = num1 + num2;
  
  const eqEl = $('#captcha-equation');
  if (eqEl) eqEl.textContent = `${num1} + ${num2} = ?`;
  
  const ansInput = $('#captcha-answer');
  if (ansInput) {
    ansInput.value = '';
    ansInput.classList.remove('error');
  }
  
  const errEl = $('#captcha-error');
  if (errEl) errEl.classList.remove('show');
};

// Khởi chạy Captcha ban đầu
if (form) {
  generateCaptcha();
  $('#btn-refresh-captcha')?.addEventListener('click', generateCaptcha);
  
  // Ghi nhận thời điểm người dùng bắt đầu thao tác (Time-trap chống bot siêu tốc)
  form.querySelectorAll('input, select, textarea').forEach(inp => {
    inp.addEventListener('focus', () => {
      if (!formStartedTime) formStartedTime = Date.now();
    }, { once: true });
    inp.addEventListener('input', () => {
      if (!formStartedTime) formStartedTime = Date.now();
    }, { once: true });
  });
}

// Hàm đóng/mở success modal
const showSuccessModal = () => {
  successModal?.classList.add('open');
  successModal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeSuccessModal = () => {
  successModal?.classList.remove('open');
  successModal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Gắn sự kiện đóng success modal
$('#close-success-modal')?.addEventListener('click', closeSuccessModal);
$('#btn-success-close-ok')?.addEventListener('click', closeSuccessModal);
successModal?.addEventListener('click', e => { if (e.target === successModal) closeSuccessModal(); });

// MODAL THÔNG BÁO LỖI CAPTCHA
const captchaModal = $('#captcha-error-modal');

const showCaptchaModal = () => {
  captchaModal?.classList.add('open');
  captchaModal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeCaptchaModal = () => {
  captchaModal?.classList.remove('open');
  captchaModal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  
  // Tự động focus vào ô đáp án mới và đưa vào khung nhìn
  setTimeout(() => {
    const ansInput = $('#captcha-answer');
    if (ansInput) {
      ansInput.focus();
      ansInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
};

$('#close-captcha-modal')?.addEventListener('click', closeCaptchaModal);
$('#btn-captcha-close-ok')?.addEventListener('click', closeCaptchaModal);
captchaModal?.addEventListener('click', e => { if (e.target === captchaModal) closeCaptchaModal(); });

// Xử lý gửi Form với tường lửa 4 lớp
form?.addEventListener('submit', e => {
  e.preventDefault();
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  const captchaErrorEl = $('#captcha-error');
  const captchaInput = $('#captcha-answer');

  // --- TẦNG 1: HONEYPOT CHECK (Bẫy bot ngầm) ---
  const honeypotVal = $('#lead-website')?.value;
  if (honeypotVal && honeypotVal.trim() !== '') {
    console.warn('[Security] Automated Bot trapped via Honeypot.');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang kiểm tra bảo mật...';
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      showSuccessModal();
      form.reset();
      generateCaptcha();
    }, 700);
    return;
  }

  // --- TẦNG 2: TIME-TRAP CHECK (Gửi form dưới 2.5s -> Chặn bot gửi tự động) ---
  const elapsed = formStartedTime ? (Date.now() - formStartedTime) : 0;
  if (elapsed > 0 && elapsed < 2500) {
    console.warn('[Security] Submission rejected: completed too fast (< 2.5s).');
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      showSuccessModal();
      form.reset();
      generateCaptcha();
    }, 600);
    return;
  }

  // --- TẦNG 3: SMART CAPTCHA VERIFICATION ---
  const userAnswer = parseInt(captchaInput?.value, 10);
  if (isNaN(userAnswer) || userAnswer !== currentCaptcha) {
    if (captchaErrorEl) {
      captchaErrorEl.classList.add('show');
    }
    if (captchaInput) {
      captchaInput.classList.add('error');
    }
    // Tự động làm mới câu hỏi ngẫu nhiên mới
    generateCaptcha();
    // Hiển thị popup thông báo lỗi cho người dùng
    showCaptchaModal();
    return;
  } else {
    if (captchaErrorEl) captchaErrorEl.classList.remove('show');
    if (captchaInput) captchaInput.classList.remove('error');
  }

  // --- TẦNG 4: CLIENT RATE LIMITING (Chống spam liên tục trong vòng 30s) ---
  const lastSubmit = localStorage.getItem('hr1_lead_last_submit');
  const now = Date.now();
  if (lastSubmit && (now - parseInt(lastSubmit, 10)) < 30000) {
    alert('Yêu cầu hợp tác của bạn vừa được tiếp nhận. Để tránh trùng lặp, vui lòng đợi 30 giây trước khi gửi yêu cầu tiếp theo.');
    return;
  }
  
  // Thu thập dữ liệu hợp lệ
  const formData = {
    fullname: $('#lead-fullname')?.value || '',
    organization: $('#lead-org')?.value || '',
    email: $('#lead-email')?.value || '',
    phone: $('#lead-phone')?.value || '',
    interest: $('#lead-interest')?.value || '',
    studentCount: $('#lead-students')?.value || '',
    message: $('#lead-message')?.value || '',
    verifiedVia: 'Smart-Math-Captcha',
    timestamp: new Date().toISOString()
  };
  
  // Nếu chưa cấu hình API URL thì chạy chế độ Thử nghiệm (Demo)
  if (!GOOGLE_SCRIPT_URL) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang gửi (Demo)...';
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      showSuccessModal();
      form.reset();
      formStartedTime = 0;
      generateCaptcha();
      localStorage.setItem('hr1_lead_last_submit', Date.now().toString());
    }, 1000);
    return;
  }
  
  // Trạng thái gửi
  submitBtn.disabled = true;
  submitBtn.textContent = 'Đang bảo mật & gửi yêu cầu...';
  
  // Gửi API đến Google Apps Script
  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    showSuccessModal();
    form.reset();
    formStartedTime = 0;
    generateCaptcha();
    localStorage.setItem('hr1_lead_last_submit', Date.now().toString());
  })
  .catch(err => {
    console.error('Error submitting form:', err);
    alert('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng kiểm tra lại kết nối mạng hoặc liên hệ quản trị viên.');
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });
});

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now-start)/1100,1);
      el.textContent = Math.round(target*(1-Math.pow(1-p,3))) + suffix;
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
},{threshold:.5});
$$('[data-count]').forEach(el => countObserver.observe(el));
