// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sections
    renderProducts();
    renderCart();
    updateTotals();
    renderProductsTable();
    renderCustomersTable();
    updateDashboardStats();
    renderReportsTable();

    // Set default dates for reports
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').value = today;
    document.getElementById('end-date').value = today;

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Transaction search
    document.getElementById('search-product').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Payment
    document.getElementById('bayar').addEventListener('input', updateKembalian);
    document.getElementById('checkout-btn').addEventListener('click', checkout);

    // Customer selection
    document.getElementById('select-customer-btn').addEventListener('click', showCustomerSelection);
    document.getElementById('change-customer-btn').addEventListener('click', changeCustomer);
    document.getElementById('add-new-customer-btn').addEventListener('click', function() {
        bootstrap.Modal.getInstance(document.getElementById('selectCustomerModal')).hide();
        document.getElementById('pelangganModalTitle').textContent = 'Tambah Pelanggan';
        document.getElementById('edit-pelanggan-id').value = '';
        document.getElementById('pelangganForm').reset();
        new bootstrap.Modal(document.getElementById('pelangganModal')).show();
    });

    // Product management
    document.getElementById('save-produk').addEventListener('click', saveProduct);
    document.getElementById('tambah-produk-btn').addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Tambah Produk';
        document.getElementById('edit-id').value = '';
        document.getElementById('produkForm').reset();
        new bootstrap.Modal(document.getElementById('produkModal')).show();
    });
    document.getElementById('refresh-produk-btn').addEventListener('click', renderProductsTable);
    document.getElementById('search-produk').addEventListener('input', function(e) {
        searchProducts(e.target.value);
    });

    // Customer management
    document.getElementById('save-pelanggan').addEventListener('click', saveCustomer);
    document.getElementById('tambah-pelanggan-btn').addEventListener('click', function() {
        document.getElementById('pelangganModalTitle').textContent = 'Tambah Pelanggan';
        document.getElementById('edit-pelanggan-id').value = '';
        document.getElementById('pelangganForm').reset();
        new bootstrap.Modal(document.getElementById('pelangganModal')).show();
    });
    document.getElementById('search-pelanggan').addEventListener('input', function(e) {
        searchCustomers(e.target.value);
    });

    // Reports
    document.getElementById('filter-reports').addEventListener('click', filterReports);
    document.getElementById('export-reports').addEventListener('click', exportReports);
});