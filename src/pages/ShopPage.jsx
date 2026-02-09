import { fontSerif, fontSans } from '../data/styles';
import { products } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import ProductCard from '../components/ui/ProductCard';

export default function ShopPage() {
  const { darkMode } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-6 text-left animate-in fade-in duration-700">
      <div className="text-center mb-16 mt-8">
        <h2 style={fontSerif} className="text-6xl mb-6 italic text-center">
          Der Shop
        </h2>
        <p
          style={fontSans}
          className="opacity-50 font-light italic text-lg max-w-2xl mx-auto text-center"
        >
          Jeder Plan ist ein stilles Versprechen an dich selbst. Fülle deine Zeit mit dem, was dich
          wachsen lässt.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
