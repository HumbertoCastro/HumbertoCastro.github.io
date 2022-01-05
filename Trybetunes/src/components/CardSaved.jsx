import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardSaved extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      onDelete,
    } = this.props;

    return (
      <div className="cartas">
        <h1>{ cardName }</h1>
        <img src={ cardImage } alt={ cardName } />
        <p>{ cardDescription }</p>
        <p>{ cardAttr1 }</p>
        <p>{ cardAttr2 }</p>
        <p>{ cardAttr3 }</p>
        <p>{ cardRare }</p>
        { cardTrunfo ? <p> Super Trunfo </p> : null }
        <button
          className={ cardTrunfo ? 'trunfo' : 'card' }
          data-testid="delete-button"
          name={ cardName }
          type="button"
          onClick={ onDelete }
        >
          Salvar
        </button>
      </div>
    );
  }
}
CardSaved.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default CardSaved;
