<script setup lang="ts">
// "От выбора материала до отгрузки" - фреймы 12746:4708 (1282x853) и 12783:5220
// (моб. 390x800): каскад SectionCascade, в карточке номер шага 64px (моб. 42),
// название 24/26.4 (моб. 12/15.6) и подпись у нижнего края.
interface Step { title: string; caption: string }

defineProps<{
  title: string
  note: string
  cta: { label: string; href: string }
  items: Step[]
}>();
</script>

<template>
  <SectionCascade
    :title="title"
    :note="note"
    :cta="cta"
    :items="items"
    class="steps"
  >
    <template #card="{ item, index }">
      <div class="head">
        <span
          class="number"
          aria-hidden="true"
        >{{ index + 1 }}</span>

        <h3 class="step-title">
          {{ item.title }}
        </h3>
      </div>

      <p class="caption">
        {{ item.caption }}
      </p>
    </template>
  </SectionCascade>
</template>

<style scoped lang="scss">
.steps {
  --cascade-title-width: 45rem;
  --cascade-note-width: 22rem;
  --cascade-cta-padding: calc(var(--spacing) * 6.5);
  --cascade-note-inset: calc(var(--spacing) * 5.5) 0 0 calc(var(--spacing) * 3);

  // длинная подпись кнопки иначе наезжает на 4-ю карточку (в макете шрифт 7px)
  @include below-lg {
    :deep(.note-block .button) {
      padding-inline: calc(var(--spacing) * 3);
      font-size: 0.5625rem;
    }
  }
}

.head {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 1.25);

  @include from-lg {
    gap: calc(var(--spacing) * 2.5);
  }
}

.number {
  font-size: 2.625rem;
  font-weight: 500;
  line-height: 1;

  @include from-lg {
    font-size: 4rem;
  }
}

.step-title {
  max-width: 6.2rem;
  @include text-small;
  line-height: 1.3;

  @include from-lg {
    max-width: 12.5rem;
    @include text-card;
    font-weight: 400;
    line-height: 1.1;
  }
}

.caption {
  margin-top: auto;
  padding-top: calc(var(--spacing) * 2);
  font-size: 0.625rem; // в моб. макете 8px - поднято до читаемых 10
  line-height: 1.2;

  // переносы подписей заданы в контенте, но только для десктопа
  @include from-lg {
    white-space: pre-line;
    @include text-caption;
    line-height: 1.2;
  }
}
</style>
