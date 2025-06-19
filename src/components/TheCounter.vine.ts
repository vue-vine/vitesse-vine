function TheCounter(props: { initial: number }) {
  const { count, inc, dec } = useCounter(props.initial)

  return vine`
    <div>
      {{ count }}
      <button class="inc" @click="inc()">+</button>
      <button class="dec" @click="dec()">-</button>
    </div>
  `
}

export default TheCounter
