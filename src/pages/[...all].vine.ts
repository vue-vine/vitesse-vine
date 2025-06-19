function AllPage() {
  const { t } = useI18n()

  return vine`
    <div>
      {{ t('not-found') }}
    </div>
  `
}

AllPage.__route = {
  meta: {
    layout: '404',
  },
}

export default AllPage
