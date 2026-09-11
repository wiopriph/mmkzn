<script setup lang="ts">
// Подвал копийных страниц (до их редизайна на Этапах 4-5).
const { data: contacts } = useContacts()
</script>

<template>
  <footer v-if="contacts" id="contacts" class="footer">
    <div class="container grid">
      <div>
        <h2 class="col-title">{{ contacts.company }}</h2>
        <p class="col-text">{{ contacts.address }}</p>
      </div>
      <div>
        <h2 class="col-title upper">Контакты</h2>
        <p class="col-text">
          E-mail: <a :href="`mailto:${contacts.email}`" class="link">{{ contacts.email }}</a><br>
          Тел.: <a :href="`tel:${contacts.phone.tel}`" class="link">{{ contacts.phone.display }}</a>
        </p>
      </div>
      <div>
        <h2 class="col-title upper">Диспетчерская</h2>
        <p class="col-text">
          {{ contacts.dispatcher.label }}<br>
          <a :href="`tel:${contacts.dispatcher.tel}`" class="link">{{ contacts.dispatcher.display }}</a>
        </p>
      </div>
    </div>
    <div class="bottom">
      <div class="container bottom-row">
        <a :href="`tel:${contacts.phone.tel}`" class="big-phone">{{ contacts.phone.display }}</a>
        <p class="col-text">
          Диспетчерская
          <a :href="`tel:${contacts.dispatcher.tel}`" class="link">{{ contacts.dispatcher.display }}</a>
        </p>
        <p class="politika">
          <NuxtLink to="/politika/" class="link">Политика обработки персональных данных</NuxtLink>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-ink);
  color: var(--color-paper);
}

.grid {
  display: grid;
  gap: calc(var(--spacing) * 10);
  padding-block: calc(var(--spacing) * 14);

  @include from-md {
    grid-template-columns: repeat(3, 1fr);
  }
}

.col-title {
  margin-bottom: calc(var(--spacing) * 4);
  @include text-h3;

  &.upper {
    text-transform: uppercase;
  }
}

.col-text {
  @include text-body;
  color: color-mix(in srgb, var(--color-paper) 80%, transparent);
}

.link {
  text-decoration: underline;

  &:hover,
  &:focus-visible {
    color: var(--color-accent);
  }
}

.bottom {
  border-top: 1px solid color-mix(in srgb, var(--color-paper) 20%, transparent);
}

.bottom-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 6);
}

.big-phone {
  @include text-h3;
  font-weight: 700;

  &:hover,
  &:focus-visible {
    color: var(--color-accent);
  }
}

.politika {
  @include text-caption;
  color: color-mix(in srgb, var(--color-paper) 60%, transparent);
}
</style>
