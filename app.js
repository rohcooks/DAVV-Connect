(() => {
  const $ = (s, e = document) => e.querySelector(s), $$ = (s, e = document) => [...e.querySelectorAll(s)];
  const J = k => {
    try {
      return JSON.parse(localStorage.getItem(k));
    }
    catch (e) {
      return null;
    }
  }, W = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const users = () => J('users') || [], sess = () => localStorage.getItem('session') || sessionStorage.getItem('session');
  const me = () => users().find(u => u.email === sess()), go = p => { location.href = p; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const IC = { home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-4 3-6 6.5-6s6.5 2 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c3 0 4.5 2 4.5 5"/>', dept: '<path d="M3 9l9-6 9 6"/><path d="M5 9v10M10 9v10M14 9v10M19 9v10M3 21h18"/>', file: '<path d="M6 2h8l5 5v15H6z"/><path d="M14 2v5h5M9 13h6M9 17h6"/>', bell: '<path d="M6 16v-5a6 6 0 0112 0v5l2 2H4zM10 21h4"/>', cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>', lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>', eyeoff: '<path d="M3 3l18 18M10.6 6.2A10 10 0 0112 6c5 0 9 6 9 6a15 15 0 01-3 3.5M6.2 7.6A15 15 0 003 12s4 6 9 6a9 9 0 003.4-.7"/>', eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7"/>', phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>', search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>', down: '<path d="M6 9l6 6 6-6"/>', right: '<path d="M9 6l6 6-6 6"/>', cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', pinmap: '<path d="M12 22s7-6 7-12a7 7 0 00-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>', book: '<path d="M2 5c4-1 7 0 10 2 3-2 6-3 10-2v14c-4-1-7 0-10 2-3-2-6-3-10-2z"/><path d="M12 7v14"/>', code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>', web: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.1M10 6.5h.1"/>', palette: '<path d="M12 3a9 9 0 100 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a4 4 0 004-4c0-5-4.5-10-9-10z"/><circle cx="8" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="11" r="1"/>', dl: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>', clip: '<path d="M20 11l-8 8a5 5 0 01-7-7l9-9a3.5 3.5 0 015 5l-9 9a2 2 0 01-3-3l8-8"/>', send: '<path d="M21 3L3 11l7 3 3 7z"/>', more: '<circle cx="12" cy="5" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="12" cy="19" r="1.3"/>', pin: '<path d="M15 4l5 5-3 1-3 3 .5 4-1.5 1.5-3-3L5 20l-1-1 4.5-4.5-3-3L7 10l4 .5 3-3z"/>', plus: '<path d="M12 5v14M5 12h14"/>', grid: '<rect x="4" y="4" width="16" height="16" rx="2"/>' };
  const ic = (r = document) => $$('i[data-i]', r).forEach(e => e.innerHTML = '<svg viewBox="0 0 24 24">' + (IC[e.dataset.i] || '') + '</svg>');
  const AV = '<span class="av"><svg viewBox="0 0 40 40"><circle cx="20" cy="15" r="7"/><path d="M5 40c0-10 7-14 15-14s15 4 15 14z"/></svg></span>';
  const page = document.body.dataset.page, u = me(), err = m => { $('#err').textContent = m; };
  const resetLegacyCommunityData = () => {
    const key = 'davv_community_reset_v2'; if (localStorage.getItem(key) === 'done')
      return;[localStorage, sessionStorage].forEach(store => {
        const old = []; for (let i = 0; i < store.length; i++) {
          const name = store.key(i);
          if (name && /^(chat_|cats_)/i.test(name))
            old.push(name);
        } old.forEach(name => store.removeItem(name));
      }); localStorage.setItem(key, 'done');
  };
  if (u && u.prof)
    resetLegacyCommunityData();
  if (['home', 'communities', 'departments', 'notices'].includes(page)) {
    if (!u)
      return go('index.html');
    if (!u.prof)
      return go('onboarding.html');
  }
  if (page == 'onboarding' && !u)
    return go('index.html');
  $$('.eye').forEach(b => b.onclick = () => { const i = b.parentNode.querySelector('input'), s = i.type == 'password'; i.type = s ? 'text' : 'password'; b.dataset.i = s ? 'eye' : 'eyeoff'; ic(b.parentNode); });
  const uni = $('#uni');
  if (uni)
    uni.onclick = () => { (page == 'login' ? $('#id') : $('#em')).focus(); err('Enter your university email (name@davv.ac.in) above.'); };
  if (page == 'login') {
    let mode = 'email';
    $$('.tabs button').forEach(b => b.onclick = () => { mode = b.dataset.t; $$('.tabs button').forEach(x => x.classList.toggle('on', x == b)); const i = $('#id'), em = mode == 'email'; i.type = em ? 'email' : 'tel'; i.value = ''; i.placeholder = em ? 'Enter your email address' : 'Enter your mobile number'; $('.fld i').dataset.i = em ? 'mail' : 'phone'; ic($('.fld')); err(''); });
    $('#fp').onclick = e => { e.preventDefault(); err('Password reset is coming soon.'); };
    $('#f').onsubmit = e => {
      e.preventDefault();
      const id = $('#id').value.trim().toLowerCase(), pw = $('#pw').value;
      if (!id || !pw)
        return err('Enter your ' + (mode == 'email' ? 'email' : 'mobile number') + ' and password.');
      const x = users().find(a => (mode == 'email' ? a.email : a.mobile) == id);
      if (!x)
        return err('No account found. Please create an account first.');
      if (x.pw != pw)
        return err('Incorrect password. Try again.');
      localStorage.removeItem('session');
      sessionStorage.removeItem('session');
      ($('#rm').checked ? localStorage : sessionStorage).setItem('session', x.email);
      go(x.prof ? 'home.html' : 'onboarding.html');
    };
  }
  if (page == 'signup')
    $('#f').onsubmit = e => {
      e.preventDefault();
      const g = i => $('#' + i).value.trim(), n = g('n'), em = g('em').toLowerCase(), mo = g('mo'), p = $('#pw').value;
      if (!n)
        return err('Enter your full name.');
      if (!/^\S+@\S+\.\S+$/.test(em))
        return err('Enter a valid email address.');
      if (mo && !/^\d{10}$/.test(mo))
        return err('Mobile number must be 10 digits.');
      if (p.length < 6)
        return err('Password must be at least 6 characters.');
      if (p != $('#cp').value)
        return err('Passwords do not match.');
      if (!$('#tc').checked)
        return err('Please accept the Terms of Service and Privacy Policy.');
      if (users().some(a => a.email == em))
        return err('This email already has an account. Please log in.');
      W('users', [...users(), { name: n, email: em, mobile: mo, pw: p }]);
      sessionStorage.removeItem('session');
      localStorage.setItem('session', em);
      go('onboarding.html');
    };
  if (page == 'onboarding') {
    const O = { dept: ['Computer Science', 'DDUKK', 'Management Studies', 'Commerce', 'Mathematics', 'Physics', 'Chemistry', 'Law', 'Education'], prog: ['BCA', 'MCA', 'BBA', 'MBA', 'B.Sc', 'M.Sc', 'B.Com', 'M.Com', 'B.Tech'], sem: [1, 2, 3, 4, 5, 6, 7, 8].map(n => 'Semester ' + n), batch: [2020, 2021, 2022, 2023, 2024, 2025, 2026] };
    Object.keys(O).forEach(k => {
      $('#dl-' + k).innerHTML = O[k].map(x => '<option value="' + x + '">').join(''); if (u.prof)
        $('#' + k).value = u.prof[k] || '';
    });
    const selectedDepartment = new URLSearchParams(location.search).get('dept');
    if (selectedDepartment)
      $('#dept').value = selectedDepartment;
    $('#f').onsubmit = e => {
      e.preventDefault();
      const g = k => $('#' + k).value.trim(), sem = g('sem').replace(/^(?:sem(?:ester)?\s*)?(\d+)$/i, 'Semester $1');
      if (!g('dept') || !g('prog') || !sem)
        return err('Please fill in your department, programme and year / semester.');
      u.prof = { dept: g('dept'), prog: g('prog'), sem, batch: g('batch') };
      W('users', users().map(a => a.email == u.email ? u : a));
      go('home.html');
    };
  }
  if (u && u.prof && page != 'onboarding') {
    const p = u.prof, nav = [['home', 'Home', 'home'], ['communities', 'Communities', 'users'], ['departments', 'Departments', 'dept'], ['notices', 'Notices', 'file']];
    document.body.insertAdjacentHTML('afterbegin', '<header class="top"><a class="bl" href="home.html"><img src="img/logo.png" alt=""><div><b>DAVV Connect</b><small>Your University. Your People. Your Community.</small></div></a><div class="tr"><span class="bell"><i data-i="bell"></i>' + (page == 'home' ? '<s></s>' : '') + '</span><div class="um" id="um">' + AV + '<div><b>' + esc(u.name) + '</b><small>' + esc(p.prog + ' · ' + p.sem) + '</small></div><i data-i="down"></i><div class="dd" onclick="event.stopPropagation()"><p>Department<b>' + esc(p.dept) + '</b></p><p>Programme<b>' + esc(p.prog) + '</b></p><p>Semester<b>' + esc(p.sem) + '</b></p>' + (p.batch ? '<p>Batch<b>' + esc(p.batch) + '</b></p>' : '') + '<a href="onboarding.html">Edit profile</a><a href="index.html" id="lo">Log out</a></div></div></div></header><div class="shell"><aside>' + nav.map(n => '<a href="' + n[0] + '.html" class="' + (page == n[0] ? 'on' : '') + '"><i data-i="' + n[2] + '"></i>' + n[1] + '</a>').join('') + '</aside></div>');
    $('.shell').append($('main'));
    $('#um').onclick = () => $('#um').classList.toggle('open');
    $('#lo').onclick = () => { localStorage.removeItem('session'); sessionStorage.removeItem('session'); };
    function setupHomeSearch(student) {
      const input = $('#hq'), panel = $('#home-search-results');
      const departments = [
        { name: 'Computer Science', groups: ['C Programming', 'Web Development', 'Graphic Designing'] },
        { name: 'DDUKK', groups: ['C Programming', 'Web Development', 'Graphic Designing'] },
        { name: 'Management Studies', groups: ['Principles of Management', 'Business Communication', 'Marketing'] },
        { name: 'Commerce', groups: ['Financial Accounting', 'Business Law', 'Taxation'] },
        { name: 'Mathematics', groups: ['Algebra', 'Calculus', 'Statistics'] },
        { name: 'Physics', groups: ['Mechanics', 'Electromagnetism', 'Modern Physics'] },
        { name: 'Chemistry', groups: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'] },
        { name: 'Law', groups: ['Constitutional Law', 'Legal Research', 'Moot Court'] },
        { name: 'Education', groups: ['Educational Psychology', 'Teaching Methods', 'Curriculum Studies'] }
      ];
      const subjects = {
        'computer science': ['C Programming', 'Web Development', 'Graphic Designing'],
        'ddukk': ['C Programming', 'Web Development', 'Graphic Designing'],
        'management studies': ['Principles of Management', 'Business Communication', 'Marketing'],
        'commerce': ['Financial Accounting', 'Business Law', 'Taxation'],
        'mathematics': ['Algebra', 'Calculus', 'Statistics'],
        'physics': ['Mechanics', 'Electromagnetism', 'Modern Physics'],
        'chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
        'law': ['Constitutional Law', 'Legal Research', 'Moot Court'],
        'education': ['Educational Psychology', 'Teaching Methods', 'Curriculum Studies']
      };
      const index = () => {
        const homeItems = $$('.home-grid .cd').flatMap(card => {
          const category = card.querySelector('h2')?.textContent.trim() || 'University';
          return [...card.querySelectorAll('a')].map(link => ({
            type: category,
            title: link.querySelector('b')?.textContent.trim() || link.textContent.trim(),
            detail: link.textContent.trim().replace(/\s+/g, ' '),
            href: link.getAttribute('href') || 'notices.html'
          }));
        });
        const departmentItems = departments.map(item => ({
          type: 'Department',
          title: item.name,
          detail: 'Department groups: ' + item.groups.join(', '),
          href: 'departments.html'
        }));
        const official = subjects[String(student.dept || '').toLowerCase()] || ['Department Announcements', student.prog + ' · ' + student.sem, 'Student Help Desk'];
        const communityItems = [
          { type: 'Community', title: 'Official (' + student.dept + ')', detail: 'Department community · 1 member', href: 'communities.html#official' },
          ...official.map((name, i) => ({ type: 'Official group', title: name, detail: 'Official (' + student.dept + ') · 1 member', href: 'communities.html#official-' + i })),
          ...(J('cats_' + student.email) || []).map((group, i) => ({ type: 'Your group', title: typeof group === 'string' ? group : group.t, detail: 'Created by you · 1 member', href: 'communities.html#your-' + i }))
        ];
        return [...homeItems, ...departmentItems, ...communityItems, { type: 'My profile', title: student.name, detail: [student.dept, student.prog, student.sem].filter(Boolean).join(' · '), href: 'onboarding.html' }];
      };
      const render = () => {
        const raw = input.value.trim(), words = raw.toLowerCase().split(/\s+/).filter(Boolean);
        if (!words.length) {
          panel.hidden = true;
          panel.innerHTML = '';
          return;
        }
        const results = index().filter(item => words.every(word => (item.type + ' ' + item.title + ' ' + item.detail).toLowerCase().includes(word))).slice(0, 10);
        panel.hidden = false;
        panel.innerHTML = results.length ? results.map(item => '<a class="home-search-result" role="option" href="' + esc(item.href) + '"><span class="home-search-kind">' + esc(item.type) + '</span><span class="home-search-copy"><b>' + esc(item.title) + '</b><small>' + esc(item.detail) + '</small></span><i data-i="right"></i></a>').join('') : '<div class="home-search-empty"><b>No matches found</b><small>Try a notice, course, department, or group name.</small></div>';
        ic(panel);
      };
      input.addEventListener('input', render);
      input.addEventListener('focus', () => {
        if (input.value.trim())
          render();
      });
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          const first = panel.querySelector('a');
          if (first) {
            event.preventDefault();
            location.href = first.href;
          }
        }
        if (event.key === 'ArrowDown' && !panel.hidden) {
          const first = panel.querySelector('a');
          if (first) {
            event.preventDefault();
            first.focus();
          }
        }
        if (event.key === 'Escape') {
          panel.hidden = true;
        }
      });
      panel.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          event.preventDefault();
          panel.hidden = true;
          input.focus();
        }
      });
      document.addEventListener('click', event => {
        if (!event.target.closest('.hero'))
          panel.hidden = true;
      });
    }
    if (page == 'home') {
      const h = new Date().getHours();
      $('#gr').textContent = h < 12 ? 'Good morning,' : h < 17 ? 'Good afternoon,' : 'Good evening,';
      $('#nm').textContent = u.name + '.';
      $('#cl').textContent = [p.prog, p.sem, p.dept].join(' · ');
      $$('.pg').forEach(e => e.textContent = p.prog);
      $$('.sem').forEach(e => e.textContent = p.sem);
      $$('.dp').forEach(e => e.textContent = p.dept);
      $('#home-community-summary').innerHTML = '<a class="it" href="communities.html#official"><span class="ib"><i data-i="dept"></i></span><div><b>Official (' + esc(p.dept) + ')</b><small>1 member · Department groups</small></div><i data-i="right"></i></a><a class="it" href="communities.html#your"><span class="ib g1"><i data-i="users"></i></span><div><b>Your Communities</b><small>' + ((J('cats_' + u.email) || []).length) + ' ' + (((J('cats_' + u.email) || []).length) == 1 ? 'group' : 'groups') + ' · ' + ((J('cats_' + u.email) || []).length ? 'created by you' : 'no groups yet') + '</small></div><i data-i="right"></i></a>';
      setupHomeSearch(p);
      addEventListener('keydown', e => {
        if (e.ctrlKey && e.key == 'k') {
          e.preventDefault();
          $('#hq').focus();
        }
      });
    }
    if (page == 'communities') {
      const K = 'chat_' + u.email, CK = 'cats_' + u.email;
      let tab = 'official', cur = 'o0', q = '', chat = J(K) || {}, cats = J(CK) || [];
      const officialSubjects = { 'computer science': ['C Programming', 'Web Development', 'Graphic Designing'], 'ddukk': ['C Programming', 'Web Development', 'Graphic Designing'], 'management studies': ['Principles of Management', 'Business Communication', 'Marketing'], 'commerce': ['Financial Accounting', 'Business Law', 'Taxation'], 'mathematics': ['Algebra', 'Calculus', 'Statistics'], 'physics': ['Mechanics', 'Electromagnetism', 'Modern Physics'], 'chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'], 'law': ['Constitutional Law', 'Legal Research', 'Moot Court'], 'education': ['Educational Psychology', 'Teaching Methods', 'Curriculum Studies'] };
      const O = () => { const names = officialSubjects[p.dept.toLowerCase()] || ['Department Announcements', p.prog + ' · ' + p.sem, 'Student Help Desk']; return names.map((t, i) => ({ id: 'o' + i, t, i: ['code', 'web', 'palette'][i], s: '1 member' })); };
      const Y = () => cats.map((c, i) => ({ t: typeof c === 'string' ? c : c.t, s: '1 member', i: 'users', id: 'y' + i }));
      const now = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      const msgs = id => chat[id] || [];
      const M = m => '<div class="msg' + (m.me ? ' me' : '') + '">' + AV + '<div class="bub"><b class="' + (m.a ? 'an' : '') + '">' + esc(m.n) + '</b>' + (m.x ? '<p>' + esc(m.x) + '</p>' : '') + (m.f ? '<div class="file"><i data-i="file"></i><div><b>' + esc(m.f) + '</b><small>' + esc(m.z) + '</small></div><i data-i="dl"></i></div>' : '') + '</div><time>' + m.t + '</time></div>';
      const L = () => {
        const a = (tab == 'official' ? O() : Y()).filter(x => x.t.toLowerCase().includes(q));
        $('#lh').innerHTML = tab == 'official' ? '<i data-i="dept"></i><div><b>Official (' + esc(p.dept) + ')</b><small>Department groups</small></div><i class="pin" data-i="pin"></i>' : '<i data-i="users"></i><div><b>Your Communities</b><small>Groups created by you</small></div>';
        $('#ll').innerHTML = a.map(x => '<a data-id="' + x.id + '" class="' + (x.id == cur ? 'on' : '') + '"><span class="ib"><i data-i="' + x.i + '"></i></span><div><b>' + esc(x.t) + '</b><small>' + esc(x.s) + '</small></div><i data-i="right"></i></a>').join('') || (!a.length && tab == 'your' && !q ? '<div class="community-empty"><p>Your groups will appear here.</p><button type="button" id="empty-create">Create your first group</button></div>' : '<p class="empty">No communities found.</p>');
        ic($('.lf'));
      };
      const C = () => {
        const x = [...O(), ...Y()].find(z => z.id == cur) || { t: tab == 'your' ? 'Your Communities' : 'Official ' + p.dept, s: '' };
        $('#ct').textContent = x.t;
        $('#cs').textContent = tab == 'official' ? 'Official ' + p.dept + ' subject community' : 'Community';
        $('#cm').textContent = x.s || '';
        $('#ci').dataset.i = x.i || 'users';
        const messages = msgs(cur);
        $('#ms').innerHTML = messages.length ? '<div class="dv">Today, ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + '</div>' + messages.map(M).join('') : '<div class="chat-empty"><b>No messages yet</b><p>Start the conversation whenever you are ready.</p></div>';
        $('#cf').hidden = tab == 'your' && !Y().length;
        ic($('.rt'));
        $('#ms').scrollTop = 1e7;
      };
      const T = t => { tab = t; cur = t == 'official' ? 'o0' : ((Y()[0] || {}).id || ''); $$('.pills [data-t]').forEach(b => b.classList.toggle('on', b.dataset.t == t)); L(); C(); };
      const send = m => { chat[cur] = [...msgs(cur), { n: u.name, me: 1, a: 1, t: now(), ...m }]; W(K, chat); C(); };
      $('#t1').textContent = 'Official (' + p.dept + ')';
      $$('.pills [data-t]').forEach(b => b.onclick = () => T(b.dataset.t));
      $('#ll').onclick = e => {
        if (e.target.closest('#empty-create')) {
          $('#cc').click();
          return;
        } const a = e.target.closest('a'); if (a) {
          cur = a.dataset.id;
          L();
          C();
        }
      };
      $('#sq').oninput = e => { q = e.target.value.toLowerCase(); L(); };
      const createModal = window.bootstrap ? bootstrap.Modal.getOrCreateInstance($('#createGroupModal')) : null;
      const saveGroup = name => {
        const clean = name.trim().slice(0, 48); if (!clean) {
          $('#group-error').textContent = 'Enter a name for your group.';
          return;
        } if (cats.some(item => String(item).toLowerCase() === clean.toLowerCase())) {
          $('#group-error').textContent = 'You already have a group with that name.';
          return;
        } cats.push(clean); W(CK, cats); if (createModal)
          createModal.hide(); T('your'); cur = 'y' + (Y().length - 1); L(); C();
      };
      const openGroupForm = () => {
        if (createModal) {
          $('#group-name').value = '';
          $('#group-error').textContent = '';
          createModal.show();
          setTimeout(() => $('#group-name').focus(), 150);
        }
        else {
          const name = prompt('Name your new group:');
          if (name)
            saveGroup(name);
        }
      };
      $('#cc').onclick = openGroupForm;
      $('#create-group-form').onsubmit = e => { e.preventDefault(); saveGroup($('#group-name').value); };
      $('#cf').onsubmit = e => {
        e.preventDefault(); const v = $('#mi').value.trim(); if (v) {
          send({ x: v });
          $('#mi').value = '';
        }
      };
      $('#clip').onclick = () => $('#fi').click();
      $('#fi').onchange = e => {
        const f = e.target.files[0]; if (f)
          send({ f: f.name, z: f.name.split('.').pop().toUpperCase() + ' · ' + Math.max(1, Math.round(f.size / 1024)) + ' KB' }); e.target.value = '';
      };
      const h = location.hash.match(/#your(?:-(\d+))?/), officialHash = location.hash.match(/#official(?:-(\d+))?/);
      T(h ? 'your' : 'official');
      if (h && h[1]) {
        cur = 'y' + h[1];
        L();
        C();
      }
      else if (officialHash && officialHash[1]) {
        cur = 'o' + officialHash[1];
        L();
        C();
      }
    }
  }
  function sameName(left, right) { return String(left || '').trim().toLowerCase() === String(right || '').trim().toLowerCase(); }
  function setupDepartments(student) {
    const entries = [
      { name: 'Computer Science', groups: ['C Programming', 'Web Development', 'Graphic Designing'], icon: 'code' },
      { name: 'DDUKK', groups: ['C Programming', 'Web Development', 'Graphic Designing'], icon: 'web' },
      { name: 'Management Studies', groups: ['Principles of Management', 'Business Communication', 'Marketing'], icon: 'cap' },
      { name: 'Commerce', groups: ['Financial Accounting', 'Business Law', 'Taxation'], icon: 'book' },
      { name: 'Mathematics', groups: ['Algebra', 'Calculus', 'Statistics'], icon: 'grid' },
      { name: 'Physics', groups: ['Mechanics', 'Electromagnetism', 'Modern Physics'], icon: 'palette' },
      { name: 'Chemistry', groups: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'], icon: 'grid' },
      { name: 'Law', groups: ['Constitutional Law', 'Legal Research', 'Moot Court'], icon: 'file' },
      { name: 'Education', groups: ['Educational Psychology', 'Teaching Methods', 'Curriculum Studies'], icon: 'users' }
    ].sort((left, right) => sameName(left.name, student.dept) ? -1 : sameName(right.name, student.dept) ? 1 : left.name.localeCompare(right.name));
    let query = '';
    const list = $('#department-list');
    const render = () => {
      const rows = entries.filter(item => item.name.toLowerCase().includes(query));
      list.innerHTML = rows.map(item => {
        const active = sameName(item.name, student.dept);
        return '<div class="col-12 col-md-6 col-xl-4"><article class="department-card' + (active ? ' current' : '') + '"><div class="department-card-top"><span class="ib"><i data-i="' + item.icon + '"></i></span>' + (active ? '<span class="department-badge">Your department</span>' : '') + '</div><h2>' + esc(item.name) + '</h2><p class="department-description">Department groups and academic discussion channels.</p><div class="subject-chips">' + item.groups.map(name => '<span>' + esc(name) + '</span>').join('') + '</div><a class="department-action" href="' + (active ? 'communities.html#official' : 'onboarding.html?dept=' + encodeURIComponent(item.name)) + '">' + (active ? 'Open official community' : 'Choose in profile') + ' <i data-i="right"></i></a></article></div>';
      }).join('') || '<div class="col-12"><div class="empty-panel">No departments match your search.</div></div>';
      ic(list);
    };
    $('#department-search').oninput = event => { query = event.target.value.trim().toLowerCase(); render(); };
    render();
  }
  function sameName(left, right) { return String(left || '').trim().toLowerCase() === String(right || '').trim().toLowerCase(); }
  function setupNotices(student) {
    const updates = [
      { kind: 'notices', label: 'Examination', title: 'Odd Semester Examination Timetable 2024–25', owner: 'Examination Department', date: '14 Oct 2026', icon: 'file', summary: 'Examination timetable update for the odd semester.', details: 'Review the published timetable and confirm your examination dates with the Examination Department.' },
      { kind: 'notices', label: 'Academics', title: 'Updated Syllabus for ' + student.prog + ' – ' + student.sem, owner: 'School of ' + student.dept, date: '12 Oct 2026', icon: 'book', summary: 'Academic syllabus information for your programme and semester.', details: 'Check the latest syllabus with your department before planning coursework or assessment preparation.' },
      { kind: 'notices', label: 'Results', title: 'Result Declaration – Even Semester 2024', owner: 'Examination Department', date: '09 Oct 2026', icon: 'file', summary: 'Result declaration information from the Examination Department.', details: 'Use the official university result portal for result details and student-specific records.' },
      { kind: 'deadlines', label: 'Deadline', title: 'Assignment Submission', owner: 'Data Structures · ' + student.prog, date: '15 Oct 2026', icon: 'cal', summary: 'Submit the current Data Structures assignment to your department.', details: 'Confirm submission format and location with your course instructor.' },
      { kind: 'deadlines', label: 'Deadline', title: 'Examination Form (Regular)', owner: 'Odd Semester 2024–25', date: '20 Oct 2026', icon: 'cal', summary: 'Regular examination form submission deadline.', details: 'Review your form details before submission and keep the acknowledgement for your records.' },
      { kind: 'deadlines', label: 'Deadline', title: 'Project Synopsis Submission', owner: 'Mini Project · ' + student.prog, date: '25 Oct 2026', icon: 'cal', summary: 'Submit the project synopsis for review.', details: 'Check department instructions for the required synopsis format and supervisor approval.' },
      { kind: 'events', label: 'Workshop', title: 'Web Development Workshop', owner: 'DAVV Main Campus · 10:00 AM', date: '18 Oct 2026', icon: 'web', image: 'img/ev1.jpg', summary: 'A campus workshop focused on web development.', details: 'See the event notice or ask your department for registration details.' },
      { kind: 'events', label: 'Seminar', title: 'Career Opportunities in Tech', owner: 'Science Auditorium · 11:00 AM', date: '22 Oct 2026', icon: 'cap', image: 'img/ev2.jpg', summary: 'A seminar about technology careers and pathways.', details: 'Check with the event organizer for attendance and registration information.' },
      { kind: 'events', label: 'Competition', title: 'National Level Coding Competition', owner: 'ABV Hall · 09:00 AM', date: '28 Oct 2026', icon: 'code', image: 'img/ev3.jpg', summary: 'A coding competition hosted at the university.', details: 'Check the event notice for eligibility, registration, and participation details.' }
    ];
    let query = '';
    let filter = 'all';
    const list = $('#notice-list');
    const render = () => {
      const rows = updates.filter(item => (filter === 'all' || item.kind === filter) && [item.title, item.owner, item.label, item.summary].join(' ').toLowerCase().includes(query));
      $('#notice-count').textContent = rows.length + ' ' + (rows.length === 1 ? 'update' : 'updates');
      $('#notice-empty').hidden = rows.length > 0;
      list.innerHTML = rows.map(item => '<article class="notice-card col-12"><div class="notice-main">' + (item.image ? '<img class="notice-image" src="' + item.image + '" alt="">' : '<span class="ib notice-icon"><i data-i="' + item.icon + '"></i></span>') + '<div class="notice-content"><div class="notice-meta"><span class="tg ' + (item.kind === 'deadlines' ? 'p' : item.kind === 'events' ? 'g1' : '') + '">' + esc(item.label) + '</span><time>' + esc(item.date) + '</time></div><h2>' + esc(item.title) + '</h2><small>' + esc(item.owner) + '</small><p>' + esc(item.summary) + '</p></div><button type="button" class="notice-toggle" aria-expanded="false">Details <i data-i="down"></i></button></div><div class="notice-details" hidden><p>' + esc(item.details) + '</p></div></article>').join('');
      ic(list);
    };
    $('#notice-search').oninput = event => { query = event.target.value.trim().toLowerCase(); render(); };
    $$('.notice-filters button').forEach(button => button.onclick = () => { $$('.notice-filters button').forEach(item => item.classList.toggle('on', item === button)); filter = button.dataset.filter; render(); });
    list.onclick = event => {
      const button = event.target.closest('.notice-toggle');
      if (!button)
        return;
      const details = button.closest('.notice-card').querySelector('.notice-details');
      details.hidden = !details.hidden;
      button.setAttribute('aria-expanded', String(!details.hidden));
      button.innerHTML = (details.hidden ? 'Details' : 'Hide') + ' <i data-i="down"></i>';
      ic(button);
    };
    render();
  }
  if (u && u.prof && page == 'departments')
    setupDepartments(u.prof);
  if (u && u.prof && page == 'notices')
    setupNotices(u.prof);
  ic();
})();
