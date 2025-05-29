<script>
  import Button from "$lib/components/Button.svelte";
  import Container from "$lib/views/Container/Container.svelte";
  import ContextMenu from "$lib/components/ContextMenu.svelte";

  let refButton1 = $state();
  let refButton2 = $state();
  let visible = $state(false);
</script>

<Container>
  <div class="flex gap-4">
    <div>
      <Button bind:bindButton={refButton1} label={"Right click on me!!"} />
      <ContextMenu target={refButton1}>
        <div class="flex items-center flex-col transition ease duration-200 hover:cursor-pointer">
          {#each Array(4) as _, index}
            <div class="flex items-center gap-1 px-3 py-2 hover:bg-gray-200 rounded-md">
              <p class="text-[15px]">Option {index + 1}</p>
            </div>
          {/each}
        </div>
      </ContextMenu>
    </div>

    <div>
      <Button bind:bindButton={refButton2} label={"Right click on me!!"} />
      <ContextMenu target={refButton2} bind:visible>
        <div class="flex flex-col gap-2 p-4">
          <p class="text-center font-medium mb-2">Delete an item ?</p>
          <div class="flex gap-2">
            <Button
              label="Close"
              type="primary-outline"
              on:click={() => {
                visible = false;
              }}
            />
            <Button
              label="Delete"
              type="danger"
              on:click={() => {
                visible = false;
              }}
            />
          </div>
        </div>
      </ContextMenu>
    </div>
  </div>
</Container>
