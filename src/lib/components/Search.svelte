<script lang="ts">
  import Search from "$lib/components/Icon/Search.svelte";
</script>

<div class="relative flex w-full items-baseline">
  <div class="mr-2 text-pastelPurple mt-auto">
    <Search />
  </div>
  <input
      class="w-full md:w-[14rem] lg:w-72 border-b-2 border-dashed border-b-pastelPurple bg-transparent font-sansSerif text-base lg:text-xl text-black outline-none focus:border-b-lavenderIndigo focus:border-solid"
      type="text"
      name="search"
      placeholder="Search by keyword">
  <button class="font-sansSerif text-lg lg:text-xl font-black text-pastelPurple">
    Search
  </button>
</div>