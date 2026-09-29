"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// electron/services/transcribeWorker.ts
var import_worker_threads = require("worker_threads");
var import_path = __toESM(require("path"));
var dllDir = import_worker_threads.workerData?.dllDir || "";
process.env.PATH = dllDir + import_path.default.delimiter + process.env.PATH;
console.error("[worker] starting, dllDir =", dllDir);
var koffi = require("koffi");
var lib = koffi.load(import_path.default.join(dllDir, "transcribe.dll"));
console.error("[worker] dll loaded");
import_worker_threads.parentPort.postMessage({ type: "hello" });
var versionFn = lib.func("const char *transcribe_version()");
var statusFn = lib.func("const char *transcribe_status_string(int status)");
var initBackendsFn = lib.func("int transcribe_init_backends(const char *artifact_dir)");
var initSt = initBackendsFn(dllDir);
console.error("[worker] init_backends ->", initSt);
var openFn = lib.func("int transcribe_open(const char *path, const void *load_params, const void *session_params, void **out_session)");
var runFn = lib.func("int transcribe_run(void *session, const float *pcm, int n_samples, const void *params)");
var textFn = lib.func("const char *transcribe_full_text(const void *session)");
var langFn = lib.func("const char *transcribe_detected_language(const void *session)");
var backendFn = lib.func("const char *transcribe_model_backend(const void *session)");
var closeFn = lib.func("void transcribe_close(void *session)");
var session = null;
var currentModelPath = "";
var currentModelFile = "";
var currentLanguage = "";
import_worker_threads.parentPort.on("message", (msg) => {
  console.error("[worker] msg:", msg.type);
  try {
    if (msg.type === "open") {
      const modelPath = msg.modelPath;
      const file = import_path.default.basename(modelPath).toLowerCase();
      if (session && currentModelPath === modelPath && currentLanguage === (msg.language || "")) {
        import_worker_threads.parentPort.postMessage({ type: "ready", backend: backendFn(session) });
        return;
      }
      if (session) {
        closeFn(session);
        session = null;
      }
      const buf = Buffer.alloc(8);
      const st = openFn(modelPath, null, null, buf);
      if (st !== 0) {
        import_worker_threads.parentPort.postMessage({ type: "error", message: `transcribe_open ${statusFn(st)} (${st})` });
        return;
      }
      session = koffi.decode(buf, "void *");
      console.error("[worker] opened, backend =", backendFn(session));
      currentModelPath = modelPath;
      currentModelFile = file;
      currentLanguage = msg.language || "";
      import_worker_threads.parentPort.postMessage({ type: "ready", backend: backendFn(session) });
    } else if (msg.type === "run") {
      if (!session) {
        import_worker_threads.parentPort.postMessage({ type: "error", message: "\u041C\u043E\u0434\u0435\u043B\u044C \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430" });
        return;
      }
      const samples = msg.samples;
      const t0 = Date.now();
      const st = runFn(session, samples, samples.length, null);
      console.error("[worker] run done:", st, Date.now() - t0, "ms");
      if (st !== 0) {
        import_worker_threads.parentPort.postMessage({ type: "error", message: `transcribe_run ${statusFn(st)} (${st})` });
        return;
      }
      const raw = String(textFn(session) || "");
      const cleaned = raw.replace(/\[[^\]]*\]/g, " ").replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
      import_worker_threads.parentPort.postMessage({
        type: "result",
        text: cleaned,
        detectedLanguage: String(langFn(session) || ""),
        backend: String(backendFn(session) || ""),
        seq: msg.seq
      });
    } else if (msg.type === "close") {
      if (session) {
        closeFn(session);
        session = null;
        currentModelPath = "";
      }
      import_worker_threads.parentPort.postMessage({ type: "closed" });
    }
  } catch (err) {
    import_worker_threads.parentPort.postMessage({ type: "error", message: err?.message || String(err) });
  }
});
