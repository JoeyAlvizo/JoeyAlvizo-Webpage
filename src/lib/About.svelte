<script lang="ts">
  let visible = $state(false);
  let sectionEl = $state<HTMLElement | undefined>(undefined);

  const experience = [
    {
      company: "Bexar County Sheriff's Office",
      role: "Lead Software Engineer",
      period: "April 2026 – Present",
      location: "San Antonio, TX",
      highlights: [
        "Modernized legacy apps from Java 1.7/Tomcat 8 to Java 25/Tomcat 11",
        "Refactored monolithic servlets into modular Spring Boot architectures",
        "Replaced jQuery interfaces with reactive Svelte 5 front-ends",
        "Managed zero-downtime migration of app servers and live MySQL databases",
      ],
    },
    {
      company: "Tradester",
      role: "Full-Stack Software Engineer",
      period: "June 2025 - September 2025",
      location: "Austin, TX",
      highlights: [
        "Built full-stack web application with Convex BaaS and AWS",
        "Developed UI for customers and support using Svelte 5",
        "Integrated third-party services into internal billing workflows",
      ],
    },
    {
      company: "Microsoft",
      role: "Software Engineer - OneDrive & SharePoint",
      period: "May 2020 - December 2024",
      location: "San Antonio, TX",
      highlights: [
        "Contributed to SharePoint backend services at massive scale with C# and C++",
        "Improved SharePoint service availability from 99.999% to 99.9999%",
        "Built an internal LLM-powered tool within Microsoft Teams",
        "Served as founding Scrum Master driving agile delivery",
      ],
    },
    {
      company: "IBM",
      role: "Cloud Software Engineer II - IBM Cloud Storage",
      period: "July 2015 - November 2019",
      location: "Austin, TX",
      highlights: [
        "Designed snapshots feature for Block storage for 1,000+ enterprise customers",
        "Engineered cloud storage solutions for the IaaS platform with PHP",
        "Found and resolved a high-impact security issue with iSCSI connections",
      ],
    },
    {
      company: "PIC Business Systems",
      role: "Software Engineer - e-PIC",
      period: "October 2014 - April 2015",
      location: "San Antonio, TX",
      highlights: [
        "Developed a fully integrated ERP for manufacturing, fabrication, and distribution",
        "Redesigned a C-based application into a modern web app with PHP, JavaScript, and MySQL",
        "Refactored legacy PHP codebase from functional to object-oriented paradigm",
      ],
    },
  ];

  const techStack = [
    "Java",
    "Spring Boot",
    "Svelte",
    "TypeScript",
    "C#",
    ".NET",
    "Python",
    "PHP",
    "SQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Git",
    "JUnit",
    "Vitest",
    "REST APIs",
    "Zod",
  ];

  $effect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) visible = true;
      },
      { threshold: 0.1 },
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section
  id="about"
  class="relative py-24 sm:py-32 retro-grid"
  bind:this={sectionEl}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16 {visible ? 'animate-slide-up' : 'opacity-0'}">
      <p
        class="font-body text-neon-blue text-sm tracking-[0.3em] uppercase mb-3"
      >
        Get to know me
      </p>
      <h2 class="font-display text-4xl sm:text-5xl font-bold">
        <span
          class="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent"
          >About Me</span
        >
      </h2>
      <div
        class="mt-4 mx-auto w-20 h-0.5 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full"
      ></div>
    </div>

    <!-- Intro -->
    <div class="grid lg:grid-cols-5 gap-12 mb-20">
      <div
        class="lg:col-span-3 space-y-6 {visible
          ? 'animate-slide-up'
          : 'opacity-0'}"
        style="animation-delay: 0.1s;"
      >
        <p class="text-gray-300 text-lg leading-relaxed">
          I'm <span class="text-white font-semibold">Joey Alvizo</span>, a
          software engineer based in
          <span class="text-neon-blue">Central Texas</span> with over a decade
          of experience building and modernizing enterprise software. I've had
          the privilege of working at companies like
          <span class="text-neon-pink font-semibold">Microsoft</span>,
          <span class="text-neon-blue font-semibold">IBM</span>, and most
          recently as
          <span class="text-electric-purple font-semibold"
            >Lead Software Engineer</span
          > at the Bexar County Sheriff's Office.
        </p>
        <p class="text-gray-300 text-lg leading-relaxed">
          My passion lies in taking aging legacy systems and transforming them
          into modern, scalable architectures. I'm a huge fan of <span
            class="text-neon-pink">Svelte</span
          >
          for front-end development and
          <span class="text-neon-blue">Java / Spring Boot</span> for robust backends.
          I love the challenge of bridging old and new technologies to create seamless,
          high-performance solutions.
        </p>
        <p class="text-gray-300 text-lg leading-relaxed">
          I hold a <span class="text-white font-medium"
            >B.S. in Computer Science</span
          >
          from UT San Antonio with concentrations in Software Engineering and Computer
          Security, plus a
          <span class="text-white font-medium">C# .NET Core Certificate</span> from
          the University of Washington.
        </p>
      </div>

      <!-- Tech Stack Cloud -->
      <div
        class="lg:col-span-2 {visible ? 'animate-slide-up' : 'opacity-0'}"
        style="animation-delay: 0.2s;"
      >
        <div class="gradient-border p-6 bg-dark-card rounded-2xl">
          <h3
            class="font-display text-sm uppercase tracking-widest text-neon-pink mb-4"
          >
            Tech Stack
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each techStack as tech, i}
              <span
                class="px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-105 cursor-default
                  {i % 3 === 0
                  ? 'border-neon-pink/30 text-neon-pink bg-neon-pink/5 hover:bg-neon-pink/15 hover:shadow-[0_0_12px_rgba(255,45,149,0.2)]'
                  : i % 3 === 1
                    ? 'border-neon-blue/30 text-neon-blue bg-neon-blue/5 hover:bg-neon-blue/15 hover:shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                    : 'border-electric-purple/30 text-electric-purple bg-electric-purple/5 hover:bg-electric-purple/15 hover:shadow-[0_0_12px_rgba(155,48,255,0.2)]'}"
              >
                {tech}
              </span>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Experience Timeline -->
    <div
      class={visible ? "animate-slide-up" : "opacity-0"}
      style="animation-delay: 0.4s;"
    >
      <h3
        class="font-display text-sm uppercase tracking-widest text-neon-pink mb-10 text-center"
      >
        Experience
      </h3>
      <div class="relative max-w-4xl mx-auto">
        <!-- Timeline Line -->
        <div
          class="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-pink via-electric-purple to-neon-blue opacity-30"
        ></div>

        {#each experience as exp, i}
          <div
            class="relative flex flex-col sm:flex-row gap-4 sm:gap-8 mb-12 {i %
              2 ===
            0
              ? 'sm:flex-row-reverse'
              : ''}"
          >
            <!-- Dot -->
            <div
              class="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-neon-pink to-neon-blue shadow-[0_0_12px_rgba(255,45,149,0.5)] z-10 mt-1.5"
            ></div>

            <!-- Content -->
            <div
              class="ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] {i % 2 === 0
                ? 'sm:text-right'
                : ''}"
            >
              <div
                class="gradient-border bg-dark-card p-5 rounded-2xl hover:bg-dark-surface transition-colors duration-300"
              >
                <p
                  class="font-display text-xs uppercase tracking-widest text-neon-blue mb-1"
                >
                  {exp.period}
                </p>
                <h4 class="font-body font-semibold text-white text-lg">
                  {exp.company}
                </h4>
                <p class="font-body text-neon-pink text-sm mb-1">{exp.role}</p>
                <p class="font-body text-gray-500 text-xs mb-3">
                  {exp.location}
                </p>
                <ul class="space-y-1.5 {i % 2 === 0 ? 'sm:text-left' : ''}">
                  {#each exp.highlights as h}
                    <li class="text-gray-400 text-sm flex gap-2">
                      <span class="text-neon-pink mt-1 shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
