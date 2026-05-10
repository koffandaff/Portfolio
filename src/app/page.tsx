"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { HeroFuturistic } from "@/components/ui/hero-futuristic";
import { CardStack } from "@/components/ui/card-stack";
import OrbitingSkills from "@/components/ui/orbiting-skills";
import { AnimatedDock } from "@/components/ui/animated-dock";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";
import { Mail, ExternalLink, FileText, Code2, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const GithubIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const TryHackMeIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L2 5.8v12.4L12 24l10-5.8V5.8L12 0zm0 2.3l8 4.6v9.2l-8 4.6-8-4.6V6.9l8-4.6zm-1.8 4.5v10.4l5.2-3v-4.4l-5.2-3zm1.2 1.8l2.8 1.6v2.8l-2.8 1.6V8.6z"/>
  </svg>
);

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <HeroFuturistic />;
  }

  return (
    <main className="relative bg-black text-white min-h-screen font-sans selection:bg-sky-500/30 overflow-x-hidden w-full">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <QuickViewSection />
      <ExperienceAndSkillsSection />
      <AchievementsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ReviewsSection />
      <OrbitingSkills />
      <ContactSection />
      <Footer />
      <ScrollToTop />
      <StickyResumeButton />
    </main>
  );
}

import { MenuContainer, MenuItem } from "@/components/ui/fluid-menu";
import { Menu as MenuIcon, X } from "lucide-react";

function Navbar() {
  const handleHireMeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('contact');
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      
      animate(0, 1, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1], // Quintic out easing for a very smooth feel
        onUpdate: (latest) => {
          window.scrollTo(0, startPosition + distance * latest);
        }
      });
    }
  };

  return (
    <nav className="absolute z-50 top-0 left-0 right-0 px-4 md:px-10 pt-6 flex items-center justify-between">
      <a href="#about" className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3 border border-white/10 z-50 hover:bg-neutral-800 transition-colors">
        <svg viewBox="0 0 256 256" className="h-5 w-5 text-white" fill="currentColor">
          <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
        </svg>
        <span className="text-white text-sm font-medium tracking-tight">Dhruvil</span>
      </a>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 bg-neutral-900/90 backdrop-blur rounded-full px-6 py-2 border border-white/10">
        <div className="flex items-center gap-3 border-r border-white/10 pr-4">
           <span title="Python / JS / React"><Code2 size={16} className="text-sky-400" /></span>
           <span title="PostgreSQL"><Database size={16} className="text-purple-400" /></span>
           <span title="Security"><Shield size={16} className="text-emerald-400" /></span>
        </div>
        {["About", "Experience", "Projects", "Reviews", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-neutral-300 hover:text-white transition-colors text-sm py-1">
            {item}
          </a>
        ))}
      </div>
      
      <div className="hidden md:flex items-center gap-3">
        <a href="https://docs.google.com/document/d/1b5B-nR_s-89PK2Q9Ssc58Plmmabhq0YI-2WpIYtSu-k/edit" target="_blank" rel="noreferrer" className="bg-sky-600 text-white border border-sky-400/50 text-sm font-medium rounded-full px-6 py-3 hover:bg-sky-500 transition-colors flex gap-2 items-center shadow-lg shadow-sky-500/20">
          <FileText size={16} /> View Resume
        </a>
        <motion.button 
          onClick={handleHireMeClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9, rotate: -1 }}
          className="bg-white text-black text-sm font-medium rounded-full px-6 py-3 hover:bg-neutral-200 transition-all block shadow-lg shadow-white/10 relative overflow-hidden"
        >
          <motion.span 
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 4, opacity: 0.3, transition: { duration: 0.4 } }}
            className="absolute inset-0 bg-sky-500 rounded-full pointer-events-none"
          />
          <span className="relative z-10">Hire Me</span>
        </motion.button>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden z-50 fixed top-6 right-4">
        <MenuContainer>
          <MenuItem 
            icon={
              <div className="relative w-5 h-5">
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180 flex justify-center items-center">
                  <MenuIcon size={20} strokeWidth={1.5} />
                </div>
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0 flex justify-center items-center">
                  <X size={20} strokeWidth={1.5} />
                </div>
              </div>
            } 
          />
          {["About", "Experience", "Projects", "Reviews"].map((item) => (
            <MenuItem key={item}>
              <a href={`#${item.toLowerCase()}`} className="w-full text-left px-4 block text-sm">
                {item}
              </a>
            </MenuItem>
          ))}
          <MenuItem 
            onClick={handleHireMeClick}
          >
            <span className="w-full text-left px-4 py-2 block text-sm text-white font-bold bg-sky-600 rounded-lg active:scale-95 transition-transform">
              Hire Me
            </span>
          </MenuItem>
          <MenuItem>
             <a href="https://docs.google.com/document/d/1b5B-nR_s-89PK2Q9Ssc58Plmmabhq0YI-2WpIYtSu-k/edit" target="_blank" rel="noreferrer" className="w-full text-left px-4 block text-sm text-sky-400">
                View Resume
             </a>
          </MenuItem>
        </MenuContainer>
      </div>
    </nav>
  );
}

function StickyResumeButton() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.a 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      href="https://docs.google.com/document/d/1b5B-nR_s-89PK2Q9Ssc58Plmmabhq0YI-2WpIYtSu-k/edit" 
      target="_blank" 
      rel="noreferrer"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="fixed bottom-6 left-6 z-[60] group flex items-center justify-center bg-sky-600 text-white rounded-full p-3 md:p-4 shadow-2xl hover:bg-sky-500 transition-all border border-sky-400/50 hover:px-6 overflow-hidden"
    >
      <FileText size={24} className="md:group-hover:mr-2 flex-shrink-0 transition-all duration-300" />
      <span className="max-w-0 overflow-hidden md:group-hover:max-w-xs opacity-0 md:group-hover:opacity-100 transition-all duration-300 font-medium tracking-tight whitespace-nowrap">
        View Resume
      </span>
    </motion.a>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-0" />
      
      <div className="relative z-10 w-full h-full pt-32">
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-4 md:left-10 top-[18%] drop-shadow-lg">
          build
        </h1>
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] right-4 md:right-10 top-[38%] drop-shadow-lg">
          secure
        </h1>
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-[18%] md:left-[28%] top-[58%] drop-shadow-lg text-sky-400">
          scale
        </h1>
        
        <p className="absolute left-6 md:left-10 top-[46%] max-w-[280px] text-[15px] leading-snug text-white/90 border-l-2 border-sky-500 pl-4">
          Full-stack developer & security engineer. Crafting robust backends and dynamic frontends.
        </p>

        <div className="absolute right-6 md:right-24 top-[14%] flex flex-col items-end">
          <div className="flex items-center gap-3">
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]" />
            <span className="text-4xl md:text-5xl font-medium tracking-tight">100%</span>
          </div>
          <span className="text-xs md:text-sm text-white/70 mt-1">Open Source Driven</span>
        </div>

        <div className="absolute left-6 md:left-20 bottom-20 md:bottom-24">
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl font-medium tracking-tight">5+</span>
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
          </div>
          <span className="text-xs md:text-sm text-white/70 mt-1">Major Projects Deployed</span>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 py-20 bg-[#0C0C0C] w-full overflow-hidden" ref={ref}>
      <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,10vw,160px)] leading-tight tracking-tight mb-8 md:mb-16 text-center break-words max-w-full">
        About Me
      </h2>
      <motion.p 
        style={{ opacity }}
        className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[900px] text-[clamp(1rem,2vw,1.35rem)]"
      >
        I am Dhruvil Adroja, a Full-stack developer and <strong className="text-white">Cyber Security Enthusiast</strong>. 
        I build secure backends with OAuth 2.0, TOTP, and encrypted data storage using Python, FastAPI, and PostgreSQL. 
        My passion for security drives my work, in fact, my <strong className="text-sky-400">NullProtocol</strong> project was born out of this enthusiasm to automate vulnerability assessments. 
        Whether building offline RAG apps, CI/CD pipelines, or sleek Next.js frontends, I love pushing web boundaries securely.
      </motion.p>
      
      <div className="mt-16 flex flex-wrap justify-center gap-4">
         <a href="https://tryhackme.com/p/dhruvillearning" target="_blank" rel="noreferrer">
            <Button variant="outline" className="rounded-full px-8 py-6 border-white/20 hover:bg-white/10 text-white">
              <TryHackMeIcon className="mr-2 h-5 w-5" /> TryHackMe
            </Button>
         </a>
         <a href="https://github.com/koffandaff" target="_blank" rel="noreferrer">
            <Button variant="outline" className="rounded-full px-8 py-6 border-white/20 hover:bg-white/10 text-white">
              <GithubIcon className="mr-2 h-5 w-5" /> GitHub
            </Button>
         </a>
         <a href="https://linkedin.com/in/dhruvil-adroja" target="_blank" rel="noreferrer">
            <Button variant="outline" className="rounded-full px-8 py-6 border-white/20 hover:bg-white/10 text-sky-400 border-sky-900">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> LinkedIn
            </Button>
         </a>
      </div>
    </section>
  );
}

function QuickViewSection() {
  const quickViewItems = [
    {
      id: 1,
      title: "DriveGate",
      description: "Secure file-sharing platform applying TOTP and AES-128 encryption.",
      imageSrc: "/Drivegate.png",
      href: "https://drivegate.app",
    },
    {
      id: 2,
      title: "NullProtocol",
      description: "Automated reconnaissance and vulnerability assessment pipeline.",
      imageSrc: "/nullprotocol.png",
      href: "https://nullprotocol.vercel.app",
    },
    {
      id: 3,
      title: "RAGForge",
      description: "Fully offline RAG app using Ollama for local LLM inference.",
      imageSrc: "/ragforge.png",
      href: "https://ragforge.vercel.app",
    },
    {
      id: 4,
      title: "AutoCodeDoc",
      description: "Documentation automation system using AST parsing.",
      imageSrc: "/Autocodedoc.png",
      href: "https://koffandaff.github.io/AutoCodeDoc/sphinx/",
    },
    {
      id: 5,
      title: "FolderArchaeologist",
      description: "PyPI CLI tool for storage hygiene and duplicate detection.",
      imageSrc: "/FolderArcharologist.png",
      href: "https://pypi.org/project/FolderArchaeologist/",
    },
  ];

  return (
    <section className="bg-[#0C0C0C] py-10 flex flex-col items-center pb-32 w-full overflow-hidden">
      <div className="w-full max-w-5xl px-4 md:px-8 flex flex-col items-center">
        <h3 className="text-center font-mono text-sm tracking-widest uppercase text-white/50 mb-10">Quick Project View</h3>
        <div className="w-full flex justify-center scale-75 md:scale-100 origin-center">
          <CardStack
            items={quickViewItems}
            initialIndex={0}
            autoAdvance
            intervalMs={2500}
            pauseOnHover
            showDots
          />
        </div>
      </div>
    </section>
  );
}

function ExperienceAndSkillsSection() {
  return (
    <section id="experience" className="bg-[#0C0C0C] text-[#D7E2EA] px-5 py-20 md:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-10 text-white tracking-tight">Work Experience</h2>
          
          <div className="relative pl-8 border-l border-white/20 space-y-12">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-sky-500 ring-4 ring-[#0C0C0C]" />
              <h3 className="text-2xl font-bold text-white">Full-Stack Trainee</h3>
              <p className="text-sky-400 font-mono text-sm mt-1 mb-4">Nimblechapps | Oct 2025 – April 2026</p>
              
              <ul className="space-y-3 text-white/70 list-disc pl-4 text-[15px] leading-relaxed">
                <li>Studied PostgreSQL database design and REST API development using FastAPI.</li>
                <li>Practiced backend concepts including token-based authentication (OAuth 2.0, TOTP), input validation with Pydantic, and rate-limited API routes.</li>
                <li>Gained exposure to full project delivery phases: requirements, design, build, and staging.</li>
                <li>Developed responsive and user-friendly web applications, assisting in frontend development using HTML, CSS, JavaScript, and Next.js.</li>
                <li>Supported backend development and API integration using Node.js.</li>
                <li>Tested, debugged, and optimized website performance while collaborating closely with the development team.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-4">
                 <a href="https://docs.google.com/document/d/1b5B-nR_s-89PK2Q9Ssc58Plmmabhq0YI-2WpIYtSu-k/edit" target="_blank" rel="noreferrer" className="text-sm font-bold bg-white text-black hover:bg-neutral-200 px-5 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    View Resume <ExternalLink size={14} />
                 </a>
                 <a href="https://docs.google.com/document/d/1WrBrdZuaNP6Yw6CIC5S2trTLNkKZtsoDgmszZKGYJEY/edit" target="_blank" rel="noreferrer" className="text-sm font-bold bg-sky-600 text-white hover:bg-sky-500 px-5 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    View LOR <ExternalLink size={14} />
                 </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-10 text-white tracking-tight">Technical Skills</h2>
          
          <div className="space-y-6">
            {[
              {
                category: "Languages",
                skills: [
                  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
                  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
                  { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
                  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" }
                ]
              },
              {
                category: "Security",
                skills: [
                  { name: "Penetration testing" }, { name: "Vulnerability scanning" }, { name: "Secure API design" }
                ]
              },
              {
                category: "Backend & APIs",
                skills: [
                  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
                  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
                  { name: "REST APIs" }, { name: "OAuth 2.0" }, { name: "TOTP" }, { name: "Fernet (AES-128)" }
                ]
              },
              {
                category: "Automation & DevOps",
                skills: [
                  { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg" },
                  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
                  { name: "Sphinx" }, { name: "CI/CD" }
                ]
              },
              {
                category: "AI & ML",
                skills: [
                  { name: "Ollama" }, { name: "Fine-tuning" }, { name: "RAG pipelines" }, { name: "AST parsing" }
                ]
              },
              {
                category: "Frontend",
                skills: [
                  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" }
                ]
              }
            ].map((section, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <h4 className="text-sky-400 font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                  {section.category === 'Security' && <Shield size={16} />}
                  {section.category}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {section.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {skill.icon && <img src={skill.icon} alt={skill.name} className="w-5 h-5" />}
                      <span className="text-white/90 text-sm font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function AchievementsSection() {
  return (
    <section className="bg-[#0C0C0C] py-20 px-5 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">Achievements</h2>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h3 className="text-3xl font-bold text-sky-400 mb-2">FolderArchaeologist</h3>
            <p className="text-white/70 font-mono text-sm mb-6">GitHub Love of Code · Published PyPI Package</p>
            <p className="text-white/80 leading-relaxed">
              PyPI-installable CLI tool that recursively scans directory trees, detects duplicate content, and surfaces stale folders with no recent activity. Built and contributed at GitHub&apos;s Love of Code event. Emits structured JSON output for integration into CI/CD pipelines as an automated storage-hygiene step.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <code className="bg-black border border-white/20 px-4 py-3 rounded-xl font-mono text-emerald-400 text-sm shadow-inner">
                $ pip install FolderArchaeologist
              </code>
              <a href="https://pypi.org/project/FolderArchaeologist/" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-neutral-200 transition">
                View Docs <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full lg:max-w-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[300px]">
          <Image 
            src="/FolderArcharologist.png" 
            alt="FolderArchaeologist CLI" 
            fill
            className="object-contain bg-neutral-900/50 hover:scale-105 transition-transform duration-700" 
          />
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = [
    {
      num: "01",
      title: "DriveGate",
      desc: "A secure file-sharing platform applying TOTP, OAuth 2.0, and AES-128 encryption. Signed Google Drive URLs offload 100% of file-transfer bandwidth from the server. Pydantic v2 schema validation defends all endpoints against SQLi and XSS.",
      stack: "Next.js 16, FastAPI, PostgreSQL",
      link: "https://drivegate.app",
      github: null,
      image: "/Drivegate.png"
    },
    {
      num: "02",
      title: "NullProtocol",
      desc: "An automated reconnaissance and vulnerability assessment pipeline that streamlines the information-gathering phase of penetration testing. By orchestrating industry-standard tools through a Python core, it discovers attack surfaces and maps exploits automatically. Features multi-threaded DNS, web scanning, exploit intelligence, and unified reporting.",
      stack: "Python 3.10+, Nmap, Metasploit, Jinja2",
      link: "https://nullprotocol.vercel.app",
      github: "https://github.com/koffandaff/NullProtocol",
      image: "/nullprotocol.png"
    },
    {
      num: "03",
      title: "RAGForge",
      desc: "A fully offline RAG app using Ollama for local LLM inference. Users upload PDFs and chat via Streamlit; 0 cloud API calls, 0 data egress, fully private document Q&A. Includes semantic chunking and vector indexing.",
      stack: "Python, Streamlit, Ollama, Vector Store",
      link: "https://ragforge.vercel.app",
      github: "https://github.com/koffandaff",
      image: "/ragforge.png"
    },
    {
      num: "04",
      title: "AutoCodeDoc",
      desc: "A documentation automation system using AST parsing: converts any Python codebase to a live, CI/CD-deployed API reference from docstrings. Self-updating architecture diagrams regenerate on every push.",
      stack: "Python, Sphinx, GitHub Actions, FastAPI",
      link: "https://koffandaff.github.io/AutoCodeDoc/sphinx/",
      github: "https://github.com/koffandaff",
      image: "/Autocodedoc.png"
    }
  ];

  return (
    <section id="projects" className="bg-[#0C0C0C] z-10 relative pb-20 border-t border-white/10 w-full overflow-hidden">
      <div className="pt-20 px-5 max-w-full">
        <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,10vw,160px)] leading-tight mb-10 break-words">Projects</h2>
      </div>
      
      <FlowArt aria-label="Projects Flow">
        {projects.map((proj, i) => (
          <FlowSection key={i} style={{ backgroundColor: '#0C0C0C', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">{proj.num} | {proj.title}</p>
            <hr className="my-[2vw] border-none border-t border-white/10" />
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 flex-1 pb-10">
              <div className="w-full md:flex-1 flex flex-col">
                <h1 className="text-[clamp(2rem,6vw,7rem)] font-bold leading-[1.1] uppercase tracking-tight break-words">{proj.title}</h1>
                <p className="mt-8 max-w-[50ch] text-[clamp(1rem,1.3vw,1.3rem)] font-normal leading-relaxed text-white/70">
                  {proj.desc}
                </p>
                <div className="mt-auto pt-8 flex flex-col gap-4">
                   <span className="text-sm font-mono text-white/50 tracking-wider block">Stack: {proj.stack}</span>
                   <div className="flex flex-wrap gap-4">
                     {proj.github && (
                       <a href={proj.github} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                         View on GitHub <GithubIcon className="w-4 h-4" />
                       </a>
                     )}
                     {proj.link && (
                       <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-colors">
                         View Live <ExternalLink className="w-4 h-4" />
                       </a>
                     )}
                   </div>
                </div>
              </div>
              <a href={proj.link} target="_blank" rel="noreferrer" className="w-full md:flex-1 group relative bg-black rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center p-2 transition-colors hover:border-sky-500/50 cursor-pointer shadow-2xl block h-[300px] sm:h-[400px] md:h-auto min-h-[300px] md:min-h-0">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 z-20">
                    <span className="bg-sky-500 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-xl shadow-sky-500/20">
                       Launch Project <ExternalLink size={20} />
                    </span>
                 </div>
                  <Image 
                    src={proj.image} 
                    alt={proj.title} 
                    fill
                    className="object-contain bg-neutral-900/40 rounded-2xl group-hover:scale-[1.02] transition-transform duration-700 ease-out relative z-10" 
                  />
              </a>
            </div>
          </FlowSection>
        ))}
      </FlowArt>
    </section>
  );
}

function TestimonialsSection() {
  const [reviews, setReviews] = useState<{text: string, avatar: string, name: string, role: string, rating: number}[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          interface DBReview { feedback: string; avatar?: string; name: string; role: string; org?: string; rating?: number; }
          setReviews(data.map((d: DBReview) => ({
            text: d.feedback,
            avatar: d.avatar || "neutral-1",
            name: d.name,
            role: `${d.role}${d.org ? ` @ ${d.org}` : ''}`,
            rating: d.rating || 5,
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section id="reviews" className="bg-[#0C0C0C] py-20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 break-words">Coworker Feedback</h2>
          <p className="text-white/50 font-mono text-sm">What the team says about working with me.</p>
        </div>
        {loaded && reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-white/30">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <p className="font-mono text-sm uppercase tracking-widest">No reviews yet. Be the first below.</p>
          </div>
        ) : (
          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[600px] overflow-hidden">
            {reviews.length > 0 && <TestimonialsColumn testimonials={reviews} duration={15} className="dark" />}
            {reviews.length > 1 && <TestimonialsColumn testimonials={reviews.slice().reverse()} className="hidden md:block dark" duration={19} />}
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="bg-[#0C0C0C] py-20 px-4 flex justify-center">
       <div className="w-full max-w-4xl">
         <AnimatedAIChat />
       </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
        if (res.ok) {
          setStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        } else {
        setStatus('Failed to send message.');
      }
    } catch {
      setStatus('Error sending message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0C0C0C] text-[#D7E2EA] border-t border-white/10 w-full overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-5 max-w-6xl"
      >
        <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,9vw,120px)] leading-tight tracking-tight mb-10 md:mb-16 break-words text-center md:text-left">
          Get In Touch
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center space-y-8">
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] font-medium leading-relaxed max-w-[500px]">
              Interested in working together or have a question? Let&apos;s connect! I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-full border border-white/10 text-sky-400">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Email</h4>
                  <a href="mailto:dhruvillearning@gmail.com" className="text-white/60 hover:text-sky-400 font-mono text-sm mt-1 transition-colors">dhruvillearning@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-full border border-white/10 text-sky-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">LinkedIn</h4>
                  <a href="https://linkedin.com/in/dhruvil-adroja" target="_blank" rel="noreferrer" className="text-white/60 hover:text-sky-400 font-mono text-sm mt-1 transition-colors">dhruvil-adroja</a>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <Label className="text-white/80">Name</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-black/50 border-white/20 text-white placeholder:text-white/30 focus:border-sky-500 h-12" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-white/80">Email</Label>
                <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-black/50 border-white/20 text-white placeholder:text-white/30 focus:border-sky-500 h-12" placeholder="john@example.com" />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-white/80">Message</Label>
                <Textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="bg-black/50 border-white/20 text-white placeholder:text-white/30 focus:border-sky-500 min-h-[150px] resize-none" placeholder="Tell me about your project..." />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-neutral-200 py-6 text-base font-semibold rounded-xl">
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
              {status && <p className="text-center text-sm font-medium mt-2 text-sky-400">{status}</p>}
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black py-10 px-4 border-t border-white/10 flex flex-col items-center pb-24">
      <AnimatedDock
        items={[
          { link: "https://github.com/koffandaff", target: "_blank", Icon: <GithubIcon size={22} /> },
          { link: "https://linkedin.com/in/dhruvil-adroja", target: "_blank", Icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
          { link: "mailto:dhruvillearning@gmail.com", target: "_blank", Icon: <Mail size={22} /> },
          { link: "https://tryhackme.com/p/dhruvillearning", target: "_blank", Icon: <TryHackMeIcon size={22} /> },
        ]}
      />
      <p className="text-white/40 text-sm mt-8">© {new Date().getFullYear()} Dhruvil Adroja. All rights reserved.</p>
    </footer>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return visible ? (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg z-[60] hover:scale-110 transition-transform"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
    </button>
  ) : null;
}
