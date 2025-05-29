<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Portal from "svelte-portal";
  import { clickOutside, clickContenxtMenuOutside } from "$lib/helper";

  let { children, target = null, visible = $bindable() } = $props();

  let contextX = $state(0);
  let contextY = $state(0);

  const show = (e) => {
    e.preventDefault();

    visible = true;
    contextX = e.x;
    contextY = e.y;
  };

  onMount(() => {
    if (target) {
      target.addEventListener("contextmenu", show);
    }

    return () => {
      if (target) {
        target.removeEventListener("contextmenu", show);
      }
    };
  });
</script>

{#if visible}
  <Portal>
    <div
      use:clickOutside
      onoutclick={() => {
        visible = false;
      }}
      use:clickContenxtMenuOutside
      onoutcontextmenu={() => {
        visible = false;
      }}
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
      class="fixed z-[9999] bg-white text-[#7F55B1] rounded-md shadow"
      style="top: {contextY}px; left: {contextX}px;"
    >
      {@render children()}
    </div>
  </Portal>
{/if}
