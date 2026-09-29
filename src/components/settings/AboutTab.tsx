import React, { useEffect, useState } from 'react';
import { Code2, Heart, Scale, Info } from 'lucide-react';
import { getTranslations } from '../../utils/i18n';
import { BRAND } from '../../brand';
import { TabHeader } from '../common/ui';
import type { AppSettings } from '../../types';

interface AboutTabProps {
  settings: AppSettings;
}

export const AboutTab: React.FC<AboutTabProps> = ({ settings }) => {
  const t = getTranslations(settings.uiLanguage);
  const [version, setVersion] = useState('');

  useEffect(() => {
    window.speakyAPI?.getAppVersion?.().then((v) => setVersion(v || '')).catch(() => {});
  }, []);

  const openLicenses = async () => {
    await window.speakyAPI?.openLicensesFolder?.();
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <TabHeader title={t.aboutTitle} subtitle={t.aboutSubtitle} />

      {/* Version */}
      <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/70 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 shrink-0">
          <Info className="w-4.5 h-4.5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-zinc-100">{BRAND.name}</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">
            {t.aboutVersionLabel}: <span className="font-mono text-zinc-300">{version || '…'}</span>
          </div>
        </div>
      </div>

      {/* Repository */}
      <a
        href={BRAND.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="block p-5 rounded-xl border border-zinc-800 bg-zinc-900/70 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 shrink-0 group-hover:text-white transition-colors">
            <Code2 className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-zinc-100">{t.aboutRepoTitle}</div>
            <div className="text-[11px] text-zinc-500 mt-0.5 truncate">{t.aboutRepoDesc}</div>
            <div className="text-[11px] font-mono text-indigo-300 mt-1 truncate">{BRAND.repoUrl}</div>
          </div>
        </div>
      </a>

      {/* Credits */}
      <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/70 space-y-4">
        <div className="text-xs font-semibold text-zinc-100">{t.aboutCreditsTitle}</div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/15 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
            <Heart className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-zinc-100">Handy</span>
              <a
                href="https://huggingface.co/handy-computer"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                huggingface.co/handy-computer
              </a>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{t.aboutHandyDesc}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-500/40 flex items-center justify-center text-violet-300 shrink-0">
            <Heart className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-zinc-100">Freebuff</span>
            <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{t.aboutFreebuffDesc}</p>
          </div>
        </div>
      </div>

      {/* Licenses */}
      <button
        onClick={openLicenses}
        className="w-full text-left p-5 rounded-xl border border-zinc-800 bg-zinc-900/70 hover:border-zinc-700 hover:bg-zinc-900 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 shrink-0">
            <Scale className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-zinc-100">{t.aboutLicensesTitle}</div>
            <div className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{t.aboutLicensesDesc}</div>
          </div>
        </div>
      </button>
    </div>
  );
};
