import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import getStyles from '../styles/TodoList';
import { markup, selectedItemPreset } from '../actions/constants';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

/**
 * Выводит на экран список задач.
 */
class TodoList extends PureComponent {
  constructor(props) {
    super(props);

    this._onMoveEnd = this._onMoveEnd.bind(this);
  }

  _onMoveEnd(dragResult) {
    if (dragResult.from === dragResult.to) {
      return false;
    }

    const { rearrangeTodo, todos } = this.props;

    /**
     * bug DraggableFlatList происходит при следующей последовательности действий:
     * в списке, который содержит больше задач, например 6, перетаскиваем задачу №6, затем
     * в меньшем списке, состоящем из, например 2 задач, перетаскиваем вниз до конца экрана задачу №2, при этом
     * возвращаемый параметр dragResult.to может содержать индекс задачи до 5, как если бы меньший список был такого же
     * размера как и больший.
     */
    if (dragResult.to > (todos.length - 1)) {
      return false;
    }

    const taskHasToBePrepended = (dragResult.from > dragResult.to);
    const destinationTaskId = todos[dragResult.to].id;

    rearrangeTodo(dragResult.row, destinationTaskId, taskHasToBePrepended);
  }

  render() {
    const {
      unselectTodo,
      selectedItem,
      selectTodo,
      todos,
      currentWidth,
      scrollOffset,
      scrollToEndOffset,
      refFlatList,
      setScrollOffset,
      todoContainerHeight,
      setTodoContainerHeight,
    } = this.props;
    const styles = getStyles(currentWidth);
    const todosHasSingleTask = (todos.length === 1);
    const _keyExtractor = item => item.id.toString();
    const _renderItem = ({ item, index, move, moveEnd, isActive }) => {
      const numberOfLines = (item.text.length > markup.LETTERS_IN_TWO_LINES) ? 3 : 2;
      const stylesItemBody = (isActive) ? styles.itemBodyActive : styles.itemBody;

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={
            () => (selectedItem.id === item.id)
              ? unselectTodo()
              : selectTodo({ ...item })
          }
          onLongPress={(todosHasSingleTask) ? null : move}
          onPressOut={(todosHasSingleTask) ? null : moveEnd}
        >
          <View style={styles.itemContainer}>
            <View style={stylesItemBody}>

              <ImageBackground
                resizeMode={'contain'}
                style={styles.circleIcon}
                source={
                  (selectedItem.id === item.id)
                    ? require('../images/item-done-circle-icon.png')
                    : require('../images/item-circle-icon.png')
                }
              >
                <Text style={styles.number}>
                  {index + 1}
                </Text>
              </ImageBackground>

              <Text
                textBreakStrategy={'highQuality'}
                numberOfLines={numberOfLines}
                style={
                  (item.done)
                    ? (numberOfLines === 3)
                      ? styles.textDoneThreeLine
                      : styles.textDone
                    : (numberOfLines === 3)
                      ? styles.textActiveThreeLine
                      : styles.textActive
                }
              >
                {item.text}
              </Text>

            </View>
            <View style={styles.itemBodyShadow} />
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={styles.container}
        // В связи с тем, что на данный момент приложение разработано только для вертикальной ориентации экрана,
        // сохранение значения высоты контейнера происходит только один раз.
        onLayout={(event) =>
          (todoContainerHeight === 0)
            ? setTodoContainerHeight(event.nativeEvent.layout.height)
            : false
        }
      >
        <ScrollView
          ref={refFlatList}
          onScrollEndDrag={
            ({ nativeEvent }) => setScrollOffset(nativeEvent)
          }
          onMomentumScrollEnd={
            ({ nativeEvent }) => setScrollOffset(nativeEvent)
          }
        >
          <DraggableFlatList
            data={todos}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            scrollPercent={5}
            onMoveEnd={this._onMoveEnd}
            scrollingContainerOffset={scrollOffset}
            scrollToEndOffset={scrollToEndOffset}
          />
        </ScrollView>
      </View>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  selectTodo: PropTypes.func.isRequired,
  unselectTodo: PropTypes.func.isRequired,
  rearrangeTodo: PropTypes.func.isRequired,
  setScrollOffset: PropTypes.func.isRequired,
  setTodoContainerHeight: PropTypes.func.isRequired,
  currentWidth: PropTypes.number.isRequired,
  scrollOffset: PropTypes.number.isRequired,
  scrollToEndOffset: PropTypes.number.isRequired,
  todoContainerHeight: PropTypes.number.isRequired,
  refFlatList: PropTypes.object.isRequired,
  selectedItem: PropTypes.object,
  item: PropTypes.object,
  index: PropTypes.number,
};

TodoList.defaultProps = {
  item: {},
  index: 0,
  selectedItem: selectedItemPreset(),
};

export default TodoList;
