import { connect } from 'react-redux';
import FilterPanel from '../components/FilterPanel';
import { setFilter, setScrollOffset } from '../actions/actions';

const mapStateToProps = state => {
  const totalAll = state.todos.length;
  let totalActive = 0;
  let totalDone = 0;

  state.todos.forEach(item => {
    if (item.done) {
      totalDone += 1;
    } else {
      totalActive += 1;
    }
  });

  return {
    filter: state.filter,
    totalAll,
    totalActive,
    totalDone,
    currentWidth: state.currentWidth,
  };
};

const mapDispatchToProps = dispatch => ({
  /**
   * Обнуляет значение отступа контента по вертикали для ScrollView (список задач),
   * устанавливает новое значение фильтра для списка задач.
   * @param {string} filter
   * @return {*}
   */
  setFilter: filter => {
    dispatch(setScrollOffset(0));
    dispatch(setFilter(filter));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterPanel);
