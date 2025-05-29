<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  import ListMenu from "./ListMenu.svelte";
  import { onMount } from "svelte";
  import Tooltip from "$lib/components/Tooltip.svelte";
  import { createEventDispatcher } from "svelte";

  let { sidebarCollapse = $bindable() } = $props();

  let tooltipBtn = $state();
  let selectedMenu = $state({});
  let dispatch = createEventDispatcher();

  let sidebarMenu = [
    { label: "Button", icon: "teenyicons:button-outline", route: "/button", iconSize: 22 },
    { label: "Text Slide Up", icon: "material-symbols:text-up-rounded", route: "/text-slide-up", iconSize: 22 },
    { label: "Modal", icon: "vaadin:modal-list", route: "/modal", iconSize: 18 },
    { label: "Tooltip", icon: "majesticons:tooltip-line", route: "/tooltip", iconSize: 22 },
    { label: "Dropdown", icon: "bx:down-arrow", route: "/dropdown", iconSize: 22 },
    { label: "Context Menu", icon: "bx:down-arrow", route: "/context-menu", iconSize: 22 }
  ];

  let sidebarWidth = $state(280);
  let isResizing = false;

  function handleMouseDown(e) {
    isResizing = true;
    document.body.style.cursor = "grabbing";
  }

  function handleMouseMove(e) {
    if (!isResizing) return;
    sidebarWidth = Math.max(200, Math.min(600, e.clientX));
  }

  function handleMouseUp() {
    isResizing = false;
    document.body.style.cursor = "";
    dispatch("mouseUp", sidebarWidth);
  }

  onMount(() => {
    let pathName = $page.url.pathname;
    selectedMenu = pathName !== "/" ? sidebarMenu.find((f) => f.route == pathName) : {};

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });
</script>

<aside
  class={`relative w-[280px] h-[100vh] bg-gradient-to-b from-[#7F55B1] via-[#9B7EBD] to-[#7F55B1]/20 transition ease-in-out
   text-white border-r-[2px] border-[#7F55B1] ${sidebarCollapse ? "-translate-x-[100%] duration-500" : "translate-x-0 duration-[350ms]"}`}
  style="width: {sidebarWidth}px"
>
  <div class="h-[48px] flex justify-between p-2 pt-3">
    <button
      type="button"
      class="hover:text-violet-400 hover:cursor-pointer transition ease-in-out duration-300"
      onclick={() => {
        goto("/");
      }}
    >
      <Icon icon="material-symbols:home-outline-rounded" width="30" height="30" />
    </button>

    <!-- svelte-ignore a11y_interactive_supports_focus -->
    <div class="relative" role="button">
      <button
        bind:this={tooltipBtn}
        class=" transition ease-in-out duration-300 hover:cursor-pointer hover:text-violet-400"
        onclick={() => (sidebarCollapse = true)}
      >
        <Icon icon="tabler:layout-sidebar-left-collapse" width="24" height="24" />
      </button>

      <Tooltip target={tooltipBtn} label={"Collapse Sidebar"} position={"bottom"} />
    </div>
  </div>

  <div class="mt-5 relative">
    <ListMenu {sidebarMenu} {selectedMenu} />
  </div>

  <button
    type="button"
    aria-label="Resize sidebar"
    class="w-[0px] h-full bg-white absolute z-10 top-0 right-[5%] hover:bg-gray-400 hover:cursor-grab p-0 m-0 border-0 focus:outline-none"
    onmousedown={handleMouseDown}
    tabindex="0"
    style="background: none;"
  >
    <Icon icon="mdi:drag-vertical-variant" width="24" height="24" />
  </button>
</aside>
