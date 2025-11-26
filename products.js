function saveProduct() {
    console.log('=== SAVE PRODUCT CALLED ===');
    
    const editId = document.getElementById('edit-id').value;
    const name = document.getElementById('nama').value.trim();
    const price = parseInt(document.getElementById('harga').value);
    const stock = parseInt(document.getElementById('stok').value);
    const category = document.getElementById('kategori').value;
    const description = document.getElementById('deskripsi').value.trim();

    console.log('Edit ID:', editId);
    console.log('Form data:', { name, price, stock, category, description });

    // Validasi
    if (!name) {
        alert('Nama produk harus diisi!');
        return;
    }

    if (!price || price < 0) {
        alert('Harga harus diisi dan tidak boleh negatif!');
        return;
    }

    if (!stock || stock < 0) {
        alert('Stok harus diisi dan tidak boleh negatif!');
        return;
    }

    try {
        if (editId) {
            // Update produk yang sudah ada
            console.log('Updating product with ID:', editId);
            updateProduct();
        } else {
            // Tambah produk baru
            console.log('Adding new product');
            addProduct();
        }
    } catch (error) {
        console.error('Error in saveProduct:', error);
        alert('Terjadi kesalahan: ' + error.message);
    }
}

// Pastikan fungsi addProduct dan updateProduct ada
function addProduct() {
    const name = document.getElementById('nama').value.trim();
    const price = parseInt(document.getElementById('harga').value);
    const stock = parseInt(document.getElementById('stok').value);
    const category = document.getElementById('kategori').value;
    const description = document.getElementById('deskripsi').value.trim();

    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price,
        stock,
        category,
        description,
        icon: 'fa-cube',
        createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    
    // Update UI
    renderProductsTable();
    renderProducts();
    
    // Tutup modal
    const modalElement = document.getElementById('produkModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
    
    // Reset form
    document.getElementById('produkForm').reset();
    
    alert('✅ Produk berhasil ditambahkan!');
    console.log('Product added:', newProduct);
}

function updateProduct() {
    const id = parseInt(document.getElementById('edit-id').value);
    const name = document.getElementById('nama').value.trim();
    const price = parseInt(document.getElementById('harga').value);
    const stock = parseInt(document.getElementById('stok').value);
    const category = document.getElementById('kategori').value;
    const description = document.getElementById('deskripsi').value.trim();

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
        products[productIndex] = {
            ...products[productIndex],
            name,
            price,
            stock,
            category,
            description,
            updatedAt: new Date().toISOString()
        };

        // Update UI
        renderProductsTable();
        renderProducts();
        
        // Tutup modal
        const modalElement = document.getElementById('produkModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
        
        // Reset form dan edit-id
        document.getElementById('produkForm').reset();
        document.getElementById('edit-id').value = '';
        
        alert('✅ Produk berhasil diperbarui!');
        console.log('Product updated:', products[productIndex]);
    }
}