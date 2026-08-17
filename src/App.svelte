<script>
  import Navbar from './lib/Navbar.svelte';
  import Hero from './lib/Hero.svelte';
  import About from './lib/About.svelte';
  import Services from './lib/Services.svelte';
  import Hobbies from './lib/Hobbies.svelte';
  import Contact from './lib/Contact.svelte';
  import Footer from './lib/Footer.svelte';
</script>

<Navbar />

<main>
  <Hero />

  <div class="section-divider"></div>
  <About />

  <div class="section-divider"></div>
  <Services />

  <div class="section-divider"></div>
  <Hobbies />

  <div class="section-divider"></div>
  <Contact />
</main>

<Footer />
