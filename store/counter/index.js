import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

/**
 * Counter Vuex module
 * @typedef {Object} CounterModule
 * @property {Function} state - State factory function
 * @property {Object} mutations - Module mutations
 * @property {Object} actions - Module actions
 * @property {Object} getters - Module getters
 */

/**
 * Counter store module
 * Manages the state and operations for counters in the application
 * @type {CounterModule}
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
