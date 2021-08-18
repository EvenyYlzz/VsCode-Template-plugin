import state from './state';
export default {
  state,
  $init: () => {
    return state;
  },

  *pageChangeAction1([page, size]) {
    yield '';
    this.state.pageAreaData.page = page;
    this.state.pageAreaData.perPage = size;
  },

  *pageChangeAction2([page, size]) {
    yield '';
    this.state.pageAreaData.page = page;
    this.state.pageAreaData.perPage = size;
  }

};