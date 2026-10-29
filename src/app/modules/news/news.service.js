import { cache } from "../../utils/cache.js";

// Initial verified teleprinter dispatches
export const INITIAL_WIRE_DISPATCHES = [
  {
    id: "wire-01",
    edition: "WIRE 01",
    timestamp: "15:24 GMT",
    category: {
      en: "TELECOMMUNICATIONS",
      bn: "টেলিকমিউনিকেশন",
    },
    location: "CHATTOGRAM",
    headline: {
      en: "Indian Ocean submarine cable consortium activates 400Tbps coherent optical transponders connecting Chattogram directly to Singapore and Marseille",
      bn: "চট্টগ্রাম থেকে সিঙ্গাপুর ও মার্সেই পর্যন্ত ৪০০ টেরাবিট অপটিক্যাল সাবমেরিন কেবল লাইন সফলভাবে চালু করেছে আন্তর্জাতিক কনসোর্টিয়াম",
    },
    report: {
      en: "CHATTOGRAM — The Bay of Bengal subsea connectivity consortium has concluded trial telemetry for the South Asian trans-oceanic fiber corridor. The newly deployed optical line bypasses terrestrial bottlenecks and provides redundant latency below 18ms across Singapore hubs, providing unprecedented infrastructural reliability for regional cloud operations.",
      bn: "চট্টগ্রাম — বঙ্গোপসাগর সাবমেরিন ক্যাবল কনসোর্টিয়াম দক্ষিণ এশিয়ার নতুন ট্রান্স-ওশেনিক ফাইবার লাইনের সফল ট্রায়াল সম্পন্ন করেছে। এই নতুন অপটিক্যাল লাইনটি সিঙ্গাপুর পর্যন্ত ১৮ মিলি-সেকেন্ডের কম লেটেন্সিতে নিরবচ্ছিন্ন ইন্টারনেট ব্যান্ডউইথ সরবরাহ করবে, যা বাংলাদেশের ডিজিটাল অবকাঠামোকে বিশ্বমানের শক্তিতে রূপান্তর করবে।",
    },
    urgent: true,
  },
  {
    id: "wire-02",
    edition: "WIRE 02",
    timestamp: "15:10 GMT",
    category: {
      en: "COMPUTING",
      bn: "কম্পিউটিং ও সিস্টেমস",
    },
    location: "ZURICH",
    headline: {
      en: "Open standards group ratifies zero-overhead memory-safe compiler profiles for enterprise microkernels",
      bn: "মেমোরি-নিরাপদ কম্পাইলার প্রোফাইলের নতুন বিশ্বমান অনুমোদন করেছে আন্তর্জাতিক ওপেন স্ট্যান্ডার্ড গ্রুপ",
    },
    report: {
      en: "ZURICH — In a historic unanimous ballot, the international computer systems council finalized standard specifications eliminating buffer overflow vulnerabilities at compile time with zero runtime execution penalty. The profile is already being integrated into critical aviation and hospital operating kernels.",
      bn: "জুরিখ — আন্তর্জাতিক কম্পিউটার সিস্টেম কাউন্সিল সর্বসম্মতিক্রমে এমন এক কম্পাইলার স্ট্যান্ডার্ড অনুমোদন করেছে যা মেমোরি লিক ও বাফার ওভারফ্লোর মতো বিপজ্জনক ত্রুটি প্রোগ্রাম চলাকালীন সময়েই সম্পূর্ণ নির্মূল করবে, কোনো অতিরিক্ত সিস্টেম লোড ছাড়াই।",
    },
    urgent: false,
  },
  {
    id: "wire-03",
    edition: "WIRE 03",
    timestamp: "14:48 GMT",
    category: {
      en: "ENERGY & CLIMATE",
      bn: "শক্তি ও জলবায়ু",
    },
    location: "STOCKHOLM",
    headline: {
      en: "Solid-state thermal storage pilot delivers continuous zero-emission power to Scandinavian server farms throughout Arctic night",
      bn: "স্ক্যান্ডিনেভিয়ার ডেটাসেন্টারগুলোতে শতভাগ পরিবেশবান্ধব থার্মাল শক্তির সফল পাইলট প্রকল্প বাস্তবায়ন",
    },
    report: {
      en: "STOCKHOLM — Swedish renewable engineering labs announced that deep sand thermal batteries maintained 99.999% uptime for cloud server clusters over a thirty-day continuous testing window, proving the commercial viability of baseload green computing.",
      bn: "স্টকহোম — সুইডিশ নবায়নযোগ্য জ্বালানি গবেষণাগার জানিয়েছে যে মাটির নিচের বিশেষ থার্মাল ব্যাটারি টানা এক মাস কোনো গ্রিড বিদ্যুৎ ছাড়াই সার্ভার ক্লাস্টার সচল রাখতে সক্ষম হয়েছে, যা ডেটাসেন্টারের কার্বন নিঃসরণ শূন্যে নামিয়ে আনবে।",
    },
    urgent: false,
  },
  {
    id: "wire-04",
    edition: "WIRE 04",
    timestamp: "14:12 GMT",
    category: {
      en: "WEB STANDARDS",
      bn: "ওয়েব স্ট্যান্ডার্ড",
    },
    location: "GENEVA",
    headline: {
      en: "W3C issues final specification for local cryptographic document attestation across major web engines",
      bn: "ব্রাউজারে স্থানীয় ক্রিপ্টোগ্রাফিক ডকুমেন্ট যাচাইকরণের নতুন বৈশ্বিক মান জারি করেছে ডব্লিউথ্রিসি",
    },
    report: {
      en: "GENEVA — The World Wide Web Consortium released the permanent recommendation for client-side digital signatures, enabling readers to verify the authentic origin and author signatures of articles without pinging remote verification servers.",
      bn: "জেনেভা — ওয়ার্ল্ড ওয়াইড ওয়েব কনসোর্টিয়াম ব্রাউজারের ভেতর ডিজিটাল সিগনেচার যাচাইয়ের নিয়ম জারি করেছে, যার ফলে কোনো প্রবন্ধ মূল লেখক পরিবর্তন ছাড়াই প্রকাশ করেছেন কিনা তা দূরবর্তী সার্ভারে না গিয়েও পাঠক নিজেই নিশ্চিত হতে পারবেন।",
    },
    urgent: false,
  },
  {
    id: "wire-05",
    edition: "WIRE 05",
    timestamp: "13:30 GMT",
    category: {
      en: "AEROSPACE",
      bn: "মহাকাশ ও আবহাওয়া",
    },
    location: "TOKYO",
    headline: {
      en: "Low-Earth orbit meteorological array deploys synthetic aperture radar for real-time climate monitoring",
      bn: "রিয়েল-টাইম জলবায়ু ও বন্যা পর্যবেক্ষণে নতুন সিন্থেটিক রাডার স্যাটেলাইট সফলভাবে কক্ষপথে স্থাপন",
    },
    report: {
      en: "TOKYO — Meteorological scientists confirmed successful signal reception from the new multi-spectral satellite array, which tracks tropical storm surges and river delta silt movements with centimeter-level precision.",
      bn: "টোকিও — আবহাওয়া বিজ্ঞানীরা নিশ্চিত করেছেন যে নতুন স্যাটেলাইট বহর সফলভাবে সক্রিয় হয়েছে, যা বঙ্গোপসাগর ও ভারত মহাসাগরের সাইক্লোন এবং নদীর গতিপথ নিখুঁতভাবে পরিমাপ করে দুর্যোগের আগাম সতর্কবার্তা প্রদান করবে।",
    },
    urgent: true,
  },
  {
    id: "wire-06",
    edition: "WIRE 06",
    timestamp: "12:45 GMT",
    category: {
      en: "OPEN SOURCE",
      bn: "ওপেন সোর্স",
    },
    location: "LONDON",
    headline: {
      en: "Global database alliance releases pure SQLite vector embedding extension with sub-millisecond query performance",
      bn: "এসকিউলাইট ডেটাবেজের জন্য উচ্চগতির ভেক্টর এক্সটেনশন উন্মুক্ত করেছে ওপেন সোর্স ডেভেলপার কমিউনিটি",
    },
    report: {
      en: "LONDON — Software engineers have released a standalone, zero-dependency C extension for SQLite that allows full vector search inside single-file databases, eliminating the need for bulky vector cloud services for personal and local AI apps.",
      bn: "লন্ডন — সম্পূর্ণ সিঙ্গেল-ফাইল ডেটাবেজে কৃত্রিম বুদ্ধিমত্তার ভেক্টর সার্চ চালানোর মতো হালকা ও দ্রুতগতির ওপেন সোর্স এক্সটেনশন উন্মুক্ত করা হয়েছে, যা লোকাল ডিভাইসে ডাটা খোঁজা শতগুণ সহজ করবে।",
    },
    urgent: false,
  },
];

// Active Server-Sent Events subscribers
const sseClients = new Set();

const getLiveDispatches = async () => {
  const cached = await cache.get("mixhub:live_wire");
  if (cached) return cached;

  await cache.set("mixhub:live_wire", INITIAL_WIRE_DISPATCHES, 30);
  return INITIAL_WIRE_DISPATCHES;
};

const emitNewDispatch = async (dispatchData) => {
  const current = await getLiveDispatches();
  const newDispatch = {
    ...dispatchData,
    id: `wire-${Date.now()}`,
    timestamp: new Date().toUTCString().slice(17, 22) + " GMT",
  };

  const updated = [newDispatch, ...current.slice(0, 9)];
  await cache.set("mixhub:live_wire", updated, 30);

  // Broadcast to all active SSE browser clients
  for (const client of sseClients) {
    try {
      client.write(`data: ${JSON.stringify(newDispatch)}\n\n`);
    } catch {
      sseClients.delete(client);
    }
  }

  return newDispatch;
};

const addSSEClient = (res) => {
  sseClients.add(res);
  res.on("close", () => sseClients.delete(res));
};

export const NewsServices = {
  getLiveDispatches,
  emitNewDispatch,
  addSSEClient,
};

