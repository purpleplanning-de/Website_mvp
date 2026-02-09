import { Check } from 'lucide-react';
import { fontSans } from '../../data/styles';
import { useCart } from '../../hooks/useCart';

export default function FeedbackToast() {
  const { feedback } = useCart();

  if (!feedback) return null;

  return (
    <div
      style={fontSans}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5"
    >
      <Check size={18} /> {feedback}
    </div>
  );
}
