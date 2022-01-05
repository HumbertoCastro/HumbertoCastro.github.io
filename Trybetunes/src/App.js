import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import CardSaved from './components/CardSaved';
import Filter from './components/Filtes';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cards: [],
      filterCards: [],
      hasFilter: false,
    };
    this.ShowCards = this.ShowCards.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.Filter = this.Filter.bind(this);
  }

  onSaveButtonClick() {
    const {
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardTrunfo,
      cards,
    } = this.state;

    const objectCard = {
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    const newCards = cards;
    newCards.push(objectCard);
    this.setState({ cards: newCards });
    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }
    this.setState({
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
    });
  }

  onInputChange({ target: { name, value, type, checked } }) {
    const nmb = 210;
    const maxnmb = 90;
    let atrValue = value;
    if (type === 'checkbox') {
      atrValue = checked;
    }
    this.setState({ [name]: atrValue }, () => {
      const {
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardName,
        cardDescription,
        cardImage,
      } = this.state;
      let attrs = [cardAttr1, cardAttr2, cardAttr3];
      const texts = [cardName, cardDescription, cardImage];
      attrs = attrs.map((x) => parseInt(x, 10));
      const v = parseInt(cardAttr1, 10)
      + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10);
      if (attrs.some((x) => x > maxnmb || x < 0)
      || texts.some((x) => x === '')
      || v > nmb) {
        this.setState({ isSaveButtonDisabled: true });
      } else {
        this.setState({ isSaveButtonDisabled: false });
      }
    });
  }

  onDelete({ target }) {
    const { name } = target;
    const { cards } = this.state;
    if (target.className === 'trunfo') {
      this.setState({ hasTrunfo: false });
    }
    const newCards = cards;
    newCards.forEach((x, index) => {
      if (x.cardName === name) {
        newCards.splice(index, 1);
        console.log(cards);
      }
    });
    this.setState({ cards: newCards });
  }

  showFilterCards() {
    const { filterCards } = this.state;
    return (this.rendercards(filterCards));
  }

  ShowCards() {
    const { cards } = this.state;
    return (this.rendercards(cards));
  }

  Filter({ target }) {
    if (target.value === '') {
      this.setState({ hasFilter: false });
    } else {
      const { cards } = this.state;
      const { value, name } = target;
      let newCards = [];
      if (target.className === 'select') {
        newCards = cards.filter((x) => x[name] === value);
      } else {
        if (target.type === 'checkbox') {
          newCards = cards.filter((x) => x.cardTrunfo === true);
        } else {
          newCards = cards.filter((x) => x[name].includes(value));
        }
        console.log('');
      }
      this.setState({ filterCards: newCards, hasFilter: true });
    }
  }

  rendercards(cards) {
    return (cards.map((x) => {
      const {
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardTrunfo,
        hasTrunfo,
      } = x;
      return (
        <CardSaved
          key={ `${cardName} ds` }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          onDelete={ this.onDelete }
        />);
    }));
  }

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
      hasTrunfo,
      isSaveButtonDisabled,
      hasFilter,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          onSaveButtonClick={ this.onSaveButtonClick }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
        />
        <h1>Suas cartas</h1>
        <Filter filter={ this.Filter } />
        <div className="deck">
          {hasFilter ? this.showFilterCards() : this.ShowCards()}
        </div>
      </div>
    );
  }
}
export default App;
