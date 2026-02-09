import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star, Check } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { products } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import { useCart } from '../hooks/useCart';

const TABS = [
  { key: 'description', label: 'Beschreibung' },
  { key: 'details', label: 'Details' },
  { key: 'shipping', label: 'Versand' },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, textMuted } = useTheme();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h2 style={fontSerif} className="text-3xl italic">
          Produkt nicht gefunden
        </h2>
        <button onClick={() => navigate('/shop')} className="mt-4 text-purple-600 underline">
          Zurück zum Shop
        </button>
      </div>
    );
  }

  const actionButtonStyle =
    'w-full bg-purple-600 text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-purple-700 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 animate-in fade-in duration-500 text-left">
      <button
        onClick={() => navigate('/shop')}
        style={fontSans}
        className="flex items-center gap-2 opacity-30 hover:opacity-100 mb-10 transition-opacity text-left"
      >
        <ArrowLeft size={16} /> Zurück zur Übersicht
      </button>

      <div className="grid lg:grid-cols-2 gap-16 items-start mt-8">
        {/* Images */}
        <div className="space-y-6">
          <div
            className={`aspect-[4/5] rounded-[2.5rem] border ${
              darkMode ? 'border-white/10' : 'border-purple-50'
            } flex items-center justify-center shadow-2xl overflow-hidden relative group`}
            style={{ backgroundColor: darkMode ? '#2e1d46' : product.bgColor }}
          >
            <img
              src={product.images[currentImageIndex] || product.images[0]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={product.name}
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  currentImageIndex === idx
                    ? 'border-purple-600 scale-95'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8 py-4 text-left">
          <div>
            <div className="flex items-center gap-2 text-yellow-500 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
              <span className="text-xs opacity-50 font-bold tracking-widest uppercase ml-2">
                ({product.reviews} Reviews)
              </span>
            </div>
            <h2 style={fontSerif} className="text-5xl italic leading-tight text-left mb-2">
              {product.name}
            </h2>
            <p style={fontSans} className={`text-3xl font-light ${textMuted}`}>
              {product.price.toFixed(2)} €
            </p>
          </div>

          {/* Tabs */}
          <div className={`flex gap-4 border-b ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === key ? 'text-purple-500' : 'opacity-40 hover:opacity-100'
                }`}
              >
                {label}
                {activeTab === key && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[100px] opacity-70 font-light leading-relaxed">
            {activeTab === 'description' && <p>{product.description}</p>}
            {activeTab === 'details' && <p>{product.details}</p>}
            {activeTab === 'shipping' && <p>{product.shipping}</p>}
          </div>

          <div className="space-y-4 pt-4">
            <button
              style={fontSans}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className={actionButtonStyle}
            >
              Planung beginnen <ArrowRight size={18} />
            </button>
            <p className="text-center text-xs opacity-40 flex items-center justify-center gap-2">
              <Check size={12} /> Sofortiger digitaler Download
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
