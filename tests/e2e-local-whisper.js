"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/modelCatalog.ts
function getCatalogEntry(modelId) {
  return MODEL_CATALOG.find((m) => m.id === modelId);
}
var MODEL_CATALOG;
var init_modelCatalog = __esm({
  "src/modelCatalog.ts"() {
    "use strict";
    MODEL_CATALOG = [
      {
        id: "whisper-small-q5",
        name: "Whisper Small (q5_1)",
        engine: "whisper.cpp",
        huggingfaceId: "ggerganov/whisper.cpp",
        hfFile: "ggml-small-q5_1.bin",
        languages: ["multi"],
        sizeMB: 181,
        description: "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C\u0430\u044F \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C: \u0445\u043E\u0440\u043E\u0448\u0430\u044F \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u044F\u0437\u044B\u043A\u0430\u0445, \u0431\u044B\u0441\u0442\u0440\u0430\u044F \u043D\u0430 CPU.",
        requires: "whisper.cpp"
      },
      {
        id: "whisper-base-q5",
        name: "Whisper Base (q5_1)",
        engine: "whisper.cpp",
        huggingfaceId: "ggerganov/whisper.cpp",
        hfFile: "ggml-base-q5_1.bin",
        languages: ["multi"],
        sizeMB: 57,
        description: "\u041B\u0451\u0433\u043A\u0430\u044F \u0438 \u043E\u0447\u0435\u043D\u044C \u0431\u044B\u0441\u0442\u0440\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C \u0434\u043B\u044F \u0441\u043B\u0430\u0431\u044B\u0445 \u043C\u0430\u0448\u0438\u043D; \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u043D\u0438\u0436\u0435 Small.",
        requires: "whisper.cpp"
      },
      {
        id: "whisper-tiny-q5",
        name: "Whisper Tiny (q5_1)",
        engine: "whisper.cpp",
        huggingfaceId: "ggerganov/whisper.cpp",
        hfFile: "ggml-tiny-q5_1.bin",
        languages: ["multi"],
        sizeMB: 31,
        description: "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0430\u0440\u044B\u0445 \u041F\u041A \u0438 \u0431\u044B\u0441\u0442\u0440\u043E\u0439 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0430.",
        requires: "whisper.cpp"
      },
      {
        id: "whisper-large-v3-turbo-q5",
        name: "Whisper Large v3 Turbo (q5_0)",
        engine: "whisper.cpp",
        huggingfaceId: "ggerganov/whisper.cpp",
        hfFile: "ggml-large-v3-turbo-q5_0.bin",
        languages: ["multi"],
        sizeMB: 547,
        description: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E; \u043E\u0449\u0443\u0442\u0438\u043C\u043E \u043C\u0435\u0434\u043B\u0435\u043D\u043D\u0435\u0435 \u043D\u0430 CPU \u2014 \u0434\u043B\u044F \u043C\u043E\u0449\u043D\u044B\u0445 \u041F\u041A.",
        requires: "whisper.cpp"
      },
      {
        id: "whisper-large-v3-turbo-q8",
        name: "Whisper Large v3 Turbo (q8_0)",
        engine: "whisper.cpp",
        huggingfaceId: "ggerganov/whisper.cpp",
        hfFile: "ggml-large-v3-turbo-q8_0.bin",
        languages: ["multi"],
        sizeMB: 834,
        description: "\u0422\u043E \u0436\u0435, \u0447\u0442\u043E q5_0, \u043D\u043E \u0441 \u043C\u0435\u043D\u044C\u0448\u0435\u0439 \u043F\u043E\u0442\u0435\u0440\u0435\u0439 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430 \u0437\u0430 \u0441\u0447\u0451\u0442 \u0431\u043E\u043B\u044C\u0448\u0435\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430.",
        requires: "whisper.cpp"
      }
    ];
  }
});

// src/defaultPrompts.ts
var DEFAULT_PROMPTS;
var init_defaultPrompts = __esm({
  "src/defaultPrompts.ts"() {
    "use strict";
    DEFAULT_PROMPTS = [
      {
        id: "base-default",
        name: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439",
        isDefault: true,
        body: "\u0422\u044B \u2014 \u0441\u0432\u0435\u0440\u0445\u0431\u044B\u0441\u0442\u0440\u044B\u0439 AI-\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043E\u0440 \u043D\u0430\u0434\u0438\u043A\u0442\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0440\u0435\u0447\u0438.\n\n\u041E\u0447\u0438\u0441\u0442\u0438 \u0442\u0440\u0430\u043D\u0441\u043A\u0440\u0438\u043F\u0442 \u043F\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C:\n\n1. \u0418\u0441\u043F\u0440\u0430\u0432\u044C \u043E\u0440\u0444\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0435, \u043F\u0443\u043D\u043A\u0442\u0443\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u043E\u0448\u0438\u0431\u043A\u0438 \u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440 \u0431\u0443\u043A\u0432 (\u0437\u0430\u0433\u043B\u0430\u0432\u043D\u044B\u0435/\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0435) \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C \u044F\u0437\u044B\u043A\u0430.\n\n2. \u041F\u0440\u0435\u043E\u0431\u0440\u0430\u0437\u0443\u0439 \u0447\u0438\u0441\u043B\u0430, \u043F\u0440\u043E\u0438\u0437\u043D\u0435\u0441\u0451\u043D\u043D\u044B\u0435 \u0441\u043B\u043E\u0432\u0430\u043C\u0438, \u0432 \u0446\u0438\u0444\u0440\u044B:\n   - \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435: \u0434\u0432\u0430\u0434\u0446\u0430\u0442\u044C \u043F\u044F\u0442\u044C \u2192 25\n   - \u041F\u0440\u043E\u0446\u0435\u043D\u0442\u044B: \u0434\u0435\u0441\u044F\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u043E\u0432 \u2192 10%\n   - \u0412\u0430\u043B\u044E\u0442\u0430: \u043F\u044F\u0442\u044C \u0434\u043E\u043B\u043B\u0430\u0440\u043E\u0432 \u2192 $5, \u0441\u0442\u043E \u0440\u0443\u0431\u043B\u0435\u0439 \u2192 100 \u0440\u0443\u0431.\n   - \u041F\u043E\u0440\u044F\u0434\u043A\u043E\u0432\u044B\u0435: \u0442\u0440\u0435\u0442\u0438\u0439 \u2192 3-\u0439, \u0432\u043E-\u043F\u0435\u0440\u0432\u044B\u0445 \u2014 \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u043A \u0435\u0441\u0442\u044C (\u043D\u0435 \u0447\u0438\u0441\u043B\u043E)\n   - \u0414\u0430\u0442\u044B: \u043F\u0435\u0440\u0432\u043E\u0435 \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F \u2192 1 \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F\n\n3. \u0417\u0430\u043C\u0435\u043D\u0438 \u043F\u0440\u043E\u0433\u043E\u0432\u043E\u0440\u0451\u043D\u043D\u044B\u0435 \u0437\u043D\u0430\u043A\u0438 \u043F\u0440\u0435\u043F\u0438\u043D\u0430\u043D\u0438\u044F \u043D\u0430 \u0441\u0438\u043C\u0432\u043E\u043B\u044B: \u0442\u043E\u0447\u043A\u0430 \u2192 ., \u0437\u0430\u043F\u044F\u0442\u0430\u044F \u2192 ,, \u0432\u043E\u043F\u0440\u043E\u0441\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0437\u043D\u0430\u043A \u2192 ?, \u0432\u043E\u0441\u043A\u043B\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0437\u043D\u0430\u043A \u2192 !.\n\n4. \u0423\u0431\u0435\u0440\u0438 \u0441\u043B\u043E\u0432\u0430-\u043F\u0430\u0440\u0430\u0437\u0438\u0442\u044B \u0438 \u0437\u0432\u0443\u043A\u0438-\u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u0438: \u044D-\u044D, \u043C-\u043C, \u043D\u0443\u0443 (\u0432 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u043F\u0430\u0443\u0437\u044B), \u043A\u043E\u0440\u043E\u0447\u0435 (\u0432 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u043F\u0430\u0440\u0430\u0437\u0438\u0442\u0430), \u0442\u0438\u043F\u0430/\u043A\u0430\u043A \u0431\u044B (\u0442\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u043A\u0430\u043A \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C, \u0430 \u043D\u0435 \u043A\u0430\u043A \u0441\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u0437\u043D\u0430\u0447\u0438\u043C\u0430\u044F \u0447\u0430\u0441\u0442\u044C \u0441\u043C\u044B\u0441\u043B\u0430), \u0437\u043D\u0430\u0447\u0438\u0442 (\u0432 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u043F\u0430\u0440\u0430\u0437\u0438\u0442\u0430), \u044D\u0442\u043E \u0441\u0430\u043C\u043E\u0435, \u0432\u043E\u0442 (\u0432 \u043A\u043E\u043D\u0446\u0435 \u0444\u0440\u0430\u0437\u044B \u0431\u0435\u0437 \u0441\u043C\u044B\u0441\u043B\u043E\u0432\u043E\u0439 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0438). \u0423\u0431\u0435\u0440\u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u044B \u0438 \u0437\u0430\u043F\u0438\u043D\u043A\u0438 (\xAB\u044F \u044F \u0434\u0443\u043C\u0430\u044E\xBB \u2192 \xAB\u044F \u0434\u0443\u043C\u0430\u044E\xBB, \u043D\u0435\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u044B\u0435 \u043E\u0431\u043E\u0440\u0432\u0430\u043D\u043D\u044B\u0435 \u043D\u0430\u0447\u0430\u043B\u0430 \u0444\u0440\u0430\u0437 \u2014 \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u043A\u043E\u043D\u0447\u0435\u043D\u043D\u0443\u044E \u043C\u044B\u0441\u043B\u044C).\n\n5. \u041D\u0415 \u0443\u0434\u0430\u043B\u044F\u0439 \u0441\u043B\u043E\u0432\u0430, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435\u0441\u0443\u0442 \u0441\u043C\u044B\u0441\u043B, \u0434\u0430\u0436\u0435 \u0435\u0441\u043B\u0438 \u043E\u043D\u0438 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u043D\u044B\u0435 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \xAB\u0442\u0438\u043F\u0430\xBB \u0432 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0438 \u0441\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044F \xAB\u0442\u0438\u043F\u0430 \u0442\u0430\u043A\u043E\u0433\u043E\xBB \u2014 \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C; \xAB\u043A\u043E\u0440\u043E\u0447\u0435 \u0433\u043E\u0432\u043E\u0440\u044F\xBB \u043A\u0430\u043A \u0432\u0432\u043E\u0434\u043D\u0430\u044F \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F \u0441 \u0441\u043C\u044B\u0441\u043B\u043E\u043C \u2014 \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C).\n\n6. \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0439 \u044F\u0437\u044B\u043A \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u0430 (\u0435\u0441\u043B\u0438 \u0432\u0441\u0442\u0440\u0435\u0447\u0430\u044E\u0442\u0441\u044F \u0432\u0441\u0442\u0430\u0432\u043A\u0438 \u043D\u0430 \u0434\u0440\u0443\u0433\u043E\u043C \u044F\u0437\u044B\u043A\u0435 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C \u0438\u0445 \u043A\u0430\u043A \u0435\u0441\u0442\u044C, \u043D\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438).\n\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u044F \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u0432, \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439, \u0431\u0440\u0435\u043D\u0434\u043E\u0432 \u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u043F\u0438\u0448\u0438 \u0432 \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u044C\u043D\u043E\u043C\n\u043B\u0430\u0442\u0438\u043D\u0441\u043A\u043E\u043C/\u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u043C \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u0438\u0438, \u0434\u0430\u0436\u0435 \u0435\u0441\u043B\u0438 \u043E\u043D\u0438 \u043F\u0440\u043E\u0434\u0438\u043A\u0442\u043E\u0432\u0430\u043D\u044B \u043F\u043E-\u0440\u0443\u0441\u0441\u043A\u0438: Chrome\n(\u043D\u0435 \xAB\u0445\u0440\u043E\u043C\xBB), Tilda (\u043D\u0435 \xAB\u0442\u0438\u043B\u044C\u0434\u0430\xBB), Slack, Signal, iMessage, Telegram, YouTube,\nClaude, Next.js \u0438 \u0442. \u0434.\n\u041F\u0440\u043E\u0434\u0438\u043A\u0442\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u043E-\u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438 \u0441\u043B\u043E\u0432\u0430 \u0438 \u0438\u043C\u0435\u043D\u0430 \u0442\u043E\u0436\u0435 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0439 \u043A \u043B\u0430\u0442\u0438\u043D\u0438\u0446\u0435\n(\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: one, two \u2014 \u043D\u0435 \xAB\u0432\u0430\u043D, \u0442\u0443\xBB, Andy \u2014 \u043D\u0435 \xAB\u042D\u043D\u0434\u0438\xBB).\n\n7. \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0439 \u0442\u043E\u0447\u043D\u044B\u0439 \u0441\u043C\u044B\u0441\u043B,  \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0432\u044B\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u043D\u0438\u044F. \u041F\u0435\u0440\u0435\u0444\u0440\u0430\u0437\u0438\u0440\u0443\u0439 \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438 \u043B\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u043D\u043E\u0433\u043E \u0440\u0443\u0441\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430,  \u043D\u043E \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0438 \u0442\u043E\u0447\u043D\u044B\u0439 \u0441\u043C\u044B\u0441\u043B.\n\n8. \u0415\u0441\u043B\u0438 \u0441\u043B\u043E\u0432\u043E \u0438\u043B\u0438 \u0444\u0440\u0430\u0437\u0430 \u043D\u0435\u0440\u0430\u0437\u0431\u043E\u0440\u0447\u0438\u0432\u044B, \u043E\u0441\u0442\u0430\u0432\u044C \u043F\u043E\u043C\u0435\u0442\u043A\u0443 [\u043D\u0435\u0440\u0430\u0437\u0431\u043E\u0440\u0447\u0438\u0432\u043E] \u0432\u043C\u0435\u0441\u0442\u043E \u0443\u0433\u0430\u0434\u044B\u0432\u0430\u043D\u0438\u044F.\n\n\u0421\u0422\u0420\u041E\u0413\u041E: \u0412\u0435\u0440\u043D\u0438 \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0447\u0438\u0449\u0435\u043D\u043D\u044B\u0439 \u0442\u0440\u0430\u043D\u0441\u043A\u0440\u0438\u043F\u0442, \u0431\u0435\u0437 \u043F\u043E\u044F\u0441\u043D\u0435\u043D\u0438\u0439, \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432 \u0438 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432."
      },
      {
        id: "clean",
        name: "\u0427\u0438\u0441\u0442\u043A\u0430 \u0440\u0435\u0447\u0438",
        body: "\u0422\u044B \u2014 \u0441\u0432\u0435\u0440\u0445\u0431\u044B\u0441\u0442\u0440\u044B\u0439 AI-\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043E\u0440 \u043D\u0430\u0434\u0438\u043A\u0442\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0440\u0435\u0447\u0438.\n1. \u0418\u0441\u043F\u0440\u0430\u0432\u044C \u043E\u0440\u0444\u043E\u0433\u0440\u0430\u0444\u0438\u044E, \u0433\u0440\u0430\u043C\u043C\u0430\u0442\u0438\u043A\u0443 \u0438 \u0440\u0430\u0441\u0441\u0442\u0430\u0432\u044C \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0443\u044E \u043F\u0443\u043D\u043A\u0442\u0443\u0430\u0446\u0438\u044E.\n2. \u0423\u0434\u0430\u043B\u0438 \u0441\u043B\u043E\u0432\u0430-\u043F\u0430\u0440\u0430\u0437\u0438\u0442\u044B, \u0437\u0430\u043F\u0438\u043D\u043A\u0438 \u0438 \u043E\u0433\u043E\u0432\u043E\u0440\u043A\u0438 (\xAB\u044D\u044D\u044D\xBB, \xAB\u043D\u0443\u0443\xBB, \xAB\u0442\u0438\u043F\u0430\xBB, \xAB\u043A\u0430\u043A \u0431\u044B\xBB).\n3. \u0421\u0422\u0420\u041E\u0413\u041E: \u0432\u0435\u0440\u043D\u0438 \u0422\u041E\u041B\u042C\u041A\u041E \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u043E\u0447\u0438\u0449\u0435\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0431\u0435\u0437 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432, \u043F\u043E\u044F\u0441\u043D\u0435\u043D\u0438\u0439 \u0438 \u043A\u0430\u0432\u044B\u0447\u0435\u043A."
      },
      {
        id: "code-style",
        name: "\u0421\u0442\u0438\u043B\u044C \u043A\u043E\u0434\u0430",
        body: "\u0422\u044B \u2014 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0442\u0435\u043A\u0441\u0442\u043E\u0432. \u0422\u0435\u0440\u043C\u0438\u043D\u044B, \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u043F\u0438\u0448\u0438 \u043D\u0430 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u043C \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u043C (camelCase, snake_case, git-\u043A\u043E\u043C\u0430\u043D\u0434\u044B).\n\u0423\u0434\u0430\u043B\u0438 \u0441\u043B\u043E\u0432\u0430-\u043F\u0430\u0440\u0430\u0437\u0438\u0442\u044B. \u0412 \u043A\u043E\u043D\u0446\u0435 \u0441\u0442\u0440\u043E\u043A\u0438 \u043D\u0435 \u0441\u0442\u0430\u0432\u044C \u0442\u043E\u0447\u043A\u0443.\n\u0421\u0422\u0420\u041E\u0413\u041E: \u0432\u0435\u0440\u043D\u0438 \u0422\u041E\u041B\u042C\u041A\u041E \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0442\u0435\u043A\u0441\u0442."
      },
      {
        id: "business-style",
        name: "\u0414\u0435\u043B\u043E\u0432\u043E\u0439 \u0441\u0442\u0438\u043B\u044C",
        body: "\u0422\u044B \u2014 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0434\u0435\u043B\u043E\u0432\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432. \u0421\u0442\u0440\u043E\u0433\u0438\u0439 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C, \u043A\u0430\u0432\u044B\u0447\u043A\u0438-\u0451\u043B\u043E\u0447\u043A\u0438 (\xAB\xBB), \u0434\u043B\u0438\u043D\u043D\u044B\u0435 \u0442\u0438\u0440\u0435 (\u2014), \u0441\u0443\u043C\u043C\u044B \u0438 \u0447\u0438\u0441\u043B\u0430 \u0446\u0438\u0444\u0440\u0430\u043C\u0438.\n\u0423\u0434\u0430\u043B\u0438 \u0441\u043B\u043E\u0432\u0430-\u043F\u0430\u0440\u0430\u0437\u0438\u0442\u044B \u0438 \u043E\u0433\u043E\u0432\u043E\u0440\u043A\u0438.\n\u0421\u0422\u0420\u041E\u0413\u041E: \u0432\u0435\u0440\u043D\u0438 \u0422\u041E\u041B\u042C\u041A\u041E \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0442\u0435\u043A\u0441\u0442."
      },
      {
        id: "minimal-punct",
        name: "\u0422\u043E\u043B\u044C\u043A\u043E \u043F\u0443\u043D\u043A\u0442\u0443\u0430\u0446\u0438\u044F",
        body: "\u0420\u0430\u0441\u0441\u0442\u0430\u0432\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0443\u043D\u043A\u0442\u0443\u0430\u0446\u0438\u044E \u0438 \u0437\u0430\u0433\u043B\u0430\u0432\u043D\u044B\u0435 \u0431\u0443\u043A\u0432\u044B. \u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043F\u0435\u0440\u0435\u0444\u0440\u0430\u0437\u0438\u0440\u0443\u0439 \u0438 \u043D\u0435 \u0443\u0434\u0430\u043B\u044F\u0439 \u0441\u043B\u043E\u0432\u0430.\n\u0421\u0422\u0420\u041E\u0413\u041E: \u0432\u0435\u0440\u043D\u0438 \u0422\u041E\u041B\u042C\u041A\u041E \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0442\u0435\u043A\u0441\u0442."
      }
    ];
  }
});

// electron/services/storage.ts
function encryptSecret(secret) {
  if (!secret) return "";
  if (secret.startsWith("enc:") || secret.startsWith("b64:")) return secret;
  try {
    if (import_electron.safeStorage && import_electron.safeStorage.isEncryptionAvailable()) {
      const encryptedBuffer = import_electron.safeStorage.encryptString(secret);
      return "enc:" + encryptedBuffer.toString("base64");
    }
  } catch (err) {
    console.warn("[Storage] Encryption unavailable, fallback to base64 obfuscation:", err);
  }
  return "b64:" + Buffer.from(secret, "utf-8").toString("base64");
}
function decryptSecret(val) {
  if (!val) return "";
  if (val.startsWith("b64:")) {
    try {
      return Buffer.from(val.slice(4), "base64").toString("utf-8");
    } catch {
      return val.slice(4);
    }
  }
  if (!val.startsWith("enc:")) return val;
  try {
    if (import_electron.safeStorage && import_electron.safeStorage.isEncryptionAvailable()) {
      const buffer = Buffer.from(val.slice(4), "base64");
      return import_electron.safeStorage.decryptString(buffer);
    }
  } catch (err) {
    console.warn("[Storage] Decryption failed or not ready:", err);
  }
  return val;
}
var import_fs, import_path, import_electron, DEFAULT_SETTINGS, DEFAULT_DICTIONARY, DEFAULT_SNIPPETS, DEFAULT_PROMPTS2, StorageService, storage;
var init_storage = __esm({
  "electron/services/storage.ts"() {
    "use strict";
    import_fs = __toESM(require("fs"));
    import_path = __toESM(require("path"));
    import_electron = require("electron");
    init_defaultPrompts();
    DEFAULT_SETTINGS = {
      hotkey: "Ctrl+Space",
      mode: "toggle",
      provider: "groq",
      language: "ru",
      uiLanguage: "auto",
      groqApiKey: "",
      openaiApiKey: "",
      deepgramApiKey: "",
      selectedMicId: "default",
      autoPunctuation: true,
      removeFillerWords: true,
      contextAwareMode: true,
      soundFeedback: true,
      autoStart: false,
      handsFreeCommands: true,
      aiCorrection: true,
      /* Speaky additions */
      localModelId: "whisper-large-v3-turbo",
      llmProvider: "groq",
      llmModels: {},
      customLocalModels: [],
      activePromptId: "clean-default",
      translateHotkey: "Ctrl+Shift+`",
      translateTargetLang: "en",
      translateEnabled: true,
      translatePrompt: "\u041F\u0435\u0440\u0435\u0432\u0435\u0434\u0438 \u043D\u0430\u0434\u0438\u043A\u0442\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u043D\u0430 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u0446\u0435\u043B\u0435\u0432\u043E\u0439 \u044F\u0437\u044B\u043A. \u0412\u0435\u0440\u043D\u0438 \u0422\u041E\u041B\u042C\u041A\u041E \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u0431\u0435\u0437 \u043F\u043E\u044F\u0441\u043D\u0435\u043D\u0438\u0439 \u0438 \u043A\u0430\u0432\u044B\u0447\u0435\u043A. \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0439 \u0441\u043C\u044B\u0441\u043B, \u0438\u043C\u0435\u043D\u0430 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0438 \u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0443."
    };
    DEFAULT_DICTIONARY = [
      { id: "1", word: "PostgreSQL" },
      { id: "2", word: "TypeScript" },
      { id: "3", word: "Next.js" },
      { id: "4", word: "Tailwind CSS" },
      { id: "5", word: "Kubernetes" },
      { id: "6", word: "Docker" },
      { id: "7", word: "FastAPI" },
      { id: "8", word: "GraphQL" }
    ];
    DEFAULT_SNIPPETS = [
      { id: "1", trigger: "\u043C\u043E\u0439 \u0438\u043C\u0435\u0439\u043B", replacement: "my.email@example.com", description: "\u0412\u0441\u0442\u0430\u0432\u043A\u0430 \u043B\u0438\u0447\u043D\u043E\u0433\u043E email" },
      { id: "2", trigger: "\u043C\u043E\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D", replacement: "+7 (999) 000-00-00", description: "\u0412\u0441\u0442\u0430\u0432\u043A\u0430 \u043D\u043E\u043C\u0435\u0440\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430" },
      { id: "3", trigger: "\u0448\u0430\u043F\u043A\u0430 \u043F\u0438\u0441\u044C\u043C\u0430", replacement: "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435!\n\n\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435.", description: "\u0428\u0430\u0431\u043B\u043E\u043D \u043F\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F" },
      { id: "4", trigger: "\u0445\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0434\u043D\u044F", replacement: "\u0421 \u0443\u0432\u0430\u0436\u0435\u043D\u0438\u0435\u043C,\n\u0425\u043E\u0440\u043E\u0448\u0435\u0433\u043E \u0432\u0430\u043C \u0434\u043D\u044F!", description: "\u0412\u0435\u0436\u043B\u0438\u0432\u0430\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u044C" }
    ];
    DEFAULT_PROMPTS2 = DEFAULT_PROMPTS;
    StorageService = class {
      filePath;
      data;
      constructor() {
        this.filePath = this.resolveFilePath();
        this.data = this.loadData();
      }
      resolveFilePath() {
        let dir = "";
        try {
          if (import_electron.app && typeof import_electron.app.getPath === "function") {
            dir = import_electron.app.getPath("userData");
          }
        } catch {
        }
        if (!dir) {
          if (process.platform === "win32" && process.env.APPDATA) {
            dir = import_path.default.join(process.env.APPDATA, "speaky");
          } else if (process.platform === "darwin") {
            const home = process.env.HOME || "";
            dir = import_path.default.join(home, "Library", "Application Support", "speaky");
          } else {
            const home = process.env.HOME || "";
            dir = import_path.default.join(home, ".config", "speaky");
          }
        }
        try {
          if (!import_fs.default.existsSync(dir)) {
            import_fs.default.mkdirSync(dir, { recursive: true });
          }
        } catch {
        }
        return import_path.default.join(dir, "speaky-data.json");
      }
      loadData() {
        try {
          if (import_fs.default.existsSync(this.filePath)) {
            const raw = import_fs.default.readFileSync(this.filePath, "utf-8");
            const parsed = JSON.parse(raw);
            const settings = { ...DEFAULT_SETTINGS, ...parsed.settings };
            if (settings.groqApiKey) settings.groqApiKey = decryptSecret(settings.groqApiKey);
            if (settings.openaiApiKey) settings.openaiApiKey = decryptSecret(settings.openaiApiKey);
            if (settings.deepgramApiKey) settings.deepgramApiKey = decryptSecret(settings.deepgramApiKey);
            if (settings.geminiApiKey) settings.geminiApiKey = decryptSecret(settings.geminiApiKey);
            if (settings.customLlmApiKey) settings.customLlmApiKey = decryptSecret(settings.customLlmApiKey);
            return {
              settings,
              dictionary: parsed.dictionary || DEFAULT_DICTIONARY,
              snippets: parsed.snippets || DEFAULT_SNIPPETS,
              history: parsed.history || [],
              prompts: parsed.prompts || DEFAULT_PROMPTS2
            };
          }
        } catch (err) {
          console.error("[Storage] Error loading data, using defaults:", err);
        }
        return {
          settings: DEFAULT_SETTINGS,
          dictionary: DEFAULT_DICTIONARY,
          snippets: DEFAULT_SNIPPETS,
          history: [],
          prompts: DEFAULT_PROMPTS2
        };
      }
      save() {
        try {
          const clonedSettings = { ...this.data.settings };
          if (clonedSettings.groqApiKey) clonedSettings.groqApiKey = encryptSecret(clonedSettings.groqApiKey);
          if (clonedSettings.openaiApiKey) clonedSettings.openaiApiKey = encryptSecret(clonedSettings.openaiApiKey);
          if (clonedSettings.deepgramApiKey) clonedSettings.deepgramApiKey = encryptSecret(clonedSettings.deepgramApiKey);
          if (clonedSettings.geminiApiKey) clonedSettings.geminiApiKey = encryptSecret(clonedSettings.geminiApiKey);
          if (clonedSettings.customLlmApiKey) clonedSettings.customLlmApiKey = encryptSecret(clonedSettings.customLlmApiKey);
          const toSave = {
            ...this.data,
            settings: clonedSettings
          };
          const tempPath = `${this.filePath}.tmp`;
          import_fs.default.writeFileSync(tempPath, JSON.stringify(toSave, null, 2), "utf-8");
          try {
            import_fs.default.renameSync(tempPath, this.filePath);
          } catch {
            import_fs.default.copyFileSync(tempPath, this.filePath);
            try {
              import_fs.default.unlinkSync(tempPath);
            } catch {
            }
          }
        } catch (err) {
          console.error("[Storage] Error saving data:", err);
        }
      }
      getSettings() {
        const s = this.data.settings;
        if (s.groqApiKey && (s.groqApiKey.startsWith("enc:") || s.groqApiKey.startsWith("b64:"))) {
          const dec = decryptSecret(s.groqApiKey);
          if (dec && !dec.startsWith("enc:") && !dec.startsWith("b64:")) {
            s.groqApiKey = dec;
          }
        }
        if (s.openaiApiKey && (s.openaiApiKey.startsWith("enc:") || s.openaiApiKey.startsWith("b64:"))) {
          const dec = decryptSecret(s.openaiApiKey);
          if (dec && !dec.startsWith("enc:") && !dec.startsWith("b64:")) {
            s.openaiApiKey = dec;
          }
        }
        if (s.deepgramApiKey && (s.deepgramApiKey.startsWith("enc:") || s.deepgramApiKey.startsWith("b64:"))) {
          const dec = decryptSecret(s.deepgramApiKey);
          if (dec && !dec.startsWith("enc:") && !dec.startsWith("b64:")) {
            s.deepgramApiKey = dec;
          }
        }
        if (s.geminiApiKey && (s.geminiApiKey.startsWith("enc:") || s.geminiApiKey.startsWith("b64:"))) {
          const dec = decryptSecret(s.geminiApiKey);
          if (dec && !dec.startsWith("enc:") && !dec.startsWith("b64:")) {
            s.geminiApiKey = dec;
          }
        }
        if (s.customLlmApiKey && (s.customLlmApiKey.startsWith("enc:") || s.customLlmApiKey.startsWith("b64:"))) {
          const dec = decryptSecret(s.customLlmApiKey);
          if (dec && !dec.startsWith("enc:") && !dec.startsWith("b64:")) {
            s.customLlmApiKey = dec;
          }
        }
        const out = { ...this.data.settings };
        if (out.groqApiKey && (out.groqApiKey.startsWith("enc:") || out.groqApiKey.startsWith("b64:"))) out.groqApiKey = "";
        if (out.openaiApiKey && (out.openaiApiKey.startsWith("enc:") || out.openaiApiKey.startsWith("b64:"))) out.openaiApiKey = "";
        if (out.deepgramApiKey && (out.deepgramApiKey.startsWith("enc:") || out.deepgramApiKey.startsWith("b64:"))) out.deepgramApiKey = "";
        if (out.geminiApiKey && (out.geminiApiKey.startsWith("enc:") || out.geminiApiKey.startsWith("b64:"))) out.geminiApiKey = "";
        if (out.customLlmApiKey && (out.customLlmApiKey.startsWith("enc:") || out.customLlmApiKey.startsWith("b64:"))) out.customLlmApiKey = "";
        return out;
      }
      updateSettings(settings) {
        this.data.settings = { ...this.data.settings, ...settings };
        this.save();
        return this.getSettings();
      }
      getDictionary() {
        return this.data.dictionary;
      }
      saveDictionary(dictionary) {
        this.data.dictionary = dictionary;
        this.save();
      }
      getSnippets() {
        return this.data.snippets;
      }
      saveSnippets(snippets) {
        this.data.snippets = snippets;
        this.save();
      }
      getPrompts() {
        if (!this.data.prompts || this.data.prompts.length === 0) {
          this.data.prompts = DEFAULT_PROMPTS2;
        }
        return this.data.prompts;
      }
      savePrompts(prompts) {
        this.data.prompts = prompts.length > 0 ? prompts : DEFAULT_PROMPTS2;
        this.save();
      }
      getHistory() {
        return this.data.history;
      }
      addHistoryItem(item) {
        this.data.history.unshift(item);
        if (this.data.history.length > 200) {
          this.data.history = this.data.history.slice(0, 200);
        }
        this.save();
        this.notifyHistoryChanged();
      }
      /** Push updated history to open windows (live History tab) */
      notifyHistoryChanged() {
        try {
          const { BrowserWindow } = require("electron");
          for (const win of BrowserWindow.getAllWindows()) {
            if (win && !win.isDestroyed()) {
              win.webContents.send("storage:history-changed", this.data.history);
            }
          }
        } catch {
        }
      }
      clearHistory() {
        this.data.history = [];
        this.save();
      }
    };
    storage = new StorageService();
  }
});

// electron/services/modelManager.ts
var modelManager_exports = {};
__export(modelManager_exports, {
  MODEL_CATALOG: () => MODEL_CATALOG,
  detectEngineFromFolder: () => detectEngineFromFolder,
  downloadModel: () => downloadModel,
  findCustomModel: () => findCustomModel,
  getCatalogEntry: () => getCatalogEntry,
  getCatalogStatus: () => getCatalogStatus,
  getInstalledModelPath: () => getInstalledModelPath,
  getModelsDir: () => getModelsDir,
  getWhisperCliPath: () => getWhisperCliPath,
  isModelInstalled: () => isModelInstalled,
  isWhisperCliAvailable: () => isWhisperCliAvailable,
  registerCustomModel: () => registerCustomModel,
  removeModel: () => removeModel,
  resolveCustomModelFile: () => resolveCustomModelFile,
  unregisterCustomModel: () => unregisterCustomModel,
  validateModelFolder: () => validateModelFolder
});
function getModelsDir() {
  return import_path2.default.join(import_electron2.app.getPath("userData"), "models");
}
function whisperModelsDir() {
  return import_path2.default.join(getModelsDir(), "whisper.cpp");
}
function getWhisperCliPath() {
  const isDev = !import_electron2.app.isPackaged;
  if (isDev) {
    return import_path2.default.join(__dirname, "..", "resources", "whisper", "win-x64", "whisper-cli.exe");
  }
  return import_path2.default.join(process.resourcesPath, "whisper", "win-x64", "whisper-cli.exe");
}
function isWhisperCliAvailable() {
  try {
    return import_fs2.default.existsSync(getWhisperCliPath());
  } catch {
    return false;
  }
}
function dirSizeMB(dir) {
  let bytes = 0;
  try {
    const walk = (d) => {
      for (const entry of import_fs2.default.readdirSync(d, { withFileTypes: true })) {
        const full = import_path2.default.join(d, entry.name);
        if (entry.isDirectory()) walk(full);
        else {
          try {
            bytes += import_fs2.default.statSync(full).size;
          } catch {
          }
        }
      }
    };
    walk(dir);
  } catch {
  }
  return Math.round(bytes / 1048576 * 10) / 10;
}
function modelDir(entry) {
  return import_path2.default.join(whisperModelsDir(), entry.id);
}
function ggmlFileOf(entry) {
  return entry.hfFile || `${entry.id}.bin`;
}
function isModelInstalled(entry) {
  try {
    const file = import_path2.default.join(modelDir(entry), ggmlFileOf(entry));
    return import_fs2.default.existsSync(file) && import_fs2.default.statSync(file).size > 1024 * 1024;
  } catch {
    return false;
  }
}
function getInstalledModelPath(modelId) {
  const entry = modelId ? getCatalogEntry(modelId) : void 0;
  if (entry && isModelInstalled(entry)) {
    return import_path2.default.join(modelDir(entry), ggmlFileOf(entry));
  }
  for (const e of MODEL_CATALOG) {
    if (isModelInstalled(e)) {
      return import_path2.default.join(modelDir(e), ggmlFileOf(e));
    }
  }
  return void 0;
}
function getCatalogStatus() {
  const catalog = MODEL_CATALOG.map((entry) => {
    const dir = modelDir(entry);
    const installed = isModelInstalled(entry);
    return {
      ...entry,
      installed,
      path: installed ? import_path2.default.join(dir, ggmlFileOf(entry)) : void 0,
      sizeOnDiskMB: installed ? Math.round(import_fs2.default.statSync(import_path2.default.join(dir, ggmlFileOf(entry))).size / 1048576) : void 0
    };
  });
  const custom = (storage.getSettings().customLocalModels || []).map((m) => ({
    id: m.id,
    name: m.name,
    engine: m.engine,
    engineModelId: m.engineModelId,
    languages: ["custom"],
    sizeMB: dirSizeMB(m.path),
    description: m.path,
    requires: m.engine,
    installed: import_fs2.default.existsSync(m.path),
    path: m.path,
    sizeOnDiskMB: import_fs2.default.existsSync(m.path) ? dirSizeMB(m.path) : void 0,
    isCustom: true
  }));
  return [...catalog, ...custom];
}
function listFilesShallow(dir) {
  try {
    return import_fs2.default.readdirSync(dir).map((n) => n.toLowerCase());
  } catch {
    return [];
  }
}
function detectEngineFromFolder(dir) {
  const files = listFilesShallow(dir);
  if (files.length === 0) return void 0;
  if (files.some((f) => f.endsWith(".bin"))) return "whisper.cpp";
  return void 0;
}
function validateModelFolder(dir) {
  let stat;
  try {
    stat = import_fs2.default.statSync(dir);
  } catch {
    return { ok: false, error: "\u041F\u0430\u043F\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430" };
  }
  if (!stat.isDirectory()) return { ok: false, error: "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u043F\u0443\u0442\u044C \u2014 \u043D\u0435 \u043F\u0430\u043F\u043A\u0430" };
  const hasGgml = listFilesShallow(dir).some((f) => f.endsWith(".bin"));
  if (!hasGgml) {
    return {
      ok: false,
      error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C. \u041D\u0443\u0436\u043D\u0430 \u043F\u0430\u043F\u043A\u0430 \u0441 ggml-\u0444\u0430\u0439\u043B\u043E\u043C whisper.cpp (*.bin), \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 ggml-small-q5_1.bin"
    };
  }
  return { ok: true, engine: "whisper.cpp" };
}
function registerCustomModel(model) {
  const check = validateModelFolder(model.path);
  if (!check.ok) return { ok: false, error: check.error };
  const list = [...storage.getSettings().customLocalModels || []];
  if (list.some((m) => m.path === model.path)) {
    return { ok: false, error: "\u042D\u0442\u0430 \u043F\u0430\u043F\u043A\u0430 \u0443\u0436\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0430" };
  }
  list.push({
    id: model.id,
    name: model.name || import_path2.default.basename(model.path),
    path: model.path,
    engine: "whisper.cpp",
    engineModelId: void 0
  });
  storage.updateSettings({ customLocalModels: list });
  return { ok: true };
}
function unregisterCustomModel(modelId) {
  const list = (storage.getSettings().customLocalModels || []).filter((m) => m.id !== modelId);
  storage.updateSettings({ customLocalModels: list });
  return { ok: true };
}
function findCustomModel(modelId) {
  return (storage.getSettings().customLocalModels || []).find((m) => m.id === modelId);
}
function resolveCustomModelFile(custom) {
  try {
    const stat = import_fs2.default.statSync(custom.path);
    if (stat.isFile() && custom.path.toLowerCase().endsWith(".bin")) return custom.path;
    const found = import_fs2.default.readdirSync(custom.path).find((f) => f.toLowerCase().endsWith(".bin"));
    return found ? import_path2.default.join(custom.path, found) : void 0;
  } catch {
    return void 0;
  }
}
function downloadModel(modelId, onProgress) {
  const entry = getCatalogEntry(modelId);
  if (!entry || !entry.huggingfaceId) {
    return { promise: Promise.reject(new Error(`Unknown model: ${modelId}`)), cancel: () => {
    } };
  }
  const dest = import_path2.default.join(modelDir(entry), ggmlFileOf(entry));
  import_fs2.default.mkdirSync(import_path2.default.dirname(dest), { recursive: true });
  const partFile = dest + ".part";
  let request = null;
  let settled = false;
  let cancelled = false;
  const promise = new Promise((resolve, reject) => {
    const finish = (err) => {
      if (settled) return;
      settled = true;
      activeDownload = null;
      try {
        if (import_fs2.default.existsSync(partFile)) import_fs2.default.unlinkSync(partFile);
      } catch {
      }
      if (cancelled) {
        onProgress({ modelId, state: "error", error: "\u0421\u043A\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u043E" });
        reject(new Error("\u0421\u043A\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u043E"));
      } else if (err) {
        onProgress({ modelId, state: "error", error: err.message });
        reject(err);
      } else {
        onProgress({ modelId, state: "done", percent: 100 });
        resolve();
      }
    };
    try {
      const url = `https://huggingface.co/${entry.huggingfaceId}/resolve/main/${ggmlFileOf(entry)}`;
      request = import_electron2.net.request({ url, redirect: "follow" });
      request.setHeader("User-Agent", "Speaky/1.0");
      let received = 0;
      const total = entry.sizeMB * 1048576;
      let lastEmit = 0;
      const fileStream = import_fs2.default.createWriteStream(partFile);
      request.on("response", (response) => {
        const status = response.statusCode || 0;
        if (status < 200 || status >= 300) {
          fileStream.close();
          finish(new Error(`HuggingFace \u0432\u0435\u0440\u043D\u0443\u043B HTTP ${status}`));
          return;
        }
        const lenHeader = parseInt(response.headers["content-length"], 10);
        const totalKnown = Number.isFinite(lenHeader) && lenHeader > 0 ? lenHeader : total;
        response.on("data", (chunk) => {
          received += chunk.length;
          fileStream.write(chunk);
          const now = Date.now();
          if (now - lastEmit > 250 || received >= totalKnown) {
            lastEmit = now;
            onProgress({
              modelId,
              state: "downloading",
              percent: Math.min(99.5, Math.round(received / totalKnown * 1e3) / 10),
              receivedMB: Math.round(received / 1048576 * 10) / 10
            });
          }
        });
        response.on("end", () => {
          fileStream.end(() => {
            if (cancelled) return finish();
            try {
              import_fs2.default.renameSync(partFile, dest);
              finish();
            } catch (err) {
              finish(err);
            }
          });
        });
        response.on("error", (err) => {
          fileStream.close();
          finish(err);
        });
      });
      request.on("error", (err) => {
        fileStream.close();
        finish(err);
      });
      request.end();
    } catch (err) {
      finish(err);
    }
  });
  activeDownload = {
    cancel: () => {
      cancelled = true;
      try {
        request?.abort();
      } catch {
      }
    }
  };
  return { promise, cancel: () => activeDownload?.cancel() };
}
function removeModel(modelId) {
  if (findCustomModel(modelId)) {
    unregisterCustomModel(modelId);
    return;
  }
  const entry = getCatalogEntry(modelId);
  if (!entry) throw new Error(`Unknown model: ${modelId}`);
  const dir = modelDir(entry);
  const modelsDir = getModelsDir();
  if (!import_path2.default.resolve(dir).startsWith(import_path2.default.resolve(modelsDir))) {
    throw new Error("Refusing to delete outside models dir");
  }
  import_fs2.default.rmSync(dir, { recursive: true, force: true });
}
var import_path2, import_fs2, import_electron2, activeDownload;
var init_modelManager = __esm({
  "electron/services/modelManager.ts"() {
    "use strict";
    import_path2 = __toESM(require("path"));
    import_fs2 = __toESM(require("fs"));
    import_electron2 = require("electron");
    init_modelCatalog();
    init_storage();
    activeDownload = null;
  }
});

// electron/services/localWhisper.ts
var localWhisper_exports = {};
__export(localWhisper_exports, {
  checkLocalWhisperAvailable: () => checkLocalWhisperAvailable,
  shutdownLocalWhisper: () => shutdownLocalWhisper,
  transcribeAudioLocal: () => transcribeAudioLocal
});
async function checkLocalWhisperAvailable() {
  if (!isWhisperCliAvailable()) {
    return { available: false, error: "whisper-cli \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0432 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F" };
  }
  if (!getInstalledModelPath()) {
    return { available: false, error: "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C \u043D\u0435 \u0441\u043A\u0430\u0447\u0430\u043D\u0430 (\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u2192 \u041C\u043E\u0434\u0435\u043B\u0438)" };
  }
  return { available: true };
}
async function transcribeAudioLocal(audioBuffer, mimeType = "audio/wav", language = "ru", modelId) {
  const startTime = Date.now();
  const cliPath = getWhisperCliPath();
  if (!import_fs3.default.existsSync(cliPath)) {
    throw new Error("whisper-cli \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0432 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F");
  }
  let modelPath;
  const custom = modelId ? findCustomModel(modelId) : void 0;
  if (custom) {
    modelPath = resolveCustomModelFile(custom);
  }
  if (!modelPath) {
    modelPath = getInstalledModelPath(modelId);
  }
  if (!modelPath) {
    throw new Error("\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C \u043D\u0435 \u0441\u043A\u0430\u0447\u0430\u043D\u0430. \u0421\u043A\u0430\u0447\u0430\u0439\u0442\u0435 \u0435\u0451 \u0432 \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u2192 \u041C\u043E\u0434\u0435\u043B\u0438.");
  }
  const ext = mimeType.includes("webm") ? ".webm" : ".wav";
  const tempPath = import_path3.default.join(
    import_os.default.tmpdir(),
    `speaky_local_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`
  );
  try {
    await import_fs3.default.promises.writeFile(tempPath, audioBuffer);
    const args = ["-m", modelPath, "-f", tempPath, "-nt", "-np"];
    if (language && language !== "auto") {
      args.push("-l", language);
    }
    const text = await new Promise((resolve, reject) => {
      const proc = (0, import_child_process.spawn)(cliPath, args, {
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"]
      });
      let stdout = "";
      let stderr = "";
      const timer = setTimeout(() => {
        try {
          proc.kill();
        } catch {
        }
        reject(new Error("\u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0432\u0430\u043D\u0438\u044F (120\u0441)"));
      }, 12e4);
      proc.stdout?.on("data", (d) => {
        stdout += d.toString();
      });
      proc.stderr?.on("data", (d) => {
        stderr += d.toString();
      });
      proc.on("error", (err) => {
        clearTimeout(timer);
        reject(new Error(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C whisper-cli: ${err.message}`));
      });
      proc.on("exit", (code) => {
        clearTimeout(timer);
        if (code === 0) {
          resolve(stdout);
        } else {
          const tail = stderr.split("\n").filter(Boolean).slice(-3).join(" | ");
          reject(new Error(`whisper-cli \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0441\u044F \u0441 \u043A\u043E\u0434\u043E\u043C ${code}${tail ? ": " + tail : ""}`));
        }
      });
    });
    const latencyMs = Date.now() - startTime;
    const cleaned = text.replace(/\[[^\]]*\]/g, " ").replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
    return {
      text: cleaned,
      durationSeconds: 0,
      latencyMs
    };
  } finally {
    import_fs3.default.promises.unlink(tempPath).catch(() => {
    });
  }
}
function shutdownLocalWhisper() {
}
var import_child_process, import_path3, import_fs3, import_os;
var init_localWhisper = __esm({
  "electron/services/localWhisper.ts"() {
    "use strict";
    import_child_process = require("child_process");
    import_path3 = __toESM(require("path"));
    import_fs3 = __toESM(require("fs"));
    import_os = __toESM(require("os"));
    init_modelManager();
  }
});

// tests/e2e-local-whisper.ts
var import_electron3 = require("electron");
var import_path4 = __toESM(require("path"));
var import_fs4 = __toESM(require("fs"));
var wavPath = process.argv.find((a) => a.endsWith(".wav")) || import_path4.default.join(process.env.TEMP || "/tmp", "speaky-e2e", "speech16k.wav");
async function main() {
  console.log("=== E2E: local whisper.cpp pipeline ===");
  console.log("[env] userData:", import_electron3.app.getPath("userData"));
  const { downloadModel: downloadModel2, getCatalogStatus: getCatalogStatus2, isWhisperCliAvailable: isWhisperCliAvailable2, getWhisperCliPath: getWhisperCliPath2 } = await Promise.resolve().then(() => (init_modelManager(), modelManager_exports));
  const { transcribeAudioLocal: transcribeAudioLocal2, checkLocalWhisperAvailable: checkLocalWhisperAvailable2 } = await Promise.resolve().then(() => (init_localWhisper(), localWhisper_exports));
  if (!isWhisperCliAvailable2()) {
    throw new Error("whisper-cli.exe not found at " + getWhisperCliPath2());
  }
  console.log("[ok] whisper-cli bundled:", getWhisperCliPath2());
  const catalog = getCatalogStatus2();
  const small = catalog.find((m) => m.id === "whisper-base-q5");
  console.log(`[catalog] ${small.name}: installed=${small.installed}`);
  if (!small.installed) {
    console.log("[download] fetching", small.name, `(~${small.sizeMB}MB)...`);
    const t0 = Date.now();
    const { promise } = downloadModel2(small.id, (ev) => {
      if (ev.state === "downloading") {
        process.stdout.write(`\r[download] ${ev.percent ?? 0}% (${ev.receivedMB ?? 0}MB)   `);
      }
    });
    await promise;
    process.stdout.write("\n");
    console.log(`[ok] downloaded in ${((Date.now() - t0) / 1e3).toFixed(1)}s`);
  }
  const after = getCatalogStatus2().find((m) => m.id === small.id);
  if (!after.installed) throw new Error("Model not installed after download");
  console.log("[ok] model on disk:", after.path, `(${after.sizeOnDiskMB}MB)`);
  const avail = await checkLocalWhisperAvailable2();
  if (!avail.available) throw new Error("checkLocalWhisperAvailable failed: " + avail.error);
  console.log("[ok] availability check passed");
  if (!import_fs4.default.existsSync(wavPath)) {
    throw new Error(`Test wav not found: ${wavPath} (generate it first)`);
  }
  const audio = import_fs4.default.readFileSync(wavPath);
  console.log(`[transcribe] ${wavPath} (${Math.round(audio.length / 1024)}KB, lang=ru)`);
  const t1 = Date.now();
  const result = await transcribeAudioLocal2(audio, "audio/wav", "ru", small.id);
  const dt = ((Date.now() - t1) / 1e3).toFixed(2);
  console.log("----------------------------------------");
  console.log("TEXT:", result.text);
  console.log(`LATENCY: ${dt}s`);
  console.log("----------------------------------------");
  const expected = ["\u043F\u0440\u0438\u0432\u0435\u0442", "\u0442\u0435\u0441\u0442", "\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0432\u0430\u043D", "\u0441\u043F\u0438\u043A\u0438", "\u0440\u0435\u0447"];
  const lower = result.text.toLowerCase();
  const hits = expected.filter((w) => lower.includes(w));
  console.log(`[check] keyword hits: ${hits.length}/${expected.length}`, hits);
  if (result.text.length === 0) throw new Error("Empty transcription");
  if (hits.length < 3) throw new Error(`Weak match, got: "${result.text}"`);
  console.log("=== E2E PASSED ===");
}
import_electron3.app.whenReady().then(async () => {
  const code = await main().then(
    () => 0,
    (err) => {
      console.error("=== E2E FAILED ===");
      console.error(err);
      return 1;
    }
  );
  import_electron3.app.exit(code);
});
