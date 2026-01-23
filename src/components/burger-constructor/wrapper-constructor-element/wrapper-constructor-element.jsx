import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { moveItem } from '@services/slices/burger-constructor-slice';

import styles from './wrapper-constructor-element.module.css';

export const WrapperConstructorElement = ({ el, index, removeIngredient }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [, drag] = useDrag({
    type: 'constructorElement',
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: 'constructorElement',
    hover: (draggedItem) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch(moveItem({ dragIndex, hoverIndex }));

      draggedItem.index = hoverIndex;
    },
  });

  drag(drop(ref));
  return (
    <li ref={ref} className={styles.item + ' mb-4'}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={() => removeIngredient(el.uuid)}
      />
    </li>
  );
};
