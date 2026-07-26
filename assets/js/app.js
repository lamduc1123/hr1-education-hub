
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

const progress = $('.scroll-progress');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const ratio = max > 0 ? scrollY / max : 0;
  progress.style.transform = `scaleX(${Math.min(1, ratio)})`;
};
addEventListener('scroll', updateProgress, {passive:true});
addEventListener('resize', updateProgress);
updateProgress();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.08, rootMargin:'0px 0px -6% 0px'});
$$('[data-reveal], .image-reveal').forEach(el => revealObserver.observe(el));

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
const openVideo = () => {
  frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/vOjOEKsJE44?autoplay=1&rel=0&modestbranding=1" title="HUTECH × HR1Vietnam Vlog" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
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

const form = $('[data-demo-form]');
form?.addEventListener('submit', e => {
  e.preventDefault();
  $('.form-success')?.classList.add('show');
  form.querySelector('button[type="submit"]').textContent = 'Đã ghi nhận';
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
