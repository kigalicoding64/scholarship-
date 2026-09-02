export type DegreeLevelInfo = {
  id: string;
  name: string;
  duration: string;
  ects_credits: string;
  entry_requirements: string;
  gpa_threshold: string;
  language_standard: string;
  funding_models: string[];
  career_outcomes: string;
  typical_stipend: string;
  ideal_for: string;
  key_disciplines: string[];
  tips_for_acceptance: string[];
};

export const DEGREE_LEVEL_DETAILS: DegreeLevelInfo[] = [
  {
    id: "undergraduate",
    name: "Undergraduate (Bachelor's Degrees: BSc, BA, BEng, LLB)",
    duration: "3 to 4 Years (Full-Time)",
    ects_credits: "180 – 240 ECTS / 120 US Semester Credits",
    entry_requirements:
      "High School Diploma, International Baccalaureate (IB minimum 32–38 points), Cambridge A-Levels (AAA – ABB), or National Senior Secondary Leaving Certificate with distinction.",
    gpa_threshold:
      "Minimum 3.0 / 4.0 or equivalent (80%+ in secondary school marks). Top universities require 3.5+ (85%+).",
    language_standard:
      "IELTS 6.0–6.5 (minimum 6.0 in each section), TOEFL iBT 80–90, or Duolingo English Test (DET 115+). English-medium waivers applicable.",
    funding_models: [
      "100% Full-Ride Tuition Waivers (e.g., Lester B. Pearson, Harvard Need-Blind, GKS Undergraduate)",
      "University Merit Scholarships & Chancellor Awards",
      "Government Bilateral Grants & Mastercard Foundation Undergraduate Awards",
    ],
    career_outcomes:
      "Direct entry into high-growth corporate roles, software engineering, financial analyst positions, research internships, or direct progression to postgraduate Master's.",
    typical_stipend: "$800 – $1,500 / month (or fully provided campus housing + catered meals)",
    ideal_for:
      "High school graduates and gap-year scholars looking to gain foundational global academic training with comprehensive financial coverage.",
    key_disciplines: [
      "Computer Science & Software Engineering",
      "Biomedical Sciences & Pre-Med",
      "Business Administration & Economics",
      "Mechanical & Civil Engineering",
      "International Relations & Law",
    ],
    tips_for_acceptance: [
      "Highlight leadership roles, community impact projects, and Olympiad or science fair achievements.",
      "Craft a compelling Personal Statement focusing on intellectual curiosity and future mission.",
      "Request letters of recommendation from high school teachers who can speak to analytical rigor and resilience.",
    ],
  },
  {
    id: "masters",
    name: "Master's Degrees (MSc, MA, MRes, MEng, LLM, MBA)",
    duration: "1 to 2 Years (Full-Time)",
    ects_credits: "60 – 120 ECTS / 30 – 48 US Credits",
    entry_requirements:
      "Recognized Bachelor's degree (First Class Honours or Upper Second Class / 2:1 equivalency). Professional portfolio or work experience required for MBA/Executive tracks.",
    gpa_threshold:
      "Minimum 3.2 / 4.0 or Upper Second Class (65%+ UK / B+ equivalent). Highly competitive programs target 3.6+ / 4.0.",
    language_standard:
      "IELTS 6.5–7.5 (no component below 6.0), TOEFL iBT 90–105. Medium of Instruction (MOI) waivers broadly accepted across EU and UK universities.",
    funding_models: [
      "Prestigious Global Fellowships (Chevening, DAAD Helmut-Schmidt, Erasmus Mundus Joint Masters, Australia Awards)",
      "Institutional Graduate Fellowships & Teaching Assistantships",
      "Mastercard Foundation Graduate Scholarships",
    ],
    career_outcomes:
      "Rapid promotion to senior technical and managerial roles, specialized clinical and laboratory research, international policy advisory, and PhD candidacy.",
    typical_stipend:
      "$1,100 – $2,200 / month (covers private/dorm living expenses, transport, and study materials)",
    ideal_for:
      "Early-to-mid career professionals and recent graduates aiming to specialize, transition industries, or pivot into international leadership.",
    key_disciplines: [
      "Artificial Intelligence & Machine Learning",
      "Global Health, Epidemiology & Public Health",
      "Finance, FinTech & Strategic Management",
      "Renewable Energy & Climate Policy",
      "Data Science & Advanced Analytics",
    ],
    tips_for_acceptance: [
      "Tailor your Statement of Purpose (SOP) directly to 2–3 faculty researchers or module specializations.",
      "Quantify your professional or research achievements with measurable metrics.",
      "Submit official English Medium of Instruction (MOI) certificates from your undergraduate registrar if bypassing IELTS.",
    ],
  },
  {
    id: "phd",
    name: "Doctoral Programs (PhD, DPhil, Dr. rer. nat., DBA)",
    duration: "3 to 4 Years (Funded Research Candidacy)",
    ects_credits: "180 – 240 ECTS (Dissertation & Defense)",
    entry_requirements:
      "Relevant Master's degree (Merit/Distinction) or exceptional First-Class Bachelor's with proven research outputs (publications, conference presentations, or thesis).",
    gpa_threshold:
      "Minimum 3.5 / 4.0 or First Class (70%+ UK / A- equivalent). High emphasis on research proposal quality over raw grades.",
    language_standard:
      "IELTS 7.0+ or TOEFL 100+. Waived with prior English-taught Master's thesis.",
    funding_models: [
      "Full Doctoral Research Assistantships (Full Tuition Waiver + Living Salary/Stipend)",
      "National Research Councils (e.g. UKRI, German DFG, Swiss NSF, SINGA Singapore)",
      "University Presidential & Trust Fellowships (Gates Cambridge, Clarendon Oxford)",
    ],
    career_outcomes:
      "Tenure-track university professorships, Principal Investigator (PI) research roles, industrial R&D leadership at Google/OpenAI/Pharma, and global think-tank advisory.",
    typical_stipend:
      "$1,800 – $3,600 / month ($22,000 – $45,000 annual tax-exempt research stipend + conference travel grants)",
    ideal_for:
      "Scholars dedicated to advancing frontiers of knowledge, developing patents, publishing high-impact peer-reviewed literature, and leading scientific teams.",
    key_disciplines: [
      "Quantum Information & Deep Learning Architectures",
      "Bioengineering, Genomics & Cancer Therapeutics",
      "Economics, Econometrics & Development Finance",
      "Materials Science & Semiconductor Nanotechnology",
      "Global Governance, Cyber Law & International Security",
    ],
    tips_for_acceptance: [
      "Contact potential PhD supervisors 4–6 months in advance with a 3–5 page tailored Research Proposal.",
      "Reference specific papers authored by the lab PI and articulate how your methodology expands their ongoing research grants.",
      "Secure academic recommendation letters from professors who have directly supervised your research.",
    ],
  },
  {
    id: "postdoc",
    name: "Postgraduate Fellowships & Postdoctoral Residencies",
    duration: "6 Months to 2 Years",
    ects_credits: "Advanced Research Appointment",
    entry_requirements:
      "Completed PhD within the last 5 years with an active track record of peer-reviewed journal publications and clear research agenda.",
    gpa_threshold:
      "Evaluated on publication impact factor, citations, and grant-winning potential.",
    language_standard: "Fluent professional academic English proficiency.",
    funding_models: [
      "Marie Skłodowska-Curie Actions (MSCA Postdoctoral Fellowships)",
      "Humboldt Research Fellowships (Germany)",
      "Fulbright Scholar Program & NIH Postdoctoral Fellowships (USA)",
    ],
    career_outcomes:
      "Fast-track to Associate Professorship, laboratory establishment, start-up spinout foundation, and government chief scientist appointments.",
    typical_stipend:
      "$3,500 – $6,000 / month ($45,000 – $75,000 annual research salary + family mobility allowance)",
    ideal_for:
      "Doctoral graduates seeking international mobility, laboratory leadership, and interdisciplinary collaboration before launching independent labs.",
    key_disciplines: [
      "Computational Biology & Drug Discovery",
      "Clean Energy Technologies & Carbon Capture",
      "Ethics of Artificial Intelligence & Autonomous Systems",
      "Public Health Policy in the Global South",
    ],
    tips_for_acceptance: [
      "Collaborate directly with host institution Principal Investigators to co-author fellowship grant applications.",
      "Demonstrate knowledge transfer potential and collaborative networks across borders.",
    ],
  },
];
