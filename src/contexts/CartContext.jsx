import { createContext, useState, useMemo, useCallback, useContext, useEffect, useRef } from 'react';
import { VALID_CODES } from '../data/discountCodes';
import { products } from '../data/products';
import { LanguageContext } from './LanguageContext';

// Baut ein schnelles ID→Preis-Lookup aus der Produktliste (Wahrheitsquelle für Preise)
const PRODUCT_PRICE_MAP = Object.fromEntries(products.map((p) => [p.id, p.price]));

// Lemon Squeezy Test-Checkout-URL (Overlay, Option B — ohne Backend)
// TODO: Für Produktion durch Backend-Flow (checkout.php) ersetzen
const LS_CHECKOUT_URL =
  'https://purpleplanning.lemonsqueezy.com/checkout/buy/48de2136-44f6-440c-867d-a3563dbfcd2f';

export const CartContext = createContext(null);

// LocalStorage keys
const CART_STORAGE_KEY = 'purpleplanning_cart';
const DISCOUNT_STORAGE_KEY = 'purpleplanning_discount';

export function CartProvider({ children }) {
  const { t } = useContext(LanguageContext);
  const feedbackTimerRef = useRef(null);
  const discountErrorTimerRef = useRef(null);

  // Initialize from localStorage — Preise werden gegen products.js revalidiert,
  // damit manipulierte localStorage-Einträge keine falschen Preise einschleusen können.
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return parsed
        .filter((item) => item.id && PRODUCT_PRICE_MAP[item.id] !== undefined)
        .map((item) => ({
          ...item,
          price: PRODUCT_PRICE_MAP[item.id], // Preis immer aus products.js, nie aus Storage
          qty: Math.max(1, Math.floor(item.qty || 1)),
        }));
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const [appliedDiscount, setAppliedDiscount] = useState(() => {
    try {
      const saved = localStorage.getItem(DISCOUNT_STORAGE_KEY);
      if (!saved) return { code: '', value: 0 };
      const parsed = JSON.parse(saved);
      // Discount-Code gegen VALID_CODES revalidieren — verhindert Injection beliebiger Rabatte
      const isValid = parsed.code && parsed.code in VALID_CODES;
      return isValid ? { code: parsed.code, value: VALID_CODES[parsed.code] } : { code: '', value: 0 };
    } catch {
      return { code: '', value: 0 };
    }
  });

  const [feedback, setFeedback] = useState(null);
  const [discountError, setDiscountError] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

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

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      if (discountErrorTimerRef.current) clearTimeout(discountErrorTimerRef.current);
    };
  }, []);

  // Lemon Squeezy SDK initialisieren (lemon.js wird per Script-Tag in index.html geladen)
  useEffect(() => {
    if (typeof window.createLemonSqueezy === 'function') {
      window.createLemonSqueezy();
    }
  }, []);

  const showFeedback = useCallback((msg) => {
    setFeedback(msg);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setFeedback(null), 3000);
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
          // Preis aus products.js sicherstellen, auch bei Bundle-Items
          const validatedPrice = PRODUCT_PRICE_MAP[p.id] ?? p.price;
          const existing = next.find((item) => item.id === p.id);
          if (existing) {
            next = next.map((item) =>
              item.id === p.id ? { ...item, qty: item.qty + 1 } : item,
            );
          } else {
            next.push({ ...p, price: validatedPrice, qty: 1 });
          }
        });
        return next;
      });
      // Bundle-Rabatt auf maximal 50% clampen — verhindert absurde Werte durch fehlerhafte Aufrufe
      const clampedPercent = Math.min(Math.max(discountPercent, 0), 50);
      setDiscountCode(code);
      setAppliedDiscount({ code, value: clampedPercent / 100 });
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
      if (discountErrorTimerRef.current) clearTimeout(discountErrorTimerRef.current);
      discountErrorTimerRef.current = setTimeout(() => setDiscountError(false), 3000);
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
      if (discountErrorTimerRef.current) clearTimeout(discountErrorTimerRef.current);
      discountErrorTimerRef.current = setTimeout(() => setDiscountError(false), 3000);
    }
  }, [discountCode, showFeedback, t]);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedDiscount({ code: '', value: 0 });
    setDiscountCode('');
    setCheckoutError(null);
  }, []);

  // Lemon Squeezy Overlay-Events verarbeiten (Success / Closed)
  useEffect(() => {
    function handleLSEvent({ event }) {
      if (event === 'Checkout.Success') {
        clearCart();
        setIsCartOpen(false);
        setCheckoutLoading(false);
        showFeedback(t('cart', 'checkoutSuccess'));
      }
      if (event === 'Checkout.Closed') {
        setCheckoutLoading(false);
      }
    }

    window.LemonSqueezy?.Setup?.({ eventHandler: handleLSEvent });
  }, [clearCart, showFeedback, t]);

  const checkout = useCallback(() => {
    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      // Checkout-URL zusammenbauen (mit optionalem Discount-Code)
      let url = LS_CHECKOUT_URL;
      if (appliedDiscount.code) {
        url += `?discount=${encodeURIComponent(appliedDiscount.code)}`;
      }

      // Overlay öffnen (lemon.js muss geladen sein)
      if (window.LemonSqueezy?.Url?.Open) {
        window.LemonSqueezy.Url.Open(url);
      } else {
        // Fallback: Direkter Redirect wenn lemon.js nicht geladen (z.B. Ad-Blocker)
        window.location.href = url + (url.includes('?') ? '&' : '?') + 'embed=1';
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutError(t('cart', 'checkoutError'));
      setCheckoutLoading(false);
    }
  }, [appliedDiscount.code, t]);

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
        checkout,
        checkoutLoading,
        checkoutError,
        clearCart,
        totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
