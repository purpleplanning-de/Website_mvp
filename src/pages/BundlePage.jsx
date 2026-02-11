import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Coffee,
  Sparkle,
  Laptop,
  BookOpen,
  Smartphone,
  CreditCard,
  Heart,
  Star,
} from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { products } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import { useCart } from '../hooks/useCart';
import { useLanguage } from '../hooks/useLanguage';

const OPTION_IDS = [
  ['chaos', 'stress', 'ugly'],
  ['digital', 'hybrid', 'mobile'],
  ['financial', 'mindful', 'visual'],
];

const OPTION_ICONS = [
  [Zap, Coffee, Sparkle],
  [Laptop, BookOpen, Smartphone],
  [CreditCard, Heart, Star],
];

function resolveBundle(selections, t) {
  const painPoint = selections[0]?.id;
  const goal = selections[2]?.id;

  const results = t('bundle', 'results');

  if (painPoint === 'chaos' || goal === 'financial') {
    return {
      title: results.ceo.title,
      desc: results.ceo.desc,
      items: [products[0], products[7], products[5]],
      discount: 20,
      code: 'CEO20',
    };
  }

  if (painPoint === 'ugly' || goal === 'visual') {
    return {
      title: results.creator.title,
      desc: results.creator.desc,
      items: [products[0], products[6], products[1]],
      discount: 15,
      code: 'CREATOR15',
    };
  }

  return {
    title: results.balance.title,
    desc: results.balance.desc,
    items: [products[0], products[2], products[4]],
    discount: 15,
    code: 'BALANCE15',
  };
}

export default function BundlePage() {
  const navigate = useNavigate();
  const { darkMode, textMuted, cardBg } = useTheme();
  const { addBundleToCart } = useCart();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState([]);

  const isResult = step === 'result';
  const questions = t('bundle', 'questions');

  const handleOption = (optionId) => {
    const next = [...selections, { id: optionId }];
    setSelections(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep('result');
    }
  };

  const bundle = isResult ? resolveBundle(selections, t) : null;

  const actionButtonStyle =
    'bg-purple-600 text-white py-5 rounded-2xl font-bold shadow-lg hover:bg-purple-700 hover:shadow-xl active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2 cursor-pointer';

  return (
    <div className="max-w-4xl mx-auto px-8 md:px-12 mt-12 md:mt-16 mb-20 md:mb-28 animate-in fade-in text-center min-h-[40vh] flex flex-col justify-start">
      {!isResult ? (
        <>
          <p style={fontSans} className={`${textMuted} font-bold uppercase tracking-widest mb-10`}>
            {t('bundle', 'step')} {step + 1} {t('bundle', 'of')} {questions.length}
          </p>
          <h2 style={fontSerif} className="text-4xl md:text-5xl italic mb-14 md:mb-16">
            {questions[step].question}
          </h2>
          <div className="grid md:grid-cols-3 gap-7 md:gap-8">
            {questions[step].options.map((optText, optIdx) => {
              const Icon = OPTION_ICONS[step][optIdx];
              const optId = OPTION_IDS[step][optIdx];
              return (
                <button
                  key={optId}
                  onClick={() => handleOption(optId)}
                  className={`card-hover p-9 md:p-10 rounded-[2rem] border flex flex-col items-center text-center group ${cardBg} ${
                    darkMode ? 'hover:border-purple-400/40' : 'hover:border-purple-300'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-7 transition-colors ${
                      darkMode
                        ? 'bg-white/[0.06] text-white/70'
                        : 'bg-purple-50/60 text-gray-400 group-hover:text-purple-600'
                    }`}
                  >
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <p className="font-medium text-base md:text-lg leading-relaxed">{optText}</p>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="animate-in slide-in-from-bottom-8 duration-700">
          <div
            className={`inline-block px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 ${
              darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'
            }`}
          >
            {t('bundle', 'match')}
          </div>
          <h2 style={fontSerif} className="text-5xl italic mb-5">
            {bundle.title}
          </h2>
          <p
            className={`text-lg md:text-xl mb-14 max-w-lg mx-auto font-light ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {bundle.desc}
          </p>

          <div className={`p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border max-w-2xl mx-auto mb-14 ${cardBg}`}>
            <div className="space-y-4 mb-8 text-left">
              {bundle.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-4 items-center p-3 rounded-2xl cursor-pointer transition-colors ${
                    darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-purple-50/40'
                  }`}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold">{item.name}</h4>
                      <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                        -{bundle.discount}%
                      </span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.description.substring(0, 60)}...
                    </p>
                    <p className="text-xs text-purple-500 mt-1 font-bold">
                      {t('product', 'viewDetails')} &rarr;
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t pt-7 ${
                darkMode ? 'border-white/[0.06]' : 'border-purple-100/40'
              }`}
            >
              <div>
                <p className="text-xs uppercase font-bold text-gray-400 mb-1">
                  {t('bundle', 'bundlePrice')} (Code:{' '}
                  <span className="text-purple-500">{bundle.code}</span>)
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-purple-600">
                    {(
                      bundle.items.reduce((a, b) => a + b.price, 0) *
                      (1 - bundle.discount / 100)
                    ).toFixed(2)}{' '}
                    €
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    {bundle.items.reduce((a, b) => a + b.price, 0).toFixed(2)} €
                  </span>
                </div>
              </div>
              <button
                onClick={() => addBundleToCart(bundle.items, bundle.code, bundle.discount)}
                className={`${actionButtonStyle} w-full sm:w-auto px-8`}
              >
                {t('bundle', 'secure')} <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setStep(0);
              setSelections([]);
            }}
            className="text-gray-400 hover:text-purple-500 text-sm transition-colors"
          >
            {t('bundle', 'restart')}
          </button>
        </div>
      )}
    </div>
  );
}
