<script lang="ts">
  import { onMount } from 'svelte';

  // ─── Replace with your real Turnstile site key ───────────────────
  // For testing, use Cloudflare's always-passing test key:
  // '1x00000000000000000000AA'
  const TURNSTILE_SITE_KEY = '1x00000000000000000000AA';

  let visible = $state(false);
  let sectionEl = $state<HTMLElement | undefined>(undefined);
  let submitted = $state(false);
  let submitting = $state(false);
  let errorMessage = $state('');
  let turnstileToken = $state('');
  let turnstileWidgetId: string | null = $state(null);

  let formData = $state({
    name: '',
    email: '',
    phone: '',
    business: '',
    requestType: '',
    message: '',
  });

  const requestTypes = [
    'Consultation',
    'Job Opportunity',
    'Collaboration',
    'Hobbies',
  ];

  // Mount the Turnstile widget once the component is ready
  onMount(() => {
    renderTurnstile();
  });

  function renderTurnstile() {
    // Wait for the Turnstile API to be available
    if (typeof window.turnstile === 'undefined') {
      setTimeout(renderTurnstile, 100);
      return;
    }

    const container = document.getElementById('turnstile-widget');
    if (!container) return;

    // Remove any existing widget before rendering
    if (turnstileWidgetId !== null) {
      window.turnstile.remove(turnstileWidgetId);
    }

    turnstileWidgetId = window.turnstile.render('#turnstile-widget', {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'dark',
      callback: (token) => {
        turnstileToken = token;
      },
      'expired-callback': () => {
        turnstileToken = '';
      },
      'error-callback': () => {
        turnstileToken = '';
      },
    });
  }

  function resetTurnstile() {
    turnstileToken = '';
    if (turnstileWidgetId !== null && typeof window.turnstile !== 'undefined') {
      window.turnstile.reset(turnstileWidgetId);
    }
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    errorMessage = '';

    // Client-side check: ensure Turnstile completed
    if (!turnstileToken) {
      errorMessage = 'Please complete the verification challenge.';
      return;
    }

    submitting = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          'cf-turnstile-response': turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        errorMessage = result.message || 'Something went wrong. Please try again.';
        resetTurnstile();
        return;
      }

      // Success!
      submitted = true;
      setTimeout(() => {
        submitted = false;
        formData = { name: '', email: '', phone: '', business: '', requestType: '', message: '' };
        resetTurnstile();
      }, 4000);
    } catch (err) {
      errorMessage = 'Network error. Please check your connection and try again.';
      resetTurnstile();
    } finally {
      submitting = false;
    }
  }

  $effect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible = true; },
      { threshold: 0.1 }
    );
    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="contact" class="relative py-24 sm:py-32" bind:this={sectionEl}>
  <div class="absolute inset-0 bg-gradient-to-b from-dark-base via-dark-card/30 to-dark-base"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16 {visible ? 'animate-slide-up' : 'opacity-0'}">
      <p class="font-body text-neon-pink text-sm tracking-[0.3em] uppercase mb-3">Let's connect</p>
      <h2 class="font-display text-4xl sm:text-5xl font-bold">
        <span class="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">Contact Me</span>
      </h2>
      <div class="mt-4 mx-auto w-20 h-0.5 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full"></div>
      <p class="mt-6 text-gray-400 max-w-xl mx-auto text-lg">
        Have a project in mind or just want to chat? Drop me a message and I'll get back to you.
      </p>
    </div>

    <div class="max-w-2xl mx-auto {visible ? 'animate-slide-up' : 'opacity-0'}" style="animation-delay: 0.2s;">
      <div class="gradient-border bg-dark-card rounded-2xl p-8 sm:p-10">
        {#if submitted}
          <!-- Success State -->
          <div class="text-center py-12 animate-slide-up">
            <div class="text-6xl mb-4">✨</div>
            <h3 class="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
            <p class="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
            <div class="mt-6 mx-auto w-16 h-0.5 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full animate-pulse-glow"></div>
          </div>
        {:else}
          <!-- Form -->
          <form onsubmit={handleSubmit} class="space-y-6">
            <!-- Name -->
            <div>
              <label for="contact-name" class="block font-body text-sm text-gray-300 mb-2">
                Name <span class="text-neon-pink">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                bind:value={formData.name}
                required
                placeholder="Your full name"
                class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-600 font-body text-sm
                  focus:outline-none focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,45,149,0.15)] transition-all duration-300"
              />
            </div>

            <!-- Email & Phone -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="contact-email" class="block font-body text-sm text-gray-300 mb-2">
                  Email <span class="text-neon-pink">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  bind:value={formData.email}
                  required
                  placeholder="your.email@example.com"
                  class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-600 font-body text-sm
                    focus:outline-none focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,45,149,0.15)] transition-all duration-300"
                />
              </div>

              <div>
                <label for="contact-phone" class="block font-body text-sm text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  bind:value={formData.phone}
                  placeholder="(123) 456-7890"
                  class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-600 font-body text-sm
                    focus:outline-none focus:border-neon-blue focus:shadow-[0_0_15px_rgba(0,212,255,0.15)] transition-all duration-300"
                />
              </div>
            </div>

            <!-- Business -->
            <div>
              <label for="contact-business" class="block font-body text-sm text-gray-300 mb-2">
                Business
              </label>
              <input
                type="text"
                id="contact-business"
                bind:value={formData.business}
                placeholder="Company or organization"
                class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-600 font-body text-sm
                  focus:outline-none focus:border-neon-blue focus:shadow-[0_0_15px_rgba(0,212,255,0.15)] transition-all duration-300"
              />
            </div>

            <!-- Request Type -->
            <div>
              <label for="contact-type" class="block font-body text-sm text-gray-300 mb-2">
                Request Type <span class="text-neon-pink">*</span>
              </label>
              <select
                id="contact-type"
                bind:value={formData.requestType}
                required
                class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white font-body text-sm appearance-none cursor-pointer
                  focus:outline-none focus:border-electric-purple focus:shadow-[0_0_15px_rgba(155,48,255,0.15)] transition-all duration-300
                  bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239B30FF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
                  bg-[length:1.25rem] bg-[position:right_0.75rem_center] bg-no-repeat"
              >
                <option value="" disabled class="text-gray-600">Select a request type</option>
                {#each requestTypes as type}
                  <option value={type} class="bg-dark-surface text-white">{type}</option>
                {/each}
              </select>
            </div>

            <!-- Message -->
            <div>
              <label for="contact-message" class="block font-body text-sm text-gray-300 mb-2">
                Message <span class="text-neon-pink">*</span>
              </label>
              <textarea
                id="contact-message"
                bind:value={formData.message}
                required
                rows="5"
                placeholder="Tell me about your project or idea..."
                class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-600 font-body text-sm resize-none
                  focus:outline-none focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,45,149,0.15)] transition-all duration-300"
              ></textarea>
            </div>

            <!-- Turnstile Widget -->
            <div class="flex justify-center">
              <div id="turnstile-widget"></div>
            </div>

            <!-- Error Message -->
            {#if errorMessage}
              <div class="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm font-body text-center animate-slide-up">
                {errorMessage}
              </div>
            {/if}

            <!-- Submit -->
            <button
              type="submit"
              disabled={submitting}
              class="group relative w-full py-3.5 rounded-xl font-body font-semibold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300
                {submitting ? 'cursor-wait opacity-75' : 'cursor-pointer'}"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-neon-pink via-electric-purple to-neon-blue animate-gradient"></span>
              <span class="absolute inset-0 bg-gradient-to-r from-neon-pink via-electric-purple to-neon-blue blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></span>
              <span class="relative text-white flex items-center justify-center gap-2">
                {#if submitting}
                  <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Sending...
                {:else}
                  Send Message
                  <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
                {/if}
              </span>
            </button>
          </form>
        {/if}
      </div>
    </div>
  </div>
</section>

