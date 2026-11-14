import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { DEFAULT_PHARMACY_SETTINGS, DEFAULT_PROMOTIONS, DEFAULT_REVIEWS, PHARMACY_SERVICES } from '../data/pharmacySettings';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // 1. PRODUCTS
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("oumm_products");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse saved products", e);
      }
    }
    return SAMPLE_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem("oumm_products", JSON.stringify(products));
  }, [products]);

  // 2. CATEGORIES
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("oumm_categories");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse saved categories", e);
      }
    }
    return CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem("oumm_categories", JSON.stringify(categories));
  }, [categories]);

  // 3. SETTINGS
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("oumm_settings");
    if (saved) {
      try {
        return { ...DEFAULT_PHARMACY_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Failed to parse saved settings", e);
      }
    }
    return DEFAULT_PHARMACY_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem("oumm_settings", JSON.stringify(settings));
  }, [settings]);

  // 4. PROMOTIONS / OFFERS
  const [promotions, setPromotions] = useState(() => {
    const saved = localStorage.getItem("oumm_promotions");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_PROMOTIONS;
  });

  useEffect(() => {
    localStorage.setItem("oumm_promotions", JSON.stringify(promotions));
  }, [promotions]);

  // 5. REVIEWS
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("oumm_reviews");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem("oumm_reviews", JSON.stringify(reviews));
  }, [reviews]);

  // 6. ENQUIRIES & PRESCRIPTION SUBMISSIONS
  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem("oumm_enquiries");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: "enq-101",
        date: "2026-11-06T14:20:00Z",
        name: "Abubakar Sadiq",
        phone: "+234 802 334 5566",
        email: "abubakar.s@gmail.com",
        subject: "Blood Pressure Monitor Inquiry",
        type: "Product Enquiry",
        message: "Hello Oumm Suhayl Pharmacy, do you have extra large cuffs available for the Omron M2 Blood Pressure monitor?",
        status: "Replied via WhatsApp"
      },
      {
        id: "enq-102",
        date: "2026-11-07T09:15:00Z",
        name: "Mrs. Zainab Haruna",
        phone: "+234 813 445 9988",
        email: "zainab.h@yahoo.com",
        subject: "Pediatric Colic Drops & Teething",
        type: "Prescription / Pharmacist Advice",
        message: "My 4-month baby is having difficulty sleeping due to colic gas. Please advise on Infacol administration.",
        status: "Pending Review"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("oumm_enquiries", JSON.stringify(enquiries));
  }, [enquiries]);

  // 7. CART
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("oumm_cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("oumm_cart", JSON.stringify(cart));
  }, [cart]);

  // 8. WISHLIST
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("oumm_wishlist");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("oumm_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // 9. ADMIN AUTH
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("oumm_admin_auth") === "true";
  });

  const loginAdmin = (username, password) => {
    if (
      (username === "admin" && password === "oumm-suhayl2026") ||
      (username === "admin" && password === "admin123")
    ) {
      setIsAdminLoggedIn(true);
      localStorage.setItem("oumm_admin_auth", "true");
      showToast("Admin authenticated successfully. Welcome to Oumm Suhayl Management!");
      return true;
    }
    showToast("Invalid admin credentials. Please try again.", "error");
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("oumm_admin_auth");
    showToast("Logged out from admin panel.");
  };

  // 10. MODAL STATES
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [prescriptionTargetProduct, setPrescriptionTargetProduct] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // 11. TOAST NOTIFICATIONS
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // CART OPERATIONS
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your order list!`);
  };

  const updateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast("Item removed from order list.", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartHasRx = cart.some(item => item.product.prescriptionRequired);

  // WISHLIST OPERATIONS
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from saved items.`, "info");
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" for later!`);
        return [...prev, product];
      }
    });
  };

  // WHATSAPP URL GENERATOR
  const getWhatsAppUrl = (customMessage = '') => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(customMessage.trim());
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  };

  const getProductWhatsAppUrl = (product) => {
    const rxNotice = product.prescriptionRequired ? " [PRESCRIPTION MEDICINE - I have/will attach my doctor's prescription]" : "";
    const msg = `Hello Oumm Suhayl Medicine Store,\n\nI would like to enquire about/order:\n• Product: *${product.name}*\n• Brand: ${product.brand}\n• Price: ₦${product.price.toLocaleString()}${rxNotice}\n• Category: ${product.categoryName}\n\nPlease confirm availability and delivery to my location. Thank you!`;
    return getWhatsAppUrl(msg);
  };

  const getCartWhatsAppUrl = (customerName = '', customerAddress = '') => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let text = `*NEW ORDER INQUIRY - OUMM SUHAYL MEDICINE STORE*\n`;
    if (customerName) text += `Customer: *${customerName}*\n`;
    if (customerAddress) text += `Delivery Address: ${customerAddress}\n`;
    text += `\n*Requested Medicines & Healthcare Items:*\n`;

    cart.forEach((item, idx) => {
      const rxTag = item.product.prescriptionRequired ? " [Rx Required]" : "";
      text += `${idx + 1}. *${item.product.name}* (Qty: ${item.quantity}) - ₦${(item.product.price * item.quantity).toLocaleString()}${rxTag}\n`;
    });

    text += `\n*Estimated Total: ₦${cartTotal.toLocaleString()}*\n`;
    if (cartHasRx) {
      text += `\n⚠️ *Note:* This order contains Prescription-Only items. I will provide a clear photo of my doctor's prescription.\n`;
    }
    text += `\nPlease confirm total, payment details, and dispatch timeframe. Thank you!`;

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  // PRODUCT CRUD (ADMIN)
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `oumm-med-${Date.now()}`,
      rating: newProduct.rating || 5.0,
      reviewCount: newProduct.reviewCount || 1,
      price: Number(newProduct.price) || 0,
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) || 0,
      stockCount: Number(newProduct.stockCount) || 50,
      inStock: newProduct.inStock !== false,
      prescriptionRequired: !!newProduct.prescriptionRequired,
      featured: !!newProduct.featured,
      isSpecialOffer: !!newProduct.isSpecialOffer
    };
    setProducts(prev => [productWithId, ...prev]);
    showToast(`Medicine "${productWithId.name}" added successfully!`);
    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            ...updatedFields,
            price: Number(updatedFields.price !== undefined ? updatedFields.price : p.price),
            originalPrice: Number(updatedFields.originalPrice !== undefined ? updatedFields.originalPrice : p.originalPrice),
            stockCount: Number(updatedFields.stockCount !== undefined ? updatedFields.stockCount : p.stockCount),
          };
        }
        return p;
      })
    );
    showToast("Product updated successfully!");
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast("Product removed from inventory.", "info");
  };

  // SETTINGS UPDATE
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast("Pharmacy store settings saved successfully!");
  };

  // PROMOTIONS CRUD
  const addPromotion = (newPromo) => {
    const promoWithId = {
      ...newPromo,
      id: newPromo.id || `promo-${Date.now()}`,
      bgGradient: newPromo.bgGradient || "from-emerald-700 via-teal-800 to-slate-900"
    };
    setPromotions(prev => [promoWithId, ...prev]);
    showToast("Special offer campaign added!");
  };

  const deletePromotion = (id) => {
    setPromotions(prev => prev.filter(p => p.id !== id));
    showToast("Campaign removed.", "info");
  };

  // REVIEWS CRUD
  const addReview = (reviewData) => {
    const newRev = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      avatar: reviewData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewData.author)}&background=059669&color=fff`
    };
    setReviews(prev => [newRev, ...prev]);
    showToast("Thank you! Your feedback has been posted.");
  };

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast("Review deleted.", "info");
  };

  // ENQUIRIES / CONTACT / PRESCRIPTIONS
  const submitEnquiry = (enquiryData) => {
    const newEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      date: new Date().toISOString(),
      status: "New"
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    showToast("Your message has been sent to the pharmacist! We will contact you shortly.");
    return newEnquiry;
  };

  const deleteEnquiry = (id) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
    showToast("Enquiry archived.", "info");
  };

  // RESET TO DEFAULT DATA
  const resetToDefaultData = () => {
    localStorage.removeItem("oumm_products");
    localStorage.removeItem("oumm_categories");
    localStorage.removeItem("oumm_settings");
    localStorage.removeItem("oumm_promotions");
    localStorage.removeItem("oumm_reviews");
    setProducts(SAMPLE_PRODUCTS);
    setCategories(CATEGORIES);
    setSettings(DEFAULT_PHARMACY_SETTINGS);
    setPromotions(DEFAULT_PROMOTIONS);
    setReviews(DEFAULT_REVIEWS);
    showToast("Restored initial pharmacy catalog and settings!");
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const openPrescriptionModal = (product = null) => {
    setPrescriptionTargetProduct(product);
    setIsPrescriptionModalOpen(true);
  };

  const closePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false);
    setPrescriptionTargetProduct(null);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        settings,
        promotions,
        reviews,
        enquiries,
        services: PHARMACY_SERVICES,
        cart,
        cartTotal,
        cartItemCount,
        cartHasRx,
        wishlist,
        toast,
        isAdminLoggedIn,
        quickViewProduct,
        isQuickViewOpen,
        isCartOpen,
        isPrescriptionModalOpen,
        prescriptionTargetProduct,
        isReviewModalOpen,
        setIsCartOpen,
        setIsReviewModalOpen,
        openQuickView,
        closeQuickView,
        openPrescriptionModal,
        closePrescriptionModal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        getWhatsAppUrl,
        getProductWhatsAppUrl,
        getCartWhatsAppUrl,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        addPromotion,
        deletePromotion,
        addReview,
        deleteReview,
        submitEnquiry,
        deleteEnquiry,
        loginAdmin,
        logoutAdmin,
        showToast,
        resetToDefaultData
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
