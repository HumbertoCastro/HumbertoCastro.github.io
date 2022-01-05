import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { filter } = this.props;

    return (
      <div>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ filter }
          name="cardName"
        />
        <select
          name="cardRare"
          data-testid="rare-filter"
          onChange={ filter }
          className="select"
        >
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito Raro</option>
          <option value="">todas</option>
        </select>
        <input
          type="checkbox"
          name="cardTrunfo"
          data-testid="trunfo-filter"
          onChange={ filter }
        />
      </div>
    );
  }
}
Filter.propTypes = {
  filter: PropTypes.func.isRequired,
};
export default Filter;
