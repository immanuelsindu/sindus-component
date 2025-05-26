<script>
  import Container from "$lib/views/Container/Container.svelte";
  import Dropdown from "$lib/components/Dropdown.svelte";

  let listItem = [
    { label: "Menu 1", value: "menu_1" },
    { label: "Menu 2", value: "menu_2" },
    { label: "Menu 3", value: "menu_3" },
    { label: "Menu 4", value: "menu_4" }
  ];
  let itemSelected = $state({});
</script>

<Container>
  <div class="space-y-2">
    <div>
      <p>Data selected = {itemSelected?.label || "..."}</p>
    </div>

    <Dropdown
      {listItem}
      on:seleted={(e) => {
        itemSelected = e.detail;
      }}
    />
  </div>
</Container>
