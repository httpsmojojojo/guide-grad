export interface University {
  id: string
  name: string
  location: string
  type: "Public" | "Private"
  ranking: string
  students: string
  programs: string[]
  tuition: string
  acceptance: string
  rating: number
  image: string
  description: string
  founded: string
  website: string
  phone: string
  email: string
  address: string
  campusSize: string
  facultyStudentRatio: string
  internationalStudents: string
  facilities: string[]
  admissionRequirements: string[]
  scholarships: string[]
  programs_detailed: {
    name: string
    duration: string
    degree: string
    description: string
  }[]
}

export interface Ambassador {
  id: string
  name: string
  university: string
  program: string
  year: string
  location: string
  rating: number
  reviews: number
  studentsHelped: number
  specialties: string[]
  bio: string
  image: string
  available: boolean
  responseTime: string
  languages: string[]
  achievements: string[]
}

export interface Scholarship {
  id: string
  title: string
  provider: string
  type: string
  amount: string
  deadline: string
  eligibility: string
  level: string
  fields: string[]
  description: string
  requirements: string[]
  status: string
  applicants: string
  awards: string
  featured: boolean
  applicationUrl?: string
  contactEmail?: string
  selectionCriteria: string[]
  renewalTerms?: string
  disbursementSchedule?: string
}

// Mock data - expanded with more universities
export const universities: University[] = [
  {
    id: "1",
    name: "Lahore University of Management Sciences (LUMS)",
    location: "Lahore, Punjab",
    type: "Private",
    ranking: "#1 in Pakistan",
    students: "4,500+",
    programs: ["Business", "Computer Science", "Engineering", "Social Sciences"],
    tuition: "PKR 800,000/year",
    acceptance: "15%",
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "LUMS is a leading private university in Pakistan, known for its rigorous academic programs and world-class faculty. Established in 1985, it has consistently ranked among the top universities in South Asia.",
    founded: "1985",
    website: "https://lums.edu.pk",
    phone: "+92-42-3560-8000",
    email: "admissions@lums.edu.pk",
    address: "DHA, Lahore Cantt., Lahore 54792, Pakistan",
    campusSize: "100 acres",
    facultyStudentRatio: "1:8",
    internationalStudents: "15%",
    facilities: [
      "State-of-the-art laboratories",
      "Modern library with 200,000+ books",
      "Sports complex with swimming pool",
      "Student hostels",
      "Medical center",
      "Career services center",
    ],
    admissionRequirements: [
      "SAT/A-Level scores or equivalent",
      "English proficiency test",
      "Personal statement",
      "Letters of recommendation",
      "Interview (for selected programs)",
    ],
    scholarships: [
      "National Outreach Programme (NOP)",
      "Merit-based scholarships",
      "Need-based financial aid",
      "Sports scholarships",
    ],
    programs_detailed: [
      {
        name: "Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Comprehensive program covering software engineering, AI, and data science",
      },
      {
        name: "Business Administration",
        duration: "4 years",
        degree: "BBA",
        description: "World-class business education with focus on entrepreneurship",
      },
      {
        name: "Engineering",
        duration: "4 years",
        degree: "BS",
        description: "Multiple engineering disciplines with hands-on learning",
      },
    ],
  },
  {
    id: "2",
    name: "Institute of Business Administration (IBA) Karachi",
    location: "Karachi, Sindh",
    type: "Public",
    ranking: "#2 in Pakistan",
    students: "3,200+",
    programs: ["Business Administration", "Computer Science", "Economics", "Social Sciences"],
    tuition: "PKR 400,000/year",
    acceptance: "20%",
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "IBA Karachi is Pakistan's premier business school, established in 1955. It's known for producing top business leaders and entrepreneurs in the country.",
    founded: "1955",
    website: "https://iba.edu.pk",
    phone: "+92-21-3810-4700",
    email: "admissions@iba.edu.pk",
    address: "University Road, Karachi 75270, Pakistan",
    campusSize: "75 acres",
    facultyStudentRatio: "1:12",
    internationalStudents: "8%",
    facilities: [
      "Modern business labs",
      "Digital library",
      "Auditoriums and conference halls",
      "Student activity center",
      "Cafeteria and dining facilities",
      "Parking facilities",
    ],
    admissionRequirements: [
      "IBA admission test",
      "Academic transcripts",
      "Personal statement",
      "Interview",
      "English proficiency",
    ],
    scholarships: ["Merit scholarships", "Need-based aid", "Alumni scholarships", "Corporate sponsorships"],
    programs_detailed: [
      {
        name: "Business Administration",
        duration: "4 years",
        degree: "BBA",
        description: "Premier business program with focus on leadership and innovation",
      },
      {
        name: "Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Technology-focused program with business applications",
      },
    ],
  },
  {
    id: "3",
    name: "National University of Sciences and Technology (NUST)",
    location: "Islamabad, ICT",
    type: "Public",
    ranking: "#3 in Pakistan",
    students: "15,000+",
    programs: ["Engineering", "Computer Science", "Business", "Medicine"],
    tuition: "PKR 600,000/year",
    acceptance: "12%",
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "NUST is a leading public research university known for its engineering and technology programs. It has multiple campuses and offers world-class education.",
    founded: "1991",
    website: "https://nust.edu.pk",
    phone: "+92-51-9085-6000",
    email: "admissions@nust.edu.pk",
    address: "H-12, Islamabad 44000, Pakistan",
    campusSize: "1,200 acres",
    facultyStudentRatio: "1:15",
    internationalStudents: "12%",
    facilities: [
      "Research laboratories",
      "Central library",
      "Sports facilities",
      "Student hostels",
      "Medical center",
      "Innovation center",
    ],
    admissionRequirements: [
      "NET entrance test",
      "Academic transcripts",
      "Medical certificate",
      "Character certificate",
    ],
    scholarships: ["Merit scholarships", "Need-based aid", "Research assistantships"],
    programs_detailed: [
      {
        name: "Engineering",
        duration: "4 years",
        degree: "BE",
        description: "Comprehensive engineering program with multiple specializations",
      },
      {
        name: "Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Advanced computer science program with research opportunities",
      },
    ],
  },
  {
    id: "4",
    name: "FAST National University",
    location: "Multiple Campuses",
    type: "Private",
    ranking: "#4 in Pakistan",
    students: "12,000+",
    programs: ["Computer Science", "Engineering", "Management Sciences"],
    tuition: "PKR 500,000/year",
    acceptance: "25%",
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "FAST is a leading private university with multiple campuses across Pakistan, specializing in computer science and engineering education.",
    founded: "2000",
    website: "https://nu.edu.pk",
    phone: "+92-42-111-128-128",
    email: "admissions@nu.edu.pk",
    address: "Multiple Locations",
    campusSize: "Various",
    facultyStudentRatio: "1:20",
    internationalStudents: "5%",
    facilities: ["Computer labs", "Engineering workshops", "Libraries", "Sports facilities", "Cafeterias"],
    admissionRequirements: ["NAT test", "Academic transcripts", "Interview"],
    scholarships: ["Merit scholarships", "Need-based aid"],
    programs_detailed: [
      {
        name: "Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Comprehensive CS program with industry partnerships",
      },
    ],
  },
  {
    id: "5",
    name: "University of Engineering and Technology (UET) Lahore",
    location: "Lahore, Punjab",
    type: "Public",
    ranking: "#5 in Pakistan",
    students: "20,000+",
    programs: ["Engineering", "Architecture", "Technology"],
    tuition: "PKR 200,000/year",
    acceptance: "30%",
    rating: 4.4,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "UET Lahore is one of Pakistan's oldest and most prestigious engineering universities, established in 1921.",
    founded: "1921",
    website: "https://uet.edu.pk",
    phone: "+92-42-99029202",
    email: "admissions@uet.edu.pk",
    address: "G.T. Road, Lahore 54890, Pakistan",
    campusSize: "300 acres",
    facultyStudentRatio: "1:25",
    internationalStudents: "3%",
    facilities: ["Engineering laboratories", "Central library", "Workshops", "Sports complex", "Hostels"],
    admissionRequirements: ["ECAT test", "Academic transcripts", "Domicile certificate"],
    scholarships: ["Merit scholarships", "Need-based aid", "Government scholarships"],
    programs_detailed: [
      {
        name: "Civil Engineering",
        duration: "4 years",
        degree: "BE",
        description: "Traditional civil engineering program with modern applications",
      },
    ],
  },
  {
    id: "6",
    name: "Aga Khan University",
    location: "Karachi, Sindh",
    type: "Private",
    ranking: "#6 in Pakistan",
    students: "2,500+",
    programs: ["Medicine", "Nursing", "Education"],
    tuition: "PKR 1,200,000/year",
    acceptance: "8%",
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "AKU is a prestigious private university known for its medical and health sciences programs, with international accreditation.",
    founded: "1983",
    website: "https://aku.edu",
    phone: "+92-21-3493-0051",
    email: "admissions@aku.edu",
    address: "Stadium Road, Karachi 74800, Pakistan",
    campusSize: "50 acres",
    facultyStudentRatio: "1:6",
    internationalStudents: "20%",
    facilities: ["Teaching hospital", "Medical laboratories", "Research centers", "Library", "Student facilities"],
    admissionRequirements: ["MCAT test", "Academic transcripts", "Interview", "Medical examination"],
    scholarships: ["Merit scholarships", "Need-based aid", "International scholarships"],
    programs_detailed: [
      {
        name: "Medicine",
        duration: "5 years",
        degree: "MBBS",
        description: "Internationally accredited medical program with clinical training",
      },
      {
        name: "Nursing",
        duration: "4 years",
        degree: "BSN",
        description: "Comprehensive nursing program with practical experience",
      },
    ],
  },
]

// Expanded ambassadors data
export const ambassadors: Ambassador[] = [
  {
    id: "1",
    name: "Sarah Ahmed",
    university: "LUMS",
    program: "Computer Science",
    year: "Final Year",
    location: "Lahore",
    rating: 4.9,
    reviews: 45,
    studentsHelped: 120,
    specialties: ["Admissions", "Scholarships", "Campus Life"],
    bio: "Passionate about helping students navigate their journey to LUMS. I've been through the process and know the ins and outs of admissions, scholarships, and campus life. Happy to share my experience!",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    responseTime: "Within 2 hours",
    languages: ["English", "Urdu"],
    achievements: ["Dean's List", "Google Summer of Code", "Hackathon Winner"],
  },
  {
    id: "2",
    name: "Ali Hassan",
    university: "IBA Karachi",
    program: "MBA",
    year: "2nd Year",
    location: "Karachi",
    rating: 4.8,
    reviews: 38,
    studentsHelped: 95,
    specialties: ["Business Programs", "Career Guidance", "Networking"],
    bio: "MBA student with a background in engineering. Happy to share insights about business school and career transitions. I can help with application essays, interview prep, and career planning.",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    responseTime: "Within 4 hours",
    languages: ["English", "Urdu"],
    achievements: ["Merit Scholarship", "Student Council President", "Case Competition Winner"],
  },
  {
    id: "3",
    name: "Fatima Khan",
    university: "NUST",
    program: "Electrical Engineering",
    year: "3rd Year",
    location: "Islamabad",
    rating: 4.7,
    reviews: 52,
    studentsHelped: 140,
    specialties: ["Engineering", "Research", "Student Life"],
    bio: "Engineering student passionate about technology and research. Love helping future engineers find their path. I can guide you through NET preparation, engineering programs, and research opportunities.",
    image: "/placeholder.svg?height=150&width=150",
    available: false,
    responseTime: "Within 6 hours",
    languages: ["English", "Urdu"],
    achievements: ["Research Publication", "IEEE Member", "Engineering Society VP"],
  },
  {
    id: "4",
    name: "Ahmed Malik",
    university: "FAST",
    program: "Software Engineering",
    year: "Graduate",
    location: "Lahore",
    rating: 4.6,
    reviews: 29,
    studentsHelped: 80,
    specialties: ["Software Development", "Internships", "Tech Industry"],
    bio: "Recent graduate now working in tech. Can provide insights about FAST and transitioning to the industry. I help with coding interviews, internship applications, and career guidance in tech.",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    responseTime: "Within 8 hours",
    languages: ["English", "Urdu"],
    achievements: ["Software Engineer at Tech Company", "Open Source Contributor", "Coding Bootcamp Mentor"],
  },
  {
    id: "5",
    name: "Zara Sheikh",
    university: "Aga Khan University",
    program: "Medicine",
    year: "4th Year",
    location: "Karachi",
    rating: 4.9,
    reviews: 33,
    studentsHelped: 65,
    specialties: ["Medical School", "MCAT Prep", "Clinical Experience"],
    bio: "Medical student passionate about healthcare. Here to help aspiring doctors navigate medical school admissions, MCAT preparation, and understanding what medical school is really like.",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    responseTime: "Within 12 hours",
    languages: ["English", "Urdu"],
    achievements: ["Clinical Excellence Award", "Medical Research", "Volunteer at Free Clinic"],
  },
  {
    id: "6",
    name: "Hassan Ali",
    university: "UET Lahore",
    program: "Civil Engineering",
    year: "Final Year",
    location: "Lahore",
    rating: 4.5,
    reviews: 41,
    studentsHelped: 110,
    specialties: ["Engineering", "Project Management", "Construction"],
    bio: "Civil engineering student with internship experience. Happy to share insights about UET and engineering careers. I can help with ECAT preparation, engineering programs, and industry insights.",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    responseTime: "Within 6 hours",
    languages: ["English", "Urdu", "Punjabi"],
    achievements: ["Internship at Construction Company", "Engineering Design Competition", "Student Representative"],
  },
  {
    id: "7",
    name: "Ayesha Tariq",
    university: "LUMS",
    program: "Business Administration",
    year: "Graduate",
    location: "Lahore",
    rating: 4.8,
    reviews: 67,
    studentsHelped: 150,
    specialties: ["Business Strategy", "Entrepreneurship", "Finance"],
    bio: "LUMS BBA graduate working in consulting. I can help with business school applications, career planning, and entrepreneurship. Happy to share insights about the business world and career opportunities.",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    responseTime: "Within 4 hours",
    languages: ["English", "Urdu"],
    achievements: ["Management Consultant", "Startup Founder", "Business Plan Competition Winner"],
  },
  {
    id: "8",
    name: "Omar Farooq",
    university: "NUST",
    program: "Computer Science",
    year: "2nd Year",
    location: "Islamabad",
    rating: 4.6,
    reviews: 28,
    studentsHelped: 75,
    specialties: ["Programming", "Competitive Coding", "Tech Careers"],
    bio: "CS student passionate about programming and competitive coding. I can help with NET preparation, programming fundamentals, and getting started in computer science. Also mentor students in competitive programming.",
    image: "/placeholder.svg?height=150&width=150",
    available: true,
    responseTime: "Within 3 hours",
    languages: ["English", "Urdu"],
    achievements: ["ACM ICPC Participant", "Competitive Programming Mentor", "Tech Society Member"],
  },
  {
    id: "9",
    name: "Mariam Qureshi",
    university: "IBA Karachi",
    program: "Economics",
    year: "3rd Year",
    location: "Karachi",
    rating: 4.7,
    reviews: 35,
    studentsHelped: 90,
    specialties: ["Economics", "Research", "Policy Analysis"],
    bio: "Economics student interested in policy and research. I can help with understanding economics programs, research opportunities, and career paths in economics and policy analysis.",
    image: "/placeholder.svg?height=150&width=150",
    available: false,
    responseTime: "Within 8 hours",
    languages: ["English", "Urdu", "Sindhi"],
    achievements: ["Research Assistant", "Economics Society President", "Policy Research Intern"],
  },
]

// Expanded scholarships data
export const scholarships: Scholarship[] = [
  {
    id: "1",
    title: "HEC Need-Based Scholarship",
    provider: "Higher Education Commission",
    type: "Need-Based",
    amount: "Full Tuition + PKR 25,000/month stipend",
    deadline: "March 31, 2024",
    eligibility: "Pakistani nationals with family income < PKR 45,000/month",
    level: "Undergraduate",
    fields: ["All Fields"],
    description:
      "Comprehensive scholarship covering tuition fees and monthly stipend for deserving students from economically disadvantaged backgrounds.",
    requirements: [
      "Academic merit (minimum 60%)",
      "Income certificate",
      "Domicile certificate",
      "Bank statement",
      "Affidavit",
    ],
    status: "Open",
    applicants: "15,000+",
    awards: "2,500",
    featured: true,
    applicationUrl: "https://hec.gov.pk/scholarships",
    contactEmail: "scholarships@hec.gov.pk",
    selectionCriteria: ["Financial need", "Academic merit", "Interview performance", "Essay quality"],
    renewalTerms: "Maintain 3.0 GPA and submit annual income verification",
    disbursementSchedule: "Monthly payments directly to student account",
  },
  {
    id: "2",
    title: "LUMS National Outreach Programme",
    provider: "LUMS",
    type: "Merit-Based",
    amount: "100% Tuition Waiver + Living Allowance",
    deadline: "April 15, 2024",
    eligibility: "Top performers from underrepresented areas with family income < PKR 200,000/month",
    level: "Undergraduate",
    fields: ["Business", "Computer Science", "Engineering", "Liberal Arts"],
    description:
      "Full scholarship for exceptional students from rural and underserved communities to pursue undergraduate studies at LUMS.",
    requirements: [
      "SAT/A-Level scores",
      "Financial need documentation",
      "Essay",
      "Interview",
      "Community service record",
    ],
    status: "Open",
    applicants: "3,000+",
    awards: "200",
    featured: true,
    applicationUrl: "https://lums.edu.pk/nop",
    contactEmail: "nop@lums.edu.pk",
    selectionCriteria: ["Academic excellence", "Leadership potential", "Community impact", "Financial need"],
    renewalTerms: "Maintain Dean's List status and participate in community service",
    disbursementSchedule: "Semester-wise tuition waiver and monthly living allowance",
  },
  {
    id: "3",
    title: "Ehsaas Undergraduate Scholarship",
    provider: "Government of Pakistan",
    type: "Need-Based",
    amount: "PKR 200,000/year",
    deadline: "May 1, 2024",
    eligibility: "Students from low-income families (income < PKR 300,000/year)",
    level: "Undergraduate",
    fields: ["All Fields"],
    description:
      "Government initiative to support higher education for economically disadvantaged students across Pakistan.",
    requirements: [
      "CNIC",
      "Income certificate",
      "Academic transcripts",
      "Domicile certificate",
      "Bank account details",
    ],
    status: "Open",
    applicants: "25,000+",
    awards: "5,000",
    featured: false,
    applicationUrl: "https://ehsaas.gov.pk/scholarships",
    contactEmail: "scholarships@ehsaas.gov.pk",
    selectionCriteria: ["Financial need", "Academic performance", "Geographic diversity"],
    renewalTerms: "Annual income verification and academic progress review",
    disbursementSchedule: "Quarterly payments through Ehsaas payment system",
  },
  {
    id: "4",
    title: "IBA Karachi Merit Scholarship",
    provider: "IBA Karachi",
    type: "Merit-Based",
    amount: "50-100% Tuition Coverage",
    deadline: "March 20, 2024",
    eligibility: "High academic achievers in IBA admission test",
    level: "Undergraduate & Graduate",
    fields: ["Business", "Computer Science", "Economics"],
    description:
      "Merit-based scholarships for outstanding students pursuing business and technology programs at IBA Karachi.",
    requirements: ["IBA entrance test scores", "Academic records", "Interview", "Personal statement"],
    status: "Open",
    applicants: "2,500+",
    awards: "150",
    featured: false,
    applicationUrl: "https://iba.edu.pk/scholarships",
    contactEmail: "scholarships@iba.edu.pk",
    selectionCriteria: ["Entrance test performance", "Academic record", "Interview assessment"],
    renewalTerms: "Maintain top 25% class ranking",
    disbursementSchedule: "Semester-wise tuition reduction",
  },
  {
    id: "5",
    title: "NUST Merit Scholarship",
    provider: "NUST",
    type: "Merit-Based",
    amount: "25-100% Tuition Waiver",
    deadline: "April 30, 2024",
    eligibility: "NET test high scorers (top 10%)",
    level: "Undergraduate",
    fields: ["Engineering", "Computer Science", "Management"],
    description:
      "Scholarships for top performers in NUST entrance examinations across all engineering and technology programs.",
    requirements: ["NET test scores", "Academic transcripts", "Medical certificate", "Character certificate"],
    status: "Open",
    applicants: "8,000+",
    awards: "800",
    featured: false,
    applicationUrl: "https://nust.edu.pk/scholarships",
    contactEmail: "scholarships@nust.edu.pk",
    selectionCriteria: ["NET test ranking", "Academic performance", "Program preference"],
    renewalTerms: "Maintain CGPA above 3.0",
    disbursementSchedule: "Semester-wise fee reduction",
  },
  {
    id: "6",
    title: "Aga Khan Foundation Scholarship",
    provider: "Aga Khan Foundation",
    type: "Need & Merit",
    amount: "Up to $50,000 for international studies",
    deadline: "March 31, 2024",
    eligibility: "Students from developing countries for graduate studies abroad",
    level: "Graduate",
    fields: ["All Fields"],
    description:
      "International scholarship for graduate studies at top universities worldwide, with focus on development-related fields.",
    requirements: ["Bachelor's degree", "IELTS/TOEFL", "Work experience", "Leadership potential", "Development focus"],
    status: "Open",
    applicants: "1,000+",
    awards: "50",
    featured: true,
    applicationUrl: "https://akdn.org/scholarships",
    contactEmail: "scholarships@akdn.org",
    selectionCriteria: ["Academic excellence", "Leadership experience", "Development commitment", "Financial need"],
    renewalTerms: "Annual progress review and continued financial need",
    disbursementSchedule: "Annual payments covering tuition and living expenses",
  },
  {
    id: "7",
    title: "Punjab Educational Endowment Fund",
    provider: "Government of Punjab",
    type: "Need-Based",
    amount: "PKR 150,000/year",
    deadline: "June 15, 2024",
    eligibility: "Punjab domicile holders with family income < PKR 600,000/year",
    level: "Undergraduate & Graduate",
    fields: ["All Fields"],
    description:
      "Provincial scholarship program to support talented students from Punjab in pursuing higher education.",
    requirements: ["Punjab domicile", "Income certificate", "Academic transcripts", "CNIC", "Admission letter"],
    status: "Open",
    applicants: "12,000+",
    awards: "3,000",
    featured: false,
    applicationUrl: "https://peef.org.pk",
    contactEmail: "info@peef.org.pk",
    selectionCriteria: ["Financial need", "Academic merit", "Punjab residency"],
    renewalTerms: "Annual income verification and academic progress",
    disbursementSchedule: "Semester-wise payments",
  },
  {
    id: "8",
    title: "Sindh Human Resource Development Scholarship",
    provider: "Government of Sindh",
    type: "Merit-Based",
    amount: "PKR 300,000/year",
    deadline: "May 30, 2024",
    eligibility: "Sindh domicile holders with exceptional academic record",
    level: "Graduate & PhD",
    fields: ["Engineering", "Medicine", "Technology", "Management"],
    description: "Provincial scholarship for advanced studies in priority fields to develop human resources for Sindh.",
    requirements: [
      "Sindh domicile",
      "Bachelor's degree with distinction",
      "Admission to recognized university",
      "Bond agreement",
    ],
    status: "Open",
    applicants: "5,000+",
    awards: "500",
    featured: false,
    applicationUrl: "https://sindheducation.gov.pk/scholarships",
    contactEmail: "scholarships@sindheducation.gov.pk",
    selectionCriteria: ["Academic excellence", "Field relevance", "Commitment to serve Sindh"],
    renewalTerms: "Maintain academic standing and fulfill service commitment",
    disbursementSchedule: "Annual payments with performance review",
  },
  {
    id: "9",
    title: "Women in STEM Scholarship",
    provider: "Pakistan Science Foundation",
    type: "Field-Specific",
    amount: "PKR 250,000/year + Research Grant",
    deadline: "April 10, 2024",
    eligibility: "Female students pursuing STEM fields with strong academic record",
    level: "Undergraduate & Graduate",
    fields: ["Engineering", "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"],
    description:
      "Special scholarship to encourage women's participation in Science, Technology, Engineering, and Mathematics fields.",
    requirements: [
      "Female applicant",
      "STEM field enrollment",
      "Academic transcripts",
      "Research proposal",
      "Mentor recommendation",
    ],
    status: "Open",
    applicants: "4,000+",
    awards: "300",
    featured: true,
    applicationUrl: "https://psf.gov.pk/women-stem",
    contactEmail: "women.stem@psf.gov.pk",
    selectionCriteria: ["Academic performance", "Research potential", "STEM commitment", "Leadership qualities"],
    renewalTerms: "Maintain CGPA above 3.5 and submit annual research report",
    disbursementSchedule: "Semester-wise scholarship and annual research grant",
  },
  {
    id: "10",
    title: "Overseas Scholarship for PhD",
    provider: "Higher Education Commission",
    type: "Merit-Based",
    amount: "Full funding for international PhD",
    deadline: "February 28, 2024",
    eligibility: "MS/MPhil graduates with research experience and strong academic record",
    level: "PhD",
    fields: ["All Fields"],
    description:
      "Comprehensive funding for Pakistani students to pursue PhD studies at top international universities.",
    requirements: [
      "MS/MPhil degree",
      "Research experience",
      "IELTS/TOEFL",
      "GRE/GMAT",
      "University admission",
      "Research proposal",
    ],
    status: "Closed",
    applicants: "2,000+",
    awards: "100",
    featured: false,
    applicationUrl: "https://hec.gov.pk/overseas-scholarships",
    contactEmail: "overseas@hec.gov.pk",
    selectionCriteria: ["Academic excellence", "Research quality", "University ranking", "Field priority"],
    renewalTerms: "Annual progress review and thesis submission timeline",
    disbursementSchedule: "Monthly stipend and annual tuition coverage",
  },
]

// CRUD operations
export async function getUniversities(filters?: any): Promise<University[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filtered = [...universities]

  if (filters?.search) {
    filtered = filtered.filter(
      (uni) =>
        uni.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        uni.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        uni.programs.some((program) => program.toLowerCase().includes(filters.search.toLowerCase())),
    )
  }

  if (filters?.location && filters.location !== "all") {
    filtered = filtered.filter((uni) => uni.location.toLowerCase().includes(filters.location.toLowerCase()))
  }

  if (filters?.type && filters.type !== "all") {
    filtered = filtered.filter((uni) => uni.type.toLowerCase() === filters.type.toLowerCase())
  }

  if (filters?.program && filters.program !== "all") {
    filtered = filtered.filter((uni) =>
      uni.programs.some((program) => program.toLowerCase().includes(filters.program.toLowerCase())),
    )
  }

  return filtered
}

export async function getUniversityById(id: string): Promise<University | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return universities.find((uni) => uni.id === id) || null
}

export async function getAmbassadors(filters?: any): Promise<Ambassador[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  let filtered = [...ambassadors]

  if (filters?.search) {
    filtered = filtered.filter(
      (amb) =>
        amb.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        amb.university.toLowerCase().includes(filters.search.toLowerCase()) ||
        amb.program.toLowerCase().includes(filters.search.toLowerCase()) ||
        amb.specialties.some((specialty) => specialty.toLowerCase().includes(filters.search.toLowerCase())),
    )
  }

  if (filters?.university && filters.university !== "all") {
    filtered = filtered.filter((amb) => amb.university.toLowerCase().includes(filters.university.toLowerCase()))
  }

  if (filters?.available !== undefined) {
    filtered = filtered.filter((amb) => amb.available === filters.available)
  }

  return filtered
}

export async function getScholarships(filters?: any): Promise<Scholarship[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  let filtered = [...scholarships]

  if (filters?.search) {
    filtered = filtered.filter(
      (sch) =>
        sch.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        sch.provider.toLowerCase().includes(filters.search.toLowerCase()) ||
        sch.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        sch.fields.some((field) => field.toLowerCase().includes(filters.search.toLowerCase())),
    )
  }

  if (filters?.type && filters.type !== "all") {
    filtered = filtered.filter((sch) => sch.type.toLowerCase().includes(filters.type.toLowerCase()))
  }

  if (filters?.level && filters.level !== "all") {
    filtered = filtered.filter((sch) => sch.level.toLowerCase().includes(filters.level.toLowerCase()))
  }

  if (filters?.field && filters.field !== "all") {
    filtered = filtered.filter((sch) =>
      sch.fields.some((field) => field.toLowerCase().includes(filters.field.toLowerCase())),
    )
  }

  if (filters?.provider && filters.provider !== "all") {
    filtered = filtered.filter((sch) => sch.provider.toLowerCase().includes(filters.provider.toLowerCase()))
  }

  if (filters?.status && filters.status !== "all") {
    filtered = filtered.filter((sch) => sch.status.toLowerCase() === filters.status.toLowerCase())
  }

  return filtered
}

export async function saveUniversity(userId: string, universityId: string): Promise<boolean> {
  // Mock save operation
  console.log(`User ${userId} saved university ${universityId}`)
  await new Promise((resolve) => setTimeout(resolve, 200))
  return true
}

export async function unsaveUniversity(userId: string, universityId: string): Promise<boolean> {
  // Mock unsave operation
  console.log(`User ${userId} unsaved university ${universityId}`)
  await new Promise((resolve) => setTimeout(resolve, 200))
  return true
}

export async function saveScholarship(userId: string, scholarshipId: string): Promise<boolean> {
  // Mock save operation
  console.log(`User ${userId} saved scholarship ${scholarshipId}`)
  await new Promise((resolve) => setTimeout(resolve, 200))
  return true
}

export async function unsaveScholarship(userId: string, scholarshipId: string): Promise<boolean> {
  // Mock unsave operation
  console.log(`User ${userId} unsaved scholarship ${scholarshipId}`)
  await new Promise((resolve) => setTimeout(resolve, 200))
  return true
}

export async function connectWithAmbassador(
  ambassadorId: string,
  data: {
    type: "message" | "call"
    subject?: string
    message: string
    contactMethod?: string
  },
): Promise<boolean> {
  // Mock connection operation
  console.log(`Connecting with ambassador ${ambassadorId}:`, data)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return true
}

export async function bookAmbassadorCall(
  ambassadorId: string,
  data: {
    date: Date
    time: string
    duration: string
    topic: string
    message: string
    method: string
  },
): Promise<boolean> {
  // Mock booking operation
  console.log(`Booking call with ambassador ${ambassadorId}:`, data)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return true
}

export async function applyForScholarship(scholarshipId: string, applicationData: any): Promise<boolean> {
  // Mock scholarship application
  console.log(`Scholarship application submitted for ${scholarshipId}:`, applicationData)
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return true
}
