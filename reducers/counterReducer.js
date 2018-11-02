// demo of saga

export default function(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':

      console.log("action INCREMENT: ", action);
      return {
        ...state,
        increment: state.increment + action.increment,
      }
    default:
      return state
  }
}
