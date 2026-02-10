import { fontSerif, fontSans } from '../data/styles';
import { products } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import ProductCard from '../components/ui/ProductCard';

export default function ShopPage() {
  const { darkMode } = useTheme();

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 text-left animate-in fade-in duration-700">
      <div className="text-center mb-16 md:mb-24 mt-6 md:mt-12">
        <h2 style={fontSerif} className="text-4xl md:text-6xl mb-6 italic text-center">
          Der Shop
        </h2>
        <p
          style={fontSans}
          className={`font-light italic text-base md:text-lg max-w-lg mx-auto text-center ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          Jeder Plan ist ein stilles Versprechen an dich selbst. Fülle deine Zeit mit dem, was dich
          wachsen lässt.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-14 mb-24 md:mb-36">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
