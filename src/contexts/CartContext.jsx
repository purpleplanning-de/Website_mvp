import { createContext, useState, useMemo, useCallback, useContext, useEffect } from 'react';
import { VALID_CODES } from '../data/discountCodes';
import { LanguageContext } from './LanguageContext';

export const CartContext = createContext(null);

// LocalStorage keys
const CART_STORAGE_KEY = 'purpleplanning_cart';
const DISCOUNT_STORAGE_KEY = 'purpleplanning_discount';

export function CartProvider({ children }) {
  const { t } = useContext(LanguageContext);

  // Initialize from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const [appliedDiscount, setAppliedDiscount] = useState(() => {
    try {
      const saved = localStorage.getItem(DISCOUNT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { code: '', value: 0 };
    } catch {
      return { code: '', value: 0 };
    }
  });

  const [feedback, setFeedback] = useState(null);
  const [discountError, setDiscountError] = useState(false);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cart]);

  // Persist discount to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DISCOUNT_STORAGE_KEY, JSON.stringify(appliedDiscount));
    } catch (error) {
      console.error('Failed to save discount to localStorage:', error);
    }
  }, [appliedDiscount]);

  const showFeedback = useCallback((msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  }, []);

  const addToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
      showFeedback(`${product.name} ${t('cart', 'added')}`);
      setIsCartOpen(true);
    },
    [showFeedback, t],
  );

  const addBundleToCart = useCallback(
    (bundleProducts, code, discountPercent) => {
      setCart((prev) => {
        let next = [...prev];
        bundleProducts.forEach((p) => {
          const existing = next.find((item) => item.id === p.id);
          if (existing) {
            next = next.map((item) =>
              item.id === p.id ? { ...item, qty: item.qty + 1 } : item,
            );
          } else {
            next.push({ ...p, qty: 1 });
          }
        });
        return next;
      });
      setDiscountCode(code);
      setAppliedDiscount({ code, value: discountPercent / 100 });
      showFeedback(t('cart', 'bundleAdded'));
      setIsCartOpen(true);
    },
    [showFeedback, t],
  );

  const updateQuantity = useCallback((id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, qty: Math.max(1, item.qty + delta) };
        }
        return item;
      }),
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const applyDiscount = useCallback(() => {
    const upper = discountCode.toUpperCase().trim();
    if (!upper) {
      setDiscountError(true);
      setTimeout(() => setDiscountError(false), 3000);
      return;
    }
    if (upper in VALID_CODES) {
      setAppliedDiscount({ code: upper, value: VALID_CODES[upper] });
      showFeedback(t('cart', 'discountApplied'));
      setDiscountError(false);
      setDiscountCode('');
    } else {
      showFeedback(t('cart', 'invalidCode'));
      setAppliedDiscount({ code: '', value: 0 });
      setDiscountError(true);
      setTimeout(() => setDiscountError(false), 3000);
    }
  }, [discountCode, showFeedback, t]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = subtotal * appliedDiscount.value;
    const shipping = subtotal > 50 ? 0 : 4.9;
    const total = subtotal - discount + shipping;
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    return { subtotal, discount, shipping, total, count };
  }, [cart, appliedDiscount.value]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        discountCode,
        setDiscountCode,
        appliedDiscount,
        feedback,
        discountError,
        addToCart,
        addBundleToCart,
        updateQuantity,
        removeFromCart,
        applyDiscount,
        totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
