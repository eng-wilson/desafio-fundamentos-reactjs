import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  selected?: 'dashboard' | 'importar';
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  selected = 'dashboard',
}: HeaderProps) => {
  const dashboardClass = selected === 'dashboard' ? 'selected' : undefined;
  const importarClass = selected === 'importar' ? 'selected' : undefined;
  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link className={dashboardClass} to="/">
            Listagem
          </Link>
          <Link className={importarClass} to="/import">
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
