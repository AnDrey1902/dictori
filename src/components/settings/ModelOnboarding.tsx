import React, { useState, useEffect, useRef } from 'react';
import {
  HardDrive,
  Download,
  Check,
  Loader2,
  Sparkles,
  Cloud,
  AlertCircle
} from 'lucide-react';
import { AppSettings, ModelProgressEvent, InstalledModelInfo } from '../../types';
import { getTranslations } from '../../utils/i18n';
import { MODEL_CATALOG } from '../../modelCatalog';
import { Button, ProgressBar, Badge } from '../common/ui';

interface ModelOnboardingProps {
  settings: AppSettings;
  onChange: (updates: Partial<AppSettings>) => void;
  onDone: () => void;
}

type ProgressMap = Record<string, { state: string; percent?: number }>;

/**
 * First-run wizard: shown once when the settings window opens for the first
 * time. Lets the user tick which local models to download right away instead
 * of hunting through the Models tab. Downloads run sequentially via the
 * existing models:download IPC (progress events are broadcast to all windows).
 */
export const ModelOnboarding: React.FC<ModelOnboardingProps> = ({ settings, onChange, onDone }) => {
  const t = getTranslations(settings.uiLanguage);

  const [catalog, setCatalog] = useState<InstalledModelInfo[]>(
    MODEL_CATALOG.map((m) => ({ ...m, installed: false }))
  );
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState<ProgressMap>({});
  const [queue, setQueue] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let alive = true;
    window.speakyAPI?.getModelCatalog?.().then((list) => {
      if (!alive || !list) return;
      setCatalog(list);
      // Preselect recommended set: fast multilingual, skip already-installed
      const fresh = new Set<string>();
      for (const m of list) {
        if (m.installed) continue;
        if (m.id === 'parakeet-v3-q5' || m.id === 'whisper-small-q6') fresh.add(m.id);
      }
      setSelected(fresh);
    });
    return () => { alive = false; };
  }, []);

  // Subscribe once: progress events broadcast from main to every window
  useEffect(() => {
    const unsub = window.speakyAPI?.onModelProgress?.((ev: ModelProgressEvent) => {
      setProgress((prev) => ({ ...prev, [ev.modelId]: { state: ev.state, percent: ev.percent } }));
      if (ev.state === 'error' && ev.error) setError(ev.error);
    });
    return () => unsub?.();
  }, []);

  const startDownloads = async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    const ids = catalog.filter((m) => selected.has(m.id) && !m.installed).map((m) => m.id);
    if (ids.length > 0) {
      setQueue(ids);
      for (const id of ids) {
        setProgress((prev) => ({ ...prev, [id]: { state: 'downloading', percent: 0 } }));
        try {
          await window.speakyAPI?.downloadModel?.(id);
        } catch {}
        setProgress((prev) => ({ ...prev, [id]: { state: 'done' } }));
      }
      const list = await window.speakyAPI?.getModelCatalog?.();
      if (list) setCatalog(list);
      setQueue([]);
    }
    // Activate the first downloaded/selected local model, if any
    const firstInstalled = ids[0];
    if (firstInstalled) {
      onChange({ provider: 'local', localModelId: firstInstalled });
    }
  };

  const busy = queue.length > 0;
  const anySelected = selected.size > 0;
  const allDone = !busy && queue.length === 0 && startedRef.current;

  const toggle = (id: string) => {
    if (busy) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const finish = () => {
    onChange({ onboardingDone: true });
    onDone();
  };

  const modelDesc = (id: string): string => {
    if (id === 'gigaam-v3-q5') return t.descGigaamQ5;
    if (id === 'parakeet-v3-q5') return t.descParakeetQ5;
    if (id === 'whisper-large-v3-turbo-q4') return t.descWhisperTurbo;
    if (id === 'whisper-small-q6' || id === 'whisper-small-q5') return t.descWhisperSmall;
    return '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full max-w-2xl max-h-full overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/60 p-7 space-y-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-zinc-100">{t.onboardingTitle}</h1>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{t.onboardingSubtitle}</p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-[11px] text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="flex-1 break-words">{error}</span>
          </div>
        )}

        {/* Cloud hint */}
        <button
          onClick={() => onChange({ provider: 'groq' })}
          className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            settings.provider === 'groq'
              ? 'border-indigo-500/70 bg-indigo-500/5 ring-1 ring-indigo-500/30'
              : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-300 shrink-0">
            <Cloud className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-zinc-100">{t.onboardingCloudTitle}</div>
            <div className="text-[11px] text-zinc-500">{t.onboardingCloudDesc}</div>
          </div>
          {settings.provider === 'groq' && <Badge tone="success"><Check className="w-3 h-3" /></Badge>}
        </button>

        {/* Local models */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            <HardDrive className="w-3.5 h-3.5" /> {t.onboardingLocalSection}
          </div>

          {catalog.map((m) => {
            const isQueueing = queue.includes(m.id);
            const prog = progress[m.id];
            const isDownloading = isQueueing && prog?.state === 'downloading';
            const isDone = m.installed || (isQueueing && prog?.state === 'done');
            const desc = modelDesc(m.id) || m.description;
            return (
              <label
                key={m.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                  isDone
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : isDownloading
                    ? 'border-indigo-500/60 bg-indigo-500/5'
                    : selected.has(m.id)
                    ? 'border-indigo-500/60 bg-zinc-800/60 cursor-pointer'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 cursor-pointer'
                } ${busy && !isQueueing ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div
                  className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : selected.has(m.id)
                      ? 'bg-indigo-500 border-indigo-500 text-white'
                      : 'border-zinc-600 bg-zinc-900'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : selected.has(m.id) ? <Check className="w-3 h-3 stroke-[3]" /> : null}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selected.has(m.id)}
                  onChange={() => toggle(m.id)}
                  disabled={busy || m.installed}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-zinc-100">{m.name}</span>
                    <Badge tone={m.languages.includes('ru') ? 'accent' : 'neutral'}>{m.languages.join(', ')}</Badge>
                    {m.installed && <Badge tone="success">{t.installedModel}</Badge>}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed line-clamp-2">{desc}</p>
                  {isDownloading && (
                    <div className="mt-2">
                      <ProgressBar value={prog?.percent || 0} />
                      <div className="text-[10px] text-indigo-300 mt-1 font-semibold flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        {t.downloadingModel} {Math.round(prog?.percent || 0)}%
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono text-zinc-600 shrink-0">{m.sizeMB} {t.mbSize}</span>
              </label>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-zinc-600">{t.onboardingHint}</span>
          <div className="flex items-center gap-2 shrink-0">
            {!busy && (
              <Button variant="ghost" onClick={finish}>
                {allDone || !anySelected ? t.onboardingFinish : t.onboardingSkip}
              </Button>
            )}
            {!busy && anySelected && !allDone && (
              <Button variant="primary" onClick={startDownloads}>
                <Download className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                {t.onboardingDownload}
              </Button>
            )}
            {busy && (
              <Button variant="primary" disabled>
                <Loader2 className="w-3.5 h-3.5 animate-spin inline mr-1 -mt-0.5" />
                {t.downloadingModel}…
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
