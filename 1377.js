function frogPosition(n, edges, t, target) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }

  function dfs(u, parent, time, prob) {
    if (time === t) return u === target ? prob : 0;

    let kids = 0;
    for (const v of adj[u]) {
      if (v !== parent) kids++;
    }

    if (kids === 0) {
      return u === target ? prob : 0;
    }

    if (u === target) return 0;

    let ans = 0;
    for (const v of adj[u]) {
      if (v !== parent) {
        ans += dfs(v, u, time + 1, prob / kids);
      }
    }
    return ans;
  }

  return dfs(1, 0, 0, 1);
}
