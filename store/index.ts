import { MutationTree, ActionTree } from 'vuex';
import { State } from '~/types'

export const state = () : State => ({
  counter: 23
})

export const mutations: MutationTree<State> = {
  increment(state: State) {
    state.counter += 23;
  }
}