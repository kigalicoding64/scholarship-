export type CountryLivingGuide = {
  country: string;
  flag: string;
  currency: string;
  currency_symbol: string;
  exchange_rate_usd: string;
  avg_monthly_cost: {
    dorm_rent: number;
    private_rent: number;
    groceries_food: number;
    public_transport: number;
    utilities_internet: number;
    health_insurance: number;
    personal_misc: number;
    total_estimated: number;
  };
  typical_scholarship_stipend: number;
  stipend_coverage_assessment: string;
  student_visa: {
    visa_type: string;
    processing_time: string;
    financial_proof_required: string;
    biometrics_medical: string;
    key_requirements: string[];
  };
  working_rights: {
    term_time_hours: string;
    holiday_hours: string;
    minimum_wage: string;
    post_study_work_visa: string;
    post_study_duration: string;
  };
  accommodation_tips: string[];
  arrival_checklist: string[];
};

export const COUNTRY_LIVING_GUIDES: Record<string, CountryLivingGuide> = {
  "United Kingdom": {
    country: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    currency_symbol: "£",
    exchange_rate_usd: "£1 = ~$1.28 USD",
    avg_monthly_cost: {
      dorm_rent: 650,
      private_rent: 850,
      groceries_food: 240,
      public_transport: 80,
      utilities_internet: 70,
      health_insurance: 65, // IHS is annual but amortized
      personal_misc: 140,
      total_estimated: 1245,
    },
    typical_scholarship_stipend: 1400, // Chevening / Commonwealth avg
    stipend_coverage_assessment:
      "112% of baseline student expenses (Generous surplus for regional cities, balanced in London).",
    student_visa: {
      visa_type: "UK Student Visa (formerly Tier 4)",
      processing_time: "3 to 4 Weeks (Priority 5 working days available)",
      financial_proof_required:
        "£1,023/month outside London or £1,334/month in London (covered by official scholarship letter)",
      biometrics_medical:
        "Tuberculosis (TB) test certificate + VFS / TLScontact biometrics appointment",
      key_requirements: [
        "Confirmation of Acceptance for Studies (CAS) issued by university registrar",
        "Official Scholarship Award Letter proving 100% tuition + maintenance allowance",
        "TB Test Clearance Certificate from approved clinic",
        "Valid international passport with at least 6 months validity",
        "Immigration Health Surcharge (IHS) reference number (often waived/reimbursed for grant holders)",
      ],
    },
    working_rights: {
      term_time_hours: "20 Hours / Week maximum during official term time",
      holiday_hours: "Full-Time (Up to 40 Hours / Week) during university vacations",
      minimum_wage: "£11.44 / hour (UK National Living Wage)",
      post_study_work_visa: "UK Graduate Route (PSW) — No job offer sponsorship needed",
      post_study_duration:
        "2 Years for Bachelor's & Master's; 3 Years for Doctoral / PhD graduates",
    },
    accommodation_tips: [
      "Apply for university halls of residence immediately upon receiving your CAS number.",
      "Most UK universities guarantee first-year university accommodation for international scholarship recipients.",
      "If renting privately, verify whether utilities (gas, electricity, water, Wi-Fi) are included in the weekly rent.",
      "Full-time international students are 100% exempt from UK Council Tax — obtain a student certificate from your registrar.",
    ],
    arrival_checklist: [
      "Collect your Biometric Residence Permit (BRP) or verify your digital eVisa share code within 10 days of arrival.",
      "Register with the National Health Service (NHS) at the nearest GP surgery.",
      "Open a UK student bank account (e.g., Monzo, Revolut, Barclays, HSBC) using your proof of address letter.",
      "Purchase a 16-25 Railcard to save 33% on all nationwide train travel.",
    ],
  },
  "United States": {
    country: "United States",
    flag: "🇺🇸",
    currency: "USD",
    currency_symbol: "$",
    exchange_rate_usd: "$1 = $1.00 USD",
    avg_monthly_cost: {
      dorm_rent: 900,
      private_rent: 1200,
      groceries_food: 350,
      public_transport: 90,
      utilities_internet: 110,
      health_insurance: 150,
      personal_misc: 200,
      total_estimated: 1800,
    },
    typical_scholarship_stipend: 2200, // Fulbright / PhD Assistantship avg
    stipend_coverage_assessment:
      "122% of student living costs (Generous research stipends in college towns; well-funded in cities).",
    student_visa: {
      visa_type: "F-1 Academic Student Visa or J-1 Exchange Visitor Visa",
      processing_time: "2 to 4 Weeks (Subject to US Embassy interview appointment availability)",
      financial_proof_required:
        "Form I-20 or DS-2019 specifying full funding guarantee across tuition and annual living",
      biometrics_medical: "US Embassy DS-160 interview + mandatory SEVIS I-901 fee payment ($350)",
      key_requirements: [
        "Certificate of Eligibility Form I-20 (F-1) or Form DS-2019 (J-1)",
        "SEVIS I-901 Fee Receipt ($350 F-1 / $220 J-1)",
        "Form DS-160 Nonimmigrant Visa Application Confirmation Page",
        "Official Institutional Fellowship / Teaching Assistantship Award Letter",
        "Valid passport with at least 6 months validity past intended stay",
      ],
    },
    working_rights: {
      term_time_hours: "20 Hours / Week on-campus (e.g. teaching assistant, research lab, library)",
      holiday_hours: "40 Hours / Week on-campus during summer and winter breaks",
      minimum_wage: "$15.00 – $18.00 / hour depending on State regulations",
      post_study_work_visa: "Optional Practical Training (OPT) / STEM OPT Extension",
      post_study_duration:
        "1 Year for non-STEM degrees; 3 Years (36 Months) for all STEM-designated degree programs",
    },
    accommodation_tips: [
      "On-campus graduate housing includes high-speed campus fiber, utilities, and proximity to research labs.",
      "If living off-campus, explore apartment communities near campus shuttle transit routes.",
      "Most US universities require mandatory university health insurance (waived only with equivalent comprehensive grant plans).",
    ],
    arrival_checklist: [
      "Check in with the university's Designated School Official (DSO) or International Student Services Office (ISSO).",
      "Apply for a Social Security Number (SSN) at the local Social Security Administration office if holding a TA/RA position.",
      "Open a US checking account (e.g., Chase, Bank of America) to set up direct electronic stipend deposits.",
      "Attend mandatory International Student Orientation week.",
    ],
  },
  Canada: {
    country: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    currency_symbol: "CAD $",
    exchange_rate_usd: "CAD $1 = ~$0.73 USD",
    avg_monthly_cost: {
      dorm_rent: 750,
      private_rent: 950,
      groceries_food: 320,
      public_transport: 110,
      utilities_internet: 80,
      health_insurance: 75,
      personal_misc: 165,
      total_estimated: 1500,
    },
    typical_scholarship_stipend: 1850, // Pearson / Vanier / Doctoral avg
    stipend_coverage_assessment:
      "123% of living expenses. Provides comfortable buffer for winter clothing and books.",
    student_visa: {
      visa_type: "Canadian Study Permit (with Electronic Travel Authorization - eTA or TRV)",
      processing_time: "4 to 8 Weeks",
      financial_proof_required:
        "CAD $20,635/year living expense benchmark + tuition coverage (fulfilled by scholarship letter)",
      biometrics_medical: "Immigration Medical Exam (IME) + VFS Biometrics collection",
      key_requirements: [
        "Official Letter of Acceptance (LOA) from a Designated Learning Institution (DLI)",
        "Provincial Attestation Letter (PAL) if applicable (Master's & PhD students are exempt)",
        "Official Scholarship Award Letter stating full tuition + living allowance guarantee",
        "Immigration Medical Exam clearance certificate",
        "Police Clearance Certificate from home country",
      ],
    },
    working_rights: {
      term_time_hours: "Up to 24 Hours / Week off-campus during regular academic semesters",
      holiday_hours: "Unlimited / Full-Time during scheduled academic breaks and summer",
      minimum_wage: "CAD $16.55 – $17.30 / hour depending on Province",
      post_study_work_visa:
        "Post-Graduation Work Permit (PGWP) with direct pathways to Express Entry & PR",
      post_study_duration: "Up to 3 Years for 2-year Master's and all Doctoral graduates",
    },
    accommodation_tips: [
      "University residence halls often include mandatory meal plans with halal, kosher, and vegetarian options.",
      "Off-campus student housing requires verifying heating and winter utility inclusion.",
      "Utilize student union tenant advisory services before signing standard provincial lease agreements.",
    ],
    arrival_checklist: [
      "Present LOA, scholarship letter, and visa approval letter to Canada Border Services Agency (CBSA) at airport to receive physical Study Permit.",
      "Apply for a Social Insurance Number (SIN) at Service Canada to enable payroll for stipend and part-time work.",
      "Enroll in the provincial university health insurance plan (UHIP / MSP / OHIP).",
      "Get a local Canadian telecom SIM card with data for winter weather and campus transit alerts.",
    ],
  },
  Germany: {
    country: "Germany",
    flag: "🇩🇪",
    currency: "EUR",
    currency_symbol: "€",
    exchange_rate_usd: "€1 = ~$1.08 USD",
    avg_monthly_cost: {
      dorm_rent: 380, // Studentenwerk subsidized
      private_rent: 580,
      groceries_food: 220,
      public_transport: 29, // Deutschlandticket student edition
      utilities_internet: 60,
      health_insurance: 125, // Public statutory insurance (TK / AOK)
      personal_misc: 120,
      total_estimated: 934,
    },
    typical_scholarship_stipend: 934, // Exact German Federal BAföG / DAAD monthly stipend rate
    stipend_coverage_assessment:
      "100% of standard German student living cost matrix. Highly economical with state-subsidized dining and transit.",
    student_visa: {
      visa_type: "National Visa for Study Purposes (Visum zu Studienzwecken - Category D)",
      processing_time: "4 to 6 Weeks",
      financial_proof_required:
        "Proof of €11,208/year (DAAD / Erasmus scholarship letter serves as full exemption from blocked account)",
      biometrics_medical: "German Embassy or Visa Application Center (VFS) biometric appointment",
      key_requirements: [
        "Zulassungsbescheid (Official University Admission Letter) or Conditional Admission",
        "DAAD / Foundation Scholarship Grant Certificate (Stipendienurkunde)",
        "Proof of statutory health insurance coverage (e.g. Techniker Krankenkasse - TK / AOK)",
        "Academic certificates with certified German or English translations",
        "Valid passport with at least 2 empty pages",
      ],
    },
    working_rights: {
      term_time_hours:
        "140 full days or 280 half days per calendar year (Studentische Nebentätigkeit)",
      holiday_hours: "Full-time work allowed within the annual 140-day quota",
      minimum_wage: "€12.41 / hour (German National Statutory Minimum Wage)",
      post_study_work_visa:
        "German 18-Month Jobseeker Residence Permit (Aufenthaltserlaubnis zur Arbeitsplatzsuche)",
      post_study_duration:
        "18 Months to find graduate employment, with fast-track to permanent EU Blue Card in 21–27 months",
    },
    accommodation_tips: [
      "Apply to the local Studentenwerk (Student Services Organization) dormitory waitlist the moment you submit your application.",
      "Consider a 'WG' (Wohngemeinschaft - shared student flat) which is the most popular and social housing option in Germany.",
      "Ensure the landlord provides the 'Wohnungsgeberbestätigung' required for mandatory municipal city registration.",
    ],
    arrival_checklist: [
      "Complete mandatory City Registration (Anmeldung) at the local Bürgeramt / Einwohnermeldeamt within 14 days.",
      "Activate your German statutory health insurance (TK, Barmer, or AOK).",
      "Open a free German student current account (Girokonto) with N26, Deutsche Bank, or Sparkasse.",
      "Purchase the subsidized €29/month Deutschlandticket for nationwide trains, metros, and buses.",
    ],
  },
  "South Korea": {
    country: "South Korea",
    flag: "🇰🇷",
    currency: "KRW",
    currency_symbol: "₩",
    exchange_rate_usd: "₩1,000 = ~$0.74 USD",
    avg_monthly_cost: {
      dorm_rent: 320, // ~₩430,000
      private_rent: 480, // One-room/Gosiwon
      groceries_food: 260,
      public_transport: 55,
      utilities_internet: 45,
      health_insurance: 55, // NHIS mandatory
      personal_misc: 110,
      total_estimated: 845,
    },
    typical_scholarship_stipend: 1000, // GKS: ₩1,000,000 - ₩1,500,000/mo
    stipend_coverage_assessment:
      "118% of student living expenses. Includes free campus dormitories during language prep year.",
    student_visa: {
      visa_type: "D-2 Student Visa (D-2-1 to D-2-6) or D-4-1 Korean Language Trainee Visa",
      processing_time: "2 to 3 Weeks",
      financial_proof_required:
        "Certificate of Admission (CoA) + NIIED GKS Scholarship Letter (exempt from bank balance)",
      biometrics_medical: "Korean Embassy submission + Tuberculosis screening certificate",
      key_requirements: [
        "Official Certificate of Admission (Standard Admission Letter) issued by Korean University",
        "National Institute for International Education (NIIED) GKS Invitation Letter",
        "Tuberculosis (TB) test result from designated embassy hospital",
        "Apostilled / Consular Verified high school or degree graduation certificates",
      ],
    },
    working_rights: {
      term_time_hours:
        "20–25 Hours / Week with immigration office permission (TOPIK level dependent)",
      holiday_hours: "Unlimited hours during official summer and winter vacations",
      minimum_wage: "₩9,860 / hour (South Korean statutory minimum wage)",
      post_study_work_visa: "D-10-1 Jobseeker Visa leading to E-7 Professional Employment Visa",
      post_study_duration:
        "Up to 2 Years to seek employment in Korea's advanced tech and manufacturing sectors",
    },
    accommodation_tips: [
      "GKS scholars are allocated subsidized on-campus dormitories during their 1-year language course.",
      "Off-campus options include 'Gosiwon' (compact private single rooms with free rice and kimchi, zero deposit) or 'One-room' apartments.",
      "Campus cafeterias offer nutritious three-course meals for as low as ₩4,000 – ₩6,000 ($3–$4.50 USD).",
    ],
    arrival_checklist: [
      "Apply for your Alien Registration Card (ARC / Residence Card) at the local Immigration Office within 90 days.",
      "Enroll in mandatory National Health Insurance Service (NHIS).",
      "Open a Korean bank account (KB Kookmin, Woori, or Hana Bank) linked to your T-Money transportation card.",
      "Download KakaoTalk, Naver Maps, and Papago translation apps for smooth daily living.",
    ],
  },
  Rwanda: {
    country: "Rwanda",
    flag: "🇷🇼",
    currency: "RWF / USD",
    currency_symbol: "RWF",
    exchange_rate_usd: "$1 = ~1,350 RWF",
    avg_monthly_cost: {
      dorm_rent: 140,
      private_rent: 220,
      groceries_food: 110,
      public_transport: 25,
      utilities_internet: 35,
      health_insurance: 20,
      personal_misc: 50,
      total_estimated: 380,
    },
    typical_scholarship_stipend: 650, // CMU-Africa / Mastercard Foundation avg ($600 - $800/mo)
    stipend_coverage_assessment:
      "171% of typical student living costs. Outstanding purchasing power in safe, green, modern Kigali.",
    student_visa: {
      visa_type: "Class V-1 Student Visa (Permit for Higher Learning)",
      processing_time: "3 to 5 Days (Online via Irembo portal)",
      financial_proof_required:
        "Mastercard Foundation / University Sponsorship confirmation letter",
      biometrics_medical:
        "Online passport scan & Directorate General of Immigration and Emigration (DGIE) registration",
      key_requirements: [
        "University Admission Letter from CMU-Africa, ALU, or University of Rwanda",
        "Official Scholarship Award Contract",
        "Valid Police Clearance Certificate with apostille or ministry legalization",
        "Valid international passport",
      ],
    },
    working_rights: {
      term_time_hours:
        "Internships and research assistantships with regional tech startups & pan-African initiatives",
      holiday_hours: "Full-time project internships",
      minimum_wage: "Competitive tech stipends for software and data engineering roles",
      post_study_work_visa: "Special Economic Zone & Kigali Innovation City Talent Mobility Visas",
      post_study_duration:
        "1 to 2 Years post-graduation work opportunities across East African Community (EAC)",
    },
    accommodation_tips: [
      "Kigali offers high-standard modern student apartments in safe neighborhoods like Kacyiru, Bumbogo, and Remera.",
      "Most student rentals include 24/7 security, high-speed fiber internet, and backup power.",
      "Kigali is recognized as Africa's cleanest and safest capital city, with cashless Tap&Go bus transit.",
    ],
    arrival_checklist: [
      "Complete student residence permit registration at the DGIE headquarters in Nyarugenge.",
      "Register for an MTN or Airtel SIM card and set up Mobile Money (MoMo) — Rwanda's ubiquitous cashless payment system.",
      "Open a local bank account (Bank of Kigali, I&M Bank, or Equity Bank).",
      "Get a Tap&Go smart card for seamless bus commuting across Kigali.",
    ],
  },
};
