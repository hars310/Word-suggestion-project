let words = [];

fetch('dictionary.txt')
  .then(response => response.text())
  .then(text => {
    words = text.split('\n');
  });

  function suggestWords(input) {
    const matches = words.filter((word) => {
      const dist = levenshteinDistance(input, word);
      return dist <= 2;
    });
    
    return matches.slice(0, 10);
  }

const suggestBtn = document.querySelector('.loginBtn');
suggestBtn.addEventListener('click', () => {
  const input = document.querySelector('.input').value.toLowerCase();
  const suggestions = suggestWords(input);
  document.querySelector('.output').value = suggestions.join(', ');
});

function levenshteinDistance(s, t) {
  if (s === t) return 0;

  const m = s.length;
  const n = t.length;

  if (m === 0) return n;
  if (n === 0) return m;

  const d = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    d[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    d[0][j] = j;
  }

  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (s[i - 1] === t[j - 1]) {
        d[i][j] = d[i - 1][j - 1];
      } else {
        d[i][j] = Math.min(
          d[i - 1][j] + 1,    // deletion
          d[i][j - 1] + 1,    // insertion
          d[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return d[m][n];
}
