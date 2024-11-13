import { NavLink } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/SavedCandidates">Potential Candidates</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Nav;
