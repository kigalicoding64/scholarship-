export type DetailedUniversity = {
  id: number;
  name: string;
  acronym: string | null;
  country: string;
  city: string;
  type: string;
  global_rank: string;
  acceptance_rate: string;
  international_students_ratio: string;
  campuses: string[];
  popular_faculties: string[];
  degree_levels_offered: string[];
  tuition_range: string;
  average_living_cost: string;
  work_rights: string;
  intake_terms: string[];
  language_requirements: string;
  scholarships_hosted: string[];
  description: string;
  website: string;
  status: string;
  featured_highlight?: string;
};

export const DETAILED_UNIVERSITIES: DetailedUniversity[] = [
  {
    id: 1,
    name: "University of Oxford",
    acronym: "OXON",
    country: "United Kingdom",
    city: "Oxford",
    type: "Collegiate Research University",
    global_rank: "#1 Times Higher Education (THE) / #3 QS World Rankings",
    acceptance_rate: "14.2%",
    international_students_ratio: "45%",
    campuses: [
      "Wellington Square (Central)",
      "Old Road Campus (Medical)",
      "Science Area",
      "Radcliffe Observatory Quarter",
    ],
    popular_faculties: [
      "Mathematical, Physical & Life Sciences",
      "Medical Sciences & Global Health",
      "Humanities & Philosophy",
      "Social Sciences & Blavatnik School of Government",
      "Said Business School",
    ],
    degree_levels_offered: ["Undergraduate", "Master's", "PhD / DPhil", "Postgraduate Fellowship"],
    tuition_range: "£28,500 – £48,000 / year (100% covered under full scholarships)",
    average_living_cost: "£1,250 – £1,650 / month (Includes college accommodation & meals)",
    work_rights:
      "Up to 20 hrs/week during term, full-time during holidays; 2-year UK Graduate Visa (PSW) post-completion",
    intake_terms: ["Michaelmas Term (October)", "Hilary Term (January)", "Trinity Term (April)"],
    language_requirements:
      "IELTS 7.5 (minimum 7.0 each band) / TOEFL iBT 110. English Medium of Instruction waiver accepted for eligible Commonwealth graduates.",
    scholarships_hosted: [
      "Rhodes Scholarship (Fully Funded + Stipend + Flights)",
      "Clarendon Fund (Full Tuition + Generous Living Allowance)",
      "Oxford-Weidenfeld and Hoffmann Scholarships",
      "Commonwealth Master's & PhD Scholarships",
    ],
    description:
      "The oldest university in the English-speaking world, Oxford is a world leader in advanced academic research, tutorial-based teaching, and international scholar mobility. With 39 self-governing constituent colleges, students benefit from a close-knit intellectual community, state-of-the-art laboratory facilities, and access to the world-renowned Bodleian Library network.",
    website: "https://www.ox.ac.uk",
    status: "published",
    featured_highlight: "World #1 Research Institution • 39 Historic Colleges",
  },
  {
    id: 2,
    name: "University of Cambridge",
    acronym: "CANTAB",
    country: "United Kingdom",
    city: "Cambridge",
    type: "Collegiate Public Research",
    global_rank: "#2 Times Higher Education / #2 QS World Rankings",
    acceptance_rate: "15.8%",
    international_students_ratio: "40%",
    campuses: ["Old Addenbrooke's", "West Cambridge Tech Campus", "Sidgwick Site", "Downing Site"],
    popular_faculties: [
      "School of Technology & Computer Science",
      "School of Clinical Medicine",
      "School of Biological Sciences",
      "School of Humanities & Social Sciences",
      "Judge Business School",
    ],
    degree_levels_offered: ["Undergraduate", "Master's", "PhD", "Postgraduate Fellowship"],
    tuition_range: "£26,000 – £45,000 / year (100% funded with grants)",
    average_living_cost: "£1,200 – £1,600 / month (College dormitories & dining halls)",
    work_rights:
      "Strict 20 hrs/week during term, full-time vacations; 2-year UK Graduate Route visa",
    intake_terms: ["Michaelmas (October)", "Lent (January)", "Easter (April)"],
    language_requirements:
      "IELTS 7.5+ or TOEFL iBT 110+. Prior English-medium degree waivers subject to department approval.",
    scholarships_hosted: [
      "Gates Cambridge Scholarship (Full Funding + $24,000/yr Stipend)",
      "Cambridge Trust International Awards",
      "Commonwealth Cambridge Grants",
      "Jardine Foundation Scholarships",
    ],
    description:
      "Renowned for scientific breakthroughs from DNA discovery to computing fundamentals, Cambridge offers world-class collegiate education. The university combines cutting-edge research parks in West Cambridge with 31 historic colleges, fostering groundbreaking interdisciplinary collaboration.",
    website: "https://www.cam.ac.uk",
    status: "published",
    featured_highlight: "Gates Cambridge Hub • 31 Constituent Colleges",
  },
  {
    id: 3,
    name: "Harvard University",
    acronym: "HARVARD",
    country: "United States",
    city: "Cambridge, Massachusetts",
    type: "Private Ivy League Research",
    global_rank: "#1 Global Reputation / #4 QS World Rankings",
    acceptance_rate: "3.4%",
    international_students_ratio: "27%",
    campuses: [
      "Cambridge Yard (Main)",
      "Allston Science & Engineering Campus",
      "Longwood Medical Campus (Boston)",
    ],
    popular_faculties: [
      "Harvard John A. Paulson School of Engineering and Applied Sciences",
      "Harvard Kennedy School of Government",
      "Harvard Medical School",
      "Harvard Business School",
      "Graduate School of Arts and Sciences",
    ],
    degree_levels_offered: ["Undergraduate", "Master's", "PhD", "Fellowship"],
    tuition_range:
      "$56,000 – $78,000 / year (Need-blind 100% financial aid & fully funded PhD fellowships)",
    average_living_cost: "$1,800 – $2,400 / month (Cambridge/Boston metropolitan living)",
    work_rights:
      "F-1 visa: 20 hrs/week on-campus during term; 1–3 years OPT (Optional Practical Training with STEM extension)",
    intake_terms: ["Fall Semester (August/September)", "Spring Semester (January)"],
    language_requirements:
      "TOEFL iBT 105+ or IELTS 7.5+. Duolingo English Test (DET 135+) accepted by select graduate schools.",
    scholarships_hosted: [
      "Harvard University Full Presidential Fellowship",
      "Harvard Need-Blind International Undergraduate Grants",
      "Center for International Development (CID) Fellowships",
      "Fulbright Foreign Student Program at Harvard",
    ],
    description:
      "As America's oldest institution of higher learning, Harvard University boasts an unmatched endowment, world-leading libraries, and groundbreaking faculty across every scholarly field. Harvard's need-blind admission policy ensures every admitted undergraduate and doctoral researcher receives 100% demonstrated financial aid.",
    website: "https://www.harvard.edu",
    status: "published",
    featured_highlight: "100% Need-Blind Financial Aid • Ivy League",
  },
  {
    id: 4,
    name: "Massachusetts Institute of Technology",
    acronym: "MIT",
    country: "United States",
    city: "Cambridge, Massachusetts",
    type: "Private Technological Research Institute",
    global_rank: "#1 QS World University Rankings for 12 Consecutive Years",
    acceptance_rate: "3.9%",
    international_students_ratio: "34%",
    campuses: [
      "Kendall Square Innovation Hub",
      "Charles River Campus",
      "Stata Center AI & Computing",
    ],
    popular_faculties: [
      "School of Engineering (EECS, MechE, AeroAstro)",
      "Schwarzman College of Computing (AI, Robotics)",
      "MIT Sloan School of Management",
      "School of Science (Physics, Chemistry, Biology)",
      "School of Architecture and Planning",
    ],
    degree_levels_offered: ["Undergraduate", "Master's", "PhD", "Postdoc Fellowship"],
    tuition_range:
      "$60,150 / year (All admitted PhD students receive full tuition + $44,000/yr research stipend)",
    average_living_cost: "$1,900 – $2,500 / month (Graduate housing & Cambridge living)",
    work_rights:
      "F-1 On-Campus (20 hrs/week); 36-Month STEM OPT Work Authorization in the USA post-graduation",
    intake_terms: ["Fall (September)", "Spring (February)"],
    language_requirements:
      "IELTS 7.5+ or TOEFL iBT 100+ (Preferred minimums for graduate engineering).",
    scholarships_hosted: [
      "MIT Graduate Research & Teaching Assistantships (RA/TA - Full tuition + Stipend)",
      "Legatum Center Fellowship for Development & Innovation",
      "MIT Presidential Fellowship",
      "Fulbright-MIT Technology Awards",
    ],
    description:
      "MIT is the world's premier technological and research university. Centered at the heart of the Kendall Square innovation ecosystem, MIT researchers pioneer artificial intelligence, quantum computing, renewable energy, and biomedical breakthroughs.",
    website: "https://www.mit.edu",
    status: "published",
    featured_highlight: "World #1 in Technology & AI • Kendall Square Ecosystem",
  },
  {
    id: 5,
    name: "University of Toronto",
    acronym: "UofT",
    country: "Canada",
    city: "Toronto, Ontario",
    type: "Public Research University",
    global_rank: "#1 in Canada / #21 QS World Rankings",
    acceptance_rate: "43%",
    international_students_ratio: "31%",
    campuses: ["St. George (Downtown Toronto)", "UTSC (Scarborough)", "UTM (Mississauga)"],
    popular_faculties: [
      "Faculty of Applied Science & Engineering",
      "Faculty of Arts & Science (Computer Science & Data)",
      "Rotman School of Management",
      "Temerty Faculty of Medicine",
      "Munk School of Global Affairs & Public Policy",
    ],
    degree_levels_offered: ["Undergraduate", "Master's", "PhD", "Postdoctoral"],
    tuition_range:
      "CAD $38,000 – $64,000 / year (Lester B. Pearson & Doctoral fellowships cover 100%)",
    average_living_cost: "CAD $1,600 – $2,200 / month (Toronto transit, dorms & health insurance)",
    work_rights:
      "Up to 24 hrs/week off-campus during study; 3-Year Post-Graduation Work Permit (PGWP) in Canada",
    intake_terms: ["Fall Intake (September)", "Winter Intake (January)"],
    language_requirements:
      "IELTS 6.5 (minimum 6.0 in each band) or TOEFL iBT 100 (writing 22+). English-instruction degree waivers available.",
    scholarships_hosted: [
      "Lester B. Pearson International Scholarship (Full 4-Year Tuition + Residence + Books)",
      "University of Toronto Doctoral Funding Guarantee ($35,000/yr + Tuition)",
      "Vanier Canada Graduate Scholarships",
      "Rotman Global MBA Fellowships",
    ],
    description:
      "Canada's leading research university, U of T is globally recognized for groundbreaking work in deep learning, regenerative medicine, and international policy. Located across three dynamic campuses in Canada's largest economic hub, students enjoy unparalleled industry placement and direct pathway to Canadian permanent residency.",
    website: "https://www.utoronto.ca",
    status: "published",
    featured_highlight: "Canada's #1 University • 3-Year PGWP Work Rights",
  },
  {
    id: 6,
    name: "Technical University of Munich",
    acronym: "TUM",
    country: "Germany",
    city: "Munich, Bavaria",
    type: "Public University of Excellence",
    global_rank: "#1 in Germany / #28 QS World Rankings",
    acceptance_rate: "24%",
    international_students_ratio: "42%",
    campuses: [
      "Munich Downtown",
      "Garching High-Tech Research Campus",
      "Freising Life Sciences Campus",
      "Heilbronn",
    ],
    popular_faculties: [
      "TUM School of Computation, Information and Technology (CIT)",
      "TUM School of Engineering and Design",
      "TUM School of Life Sciences",
      "TUM School of Management",
      "TUM School of Medicine and Health",
    ],
    degree_levels_offered: ["Undergraduate", "Master's (English-Taught)", "PhD"],
    tuition_range:
      "Tuition-free for EU / €2,000 – €3,000 per semester for non-EU (Fully waived with DAAD / Bavarian grants)",
    average_living_cost:
      "€950 – €1,300 / month (Public transport ticket €29/mo, subsidized student dining)",
    work_rights:
      "140 full days or 280 half days per year; 18-Month German Post-Study Jobseeker Visa leading to EU Blue Card",
    intake_terms: ["Winter Semester (October)", "Summer Semester (April)"],
    language_requirements:
      "IELTS 6.5+ or TOEFL iBT 88+ for English-taught Master's programs. German language courses provided free on campus.",
    scholarships_hosted: [
      "DAAD Helmut-Schmidt Programme (Full funding + €934/mo stipend + travel)",
      "DAAD Development-Related Postgraduate Courses (EPOS)",
      "Heinrich Böll Foundation Grants",
      "Bavarian International Fellowship (BAYHOST)",
    ],
    description:
      "As one of Europe's top technological powerhouses and a founding TU9 institution, TUM fosters high-impact innovation, deep-tech entrepreneurship, and close partnerships with industry leaders like BMW, Siemens, and Airbus. Over 80 Master's programs are taught entirely in English.",
    website: "https://www.tum.de",
    status: "published",
    featured_highlight: "Tuition-Free / Low Cost • 18-Month EU Jobseeker Visa",
  },
  {
    id: 7,
    name: "ETH Zurich (Swiss Federal Institute of Technology)",
    acronym: "ETHZ",
    country: "Switzerland",
    city: "Zurich",
    type: "Federal Public Institute of Technology",
    global_rank: "#7 QS World University Rankings / #1 in Continental Europe",
    acceptance_rate: "27%",
    international_students_ratio: "43%",
    campuses: ["Zentrum Campus (Central Zurich)", "Hönggerberg Science City"],
    popular_faculties: [
      "Department of Computer Science (AI, Systems, Robotics)",
      "Department of Information Technology & Electrical Engineering",
      "Department of Mechanical & Process Engineering",
      "Department of Physics & Quantum Technology",
      "Department of Management, Technology and Economics",
    ],
    degree_levels_offered: ["Master's (English-taught)", "PhD", "Postdoc"],
    tuition_range:
      "CHF 730 per semester (~$850/term - heavily subsidized by the Swiss Federal Government)",
    average_living_cost:
      "CHF 1,600 – CHF 2,200 / month (Zurich student housing and public transport)",
    work_rights:
      "15 hrs/week during semester, full-time during vacations; 6-month Swiss post-graduation search visa",
    intake_terms: ["Autumn Semester (September)"],
    language_requirements:
      "IELTS 7.0 (minimum 6.5 each section) or TOEFL iBT 100. English undergraduate degree recognized.",
    scholarships_hosted: [
      "ETH Excellence Scholarship & Opportunity Programme (ESOP - Full study + CHF 12,000/semester living stipend)",
      "Swiss Government Excellence Scholarships (FCS)",
      "ETH Zurich Doctoral Fellowships (CHF 50,000+/year salary)",
    ],
    description:
      "ETH Zurich is world-renowned for cutting-edge engineering, mathematics, and natural sciences, counting Albert Einstein among its alumni and 22 Nobel Laureates. With state-of-the-art supercomputing facilities and tight links with global research institutions, ETH represents the pinnacle of European STEM education.",
    website: "https://ethz.ch",
    status: "published",
    featured_highlight: "Top 10 Global Ranking • Low Semester Fees • ESOP Fellowship",
  },
  {
    id: 8,
    name: "University of Melbourne",
    acronym: "UNIMELB",
    country: "Australia",
    city: "Melbourne, Victoria",
    type: "Group of Eight (Go8) Research University",
    global_rank: "#1 in Australia / #13 QS World Rankings",
    acceptance_rate: "36%",
    international_students_ratio: "46%",
    campuses: [
      "Parkville (Main Campus)",
      "Southbank (Arts & Music)",
      "Burnley",
      "Werribee (Veterinary)",
    ],
    popular_faculties: [
      "Faculty of Engineering and Information Technology",
      "Melbourne Medical School",
      "Melbourne Business School & Faculty of Business and Economics",
      "Melbourne Law School",
      "Faculty of Science",
    ],
    degree_levels_offered: ["Undergraduate", "Master's", "PhD / Research Doctorate"],
    tuition_range:
      "AUD $36,000 – $52,000 / year (100% covered under Australia Awards & Melbourne Research Scholarships)",
    average_living_cost:
      "AUD $1,800 – $2,400 / month (Tram zone pass, student apartment & groceries)",
    work_rights:
      "48 hrs per fortnight during semester; 2–4 Year Temporary Graduate Visa (Subclass 485 Post-Study Work)",
    intake_terms: ["Semester 1 (February/March)", "Semester 2 (July/August)"],
    language_requirements:
      "IELTS 6.5 (no band below 6.0) or TOEFL iBT 79+. Prior English instruction medium waivers accepted.",
    scholarships_hosted: [
      "Australia Awards Scholarships (DFAT - 100% Tuition + Living Stipend + Health Cover + Airfare)",
      "Melbourne International Graduate Research Scholarships (Full Tuition + AUD $37,000/yr Living Allowance)",
      "Melbourne Chancellor's Scholarship",
    ],
    description:
      "Located in the world's most livable student city, the University of Melbourne is Australia's top-ranked institution. It offers the distinctive 'Melbourne Model', allowing students to customize interdisciplinary degrees before specializing in high-demand research and professional Master's programs.",
    website: "https://www.unimelb.edu.au",
    status: "published",
    featured_highlight: "Australia's #1 Institution • Up to 4-Year Post-Study Visa",
  },
  {
    id: 9,
    name: "National University of Singapore",
    acronym: "NUS",
    country: "Singapore",
    city: "Singapore",
    type: "Autonomous Global Research University",
    global_rank: "#1 in Asia / #8 QS World Rankings",
    acceptance_rate: "11%",
    international_students_ratio: "32%",
    campuses: [
      "Kent Ridge (Main Campus & University Town)",
      "Bukit Timah (Law & Public Policy)",
      "Outram (Duke-NUS Medical)",
    ],
    popular_faculties: [
      "School of Computing (AI, Cyber Security, FinTech)",
      "Faculty of Engineering (ECE, Chemical, Biomedical)",
      "NUS Business School",
      "Lee Kuan Yew School of Public Policy",
      "Yong Loo Lin School of Medicine",
    ],
    degree_levels_offered: ["Undergraduate", "Master's", "PhD", "Executive Grants"],
    tuition_range:
      "SGD $32,000 – $54,000 / year (SINGA & NUS Graduate Scholarships cover 100% tuition + generous allowance)",
    average_living_cost:
      "SGD $1,400 – $1,900 / month (On-campus UTown residence halls, MRT transport)",
    work_rights:
      "Up to 16 hrs/week during term; 1-Year Long-Term Visit Pass (LTVP) for post-study employment in Singapore",
    intake_terms: ["Semester 1 (August)", "Semester 2 (January)"],
    language_requirements:
      "IELTS 6.5+ or TOEFL iBT 85+ (Waived for graduates from English-medium degree programs).",
    scholarships_hosted: [
      "Singapore International Graduate Award (SINGA - Full Tuition + SGD $2,700/mo stipend + $1,500 flight)",
      "NUS Research Scholarship (Doctoral)",
      "Lee Kuan Yew School of Public Policy Master's Grants",
      "ASEAN Undergraduate Scholarship",
    ],
    description:
      "NUS is Asia's leading global university, renowned for pioneering AI research, advanced material sciences, and international policy. Its iconic University Town provides an integrated living-learning environment featuring world-class maker spaces and global venture incubators.",
    website: "https://www.nus.edu.sg",
    status: "published",
    featured_highlight: "Asia's #1 University • SINGA Fully Funded PhD",
  },
  {
    id: 10,
    name: "Seoul National University",
    acronym: "SNU",
    country: "South Korea",
    city: "Seoul",
    type: "Flagship National Research University",
    global_rank: "#1 in South Korea / #31 QS World Rankings",
    acceptance_rate: "16%",
    international_students_ratio: "20%",
    campuses: [
      "Gwanak Main Campus (Mount Gwanak)",
      "Yeongeon Medical Campus (Central Seoul)",
      "Pyeongchang Campus",
    ],
    popular_faculties: [
      "College of Engineering (Semiconductors, AI, Nuclear)",
      "College of Natural Sciences",
      "College of Business Administration",
      "Graduate School of International Studies (GSIS - 100% English)",
      "College of Medicine",
    ],
    degree_levels_offered: ["Undergraduate", "Master's", "PhD"],
    tuition_range:
      "KRW 6,000,000 – 9,000,000 / year (100% covered under Global Korea Scholarship - GKS)",
    average_living_cost:
      "KRW 950,000 – 1,400,000 / month (On-campus dormitory, subway T-money card)",
    work_rights:
      "20–30 hrs/week with D-2 student visa approval; D-10 Korean Jobseeker Visa post-graduation",
    intake_terms: ["Spring Semester (March)", "Fall Semester (September)"],
    language_requirements:
      "IELTS 6.0+ / TOEFL 80+ or TOPIK Level 3+ (GKS includes 1 full year of free Korean language training).",
    scholarships_hosted: [
      "Global Korea Scholarship (GKS - Full Tuition + KRW 1,000,000/mo + Airfare + 1-Yr Korean Language Course)",
      "SNU Global Scholarship (Tuition + Living Subsidies)",
      "KOICA International Development Scholarships",
    ],
    description:
      "The premier institution in South Korea and cornerstone of the prestigious 'SKY' universities, SNU has educated the nation's leaders across government, cutting-edge semiconductor industry, and global arts. GKS scholars receive full tuition, housing, flights, and intensive language immersion.",
    website: "https://www.snu.ac.kr",
    status: "published",
    featured_highlight: "South Korea's Top Flagship • GKS 100% Free Tuition & Living",
  },
  {
    id: 11,
    name: "Carnegie Mellon University Africa",
    acronym: "CMU-Africa",
    country: "Rwanda",
    city: "Kigali",
    type: "Global Top-Tier American Tech University in Africa",
    global_rank: "#1 in Computer Science / #24 Times Higher Education",
    acceptance_rate: "12%",
    international_students_ratio: "65%",
    campuses: ["Kigali Innovation City (Special Economic Zone, Kigali)"],
    popular_faculties: [
      "Department of Electrical & Computer Engineering",
      "Master of Science in Information Technology (MSIT)",
      "Master of Science in Artificial Intelligence & Machine Learning",
      "Master of Science in Cybersecurity",
    ],
    degree_levels_offered: ["Master's of Science (Fully accredited US Degree)"],
    tuition_range: "$16,000 / year (100% funded via Mastercard Foundation & Government of Rwanda)",
    average_living_cost: "$350 – $600 / month (Kigali student housing, modern transport & meals)",
    work_rights:
      "Internships with global tech companies across Rwanda, Kenya, South Africa, and the US",
    intake_terms: ["Fall Semester (August)"],
    language_requirements:
      "Duolingo English Test (DET 115+), IELTS 6.5+, or TOEFL 84+. Full English medium instruction.",
    scholarships_hosted: [
      "Mastercard Foundation Scholars Program at CMU-Africa (Full Tuition + Housing + Monthly Stipend + Laptop + Airfare)",
      "Government of Rwanda STEM Fellowship",
      "Smart Africa Tech Scholar Award",
    ],
    description:
      "CMU-Africa is the only American research university offering its full Master's degrees with resident faculty in Africa. Located in Kigali Innovation City, students earn an authentic Carnegie Mellon University degree while engineering scalable technological solutions for the continent's digital transformation.",
    website: "https://www.africa.engineering.cmu.edu",
    status: "published",
    featured_highlight: "Authentic US Degree in Kigali • Mastercard Foundation 100% Funded",
  },
  {
    id: 12,
    name: "African Leadership University",
    acronym: "ALU",
    country: "Rwanda",
    city: "Kigali",
    type: "Innovative Pan-African Higher Education Institution",
    global_rank:
      "Top 50 Most Innovative Companies (Fast Company) / Pioneer in Entrepreneurial Leadership",
    acceptance_rate: "18%",
    international_students_ratio: "75%",
    campuses: ["Kigali Bumbogo Campus", "Mauritius Campus (ALC)"],
    popular_faculties: [
      "School of Business & Entrepreneurship",
      "School of Software Engineering & Applied Computing",
      "Global Challenges & Public Policy",
      "African Development Studies",
    ],
    degree_levels_offered: ["Undergraduate", "Postgraduate Master's in Entrepreneurship"],
    tuition_range:
      "$3,000 – $6,000 / year (Heavily supplemented by need-based grants & Mastercard Foundation)",
    average_living_cost: "$300 – $550 / month (On-campus and Kigali student residences)",
    work_rights:
      "Mandatory integrated 8-month annual professional internships with leading pan-African enterprises",
    intake_terms: ["January Intake", "May Intake", "September Intake"],
    language_requirements:
      "English proficiency assessment during online intake. No IELTS mandatory for African school leavers.",
    scholarships_hosted: [
      "Mastercard Foundation ALU Scholars Program (Full Ride Tuition + Dorm + Food + Laptop + Flights)",
      "ALU Need-Based Financial Aid & Work-Study",
      "Brempong Leadership Grants",
    ],
    description:
      "ALU is pioneering a mission-driven model of higher education that develops the next generation of 3 million ethical African leaders. By integrating declared real-world missions, self-directed learning, and mandatory enterprise internships, ALU graduates possess exceptional entrepreneurial agility.",
    website: "https://www.alueducation.com",
    status: "published",
    featured_highlight: "Pan-African Leadership Hub • Mastercard Foundation Partner",
  },
  {
    id: 13,
    name: "University of Cape Town",
    acronym: "UCT",
    country: "South Africa",
    city: "Cape Town",
    type: "Public Flagship Research University",
    global_rank: "#1 in Africa / #173 QS World Rankings",
    acceptance_rate: "30%",
    international_students_ratio: "22%",
    campuses: [
      "Upper Campus (Rondebosch)",
      "Middle & Lower Campuses",
      "Health Sciences Campus (Groote Schuur)",
      "Breakwater Waterfront (GSB)",
    ],
    popular_faculties: [
      "Faculty of Commerce (Graduate School of Business - GSB)",
      "Faculty of Health Sciences & Infectious Disease Research",
      "Faculty of Engineering & the Built Environment",
      "Faculty of Science (Data Science, Marine Biology)",
      "Faculty of Law",
    ],
    degree_levels_offered: ["Undergraduate", "Honours", "Master's", "PhD"],
    tuition_range: "ZAR 65,000 – 110,000 / year (Mastercard Foundation & NRF cover 100% fees)",
    average_living_cost:
      "ZAR 6,500 – 11,000 / month (Cape Town student residences, Jammie Shuttle transport)",
    work_rights:
      "20 hrs/week during term with South African study visa; Graduate internship pathways",
    intake_terms: ["Semester 1 (February)", "Semester 2 (July)"],
    language_requirements:
      "IELTS 6.5 (minimum 6.0 each band) or English-medium secondary school certificate.",
    scholarships_hosted: [
      "Mastercard Foundation Scholars Program at UCT (Full Ride: Tuition, Housing, Living, Laptop, Flights)",
      "National Research Foundation (NRF) Postgraduate Grants",
      "Mandela Rhodes Scholarships",
      "UCT International & Refugee Scholarships",
    ],
    description:
      "UCT is Africa's top-ranked research university, perched on the slopes of Table Mountain's Devil's Peak. It provides world-class education with specialized research centers in global health, astronomy (SKA), environmental sustainability, and African jurisprudence.",
    website: "https://www.uct.ac.za",
    status: "published",
    featured_highlight: "Africa's #1 Ranked University • Table Mountain Campus",
  },
  {
    id: 14,
    name: "Sciences Po Paris",
    acronym: "SCIENCES PO",
    country: "France",
    city: "Paris",
    type: "Grand Établissement (Social Sciences & International Affairs)",
    global_rank: "#2 in the World for Politics & International Studies (QS)",
    acceptance_rate: "10%",
    international_students_ratio: "50%",
    campuses: [
      "Paris 7th Arrondissement (Saint-Thomas)",
      "Reims Campus",
      "Le Havre",
      "Menton",
      "Nancy",
      "Poitiers",
      "Dijon",
    ],
    popular_faculties: [
      "Paris School of International Affairs (PSIA)",
      "School of Public Affairs",
      "Law School (Economic Law, Global Governance)",
      "Urban School",
      "School of Management and Impact",
    ],
    degree_levels_offered: ["Undergraduate (Dual Degrees)", "Master's (100% English)", "PhD"],
    tuition_range:
      "€14,000 – €19,000 / year (Émile Boutmy & Eiffel Scholarships cover full tuition + monthly stipend)",
    average_living_cost:
      "€1,100 – €1,600 / month (Parisian student housing, Navigo transit card, CROUS dining)",
    work_rights:
      "60% of annual legal working time (~20 hrs/week); 1-Year RECE Post-Study Residence Permit in France",
    intake_terms: ["Autumn Intake (September)"],
    language_requirements:
      "IELTS 7.0+ or TOEFL 100+ for English tracks. DALF C1 for French-taught programs.",
    scholarships_hosted: [
      "Émile Boutmy Scholarship (Full Tuition + €13,000/yr Living Allowance)",
      "Eiffel Excellence Scholarship (French Foreign Ministry - €1,400/mo + Airfare)",
      "Mastercard Foundation Scholars Program at Sciences Po",
      "Erasmus+ Mobility Grants",
    ],
    description:
      "France's leading institution for social sciences and public policy, Sciences Po has educated French presidents, prime ministers, and international heads of state. With half of its student body hailing from 150 countries, it offers premier English-taught degrees in diplomacy, human rights, and sustainable transition.",
    website: "https://www.sciencespo.fr",
    status: "published",
    featured_highlight: "World #2 for Politics & Diplomacy • Émile Boutmy Scholarships",
  },
];
