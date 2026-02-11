import { useState } from 'react';
import { LogOut, Award, Check, Lock, Package } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';
import { useTheme } from '../hooks/useTheme';
import { useUser } from '../hooks/useUser';
import { useLanguage } from '../hooks/useLanguage';

export default function ProfilePage() {
  const { darkMode, cardBg } = useTheme();
  const { userData, setUserData, levelInfo, levels } = useUser();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const { current: currentLevel, next: nextLevel, progressPercent, pointsToNext } = levelInfo;
  const points = userData.points;
  const profileTabs = t('profile', 'tabs');
  const translatedLevels = t('levels', null) || levels;

  const TABS = [
    { key: 'overview', label: profileTabs.overview },
    { key: 'orders', label: profileTabs.orders },
    { key: 'addresses', label: profileTabs.addresses },
    { key: 'settings', label: profileTabs.settings },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in pt-16">
      <header className="mb-12">
        <h2 style={fontSerif} className="text-5xl mb-4">
          {t('profile', 'welcome')} {userData.name.split(' ')[0]}
        </h2>
        <p className="opacity-60 font-light">
          {t('profile', 'subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-2">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${
                activeTab === key
                  ? 'bg-purple-50 text-purple-700'
                  : 'opacity-60 hover:opacity-100 hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          ))}
          <button className="w-full text-left px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-red-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center gap-2 mt-8">
            <LogOut size={16} /> {t('profile', 'logout')}
          </button>
        </div>

        {/* Content */}
        <div className={`md:col-span-3 border rounded-[2.5rem] p-10 shadow-sm min-h-[500px] ${cardBg}`}>
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-in fade-in">
              <div
                className={`bg-gradient-to-br border p-8 rounded-3xl relative overflow-hidden ${
                  darkMode
                    ? 'from-[#2e1d46] to-[#1a0b2e] border-white/10'
                    : 'from-purple-50 to-white border-purple-100'
                }`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Award size={120} className="text-purple-600" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-purple-200 text-purple-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {t('profile', 'yourStatus')}
                    </span>
                    <span style={fontSerif} className="text-2xl italic text-purple-500">
                      {translatedLevels[levelInfo.actualIdx]?.name ?? currentLevel.name}
                    </span>
                  </div>
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-5xl font-bold">{points}</span>
                    <span className="text-sm opacity-60 mb-2">{t('profile', 'pointsCollected')}</span>
                  </div>
                  <div className="w-full bg-purple-100/20 h-3 rounded-full overflow-hidden mb-4">
                    <div
                      className="bg-purple-600 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  {nextLevel ? (
                    <p className="text-sm opacity-60">
                      {t('profile', 'pointsTo')} <span className="font-bold text-purple-500">{pointsToNext} {t('profile', 'pointsUntil')}</span>{' '}
                      {t('profile', 'untilLevel')} <span className="italic">{translatedLevels[levelInfo.actualIdx + 1]?.name ?? nextLevel.name}</span>.
                    </p>
                  ) : (
                    <p className="text-sm text-purple-500 font-bold">
                      {t('profile', 'maxLevel')}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4
                  style={fontSans}
                  className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6"
                >
                  {t('profile', 'journeyStages')}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {translatedLevels.map((lvl, i) => {
                    const origLevel = levels[i];
                    const isUnlocked = points >= origLevel.min;
                    const isCurrent = currentLevel.name === origLevel.name;
                    return (
                      <div
                        key={i}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'border-purple-400 ring-2 ring-purple-100 bg-purple-50 dark:bg-purple-900/20'
                            : isUnlocked
                              ? 'opacity-70 border-purple-100'
                              : 'opacity-40 grayscale border-gray-100'
                        }`}
                      >
                        <div className="mb-3">
                          {isUnlocked ? (
                            <Check size={16} className="text-purple-600" />
                          ) : (
                            <Lock size={16} className="text-gray-400" />
                          )}
                        </div>
                        <p
                          style={fontSerif}
                          className={`text-lg italic mb-1 ${
                            isUnlocked ? 'text-purple-500' : 'text-gray-500'
                          }`}
                        >
                          {lvl.name}
                        </p>
                        <p className="text-[10px] opacity-60 leading-tight">{lvl.benefit}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="animate-in fade-in">
              <h3 style={fontSerif} className="text-2xl italic mb-8">
                {t('profile', 'orderHistory')}
              </h3>
              <div className="space-y-4">
                {[1, 2].map((o) => (
                  <div
                    key={o}
                    className={`border rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer ${
                      darkMode ? 'border-white/10' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                        <Package size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{t('profile', 'order')} #{2025000 + o}</p>
                        <p className="text-xs opacity-60">{t('profile', 'from')} 12.01.2026 &bull; 2 {t('profile', 'items')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">49,80 €</p>
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-[10px] uppercase font-bold rounded-md">
                        {t('profile', 'completed')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Addresses */}
          {activeTab === 'addresses' && (
            <div className="animate-in fade-in">
              <h3 style={fontSerif} className="text-2xl italic mb-8">
                {t('profile', 'addressBook')}
              </h3>
              <div
                className={`p-6 border rounded-2xl relative group ${
                  darkMode
                    ? 'border-purple-800 bg-purple-900/20'
                    : 'border-purple-200 bg-purple-50/30'
                }`}
              >
                <span className="absolute top-4 right-4 bg-purple-100 text-purple-700 text-[9px] font-bold uppercase px-2 py-1 rounded">
                  {t('profile', 'default')}
                </span>
                <p className="font-bold mb-2">{userData.name}</p>
                <p className="text-sm opacity-70">{userData.address}</p>
                <p className="text-sm opacity-70">{t('profile', 'country')}</p>
                <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs font-bold text-purple-500 hover:underline">
                    {t('profile', 'edit')}
                  </button>
                  <button className="text-xs font-bold text-red-400 hover:underline">
                    {t('profile', 'delete')}
                  </button>
                </div>
              </div>
              <button className="mt-6 border border-dashed rounded-2xl w-full py-4 text-sm font-bold uppercase tracking-widest hover:border-purple-300 hover:text-purple-500 transition-all opacity-60 hover:opacity-100">
                {t('profile', 'newAddress')}
              </button>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="animate-in fade-in max-w-md">
              <h3 style={fontSerif} className="text-2xl italic mb-8">
                {t('profile', 'accountSettings')}
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold opacity-40 mb-2 block">
                    {t('profile', 'changeName')}
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.name}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none ${
                      darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold opacity-40 mb-2 block">
                    {t('profile', 'emailAddress')}
                  </label>
                  <input
                    type="email"
                    defaultValue={userData.email}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none ${
                      darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                </div>
                <div className={`pt-6 border-t ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
                  <h4 className="font-bold text-sm mb-4">{t('profile', 'passwordSecurity')}</h4>
                  <button className="text-purple-500 text-xs font-bold uppercase tracking-widest border border-purple-500/30 px-4 py-2 rounded-lg hover:bg-purple-500/10 transition-colors">
                    {t('profile', 'changePassword')}
                  </button>
                </div>
                <div
                  className={`pt-6 border-t flex items-center justify-between ${
                    darkMode ? 'border-white/10' : 'border-gray-100'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm">{t('profile', 'newsletter')}</h4>
                    <p className="text-xs opacity-60">
                      {t('profile', 'newsletterDesc')}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                      userData.newsletter ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                    onClick={() =>
                      setUserData({ ...userData, newsletter: !userData.newsletter })
                    }
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                        userData.newsletter ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
