document.addEventListener("DOMContentLoaded", function () {

    console.log("Event listener aktif!");

    /* ===============================
       OPEN MODAL TAMBAH PRODUK
    ================================ */
    const tambahProdukBtn = document.getElementById("tambah-produk-btn");
    if (tambahProdukBtn) {
        tambahProdukBtn.addEventListener("click", function () {
            console.log("Tambah Produk diklik");
            const modal = new bootstrap.Modal(document.getElementById("produkModal"));
            document.getElementById("modalTitle").textContent = "Tambah Produk";
            document.getElementById("produkForm").reset();
            document.getElementById("edit-id").value = "";
            modal.show();
        });
    }

    /* ===============================
       OPEN MODAL TAMBAH PELANGGAN
    ================================ */
    const tambahPelangganBtn = document.getElementById("tambah-pelanggan-btn");
    if (tambahPelangganBtn) {
        tambahPelangganBtn.addEventListener("click", function () {
            console.log("Tambah Pelanggan diklik");
            const modal = new bootstrap.Modal(document.getElementById("pelangganModal"));
            document.getElementById("pelangganModalTitle").textContent = "Tambah Pelanggan";
            document.getElementById("pelangganForm").reset();
            document.getElementById("edit-pelanggan-id").value = "";
            modal.show();
        });
    }

    /* ===============================
       PILIH PELANGGAN DARI HALAMAN TRANSAKSI
    ================================ */
    const pilihPelangganBtn = document.getElementById("select-customer-btn");
    if (pilihPelangganBtn) {
        pilihPelangganBtn.addEventListener("click", function () {
            console.log("Pilih Pelanggan diklik");
            const modal = new bootstrap.Modal(document.getElementById("selectCustomerModal"));
            modal.show();
        });
    }

    /* ===============================
       TAMBAH PELANGGAN BARU (dari modal Pilih Pelanggan)
    ================================ */
    const addNewCustomerBtn = document.getElementById("add-new-customer-btn");
    if (addNewCustomerBtn) {
        addNewCustomerBtn.addEventListener("click", function () {
            console.log("Tambah Pelanggan Baru dari Modal diklik");
            const modalPelanggan = new bootstrap.Modal(document.getElementById("pelangganModal"));
            modalPelanggan.show();

            // Tutup modal select pelanggan
            const modalSelect = bootstrap.Modal.getInstance(document.getElementById("selectCustomerModal"));
            if (modalSelect) modalSelect.hide();
        });
    }

});
