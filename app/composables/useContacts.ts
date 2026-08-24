export interface Contacts {
  company: string
  address: string
  email: string
  phone: { display: string; tel: string }
  dispatcher: { label: string; display: string; tel: string }
  whatsapp: string
  telegram: string
  formNote: string
}

export function useContacts() {
  return useAsyncData('contacts', async () => {
    const doc = await queryCollection('data').where('stem', 'LIKE', '%contacts').first()
    return unwrapDataDoc<Contacts>(doc)
  })
}
