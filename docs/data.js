// 网站数据存储
// 使用localStorage进行本地存储，方便在单机环境下使用

// 初始化默认数据
const defaultData = {
    // 管理员账号密码（实际项目中应加密存储）
    admin: {
        username: 'admin',
        password: 'admin123'
    },
    // 轮播图数据
    banners: [
        {
            id: 1,
            image: 'images/banner1.svg',
            title: '可源生物科技',
            description: '专注于生物科技领域的创新与发展'
        },
        {
            id: 2,
            image: 'images/banner2.svg',
            title: '先进技术',
            description: '引领生物科技行业的前沿技术'
        },
        {
            id: 3,
            image: 'images/banner3.svg',
            title: '优质服务',
            description: '为客户提供最优质的生物科技服务'
        }
    ],
    // 公司信息
    about: {
        title: '关于可源生物科技',
        content: '<p>可源生物科技有限公司成立于2020年，是一家专注于生物科技领域的创新型企业。公司致力于开发先进的生物技术产品和解决方案，服务于医疗健康、农业、环保等多个领域。</p><p>我们拥有一支由资深科学家、工程师和行业专家组成的团队，具备丰富的研发经验和强大的技术实力。公司建立了完善的研发体系和质量控制体系，确保产品的安全性和有效性。</p><p>可源生物科技以创新、诚信、合作、共赢为核心价值观，致力于成为生物科技领域的领先企业，为人类健康和社会发展做出贡献。</p>'
    },
    // 新闻数据
    news: [
        {
            id: 1,
            title: '公司荣获2025年度生物科技创新奖',
            date: '2025-01-15',
            content: '<p>近日，可源生物科技有限公司在2025年度生物科技创新大会上荣获生物科技创新奖，这是对公司在生物技术研发领域所取得成就的高度认可。</p><p>本次获奖的项目是公司自主研发的新型基因编辑技术，该技术在医疗健康领域具有广泛的应用前景。</p>',
            excerpt: '可源生物科技在2025年度生物科技创新大会上荣获生物科技创新奖，这是对公司在生物技术研发领域所取得成就的高度认可。'
        },
        {
            id: 2,
            title: '公司与某知名大学建立战略合作关系',
            date: '2025-01-10',
            content: '<p>2025年1月10日，可源生物科技有限公司与某知名大学生命科学学院签署了战略合作协议，双方将在生物技术研发、人才培养等方面开展深入合作。</p><p>此次合作将充分发挥双方的优势，推动生物技术的创新发展。</p>',
            excerpt: '可源生物科技与某知名大学生命科学学院签署了战略合作协议，双方将在生物技术研发、人才培养等方面开展深入合作。'
        },
        {
            id: 3,
            title: '公司新产品成功上市',
            date: '2025-01-05',
            content: '<p>经过多年的研发和临床试验，可源生物科技有限公司的新产品生物酶制剂于2025年1月5日正式上市。</p><p>该产品具有高效、环保、安全等特点，广泛应用于食品、医药、环保等领域。</p>',
            excerpt: '可源生物科技的新产品生物酶制剂于2025年1月5日正式上市，该产品具有高效、环保、安全等特点。'
        }
    ],
    // 产品数据
    products: [
        {
            id: 1,
            name: '基因编辑技术服务',
            image: 'images/product1.svg',
            description: '提供专业的基因编辑技术服务，包括CRISPR-Cas9技术、TALEN技术等，为科研机构和企业提供定制化的基因编辑解决方案。'
        },
        {
            id: 2,
            name: '生物酶制剂',
            image: 'images/product2.svg',
            description: '自主研发的高效生物酶制剂，广泛应用于食品加工、医药生产、环境保护等领域，具有高效、环保、安全等特点。'
        },
        {
            id: 3,
            name: '细胞培养服务',
            image: 'images/product3.svg',
            description: '提供专业的细胞培养服务，包括细胞系建立、细胞扩增、细胞鉴定等，为生物医学研究和药物开发提供高质量的细胞产品。'
        },
        {
            id: 4,
            name: '生物检测服务',
            image: 'images/product4.svg',
            description: '提供全面的生物检测服务，包括分子生物学检测、蛋白质检测、细胞生物学检测等，为客户提供准确、可靠的检测结果。'
        }
    ],
    // 联系信息
    contact: {
        address: '北京市海淀区中关村科技园区',
        phone: '010-12345678',
        email: 'info@keyuanbio.com'
    }
};

// 数据管理类
class DataManager {
    constructor() {
        this.initData();
    }

    // 初始化数据
    initData() {
        // 强制使用最新的默认数据初始化，确保图片路径正确
        localStorage.setItem('websiteData', JSON.stringify(defaultData));
    }

    // 获取所有数据
    getAllData() {
        return JSON.parse(localStorage.getItem('websiteData'));
    }

    // 保存所有数据
    saveAllData(data) {
        localStorage.setItem('websiteData', JSON.stringify(data));
    }

    // 获取特定类型的数据
    getData(type) {
        const data = this.getAllData();
        return data[type];
    }

    // 保存特定类型的数据
    saveData(type, newData) {
        const data = this.getAllData();
        data[type] = newData;
        this.saveAllData(data);
    }

    // 添加数据项
    addItem(type, item) {
        const data = this.getAllData();
        const items = data[type];
        
        // 生成新ID（基于现有最大ID + 1）
        const maxId = items.length > 0 ? Math.max(...items.map(item => item.id)) : 0;
        item.id = maxId + 1;
        
        items.push(item);
        this.saveAllData(data);
        return item;
    }

    // 更新数据项
    updateItem(type, id, updatedItem) {
        const data = this.getAllData();
        const items = data[type];
        const index = items.findIndex(item => item.id === id);
        
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem };
            this.saveAllData(data);
            return items[index];
        }
        return null;
    }

    // 删除数据项
    deleteItem(type, id) {
        const data = this.getAllData();
        const items = data[type];
        const filteredItems = items.filter(item => item.id !== id);
        
        if (filteredItems.length !== items.length) {
            data[type] = filteredItems;
            this.saveAllData(data);
            return true;
        }
        return false;
    }

    // 验证管理员登录
    validateAdmin(username, password) {
        const admin = this.getData('admin');
        return admin.username === username && admin.password === password;
    }
}

// 创建全局数据管理器实例
const dataManager = new DataManager();