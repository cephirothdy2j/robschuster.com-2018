import React, { PureComponent } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import categories from './categories';

class Nav extends PureComponent {
  state = { open: false };
  _handleStateChange = (state) => {
    this.setState({open: state.isOpen});
  }
  _closeMenu = () => {
    this.setState({open: false});
  }
  render() {
    const { open } = this.state;
    return (
      <Menu isOpen={open} onStateChange={(state) => this._handleStateChange(state)} right>
        {Object.keys(categories).map((key) => {
          return (
            <Link className="nav-link" style={{ color: categories[key].color }} onClick={this._closeMenu} key={key} to={`/${key}`}>{categories[key].title}</Link>
          );
        })}
      </Menu>
    )
  }
}

export default Nav;
