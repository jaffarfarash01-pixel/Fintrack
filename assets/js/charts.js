/**
 * charts.js
 * Pure-canvas donut chart for spending breakdown.
 * No external chart library needed.
 */

const CAT_COLORS = {
  food:          '#ffd93d',
  transport:     '#7fffd4',
  entertainment: '#c084fc',
  education:     '#93c5fd',
  health:        '#4ade80',
  income:        '#34d399',
  other:         '#9ca3af',
};

function drawDonut(spending) {
  const canvas = document.getElementById('donutChart');
  if (!canvas) return;
  const ctx   = canvas.getContext('2d');
  const cx    = 110, cy = 110, radius = 90, hole = 55;

  ctx.clearRect(0, 0, 220, 220);

  const cats  = Object.keys(spending);
  const total = cats.reduce((s, c) => s + spending[c], 0);

  if (!total) {
    // Empty state circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#2a2f3e';
    ctx.fill();
    // hole
    ctx.beginPath();
    ctx.arc(cx, cy, hole, 0, Math.PI * 2);
    ctx.fillStyle = '#1e2330';
    ctx.fill();
    // text
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px DM Sans';
    ctx.textAlign = 'center';
    ctx.fillText('No expenses', cx, cy + 5);
    document.getElementById('chartLegend').innerHTML =
      '<div style="color:var(--muted);font-size:0.85rem">Add expenses to see chart</div>';
    return;
  }

  // Draw slices
  let startAngle = -Math.PI / 2;
  cats.forEach(cat => {
    const slice = (spending[cat] / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, startAngle + slice);
    ctx.closePath();
    ctx.fillStyle = CAT_COLORS[cat] || '#9ca3af';
    ctx.fill();
    startAngle += slice;
  });

  // Centre hole
  ctx.beginPath();
  ctx.arc(cx, cy, hole, 0, Math.PI * 2);
  ctx.fillStyle = '#1e2330';
  ctx.fill();

  // Centre text
  ctx.fillStyle = '#e8eaf0';
  ctx.font = 'bold 13px Syne';
  ctx.textAlign = 'center';
  ctx.fillText('Spending', cx, cy - 6);
  ctx.font = '11px DM Sans';
  ctx.fillStyle = '#6b7280';
  ctx.fillText('by category', cx, cy + 10);

  // Legend
  document.getElementById('chartLegend').innerHTML = cats.map(cat => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${CAT_COLORS[cat] || '#9ca3af'}"></div>
      <span>${cat.charAt(0).toUpperCase() + cat.slice(1)} — ₹${fmt(spending[cat])}</span>
    </div>
  `).join('');
}
