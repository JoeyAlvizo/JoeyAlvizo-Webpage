<script lang="ts">
  let mobileOpen = $state(false);
  let scrolled = $state(false);
  let activeSection = $state('hero');

  const links = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'contact', label: 'Contact' },
  ];

  function handleScroll() {
    scrolled = window.scrollY > 50;

    // Determine active section
    for (const link of [...links].reverse()) {
      const el = document.getElementById(link.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          activeSection = link.id;
          return;
        }
      }
    }
    activeSection = 'hero';
  }

  function scrollTo(id: string) {
    mobileOpen = false;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  $effect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
    ? 'bg-dark-base/90 backdrop-blur-xl shadow-lg shadow-neon-pink/5 border-b border-dark-border/50'
    : 'bg-transparent'}"
  id="navbar"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 sm:h-20">
      <!-- Logo -->
      <button
        onclick={() => scrollTo('hero')}
        class="font-display text-xl sm:text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer"
      >
        JA<span class="text-neon-pink">.</span>
      </button>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-1">
        {#each links as link}
          <button
            onclick={() => scrollTo(link.id)}
            class="relative px-4 py-2 font-body text-sm tracking-wide uppercase cursor-pointer transition-colors duration-200
              {activeSection === link.id ? 'text-neon-pink' : 'text-gray-400 hover:text-white'}"
          >
            {link.label}
            {#if activeSection === link.id}
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full"></span>
            {/if}
          </button>
        {/each}
      </div>

      <!-- Mobile Hamburger -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
        onclick={() => (mobileOpen = !mobileOpen)}
        aria-label="Toggle menu"
      >
        <span class="block w-6 h-0.5 bg-neon-pink transition-all duration-300 {mobileOpen ? 'rotate-45 translate-y-2' : ''}"></span>
        <span class="block w-6 h-0.5 bg-neon-blue transition-all duration-300 {mobileOpen ? 'opacity-0' : ''}"></span>
        <span class="block w-6 h-0.5 bg-neon-pink transition-all duration-300 {mobileOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
      </button>
    </div>
  </div>

  <!-- Mobile Drawer -->
  {#if mobileOpen}
    <div class="md:hidden bg-dark-base/95 backdrop-blur-xl border-t border-dark-border/50 animate-slide-up">
      <div class="flex flex-col py-4 px-6 gap-2">
        {#each links as link}
          <button
            onclick={() => scrollTo(link.id)}
            class="text-left py-3 px-4 rounded-lg font-body text-sm uppercase tracking-wide cursor-pointer transition-all duration-200
              {activeSection === link.id
                ? 'text-neon-pink bg-neon-pink/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'}"
          >
            {link.label}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</nav>
