<script lang="ts">
  let visible = $state(false);
  let sectionEl = $state<HTMLElement | undefined>(undefined);

  const services = [
    {
      title: 'Legacy Java Modernization',
      subtitle: 'Servlet → Spring Boot',
      description: 'I specialize in upgrading aging Java Servlet applications to modern Spring Boot architectures. From refactoring monolithic codebases to implementing RESTful APIs, I handle the entire migration — so your team can focus on building new features instead of fighting legacy code.',
      features: [
        'Java Servlet to Spring Boot migration',
        'Tomcat / server upgrades',
        'REST API design & implementation',
        'Database migration & optimization',
        'CI/CD pipeline setup',
        'Zero-downtime deployment strategies',
      ],
      icon: '⚡',
      gradient: 'from-neon-pink to-electric-purple',
      glowColor: 'neon-pink',
    },
    {
      title: 'Custom Business Applications',
      subtitle: 'Internal Tools & Process Automation',
      description: 'I build brand-new applications tailored to your business\'s internal processes. Whether it\'s automating workflows, creating dashboards, or building full-stack tools — I deliver clean, maintainable software that solves real problems.',
      features: [
        'Full-stack web applications',
        'Internal process automation',
        'Dashboard & reporting tools',
        'Svelte / TypeScript front-ends',
        'Spring Boot / Java backends',
        'Cloud deployment (AWS / Azure)',
      ],
      icon: '🚀',
      gradient: 'from-neon-blue to-electric-purple',
      glowColor: 'neon-blue',
    },
  ];

  $effect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="services" class="relative py-24 sm:py-32" bind:this={sectionEl}>
  <!-- Subtle gradient background -->
  <div class="absolute inset-0 bg-gradient-to-b from-dark-base via-dark-card/50 to-dark-base"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16 {visible ? 'animate-slide-up' : 'opacity-0'}">
      <p class="font-body text-neon-pink text-sm tracking-[0.3em] uppercase mb-3">What I offer</p>
      <h2 class="font-display text-4xl sm:text-5xl font-bold">
        <span class="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">Services</span>
      </h2>
      <div class="mt-4 mx-auto w-20 h-0.5 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full"></div>
      <p class="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
        Based in Central Texas, I help businesses modernize their tech stack and streamline internal operations.
      </p>
    </div>

    <!-- Service Cards -->
    <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {#each services as service, i}
        <div
          class="group gradient-border bg-dark-card rounded-2xl p-8 hover:bg-dark-surface transition-all duration-500 hover:-translate-y-2 {visible ? 'animate-slide-up' : 'opacity-0'}"
          style="animation-delay: {i * 0.2 + 0.2}s;"
        >
          <!-- Icon -->
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>

          <!-- Title -->
          <h3 class="font-display text-xl font-bold text-white mb-1 group-hover:text-{service.glowColor} transition-colors duration-300">
            {service.title}
          </h3>
          <p class="font-body text-sm text-{service.glowColor} mb-4 tracking-wide">{service.subtitle}</p>

          <!-- Description -->
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            {service.description}
          </p>

          <!-- Features List -->
          <ul class="space-y-2">
            {#each service.features as feature}
              <li class="flex items-center gap-3 text-sm text-gray-300">
                <span class="w-1.5 h-1.5 rounded-full bg-gradient-to-r {service.gradient} shrink-0"></span>
                {feature}
              </li>
            {/each}
          </ul>

          <!-- CTA -->
          <a
            href="#contact"
            class="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-{service.glowColor} hover:underline underline-offset-4 transition-all duration-300 group-hover:gap-3"
          >
            Let's Talk
            <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>
