<script setup lang="ts">
// Единственный лейаут сайта: шапка (overlay поверх тёмного hero или solid
// на белом — по headerTheme страницы) + контент + подвал.
// Здесь же — глобальная микроразметка Organization/LocalBusiness:
// контакты из contacts.yml, разметка попадает на каждую страницу.
const { data: contacts } = await useContacts();
const site = useSiteConfig();

const [inn, ogrn] = (contacts.value?.requisites ?? '').split('/');

useSchemaOrg([
  defineLocalBusiness({
    name: site.name,
    legalName: contacts.value?.company,
    url: site.url,
    logo: `${site.url}/design/logo-full.svg`,
    image: `${site.url}/design/photo-hero.jpg`,
    telephone: contacts.value?.phone.tel,
    email: contacts.value?.email,
    taxID: inn || undefined,
    // ОГРН у schema.org отдельного поля не имеет — кладём идентификатором
    identifier: ogrn ? { '@type': 'PropertyValue', name: 'ОГРН', value: ogrn } : undefined,
    address: {
      streetAddress: 'ул. Портовая, д. 27, оф. 2.2',
      addressLocality: 'Казань',
      addressRegion: 'Республика Татарстан',
      postalCode: '420108',
      addressCountry: 'RU',
    },
    areaServed: 'Республика Татарстан',
  }),
]);
</script>

<template>
  <div class="shell">
    <LayoutSiteHeader :theme="($route.meta.headerTheme as 'overlay' | 'solid') ?? 'overlay'" />

    <div class="page">
      <slot />
    </div>

    <LayoutSiteFooter />
  </div>
</template>

<style scoped lang="scss">
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page {
  flex: 1;
}
</style>
