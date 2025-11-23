function sortItems(n, m, group, beforeItems) {
  let gid = m;
  for (let i = 0; i < n; i++) {
    if (group[i] === -1) group[i] = gid++;
  }
  const G = gid;

  const itemAdj = Array.from({ length: n }, () => []);
  const itemIndeg = new Array(n).fill(0);

  const groupAdj = Array.from({ length: G }, () => []);
  const groupIndeg = new Array(G).fill(0);

  for (let i = 0; i < n; i++) {
    for (const b of beforeItems[i]) {
      itemAdj[b].push(i);
      itemIndeg[i]++;

      const gb = group[b],
        gi = group[i];
      if (gb !== gi) {
        groupAdj[gb].push(gi);
        groupIndeg[gi]++;
      }
    }
  }

  const topoSort = (adj, indeg) => {
    const q = [];
    for (let i = 0; i < indeg.length; i++) {
      if (indeg[i] === 0) q.push(i);
    }
    const order = [];
    let head = 0;
    while (head < q.length) {
      const u = q[head++];
      order.push(u);
      for (const v of adj[u]) {
        indeg[v]--;
        if (indeg[v] === 0) q.push(v);
      }
    }
    return order.length === indeg.length ? order : [];
  };

  const groupOrder = topoSort(groupAdj, groupIndeg);
  if (groupOrder.length === 0) return [];

  const itemOrder = topoSort(itemAdj, itemIndeg);
  if (itemOrder.length === 0) return [];

  const itemsInGroup = Array.from({ length: G }, () => []);
  for (const item of itemOrder) {
    itemsInGroup[group[item]].push(item);
  }

  const ans = [];
  for (const g of groupOrder) {
    ans.push(...itemsInGroup[g]);
  }

  return ans;
}
