<script setup lang="ts">
const { data: contacts } = useContacts()
</script>

<template>
  <footer v-if="contacts" id="contacts" class="bg-ink text-paper">
    <div class="container-page grid gap-10 py-14 md:grid-cols-3">
      <div>
        <h2 class="text-h2 mb-4">{{ contacts.company }}</h2>
        <p class="text-body text-paper/80">{{ contacts.address }}</p>
      </div>
      <div>
        <h2 class="text-h2 mb-4 uppercase">Контакты</h2>
        <p class="text-body text-paper/80">
          E-mail: <a :href="`mailto:${contacts.email}`" class="underline hocus:text-accent">{{ contacts.email }}</a><br>
          Тел.: <a :href="`tel:${contacts.phone.tel}`" class="underline hocus:text-accent">{{ contacts.phone.display }}</a>
        </p>
      </div>
      <div>
        <h2 class="text-h2 mb-4 uppercase">Диспетчерская</h2>
        <p class="text-body text-paper/80">
          {{ contacts.dispatcher.label }}<br>
          <a :href="`tel:${contacts.dispatcher.tel}`" class="underline hocus:text-accent">{{ contacts.dispatcher.display }}</a>
        </p>
      </div>
    </div>
    <div class="border-t border-paper/20">
      <div class="container-page flex flex-wrap items-center justify-between gap-4 py-6">
        <a :href="`tel:${contacts.phone.tel}`" class="text-h2 font-bold hocus:text-accent">{{ contacts.phone.display }}</a>
        <p class="text-body text-paper/80">
          Диспетчерская
          <a :href="`tel:${contacts.dispatcher.tel}`" class="underline hocus:text-accent">{{ contacts.dispatcher.display }}</a>
        </p>
        <p class="text-caption text-paper/60">
          <NuxtLink to="/politika/" class="underline hocus:text-accent">Политика обработки персональных данных</NuxtLink>
        </p>
      </div>
    </div>
  </footer>
</template>
