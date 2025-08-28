<template>
  <UiBaseModal :value="value" :title="$t('COUNTER.ADD_NEW_COUNTER')" @input="close" @open="reset">
    <form id="counter-form" @submit.prevent="handleSubmit">
      <UiBaseInput
        id="counter-name"
        v-model="name"
        :label="$t('COUNTER.NAME')"
        :error="error"
        :placeholder="$t('COUNTER.NAME_PLACEHOLDER')"
        required
      />
    </form>
    <template #footer>
      <div class="modal-footer-actions">
        <UiBaseButton variant="secondary" @click="close">
          {{ $t('CANCEL') }}
        </UiBaseButton>
        <UiBaseButton type="submit" form="counter-form" variant="primary">
          {{ isLoading ? $t('SAVING') : $t('SAVE') }}
        </UiBaseButton>
      </div>
    </template>
  </UiBaseModal>
</template>

<script>
  import { defineComponent } from '@nuxtjs/composition-api'
  import { useCounterForm } from '@/composables/counter/useCounterForm'

  export default defineComponent({
    name: 'CounterAddModal',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['input'],
    setup(_props, { emit }) {
      const { name, error, isLoading, isNameInvalid, reset, submit } = useCounterForm()

      const close = () => {
        emit('input', false)
      }

      const handleSubmit = async () => {
        const result = await submit()
        if (result?.success) {
          close()
        }
      }

      return {
        name,
        error,
        isLoading,
        isNameInvalid,
        reset,
        handleSubmit,
        close,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .modal-footer-actions {
    display: flex;
    justify-content: flex-end;
    gap: map.get($spacings, 'md');
  }
</style>
