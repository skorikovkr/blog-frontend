<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const route = useRoute();
const { login } = useUserStore();

const data = reactive({
  email: "",
  password: "",
  remember: false,
});
const status = ref(
  (route.query.reset ?? "").length > 0 ? atob(route.query.reset as string) : ""
);

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  () => {
    status.value = "";
    return login(data);
  },
  {
    onSuccess: () => router.push("/"),
  }
);
</script>

<template>
  <div class="login-form-container flex justify-center">
    <form 
      class="w-full md:w-2/3 md:my-auto" 
      @submit.prevent="submit"
    >
      <div>
        <label for="email">{{ $t('login.email') }}</label>
        <div>{{ errors.email?.[0] }}</div>
        <input
          id="email"
          v-model="data.email"
          type="email"
          class="block mt-1 w-full"
          required
          autoFocus
        >
      </div>

      <div class="mt-4">
        <label for="password">{{ $t('login.password') }}</label>
        <div
          v-for="err in errors.password"
          :key="err"
        >
          {{ err }}
        </div>
        <input
          id="password"
          v-model="data.password"
          type="password"
          class="block mt-1 w-full"
          required
          autoComplete="current-password"
        >
      </div>

      <div class="block mt-4">
        <label
          for="remember"
          class="inline-flex items-center"
        >
          <input
            id="remember"
            v-model="data.remember"
            type="checkbox"
            name="remember"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
          <span class="ml-2 text-sm text-gray-600">{{ $t('login.remember_me') }}</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <div v-if="inProgress" class="cdx-loader"></div>
        <input
          class="ml-6 cursor-pointer"
          type="submit"
          :disabled="inProgress"
          :value="$t('login.submit_button_title')"
        >
      </div>
    </form>
  </div>
</template>