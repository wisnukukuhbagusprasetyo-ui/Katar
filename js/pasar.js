import { auth, db } from './firebase.js';
import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { uploadToCloudinary } from './cloudinary.js';
import { qs, toast } from './ui.js';
import { CURRENT_ROLE } from './roles.js';

const grid = qs('#produkGrid'),
      btnTambah = qs('#btnTambahProduk'),
      modal = qs('#modalProduk'),
      simpan = qs('#simpanProduk'),
      batal = qs('#batalProduk');

// Tampilkan tombol tambah hanya jika role valid, setelah delay agar sinkron
setTimeout(() => {
  if (["kontributor", "sekretaris", "bendahara", "wakil_admin", "super_admin"].includes(CURRENT_ROLE)) {
    btnTambah.style.display = '';
  } else {
    btnTambah.style.display = 'none';
  }
}, 800);

// Klik tombol tambah → buka modal dengan validasi
btnTambah && btnTambah.addEventListener('click', () => {
  if (!["kontributor", "sekretaris", "bendahara", "wakil_admin", "super_admin"].includes(CURRENT_ROLE)) {
    return toast("🚫 Hanya anggota aktif yang boleh menambah produk!");
  }
  modal.hidden = false;
});

batal && batal.addEventListener('click', () => modal.hidden = true);

// Ambil produk realtime
const money = n => Number(n || 0).toLocaleString('id-ID');
onSnapshot(collection(db, 'pasar'), (snap) => {
  grid.innerHTML = '';
  snap.docs.sort((a, b) => (b.data().timestamp || 0) - (a.data().timestamp || 0)).forEach(d => {
    const p = d.data();
    const card = document.createElement('div');
    card.className = 'produk-card';
    card.innerHTML = `
      <img src="${p.foto || '/assets/icons/kt.svg'}" alt="${p.nama || ''}">
      <div class="pad">
        <h4>${p.nama || ''}</h4>
        <p>Rp ${money(p.harga)}</p>
        <p class="desc">${p.deskripsi || ''}</p>
        <a class="btn-wa" target="_blank"
           href="https://wa.me/${p.wa}?text=${encodeURIComponent('Halo saya ingin membeli ' + p.nama + ' (Rp ' + p.harga + ')')}">
           🛒 Beli via WhatsApp</a>
      </div>
    `;
    // Tombol hapus jika owner atau admin
    if (auth.currentUser?.uid === p.owner || ["super_admin","wakil_admin"].includes(CURRENT_ROLE)) {
      const del = document.createElement("button");
      del.textContent = "🗑️";
      del.className = "btn-del";
      del.onclick = async () => {
        if (confirm("Hapus produk ini?")) await deleteDoc(doc(db, "pasar", d.id));
      };
      card.querySelector('.pad').append(del);
    }
    grid.append(card);
  });
});

// Simpan produk baru
simpan && simpan.addEventListener('click', async () => {
  const nama = qs('#namaProduk').value.trim(),
        harga = Number(qs('#hargaProduk').value),
        deskripsi = qs('#deskripsiProduk').value.trim(),
        wa = qs('#waProduk').value.trim(),
        file = qs('#fotoProduk').files[0];

  if (!nama || !harga || !file || !wa) return toast("⚠️ Lengkapi nama, harga, foto, dan WA!");

  try {
    const foto = await uploadToCloudinary(file, 'pasar');
    await addDoc(collection(db, 'pasar'), {
      nama, harga, deskripsi, wa, foto,
      owner: auth.currentUser?.uid || null,
      timestamp: Date.now()
    });
    toast("✅ Produk berhasil ditambahkan!");
    // reset form
    qs('#namaProduk').value = '';
    qs('#hargaProduk').value = '';
    qs('#deskripsiProduk').value = '';
    qs('#waProduk').value = '';
    qs('#fotoProduk').value = '';
    modal.hidden = true;
  } catch (err) {
    toast("❌ Gagal menambah produk: " + err.message);
  }
});
