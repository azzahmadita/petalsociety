function updateJam() {
  var sekarang = new Date();
  document.getElementById('jam').textContent = sekarang.toLocaleTimeString('id-ID');
  document.getElementById('tanggal').textContent = sekarang.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}
updateJam();
setInterval(updateJam, 1000);

var anda = Number(localStorage.getItem('kunjunganAnda') || 0) + 1;
var total = Number(localStorage.getItem('totalKunjungan') || 1250) + 1;
localStorage.setItem('kunjunganAnda', anda);
localStorage.setItem('totalKunjungan', total);
document.getElementById('kunjunganAnda').textContent = anda;
document.getElementById('totalKunjungan').textContent = total;

function cekForm(idForm, idPesan, pesanSukses) {
  var form = document.getElementById(idForm);
  if (!form) return; 

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var pesan = document.getElementById(idPesan);
    var semuaIsi = true;

    var kolom = form.querySelectorAll('[required]');
    for (var i = 0; i < kolom.length; i++) {
      if (kolom[i].checkValidity()) {
        kolom[i].classList.remove('salah');
      } else {
        kolom[i].classList.add('salah');
        semuaIsi = false;
      }
    }

    if (semuaIsi) {
      pesan.textContent = pesanSukses.replace('{nama}', form.elements['nama'].value);
      form.reset();
    } else {
      pesan.textContent = 'Mohon lengkapi semua kolom yang berwarna merah.';
    }
  });
}

cekForm('formDaftar', 'pesanDaftar', 'Terima kasih, {nama}! Pendaftaran Anda sudah kami terima.');
cekForm('formKontak', 'pesanKontak', 'Terima kasih, {nama}! Pesan Anda sudah terkirim.');
