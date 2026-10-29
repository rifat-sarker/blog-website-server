export const SEED_ESSAYS = [
  {
    _id: "essay-01",
    kicker: {
      en: "ARCHITECTURAL ESSAY • VOL. 28",
      bn: "স্থাপত্য বিষয়ক গবেষণা প্রবন্ধ • খণ্ড ২৮",
    },
    title: {
      en: "On the Quiet Beauty of Deterministic Systems: Engineering for Century-Scale Stability",
      bn: "নির্ধারণী ব্যবস্থার প্রশান্ত সৌন্দর্য: শতবর্ষের স্থায়িত্বের জন্য সফটওয়্যার আর্কিটেকচার",
    },
    sdesc: {
      en: "Why modern computing is abandoning stochastic sprawl in search of quiet, mathematically provable simplicity and immutable state ledgers.",
      bn: "অতিরিক্ত জটিলতা ও অবিরাম ট্র্যাকিংয়ের যুগে কেন আধুনিক সফটওয়্যার প্রকৌশল আবার ফিরে আসছে গাণিতিকভাবে প্রমাণিত সরলতা ও অপরিবর্তনীয় স্টেট লেজারের দিকে।",
    },
    ldesc: {
      en: `There is a profound, almost meditative stillness in code that does exactly one thing, without side effects, across ten thousand iterations. Over the last decade, software engineering has suffered from a relentless addiction to transient novelty: ephemeral frameworks, over-engineered microservices, and layers of reactive duct tape designed to conceal underlying architectural fragility.

### The Tyranny of Accidental Complexity

Fred Brooks famously delineated the boundary between essential complexity—the difficulty inherent in the domain itself—and accidental complexity: the friction created by our own tooling, premature abstractions, and brittle dependencies. In 2026, the overwhelming majority of production failures do not arise from insoluble algorithmic puzzles; they stem from race conditions in asynchronous hydration, leaky state synchronization, and an uncritical reliance on black-box distributed topologies.

When we inspect the monuments of civil engineering—the Roman aqueducts that have carried freshwater across provinces for two millennia, or the mortise-and-tenon wooden pagodas of Nara that have swayed through countless tectonic tremors without a single iron nail—we observe a common philosophical thread: every joint is inspectable, every force vector is explicit, and material limits are respected rather than masked.

\`\`\`javascript
// The purity of an immutable transition:
// Given state S and event E, return next state S' deterministically.
export const transition = (state, event) => {
  switch (event.type) {
    case 'DISPATCH_COMMITTED':
      return {
        ...state,
        lastSequence: event.seq,
        ledger: [...state.ledger, event.payload],
        uncommittedChanges: 0,
      };
    default:
      return state;
  }
};
\`\`\`

### Wabi-Sabi and the Handcrafted Art of Software

In traditional Japanese joinery (*sashimono*), artisans fashion complex interlocking joints that hold massive beams together solely through geometry and friction. No glue is permitted; no nails are driven. The strength of the structure is a direct consequence of the builder's patience and mathematical honesty.

When we approach software with that same reverence—treating constraints as creative guardrails rather than limitations—we construct systems that do not need to be perpetually restarted, patched against phantom leaks, or guarded by armies of background telemetry daemons. They sit quietly in memory, consuming negligible milliwatts, serving millions of readers with calm, unruffled certainty.

### The Invisible Ecological Cost of Bloat

Every unnecessary layer of middleware, every superfluous bundle chunk, and every unoptimized database query carries a physical footprint. In the context of global energy constraints, software efficiency is not an academic aesthetic: it is an ethical discipline. When an application boots in under 4 milliseconds and runs uninterrupted for seven years on a modest server slice, we honor both the machine and the human being whose attention we are soliciting.

### Permanence Over Fashion

The mark of enduring engineering is not how quickly a prototype can be hacked together, but how gracefully it endures when the fashion of the season has faded. Plain text, relational invariants, and human-readable serialization formats outlive every transient framework wave. As we build for the decade ahead, let our aspiration be clarity, durability, and quiet perfection.`,
      bn: `দশ হাজার বার রান করার পরও কোনো অপ্রত্যাশিত সাইড-ইফেক্ট ছাড়া ঠিক একটি কাজ নির্ভুলভাবে সম্পন্ন করার মতো কোডের মধ্যে এক গভীর, ধ্যানমগ্ন প্রশান্তি লুকিয়ে থাকে। গত এক দশকে সফটওয়্যার প্রকৌশল জগৎ ক্ষণস্থায়ী নতুনত্বের মোহে অন্ধ হয়ে পড়েছিল: ভঙ্গুর ফ্রেমওয়ার্ক, অপ্রয়োজনীয় মাইক্রোসার্ভিস এবং শত শত লেয়ারের রিঅ্যাক্টিভ ডেমনের মাধ্যমে কোডের মৌলিক দুর্বলতা ঢেকে রাখার ব্যর্থ চেষ্টা।

### অপ্রয়োজনীয় জটিলতার আগ্রাসন

কম্পিউটার বিজ্ঞানের পুরোধা ফ্রেড ব্রুক্স সমস্যার দুটি রূপ স্পষ্টভাবে নির্দেশ করেছিলেন—প্রয়োজনীয় জটিলতা (যা কোনো বিষয়ের বাস্তব সমাধানে অপরিহার্য) এবং আকস্মিক বা কৃত্রিম জটিলতা (যা আমরা নিজেরাই অতিরিক্ত টুলস, অপরিপক্ক অ্যাবস্ট্রাকশন ও অগোছালো ডিপেন্ডেন্সির মাধ্যমে তৈরি করি)। ২০২৬ সালে এসে আমরা দেখতে পাই, প্রোডাকশনে অধিকাংশ সিস্টেম ক্র্যাশ জটিল কোনো গাণিতিক ত্রুটির কারণে হয় না; বরং তা ঘটে মাত্রাতিরিক্ত লাইব্রেরি নির্ভরতা, অসঙ্গত স্টেট সিঙ্ক এবং অনিয়ন্ত্রিত ডিস্ট্রিবিউটেড জটিলতার ফলে।

আমরা যদি সভ্যতার প্রাচীন স্থাপত্যগুলোর দিকে তাকাই—রোমান সাম্রাজ্যের সেই দুই হাজার বছরের পুরনো জলনালী যা এখনো পাহাড়ি ঝরনার পানি বহন করে চলেছে, কিংবা কোনো পেরেক ছাড়াই কাঠ জোড়া লাগিয়ে তৈরি করা নারা শহরের শতবর্ষী প্যাগোডা—তাহলে দেখতে পাব এক অনন্য দর্শন: প্রতিটি সংযোগস্থল উন্মুক্ত ও দৃশ্যমান, প্রতিটি ভারবাহী বিন্দু নির্ভুল এবং প্রাকৃতিক নিয়মের প্রতি গভীর শ্রদ্ধা।

\`\`\`javascript
// অপরিবর্তনীয় স্টেটের বিশুদ্ধতা:
// বর্তমান স্টেট S এবং ইভেন্ট E গ্রহণ করে ভবিষ্যৎ স্টেট S' প্রদান
export const transition = (state, event) => {
  switch (event.type) {
    case 'DISPATCH_COMMITTED':
      return {
        ...state,
        lastSequence: event.seq,
        ledger: [...state.ledger, event.payload],
        uncommittedChanges: 0,
      };
    default:
      return state;
  }
};
\`\`\`

### সফটওয়্যার নির্মাণে হস্তশিল্পের ঐতিহ্য

ঐতিহ্যবাহী কাঠের কারুশিল্পে, ওস্তাদ কারিগররা কোনো ধাতব পেরেক বা রাসায়নিক আঠা ছাড়াই ফার্নিচারের তক্তা জোড়া লাগান। সেই জোড়ের অতুলনীয় শক্তি কোনো কৃত্রিম বন্ধনী থেকে আসে না; তা আসে কাঠের নিখুঁত কোণ কাটা এবং নিজস্ব আঁশের ঘর্ষণ থেকে।

আমরা যখন সফটওয়্যার কোড রচনার ক্ষেত্রেও সেই পরম যত্ন ও শ্রদ্ধা বজায় রাখি—সীমাবদ্ধতাকে শত্রু না ভেবে শক্তি হিসেবে গ্রহণ করি—তখন সেই অ্যাপ্লিকেশন চালু রাখার জন্য পেছনের সার্ভারে হাজারটা ব্যাকগ্রাউন্ড ডেমন চালাতে হয় না। তা পরম শান্তিতে মেমোরিতে অবস্থান করে, অতি নগণ্য বিদ্যুৎ শক্তি খরচ করে এবং কোটি কোটি পাঠককে শান্ত গাম্ভীর্যের সাথে সেবা প্রদান করে।

### অপ্রয়োজনীয় জটিলতার অদৃশ্য পরিবেশগত মূল্য

প্রতিটি অতিরিক্ত মিডলওয়্যার, প্রতিটি অপ্রয়োজনীয় ডিপেন্ডেন্সি এবং অবিরাম অডিটের নামে পাঠানো টেলিমেট্রি প্যাকেট প্রকৃতপক্ষে বিশ্বজুড়ে বিদ্যুৎ অপচয় ও কার্বন নিঃসরণ বাড়িয়ে তোলে। জলবায়ু পরিবর্তনের বাস্তবতায় সফটওয়্যার কোডের দক্ষতা কেবল বুদ্ধিবৃত্তিক বিলাসিতা নয়, এটি এক নৈতিক দায়িত্ব। যখন একটি অ্যাপ্লিকেশন মাত্র ৪ মিলি-সেকেন্ডে বুট হতে পারে এবং সামান্য সার্ভার মেমোরিতে একটানা সাত বছর কোনো ক্র্যাশ ছাড়া চলতে পারে, তখন আমরা প্রযুক্তির মানবিক মর্যাদা রক্ষা করতে সক্ষম হই।

### ক্ষণিকের চমক নয়, শতবর্ষের স্থায়িত্ব

যেকোনো আর্কিটেকচারের শ্রেষ্ঠত্বের পরিচয় এতে নয় যে তা কত দ্রুত তৈরি করা গেল; বরং এর পরিচয় এতে যে দশ বছর পরও তা কত নির্বিঘ্নে ও প্রশান্তিতে কাজ চালিয়ে যেতে পারছে। প্লেইন টেক্সট, রিলেশনাল ইনভ্যারিয়েন্ট এবং মানুষের সহজে পড়ার উপযোগী ফরম্যাট প্রতিটি সাময়িক ফ্রেমওয়ার্ক ট্রেন্ডকে ছাড়িয়ে চিরকাল টিকে থাকে। আগামী প্রজন্মের ডিজিটাল দুনিয়া গড়ে তোলার ক্ষেত্রে আমাদের প্রধান লক্ষ্য হওয়া উচিত জটিলতা বৃদ্ধি নয়, বরং শান্ত, টেকসই ও চিরন্তন সারল্য।`,
    },
    category: {
      en: "Architecture",
      bn: "স্থাপত্যকলা",
    },
    edition: {
      en: "Autumn 2026 Edition",
      bn: "শরৎ ২০২৬ সংস্করণ",
    },
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
    imageURL: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-28T08:00:00Z",
    author: {
      name: {
        en: "Rifat Sarker",
        bn: "রিফাত সরকার",
      },
      location: {
        en: "Dhaka Bureau",
        bn: "ঢাকা ব্যুরো",
      },
      role: {
        en: "Lead Editor",
        bn: "প্রধান সম্পাদক",
      },
    },
    readTime: {
      en: "7 min read",
      bn: "৭ মিনিট পড়ার সময়",
    },
    words: 860,
  },
  {
    _id: "essay-02",
    kicker: {
      en: "REGIONAL ARCHITECTURE & HERITAGE",
      bn: "বাংলা স্থাপত্য ও নদীমাতৃক ঐতিহ্য",
    },
    title: {
      en: "Memory and Waterways: The Architectural Restoration of Dhaka's Lost Canals",
      bn: "স্মৃতি ও স্থপতি: ঢাকা শহরের বিলুপ্ত জলপথের স্থাপত্যিক পুনর্নির্মাণ",
    },
    sdesc: {
      en: "A comprehensive investigation into the forgotten canal networks of old Bengal and how modern urban resilience depends upon daylighting buried waterways.",
      bn: "একটি নদীর ওপর দাঁড়িয়ে গড়ে ওঠা প্রাচীন শহরের হারিয়ে যাওয়া খাল ও প্রাকৃতিক ড্রেনেজ ব্যবস্থার স্থাপত্যিক পুনর্মূল্যায়ন ও আগামী দিনের নগর পরিকল্পনা।",
    },
    ldesc: {
      en: `Dhaka was never designed to be an arid land city; it was conceived and engineered as an amphibious aquatic metropolis, cradled between the Buriganga, Shitalakshya, Turag, and Balu rivers. Historical cartography from the 18th century reveals a labyrinth of over forty-three interconnected canals (*khals*) that functioned simultaneously as hydraulic arteries, commercial highways, and natural thermal regulators for the humid Bengal delta.

### The Concrete Encapsulation of Natural Rivers

The rapid, uncoordinated urbanization of the late twentieth century witnessed the systematic burial of these waterways beneath concrete box culverts, landfills, and encroaching commercial developments. Dholai Khal, Begunbari Khal, and Segunbagicha Khal—once navigable channels where cargo boats laden with aromatic rice, mustard seed, and river timber docked directly at neighborhood bazaars—were converted into subterranean sewers or asphalt roads.

The ecological consequence has been catastrophic: modern Dhaka experiences severe monsoon waterlogging not because the volume of rainfall has exponentially increased, but because the city has severed its own pulmonary system. Rainwater that once dispersed harmlessly across tidal marshes and retention wetlands is now trapped against impenetrable concrete surfaces.

### Daylighting: Global Lessons Applied to the Delta

In Seoul, the Cheonggyecheon restoration project dismantled an elevated concrete highway to revive an ancient stream flowing through the city center, transforming the urban heat island effect and rejuvenating public life. For Dhaka, however, daylighting the canals is not merely an aesthetic or recreational choice—it is an existential imperative for flood survival in the era of escalating climatic volatility.

Architectural restoration in the delta requires an integrated approach that respects traditional earthen embankments, native riparian vegetation (*vetiver grass* and aquatic reeds that stabilize soil without concrete retaining walls), and public promenades that return the waterfront to pedestrians. By establishing continuous ecological corridors, we simultaneously clean greywater runoff and reintroduce micro-climate cooling to dense urban neighborhoods.

### The Architecture of Coexistence

We must abandon the colonial illusion that humanity can permanently subjugate water through rigid dykes and concrete channels. The ancient builders of Bengal built on earthen mounds, celebrated seasonal flood pulses (*barsha*), and allowed the water to flow where it needed to flow. True architectural intelligence lies not in defying the delta's hydraulic laws, but in designing spaces that breathe in harmony with them.`,
      bn: `ঢাকা মূলত কোনো শুষ্ক সমভূমির শহর ছিল না; এটি ছিল এক জলজ শহর, বুড়িগঙ্গা, শীতলক্ষ্যা, তুরাগ ও বালু নদীর কোলে গড়ে ওঠা এক নদীমাতৃক মহানগরী। অষ্টাদশ শতাব্দীর প্রাচীন মানচিত্রের দিকে তাকালে দেখা যায় তেতাল্লিশটিরও বেশি সংযুক্ত খালের এক বিস্ময়কর জলপথ নেটওয়ার্ক, যা এই অঞ্চলের ব্যবসা-বাণিজ্য, যোগাযোগ এবং প্রাকৃতিক তাপমাত্রা নিয়ন্ত্রণের প্রাকৃতিক ফুসফুস হিসেবে কাজ করত।

### কংক্রিটের তলায় চাপা পড়া জীবন্ত জলপথ

বিংশ শতাব্দীর শেষভাগে অপরিকল্পিত নগরায়নের নামে এই সমৃদ্ধ জলপথগুলোকে একে একে কংক্রিটের বক্স কালভার্ট, বালু ভরাট এবং অবৈধ দখলের মাধ্যমে হত্যা করা হয়। ধোলাই খাল, বেগুনবাড়ি খাল কিংবা সেগুনবাগিচা খাল—যেখানে একসময় সুন্দরবনের কাঠ আর দূর-দূরান্তের ধান-পাটের নৌকা সরাসরি শহরের মোকামে এসে ভিড়ত—সেগুলোকে রূপান্তর করা হলো ভূগর্ভস্থ বদ্ধ নর্দমা আর পিচঢালা রাজপথে।

এর পরিবেশগত পরিণতি আজ চরম বিপর্যয় ডেকে এনেছে: সামান্য বৃষ্টিতেই আধুনিক ঢাকা শহর ডুবে যায় কেবল এই কারণে নয় যে বৃষ্টিপাত বেড়েছে, বরং এই কারণে যে শহর তার নিজস্ব জল নিষ্কাশনের ফুসফুসকে নিজ হাতে শ্বাসরোধ করে মেরে ফেলেছে।

### ডেইলাইটিং: বিশ্ব অভিজ্ঞতা ও বঙ্গীয় বাস্তবতা

সিউল শহরে যেভাবে চেওংগেচন নদীকে কংক্রিটের এলিভেটেড হাইওয়ে ভেঙে পুনরায় মুক্ত আকাশের নিচে ফিরিয়ে আনা হয়েছিল (যাকে আরবান প্ল্যানিংয়ের ভাষায় বলা হয় *Daylighting*), ঢাকা শহরের খালগুলো উদ্ধারের ক্ষেত্রেও আজ সেই একই সাহসী সিদ্ধান্ত গ্রহণ করা সময়ের দাবি। তবে আমাদের মনে রাখতে হবে, কেবল কংক্রিটের কৃত্রিম পার বাঁধলে নদী বাঁচবে না; দরকার স্থানীয় প্রজাতি যেমন বিন্না ঘাস এবং জলজ উদ্ভিদের মাধ্যমে প্রাকৃতিক জীববৈচিত্র্য ফিরিয়ে আনা।

### পানির সাথে সহাবস্থানের স্থাপত্য

পানির শক্তিকে কৃত্রিম বাঁধ বা কালভার্ট দিয়ে চিরতরে আটকে রাখা যায় না। প্রাচীন বাংলার স্থাপত্যে পানিকে কখনো শত্রু ভাবা হয়নি, বরং বর্ষার প্লাবনকে বরণ করে নিয়ে মাটির উঁচু ভিটায় বসতি গড়ার ঐতিহ্য ছিল। নদী ও খালকে তার আপন গতিতে বইতে দিয়ে তার তীর ঘেঁষে সবুজ পাবলিক স্পেস গড়ে তোলাই আগামী দিনের ঢাকার একমাত্র টেকসই ভবিষ্যৎ।`,
    },
    category: {
      en: "Heritage",
      bn: "ঐতিহ্য ও নগর",
    },
    edition: {
      en: "Issue 14",
      bn: "১৪তম সংখ্যা",
    },
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80",
    imageURL: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-25T14:30:00Z",
    author: {
      name: {
        en: "Dr. Sajed Rahman",
        bn: "ড. সাজেদ রহমান",
      },
      location: {
        en: "Dhaka",
        bn: "ঢাকা",
      },
      role: {
        en: "Urban Planner & Historian",
        bn: "নগর পরিকল্পনাবিদ ও ইতিহাস গবেষক",
      },
    },
    readTime: {
      en: "8 min read",
      bn: "৮ মিনিট পড়ার সময়",
    },
    words: 910,
  },
  {
    _id: "essay-03",
    kicker: {
      en: "COMPUTATIONAL LINGUISTICS & COGNITION",
      bn: "কম্পিউটেশনাল ভাষাবিজ্ঞান ও এআই",
    },
    title: {
      en: "Syntactic Dignity: Preserving Nuance in Bangla Large Language Corpora",
      bn: "ভাষার মর্যাদা: কৃত্রিম বুদ্ধিমত্তা মডেলে বাংলা ভাষার ভাবগাম্ভীর্য ও ব্যাকরণগত সূক্ষ্মতা",
    },
    sdesc: {
      en: "Why machine translation fails at poetic register and the engineering challenge of building tokenizers that understand Bengali morphology.",
      bn: "সাধারণ মেশিন ট্রান্সলেশন কেন বাংলার আবেগ ও রূপক ধরতে পারে না এবং জটিল শব্দমূল বিভাজনের জন্য আধুনিক টোকেনাইজার আর্কিটেকচার।",
    },
    ldesc: {
      en: `Language is not a sterile statistical collection of tokens; it is an organic sediment of human consciousness, cultural temperament, and collective memory. When global artificial intelligence laboratories scrape the open internet to assemble multilingual training sets, non-Latin scripts are routinely subjected to a subtle linguistic violence: tokenization fragmentation.

### The Sub-word Penalty of Non-Latin Scripts

In byte-pair encoding (BPE) algorithms trained predominantly on Western corpora, a single English word typically corresponds to one or two tokens. A Bengali word possessing identical semantic density, however, frequently shatters into seven to ten distinct character fragments or unicode byte slices. The implications for computational economics and model reasoning are staggering:

1. **Context Window Degradation:** A model with an 8,000 token limit can process 6,000 words of English text, but fewer than 1,200 words of Bengali.
2. **Attention Dilution:** Multi-head attention mechanisms must allocate precious probability mass across fragmented vowel diacritics (*kar* and *fola*) rather than substantive lexical roots.
3. **Inference Latency:** Generation speeds are cut to a fraction of their standard velocity, creating an artificial second-class cognitive tier.

### Morphological Awareness in Tokenizer Design

To restore syntactic dignity to the Bengali digital corpus, our computational architecture must embrace the agglutinative complexity of Indo-Aryan morphology. Words such as *'বিদ্যালয়গুলোতে'* (in the schools) cannot be treated as random byte sequences; they consist of a base lexeme (*বিদ্যালয়*), a pluralizing classifier (*-গুলো*), and a locative inflectional suffix (*-তে*).

By training custom morphological sub-word segmenters that respect *sandhi* (phonological fusion) and *samasa* (compound formation), we reduce average token counts by up to 58%, instantly doubling the effective reasoning horizon of language models operating in the vernacular.

### Culture Beyond Translation

True linguistic AI does not merely translate English concepts into transliterated vernacular; it must understand the philosophical concepts indigenous to the culture—the profound melancholy of *'অভিমান'* (*abhiman*), the quiet nostalgia of *'স্মৃতিকাতরতা'*, and the rhythmic cadence of traditional *Purbabanga geetika*. Technology should not flatten our cultural heritage into homogeneous corporate prose; it must serve as an amplifier of human poetic truth.`,
      bn: `ভাষা কোনো যান্ত্রিক টোকেনের নিছক গাণিতিক বিন্যাস নয়; ভাষা হলো একটি জাতির সহস্রাব্দের আবেগ, মননশীলতা এবং ঐতিহাসিক অভিজ্ঞতার জীবন্ত প্রতিফলন। বর্তমান বিশ্বে যখন গ্লোবাল এআই কোম্পানিগুলো ইন্টারনেটের তথ্য দিয়ে কৃত্রিম বুদ্ধিমত্তা মডেল প্রশিক্ষণ দেয়, তখন বাংলা ভাষার মতো সমৃদ্ধ ও জটিল স্ক্রিপ্টগুলো এক নীরব বৈষম্যের শিকার হয়—যাকে বলা যায় টোকেনাইজেশনের অসম খণ্ডায়ন।

### সাব-ওয়ার্ড ফ্র্যাগমেন্টেশন ও বাংলা ভাষার বৈষম্য

পাশ্চাত্যের ভাষাগুলোর জন্য অপ্টিমাইজ করা সাধারণ টোকেনাইজারে একটি ইংরেজি শব্দের জন্য গড়ে একটি বা দুটি টোকেন লাগে। কিন্তু একই অর্থ বহনকারী একটি বাংলা শব্দকে ভাঙতে গিয়ে অ্যালগরিদম তাকে সাত থেকে দশটি বিচ্ছিন্ন ইউনিকোড বাইটে রূপান্তর করে ফেলে। এর ফলে সরাসরি তিনটি মারাত্মক ক্ষতি হয়:

১. **কনটেক্সট উইন্ডোর সীমাবদ্ধতা:** আট হাজার টোকেনের একটি মডেলে যেখানে ছয় হাজার ইংরেজি শব্দ এটে যায়, সেখানে বাংলা শব্দ ধরে মাত্র বারো শত।
২. **অ্যাটেনশন বিভ্রান্তি:** এআই-এর নিউরাল নেটওয়ার্ক গভীর অর্থের চেয়ে যুক্তাক্ষর ও কার-ফলার টুকরো মেলাতেই বেশি ব্যস্ত হয়ে পড়ে।
৩. **গতি ও খরচের বৈষম্য:** বাংলা ভাষায় প্রম্পট দিলে এআই সার্ভারে চারগুণ বেশি কম্পিউট পাওয়ার ও সময় খরচ হয়।

### রূপতাত্ত্বিক সচেতন টোকেনাইজারের প্রয়োজনীয়তা

বাংলা ভাষার ব্যাকরণগত মর্যাদা ফিরিয়ে আনতে হলে আমাদের টোকেনাইজারগুলোকে বিভক্তি, সন্ধি ও সমাসের নিয়মের সাথে পরিচিত করতে হবে। যেমন 'বিদ্যালয়গুলোতে' শব্দটিকে এলোমেলো অক্ষরের সমষ্টি না দেখে তার মূল শব্দ (বিদ্যালয়), বহুবচন নির্দেশক (গুলো) এবং অধিকরণ কারকের বিভক্তি (তে) আলাদা করে চেনার সক্ষমতা থাকতে হবে।

আমরা যখন ভাষাতাত্ত্বিক নিয়ম মেনে কাস্টম টোকেনাইজার ডিজাইন করি, তখন টোকেনের সংখ্যা অর্ধেকেরও বেশি কমে আসে। ফলে কম মেমোরি ও কম খরচে বাংলা এআই মডেলগুলো বহুগুণ বেশি গভীর ও যুক্তিসঙ্গত উত্তর প্রদান করতে সক্ষম হয়।

### অনুবাদের বাইরে ভাষার নিজস্ব সত্তা

মডেল কেবল ইংরেজি প্রম্পটকে অনুবাদ করে দিলেই ভাষার মুক্তি আসে না; আমাদের লক্ষ্য হওয়া উচিত এমন প্রযুক্তি নির্মাণ করা যা 'অভিমান', 'আড্ডা' কিংবা 'বর্ষার গান'-এর মতো দেশীয় মনস্তাত্ত্বিক ভাবগুলোকে তার নিজস্ব অনুভূতি সহ উপলব্ধি করতে পারে। প্রযুক্তি যেন আমাদের ভাষাকে যান্ত্রিক ও প্রাণহীন করে না তোলে, বরং আমাদের ভাবনার গভীরতাকে বিশ্বমঞ্চে অনন্য মর্যাদায় প্রতিষ্ঠিত করে।`,
    },
    category: {
      en: "Philosophy",
      bn: "দর্শন ও ভাষা",
    },
    edition: {
      en: "Research Monograph 03",
      bn: "গবেষণা মনোগ্রাফ ০৩",
    },
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=80",
    imageURL: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=80",
    date: "2026-10-22T19:00:00Z",
    author: {
      name: {
        en: "Nusrat Jahan",
        bn: "নুসরাত জাহান",
      },
      location: {
        en: "London / Dhaka",
        bn: "লন্ডন / ঢাকা",
      },
      role: {
        en: "Computational Linguist",
        bn: "কম্পিউটেশনাল ভাষাতত্ত্ববিদ",
      },
    },
    readTime: {
      en: "9 min read",
      bn: "৯ মিনিট পড়ার সময়",
    },
    words: 980,
  },
];

