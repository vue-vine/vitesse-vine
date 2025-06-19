import TheFooter from '~/components/TheFooter.vine'

function HomeLayout() {
  return vine`
    <main class="px-4 py-10 text-center gray-700 dark:gray-200">
      <RouterView />
      <TheFooter />
      <div class="mx-auto mt-5 text-center text-sm opacity-50">[Home Layout]</div>
    </main>
  `
}

export default HomeLayout
