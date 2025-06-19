function NotFoundLayout() {
  const router = useRouter()
  const { t } = useI18n()
  useHead({
    title: () => t('not-found'),
  })

  return vine`
    <main class="px-4 py-10 text-center teal-700 dark:text-gray-200">
      <div class="text-4xl">
        <div class="i-carbon-warning inline-block" />
      </div>
      <RouterView />
      <div>
        <button class="text-sm btn m-3 mt-8" @click="router.back()">
          {{ t('button.back') }}
        </button>
      </div>
    </main>
  `
}

export default NotFoundLayout
