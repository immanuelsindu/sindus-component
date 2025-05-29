<script>
  import "../app.css";

  import Header from "$lib/views/Header.svelte";
  import Sidebar from "$lib/views/Sidebar/Sidebar.svelte";

  let sidebarCollapse = $state(false);
  let sidebarWidth = $state(280);
</script>

<div class="flex relative bg-[#7F55B1]/50">
  <Sidebar
    bind:sidebarCollapse
    on:mouseUp={(e) => {
      sidebarWidth = e.detail;
    }}
  />
  <div
    class={`w-full h-[48px] bg-[#7F55B1] grow trasition ease-in-out ${sidebarCollapse ? "duration-400" : "duration-400"}`}
    style="margin-left: {!sidebarCollapse ? '0px' : `-${sidebarWidth}px`}"
  >
    <Header bind:sidebarCollapse />

    <!-- svelte-ignore slot_element_deprecated -->
    <div class="h-full z-1">
      <slot />
    </div>
  </div>
</div>
