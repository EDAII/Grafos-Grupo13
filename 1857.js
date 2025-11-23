function largestPathValue(colors, edges) {
  const n = colors.length;
  const adj = Array.from({ length: n }, () => []);
  const indeg = new Array(n).fill(0);

  for (const [a, b] of edges) {
    adj[a].push(b);
    indeg[b]++;
  }

  const dp = Array.from({ length: n }, () => new Array(26).fill(0));

  const queue = [];
  for (let i = 0; i < n; i++) {
    if (indeg[i] === 0) queue.push(i);
  }

  let processed = 0;
  let ans = 0;

  for (let head = 0; head < queue.length; head++) {
    const u = queue[head];
    processed++;

    const cu = colors.charCodeAt(u) - 97;
    dp[u][cu] += 1;
    ans = Math.max(ans, dp[u][cu]);

    for (const v of adj[u]) {
      for (let c = 0; c < 26; c++) {
        if (dp[u][c] > dp[v][c]) dp[v][c] = dp[u][c];
      }
      indeg[v]--;
      if (indeg[v] === 0) queue.push(v);
    }
  }

  return processed === n ? ans : -1;
}
