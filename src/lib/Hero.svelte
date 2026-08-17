<script>
  import heroImg from '../assets/img/austinSkyline.jpeg';
</script>

<section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Background Image -->
  <div class="absolute inset-0">
    <img
      src={heroImg}
      alt="Austin, Texas skyline aerial view"
      class="w-full h-full object-cover"
    />
    <!-- Dark Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-dark-base/70 via-dark-base/50 to-dark-base"></div>
    <!-- Retro Grid Overlay -->
    <div class="absolute inset-0 retro-grid opacity-40"></div>
    <!-- Scanlines -->
    <div class="absolute inset-0 scanlines"></div>
  </div>

  <!-- Content -->
  <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
    <!-- Decorative top bar -->
    <div class="flex justify-center mb-8">
      <div class="h-px w-24 bg-gradient-to-r from-transparent via-neon-pink to-transparent animate-pulse-glow"></div>
    </div>

    <p class="font-body text-neon-blue text-sm sm:text-base tracking-[0.3em] uppercase mb-4 animate-slide-up">
      Software Engineer · Central Texas
    </p>

    <h1 class="font-display text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
      <span class="bg-gradient-to-r from-neon-pink via-electric-purple to-neon-blue bg-clip-text text-transparent animate-gradient">
        Joey Alvizo
      </span>
    </h1>

    <p class="font-body text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style="animation: slide-up 0.8s ease-out 0.3s both;">
      Modernizing legacy systems & building powerful applications
      <br class="hidden sm:block" />
      with <span class="text-neon-pink font-semibold">Java</span>, <span class="text-neon-blue font-semibold">Spring Boot</span> & <span class="text-electric-purple font-semibold">Svelte</span>
    </p>

    <!-- CTA Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center" style="animation: slide-up 0.8s ease-out 0.5s both;">
      <a
        href="#services"
        class="group relative inline-flex items-center justify-center px-8 py-3 rounded-full font-body font-semibold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300"
      >
        <span class="absolute inset-0 bg-gradient-to-r from-neon-pink to-electric-purple opacity-100 group-hover:opacity-90 transition-opacity"></span>
        <span class="absolute inset-0 bg-gradient-to-r from-neon-pink to-electric-purple blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></span>
        <span class="relative text-white">View Services</span>
      </a>
      <a
        href="#contact"
        class="inline-flex items-center justify-center px-8 py-3 rounded-full font-body font-semibold text-sm uppercase tracking-wider border border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue transition-all duration-300"
      >
        Get In Touch
      </a>
    </div>

    <!-- Decorative bottom bar -->
    <div class="flex justify-center mt-12">
      <div class="h-px w-24 bg-gradient-to-r from-transparent via-neon-blue to-transparent animate-pulse-glow"></div>
    </div>
  </div>

  <!-- Scroll Down Indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
    <div class="flex flex-col items-center gap-2">
      <span class="text-gray-500 text-xs uppercase tracking-widest font-body">Scroll</span>
      <div class="w-5 h-8 rounded-full border-2 border-gray-500/50 flex justify-center pt-1.5">
        <div class="w-1 h-2 bg-neon-pink rounded-full animate-pulse-glow"></div>
      </div>
    </div>
  </div>
</section>
