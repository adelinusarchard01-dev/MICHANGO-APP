// App logic for Michango PWA (offline) - Green theme
let michango = JSON.parse(localStorage.getItem('michango')) || [];
let matumizi = JSON.parse(localStorage.getItem('matumizi')) || [];
let jinaKikundi = localStorage.getItem('jinaKikundi') || '';

// init UI
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('jinaKikundi').value = jinaKikundi;
  document.getElementById('onyeshaKikundi').textContent = jinaKikundi || 'Bado halijawekwa';
  onyeshaSalio();
});

function hifadhiKikundi(){
  jinaKikundi = document.getElementById('jinaKikundi').value.trim();
  localStorage.setItem('jinaKikundi', jinaKikundi);
  document.getElementById('onyeshaKikundi').textContent = jinaKikundi || 'Bado halijawekwa';
}

function leoTarehe(){ return new Date().toISOString().split('T')[0]; }

function ongezaMichango(){
  const jina = document.getElementById('mwanachama').value.trim();
  const kiasi = parseFloat(document.getElementById('kiasi').value);
  const tarehe = leoTarehe();
  if(!jina || isNaN(kiasi)) { alert('Tafadhali jaza jina na kiasi sahihi.'); return; }
  michango.push({jina,kiasi,tarehe});
  localStorage.setItem('michango', JSON.stringify(michango));
  document.getElementById('mwanachama').value=''; document.getElementById('kiasi').value='';
  onyeshaSalio();
}

function ongezaMatumizi(){
  const maelezo = document.getElementById('maelezo').value.trim();
  const kiasi = parseFloat(document.getElementById('matumizi').value);
  const tarehe = leoTarehe();
  if(!maelezo || isNaN(kiasi)) { alert('Tafadhali jaza maelezo na kiasi sahihi.'); return; }
  matumizi.push({maelezo,kiasi,tarehe});
  localStorage.setItem('matumizi', JSON.stringify(matumizi));
  document.getElementById('maelezo').value=''; document.getElementById('matumizi').value='';
  onyeshaSalio();
}

function onyeshaSalio(){
  const jumlaMichango = michango.reduce((s,m)=>s+m.kiasi,0);
  const jumlaMatumizi = matumizi.reduce((s,m)=>s+m.kiasi,0);
  const salio = jumlaMichango - jumlaMatumizi;

  let html = `<h3>Ripoti ya ${jinaKikundi || 'Kikundi'}</h3>`;
  html += `<p><strong>Jumla ya Michango:</strong> ${jumlaMichango}</p>`;
  html += `<p><strong>Jumla ya Matumizi:</strong> ${jumlaMatumizi}</p>`;
  html += `<p><strong>Salio:</strong> ${salio}</p>`;

  html += `<h4>Orodha ya Michango</h4>`;
  html += `<table><tr><th>Jina</th><th>Kiasi</th><th>Tarehe</th><th>Kitendo</th></tr>`;
  michango.forEach((m,i)=>{
    html += `<tr><td>${m.jina}</td><td>${m.kiasi}</td><td>${m.tarehe}</td><td><button onclick="badilishaChango(${i})">Badilisha</button></td></tr>`;
  });
  html += `</table>`;

  html += `<h4>Orodha ya Matumizi</h4>`;
  html += `<table><tr><th>Maelezo</th><th>Kiasi</th><th>Tarehe</th><th>Kitendo</th></tr>`;
  matumizi.forEach((m,i)=>{
    html += `<tr><td>${m.maelezo}</td><td>${m.kiasi}</td><td>${m.tarehe}</td><td><button onclick="badilishaMatumizi(${i})">Badilisha</button></td></tr>`;
  });
  html += `</table>`;

  document.getElementById('ripoti').innerHTML = html;
}

function onyeshaKwaTarehe(){
  const tareheChaguo = document.getElementById('chaguaTarehe').value;
  if(!tareheChaguo){ alert('Chagua tarehe kwanza'); return; }
  const michangoFiltered = michango.filter(m=>m.tarehe===tareheChaguo);
  const matumiziFiltered = matumizi.filter(m=>m.tarehe===tareheChaguo);
  const jumlaMichango = michangoFiltered.reduce((s,m)=>s+m.kiasi,0);
  const jumlaMatumizi = matumiziFiltered.reduce((s,m)=>s+m.kiasi,0);
  const salio = jumlaMichango - jumlaMatumizi;
  let html = `<h3>Ripoti ya ${tareheChaguo} (${jinaKikundi||'Kikundi'})</h3>`;
  html += `<p><strong>Jumla ya Michango:</strong> ${jumlaMichango}</p>`;
  html += `<p><strong>Jumla ya Matumizi:</strong> ${jumlaMatumizi}</p>`;
  html += `<p><strong>Salio:</strong> ${salio}</p>`;
  html += `<h4>Michango</h4>`;
  html += `<table><tr><th>Jina</th><th>Kiasi</th><th>Tarehe</th><th>Kitendo</th></tr>`;
  michangoFiltered.forEach((m,i)=> html += `<tr><td>${m.jina}</td><td>${m.kiasi}</td><td>${m.tarehe}</td><td><button onclick="badilishaChango(${i})">Badilisha</button></td></tr>`);
  html += `</table>`;
  html += `<h4>Matumizi</h4>`;
  html += `<table><tr><th>Maelezo</th><th>Kiasi</th><th>Tarehe</th><th>Kitendo</th></tr>`;
  matumiziFiltered.forEach((m,i)=> html += `<tr><td>${m.maelezo}</td><td>${m.kiasi}</td><td>${m.tarehe}</td><td><button onclick="badilishaMatumizi(${i})">Badilisha</button></td></tr>`);
  html += `</table>`;
  document.getElementById('ripoti').innerHTML = html;
}

function badilishaChango(index){
  const m = michango[index];
  document.getElementById('mwanachama').value = m.jina;
  document.getElementById('kiasi').value = m.kiasi;
  const btn = document.getElementById('ongezaBtn');
  btn.textContent = 'Update Michango';
  btn.onclick = function(){
    m.jina = document.getElementById('mwanachama').value.trim();
    m.kiasi = parseFloat(document.getElementById('kiasi').value);
    michango[index] = m;
    localStorage.setItem('michango', JSON.stringify(michango));
    alert('Michango imebadilishwa!');
    btn.textContent = 'Ongeza Michango';
    btn.onclick = ongezaMichango;
    document.getElementById('mwanachama').value=''; document.getElementById('kiasi').value='';
    onyeshaSalio();
  };
}

function badilishaMatumizi(index){
  const m = matumizi[index];
  document.getElementById('maelezo').value = m.maelezo;
  document.getElementById('matumizi').value = m.kiasi;
  const btn = document.getElementById('ongezaMatumiziBtn');
  btn.textContent = 'Update Matumizi';
  btn.onclick = function(){
    m.maelezo = document.getElementById('maelezo').value.trim();
    m.kiasi = parseFloat(document.getElementById('matumizi').value);
    matumizi[index] = m;
    localStorage.setItem('matumizi', JSON.stringify(matumizi));
    alert('Matumizi yamebadilishwa!');
    btn.textContent = 'Ongeza Matumizi';
    btn.onclick = ongezaMatumizi;
    document.getElementById('maelezo').value=''; document.getElementById('matumizi').value='';
    onyeshaSalio();
  };
}

function futaData(){
  if(confirm('Una uhakika unataka kufuta data zote?')){
    michango = []; matumizi = [];
    localStorage.removeItem('michango'); localStorage.removeItem('matumizi');
    document.getElementById('ripoti').innerHTML = '';
    alert('Data zote zimefutwa.');
  }
}

function exportCSV(){
  const jumlaMichango = michango.reduce((s,m)=>s+m.kiasi,0);
  const jumlaMatumizi = matumizi.reduce((s,m)=>s+m.kiasi,0);
  const salio = jumlaMichango - jumlaMatumizi;
  let csv = `${jinaKikundi || 'Ripoti ya Kikundi'},,,\n`;
  csv += `Tarehe ya Ripoti,${new Date().toLocaleDateString()},,,\n\n`;
  csv += `Ripoti ya Jumla,, ,\n`;
  csv += `Jumla ya Michango,${jumlaMichango},,\n`;
  csv += `Jumla ya Matumizi,${jumlaMatumizi},,\n`;
  csv += `Salio,${salio},,\n\n`;
  csv += 'Aina,Jina/Maelezo,Kiasi,Tarehe\n';
  michango.forEach(m=> csv += `Michango,${m.jina},${m.kiasi},${m.tarehe}\n`);
  matumizi.forEach(m=> csv += `Matumizi,${m.maelezo},${m.kiasi},${m.tarehe}\n`);
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url;
  a.download = `${(jinaKikundi || 'Ripoti_Kikundi')}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}
