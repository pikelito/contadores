import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CounterFilters from '~/components/counter/CounterFilters.vue'
import { useCounterFilters } from '@/composables/counter/useCounterFilters'

jest.mock('@/composables/counter/useCounterFilters')

describe('CounterFilters', () => {
  let mockUseCounterFilters

  const createWrapper = () => {
    return shallowMount(CounterFilters, {
      stubs: {
        UiBaseGroup: true,
        UiBaseSelect: true,
        UiBaseInput: true,
        UiBaseButton: true,
      },
      mocks: {
        $t: (key) => key,
      },
    })
  }

  beforeEach(() => {
    mockUseCounterFilters = {
      filters: ref({ filterBy: null, filterValue: 0 }),
      sorting: ref({ sortBy: 'name', sortOrder: 'asc' }),
      sortOptions: ref([{ value: 'name', text: 'Name' }]),
      orderOptions: ref([{ value: 'asc', text: 'Asc' }]),
      filterOptions: ref([{ value: null, text: 'None' }]),
      updateSortBy: jest.fn(),
      updateSortOrder: jest.fn(),
      updateFilterBy: jest.fn(),
      updateFilterValue: jest.fn(),
      clearFilters: jest.fn(),
    }
    useCounterFilters.mockReturnValue(mockUseCounterFilters)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('binds sorting and filter values to components', () => {
    const wrapper = createWrapper()
    const selects = wrapper.findAll('uibaseselect-stub')

    expect(selects.at(0).attributes('value')).toBe('name')
    expect(selects.at(1).attributes('value')).toBe('asc')
    expect(selects.at(2).attributes('value')).toBeUndefined()

    const input = wrapper.find('uibaseinput-stub')
    expect(input.attributes('value')).toBe('0')
  })

  it('calls update functions on component events', async () => {
    const wrapper = createWrapper()
    const selects = wrapper.findAll('uibaseselect-stub')
    const input = wrapper.find('uibaseinput-stub')
    const button = wrapper.find('uibasebutton-stub')

    selects.at(0).vm.$emit('input', 'value')
    expect(mockUseCounterFilters.updateSortBy).toHaveBeenCalledWith('value')

    selects.at(1).vm.$emit('input', 'desc')
    expect(mockUseCounterFilters.updateSortOrder).toHaveBeenCalledWith('desc')

    selects.at(2).vm.$emit('input', 'greater_than')
    expect(mockUseCounterFilters.updateFilterBy).toHaveBeenCalledWith('greater_than')

    input.vm.$emit('input', '10')
    expect(mockUseCounterFilters.updateFilterValue).toHaveBeenCalledWith('10')

    button.vm.$emit('click')
    expect(mockUseCounterFilters.clearFilters).toHaveBeenCalled()
  })

  it('shows filter value input only when a filter is selected', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('uibaseinput-stub')

    expect(input.attributes('style')).toBe('display: none;')

    mockUseCounterFilters.filters.value.filterBy = 'greater_than'
    await wrapper.vm.$nextTick()

    expect(input.attributes('style')).toBe('')
  })
})
