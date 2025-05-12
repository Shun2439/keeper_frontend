<script lang="ts">
  import { onMount } from "svelte";
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";

  type OmikujiData = {
    luck: string;
  };

  let omikujiResult: OmikujiData | null = $state(null);
  let isLoading: boolean = $state(true);
  let error: string | null = $state(null);

  async function fetchOmikuji() {
    isLoading = true;
    error = null;

    try {
      const response = await fetch('http://localhost:3000/api/luck');
      if (!response.ok) {
        throw new Error('Fied to fetch');
      }
      omikujiResult = await response.json() as OmikujiData;
    } catch (e: any) {
      error = e.message || 'An unknown error occurred.';
      console.error('Error occurred');
    } finally {
      isLoading = false;
    }

    onMount(() => {
      fetchOmikuji();
    });
  }
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>

  <h1>おみくじ</h1>

  <p>今日の運勢は！</p>

  <div class="card">
    {#if isLoading}
      <p>運勢を占っています...</p>
    {:else if error}
      <p style="color: red;">エラー</p>
    {:else if omikujiResult}
      <h2>{omikujiResult.luck}</h2>
    {:else}
      <p>結果はありませんでした。</p>
    {/if}
    <Counter onClick={fetchOmikuji} />
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
