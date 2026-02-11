import { useNavigate } from 'react-router-dom';
import {
  X,
  Sparkle,
  Minus,
  Plus,
  Trash2,
  Check,
  ArrowRight,
  CreditCard,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { fontSerif, fontSans } from '../../data/styles';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';

export default function CartSidebar() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    discountCode,
    setDiscountCode,
    appliedDiscount,
    discountError,
    updateQuantity,
    removeFromCart,
    applyDiscount,
    totals,
  } = useCart();

  const actionButtonStyle =
    'w-full bg-purple-600 text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-purple-700 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer';

  const goToProduct = (item) => {
    navigate(`/product/${item.id}`);
    setIsCartOpen(false);
  };

  const goToShop = () => {
    navigate('/shop');
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-all duration-700 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md ${
          darkMode ? 'bg-[#2e1d46] text-white' : 'bg-white text-black'
        } shadow-2xl z-[101] transition-transform duration-700 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)' }}
      >
        <div className="p-8 h-full flex flex-col text-left">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 style={fontSerif} className="text-3xl italic">
              {t('cart', 'title')}
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label={t('cart', 'close')}
              className="p-2 hover:bg-white/10 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-grow overflow-y-auto space-y-6 pr-2">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Sparkle size={48} className="text-purple-400 mb-6" />
                <h3 style={fontSerif} className="text-xl italic mb-4">
                  {t('cart', 'empty')}
                </h3>
                <button
                  onClick={goToShop}
                  style={fontSans}
                  className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-purple-700"
                >
                  {t('cart', 'browse')}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-white/10 pb-6 items-start group"
                  >
                    <div
                      className="w-20 h-24 rounded-xl overflow-hidden shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => goToProduct(item)}
                    >
                      <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} loading="lazy" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between h-24 py-1">
                      <div>
                        <h4
                          style={fontSerif}
                          className="text-lg leading-tight mb-1 cursor-pointer hover:text-purple-500 transition-colors"
                          onClick={() => goToProduct(item)}
                        >
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <p style={fontSans} className="text-purple-400 font-semibold text-sm">
                            {item.price.toFixed(2)} €
                          </p>
                          {appliedDiscount.value > 0 && (
                            <span className="text-[9px] bg-red-100 text-red-600 px-1.5 rounded font-bold uppercase tracking-wide">
                              -{appliedDiscount.value * 100}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex items-center gap-2 ${
                            darkMode ? 'bg-black/20' : 'bg-gray-50'
                          } rounded-lg px-1 py-1`}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={t('cart', 'decreaseQuantity')}
                            className="min-w-[32px] min-h-[32px] flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                          >
                            <Minus size={14} aria-hidden="true" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center" aria-label={`${t('cart', 'quantity')}: ${item.qty}`}>{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={t('cart', 'increaseQuantity')}
                            className="min-w-[32px] min-h-[32px] flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                          >
                            <Plus size={14} aria-hidden="true" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`${t('cart', 'remove')} ${item.name}`}
                          className="text-gray-400 hover:text-red-400 min-w-[32px] min-h-[32px] flex items-center justify-center"
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {cart.length > 0 && (
            <div className="pt-6 border-t border-white/10 space-y-4">
              {/* Discount Input */}
              <div className="space-y-2">
                <div className="flex gap-2 relative">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder={t('cart', 'discountPlaceholder')}
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && applyDiscount()}
                      aria-invalid={discountError ? 'true' : 'false'}
                      aria-describedby="discount-error"
                      className={`w-full px-4 py-2 pr-10 rounded-xl text-sm outline-none border-2 transition-all uppercase tracking-wider font-bold ${
                        discountError
                          ? 'border-red-500 focus:border-red-600'
                          : appliedDiscount.code
                            ? 'border-green-500 focus:border-green-600'
                            : darkMode
                              ? 'bg-white/10 border-transparent text-white focus:border-purple-500'
                              : 'bg-gray-50 border-gray-200 text-black focus:border-purple-500'
                      }`}
                    />
                    {appliedDiscount.code && !discountCode && (
                      <CheckCircle
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                    {discountError && (
                      <AlertCircle
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <button
                    onClick={applyDiscount}
                    aria-label={t('cart', 'applyDiscount')}
                    className="bg-purple-600 text-white px-4 rounded-xl hover:bg-purple-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <Check size={18} aria-hidden="true" />
                  </button>
                </div>
                {discountError && (
                  <p id="discount-error" className="text-red-500 text-xs flex items-center gap-1 animate-in slide-in-from-top-2">
                    <AlertCircle size={12} aria-hidden="true" />
                    {t('cart', 'invalidCode')}
                  </p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm opacity-70">
                <div className="flex justify-between">
                  <span>{t('cart', 'subtotal')}</span>
                  <span>{totals.subtotal.toFixed(2)} €</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-red-400">
                    <span>{t('cart', 'discount')} ({appliedDiscount.code})</span>
                    <span>-{totals.discount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t('cart', 'shipping')}</span>
                  <span>
                    {totals.shipping === 0 ? t('cart', 'shippingFree') : `${totals.shipping.toFixed(2)} €`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold py-2 border-t border-white/10">
                <span style={fontSerif}>{t('cart', 'total')}</span>
                <span>{totals.total.toFixed(2)} €</span>
              </div>

              {/* Payment Methods */}
              <div className="flex justify-center gap-4 opacity-40 grayscale pb-2">
                <CreditCard size={20} />
                <span className="font-bold text-xs border border-current px-1 rounded">
                  PayPal
                </span>
                <span className="font-bold text-xs border border-current px-1 rounded">
                  Klarna.
                </span>
              </div>

              <button className={actionButtonStyle}>
                {t('cart', 'checkout')} <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
