import React from 'react';
import categories from './categories';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <ul style={{ fontSize: 24 }}>
      {Object.keys(categories).map((category) => {
        return (<li key={category} style={{ margin: '0 0 20px '}}><Link to={`/${category}`} style={{color: categories[category].color, textDecoration: 'none'}}>{categories[category].title}</Link></li>);
      })}
    </ul>
  );
};

export default Home;
