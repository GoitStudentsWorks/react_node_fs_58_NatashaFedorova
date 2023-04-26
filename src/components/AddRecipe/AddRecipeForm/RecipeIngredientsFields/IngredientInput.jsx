import React, { useState, useRef } from 'react';

import {
  Dropdown,
  DropdownIcon,
  DropdownItem,
  SmallInput,
  SmallInputWrapper,
} from './RecipeIngredientsFields.styled';

const IngredientInput = ({ ingredients, id, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const clickHandler = () => {
    setIsOpen(prevState => !prevState);
    inputRef.current.focus();
  };

  const changeHandler = event => {
    onChange(event.target.id, event.target.value);
  };

  const quantityClickHandler = event => {
    const prop = ingredients.find(item => item.id === event.target.id).value;
    let inputValue = inputRef.current.value.toString();

    if (
      ingredients.some(item => {
        return inputValue.includes(item.value);
      })
    ) {
      for (let item of ingredients) {
        if (inputValue.includes(item.value)) {
          inputValue.replace(item.value, prop);
        }
      }
    } else {
      inputValue = inputRef.current.value + ' ' + prop;
    }

    inputRef.current.value = inputValue;
    onChange(event.target.closest('ul').id, inputValue);
  };

  return (
    <SmallInputWrapper>
      <SmallInput
        onChange={changeHandler}
        value={value}
        ref={inputRef}
        id={id}
        type="text"
        placeholder="quantity"
        onBlur={() => {
          setTimeout(() => {
            setIsOpen(false);
          }, 100);
        }}
      />
      <DropdownIcon onClick={clickHandler} />
      <Dropdown id={id} isOpen={isOpen}>
        {ingredients.map(item => (
          <DropdownItem
            onClick={quantityClickHandler}
            key={item.id}
            id={item.id}
          >
            {item.value}
          </DropdownItem>
        ))}
      </Dropdown>
    </SmallInputWrapper>
  );
};

export default IngredientInput;