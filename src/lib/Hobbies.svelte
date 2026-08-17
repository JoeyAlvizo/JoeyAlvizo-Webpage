<script lang="ts">
  import img1 from '../assets/img/1.jpg';
  import img2 from '../assets/img/2.jpg';
  import img3 from '../assets/img/3.jpg';
  import img4 from '../assets/img/4.jpg';
  import img5 from '../assets/img/5.jpg';
  import img6 from '../assets/img/6.jpg';
  import img7 from '../assets/img/7.jpg';
  import img8 from '../assets/img/8.jpg';
  import img9 from '../assets/img/9.jpg';
  import img10 from '../assets/img/10.jpg';
  import img11 from '../assets/img/11.jpg';
  import img12 from '../assets/img/12.jpg';
  import img13 from '../assets/img/13.jpg';
  import img14 from '../assets/img/14.jpg';
  import img15 from '../assets/img/15.jpg';
  import img16 from '../assets/img/16.jpg';
  import img17 from '../assets/img/17.jpg';
  import img18 from '../assets/img/18.jpg';
  import img19 from '../assets/img/19.jpg';
  import img20 from '../assets/img/20.jpg';

  let visible = $state(false);
  let sectionEl = $state<HTMLElement | undefined>(undefined);
  let lightboxOpen = $state(false);
  let lightboxIndex = $state(0);

  const photos = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  ];

  const hobbies = [
    {
      title: 'Ham Radio',
      icon: '📡',
      description: 'I enjoy tinkering with my ham radio setup — from building antennas to making contacts across the globe. There\'s something uniquely satisfying about communicating through radio waves you\'ve engineered yourself.',
      color: 'neon-blue',
    },
    {
      title: 'Bachata & Salsa Dancing',
      icon: '💃',
      description: 'When I\'m not coding, you can find me on the dance floor. Bachata and Salsa are my go-to styles — the rhythm, the connection, and the energy of social dancing keep me inspired and balanced.',
      color: 'neon-pink',
    },
  ];

  function openLightbox(index: number) {
    lightboxIndex = index;
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOpen = false;
    document.body.style.overflow = '';
  }

  function nextPhoto() {
    lightboxIndex = (lightboxIndex + 1) % photos.length;
  }

  function prevPhoto() {
    lightboxIndex = (lightboxIndex - 1 + photos.length) % photos.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  }

  $effect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.05 }
    );
    if (sectionEl) observer.observe(sectionEl);
    window.addEventListener('keydown', handleKeydown);
    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<section id="hobbies" class="relative py-24 sm:py-32 retro-grid" bind:this={sectionEl}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16 {visible ? 'animate-slide-up' : 'opacity-0'}">
      <p class="font-body text-neon-blue text-sm tracking-[0.3em] uppercase mb-3">Beyond the Code</p>
      <h2 class="font-display text-4xl sm:text-5xl font-bold">
        <span class="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">Hobbies</span>
      </h2>
      <div class="mt-4 mx-auto w-20 h-0.5 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full"></div>
    </div>

    <!-- Drone Photography -->
    <div class="mb-20 {visible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.1s;">
      <div class="flex items-center gap-3 mb-8">
        <span class="text-3xl">🛸</span>
        <div>
          <h3 class="font-display text-2xl font-bold text-white">Drone Photography</h3>
          <p class="text-gray-400 text-sm">Capturing the world from above</p>
        </div>
      </div>

      <!-- Photo Gallery Grid -->
      <div class="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
        {#each photos as photo, i}
          <button
            onclick={() => openLightbox(i)}
            class="group relative block w-full overflow-hidden rounded-xl cursor-pointer break-inside-avoid border border-transparent hover:border-neon-pink/30 transition-all duration-300"
          >
            <img
              src={photo}
              alt="Drone photo {i + 1}"
              class="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-dark-base/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="bg-dark-base/80 backdrop-blur-sm text-neon-blue text-xs px-2 py-1 rounded-full border border-neon-blue/30">
                ↗ View
              </span>
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Other Hobbies -->
    <div class="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto {visible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.3s;">
      {#each hobbies as hobby}
        <div class="gradient-border bg-dark-card rounded-2xl p-6 hover:bg-dark-surface transition-colors duration-300 group">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl group-hover:scale-110 transition-transform duration-300">{hobby.icon}</span>
            <h3 class="font-display text-lg font-bold text-{hobby.color}">{hobby.title}</h3>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">{hobby.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Lightbox Modal -->
{#if lightboxOpen}
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-dark-base/95 backdrop-blur-lg">
    <!-- Close -->
    <button
      onclick={closeLightbox}
      class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white text-3xl cursor-pointer z-10 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
      aria-label="Close lightbox"
    >
      ✕
    </button>

    <!-- Counter -->
    <div class="absolute top-5 left-1/2 -translate-x-1/2 font-display text-xs text-gray-500 tracking-widest">
      {lightboxIndex + 1} / {photos.length}
    </div>

    <!-- Prev -->
    <button
      onclick={prevPhoto}
      class="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-neon-blue text-4xl cursor-pointer w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all z-10"
      aria-label="Previous photo"
    >
      ‹
    </button>

    <!-- Image -->
    <div class="max-w-5xl max-h-[85vh] px-16">
      <img
        src={photos[lightboxIndex]}
        alt="Drone photo {lightboxIndex + 1}"
        class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl shadow-neon-pink/10"
      />
    </div>

    <!-- Next -->
    <button
      onclick={nextPhoto}
      class="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-neon-blue text-4xl cursor-pointer w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all z-10"
      aria-label="Next photo"
    >
      ›
    </button>
  </div>
{/if}
