import {
  COUNTER_INCREASE,
  COUNTER_DECREASE,
  increase,
  decrease,
  default as counterReducer
} from '../../src/Counter/CounterReducer'

describe('CounterReducers', () => {
  it('Should export a constant COUNTER_INCREASE.', () => {
    expect(COUNTER_INCREASE).to.equal('COUNTER_INCREASE')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(counterReducer).to.be.a('function')
    })

    it('Should initialize with a state of 0 (Number).', () => {
      expect(counterReducer(undefined, {})).to.equal(0)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = counterReducer(undefined, {})
      expect(state).to.equal(0)
      state = counterReducer(state, { type: '@@@@@@@' })
      expect(state).to.equal(0)
      state = counterReducer(state, increase(5))
      expect(state).to.equal(5)
      state = counterReducer(state, { type: '@@@@@@@' })
      expect(state).to.equal(5)
    })
  })

  describe('(Action Creator) increase', () => {
    it('Should be exported as a function.', () => {
      expect(increase).to.be.a('function')
    })

    it('Should return an action with type "COUNTER_INCREASE".', () => {
      expect(increase()).to.have.property('type', COUNTER_INCREASE)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(increase(5)).to.have.property('payload', 5)
    })

    it('Should default the "payload" property to 1 if not provided.', () => {
      expect(increase()).to.have.property('payload', 1)
    })
  })

  describe('(Action Creator) decrease', () => {
    it('Should be exported as a function.', () => {
      expect(decrease).to.be.a('function')
    })

    it('Should return an action with type "COUNTER_DECREASE".', () => {
      expect(decrease()).to.have.property('type', COUNTER_DECREASE)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(decrease(5)).to.have.property('payload', 5)
    })

    it('Should default the "payload" property to 1 if not provided.', () => {
      expect(decrease()).to.have.property('payload', 1)
    })
  })

  // NOTE: if you have a more complex state, you will probably want to verify
  // that you did not mutate the state. In this case our state is just a number
  // (which cannot be mutated).
  describe('(Action Handler) COUNTER_INCREASE', () => {
    it('Should increase the state by the action payload\'s "value" property.', () => {
      let state = counterReducer(undefined, {})
      expect(state).to.equal(0)
      state = counterReducer(state, increase(1))
      expect(state).to.equal(1)
      state = counterReducer(state, increase(2))
      expect(state).to.equal(3)
      state = counterReducer(state, increase(-3))
      expect(state).to.equal(0)
    })
  })

  describe('(Action Handler) COUNTER_DECREASE', () => {
    it('Should decrease the state by the action payload\'s "value" property, but not less than 0.', () => {
      let state = counterReducer(5, {})
      expect(state).to.equal(5)
      state = counterReducer(state, decrease(1))
      expect(state).to.equal(4)
      state = counterReducer(state, decrease(4))
      expect(state).to.equal(0)
      state = counterReducer(state, decrease(3))
      expect(state).to.equal(0)
    })
  })
})
