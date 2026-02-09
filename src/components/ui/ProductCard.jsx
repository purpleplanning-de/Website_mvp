import { useNavigate } from 'react-router-dom';
import { fontSerif, fontSans } from '../../data/styles';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';

export default function ProductCard({ product, index }) {
  const navigate = useNavigate();
  const { darkMode, textMuted } = useTheme();
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      className="group cursor-pointer hover:-translate-y-2 transition-transform duration-500"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div
        className="aspect-[3/4] rounded-[2.5rem] mb-6 overflow-hidden relative shadow-sm hover:shadow-2xl transition-all duration-700"
        style={{ backgroundColor: darkMode ? '#2e1d46' : product.bgColor }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply group-hover:mix-blend-normal"
        />
        <span
          style={fontSerif}
          className="absolute inset-0 flex items-center justify-center text-8xl text-purple-900/10 italic z-10"
        >
          0{product.id}
        </span>
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors z-20" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-30">
          <button
            style={fontSans}
            onClick={handleAdd}
            className="w-full bg-white/95 py-4 rounded-2xl text-purple-700 font-bold text-[10px] uppercase tracking-widest shadow-xl text-center active:scale-95 transition-transform"
          >
            Begleiter auswählen
          </button>
        </div>
      </div>
      <h4 style={fontSerif} className="text-2xl mb-1 italic text-left">
        {product.name}
      </h4>
      <p style={fontSans} className={`${textMuted} font-medium text-sm text-left`}>
        {product.price.toFixed(2)} €
      </p>
    </div>
  );
}
