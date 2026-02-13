import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { getImg } from '../data/products';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import SEO from '../components/SEO';

export default function ContactPage() {
  const { darkMode, textMain, cardBg, borderColor } = useTheme();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Bitte fülle alle Felder aus.',
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Bitte gib eine gültige E-Mail-Adresse ein.',
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: 'Nachricht erfolgreich gesendet! Wir melden uns bald bei dir. 💜',
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const inputBaseStyle = `w-full px-5 py-4 rounded-xl border-2 transition-all ${
    darkMode
      ? 'bg-white/[0.03] border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:bg-white/[0.05]'
      : 'bg-white border-purple-100 text-gray-900 placeholder:text-gray-400 focus:border-purple-400 focus:bg-purple-50/30'
  }`;

  const labelStyle = `block mb-2 text-sm font-semibold uppercase tracking-wider ${
    darkMode ? 'text-purple-300' : 'text-purple-700'
  }`;

  return (
    <>
      <SEO
        title="Kontakt - Purple Planning | Schreib uns"
        description="Hast du Fragen zu unseren handgefertigten Planern? Kontaktiere uns! Wir helfen dir gerne weiter."
        keywords="kontakt, purple planning, kundenservice, fragen, support"
      />
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 animate-in fade-in duration-1000">
        {/* Header */}
        <header className="text-center mb-20 md:mb-28 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={fontSans}
            className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 ${
              darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-50 text-purple-600'
            }`}
          >
            {t('contact', 'tagline')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={fontSerif}
            className={`text-5xl md:text-6xl leading-tight mb-6 ${textMain}`}
          >
            {t('contact', 'title')}{' '}
            <span className="text-purple-600">{t('contact', 'titleAccent')}</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={fontSans}
            className={`text-base md:text-lg font-light leading-relaxed max-w-2xl ${
              darkMode ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            {t('contact', 'subtitle')}
          </motion.p>
        </header>

        {/* Decorative Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24 md:mb-32 max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
              src={getImg('1455390582262-044cdead277b')}
              loading="eager"
              className="w-full h-[240px] md:h-[320px] object-cover grayscale-[20%]"
              alt="Purple Planning Workspace"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${
                darkMode ? 'from-[#1a0b2e]/70' : 'from-purple-50/40'
              } via-transparent to-transparent`}
            />
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className={labelStyle}>
                  <User size={14} className="inline mr-2" />
                  Dein Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Max Mustermann"
                  className={inputBaseStyle}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className={labelStyle}>
                  <Mail size={14} className="inline mr-2" />
                  E-Mail Adresse
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="max@beispiel.de"
                  className={inputBaseStyle}
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className={labelStyle}>
                  <MessageSquare size={14} className="inline mr-2" />
                  Deine Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Erzähl uns, wie wir dir helfen können..."
                  rows={6}
                  className={`${inputBaseStyle} resize-none`}
                  required
                />
              </div>

              {/* Status Messages */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl flex items-start gap-3 ${
                    status.type === 'success'
                      ? darkMode
                        ? 'bg-green-900/20 border border-green-700/40 text-green-300'
                        : 'bg-green-50 border border-green-200 text-green-700'
                      : darkMode
                      ? 'bg-red-900/20 border border-red-700/40 text-red-300'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm font-medium">{status.message}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-purple-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sende...
                  </>
                ) : (
                  <>
                    Nachricht senden <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Info Card */}
            <div
              className={`p-8 rounded-3xl border ${cardBg} ${
                darkMode ? 'border-white/10' : 'border-purple-100'
              }`}
            >
              <h3 style={fontSerif} className={`text-2xl italic mb-6 ${textMain}`}>
                Weitere Kontaktmöglichkeiten
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      darkMode ? 'bg-purple-900/30' : 'bg-purple-50'
                    }`}
                  >
                    <Mail size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-50">
                      E-Mail
                    </p>
                    <a
                      href="mailto:hello@purpleplanning.de"
                      className={`font-medium ${
                        darkMode
                          ? 'text-purple-300 hover:text-purple-200'
                          : 'text-purple-600 hover:text-purple-700'
                      } transition-colors`}
                    >
                      hello@purpleplanning.de
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Hint */}
            <div
              className={`p-8 rounded-3xl border ${
                darkMode
                  ? 'bg-purple-900/10 border-purple-800/40'
                  : 'bg-purple-50/50 border-purple-100'
              }`}
            >
              <h4 style={fontSerif} className={`text-xl italic mb-3 ${textMain}`}>
                💡 Schnelle Antworten
              </h4>
              <p
                style={fontSans}
                className={`text-sm leading-relaxed mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Viele Fragen werden bereits in unserem Blog oder auf der About-Seite beantwortet.
                Schau doch mal vorbei!
              </p>
            </div>

            {/* Response Time */}
            <div
              className={`p-6 rounded-2xl border text-center ${
                darkMode
                  ? 'bg-white/[0.02] border-white/10'
                  : 'bg-gray-50/50 border-gray-200'
              }`}
            >
              <p className="text-xs uppercase tracking-wider font-semibold mb-2 opacity-40">
                Antwortzeit
              </p>
              <p
                style={fontSerif}
                className={`text-lg italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Innerhalb von <span className="text-purple-600 font-bold">24-48 Stunden</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
