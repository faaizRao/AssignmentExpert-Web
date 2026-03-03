/**
 * Service Data Catalog
 * 
 * Comprehensive catalog of academic services offered by Academics Consulate.
 * Includes 20+ services across writing, editing, research, and career categories.
 */

import { Service, ServiceCategory } from '@/types/services';

/**
 * Complete service catalog
 * 
 * Contains all available academic services with detailed information
 * for display on service pages and throughout the website.
 */
export const services: Service[] = [
  // WRITING SERVICES
  {
    id: 'assignment-writing',
    name: 'Assignment Writing',
    slug: 'assignment-writing',
    description: 'Professional assignment writing services for all academic levels and subjects with expert writers and guaranteed quality.',
    longDescription: 'Our expert assignment writing service provides comprehensive support for students across all academic levels. Whether you need help with undergraduate coursework or complex postgraduate assignments, our qualified writers deliver well-researched, properly structured, and original content. We cover all subjects including humanities, sciences, business, engineering, and more. Each assignment is crafted to meet your specific requirements, follows academic standards, and is delivered on time.',
    benefits: [
      'Expert writers with advanced degrees',
      'Original, plagiarism-free content',
      'Timely delivery guaranteed',
      'Free revisions included',
      'Proper citation and referencing'
    ],
    icon: 'assignment',
    category: ServiceCategory.WRITING,
    featured: true,
    metaTitle: 'Assignment Writing Service | Academics Consulate',
    metaDescription: 'Get expert assignment writing help from qualified writers. Original content, timely delivery, and free revisions. All subjects and academic levels covered.'
  },
  {
    id: 'essay-writing',
    name: 'Essay Writing',
    slug: 'essay-writing',
    description: 'Custom essay writing services for argumentative, descriptive, and analytical essays with expert research and strong thesis development.',
    longDescription: 'Our essay writing service specializes in crafting compelling, well-structured essays that meet academic standards. From argumentative and persuasive essays to descriptive and analytical pieces, our experienced writers understand the nuances of different essay types. We conduct thorough research, develop strong thesis statements, and present coherent arguments supported by credible sources. Each essay is tailored to your specific requirements and academic level. Our comprehensive approach ensures your essay demonstrates critical thinking, clear organization, and effective communication of ideas.',
    benefits: [
      'All essay types covered',
      'Strong thesis development',
      'Critical analysis and argumentation',
      'Proper essay structure',
      'Academic writing standards'
    ],
    icon: 'essay',
    category: ServiceCategory.WRITING,
    featured: true,
    metaTitle: 'Custom Essay Writing Service | Expert Essay Writers',
    metaDescription: 'Professional essay writing service for all essay types. Expert writers deliver well-researched, properly structured essays with strong arguments.'
  },
  {
    id: 'dissertation-writing',
    name: 'Dissertation Writing',
    slug: 'dissertation-writing',
    description: 'Comprehensive dissertation writing support from proposal to final submission with PhD-qualified writers and rigorous research standards.',
    longDescription: 'Our dissertation writing service provides end-to-end support for one of the most challenging academic endeavors. We assist with every stage of the dissertation process, from developing a strong research proposal to conducting literature reviews, methodology design, data analysis, and final writing. Our PhD-qualified writers have extensive experience in academic research and understand the rigorous standards required for dissertation success. We ensure your work is original, methodologically sound, and contributes meaningfully to your field.',
    benefits: [
      'PhD-qualified writers',
      'Full dissertation or chapter-by-chapter support',
      'Methodology and research design expertise',
      'Statistical analysis assistance',
      'Comprehensive literature reviews'
    ],
    icon: 'dissertation',
    category: ServiceCategory.WRITING,
    featured: true,
    metaTitle: 'Dissertation Writing Service | PhD Expert Writers',
    metaDescription: 'Professional dissertation writing help from PhD experts. Full support from proposal to completion. Original research and rigorous academic standards.'
  },
  {
    id: 'coursework-writing',
    name: 'Coursework Writing',
    slug: 'coursework-writing',
    description: 'Quality coursework writing for continuous assessment and module completion with subject-specific expertise and thorough research.',
    longDescription: 'Our coursework writing service helps students excel in their continuous assessment tasks. We understand that coursework often requires a combination of research, analysis, and practical application. Our writers are experienced in producing high-quality coursework across various subjects and formats, including reports, case studies, reflective pieces, and practical assignments. We ensure your coursework meets all assessment criteria and demonstrates a thorough understanding of the subject matter.',
    benefits: [
      'All coursework types covered',
      'Meets assessment criteria',
      'Subject-specific expertise',
      'Practical and theoretical balance',
      'Clear and concise writing'
    ],
    icon: 'coursework',
    category: ServiceCategory.WRITING,
    featured: true,
    metaTitle: 'Coursework Writing Service | Expert Academic Help',
    metaDescription: 'Professional coursework writing service for all subjects. Expert writers deliver quality work that meets assessment criteria and academic standards.'
  },
  {
    id: 'research-paper-writing',
    name: 'Research Paper Writing',
    slug: 'research-paper-writing',
    description: 'Academic research paper writing with rigorous methodology and analysis for scholarly publications and academic excellence.',
    longDescription: 'Our research paper writing service delivers scholarly papers that meet the highest academic standards. We specialize in producing well-researched, methodologically sound papers that contribute to academic discourse. Our writers are experienced researchers who understand the importance of literature review, research design, data collection and analysis, and clear presentation of findings. Whether you need a term paper, conference paper, or journal article, we provide comprehensive support. Our rigorous approach ensures your research paper demonstrates scholarly excellence and makes a meaningful contribution to your field of study.',
    benefits: [
      'Rigorous research methodology',
      'Comprehensive literature review',
      'Data analysis and interpretation',
      'Academic writing style',
      'Proper citation and references'
    ],
    icon: 'research-paper',
    category: ServiceCategory.WRITING,
    featured: false,
    metaTitle: 'Research Paper Writing Service | Academic Research Help',
    metaDescription: 'Expert research paper writing with rigorous methodology. Comprehensive literature review, data analysis, and scholarly writing standards.'
  },
  {
    id: 'case-study-writing',
    name: 'Case Study Writing',
    slug: 'case-study-writing',
    description: 'Professional case study analysis and writing for business and academic contexts with in-depth research and practical solutions.',
    longDescription: 'Our case study writing service provides in-depth analysis and professional presentation of real-world scenarios. We excel at examining complex situations, identifying key issues, applying theoretical frameworks, and developing practical solutions. Our writers have expertise across various disciplines including business, healthcare, education, and social sciences. Each case study is thoroughly researched, critically analyzed, and presented with clear recommendations. We ensure your case study demonstrates strong analytical skills and provides actionable insights that address the core challenges presented.',
    benefits: [
      'In-depth situational analysis',
      'Theoretical framework application',
      'Problem identification and solutions',
      'Professional presentation',
      'Evidence-based recommendations'
    ],
    icon: 'case-study',
    category: ServiceCategory.WRITING,
    featured: false,
    metaTitle: 'Case Study Writing Service | Professional Analysis',
    metaDescription: 'Expert case study writing and analysis. In-depth examination, theoretical application, and practical solutions for academic and business contexts.'
  },
  {
    id: 'lab-report-writing',
    name: 'Lab Report Writing',
    slug: 'lab-report-writing',
    description: 'Scientific lab report writing with proper methodology and data presentation for accurate results and clear interpretation.',
    longDescription: 'Our lab report writing service specializes in producing clear, accurate, and well-structured scientific reports. We understand the specific requirements of lab reports including proper documentation of experimental procedures, accurate data presentation, statistical analysis, and meaningful interpretation of results. Our writers have scientific backgrounds and experience in various disciplines including biology, chemistry, physics, and engineering. We ensure your lab report follows scientific writing conventions and effectively communicates your experimental findings and conclusions.',
    benefits: [
      'Scientific writing expertise',
      'Proper methodology documentation',
      'Accurate data presentation',
      'Statistical analysis',
      'Clear results interpretation'
    ],
    icon: 'lab-report',
    category: ServiceCategory.WRITING,
    featured: false,
    metaTitle: 'Lab Report Writing Service | Scientific Report Help',
    metaDescription: 'Professional lab report writing with proper methodology and data presentation. Expert scientific writing for all disciplines.'
  },
  {
    id: 'literature-review-writing',
    name: 'Literature Review Writing',
    slug: 'literature-review-writing',
    description: 'Comprehensive literature reviews with critical analysis and synthesis of academic sources for research foundation building.',
    longDescription: 'Our literature review writing service provides thorough examination and synthesis of existing research in your field. We conduct comprehensive searches of academic databases, critically evaluate sources, identify research gaps, and synthesize findings into a coherent narrative. Our writers understand the importance of demonstrating knowledge of the field, identifying trends and debates, and positioning your research within the broader academic context. We create well-structured reviews that establish a strong foundation for your research and demonstrate your understanding of the scholarly conversation.',
    benefits: [
      'Comprehensive source identification',
      'Critical evaluation of literature',
      'Thematic organization',
      'Research gap identification',
      'Synthesis and analysis'
    ],
    icon: 'literature-review',
    category: ServiceCategory.WRITING,
    featured: false,
    metaTitle: 'Literature Review Writing Service | Expert Research Review',
    metaDescription: 'Professional literature review writing with comprehensive research, critical analysis, and synthesis. Identify gaps and position your research.'
  },

  // EDITING SERVICES
  {
    id: 'proofreading',
    name: 'Proofreading',
    slug: 'proofreading',
    description: 'Meticulous proofreading to eliminate errors and polish your academic work with expert attention to grammar, spelling, and formatting.',
    longDescription: 'Our proofreading service provides the final polish your academic work needs. We meticulously check for spelling, grammar, punctuation, and typographical errors. Our experienced proofreaders ensure consistency in style, formatting, and terminology throughout your document. We pay attention to detail while respecting your voice and intended meaning. Perfect for students who want to ensure their work is error-free before submission. Our thorough review process catches even the smallest errors that could detract from your academic credibility.',
    benefits: [
      'Error-free documents',
      'Grammar and spelling correction',
      'Punctuation and formatting',
      'Consistency checks',
      'Quick turnaround available'
    ],
    icon: 'proofreading',
    category: ServiceCategory.EDITING,
    featured: true,
    metaTitle: 'Academic Proofreading Service | Error-Free Documents',
    metaDescription: 'Professional proofreading service for academic work. Eliminate errors, ensure consistency, and polish your documents before submission.'
  },
  {
    id: 'editing',
    name: 'Editing',
    slug: 'editing',
    description: 'Comprehensive editing to improve clarity, structure, and academic quality with expert feedback and constructive suggestions.',
    longDescription: 'Our editing service goes beyond proofreading to enhance the overall quality of your academic work. We improve sentence structure, clarity, and flow while ensuring your arguments are well-developed and logically presented. Our editors check for coherence, consistency, and adherence to academic writing conventions. We provide constructive feedback and suggestions to strengthen your work while maintaining your unique voice and perspective. Our comprehensive approach ensures your writing communicates your ideas effectively and meets the highest academic standards.',
    benefits: [
      'Improved clarity and flow',
      'Enhanced argument development',
      'Structure and organization',
      'Academic writing standards',
      'Constructive feedback'
    ],
    icon: 'editing',
    category: ServiceCategory.EDITING,
    featured: true,
    metaTitle: 'Academic Editing Service | Improve Your Writing Quality',
    metaDescription: 'Professional academic editing to enhance clarity, structure, and quality. Expert editors improve flow and strengthen arguments.'
  },
  {
    id: 'formatting',
    name: 'Formatting',
    slug: 'formatting',
    description: 'Professional formatting according to academic style guides including APA, MLA, Harvard, and Chicago with precise citation formatting.',
    longDescription: 'Our formatting service ensures your academic work meets the specific requirements of your chosen style guide. We are experts in APA, MLA, Harvard, Chicago, and other academic citation styles. We format your document including title pages, headers, margins, spacing, citations, and reference lists. Our attention to detail ensures your work looks professional and meets institutional requirements. We meticulously apply formatting rules to every element of your document, ensuring complete compliance with academic standards and guidelines.',
    benefits: [
      'All major style guides covered',
      'Accurate citation formatting',
      'Reference list preparation',
      'Document layout and structure',
      'Institutional requirements met'
    ],
    icon: 'formatting',
    category: ServiceCategory.EDITING,
    featured: false,
    metaTitle: 'Academic Formatting Service | APA, MLA, Harvard, Chicago',
    metaDescription: 'Professional academic formatting for all style guides. Expert formatting of citations, references, and document layout.'
  },
  {
    id: 'plagiarism-check',
    name: 'Plagiarism Check',
    slug: 'plagiarism-check',
    description: 'Comprehensive plagiarism detection and originality verification using advanced software for academic integrity assurance.',
    longDescription: 'Our plagiarism check service uses advanced detection software to ensure your work is original and properly cited. We provide detailed reports highlighting any potential issues and offer guidance on proper citation and paraphrasing. This service gives you peace of mind before submission and helps you maintain academic integrity. We check against billions of web pages, academic databases, and previously submitted student work. Our comprehensive analysis identifies even subtle similarities and provides actionable recommendations for improvement.',
    benefits: [
      'Advanced detection software',
      'Detailed similarity reports',
      'Citation guidance',
      'Academic integrity assurance',
      'Confidential and secure'
    ],
    icon: 'plagiarism',
    category: ServiceCategory.EDITING,
    featured: false,
    metaTitle: 'Plagiarism Check Service | Ensure Academic Integrity',
    metaDescription: 'Professional plagiarism detection service. Comprehensive checks, detailed reports, and citation guidance to ensure originality.'
  },

  // RESEARCH SERVICES
  {
    id: 'research-proposal',
    name: 'Research Proposal',
    slug: 'research-proposal',
    description: 'Compelling research proposals that secure approval and funding with strong methodology and clear research objectives.',
    longDescription: 'Our research proposal writing service helps you develop a strong foundation for your research project. We assist in formulating research questions, conducting preliminary literature reviews, designing appropriate methodologies, and presenting a compelling case for your research. Our writers understand what makes a successful proposal and can help you articulate the significance, feasibility, and potential impact of your research. We work with you to create a comprehensive proposal that demonstrates your research capabilities and secures approval from committees and funding bodies.',
    benefits: [
      'Strong research question development',
      'Methodology design',
      'Literature review foundation',
      'Feasibility demonstration',
      'Compelling presentation'
    ],
    icon: 'research-proposal',
    category: ServiceCategory.RESEARCH,
    featured: false,
    metaTitle: 'Research Proposal Writing Service | Expert Proposal Help',
    metaDescription: 'Professional research proposal writing. Develop strong research questions, methodology, and compelling proposals that get approved.'
  },
  {
    id: 'annotated-bibliography',
    name: 'Annotated Bibliography',
    slug: 'annotated-bibliography',
    description: 'Comprehensive annotated bibliographies with critical summaries and evaluations of academic sources for research foundation.',
    longDescription: 'Our annotated bibliography service provides thorough summaries and critical evaluations of academic sources. We identify relevant sources, provide concise summaries of key arguments and findings, evaluate the credibility and relevance of each source, and explain how each source contributes to your research topic. Our annotated bibliographies demonstrate comprehensive understanding of the literature and help establish the foundation for your research. We ensure each annotation is well-structured, critically analytical, and properly formatted according to your required citation style.',
    benefits: [
      'Relevant source identification',
      'Critical summaries',
      'Source evaluation',
      'Proper citation format',
      'Research foundation building'
    ],
    icon: 'bibliography',
    category: ServiceCategory.RESEARCH,
    featured: false,
    metaTitle: 'Annotated Bibliography Service | Critical Source Analysis',
    metaDescription: 'Professional annotated bibliography writing. Critical summaries, source evaluation, and proper citation for your research.'
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    slug: 'data-analysis',
    description: 'Statistical data analysis and interpretation for research projects using advanced software and appropriate analytical methods.',
    longDescription: 'Our data analysis service provides expert statistical analysis and interpretation for your research data. We work with both quantitative and qualitative data, using appropriate statistical software and methods. Our analysts help you choose the right analytical techniques, conduct the analysis, interpret results, and present findings clearly. We provide detailed explanations of statistical procedures and help you understand what your data reveals. Our comprehensive approach ensures your data analysis is rigorous, accurate, and meaningful, supporting your research conclusions with solid statistical evidence.',
    benefits: [
      'Quantitative and qualitative analysis',
      'Statistical software expertise (SPSS, R, Stata)',
      'Appropriate method selection',
      'Clear results interpretation',
      'Visual data presentation'
    ],
    icon: 'data-analysis',
    category: ServiceCategory.RESEARCH,
    featured: false,
    metaTitle: 'Data Analysis Service | Statistical Analysis Help',
    metaDescription: 'Expert data analysis and interpretation. Statistical analysis, appropriate methods, and clear presentation of research findings.'
  },

  // CAREER SERVICES
  {
    id: 'cv-writing',
    name: 'CV Writing',
    slug: 'cv-writing',
    description: 'Professional CV writing for academic and research positions showcasing qualifications, achievements, and research experience.',
    longDescription: 'Our CV writing service creates compelling academic CVs that showcase your qualifications, research experience, publications, and achievements. We understand the specific requirements of academic CVs and how to present your credentials effectively for academic positions, research roles, and fellowship applications. Our writers highlight your strengths, organize information logically, and ensure your CV stands out to selection committees. We provide comprehensive support to present your academic journey and research contributions in the most impactful way possible.',
    benefits: [
      'Academic CV expertise',
      'Achievement highlighting',
      'Professional formatting',
      'Tailored to position requirements',
      'ATS-friendly design'
    ],
    icon: 'cv',
    category: ServiceCategory.CAREER,
    featured: true,
    metaTitle: 'Academic CV Writing Service | Professional CV Help',
    metaDescription: 'Professional academic CV writing service. Showcase your qualifications, research, and achievements effectively for academic positions.'
  },
  {
    id: 'resume-writing',
    name: 'Resume Writing',
    slug: 'resume-writing',
    description: 'Impactful resume writing for industry and professional positions with achievement-focused content and ATS optimization.',
    longDescription: 'Our resume writing service creates powerful resumes that get you noticed by employers. We craft concise, achievement-focused resumes that highlight your skills, experience, and value proposition. Our writers understand what employers look for and how to present your qualifications effectively. We tailor each resume to your target industry and position, ensuring it passes applicant tracking systems and impresses hiring managers. Our professional approach combines strategic content with modern design to maximize your interview opportunities.',
    benefits: [
      'Achievement-focused content',
      'Industry-specific tailoring',
      'ATS optimization',
      'Professional design',
      'Keyword optimization'
    ],
    icon: 'resume',
    category: ServiceCategory.CAREER,
    featured: true,
    metaTitle: 'Professional Resume Writing Service | Expert Resume Help',
    metaDescription: 'Professional resume writing that gets results. Achievement-focused, ATS-optimized resumes tailored to your target position.'
  },
  {
    id: 'cover-letter-writing',
    name: 'Cover Letter Writing',
    slug: 'cover-letter-writing',
    description: 'Persuasive cover letters that complement your CV or resume with personalized content and professional tone for interviews.',
    longDescription: 'Our cover letter writing service creates compelling letters that introduce you effectively to potential employers or academic institutions. We craft personalized cover letters that highlight your relevant qualifications, explain your interest in the position, and demonstrate your fit with the organization. Our writers know how to strike the right tone, showcase your personality, and persuade readers to invite you for an interview. Each cover letter is tailored to the specific position and organization, ensuring maximum impact and relevance.',
    benefits: [
      'Personalized content',
      'Position-specific tailoring',
      'Persuasive writing',
      'Professional tone',
      'Complements your CV/resume'
    ],
    icon: 'cover-letter',
    category: ServiceCategory.CAREER,
    featured: false,
    metaTitle: 'Cover Letter Writing Service | Persuasive Cover Letters',
    metaDescription: 'Professional cover letter writing that gets interviews. Personalized, persuasive letters tailored to your target position.'
  },
  {
    id: 'linkedin-profile',
    name: 'LinkedIn Profile Optimization',
    slug: 'linkedin-profile',
    description: 'LinkedIn profile optimization to enhance your professional online presence with keyword optimization and recruiter visibility.',
    longDescription: 'Our LinkedIn profile optimization service helps you create a powerful professional presence on the world\'s largest professional network. We optimize your headline, summary, experience descriptions, and skills to attract recruiters and opportunities. Our writers understand LinkedIn\'s algorithm and best practices for visibility. We help you showcase your expertise, build your professional brand, and connect with the right opportunities. Our comprehensive optimization ensures your profile stands out and positions you as a thought leader in your field.',
    benefits: [
      'Keyword optimization',
      'Compelling headline and summary',
      'Achievement-focused descriptions',
      'Professional branding',
      'Recruiter visibility'
    ],
    icon: 'linkedin',
    category: ServiceCategory.CAREER,
    featured: false,
    metaTitle: 'LinkedIn Profile Optimization | Professional Profile Writing',
    metaDescription: 'Professional LinkedIn profile optimization. Enhance visibility, attract recruiters, and build your professional brand online.'
  },
  {
    id: 'personal-statement',
    name: 'Personal Statement',
    slug: 'personal-statement',
    description: 'Compelling personal statements for university and scholarship applications showcasing unique qualities and clear motivations.',
    longDescription: 'Our personal statement writing service helps you craft a compelling narrative that showcases your unique qualities, experiences, and aspirations. We work with you to identify your strengths, articulate your motivations, and present a coherent story that resonates with admissions committees. Whether for undergraduate, postgraduate, or scholarship applications, we help you stand out from other applicants and make a memorable impression. Our experienced writers understand what admissions officers look for and help you present your story authentically and persuasively.',
    benefits: [
      'Unique story development',
      'Strength identification',
      'Motivation articulation',
      'Memorable presentation',
      'Application-specific tailoring'
    ],
    icon: 'personal-statement',
    category: ServiceCategory.CAREER,
    featured: false,
    metaTitle: 'Personal Statement Writing Service | University Applications',
    metaDescription: 'Professional personal statement writing for university and scholarship applications. Compelling narratives that showcase your unique qualities.'
  },
  {
    id: 'statement-of-purpose',
    name: 'Statement of Purpose',
    slug: 'statement-of-purpose',
    description: 'Professional statements of purpose for graduate school applications articulating research interests and academic goals clearly.',
    longDescription: 'Our statement of purpose writing service helps you articulate your academic and research interests, career goals, and fit with graduate programs. We help you present a clear and compelling case for why you are an excellent candidate for the program and how the program aligns with your goals. Our writers understand what graduate admissions committees look for and how to present your qualifications, research interests, and potential contributions effectively. We work closely with you to develop a narrative that demonstrates your passion for your field, your preparedness for graduate study, and your potential to contribute to the academic community.',
    benefits: [
      'Clear goal articulation',
      'Research interest presentation',
      'Program fit demonstration',
      'Academic background showcase',
      'Future potential highlighting'
    ],
    icon: 'statement-purpose',
    category: ServiceCategory.CAREER,
    featured: false,
    metaTitle: 'Statement of Purpose Writing | Graduate School Applications',
    metaDescription: 'Professional statement of purpose writing for graduate school. Articulate your goals, research interests, and program fit effectively.'
  }
];

/**
 * Get a service by its slug
 * 
 * @param slug - The URL-friendly identifier for the service
 * @returns The service object if found, undefined otherwise
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

/**
 * Get all services
 * 
 * @returns Array of all available services
 */
export function getAllServices(): Service[] {
  return services;
}

/**
 * Get services by category
 * 
 * @param category - The service category to filter by
 * @returns Array of services in the specified category
 */
export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter(service => service.category === category);
}

/**
 * Get featured services
 * 
 * @returns Array of services marked as featured
 */
export function getFeaturedServices(): Service[] {
  return services.filter(service => service.featured);
}

/**
 * Get service categories with counts
 * 
 * @returns Array of categories with service counts
 */
export function getCategoriesWithCounts(): Array<{ category: ServiceCategory; count: number }> {
  const categories = Object.values(ServiceCategory);
  return categories.map(category => ({
    category,
    count: getServicesByCategory(category).length
  }));
}
