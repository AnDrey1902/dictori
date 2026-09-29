import React from 'react';
import { AppSettings, TranslateLanguage } from '../../types';
import { Keyboard, Languages, Wand2, Info } from 'lucide-react';
import { getTranslations } from '../../utils/i18n';
import { Badge, Select, Switch, SettingRow, TabHeader, Textarea } from '../common/ui';
import { HotkeyInput } from '../common/HotkeyInput';

interface TranslateTabProps {
  settings: AppSettings;
  onChange: (updates: Partial<AppSettings>) => void;
}

const TARGET_LANGUAGES: { id: TranslateLanguage; labelKey: 'targetLangEn' | 'targetLangRu' | 'targetLangUk' | 'targetLangEs' | 'targetLangDe' | 'targetLangFr' | 'targetLangIt' | 'targetLangZh' }[] = [
  { id: 'en', labelKey: 'targetLangEn' },
  { id: 'ru', labelKey: 'targetLangRu' },
  { id: 'uk', labelKey: 'targetLangUk' },
  { id: 'es', labelKey: 'targetLangEs' },
  { id: 'de', labelKey: 'targetLangDe' },
  { id: 'fr', labelKey: 'targetLangFr' },
  { id: 'it', labelKey: 'targetLangIt' },
  { id: 'zh', labelKey: 'targetLangZh' }
];

export const TranslateTab: React.FC<TranslateTabProps> = ({ settings, onChange }) => {
  const t = getTranslations(settings.uiLanguage);
  const enabled = settings.translateEnabled !== false;
  const hasLlmKey = Boolean(settings.groqApiKey || settings.openaiApiKey);

  return (
    <div className="space-y-6 max-w-2xl">
      <TabHeader
        title={t.translateTitle}
        subtitle={t.translateSubtitle}
        right={
          <Badge tone={enabled ? 'accent' : 'neutral'}>
            <Languages className="w-3 h-3" />
            {enabled ? t.langOn : t.langOff}
          </Badge>
        }
      />

      <SettingRow
        icon={Languages}
        title={t.translateEnabledLabel}
        desc={t.translateHint}
      >
        <Switch checked={enabled} onChange={(v) => onChange({ translateEnabled: v })} />
      </SettingRow>

      <div className="grid grid-cols-2 gap-3">
        <SettingRow icon={Keyboard} title={t.translateHotkeyLabel} desc={t.translateHotkeyDesc}>
          <HotkeyInput
            value={settings.translateHotkey || ''}
            onChange={(accel) => onChange({ translateHotkey: accel })}
            avoid={[settings.hotkey]}
            placeholder="Ctrl+Shift+`"
            uiLanguage={settings.uiLanguage}
          />
        </SettingRow>

        <SettingRow icon={Languages} title={t.translateTargetLabel}>
          <Select
            value={settings.translateTargetLang || 'en'}
            onChange={(e) => onChange({ translateTargetLang: e.target.value as TranslateLanguage })}
          >
            {TARGET_LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {t[l.labelKey]}
              </option>
            ))}
          </Select>
        </SettingRow>
      </div>

      {!hasLlmKey && (
        <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-[11px] text-amber-300 flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            {t.translateNeedsKey}
          </span>
        </div>
      )}

      <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/70 space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          <Wand2 className="w-3.5 h-3.5" /> {t.translatePromptLabel}
        </div>
        <Textarea
          value={
            settings.translatePrompt ||
            t.translatePromptDefault
          }
          onChange={(e) => onChange({ translatePrompt: e.target.value })}
          rows={5}
          className="font-mono text-[11px] leading-relaxed"
        />
        <p className="text-[10px] text-zinc-600">
          {t.translatePromptNote}
        </p>
      </div>
    </div>
  );
};
