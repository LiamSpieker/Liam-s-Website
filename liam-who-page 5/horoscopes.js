(() => {
  'use strict';
  const data = window.HOROSCOPES;
  const select = document.getElementById('zodiac-sign');
  const heading = document.getElementById('forecast-sign');
  const dates = document.getElementById('forecast-dates');
  const text = document.getElementById('forecast-text');
  const dateRanges = {
    Aries: 'March 21 to April 19', Taurus: 'April 20 to May 20',
    Gemini: 'May 21 to June 20', Cancer: 'June 21 to July 22',
    Leo: 'July 23 to Aug. 22', Virgo: 'Aug. 23 to Sept. 22',
    Libra: 'Sept. 23 to Oct. 22', Scorpio: 'Oct. 23 to Nov. 21',
    Sagittarius: 'Nov. 22 to Dec. 21', Capricorn: 'Dec. 22 to Jan. 19',
    Aquarius: 'Jan. 20 to Feb. 18', Pisces: 'Feb. 19 to March 20'
  };
  // Device-local preferences only. Blocked storage must not break the generator.
  const memory = new Map();
  function read(key) {
    if (memory.has(key)) return memory.get(key);
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function save(key, value) {
    memory.set(key, value);
    try { localStorage.setItem(key, value); } catch { /* Use memory for this visit. */ }
  }
  function showForecast() {
    const sign = select.value;
    const entries = data[sign];
    const key = 'liam.horoscope.last.' + sign;
    const last = read(key);
    const candidates = entries.filter(entry => entry !== last);
    const pool = candidates.length ? candidates : entries;
    const entry = pool[Math.floor(Math.random() * pool.length)];
    heading.textContent = sign;
    dates.textContent = dateRanges[sign];
    text.textContent = entry;
    save(key, entry);
    save('liam.horoscope.sign', sign);
  }
  const remembered = read('liam.horoscope.sign');
  select.value = Object.prototype.hasOwnProperty.call(dateRanges, remembered) ? remembered : 'Aries';
  select.addEventListener('change', showForecast);
  // Back/forward navigation can restore a page without running its scripts again.
  window.addEventListener('pageshow', event => { if (event.persisted) showForecast(); });
  showForecast();
})();
