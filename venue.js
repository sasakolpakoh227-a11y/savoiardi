/* SAVOIARDI: переключатель «Взрослым / Детям» на первом экране; статус бизнес-ланча (12:00-16:00 по Москве) */
(function () {
  var tabs = document.querySelectorAll('.sw [data-t]');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t); });
      document.querySelectorAll('.sv2 [data-p]').forEach(function (p) { p.hidden = p.dataset.p !== t.dataset.t; });
      var cap = document.querySelector('.sv2 .pn[data-p="' + t.dataset.t + '"] .rv');   // строки заголовка выезжают заново
      if (cap) { cap.classList.remove('in'); requestAnimationFrame(function () { requestAnimationFrame(function () { cap.classList.add('in'); }); }); }
    });
  });
  var c = document.querySelector('[data-lclock]'), s = document.querySelector('[data-lsay]'), n = document.querySelector('[data-lnow]');
  function tick() {
    var d = new Date(Date.now() + 3 * 3600e3), h = d.getUTCHours(), m = d.getUTCMinutes(), t = h + m / 60, left = 16 - t;
    var say = 'Сейчас в Ярославле. ' + (t < 12 ? 'Ланч начнётся в 12:00.' : t < 16 ? 'Ланч идёт, ещё ' + Math.floor(left) + ' ч ' + Math.round((left % 1) * 60) + ' мин.' : 'Ланч закончился, завтра с 12:00.');
    if (c) c.textContent = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    if (s) s.textContent = say;
    if (n) n.textContent = t >= 12 && t < 16 ? 'Сейчас идёт бизнес-ланч' : '';
  }
  tick(); setInterval(tick, 30000);
})();
