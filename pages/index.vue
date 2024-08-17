<script lang="ts" setup>
const { t }  = useI18n()
useSeoMeta({
  title: t('index.meta.title'),
  ogTitle: t('index.meta.title'),
  description: t('index.meta.description'),
  ogDescription: t('index.meta.description')
})

const i = ref(0);
const j = ref(0);
const k = ref(0);
const title = ref('');
const code1 = ref('');
const code2 = ref('');
const fullTitleText = 'skorikovkr-blog';
const fullCode1Text = '[HttpGet]\npublic IActionResult Get()\n{\n\treturn Ok(Blog adout Web-development);\n}';
const fullCode2Text = '.text-gradient {\n\tbackground-image: linear-gradient(45deg, #2fff9e, #2a38ff);\n\tbackground-size: 100%;\n\tbackground-repeat: repeat;\n\tbackground-clip: text;\n\t-webkit-text-fill-color: transparent;\n}';
const carriage2Visibility = ref('none');
const carriage3Visibility = ref('none');
const typingDelay = 70;
const isFakeLoading = ref(true);
const isGradientApplied = ref(false);

function titleWriter() {
    if (i.value < fullTitleText.length) {
        title.value += fullTitleText.charAt(i.value);
        i.value += 1;
        setTimeout(titleWriter, typingDelay);
    } else {
        carriage2Visibility.value = 'inline';
        code1Writer()
    }
}

function code1Writer() {
    if (j.value < fullCode1Text.length) {
        code1.value += fullCode1Text.charAt(j.value);
        j.value += 1;
        setTimeout(code1Writer, typingDelay / 5);
    } else {
        carriage2Visibility.value = 'none';
        carriage3Visibility.value = 'inline';
        isFakeLoading.value = false;
        code2Writer()
    }
}

function code2Writer() {
    if (k.value < fullCode2Text.length) {
        code2.value += fullCode2Text.charAt(k.value);
        k.value += 1;
        setTimeout(code1Writer, typingDelay / 10);
    } else {
        carriage3Visibility.value = 'none';
        isGradientApplied.value = true;
    }
}

onMounted(() => {
    titleWriter();
})
</script>

<template>
  <div class="container mx-auto">
    <div class="sr-only">
      <h1>skorikovkr-blog</h1>
      <p>Blog adout Web-development</p>
    </div>
    <div class="flex justify-between flex-col-reverse xl:flex-row mt-10 max-w-7xl">
      <div class="flex flex-col gap-4 p-4 xl:min-w-[630px]">
        <div class="bg-slate-700 rounded-lg">
          <div class="text-end text-white font-medium text-md px-2 py-1 border-b-[1px] border-slate-400">
            C#
          </div>
          <pre
            class="font-mono text-white font-bold text-lg xl:text-base p-4 text-wrap overflow-hidden xl:max-h-[160px] xl:min-h-[160px]"
          >{{ code1 }}<span
:style="{ display: carriage2Visibility }"
                            class="h-12 ml-1 border-r-2 border-white"
          /></pre>
        </div>
        <div class="bg-slate-700 rounded-lg">
          <div class="text-end text-white font-medium text-md px-2 py-1 border-b-[1px] border-slate-400">
            CSS
          </div>
          <pre
            class="font-mono text-white font-bold text-lg xl:text-base p-4 text-wrap overflow-hidden min-h-[256px] xl:max-h-[210px] xl:min-h-[210px]"
          >{{ code2 }}<span
:style="{ display: carriage3Visibility }"
                            class="h-12 ml-1 border-r-2 border-white"
          /></pre>
        </div>
      </div>
      <div class="flex justify-center items-center xl:items-end flex-col mb-12 xl:mb-0">
        <div>
          <span class="block blog-title text-5xl font-bold text-center xl:text-end font-[Inter-Extrabold]">
            {{ title }}<span class="h-12 ml-1 border-r-4 border-black blinking" />
          </span>
        </div>
        <div>
          <template v-if="isFakeLoading">
            <div class="flex gap-1">
              <div class="lds-ring">
                <div />
                <div />
                <div />
                <div />
              </div>
              <p class="text-2xl text-center xl:text-end">
                <span>Loading...</span>
              </p>
            </div>
          </template>
          <p
            v-else
            class="text-2xl text-center xl:text-end"
          >
            Blog adout <span
              class="font-bold"
              :class="{ 'text-gradient': isGradientApplied }"
            >Web-development</span>
          </p>
        </div>
      </div>
    </div>
    <ul class="pl-5 list-disc list-outside [&_ul]:list-[revert]">
      <li>
        <span>Backend</span>
        <ul>
          <li>Laravel</li>
          <li>nginx</li>
          <li>certbot</li>
          <li>mysql</li>
        </ul>
      </li>
      <li>
        <span>Frontend</span>
        <ul>
          <li>Nuxt</li>
          <li>Tailwind</li>
          <li>highlight.js</li>
          <li>i18n</li>
          <li>Pinia</li>
          <li>Editor.js</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
    margin-left: 2rem;
}   

.blinking {
    animation: blink-animation .5s step-end infinite alternate;
}

@keyframes blink-animation {
    50% {
        border-color: transparent
    }
}

.text-gradient {
    background-image: linear-gradient(45deg, #2fff9e, #2a38ff);
    background-size: 100%;
    background-repeat: repeat;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
}

.lds-ring {
    /* change color here */
    color: #1c4c5b
}

.lds-ring,
.lds-ring div {
    box-sizing: border-box;
}

.lds-ring {
    display: inline-block;
    position: relative;
    width: 28px;
    height: 28px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 2px;
    border: 2px solid currentColor;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: currentColor transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>