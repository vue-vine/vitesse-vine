import { toggleDark } from '~/composables/dark'
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

function TheFooter() {
  const { t, locale } = useI18n()

  async function toggleLocales() {
    // change to some real logic
    const locales = availableLocales
    const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    await loadLanguageAsync(newLocale)
    locale.value = newLocale
  }

  return vine`
    <nav class="flex gap-4 mt-6 justify-center text-xl">
      <RouterLink class="icon-btn" to="/">
        <div class="i-carbon-campsite" />
      </RouterLink>

      <button class="icon-btn" :title="t('button.toggle_dark')" @click="toggleDark()">
        <div class="i-carbon-sun dark:i-carbon-moon" />
      </button>

      <a class="icon-btn" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div class="i-carbon-language" />
      </a>

      <a
        class="icon-btn"
        rel="noreferrer"
        href="https://github.com/antfu/vitesse"
        target="_blank"
        title="GitHub"
      >
        <div class="i-carbon-logo-github" />
      </a>
    </nav>
`
}

export default TheFooter
