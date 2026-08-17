<script>
  const currentYear = new Date().getFullYear();
</script>

<footer class="relative border-t border-dark-border/30">
  <div
    class="absolute inset-0 bg-gradient-to-t from-dark-card/50 to-transparent"
  ></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
      <!-- Logo & Copyright -->
      <div class="text-center sm:text-left">
        <span
          class="font-display text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent"
        >
          JA<span class="text-neon-pink">.</span>
        </span>
        <p class="text-gray-500 text-sm mt-1">
          © {currentYear} Joey Alvizo. All rights reserved.
        </p>
      </div>

      <!-- Social Links -->
      <div class="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/JoeyAlvizo"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center justify-center w-10 h-10 rounded-full border border-dark-border hover:border-neon-blue/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
          aria-label="LinkedIn"
        >
          <svg
            class="w-4 h-4 text-gray-500 group-hover:text-neon-blue transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
        <a
          href="https://bsky.app/profile/joeyalvizo.com"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center justify-center w-10 h-10 rounded-full border border-dark-border hover:border-electric-purple/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,48,255,0.15)]"
          aria-label="Bluesky"
        >
          <svg
            class="w-4 h-4 text-gray-500 group-hover:text-electric-purple transition-colors"
            fill="currentColor"
            viewBox="0 0 568 501"
          >
            <path
              d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.889-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>
