document.addEventListener("DOMContentLoaded", function () {
  const btnBuka = document.getElementById("btn-buka");
  const mainContent = document.getElementById("main-content");
  const musicControl = document.getElementById("music-control");
  const btnMusic = document.getElementById("btn-music");
  const musicIcon = document.getElementById("music-icon");
  const audio = document.getElementById("weddingMusic");

  // 1. FUNGSI BUKA UNDANGAN
  btnBuka.addEventListener("click", function () {
    document.body.classList.remove("no-scroll");
    mainContent.classList.remove("hidden");
    musicControl.classList.remove("hidden");
    audio.play().catch((e) => console.log("Audio play blocked"));
    btnMusic.classList.add("rotating");
    document.getElementById("mempelai").scrollIntoView({ behavior: "smooth" });
  });

  // 2. KONTROL MUSIK
  btnMusic.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      musicIcon.innerText = "🎵";
      btnMusic.classList.add("rotating");
    } else {
      audio.pause();
      musicIcon.innerText = "🔇";
      btnMusic.classList.remove("rotating");
    }
  });

  // 3. SISTEM PESAN (Buku Tamu)
  const guestbookForm = document.getElementById("guestbook-form");
  const daftarPesan = document.getElementById("daftar-pesan");

  function muatPesan() {
    const simpananPesan =
      JSON.parse(localStorage.getItem("pesan_undangan")) || [];
    daftarPesan.innerHTML = simpananPesan
      .map(
        (p) => `
            <div class="message-item">
                <strong>${p.nama}</strong>
                <p>${p.teks}</p>
            </div>
        `
      )
      .join("");
  }

  muatPesan(); // Panggil saat awal buka

  guestbookForm.addEventListener("submit", function (e) {
    e.preventDefault(); // MENCEGAH RELOAD KE COVER

    const nama = document.getElementById("nama-pengirim").value;
    const teks = document.getElementById("isi-pesan").value;

    if (nama && teks) {
      const dataPesan =
        JSON.parse(localStorage.getItem("pesan_undangan")) || [];
      dataPesan.unshift({ nama, teks });
      localStorage.setItem("pesan_undangan", JSON.stringify(dataPesan));

      guestbookForm.reset();
      muatPesan();
      alert("Terima kasih atas ucapannya!");
    }
  });
});

function copyText(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Berhasil disalin!");
  });
}
function confirmGift(penerima, bank) {
  // Masukkan nomor WhatsApp masing-masing (awali dengan 62)
  const noWaNida = "6283899262445";
  const noWaSolihin = "6289657635951";

  const nomorTujuan = penerima === "Nida" ? noWaNida : noWaSolihin;

  const pesan = `Halo ${penerima}, saya ingin mengonfirmasi bahwa saya telah mengirimkan hadiah melalui bank ${bank}. Terima kasih!`;

  // Encode pesan untuk URL
  const urlWa = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(
    pesan
  )}`;

  // Buka WhatsApp di tab baru
  window.open(urlWa, "_blank");
}

// Pastikan fungsi copyText tetap ada
function copyText(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Nomor rekening berhasil disalin: " + text);
  });
}
