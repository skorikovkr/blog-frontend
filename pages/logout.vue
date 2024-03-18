<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });
const userStore = useUserStore();
await userStore.logout();
navigateTo('/login');
</script>

<style>

</style>