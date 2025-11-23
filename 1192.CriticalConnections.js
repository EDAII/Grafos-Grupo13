function criticalConnections(n, connections) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) {
    adj[a].push(b);
    adj[b].push(a);
  }

  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  const parent = new Array(n).fill(-1);
  const bridges = [];
  let time = 0;

  for (let start = 0; start < n; start++) {
    if (disc[start] !== -1) continue;

    const stack = [];
    stack.push({ u: start, idx: 0 });
    disc[start] = low[start] = time++;

    while (stack.length > 0) {
      const frame = stack[stack.length - 1];
      const u = frame.u;

      if (frame.idx < adj[u].length) {
        const v = adj[u][frame.idx];
        frame.idx++;

        if (disc[v] === -1) {
          parent[v] = u;
          disc[v] = low[v] = time++;
          stack.push({ u: v, idx: 0 });
        } else if (v !== parent[u]) {
          low[u] = Math.min(low[u], disc[v]);
        }
      } else {
        stack.pop();
        const p = parent[u];
        if (p !== -1) {
          low[p] = Math.min(low[p], low[u]);
          if (low[u] > disc[p]) bridges.push([p, u]);
        }
      }
    }
  }

  return bridges;
}
