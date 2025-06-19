function TheInput(props: any) {
  const model = vineModel<string>()

  return vine`
    <input
      id="input"
      v-model="model"
      v-bind="$props"
      type="text"
      class="px-4 py-2 w-250px text-center bg-transparent border rounded gray-200 dark:gray-700 outline-none active:outline-none"
    />
  `
}

export default TheInput
