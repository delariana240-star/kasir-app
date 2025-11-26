function saveCustomer() {
    console.log('=== SAVE CUSTOMER CALLED ===');
    
    const editId = document.getElementById('edit-pelanggan-id').value;
    const name = document.getElementById('nama-pelanggan').value.trim();
    const email = document.getElementById('email-pelanggan').value.trim();
    const phone = document.getElementById('telepon-pelanggan').value.trim();
    const address = document.getElementById('alamat-pelanggan').value.trim();

    console.log('Edit ID:', editId);
    console.log('Form data:', { name, email, phone, address });

    // Validasi
    if (!name) {
        alert('Nama pelanggan harus diisi!');
        return;
    }

    try {
        if (editId) {
            // Update pelanggan yang sudah ada
            console.log('Updating customer with ID:', editId);
            updateCustomer();
        } else {
            // Tambah pelanggan baru
            console.log('Adding new customer');
            addCustomer();
        }
    } catch (error) {
        console.error('Error in saveCustomer:', error);
        alert('Terjadi kesalahan: ' + error.message);
    }
}

// Pastikan fungsi addCustomer dan updateCustomer ada
function addCustomer() {
    const name = document.getElementById('nama-pelanggan').value.trim();
    const email = document.getElementById('email-pelanggan').value.trim();
    const phone = document.getElementById('telepon-pelanggan').value.trim();
    const address = document.getElementById('alamat-pelanggan').value.trim();

    const newCustomer = {
        id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
        name,
        email: email || null,
        phone: phone || null,
        address: address || null,
        totalTransactions: 0,
        totalSpent: 0,
        createdAt: new Date().toISOString()
    };

    customers.push(newCustomer);
    
    // Update UI
    renderCustomersTable();
    
    // Tutup modal
    const modalElement = document.getElementById('pelangganModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
    
    // Reset form
    document.getElementById('pelangganForm').reset();
    
    alert('✅ Pelanggan berhasil ditambahkan!');
    console.log('Customer added:', newCustomer);
}

function updateCustomer() {
    const id = parseInt(document.getElementById('edit-pelanggan-id').value);
    const name = document.getElementById('nama-pelanggan').value.trim();
    const email = document.getElementById('email-pelanggan').value.trim();
    const phone = document.getElementById('telepon-pelanggan').value.trim();
    const address = document.getElementById('alamat-pelanggan').value.trim();

    const customerIndex = customers.findIndex(c => c.id === id);
    if (customerIndex !== -1) {
        customers[customerIndex] = {
            ...customers[customerIndex],
            name,
            email: email || null,
            phone: phone || null,
            address: address || null,
            updatedAt: new Date().toISOString()
        };

        // Update UI
        renderCustomersTable();
        
        // Tutup modal
        const modalElement = document.getElementById('pelangganModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
        
        // Reset form dan edit-id
        document.getElementById('pelangganForm').reset();
        document.getElementById('edit-pelanggan-id').value = '';
        
        alert('✅ Pelanggan berhasil diperbarui!');
        console.log('Customer updated:', customers[customerIndex]);
    }
}