import { createContext, useState, useMemo, useCallback } from 'react';
import { VALID_CODES } from '../data/discountCodes';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState({ code: '', value: 0 });
  const [feedback, setFeedback] = useState(null);

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
      showFeedback(`${product.name} hinzugefügt`);
      setIsCartOpen(true);
    },
    [showFeedback],
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
      showFeedback('System-Bundle & Rabatt hinzugefügt');
      setIsCartOpen(true);
    },
    [showFeedback],
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
    const upper = discountCode.toUpperCase();
    if (upper in VALID_CODES) {
      setAppliedDiscount({ code: upper, value: VALID_CODES[upper] });
      showFeedback('Rabattcode angewendet!');
    } else {
      showFeedback('Ungültiger Code');
      setAppliedDiscount({ code: '', value: 0 });
    }
  }, [discountCode, showFeedback]);

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
