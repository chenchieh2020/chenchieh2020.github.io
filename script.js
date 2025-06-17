// ==========================================================================
// 語言切換功能
// ==========================================================================

/**
 * 初始化語言切換功能
 */
function initLanguageSwitcher() {
    const languageSwitcher = document.getElementById('language-switcher');
    const langButtons = languageSwitcher.querySelectorAll('.lang-btn');
    
    // 從 localStorage 讀取語言設定，預設為中文
    let currentLanguage = localStorage.getItem('language') || 'zh';
    
    // 設定初始語言
    setLanguage(currentLanguage);
    updateActiveButton(currentLanguage);
    
    // 為每個語言按鈕添加點擊事件
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            if (selectedLang !== currentLanguage) {
                currentLanguage = selectedLang;
                setLanguage(currentLanguage);
                updateActiveButton(currentLanguage);
                
                // 儲存語言設定到 localStorage
                localStorage.setItem('language', currentLanguage);
                
                console.log(`🌐 語言已切換至: ${currentLanguage === 'zh' ? '中文' : 'English'}`);
            }
        });
    });
}

/**
 * 設定頁面語言
 * @param {string} lang - 語言代碼 ('zh' 或 'en')
 */
function setLanguage(lang) {
    // 更新所有具有多語言數據屬性的元素
    const multiLangElements = document.querySelectorAll('[data-en][data-zh]');
    
    multiLangElements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // 更新 HTML lang 屬性
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
    
    // 更新頁面標題
    const titles = {
        zh: 'Chen Chieh Lin - 專案與產品經理',
        en: 'Chen Chieh Lin - Project & Product Manager'
    };
    document.title = titles[lang];
}

/**
 * 更新語言按鈕的活躍狀態
 * @param {string} lang - 當前語言
 */
function updateActiveButton(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// ==========================================================================
// 幾何圖形生成功能
// ==========================================================================

/**
 * 創建不同類型的幾何圖形
 */
function createShape() {
    const floatingShapes = document.getElementById('floating-shapes');
    if (!floatingShapes) {
        console.error('❌ 無法找到 floating-shapes 容器');
        return;
    }

    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8'];
    
    const shape = document.createElement('div');
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    const colorClass = colors[Math.floor(Math.random() * colors.length)];
    
    shape.className = `shape ${shapeType} ${colorClass}`;
    
    // 隨機大小和位置
    const size = Math.random() * 40 + 20;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 15;
    const delay = Math.random() * 5;
    
    if (shapeType === 'triangle') {
        const triangleSize = size;
        shape.style.left = `${left}%`;
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `-${delay}s`;
        
        // 動態設定三角形大小
        const beforeStyle = document.createElement('style');
        beforeStyle.textContent = `
            .shape.triangle.${colorClass}::before {
                border-width: 0 ${triangleSize/2}px ${triangleSize}px ${triangleSize/2}px;
                left: -${triangleSize/2}px;
            }
        `;
        document.head.appendChild(beforeStyle);
    } else {
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${left}%`;
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `-${delay}s`;
    }
    
    floatingShapes.appendChild(shape);
    
    // 移除完成動畫的元素
    setTimeout(() => {
        if (shape.parentNode) {
            shape.parentNode.removeChild(shape);
        }
    }, duration * 1000);
}

// ==========================================================================
// 導覽列功能
// ==========================================================================

/**
 * 初始化導覽列功能
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.getElementById('nav-links');

    // 滾動效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 手機版導覽選單切換
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 點擊導覽連結後關閉手機版選單
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ==========================================================================
// 平滑滾動功能
// ==========================================================================

/**
 * 初始化平滑滾動到錨點功能
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // 考慮導覽列高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// 動畫效果
// ==========================================================================

/**
 * 初始化載入動畫
 */
function initAnimations() {
    // 淡入動畫
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.15}s`;
    });

    // 照片區域動畫
    const slideElements = document.querySelectorAll('.slide-in-right');
    slideElements.forEach((element, index) => {
        element.style.animationDelay = `${0.5 + index * 0.2}s`;
    });
}

// ==========================================================================
// 滑鼠互動效果
// ==========================================================================

/**
 * 初始化滑鼠互動效果
 */
function initMouseInteractions() {
    // 滑鼠追蹤裝飾效果
    document.addEventListener('mousemove', function(e) {
        const decorations = document.querySelectorAll('.floating-decoration');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        decorations.forEach((decoration, index) => {
            const speed = (index + 1) * 0.3;
            const xOffset = (x - 0.5) * speed * 50;
            const yOffset = (y - 0.5) * speed * 50;
            
            decoration.style.transform += ` translate(${xOffset}px, ${yOffset}px)`;
        });

        // 幾何圖形滑鼠互動
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index % 3 + 1) * 0.3;
            const xOffset = (x - 0.5) * speed * 15;
            const yOffset = (y - 0.5) * speed * 15;
            
            // 重置 transform 避免累積效應
            const currentTransform = shape.style.transform.replace(/translate\([^)]*\)/g, '');
            shape.style.transform = currentTransform + ` translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // 技能卡片點擊效果
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // 統計卡片懸停效果
    document.querySelectorAll('.stat-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ==========================================================================
// 視差滾動效果
// ==========================================================================

/**
 * 初始化視差滾動效果
 */
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        const floatingShapes = document.getElementById('floating-shapes');
        if (floatingShapes) {
            floatingShapes.style.transform = `translateY(${rate}px)`;
        }

        // 卡片視差效果
        const premiumCards = document.querySelectorAll('.premium-card');
        premiumCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const speed = (index % 2 === 0 ? 0.1 : -0.1);
            const yPos = -(scrolled * speed);
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                card.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// ==========================================================================
// 圖形生成管理
// ==========================================================================

/**
 * 初始化圖形生成系統
 */
function initShapeGeneration() {
    // 初始創建一些圖形
    for (let i = 0; i < 8; i++) {
        setTimeout(createShape, i * 500);
    }

    // 定期創建新圖形
    setInterval(createShape, 2500);
}

// ==========================================================================
// 滾動動畫觀察器
// ==========================================================================

/**
 * 初始化滾動動畫觀察器
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // 為統計數字添加計數動畫
                if (entry.target.classList.contains('stat-item')) {
                    animateStatNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // 觀察所有需要動畫的元素
    document.querySelectorAll('.premium-card, .stat-item, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

/**
 * 統計數字計數動畫
 * @param {Element} statItem - 統計項目元素
 */
function animateStatNumber(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    const targetText = numberElement.textContent.trim();
    
    // 只對純數字進行動畫
    if (/^\d+\+?$/.test(targetText)) {
        const targetNumber = parseInt(targetText.replace('+', ''));
        const hasPlus = targetText.includes('+');
        let currentNumber = 0;
        const increment = targetNumber / 30; // 30 幀動畫
        
        const animateNumber = () => {
            currentNumber += increment;
            if (currentNumber < targetNumber) {
                numberElement.textContent = Math.floor(currentNumber) + (hasPlus ? '+' : '');
                requestAnimationFrame(animateNumber);
            } else {
                numberElement.textContent = targetNumber + (hasPlus ? '+' : '');
            }
        };
        
        animateNumber();
    }
}

// ==========================================================================
// 主要初始化函數
// ==========================================================================

/**
 * 頁面載入完成後初始化所有功能
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 開始載入網站功能...');
    
    // 確保 floating-shapes 元素存在
    const floatingShapesContainer = document.getElementById('floating-shapes');
    if (!floatingShapesContainer) {
        console.error('❌ 找不到 floating-shapes 容器');
        return;
    }
    
    // 初始化各個功能模組
    initLanguageSwitcher();  // 語言切換功能
    initNavbar();
    initSmoothScroll();
    initAnimations();
    initMouseInteractions();
    initParallaxEffect();
    initScrollAnimations();  // 新增滾動動畫觀察器
    
    // 延遲一點再開始生成圖形，確保頁面完全載入
    setTimeout(() => {
        initShapeGeneration();
        console.log('✨ 圖形生成系統已啟動');
    }, 100);
    
    console.log('🎉 個人作品集網站載入完成！');
});

// ==========================================================================
// 效能優化和錯誤處理
// ==========================================================================

/**
 * 防抖函數 - 限制函數執行頻率
 * @param {Function} func - 要執行的函數
 * @param {number} wait - 等待時間(毫秒)
 * @returns {Function} 防抖後的函數
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 節流函數 - 限制函數執行頻率
 * @param {Function} func - 要執行的函數
 * @param {number} limit - 時間限制(毫秒)
 * @returns {Function} 節流後的函數
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 優化滾動事件處理
const optimizedScrollHandler = throttle(function() {
    const scrolled = window.pageYOffset;
    const navbar = document.getElementById('navbar');
    
    // 導覽列滾動效果
    if (scrolled > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    // 視差效果
    const rate = scrolled * -0.3;
    const floatingShapes = document.getElementById('floating-shapes');
    if (floatingShapes) {
        floatingShapes.style.transform = `translateY(${rate}px)`;
    }
}, 16); // 約 60fps

// 優化滑鼠移動事件處理
const optimizedMouseHandler = throttle(function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // 浮動裝飾效果
    const decorations = document.querySelectorAll('.floating-decoration');
    decorations.forEach((decoration, index) => {
        const speed = (index + 1) * 0.2; // 降低速度以減少計算
        const xOffset = (x - 0.5) * speed * 30;
        const yOffset = (y - 0.5) * speed * 30;
        
        decoration.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
}, 16);

// 重新綁定優化後的事件處理器
window.addEventListener('scroll', optimizedScrollHandler);
document.addEventListener('mousemove', optimizedMouseHandler);

// ==========================================================================
// 錯誤處理和日志
// ==========================================================================

/**
 * 全域錯誤處理
 */
window.addEventListener('error', function(e) {
    console.error('🚨 JavaScript 錯誤:', e.error);
    console.error('錯誤位置:', e.filename, '第', e.lineno, '行');
});

/**
 * Promise 錯誤處理
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('🚨 未處理的 Promise 錯誤:', e.reason);
    e.preventDefault();
});

// ==========================================================================
// 輔助功能和可訪問性
// ==========================================================================

/**
 * 鍵盤導航支援
 */
function initKeyboardNavigation() {
    // ESC 鍵關閉手機版選單
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const mobileToggle = document.getElementById('mobile-nav-toggle');
            const navLinks = document.getElementById('nav-links');
            
            if (navLinks?.classList.contains('active')) {
                mobileToggle?.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
    
    // Tab 鍵焦點管理
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * 減少動畫偏好設定
 */
function respectMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // 禁用動畫
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
        console.log('🎯 已適應用戶的減少動畫偏好設定');
    }
}

// ==========================================================================
// 效能監控
// ==========================================================================

/**
 * 效能監控
 */
function initPerformanceMonitoring() {
    // 頁面載入效能
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('📊 頁面載入效能:');
            console.log(`- DOM 載入時間: ${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms`);
            console.log(`- 完整載入時間: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            
            // 監控 FCP (First Contentful Paint)
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        console.log(`- 首次內容繪製: ${Math.round(entry.startTime)}ms`);
                    }
                }
            });
            observer.observe({entryTypes: ['paint']});
        }, 0);
    });
}

// 初始化輔助功能
document.addEventListener('DOMContentLoaded', function() {
    initKeyboardNavigation();
    respectMotionPreferences();
    initPerformanceMonitoring();
});

// 複製郵件地址到剪貼簿
function copyEmail() {
    const email = 'kate60932@gmail.com';
    navigator.clipboard.writeText(email).then(function() {
        showCopyMessage();
    }).catch(function() {
        // 如果 clipboard API 不支援，使用舊方法
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyMessage();
    });
}

// 顯示複製成功訊息
function showCopyMessage() {
    const message = document.getElementById('copy-message');
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
