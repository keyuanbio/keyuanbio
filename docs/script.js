// 网站前端交互逻辑

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 直接获取文件名，处理不同部署环境的情况
    const pathname = window.location.pathname;
    let currentPage = pathname.split('/').pop();
    
    // 处理根路径情况
    if (!currentPage || currentPage === '') {
        currentPage = 'index.html';
    }
    // 处理不带.html扩展名的情况
    if (!currentPage.endsWith('.html')) {
        currentPage += '.html';
    }
    
    // 调试信息：打印当前页面和路径
    console.log('Current pathname:', pathname);
    console.log('Detected page:', currentPage);
    
    // 确保所有页面都能正确初始化
    switch(currentPage) {
        case 'index.html':
            console.log('Initializing index page');
            initIndexPage();
            break;
        case 'about.html':
            console.log('Initializing about page');
            initAboutPage();
            break;
        case 'products.html':
            console.log('Initializing products page');
            initProductsPage();
            break;
        case 'news.html':
            console.log('Initializing news page');
            initNewsPage();
            break;
        case 'contact.html':
            console.log('Initializing contact page');
            initContactPage();
            break;
        default:
            // 处理可能的GitHub Pages部署路径
            console.log('Unknown page, checking if it\'s index.html');
            // 如果URL是 /repo-name/，也初始化首页
            if (pathname.endsWith('/')) {
                initIndexPage();
            }
            break;
    }
    
    // 调试信息：打印获取到的轮播图数据
    const banners = dataManager.getData('banners');
    console.log('Banners data:', banners);
});

// 初始化首页
function initIndexPage() {
    initSlideshow();
    loadAboutPreview();
    loadNewsPreview();
}

// 初始化轮播图
function initSlideshow() {
    // 从dataManager获取最新的轮播图数据
    const banners = dataManager.getData('banners');
    const slideshowContainer = document.getElementById('banner-slideshow');
    
    // 清空容器
    slideshowContainer.innerHTML = '';
    
    // 创建轮播图幻灯片
    banners.forEach((banner, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        
        const img = document.createElement('img');
        img.src = banner.image;
        img.alt = banner.title;
        
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
    });
    
    // 启动轮播
    startSlideshow();
}

// 启动轮播
function startSlideshow() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    setInterval(() => {
        // 隐藏当前幻灯片
        slides[currentSlide].classList.remove('active');
        
        // 计算下一张幻灯片索引
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // 显示下一张幻灯片
        slides[currentSlide].classList.add('active');
    }, 5000); // 每5秒切换一次
}

// 加载公司简介预览
function loadAboutPreview() {
    const about = dataManager.getData('about');
    const aboutPreview = document.getElementById('about-preview-content');
    
    // 创建一个临时元素来提取纯文本
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = about.content;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    // 截取前150个字符作为预览
    const previewText = plainText.substring(0, 150) + '...';
    aboutPreview.textContent = previewText;
}

// 加载新闻预览
function loadNewsPreview() {
    const news = dataManager.getData('news');
    const newsGrid = document.getElementById('news-grid');
    
    // 清空容器
    newsGrid.innerHTML = '';
    
    // 只显示最新的3条新闻
    const latestNews = news.slice(0, 3);
    
    latestNews.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        newsItem.innerHTML = `
            <h3>${item.title}</h3>
            <div class="date">${item.date}</div>
            <p>${item.excerpt}</p>
        `;
        
        newsGrid.appendChild(newsItem);
    });
}

// 初始化公司信息页面
function initAboutPage() {
    const about = dataManager.getData('about');
    const aboutContent = document.getElementById('about-full-content');
    
    aboutContent.innerHTML = about.content;
}

// 初始化产品页面
function initProductsPage() {
    // 从dataManager获取最新的产品数据
    const products = dataManager.getData('products');
    const productsGrid = document.getElementById('products-grid');
    
    // 清空容器
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;
        
        productsGrid.appendChild(productItem);
    });
}

// 初始化新闻页面
function initNewsPage() {
    const news = dataManager.getData('news');
    const newsList = document.getElementById('news-list');
    
    // 清空容器
    newsList.innerHTML = '';
    
    news.forEach(item => {
        const newsListItem = document.createElement('div');
        newsListItem.className = 'news-list-item';
        
        newsListItem.innerHTML = `
            <h3>${item.title}</h3>
            <div class="date">${item.date}</div>
            <div class="content">${item.content}</div>
        `;
        
        newsList.appendChild(newsListItem);
    });
}

// 初始化联系页面
function initContactPage() {
    const contact = dataManager.getData('contact');
    const contactInfo = document.getElementById('contact-info');
    
    contactInfo.innerHTML = `
        <p><strong>地址：</strong>${contact.address}</p>
        <p><strong>电话：</strong>${contact.phone}</p>
        <p><strong>邮箱：</strong>${contact.email}</p>
    `;
}

// 辅助函数：格式化日期
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('zh-CN');
}

// 辅助函数：显示消息
function showMessage(elementId, message, isError = false) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.color = isError ? '#e74c3c' : '#27ae60';
    
    // 3秒后清除消息
    setTimeout(() => {
        element.textContent = '';
    }, 3000);

}
