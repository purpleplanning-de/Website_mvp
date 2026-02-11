import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star, Check } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { products } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import { useCart } from '../hooks/useCart';
import { useLanguage } from '../hooks/useLanguage';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, textMuted } = useTheme();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = products.find((p) => p.id === Number(id));
  const productIndex = product ? product.id - 1 : 0;
  const productTranslations = t('products', productIndex);
  const tabs = t('product', 'tabs');

  const TABS = [
    { key: 'description', label: tabs.description },
    { key: 'details', label: tabs.details },
    { key: 'shipping', label: tabs.shipping },
  ];

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-28 text-center">
        <h2 style={fontSerif} className="text-3xl italic">
          {t('product', 'notFound')}
        </h2>
        <button onClick={() => navigate('/shop')} className="mt-6 text-purple-600 underline">
          {t('product', 'backToShop')}
        </button>
      </div>
    );
  }

  const actionButtonStyle =
    'w-full bg-purple-600 text-white py-5 rounded-2xl font-bold shadow-lg hover:bg-purple-700 hover:shadow-xl active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2 cursor-pointer';

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 py-12 md:py-16 animate-in fade-in duration-500 text-left pt-40">
      <button
        onClick={() => navigate('/shop')}
        style={fontSans}
        className="flex items-center gap-2 opacity-30 hover:opacity-100 mb-12 transition-opacity text-left text-sm"
      >
        <ArrowLeft size={16} /> {t('product', 'back')}
      </button>

      <div className="grid lg:grid-cols-2 gap-14 md:gap-20 items-start">
        {/* Images */}
        <div className="space-y-6">
          <div
            className={`aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] border ${
              darkMode ? 'border-white/[0.06]' : 'border-purple-100/40'
            } flex items-center justify-center shadow-xl overflow-hidden relative group`}
            style={{ backgroundColor: darkMode ? '#2e1d46' : product.bgColor }}
          >
            <img
              src={product.images[currentImageIndex] || product.images[0]}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={product.name}
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all ${
                  currentImageIndex === idx
                    ? 'border-purple-500 scale-95'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-9 py-4 text-left">
          <div>
            <div className="flex items-center gap-1.5 text-yellow-500 mb-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
              <span className="text-[11px] opacity-40 font-bold tracking-widest uppercase ml-2">
                ({product.reviews} Reviews)
              </span>
            </div>
            <h2 style={fontSerif} className="text-4xl md:text-5xl italic leading-tight text-left mb-3">
              {product.name}
            </h2>
            <p style={fontSans} className={`text-2xl md:text-3xl font-light ${textMuted}`}>
              {product.price.toFixed(2)} €
            </p>
          </div>

          {/* Tabs */}
          <div className={`flex gap-5 border-b ${darkMode ? 'border-white/[0.06]' : 'border-purple-100/40'}`}>
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === key ? 'text-purple-500' : 'opacity-35 hover:opacity-100'
                }`}
              >
                {label}
                {activeTab === key && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[100px] opacity-60 font-light leading-relaxed text-sm md:text-base">
            {activeTab === 'description' && <p>{productTranslations?.description ?? product.description}</p>}
            {activeTab === 'details' && <p>{productTranslations?.details ?? product.details}</p>}
            {activeTab === 'shipping' && <p>{productTranslations?.shipping ?? product.shipping}</p>}
          </div>

          <div className="space-y-5 pt-4">
            <button
              style={fontSans}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className={actionButtonStyle}
            >
              {t('product', 'addToCart')} <ArrowRight size={18} />
            </button>
            <p className="text-center text-xs opacity-35 flex items-center justify-center gap-2">
              <Check size={12} /> {t('product', 'download')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
