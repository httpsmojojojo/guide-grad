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
  location: string
  bio: string
  image?: string
  specialties: string[]
  languages: string[]
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

export interface ScholarshipApplication {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    cnic: string
    dateOfBirth: string
    address: string
  }
  academicInfo: {
    currentEducation: string
    institution: string
    gpa: string
    graduationYear: string
    fieldOfStudy: string
  }
  financialInfo: {
    familyIncome: string
    hasOtherScholarships: boolean
    otherScholarshipsDetails: string
  }
  documents: {
    transcripts: boolean
    incomeProof: boolean
    cnicCopy: boolean
    recommendationLetters: boolean
    personalStatement: boolean
  }
  essay: {
    whyDeserving: string
    careerGoals: string
    contribution: string
  }
  agreeToTerms: boolean
}

// Mock data - expanded with more universities
export const universities: University[] = [
  {
    id: "1",
    name: "National University of Sciences and Technology (NUST)",
    location: "Islamabad, Pakistan",
    type: "Public",
    ranking: "#1 in Pakistan",
    students: "Approximately 6,500",
    programs: ["Engineering", "Computer Science", "Business Studies", "Social Sciences", "Architecture", "Biotechnology"],
    tuition: "PKR 95,000–200,300 per semester (varies by program)",
    acceptance: "Approximately 5%",
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600",
    description: "NUST is a premier public research university in Pakistan, known for its high academic standards, cutting-edge research, and international collaborations. Established in 1991, it offers a wide range of undergraduate and postgraduate programs.",
    founded: "1991",
    website: "https://www.nust.edu.pk",
    phone: "+92-51-111-116-878",
    email: "info@nust.edu.pk",
    address: "Sector H-12, Islamabad, Pakistan",
    campusSize: "700 acres",
    facultyStudentRatio: "1:10",
    internationalStudents: "Yes",
    facilities: [
      "State-of-the-art laboratories",
      "Central library",
      "Hostels",
      "Sports complex",
      "Medical center",
      "Career services center"
    ],
    admissionRequirements: [
      "FSc Pre-Engineering or equivalent with minimum 60% marks",
      "NUST Entry Test (NET) or SAT/ACT scores",
      "Interview (for selected programs)"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid",
      "External scholarships"
    ],
    programs_detailed: [
      {
        name: "BS Electrical Engineering",
        duration: "4 years",
        degree: "BS",
        description: "Program focusing on electrical systems, electronics, and communication."
      },
      {
        name: "BS Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Program covering algorithms, data structures, software engineering, and artificial intelligence."
      }
    ]
  },
  {
    id: "2",
    name: "Lahore University of Management Sciences (LUMS)",
    location: "Lahore, Punjab",
    type: "Private",
    ranking: "#2 in Pakistan",
    students: "4,500+",
    programs: ["Business", "Computer Science", "Engineering", "Social Sciences", "Law", "Economics", "Humanities"],
    tuition: "PKR 800,000-1,200,000 per year (varies by program)",
    acceptance: "Highly competitive (approximately 10%)",
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=600",
    description: "LUMS is Pakistan's premier private university, established in 1985. It is known for its rigorous academic programs, world-class faculty, and state-of-the-art facilities. The university has consistently ranked among the top institutions in South Asia and is recognized for its research output and graduate employability.",
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
      "Research centers",
      "Conference facilities",
      "Cafeteria and dining halls",
      "Fitness center"
    ],
    admissionRequirements: [
      "SAT/A-Level scores or equivalent",
      "English proficiency test",
      "Personal statement",
      "Letters of recommendation",
      "Interview (for selected programs)",
      "Academic transcripts"
    ],
    scholarships: [
      "National Outreach Programme (NOP)",
      "Merit-based scholarships",
      "Need-based financial aid",
      "Sports scholarships",
      "External scholarships",
      "Faculty scholarships"
    ],
    programs_detailed: [
      {
        name: "BS Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Comprehensive program covering software engineering, artificial intelligence, data science, and computer systems."
      },
      {
        name: "BSc Accounting and Finance",
        duration: "4 years",
        degree: "BSc",
        description: "Program focusing on accounting principles, financial management, and business analytics."
      },
      {
        name: "BA-LLB",
        duration: "5 years",
        degree: "BA-LLB",
        description: "Integrated program combining liberal arts education with legal studies."
      },
      {
        name: "BSc Economics",
        duration: "4 years",
        degree: "BSc",
        description: "Program covering economic theory, quantitative methods, and policy analysis."
      }
    ]
  },
  {
    id: "3",
    name: "Aga Khan University (AKU)",
    location: "Karachi, Sindh",
    type: "Private",
    ranking: "#3 in Pakistan",
    students: "3,196",
    programs: ["Medicine", "Nursing", "Education", "Public Health", "Liberal Arts"],
    tuition: "Varies by program",
    acceptance: "Highly competitive",
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600",
    description: "AKU is a private research university founded in 1983, renowned for its contributions to health sciences and education across multiple countries.",
    founded: "1983",
    website: "https://www.aku.edu",
    phone: "+92-21-3493-0051",
    email: "info@aku.edu",
    address: "Stadium Road, Karachi 74800, Pakistan",
    campusSize: "84 acres",
    facultyStudentRatio: "1:6",
    internationalStudents: "Significant presence",
    facilities: [
      "Teaching hospital",
      "Research centers",
      "Libraries",
      "Student housing",
      "Sports complex"
    ],
    admissionRequirements: [
      "High academic standing",
      "Entrance test",
      "Interview"
    ],
    scholarships: [
      "Need-based financial aid",
      "Merit-based scholarships"
    ],
    programs_detailed: [
      {
        name: "MBBS",
        duration: "5 years",
        degree: "MBBS",
        description: "Comprehensive medical program with clinical rotations."
      },
      {
        name: "Bachelor of Science in Nursing",
        duration: "4 years",
        degree: "BScN",
        description: "Program focusing on nursing skills and patient care."
      }
    ]
  },
  {
    id: "4",
    name: "Institute of Business Administration (IBA), Karachi",
    location: "Karachi, Sindh",
    type: "Public",
    ranking: "#4 in Pakistan",
    students: "Varies",
    programs: ["Business Administration", "Computer Science", "Economics", "Accounting and Finance"],
    tuition: "Approximately PKR 600,000/year",
    acceptance: "Highly competitive",
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=600",
    description: "IBA Karachi is a premier public business school offering a range of undergraduate and graduate programs with a strong emphasis on leadership and entrepreneurship.",
    founded: "1955",
    website: "https://www.iba.edu.pk/",
    phone: "+92-21-111-422-422",
    email: "admissions@iba.edu.pk",
    address: "University Road, Karachi, Pakistan",
    campusSize: "Main and City campuses",
    facultyStudentRatio: "1:15",
    internationalStudents: "Limited",
    facilities: [
      "Libraries",
      "Computer labs",
      "Sports complex",
      "Hostels",
      "Cafeteria"
    ],
    admissionRequirements: [
      "Intermediate or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "BBA",
        duration: "4 years",
        degree: "BBA",
        description: "Comprehensive business program focusing on management, marketing, and finance."
      },
      {
        name: "BS Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Program covering software development, algorithms, and data structures."
      }
    ]
  },
  {
    id: "5",
    name: "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology (GIKI)",
    location: "Topi, Khyber Pakhtunkhwa",
    type: "Private",
    ranking: "#5 in Pakistan",
    students: "2,000+",
    programs: ["Engineering", "Computer Science", "Materials Science"],
    tuition: "Approximately PKR 600,000/year",
    acceptance: "Highly competitive",
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=600",
    description: "GIKI is a prestigious private engineering institute known for its rigorous academic programs and research excellence. Established in 1993, it offers state-of-the-art facilities and a scenic campus.",
    founded: "1993",
    website: "http://www.giki.edu.pk/",
    phone: "+92-938-271858",
    email: "info@giki.edu.pk",
    address: "Topi, Khyber Pakhtunkhwa, Pakistan",
    campusSize: "400 acres",
    facultyStudentRatio: "1:10",
    internationalStudents: "Limited",
    facilities: [
      "Modern laboratories",
      "Central library",
      "Sports complex",
      "Hostels",
      "Auditorium"
    ],
    admissionRequirements: [
      "FSc Pre-Engineering or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "BS Electrical Engineering",
        duration: "4 years",
        degree: "BS",
        description: "Program focusing on electrical systems, electronics, and communication."
      },
      {
        name: "BS Computer Engineering",
        duration: "4 years",
        degree: "BS",
        description: "Program covering computer hardware, software, and systems design."
      }
    ]
  },
  {
    id: "6",
    name: "FAST National University of Computer and Emerging Sciences",
    location: "Multiple Campuses",
    type: "Private",
    ranking: "#6 in Pakistan",
    students: "Varies",
    programs: ["Computer Science", "Software Engineering", "Electrical Engineering", "Business Administration"],
    tuition: "Approximately PKR 120,000 per semester",
    acceptance: "Competitive",
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=600",
    description: "FAST-NUCES is a leading private university in Pakistan, known for its excellence in computer science and engineering education.",
    founded: "2000",
    website: "https://www.nu.edu.pk",
    phone: "+92-51-111-128-128",
    email: "info@nu.edu.pk",
    address: "Multiple campuses across Pakistan",
    campusSize: "Varies",
    facultyStudentRatio: "1:20",
    internationalStudents: "Limited",
    facilities: [
      "Modern laboratories",
      "Libraries",
      "Hostels",
      "Sports facilities"
    ],
    admissionRequirements: [
      "Intermediate or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "BS Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Program focusing on algorithms, programming, and software development."
      },
      {
        name: "BS Electrical Engineering",
        duration: "4 years",
        degree: "BS",
        description: "Program covering electrical systems, electronics, and communication."
      }
    ]
  },
  {
    id: "7",
    name: "Air University",
    location: "Islamabad, Punjab",
    type: "Public",
    ranking: "#7 in Pakistan",
    students: "Varies",
    programs: ["Engineering", "Business Administration", "Computer Science", "Aerospace Sciences"],
    tuition: "Approximately PKR 90,000 per semester",
    acceptance: "Competitive",
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=600",
    description: "Established in 2002, Air University is a public sector university under the Pakistan Air Force, offering programs in engineering, business, and more.",
    founded: "2002",
    website: "https://www.au.edu.pk",
    phone: "+92-51-9153225",
    email: "registrar@mail.au.edu.pk",
    address: "PAF Complex E-9, Islamabad, Pakistan",
    campusSize: "Varies",
    facultyStudentRatio: "1:20",
    internationalStudents: "Limited",
    facilities: [
      "Laboratories",
      "Libraries",
      "Hostels",
      "Sports facilities"
    ],
    admissionRequirements: [
      "Intermediate or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "BS Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Program covering software development, algorithms, and data structures."
      },
      {
        name: "BBA",
        duration: "4 years",
        degree: "BBA",
        description: "Business program focusing on management and entrepreneurship."
      }
    ]
  },
  {
    id: "8",
    name: "Dow University of Health Sciences (DUHS)",
    location: "Karachi, Sindh",
    type: "Public",
    ranking: "#8 in Pakistan",
    students: "Varies",
    programs: ["Medicine", "Dentistry", "Pharmacy", "Nursing", "Public Health"],
    tuition: "Varies by program",
    acceptance: "Highly competitive",
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=600",
    description: "DUHS is a premier public medical university in Karachi, offering a wide range of health sciences programs.",
    founded: "2003",
    website: "https://www.duhs.edu.pk",
    phone: "+92-21-99215754",
    email: "info@duhs.edu.pk",
    address: "Baba-e-Urdu Road, Karachi, Pakistan",
    campusSize: "Urban",
    facultyStudentRatio: "N/A",
    internationalStudents: "Limited",
    facilities: [
      "Teaching hospitals",
      "Research centers",
      "Libraries",
      "Laboratories"
    ],
    admissionRequirements: [
      "FSc Pre-Medical or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "MBBS",
        duration: "5 years",
        degree: "MBBS",
        description: "Comprehensive medical program with clinical training."
      },
      {
        name: "BDS",
        duration: "4 years",
        degree: "BDS",
        description: "Dental program focusing on oral health and surgery."
      }
    ]
  },
  {
    id: "9",
    name: "Habib University",
    location: "Karachi, Sindh",
    type: "Private",
    ranking: "#9 in Pakistan",
    students: "Varies",
    programs: ["Computer Science", "Electrical Engineering", "Social Development and Policy", "Communication and Design"],
    tuition: "Approximately PKR 1,200,000/year",
    acceptance: "Selective",
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=600",
    description: "Habib University is a private liberal arts university in Karachi, offering interdisciplinary programs with a focus on critical thinking and innovation.",
    founded: "2014",
    website: "https://habib.edu.pk/",
    phone: "+92-21-111-042-242",
    email: "admissions@habib.edu.pk",
    address: "University Avenue, Off Shahrah-e-Faisal, Karachi, Pakistan",
    campusSize: "6.3 acres",
    facultyStudentRatio: "1:12",
    internationalStudents: "Limited",
    facilities: [
      "Modern classrooms",
      "Library",
      "Innovation lab",
      "Student lounges",
      "Cafeteria"
    ],
    admissionRequirements: [
      "High school diploma or equivalent",
      "Admission test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "BS Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Program emphasizing computational thinking and software development."
      },
      {
        name: "BA Social Development and Policy",
        duration: "4 years",
        degree: "BA",
        description: "Interdisciplinary program focusing on social change and policy analysis."
      }
    ]
  },
  {
    id: "10",
    name: "Mehran University of Engineering and Technology (MUET)",
    location: "Jamshoro, Sindh",
    type: "Public",
    ranking: "#10 in Pakistan",
    students: "Approximately 10,000",
    programs: ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Computer Systems Engineering", "Software Engineering"],
    tuition: "Approximately PKR 50,000 per semester",
    acceptance: "Competitive",
    rating: 4.2,
    image: "/placeholder.svg?height=400&width=600",
    description: "MUET is a prominent public engineering university offering a wide range of undergraduate and postgraduate programs. Established in 1963, it is known for its quality education and research in engineering and technology.",
    founded: "1963",
    website: "https://www.muet.edu.pk",
    phone: "+92-22-2772250",
    email: "info@muet.edu.pk",
    address: "Indus Highway, Jamshoro, Sindh, Pakistan",
    campusSize: "Large campus with modern facilities",
    facultyStudentRatio: "1:15",
    internationalStudents: "Limited",
    facilities: [
      "Engineering laboratories",
      "Computer labs",
      "Library",
      "Hostels",
      "Sports facilities"
    ],
    admissionRequirements: [
      "FSc Pre-Engineering or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "BE Civil Engineering",
        duration: "4 years",
        degree: "BE",
        description: "Program focusing on the design, construction, and maintenance of infrastructure projects."
      },
      {
        name: "BE Software Engineering",
        duration: "4 years",
        degree: "BE",
        description: "Program covering software development, testing, and project management."
      }
    ]
  },
  {
    id: "11",
    name: "NED University of Engineering and Technology",
    location: "Karachi, Sindh",
    type: "Public",
    ranking: "#11 in Pakistan",
    students: "Approximately 13,000",
    programs: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Computer Systems Engineering", "Software Engineering"],
    tuition: "Approximately PKR 50,000 per semester",
    acceptance: "Approximately 40%",
    rating: 4.2,
    image: "/placeholder.svg?height=400&width=600",
    description: "NED University is one of the oldest engineering institutions in Pakistan, established in 1921. It offers a wide range of undergraduate and postgraduate programs in engineering and technology.",
    founded: "1921",
    website: "https://www.neduet.edu.pk",
    phone: "+92-21-99261261-8",
    email: "registrar@neduet.edu.pk",
    address: "University Road, Karachi, Pakistan",
    campusSize: "Urban campus",
    facultyStudentRatio: "1:20",
    internationalStudents: "Limited",
    facilities: [
      "Engineering laboratories",
      "Central library",
      "Hostels",
      "Sports complex",
      "Medical center"
    ],
    admissionRequirements: [
      "FSc Pre-Engineering or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "BE Civil Engineering",
        duration: "4 years",
        degree: "BE",
        description: "Program focusing on the design, construction, and maintenance of infrastructure projects."
      },
      {
        name: "BE Software Engineering",
        duration: "4 years",
        degree: "BE",
        description: "Program covering software development, testing, and project management."
      }
    ]
  },
  {
    id: "12",
    name: "Bahria University Islamabad",
    location: "Islamabad, Punjab",
    type: "Public",
    ranking: "#12 in Pakistan",
    students: "Varies",
    programs: ["Engineering", "Computer Science", "Management Sciences", "Law", "Social Sciences"],
    tuition: "Approximately PKR 100,000 per semester",
    acceptance: "Competitive",
    rating: 4.4,
    image: "/placeholder.svg?height=400&width=600",
    description: "Bahria University Islamabad Campus offers diverse programs in engineering, management, law, and social sciences.",
    founded: "2000",
    website: "https://www.bahria.edu.pk",
    phone: "+92-51-9260002",
    email: "info@bahria.edu.pk",
    address: "E-8, Islamabad, Pakistan",
    campusSize: "Varies",
    facultyStudentRatio: "1:15",
    internationalStudents: "Limited",
    facilities: [
      "State-of-the-art classrooms",
      "Laboratories",
      "Library",
      "Hostels",
      "Sports facilities"
    ],
    admissionRequirements: [
      "Intermediate or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "BS Electrical Engineering",
        duration: "4 years",
        degree: "BS",
        description: "Program covering electrical systems, electronics, and power engineering."
      },
      {
        name: "LLB",
        duration: "5 years",
        degree: "LLB",
        description: "Law program focusing on legal principles and practices."
      }
    ]
  },
  {
    id: "13",
    name: "Institute of Business Management (IoBM), Karachi",
    location: "Karachi, Sindh",
    type: "Private",
    ranking: "#13 in Pakistan",
    students: "6,000+",
    programs: ["Business Administration", "Economics", "Computer Science", "Engineering"],
    tuition: "Approximately PKR 500,000/year",
    acceptance: "Competitive",
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=600",
    description: "IoBM is a private university offering a range of programs in business, economics, and engineering, known for its industry-oriented curriculum.",
    founded: "1995",
    website: "https://www.iobm.edu.pk/",
    phone: "+92-21-111-002-004",
    email: "admissions@iobm.edu.pk",
    address: "Korangi Creek, Karachi, Pakistan",
    campusSize: "20 acres",
    facultyStudentRatio: "1:20",
    internationalStudents: "Limited",
    facilities: [
      "Modern classrooms",
      "Libraries",
      "Computer labs",
      "Sports facilities",
      "Hostels"
    ],
    admissionRequirements: [
      "Intermediate or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "BBA",
        duration: "4 years",
        degree: "BBA",
        description: "Program focusing on business management, marketing, and entrepreneurship."
      },
      {
        name: "BS Computer Science",
        duration: "4 years",
        degree: "BS",
        description: "Program covering programming, databases, and software engineering."
      }
    ]
  },
  {
    id: "14",
    name: "Bahria University Karachi",
    location: "Karachi, Sindh",
    type: "Public",
    ranking: "#14 in Pakistan",
    students: "Varies",
    programs: ["Engineering", "Computer Science", "Management Sciences", "Health Sciences"],
    tuition: "Approximately PKR 100,000 per semester",
    acceptance: "Competitive",
    rating: 4.4,
    image: "/placeholder.svg?height=400&width=600",
    description: "Bahria University Karachi Campus offers a range of programs in engineering, management, and health sciences.",
    founded: "2000",
    website: "https://www.bahria.edu.pk/karachi-campus/",
    phone: "+92-21-99240002",
    email: "info@bahria.edu.pk",
    address: "13, National Stadium Road, Karachi, Pakistan",
    campusSize: "Varies",
    facultyStudentRatio: "1:15",
    internationalStudents: "Limited",
    facilities: [
      "Modern classrooms",
      "Laboratories",
      "Library",
      "Hostels",
      "Sports complex"
    ],
    admissionRequirements: [
      "Intermediate or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "BS Software Engineering",
        duration: "4 years",
        degree: "BS",
        description: "Program focusing on software development and engineering principles."
      },
      {
        name: "BBA",
        duration: "4 years",
        degree: "BBA",
        description: "Business program with specializations in marketing, finance, and HR."
      }
    ]
  },
  {
    id: "15",
    name: "Indus Valley School of Art and Architecture (IVS)",
    location: "Karachi, Sindh",
    type: "Private",
    ranking: "#15 in Pakistan",
    students: "Approximately 1,000",
    programs: ["Fine Art", "Communication Design", "Textile Design", "Interior Design", "Architecture"],
    tuition: "Approximately PKR 304,200 per semester",
    acceptance: "Highly competitive",
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=600",
    description: "IVS is a premier institution offering undergraduate programs in art, design, and architecture. Established in 1990, it is known for its rigorous academic environment and vibrant creative community.",
    founded: "1990",
    website: "https://www.indusvalley.edu.pk",
    phone: "+92-21-3586-5010",
    email: "info@indusvalley.edu.pk",
    address: "ST-33, Block 2, Scheme 5, Clifton, Karachi, Pakistan",
    campusSize: "Urban campus",
    facultyStudentRatio: "1:10",
    internationalStudents: "Limited",
    facilities: [
      "Art studios",
      "Design labs",
      "Library",
      "Exhibition spaces",
      "Workshops"
    ],
    admissionRequirements: [
      "Intermediate or equivalent",
      "Entrance test",
      "Portfolio submission",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "Bachelor of Fine Arts",
        duration: "4 years",
        degree: "BFA",
        description: "Program focusing on various disciplines of fine arts including painting, sculpture, and printmaking."
      },
      {
        name: "Bachelor of Architecture",
        duration: "5 years",
        degree: "BArch",
        description: "Comprehensive program covering architectural design, theory, and practice."
      }
    ]
  },
  {
    id: "16",
    name: "Liaquat University of Medical and Health Sciences (LUMHS)",
    location: "Jamshoro, Sindh",
    type: "Public",
    ranking: "#16 in Pakistan",
    students: "Approximately 5,000",
    programs: ["Medicine", "Dentistry", "Pharmacy", "Nursing", "Allied Health Sciences"],
    tuition: "Varies by program; e.g., DPT: PKR 250,000 per semester",
    acceptance: "Highly competitive",
    rating: 4.3,
    image: "/placeholder.svg?height=400&width=600",
    description: "LUMHS is a leading public medical university offering a range of undergraduate and postgraduate programs in health sciences. Established in 1951, it is recognized for its academic excellence and research contributions.",
    founded: "1951",
    website: "https://www.lumhs.edu.pk",
    phone: "+92-22-9213305",
    email: "info@lumhs.edu.pk",
    address: "Indus Highway, Jamshoro, Sindh, Pakistan",
    campusSize: "Spacious campus with teaching hospitals",
    facultyStudentRatio: "1:12",
    internationalStudents: "Limited",
    facilities: [
      "Teaching hospitals",
      "Research laboratories",
      "Library",
      "Hostels",
      "Sports complex"
    ],
    admissionRequirements: [
      "FSc Pre-Medical or equivalent",
      "Entry test (e.g., MDCAT)",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "MBBS",
        duration: "5 years",
        degree: "MBBS",
        description: "Comprehensive medical program with clinical training in affiliated hospitals."
      },
      {
        name: "Doctor of Physical Therapy (DPT)",
        duration: "5 years",
        degree: "DPT",
        description: "Program focusing on physical rehabilitation and therapy techniques."
      }
    ]
  },
  {
    id: "17",
    name: "People's University of Medical and Health Sciences for Women (PUMHS)",
    location: "Nawabshah, Sindh",
    type: "Public",
    ranking: "#17 in Pakistan",
    students: "Approximately 2,000",
    programs: ["Medicine", "Pharmacy", "Nursing", "Physical Therapy", "Public Health"],
    tuition: "PKR 45,000/year (local); PKR 100,000/year (self-finance); USD 5,000/year (overseas)",
    acceptance: "Highly competitive",
    rating: 4.4,
    image: "/placeholder.svg?height=400&width=600",
    description: "PUMHS is a public medical university dedicated to women's education in health sciences. Established in 1974, it offers a range of undergraduate and postgraduate programs and is affiliated with several teaching hospitals.",
    founded: "1974",
    website: "https://pumhs.edu.pk",
    phone: "+92-244-9370249",
    email: "info@pumhs.edu.pk",
    address: "People's Road, Nawabshah, Sindh, Pakistan",
    campusSize: "Urban campus",
    facultyStudentRatio: "1:15",
    internationalStudents: "Limited",
    facilities: [
      "Teaching hospitals",
      "Research laboratories",
      "Library",
      "Hostels",
      "Medical center"
    ],
    admissionRequirements: [
      "FSc Pre-Medical or equivalent with minimum 60% marks",
      "Entry test (e.g., MDCAT)",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "MBBS",
        duration: "5 years",
        degree: "MBBS",
        description: "Comprehensive medical program with clinical training in affiliated hospitals."
      },
      {
        name: "Doctor of Physical Therapy (DPT)",
        duration: "5 years",
        degree: "DPT",
        description: "Program focusing on physical rehabilitation and therapy techniques."
      }
    ]
  },
  {
    id: "18",
    name: "Chandka Medical College (CMC)",
    location: "Larkana, Sindh",
    type: "Public",
    ranking: "#18 in Pakistan",
    students: "Varies",
    programs: ["Medicine", "Surgery"],
    tuition: "Approximately PKR 50,000 per year",
    acceptance: "Competitive",
    rating: 4.2,
    image: "/placeholder.svg?height=400&width=600",
    description: "Established in 1973, CMC is a public medical college offering MBBS and postgraduate training.",
    founded: "1973",
    website: "http://www.cmc.edu.pk",
    phone: "+92-74-9410711",
    email: "info@cmc.edu.pk",
    address: "Main CMC Road & High Court Road, Larkana, Sindh, Pakistan",
    campusSize: "Varies",
    facultyStudentRatio: "1:10",
    internationalStudents: "Limited",
    facilities: [
      "Teaching hospital",
      "Laboratories",
      "Library",
      "Hostels"
    ],
    admissionRequirements: [
      "FSc Pre-Medical or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships",
      "Need-based financial aid"
    ],
    programs_detailed: [
      {
        name: "MBBS",
        duration: "5 years",
        degree: "MBBS",
        description: "Medical program with clinical rotations and training."
      }
    ]
  },
  {
    id: "19",
    name: "Denning's Law College",
    location: "Karachi, Sindh",
    type: "Private",
    ranking: "#19 in Pakistan",
    students: "Varies",
    programs: ["LLB", "LLM"],
    tuition: "Varies by program",
    acceptance: "Moderate",
    rating: 4.0,
    image: "/placeholder.svg?height=400&width=600",
    description: "Denning's Law College is a private institution in Karachi offering legal education programs, including LLB and LLM degrees.",
    founded: "Year not specified",
    website: "N/A",
    phone: "N/A",
    email: "N/A",
    address: "Karachi, Pakistan",
    campusSize: "N/A",
    facultyStudentRatio: "N/A",
    internationalStudents: "Limited",
    facilities: [
      "Law library",
      "Moot court",
      "Lecture halls"
    ],
    admissionRequirements: [
      "Intermediate or equivalent",
      "Entry test",
      "Interview"
    ],
    scholarships: [
      "Merit-based scholarships"
    ],
    programs_detailed: [
      {
        name: "LLB",
        duration: "5 years",
        degree: "LLB",
        description: "Undergraduate law program covering various aspects of legal studies."
      },
      {
        name: "LLM",
        duration: "2 years",
        degree: "LLM",
        description: "Postgraduate program focusing on specialized areas of law."
      }
    ]
  },
]

// Expanded ambassadors data
export const ambassadors: Ambassador[] = [
  {
    id: "1",
    name: "Muhammad Dawood",
    university: "MUET Jamshoro",
    program: "Software Engineering",
    location: "Jamshoro",
    bio: "Muhammad Dawood, a Software Engineering student at MUET, Having been through the ups and downs of the admission process myself, I know how overwhelming it can feel. Through Guide Grad, I hope to be the mentor I once needed. Helping students find clarity, confidence, and the right path forward.",
    image: "/ambassadors/dawood.jpg",
    specialties: ["Engineering", "Technical Interviews", "Research"],
    languages: ["English", "Urdu"]
  },
  {
    id: "2",
    name: "Hudebia",
    university: "MUET Jamshoro",
    program: "Computer Systems Engineering",
    location: "Jamshoro",
    bio: "I'm a Computer Systems Engineering student with a passion for learning and leading. I enjoy being part of communities that make a difference. I believe in sharing knowledge and support fellow students by connecting them to valuable resources.",
    image: "/ambassadors/ali.jpg",
    specialties: ["Engineering", "Technical Interviews", "Research"],
    languages: ["English", "Urdu", "Punjabi"]
  },
  {
    id: "3",
    name: "Syeda Tahreem",
    university: "NED Karachi",
    program: "Computer Science",
    location: "Karachi",
    bio: "I am a second year student of BS Computer Science with a specialization in AI at NED University of Engineering and Technology. Inspired by the support and mentorship I once received, I aspire to empower students to pursue their dreams and gain admission to their dream universities. I aim to share my experiences and insight so that others can benefit from my journey and feel confident in taking their own steps toward success.",
    image: "/ambassadors/fatima.jpg",
    specialties: ["Engineering", "Technical Interviews", "Research"],
    languages: ["English", "Urdu"]
  },
  {
    id: "4",
    name: "Aneesha Govand",
    university: "PUMHS Nawabshah",
    program: "MBBS",
    location: "Nawabshah",
    bio: "A MS-3 student at PUMHS, looking forward to helping the girls out there and will try my level best to be the guide that I needed the most.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Software Development", "Internships", "Tech Industry"],
    languages: ["English", "Urdu"]
  },
  {
    id: "5",
    name: "Ali Aan",
    university: "FAST Islamabad",
    program: "Computer Science",
    location: "Islamabad",
    bio: "A BS Computer Science sophomore at FAST NUCES Islamabad, I'm excited to contribute to this initiative, guiding and motivating students as they aim to join our esteemed institution.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Medical School", "MCAT Prep", "Clinical Experience"],
    languages: ["English", "Urdu"]
  },
  {
    id: "6",
    name: "Dinesh Kumar",
    university: "DOW Medical College",
    program: "MBBS",
    location: "Karachi",
    bio: "Navigate wisely, thrive fully! I'm Dinesh Kumar, MS-3 at Dow Medical College. Ready to serve and make a difference in our community.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Engineering", "Project Management", "Construction"],
    languages: ["English", "Urdu", "Punjabi"]
  },
  {
    id: "7",
    name: "Kabir Shaikh",
    university: "IOBM Karachi",
    program: "Data Science",
    location: "Karachi",
    bio: "Currently pursuing my studies at IOBM. Motivated by the support I once recieved, I am committed to guiding and mentoring students as they navigate their academic and career journeys.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Business Strategy", "Entrepreneurship", "Finance"],
    languages: ["English", "Urdu"]
  },
  {
    id: "8",
    name: "Rohan Kumar",
    university: "ICAP",
    program: "CA",
    location: "Karachi",
    bio: "A CA and ACCA aspirant eager to leverage my financial accumen to help students make informed decisions about their future academic and career paths.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Programming", "Competitive Coding", "Tech Careers"],
    languages: ["English", "Urdu"]
  },
  {
    id: "9",
    name: "Khan Muhammad",
    university: "GIKI",
    program: "Electrical Engineering",
    location: "Topi",
    bio: "I'm Khan Muhammad, a 2nd year Electrical Engineering student at GIKI. I understand how overwhelming the undergrad journey can be, and I'm here to guide students through their admissions, helping them unlock their true potential.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "10",
    name: "Sham Tarani",
    university: "NUST Islamabad",
    program: "Computer Science",
    location: "Islamabad",
    bio: "2nd year CS Student at National University of Sciences and Technology, Islamabad.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "11",
    name: "Israr Ahmed",
    university: "Dennings Law College",
    program: "LLB",
    location: "Karachi",
    bio: "I'm Israr Ahmed, a 1st year LLB (Hons) student at Denning Law College. Having recently navigated the intense law school application process myself, I'm committed to helping students tacklev their ungergrad admissions with clarity and confidence.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "12",
    name: "Musawar Ali Shah",
    university: "MUET SZAB",
    program: "Mechanical Engineering",
    location: "Khairpur",
    bio: "I am a student of Mechanical Engineering Department at MUET SZAB. I appreciate this initiative because it is really necessary to guide high school students fr career opportunities. I am ready to serve for this cause and will be glad to be part of this.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "13",
    name: "Simroza Khowaja",
    university: "IVS Karachi",
    program: "Fashion Design",
    location: "Karachi",
    bio: "A Fashion Design student from IVS Karachi, who always believed that art and design isn't just a subject it's a voice, a story, and a form of power. I've joined this initiative to uplift students who dare to follow their passion for arts and design. Because the skills, vision, and resilience of an artist deserve to be celebrated, not sidelined. Let's give creativity the recognition it's long been waiting for!",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "14",
    name: "Mohsin Mukhtiar",
    university: "Air University",
    program: "Cyber Security",
    location: "Islamabad",
    bio: "A Cyber Security undergrad with an interest in making and breaking things. A passionate programmer, hacker nad CTF player, looking forward to guide students.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "15",
    name: "Neeraj Kumar",
    university: "IBA Karachi",
    program: "Computer Science",
    location: "Karachi",
    bio: "I'm Neeraj Kumar, currently a sophomore at IBA Karachi. Driven by the guidance I once recieved, I aspire to empower and mentor future IBA aspirants through this meaningful initiative.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "16",
    name: "Qirat Khowaja",
    university: "AKU",
    program: "Nursing",
    location: "Karachi",
    bio: "With passion as my palette adn care as my canvas. I'm Qirat Khowaja a final year nursing student at Aga Khan University, joining Guide Grad to revolutionize and paint a new masterpiece about nursing. Where art meets care, and compassion meets precision. So, why not bring healthcare magic together!",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "17",
    name: "Basit Khan",
    university: "Bahria University",
    program: "Psychology",
    location: "Karachi",
    bio: "I'm Basit Khan, a 1st year Psychology student at Institute of Professional Psychology, Bahria University (Karachi Campus). Glad to be a member of the Guide Grad and always ready to help fellow students out there.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "18",
    name: "Mehak Riaz Shaikh",
    university: "Habib University",
    program: "Social Sciences",
    location: "Karachi",
    bio: "I'm Mehak Riaz Shaikh, a 2nd year student of Social Sciences with major in social development and policy at Habib University. As having gone through undergraduate struggles myself, I will give my 100% to help students navigate through their undergraduate admissions smoothly, guiding them to discover their true potential and passions.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "19",
    name: "Musawar Lashari",
    university: "Chandka Medical College",
    program: "MBBS",
    location: "Larkana",
    bio: "I'm Musawar Lashari, a 2nd year MBBS student at Chandka Medical College. I'm excited to contribute to this initiative, guiding and motivating students as they aim to join our esteemed institution.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
  },
  {
    id: "20",
    name: "Zain Mehdi",
    university: "LUMS",
    program: "Political Science",
    location: "Lahore",
    bio: "Zain Mehdi from Lahore University of Management Sciences, School of Humanities and Social Science. I'm excited to contribute to this initiative, guiding and motivating students as they aim to join our esteemed institution.",
    image: "/placeholder.svg?height=150&width=150",
    specialties: ["Economics", "Research", "Policy Analysis"],
    languages: ["English", "Urdu", "Sindhi"]
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
    deadline: "March 31, 2026",
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
    applicationUrl: "https://www.hec.gov.pk/english/scholarshipsgrants/NBS/Pages/default.aspx",
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

  // If no filters are passed, return all universities
  if (!filters) {
    return [...universities]
  }

  let filtered = [...universities]

  if (filters.search) {
    filtered = filtered.filter(
      (uni) =>
        uni.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        uni.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        uni.programs.some((program) => program.toLowerCase().includes(filters.search.toLowerCase())),
    )
  }

  if (filters.location && filters.location !== "all") {
    filtered = filtered.filter((uni) => uni.location.toLowerCase().includes(filters.location.toLowerCase()))
  }

  if (filters.type && filters.type !== "all") {
    filtered = filtered.filter((uni) => uni.type.toLowerCase() === filters.type.toLowerCase())
  }

  if (filters.program && filters.program !== "all") {
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

export async function applyForScholarship(scholarshipId: string, applicationData: ScholarshipApplication): Promise<boolean> {
  // Mock scholarship application
  console.log(`Scholarship application submitted for ${scholarshipId}:`, applicationData)
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return true
}
