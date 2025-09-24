// Product data
const products = {
    tungku: {
        name: "Tungku Kompor",
        price: "Rp 75.000 - Rp 150.000",
        description: "Tungku kompor tradisional dari tanah liat yang tahan panas dan awet. Digunakan untuk memasak dengan kayu bakar, memberikan cita rasa makanan yang khas.",
        features: [
            "Tahan panas tinggi",
            "Desain tradisional dengan ventilasi udara optimal",
            "Membuat masakan lebih harum dan nikmat",
            "Umur pakai panjang (bisa bertahun-tahun)"
        ],
        images: [
            "image/tungku.jpg",
            "image/tungku2.jpg",
            "image/tungku3.jpg"
        ],
        materials: "Tanah liat pilihan, pasir halus, dan mineral alami",
        dimensions: "Diameter 30cm, Tinggi 25cm",
        weight: "3.5kg"
    },
    batubata: {
        name: "Batu Bata",
        price: "Rp 800 - Rp 1.200 per biji",
        description: "Batu bata merah berkualitas tinggi hasil pembakaran sempurna, cocok untuk konstruksi bangunan yang membutuhkan kekuatan dan ketahanan.",
        features: [
            "Kuat dan tahan lama",
            "Tekstur padat dan seragam",
            "Tahan terhadap cuaca ekstrim",
            "Ramah lingkungan",
            "Kemasan per 100 biji"
        ],
        images: [
            "image/bata.jpg",
            "image/bata2.jpg",
            "image/bata3.jpg"
        ],
        materials: "Tanah liat merah berkualitas tinggi",
        dimensions: "20cm x 10cm x 5cm",
        weight: "2kg per biji"
    },
    gerabah: {
        name: "Gerabah",
        price: "Mulai Rp 50.000",
        description: "Berbagai macam gerabah tradisional dengan motif khas Cibadak, mulai dari vas bunga, tempat penyimpanan, hingga barang dekoratif lainnya.",
        features: [
            "Berbagai bentuk dan ukuran",
            "Motif tradisional khas Cibadak",
            "Bisa custom sesuai permintaan",
            "Cocok untuk hadiah atau koleksi",
            "Fungsional dan dekoratif"
        ],
        images: [
            "image/gerabah.jpg",
            "image/gerabahh.jpg",
            "image/gerabahhh.jpg"
        ],
        materials: "Tanah liat pilihan dengan finishing alami",
        dimensions: "Bervariasi sesuai model",
        weight: "Bervariasi (500gr - 5kg)"
    },
    cobek: {
        name: "Cobek",
        price: "Rp 35.000 - Rp 75.000",
        description: "Cobek tanah liat tradisional dengan ulekan kayu untuk mengulek bumbu masakan. Membuat bumbu lebih halus dengan rasa yang lebih otentik.",
        features: [
            "Dilengkapi ulekan kayu",
            "Permukaan kasar alami untuk mengulek",
            "Tidak mudah retak",
            "Membuat bumbu lebih harum",
            "Pilihan ukuran kecil, sedang, besar"
        ],
        images: [
            "image/cobekk3.jpg",
            "image/cobekk2.jpg",
            "image/cobekk.jpg"
        ],
        materials: "Tanah liat campuran khusus dan kayu jati",
        dimensions: "Diameter 15cm-30cm",
        weight: "1kg - 3kg"
    }
};

// Navigation handling
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Page navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const produkDetailContent = document.getElementById('produk-detail-content');
    
    function navigateToPage(pageId, productId = null) {
        // Update active page
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId + '-page') {
                page.classList.add('active');
            }
        });
        
        // Update active nav link (except for product detail)
        if (pageId !== 'produk-detail') {
            navLinks.forEach(link => {
                link.classList.remove('active-page');
                if (link.dataset.page === pageId) {
                    link.classList.add('active-page');
                }
            });
        }
        
        // Load product detail if needed
        if (pageId === 'produk-detail' && productId && products[productId]) {
            loadProductDetail(productId);
        }
        
        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            navigateToPage(pageId);
        });
    });
    
    // Handle product detail clicks
    document.querySelectorAll('[data-page="produk-detail"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.product;
            window.location.hash = `produk-detail/${productId}`;
            navigateToPage('produk-detail', productId);
        });
    });
    
    // Handle initial page from URL hash
    function parseHash() {
        const hash = window.location.hash.substring(1);
        if (hash.startsWith('produk-detail/')) {
            const productId = hash.split('/')[1];
            navigateToPage('produk-detail', productId);
        } else {
            const pageId = hash || 'home';
            navigateToPage(pageId);
        }
    }
    
    parseHash();
    
    // Handle popstate (back/forward navigation)
    window.addEventListener('popstate', parseHash);
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
            contactForm.reset();
        });
    }
});

// Load product detail
function loadProductDetail(productId) {
    const product = products[productId];
    const produkDetailContent = document.getElementById('produk-detail-content');
    
    if (!product) {
        produkDetailContent.innerHTML = `
            <div class="text-center py-16">
                <h3 class="text-2xl font-bold mb-4 text-amber-800">Produk Tidak Ditemukan</h3>
                <p class="text-gray-600 mb-6">Maaf, produk yang Anda cari tidak tersedia.</p>
                <a href="#produk" class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all inline-block" data-page="produk">Lihat Produk Lain</a>
            </div>
        `;
        return;
    }
    
    produkDetailContent.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <div class="flex flex-col md:flex-row gap-12 mb-16">
                <div class="md:w-1/2">
                    <div class="bg-white p-4 rounded-lg shadow-lg mb-6">
                        <img src="${product.images[0]}" alt="${product.name} - tampilan depan" class="w-full h-auto rounded-lg">
                    </div>
                    <div class="product-gallery">
                        ${product.images.map((img, index) => `
                            <div class="bg-white p-2 rounded-lg shadow cursor-pointer">
                                <img src="${img}" alt="${product.name} - gambar ${index+1}" class="w-full h-auto rounded">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="md:w-1/2">
                    <h2 class="text-3xl font-bold mb-4 text-amber-800">${product.name}</h2>
                    <div class="flex items-center mb-6">
                        <span class="text-2xl font-bold text-amber-600 mr-4">${product.price}</span>
                        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Tersedia</span>
                    </div>
                    
                    <div class="mb-8">
                        <h3 class="text-xl font-bold mb-2 text-amber-700">Deskripsi</h3>
                        <p class="text-gray-700">${product.description}</p>
                    </div>
                    
                    <div class="mb-8">
                        <h3 class="text-xl font-bold mb-2 text-amber-700">Fitur Produk</h3>
                        <ul class="list-disc list-inside space-y-2 text-gray-700">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h4 class="font-bold text-gray-800 mb-2">Bahan:</h4>
                            <p class="text-gray-600">${product.materials}</p>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-800 mb-2">Ukuran:</h4>
                            <p class="text-gray-600">${product.dimensions}</p>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-800 mb-2">Berat:</h4>
                            <p class="text-gray-600">${product.weight}</p>
                        </div>
                    </div>
                    
                    <button class="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mb-4" 
                            onclick="alert('Untuk memesan ${product.name}, silakan hubungi kami melalui halaman kontak atau nomor whatsapp yang tertera.')">
                        Pesan Sekarang
                    </button>
                    
                    <p class="text-sm text-gray-500 text-center">Garansi 30 hari pengembalian jika produk cacat</p>
                </div>
            </div>
            
            <div class="bg-amber-50 p-8 rounded-lg">
                <h3 class="text-2xl font-bold mb-6 text-amber-800 text-center">Produk Serupa</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${getRandomProducts(productId).map(p => `
                        <div class="bg-white rounded-lg overflow-hidden shadow transition-all">
                            <div class="h-48 overflow-hidden">
                                <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h4 class="font-bold text-amber-800 mb-1">${p.name}</h4>
                                <p class="text-gray-600 text-sm mb-2">${p.description.substring(0, 60)}...</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-amber-600 font-bold">${p.price}</span>
                                    <a href="#produk-detail/${Object.keys(products).find(key => products[key].name === p.name)}" 
                                       class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm transition-all" 
                                       data-page="produk-detail" 
                                       data-product="${Object.keys(products).find(key => products[key].name === p.name)}">
                                        Lihat
                                    </a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('click', function(e) {
    if (e.target.closest('.product-gallery img')) {
        const clickedImg = e.target;
        const mainImg = document.querySelector('#produk-detail-content .bg-white > img');
        if (mainImg && clickedImg) {
            mainImg.src = clickedImg.src;
            mainImg.alt = clickedImg.alt;
        }
    }
});


// Get random products (excluding current product)
function getRandomProducts(excludeProductId) {
    const productIds = Object.keys(products).filter(id => id !== excludeProductId);
    const shuffled = productIds.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(id => products[id]);
}