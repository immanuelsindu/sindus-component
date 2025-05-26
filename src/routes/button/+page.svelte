<script>
  import Button from "$lib/components/Button.svelte";
  import Container from "$lib/views/Container/Container.svelte";
</script>

<Container>
  <div class="space-y-2">
    <Button label={"Primary"}></Button>
    <Button label={"Primary Outline"} type={"primary-outline"}></Button>
    <Button label={"Danger"} type={"danger"}></Button>
  </div>
</Container>
