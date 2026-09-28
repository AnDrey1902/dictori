import { ModelCatalogEntry } from './types';

/**
 * Shared catalog of local speech models (renderer + main process).
 * Single engine, bundled with the app, no Python:
 *  - transcribe.cpp → gguf/ggml models via bundled transcribe.dll
 *    (worker thread, model stays in RAM). Whisper-family models are
 *    pinned to CPU — the Vulkan backend mis-decodes that model family.
 * All models are single files downloaded straight from HuggingFace.
 */
export const MODEL_CATALOG: ModelCatalogEntry[] = [
  {
    id: 'gigaam-v3-q5',
    name: 'GigaAM v3 RNNT (Q5_K_M)',
    engine: 'transcribe.cpp',
    huggingfaceId: 'handy-computer/gigaam-v3-e2e-rnnt-gguf',
    hfFile: 'gigaam-v3-e2e-rnnt-Q5_K_M.gguf',
    languages: ['ru'],
    sizeMB: 207,
    description: 'Только русский: топ-точность с пунктуацией, очень быстрая (Vulkan). Украинский не поддерживается — для него выберите Parakeet. Отдельные английские слова распознаёт, но полный английский — нет.',
    requires: 'transcribe.cpp'
  },
  {
    id: 'parakeet-v3-q4',
    name: 'Parakeet TDT v3 (Q4_K_M)',
    engine: 'transcribe.cpp',
    huggingfaceId: 'handy-computer/parakeet-tdt-0.6b-v3-gguf',
    hfFile: 'parakeet-tdt-0.6b-v3-Q4_K_M.gguf',
    languages: ['ru', 'uk', 'multi'],
    sizeMB: 463,
    description: 'Мультиязычная (25 европейских языков, вкл. русский и украинский), с пунктуацией. Выбор для украинского.',
    requires: 'transcribe.cpp'
  },
  {
    id: 'whisper-large-v3-turbo-q4',
    name: 'Whisper Large v3 Turbo (Q4_K_M)',
    engine: 'transcribe.cpp',
    huggingfaceId: 'handy-computer/whisper-large-v3-turbo-gguf',
    hfFile: 'whisper-large-v3-turbo-Q4_K_M.gguf',
    languages: ['multi'],
    sizeMB: 511,
    description: 'Классика Whisper в компактном GGUF: ~100 языков и режим перевода, максимум точности.',
    requires: 'transcribe.cpp'
  },
  {
    id: 'whisper-small-q5',
    name: 'Whisper Small (q5_1)',
    engine: 'transcribe.cpp',
    huggingfaceId: 'ggerganov/whisper.cpp',
    hfFile: 'ggml-small-q5_1.bin',
    languages: ['multi'],
    sizeMB: 181,
    description: 'Мультиязычная (~99 языков) на едином движке transcribe.cpp. CPU-only: Vulkan-бэкенд искажает whisper-модели. Модель постоянно в RAM — без чтения с диска при каждой диктовке.',
    requires: 'transcribe.cpp'
  }
];

export function getCatalogEntry(modelId: string): ModelCatalogEntry | undefined {
  return MODEL_CATALOG.find((m) => m.id === modelId);
}
