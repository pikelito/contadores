<template>
  <transition name="fade">
    <div v-if="value" class="base-modal-backdrop" @click.self="closeModal">
      <div class="base-modal">
        <header class="base-modal__header">
          <div>
            <h2 class="base-modal__title">
              {{ title }}
            </h2>
          </div>
          <button class="base-modal__close-btn" @click="closeModal">&times;</button>
        </header>
        <main class="base-modal__body">
          <slot />
        </main>
        <footer v-if="$slots.footer" class="base-modal__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  import { defineComponent, watch, onMounted, onUnmounted } from '@nuxtjs/composition-api'

  export default defineComponent({
    name: 'UiBaseModal',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
    },
    emits: ['input', 'open', 'close'],
    setup(props, { emit }) {
      const closeModal = () => {
        emit('input', false)
      }

      const handleKeyDown = (event) => {
        if (event.key === 'Escape' && props.value) {
          closeModal()
        }
      }

      watch(
        () => props.value,
        (newValue) => {
          if (newValue) {
            emit('open')
            document.body.style.overflow = 'hidden'
          } else {
            emit('close')
            document.body.style.overflow = ''
          }
        }
      )

      onMounted(() => {
        window.addEventListener('keydown', handleKeyDown)
      })

      onUnmounted(() => {
        window.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      })

      return {
        closeModal,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .base-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(map.get($colors, 'dark'), 0.5);
    z-index: map.get($z-index, 'modal');
    @include flex(row, center, center);
  }

  .base-modal {
    background-color: white;
    border-radius: map.get($border-radius, 'lg');
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: map.get($breakpoints, 'sm');
    @include flex(column);

    &__header {
      @include flex(row, space-between, center);
      padding: map.get($spacings, 'sm') map.get($spacings, 'md');
      border-bottom: 1px solid map.get($colors, 'border');
    }

    &__title {
      margin: 0;
      font-size: map.get($font-sizes, 'lg');
      font-weight: 500;
    }

    &__close-btn {
      border: none;
      background: transparent;
      font-size: map.get($font-sizes, 'xl');
      cursor: pointer;
      line-height: 1;
      padding: 0;
    }

    &__body {
      padding: map.get($spacings, 'md');
      overflow-y: auto;
    }

    &__footer {
      padding: map.get($spacings, 'md');
      border-top: 1px solid map.get($colors, 'border');
    }
  }
</style>
