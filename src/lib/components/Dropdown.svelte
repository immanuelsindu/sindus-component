<script>
  import Icon from "@iconify/svelte";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { clickOutside } from "$lib/helper";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();
  let { listItem = [] } = $props();

  let isDrop = $state(false);
  let itemSelected = $state({});
  let isDroping = $state(false);

  const checkIndex = (index) => {
    if (index == 0) {
      return "rounded-tl-md rounded-tr-md";
    } else if (index == listItem?.length - 1) {
      return "rounded-bl-md rounded-br-md";
    }
  };
</script>

<button
  class="flex items-center justify-between w-[200px] px-3 py-2 rounded-md bg-gray-100 border border-violet-700 hover:bg-gray-200 transition duration-200 ease-in-out hover:cursor-pointer"
  use:clickOutside
  onoutclick={() => {
    isDrop = false;
  }}
  onclick={() => {
    isDrop = !isDrop;
  }}
>
  <p>{itemSelected?.label || "Select one data"}</p>

  <span
    class={`transition duration-300 ease-in-out rounded-full ${isDrop ? "rotate-180 bg-gray-300/50 p-[1px] " : "rotate-360 p-[1px]"}`}
  >
    <Icon icon="fluent:chevron-down-12-regular" width="20" height="20" />
  </span>
</button>

{#if isDrop}
  <div in:slide out:slide={{ duration: 200 }} class="bg-white w-[200px] mt-2 rounded-md">
    {#each listItem as item, index}
      <button
        class={`w-full text-start text-violet-800 hover:bg-gray-200/60 px-3 py-2 transition duration-200 ease hover:cursor-pointer ${checkIndex(index)} ${itemSelected?.value == item.value ? "bg-gray-200/60" : ""}`}
        onclick={() => {
          if (isDroping) return;
          itemSelected = item;
          isDrop = false;
          dispatch("seleted", itemSelected);
        }}
      >
        {item.label}
      </button>
    {/each}
  </div>
{/if}
