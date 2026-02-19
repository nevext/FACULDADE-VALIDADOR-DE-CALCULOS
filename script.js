// small UI behaviour + draw a simple sparkline to match the screenshot
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (keeps dark by default but toggles a lighter accent for demo)
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// draw a low flat sparkline with dots (values intentionally low to sit near baseline)
function drawSparkline(values = [0,0,0,0,0,0,0]){
  const svg = document.getElementById('spark');
  const W = 600, H = 220; svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = '';

  const padding = 30;
  const w = W - padding * 2;
  const h = H - padding * 2;
  const max = Math.max(...values, 1);

  const points = values.map((v,i)=>{
    const x = padding + (i/(values.length-1))*w;
    // invert y so 0 is near bottom but not exactly at border
    const y = padding + h - (v/max) * (h * 0.25); // keep values low
    return {x:Math.round(x), y:Math.round(y)};
  });

  // grid lines (subtle)
  for(let i=0;i<4;i++){
    const y = padding + (i/3)*h;
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', padding);
    line.setAttribute('x2', W-padding);
    line.setAttribute('y1', y);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', 'rgba(255,255,255,0.03)');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  }

  // polyline path
  const path = document.createElementNS('http://www.w3.org/2000/svg','polyline');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#19a3ff');
  path.setAttribute('stroke-width', '2.6');
  path.setAttribute('stroke-linecap','round');
  path.setAttribute('stroke-linejoin','round');
  path.setAttribute('points', points.map(p=>`${p.x},${p.y}`).join(' '));
  svg.appendChild(path);

  // dots
  points.forEach(p=>{
    const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx', p.x);
    c.setAttribute('cy', p.y);
    c.setAttribute('r', 4.5);
    c.setAttribute('fill', '#00bfff');
    c.setAttribute('stroke', '#0b2230');
    c.setAttribute('stroke-width', '1.4');
    svg.appendChild(c);
  });
}

drawSparkline([0,0,0,0,0,0,0]);

// small interactivity for tabs and period buttons (visual only)
document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click', e=>{
  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
  e.currentTarget.classList.add('active');
}));

document.querySelectorAll('.period').forEach(btn=>btn.addEventListener('click', e=>{
  document.querySelectorAll('.period').forEach(b=>b.classList.remove('active'));
  e.currentTarget.classList.add('active');
}));
