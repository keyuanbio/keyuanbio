// 网站数据存储
// 使用localStorage进行本地存储，方便在单机环境下使用

// 初始化默认数据
const defaultData = {
        // 数据版本号，每次修改数据时递增
    version: 1.2,
    // 管理员账号密码（实际项目中应加密存储）
    admin: {
        username: 'admin',
        password: 'admin123'
    },
    // 轮播图数据
    banners: [
        {
            id: 1,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20500%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23banner1%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A60pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22banner1%22%3E%3Crect%20width%3D%221200%22%20height%3D%22500%22%20fill%3D%22%233498db%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22442.921875%22%20y%3D%22273.3%22%3E%E5%8F%AF%E6%BA%90%E7%94%9F%E7%89%A9%E7%A7%91%E6%8A%80%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
            title: '可源生物科技',
            description: '专注于生物科技领域的创新与发展'
        },
        {
            id: 2,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20500%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23banner2%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A60pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22banner2%22%3E%3Crect%20width%3D%221200%22%20height%3D%22500%22%20fill%3D%22%232ecc71%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22512.421875%22%20y%3D%22273.3%22%3E%E5%85%88%E8%BF%9B%E6%8A%80%E6%9C%AF%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
            title: '先进技术',
            description: '引领生物科技行业的前沿技术'
        },
        {
            id: 3,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%221200%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20500%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23banner3%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A60pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22banner3%22%3E%3Crect%20width%3D%221200%22%20height%3D%22500%22%20fill%3D%22%239b59b6%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22512.421875%22%20y%3D%22273.3%22%3E%E4%BC%98%E8%B4%A8%E6%9C%8D%E5%8A%A1%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
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
            title: '强强联合获赞誉！我司保水剂助力潍坊辉科食品升级口感',
            date: '2025-01-15',
            content: '<p>近日，潍坊辉科食品有限公司采用我司生产的食品保水剂打造的系列产品，凭借出众口感赢得市场广泛认可与客户高度赞扬。</p><p></p><p>作为深耕食品配料领域的企业，我司保水剂严格遵循 GB2760-2024 国家标准，通过科学配方提升产品持水性与多汁性，有效改善食材口感层次。此次与潍坊辉科食品的合作，实现了技术赋能与生产需求的精准匹配，其产品因口感鲜嫩、品质稳定收获众多消费者好评。</p><p></p><p>未来，我司将持续以品质为核心，深化技术创新，为食品企业提供更优质的配料解决方案，携手合作伙伴实现共赢发展。</p>',
            excerpt: '近日，潍坊辉科食品有限公司采用我司生产的食品保水剂打造的系列产品，凭借出众口感赢得市场广泛认可与客户高度赞扬。。'
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
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23product1%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22product1%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%233498db%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2250.75%22%20y%3D%22160.3%22%3E%E5%9F%BA%E5%9B%A0%E7%BC%96%E8%BE%91%E6%8A%80%E6%9C%AF%E6%9C%8D%E5%8A%A1%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
            description: '提供专业的基因编辑技术服务，包括CRISPR-Cas9技术、TALEN技术等，为科研机构和企业提供定制化的基因编辑解决方案。'
        },
        {
            id: 2,
            name: '生物酶制剂',
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23product2%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22product2%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%232ecc71%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22125.75%22%20y%3D%22160.3%22%3E%E7%94%9F%E7%89%A9%E9%85%B6%E5%88%B6%E5%89%82%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
            description: '自主研发的高效生物酶制剂，广泛应用于食品加工、医药生产、环境保护等领域，具有高效、环保、安全等特点。'
        },
        {
            id: 3,
            name: '细胞培养服务',
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23product3%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22product3%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%239b59b6%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22105.75%22%20y%3D%22160.3%22%3E%E7%BB%86%E8%83%9E%E5%85%BB%E5%88%9B%E6%9C%8D%E5%8A%A1%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
            description: '提供专业的细胞培养服务，包括细胞系建立、细胞扩增、细胞鉴定等，为生物医学研究和药物开发提供高质量的细胞产品。'
        },
        {
            id: 4,
            name: '生物检测服务',
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23product4%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22product4%22%3E%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%23e67e22%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22105.75%22%20y%3D%22160.3%22%3E%E7%94%9F%E7%89%A9%E6%A3%80%E6%B5%8B%E6%9C%8D%E5%8A%A1%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
            description: '提供全面的生物检测服务，包括分子生物学检测、蛋白质检测、细胞生物学检测等，为客户提供准确、可靠的检测结果。'
        }
    ],
    // 联系信息
    contact: {
        address: '青岛市城阳区富民路裕晶电子',
        phone: '0532-123456789',
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
        const existingData = localStorage.getItem('websiteData');
        if (existingData) {
            try {
                const parsedData = JSON.parse(existingData);
                // 检查数据版本号，如果版本不同则使用新数据
                if (parsedData.version !== defaultData.version) {
                    localStorage.setItem('websiteData', JSON.stringify(defaultData));
                    console.log('数据已更新到最新版本:', defaultData.version);
                }
            } catch (e) {
                // 解析错误时使用新数据
                localStorage.setItem('websiteData', JSON.stringify(defaultData));
                console.log('数据解析错误，已使用默认数据');
            }
        } else {
            // 没有数据时初始化
            localStorage.setItem('websiteData', JSON.stringify(defaultData));
            console.log('初始数据已加载');
        }
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







