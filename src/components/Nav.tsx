import { NavLink } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className='nav'>
        <ul className='nav'>
          <li className='nav-item'>
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/SavedCandidates" className="nav-link">Potential Candidates</NavLink>
          </li>
        </ul>
    </div>
  )
};

export default Nav;
