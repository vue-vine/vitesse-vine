import TheFooter from '~/components/TheFooter.vine'

function DefaultLayout() {
  return vine`
    <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <RouterView />
      <TheFooter />
      <div class="mx-auto mt-5 text-center text-sm opacity-50">[Default Layout]</div>
    </main>
  `
}

export default DefaultLayout
