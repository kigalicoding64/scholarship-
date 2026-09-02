export type ScholarshipBenefitItem = {
  key: string;
  title: string;
  coverage_scope: string;
  estimated_value: string;
  how_disbursed: string;
  description: string;
  icon_name: string;
};

export const STANDARD_SCHOLARSHIP_BENEFITS: ScholarshipBenefitItem[] = [
  {
    key: "tuition",
    title: "100% Full Tuition Fee Exemption",
    coverage_scope:
      "All academic terms, semester credits, registration fees, and examination charges.",
    estimated_value: "$25,000 – $75,000 / year",
    how_disbursed:
      "Direct institutional transfer — credited directly to your university student ledger each term.",
    description:
      "You pay zero out-of-pocket tuition fees to the university. The scholarship foundation or government bilateral agreement settles the full institutional tuition and laboratory fees directly with the bursar.",
    icon_name: "GraduationCap",
  },
  {
    key: "stipend",
    title: "Monthly Living Allowance / Maintenance Stipend",
    coverage_scope:
      "Accommodation, groceries, local utilities, phone/internet, and personal daily expenses.",
    estimated_value: "$900 – $2,500 / month (tax-exempt)",
    how_disbursed:
      "Direct electronic wire / ACH transfer to your local student bank account on the 1st of every month.",
    description:
      "A monthly cost-of-living stipend adjusted to the local purchasing power of your study city, ensuring you never have to work full-time just to pay rent and food.",
    icon_name: "Wallet",
  },
  {
    key: "airfare",
    title: "Roundtrip Economy Flights & Travel Grants",
    coverage_scope:
      "Home country to destination airport at program commencement + return flight upon degree completion.",
    estimated_value: "$1,200 – $2,800 total",
    how_disbursed:
      "Booked directly through designated travel management agency or reimbursed upon ticket invoice upload.",
    description:
      "Full economy airfare with generous international baggage allowance (often up to 2 x 23kg bags) so you can relocate seamlessly.",
    icon_name: "Plane",
  },
  {
    key: "insurance",
    title: "Comprehensive Health, Medical & Accident Insurance",
    coverage_scope:
      "General practitioner visits, hospitalization, emergency trauma, mental health, and prescription drugs.",
    estimated_value: "$600 – $1,800 / year",
    how_disbursed:
      "Policy registered directly with the host nation's national or university health provider (e.g., NHS IHS, TK, UHIP).",
    description:
      "Full medical peace of mind. Covers doctor consultations, emergency surgery, hospital stays, and prescription medicines throughout your entire duration of study.",
    icon_name: "ShieldCheck",
  },
  {
    key: "settlement",
    title: "Settlement / Relocation Allowance",
    coverage_scope:
      "Warm clothing, initial apartment deposit, bedding, kitchen essentials, and orientation expenses.",
    estimated_value: "$500 – $1,500 (one-time on arrival)",
    how_disbursed:
      "Disbursed immediately in your first monthly stipend payment or as an emergency cash advance upon arrival.",
    description:
      "A one-off upfront grant provided upon landing in your study destination to help you furnish your room, purchase seasonal winter attire, and settle into student life.",
    icon_name: "Home",
  },
  {
    key: "research",
    title: "Research, Fieldwork & Conference Grants",
    coverage_scope:
      "Laboratory consumables, survey fieldwork travel, academic book allowances, and conference registrations.",
    estimated_value: "$1,000 – $5,000 / year",
    how_disbursed: "Claimed through departmental grant expense reports with advisor sign-off.",
    description:
      "Dedicated funding for Master's and PhD students to attend leading international conferences, present papers, and conduct field experiments without dipping into personal savings.",
    icon_name: "BookOpen",
  },
  {
    key: "laptop",
    title: "Laptop & Digital Hardware Subsidy",
    coverage_scope:
      "High-performance laptop, technical accessories, and specialized software licenses.",
    estimated_value: "$800 – $1,500 (one-time)",
    how_disbursed:
      "Physical device provided during orientation or reimbursed upon submitting receipt of purchase.",
    description:
      "Ensures every scholar has access to high-performance computing hardware required for modern simulations, coding, data analysis, and essay writing.",
    icon_name: "Laptop",
  },
  {
    key: "language",
    title: "Full Pre-Sessional Language Training",
    coverage_scope:
      "6 to 12 months intensive host language preparatory course (e.g. Korean, Japanese, Mandarin, French, German).",
    estimated_value: "$4,000 – $10,000 value",
    how_disbursed:
      "Conducted at designated national language institutes with 100% tuition and living stipend paid.",
    description:
      "For government scholarships like GKS (Korea), MEXT (Japan), and CSC (China), 1 full year of dedicated language immersion is funded prior to your major degree classes.",
    icon_name: "Globe",
  },
];

export type OfferRoadmapStep = {
  step_number: string;
  stage: string;
  timeline: string;
  action_required: string;
  common_pitfalls: string;
  official_documents: string[];
};

export const OFFER_ACCEPTANCE_ROADMAP: OfferRoadmapStep[] = [
  {
    step_number: "01",
    stage: "Conditional vs. Unconditional Offer Letter Evaluation",
    timeline: "Days 1–7 after decision",
    action_required:
      "Review the university admission letter carefully. If 'Conditional', note exact pending conditions (e.g. submitting final degree certificate, proving English proficiency, or submitting attested transcripts). If 'Unconditional', you have met all academic requirements.",
    common_pitfalls:
      "Failing to fulfill conditional requirements before the university's strict document cutoff date.",
    official_documents: [
      "Official University Offer Letter (Conditional / Unconditional)",
      "Scholarship Provision Award Notification",
    ],
  },
  {
    step_number: "02",
    stage: "Formal Acceptance & Financial Guarantee Submission",
    timeline: "Within 14–21 days of offer",
    action_required:
      "Sign and return your formal acceptance slip through the university admissions portal. Upload your official Scholarship Guarantee Letter so the university registrar waives the mandatory tuition deposit (e.g. £2,000–$5,000 deposit fee).",
    common_pitfalls:
      "Missing the acceptance deadline, which causes the university portal to automatically reallocate your slot to waitlisted applicants.",
    official_documents: [
      "Signed Offer Acceptance Form",
      "Official Third-Party Financial Sponsor Guarantee",
    ],
  },
  {
    step_number: "03",
    stage: "Visa Endorsement Document Issuance",
    timeline: "2 to 3 months before program start",
    action_required:
      "The university verifies your passport and financial guarantee, then issues your official immigration document: UK (CAS number), USA (Form I-20), Canada (LOA & PAL), Australia (eCoE), Germany (Zulassungsbescheid).",
    common_pitfalls:
      "Mismatched passport spelling or missing middle names between passport and CAS/I-20 document.",
    official_documents: [
      "Confirmation of Acceptance for Studies (UK CAS)",
      "Certificate of Eligibility Form I-20 / DS-2019 (USA)",
      "Electronic Confirmation of Enrolment (eCoE - Australia)",
    ],
  },
  {
    step_number: "04",
    stage: "Student Visa Filing & Biometric Appointment",
    timeline: "6 to 10 weeks before departure",
    action_required:
      "Submit the official online visa application to the host country's immigration department. Attach your CAS/I-20, scholarship award letter, TB/medical clearance, and police certificate. Attend your biometric enrollment at VFS/TLS/embassy.",
    common_pitfalls:
      "Submitting blurry scans or uncertified translations of non-English/non-French certificates.",
    official_documents: [
      "Visa Application Submission Summary",
      "Biometric Appointment Confirmation",
      "Tuberculosis & Medical Clearance Certificate",
    ],
  },
  {
    step_number: "05",
    stage: "Flight Booking, Accommodation & Pre-Departure Briefing",
    timeline: "3 to 4 weeks before departure",
    action_required:
      "Once your visa vignette / eVisa is stamped, coordinate flight bookings through your scholarship officer. Confirm your on-campus dormitory room key collection date and register for university orientation week.",
    common_pitfalls:
      "Arriving earlier than permitted by your student visa validity window (most countries permit arrival up to 30 days before classes start).",
    official_documents: [
      "Stamped Visa Vignette / Digital eVisa Share Code",
      "Confirmed E-Ticket Airline Itinerary",
      "University Dormitory Tenancy Agreement",
    ],
  },
];
