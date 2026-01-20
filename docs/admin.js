// 后台管理功能逻辑

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否已登录
    checkLoginStatus();
    
    // 绑定登录表单提交事件
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // 绑定退出登录按钮事件
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // 绑定后台导航按钮事件
    const adminNavBtns = document.querySelectorAll('.admin-nav-btn');
    adminNavBtns.forEach(btn => {
        btn.addEventListener('click', switchAdminSection);
    });
    
    // 绑定模态框关闭事件
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 初始化各个管理模块
    initBannerManagement();
    initAboutManagement();
    initNewsManagement();
    initProductsManagement();
    initContactManagement();
});

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginSection = document.getElementById('login-section');
    const adminPanel = document.getElementById('admin-panel');
    
    if (isLoggedIn) {
        loginSection.classList.remove('active');
        adminPanel.classList.add('active');
        // 加载所有数据列表
        loadBannerList();
        loadNewsList();
        loadProductsList();
    } else {
        loginSection.classList.add('active');
        adminPanel.classList.remove('active');
    }
}

// 处理登录
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('login-message');
    
    // 验证登录信息
    if (dataManager.validateAdmin(username, password)) {
        // 登录成功
        localStorage.setItem('isLoggedIn', 'true');
        checkLoginStatus();
    } else {
        // 登录失败
        loginMessage.textContent = '用户名或密码错误';
        loginMessage.style.color = '#e74c3c';
    }
}

// 处理退出登录
function handleLogout() {
    localStorage.setItem('isLoggedIn', 'false');
    checkLoginStatus();
}

// 切换后台管理模块
function switchAdminSection(e) {
    // 移除所有导航按钮的active类
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 添加当前导航按钮的active类
    e.target.classList.add('active');
    
    // 隐藏所有管理内容
    document.querySelectorAll('.admin-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 显示对应的管理内容
    const section = e.target.dataset.section;
    const contentElement = document.getElementById(`${section}-section`);
    contentElement.classList.add('active');
}

// 显示模态框
function showModal(title, content, onSave) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h3>${title}</h3>
        ${content}
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
            <button id="modal-cancel" class="btn" style="background-color: #95a5a6;">取消</button>
            <button id="modal-save" class="btn">保存</button>
        </div>
    `;
    
    // 绑定取消按钮事件
    document.getElementById('modal-cancel').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // 绑定保存按钮事件
    document.getElementById('modal-save').addEventListener('click', () => {
        if (onSave && typeof onSave === 'function') {
            onSave();
        }
    });
    
    modal.style.display = 'block';
}

// 轮播图管理初始化
function initBannerManagement() {
    const addBannerBtn = document.getElementById('add-banner');
    if (addBannerBtn) {
        addBannerBtn.addEventListener('click', showAddBannerModal);
    }
}

// 显示添加轮播图模态框
function showAddBannerModal() {
    const modalContent = `
        <div class="form-group">
            <label for="banner-image-upload">上传图片：</label>
            <input type="file" id="banner-image-upload" accept="image/*">
            <div id="banner-image-preview" style="margin-top: 1rem;"></div>
        </div>
        <div class="form-group">
            <label for="banner-title">标题：</label>
            <input type="text" id="banner-title" placeholder="输入轮播图标题">
        </div>
        <div class="form-group">
            <label for="banner-description">描述：</label>
            <textarea id="banner-description" rows="3" placeholder="输入轮播图描述"></textarea>
        </div>
        <input type="hidden" id="banner-image" value="">
    `;
    
    showModal('添加轮播图', modalContent, saveBanner);
    
    // 绑定图片上传预览事件
    const imageUpload = document.getElementById('banner-image-upload');
    const imagePreview = document.getElementById('banner-image-preview');
    const imageInput = document.getElementById('banner-image');
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '150px';
                img.style.border = '1px solid #ddd';
                img.style.borderRadius = '4px';
                
                imagePreview.innerHTML = '';
                imagePreview.appendChild(img);
                imageInput.value = e.target.result; // 保存base64编码
            };
            reader.readAsDataURL(file);
        }
    });
}

// 保存轮播图
function saveBanner() {
    const image = document.getElementById('banner-image').value;
    const title = document.getElementById('banner-title').value;
    const description = document.getElementById('banner-description').value;
    
    if (!image || !title) {
        alert('请填写必填字段');
        return;
    }
    
    const banner = {
        image,
        title,
        description
    };
    
    dataManager.addItem('banners', banner);
    loadBannerList();
    document.getElementById('modal').style.display = 'none';
}

// 加载轮播图列表
function loadBannerList() {
    const banners = dataManager.getData('banners');
    const bannerList = document.getElementById('banner-list');
    
    bannerList.innerHTML = '';
    
    banners.forEach(banner => {
        const bannerItem = document.createElement('div');
        bannerItem.className = 'item';
        
        bannerItem.innerHTML = `
            <div class="item-info">
                <h4>${banner.title}</h4>
                <p>${banner.description}</p>
                <img src="${banner.image}" alt="${banner.title}" class="image-preview">
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editBanner(${banner.id})">编辑</button>
                <button class="delete-btn" onclick="deleteBanner(${banner.id})">删除</button>
            </div>
        `;
        
        bannerList.appendChild(bannerItem);
    });
}

// 编辑轮播图
function editBanner(id) {
    const banners = dataManager.getData('banners');
    const banner = banners.find(b => b.id === id);
    
    if (banner) {
        const modalContent = `
            <div class="form-group">
                <label for="edit-banner-image-upload">上传图片：</label>
                <input type="file" id="edit-banner-image-upload" accept="image/*">
                <div id="edit-banner-image-preview" style="margin-top: 1rem;">
                    <img src="${banner.image}" style="max-width: 200px; max-height: 150px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
            </div>
            <div class="form-group">
                <label for="edit-banner-title">标题：</label>
                <input type="text" id="edit-banner-title" value="${banner.title}">
            </div>
            <div class="form-group">
                <label for="edit-banner-description">描述：</label>
                <textarea id="edit-banner-description" rows="3">${banner.description}</textarea>
            </div>
            <input type="hidden" id="edit-banner-image" value="${banner.image}">
        `;
        
        showModal('编辑轮播图', modalContent, () => {
            const updatedBanner = {
                image: document.getElementById('edit-banner-image').value,
                title: document.getElementById('edit-banner-title').value,
                description: document.getElementById('edit-banner-description').value
            };
            
            dataManager.updateItem('banners', id, updatedBanner);
            loadBannerList();
            document.getElementById('modal').style.display = 'none';
        });
        
        // 绑定图片上传预览事件
        const imageUpload = document.getElementById('edit-banner-image-upload');
        const imagePreview = document.getElementById('edit-banner-image-preview');
        const imageInput = document.getElementById('edit-banner-image');
        
        imageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '200px';
                    img.style.maxHeight = '150px';
                    img.style.border = '1px solid #ddd';
                    img.style.borderRadius = '4px';
                    
                    imagePreview.innerHTML = '';
                    imagePreview.appendChild(img);
                    imageInput.value = e.target.result; // 保存base64编码
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// 删除轮播图
function deleteBanner(id) {
    if (confirm('确定要删除这个轮播图吗？')) {
        dataManager.deleteItem('banners', id);
        loadBannerList();
    }
}

// 公司信息管理初始化
function initAboutManagement() {
    const saveAboutBtn = document.getElementById('save-about');
    if (saveAboutBtn) {
        saveAboutBtn.addEventListener('click', saveAbout);
        loadAboutData();
    }
}

// 加载公司信息数据
function loadAboutData() {
    const about = dataManager.getData('about');
    const aboutTitle = document.getElementById('about-title');
    const aboutContent = document.getElementById('about-content');
    
    if (aboutTitle && aboutContent) {
        aboutTitle.value = about.title;
        aboutContent.value = about.content;
    }
}

// 保存公司信息
function saveAbout() {
    const title = document.getElementById('about-title').value;
    const content = document.getElementById('about-content').value;
    
    if (!title || !content) {
        alert('请填写必填字段');
        return;
    }
    
    const about = {
        title,
        content
    };
    
    dataManager.saveData('about', about);
    alert('公司信息保存成功');
}

// 新闻管理初始化
function initNewsManagement() {
    const addNewsBtn = document.getElementById('add-news');
    if (addNewsBtn) {
        addNewsBtn.addEventListener('click', showAddNewsModal);
    }
}

// 显示添加新闻模态框
function showAddNewsModal() {
    const modalContent = `
        <div class="form-group">
            <label for="news-title">标题：</label>
            <input type="text" id="news-title" placeholder="输入新闻标题">
        </div>
        <div class="form-group">
            <label for="news-date">日期：</label>
            <input type="date" id="news-date">
        </div>
        <div class="form-group">
            <label for="news-excerpt">摘要：</label>
            <textarea id="news-excerpt" rows="3" placeholder="输入新闻摘要"></textarea>
        </div>
        <div class="form-group">
            <label for="news-content">内容：</label>
            <textarea id="news-content" rows="5" placeholder="输入新闻内容"></textarea>
        </div>
    `;
    
    showModal('添加新闻', modalContent, saveNews);
}

// 保存新闻
function saveNews() {
    const title = document.getElementById('news-title').value;
    const date = document.getElementById('news-date').value;
    const excerpt = document.getElementById('news-excerpt').value;
    const content = document.getElementById('news-content').value;
    
    if (!title || !date || !content) {
        alert('请填写必填字段');
        return;
    }
    
    const news = {
        title,
        date,
        excerpt: excerpt || content.substring(0, 150) + '...',
        content
    };
    
    dataManager.addItem('news', news);
    loadNewsList();
    document.getElementById('modal').style.display = 'none';
}

// 加载新闻列表
function loadNewsList() {
    const news = dataManager.getData('news');
    const newsItems = document.getElementById('news-items');
    
    newsItems.innerHTML = '';
    
    news.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'item';
        
        newsItem.innerHTML = `
            <div class="item-info">
                <h4>${item.title}</h4>
                <div class="date">${item.date}</div>
                <p>${item.excerpt}</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editNews(${item.id})">编辑</button>
                <button class="delete-btn" onclick="deleteNews(${item.id})">删除</button>
            </div>
        `;
        
        newsItems.appendChild(newsItem);
    });
}

// 编辑新闻
function editNews(id) {
    const news = dataManager.getData('news');
    const item = news.find(n => n.id === id);
    
    if (item) {
        const modalContent = `
            <div class="form-group">
                <label for="edit-news-title">标题：</label>
                <input type="text" id="edit-news-title" value="${item.title}">
            </div>
            <div class="form-group">
                <label for="edit-news-date">日期：</label>
                <input type="date" id="edit-news-date" value="${item.date}">
            </div>
            <div class="form-group">
                <label for="edit-news-excerpt">摘要：</label>
                <textarea id="edit-news-excerpt" rows="3">${item.excerpt}</textarea>
            </div>
            <div class="form-group">
                <label for="edit-news-content">内容：</label>
                <textarea id="edit-news-content" rows="5">${item.content}</textarea>
            </div>
        `;
        
        showModal('编辑新闻', modalContent, () => {
            const updatedNews = {
                title: document.getElementById('edit-news-title').value,
                date: document.getElementById('edit-news-date').value,
                excerpt: document.getElementById('edit-news-excerpt').value,
                content: document.getElementById('edit-news-content').value
            };
            
            dataManager.updateItem('news', id, updatedNews);
            loadNewsList();
            document.getElementById('modal').style.display = 'none';
        });
    }
}

// 删除新闻
function deleteNews(id) {
    if (confirm('确定要删除这篇新闻吗？')) {
        dataManager.deleteItem('news', id);
        loadNewsList();
    }
}

// 产品管理初始化
function initProductsManagement() {
    const addProductBtn = document.getElementById('add-product');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', showAddProductModal);
    }
}

// 显示添加产品模态框
function showAddProductModal() {
    const modalContent = `
        <div class="form-group">
            <label for="product-name">产品名称：</label>
            <input type="text" id="product-name" placeholder="输入产品名称">
        </div>
        <div class="form-group">
            <label for="product-image-upload">上传图片：</label>
            <input type="file" id="product-image-upload" accept="image/*">
            <div id="product-image-preview" style="margin-top: 1rem;"></div>
        </div>
        <div class="form-group">
            <label for="product-description">描述：</label>
            <textarea id="product-description" rows="5" placeholder="输入产品描述"></textarea>
        </div>
        <input type="hidden" id="product-image" value="">
    `;
    
    showModal('添加产品', modalContent, saveProduct);
    
    // 绑定图片上传预览事件
    const imageUpload = document.getElementById('product-image-upload');
    const imagePreview = document.getElementById('product-image-preview');
    const imageInput = document.getElementById('product-image');
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '150px';
                img.style.border = '1px solid #ddd';
                img.style.borderRadius = '4px';
                
                imagePreview.innerHTML = '';
                imagePreview.appendChild(img);
                imageInput.value = e.target.result; // 保存base64编码
            };
            reader.readAsDataURL(file);
        }
    });
}

// 保存产品
function saveProduct() {
    const name = document.getElementById('product-name').value;
    const image = document.getElementById('product-image').value;
    const description = document.getElementById('product-description').value;
    
    if (!name || !description) {
        alert('请填写必填字段');
        return;
    }
    
    const product = {
        name,
        image: image || 'https://via.placeholder.com/400x300?text=产品图片',
        description
    };
    
    dataManager.addItem('products', product);
    loadProductsList();
    document.getElementById('modal').style.display = 'none';
}

// 加载产品列表
function loadProductsList() {
    const products = dataManager.getData('products');
    const productsItems = document.getElementById('products-items');
    
    productsItems.innerHTML = '';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'item';
        
        productItem.innerHTML = `
            <div class="item-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <img src="${product.image}" alt="${product.name}" class="image-preview">
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editProduct(${product.id})">编辑</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">删除</button>
            </div>
        `;
        
        productsItems.appendChild(productItem);
    });
}

// 编辑产品
function editProduct(id) {
    const products = dataManager.getData('products');
    const product = products.find(p => p.id === id);
    
    if (product) {
        const modalContent = `
            <div class="form-group">
                <label for="edit-product-name">产品名称：</label>
                <input type="text" id="edit-product-name" value="${product.name}">
            </div>
            <div class="form-group">
                <label for="edit-product-image-upload">上传图片：</label>
                <input type="file" id="edit-product-image-upload" accept="image/*">
                <div id="edit-product-image-preview" style="margin-top: 1rem;">
                    <img src="${product.image}" style="max-width: 200px; max-height: 150px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
            </div>
            <div class="form-group">
                <label for="edit-product-description">描述：</label>
                <textarea id="edit-product-description" rows="5">${product.description}</textarea>
            </div>
            <input type="hidden" id="edit-product-image" value="${product.image}">
        `;
        
        showModal('编辑产品', modalContent, () => {
            const updatedProduct = {
                name: document.getElementById('edit-product-name').value,
                image: document.getElementById('edit-product-image').value,
                description: document.getElementById('edit-product-description').value
            };
            
            dataManager.updateItem('products', id, updatedProduct);
            loadProductsList();
            document.getElementById('modal').style.display = 'none';
        });
        
        // 绑定图片上传预览事件
        const imageUpload = document.getElementById('edit-product-image-upload');
        const imagePreview = document.getElementById('edit-product-image-preview');
        const imageInput = document.getElementById('edit-product-image');
        
        imageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '200px';
                    img.style.maxHeight = '150px';
                    img.style.border = '1px solid #ddd';
                    img.style.borderRadius = '4px';
                    
                    imagePreview.innerHTML = '';
                    imagePreview.appendChild(img);
                    imageInput.value = e.target.result; // 保存base64编码
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// 删除产品
function deleteProduct(id) {
    if (confirm('确定要删除这个产品吗？')) {
        dataManager.deleteItem('products', id);
        loadProductsList();
    }
}

// 联系信息管理初始化
function initContactManagement() {
    const saveContactBtn = document.getElementById('save-contact');
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', saveContact);
        loadContactData();
    }
}

// 加载联系信息数据
function loadContactData() {
    const contact = dataManager.getData('contact');
    const contactAddress = document.getElementById('contact-address');
    const contactPhone = document.getElementById('contact-phone');
    const contactEmail = document.getElementById('contact-email');
    
    if (contactAddress && contactPhone && contactEmail) {
        contactAddress.value = contact.address;
        contactPhone.value = contact.phone;
        contactEmail.value = contact.email;
    }
}

// 保存联系信息
function saveContact() {
    const address = document.getElementById('contact-address').value;
    const phone = document.getElementById('contact-phone').value;
    const email = document.getElementById('contact-email').value;
    
    if (!address || !phone || !email) {
        alert('请填写必填字段');
        return;
    }
    
    const contact = {
        address,
        phone,
        email
    };
    
    dataManager.saveData('contact', contact);
    alert('联系信息保存成功');
}