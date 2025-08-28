import { MUTATIONS } from '~/store/counter/constants'

const LOCAL_STORAGE_KEY = 'COUNTER_APP_STATE'
const SESSION_STORAGE_KEY = 'COUNTER_APP_SESSION'

const isCounterMutation = (mutationType) =>
  [
    MUTATIONS.ADD_COUNTER,
    MUTATIONS.REMOVE_COUNTER,
    MUTATIONS.UPDATE_COUNTER_VALUE,
    MUTATIONS.REPLACE_COUNTERS,
  ].some((m) => mutationType.endsWith(m))

const isSessionMutation = (mutationType) =>
  [MUTATIONS.UPDATE_FILTERS, MUTATIONS.UPDATE_SORTING].some((m) => mutationType.endsWith(m))

export default ({ store }) => {
  try {
    const savedCounters = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedCounters) {
      store.commit(`counter/${MUTATIONS.REPLACE_COUNTERS}`, JSON.parse(savedCounters))
    }

    const savedSession = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (savedSession) {
      const { filters, sorting } = JSON.parse(savedSession)
      store.commit(`counter/${MUTATIONS.UPDATE_FILTERS}`, filters)
      store.commit(`counter/${MUTATIONS.UPDATE_SORTING}`, sorting)
    }
  } catch (error) {
    console.error('Error hydrating state from storage:', error)
  }

  store.subscribe((mutation, state) => {
    if (!mutation.type.startsWith('counter/')) return

    try {
      if (isCounterMutation(mutation.type)) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.counter.counters))
      }

      if (isSessionMutation(mutation.type)) {
        const sessionState = {
          filters: state.counter.filters,
          sorting: state.counter.sorting,
        }
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionState))
      }
    } catch (error) {
      console.error('Error persisting state to storage:', error)
    }
  })
}
