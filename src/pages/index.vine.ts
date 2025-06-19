import TheInput from '~/components/TheInput.vine'

function IndexPage() {
  const user = useUserStore()
  const name = ref(user.savedName)

  const router = useRouter()
  function go() {
    if (name.value)
      router.push(`/hi/${encodeURIComponent(name.value)}`)
  }

  const { t } = useI18n()

  useHead({
    title: () => t('button.home'),
  })

  return vine`
    <div>
      <div class="text-4xl">
        <div class="i-carbon-campsite inline-block" />
      </div>

      <p>
        <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank"> Vitesse </a>
      </p>

      <p>
        <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
      </p>

      <div class="py-4" />

      <TheInput
        v-model="name"
      :placeholder="t('intro.whats-your-name')"
        autocomplete="false"
        @keydown.enter="go"
      />

      <label class="hidden" for="input">
        {{ t('intro.whats-your-name') }}
      </label>

      <div>
        <button class="m-3 text-sm btn" :disabled="!name" @click="go">
          {{ t('button.go') }}
        </button>
      </div>
    </div>
  `
}

export const layoutName = 'home'
export default IndexPage
