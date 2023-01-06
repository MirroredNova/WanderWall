import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const NavBar = styled.nav`
  background-color: ${(props) => props.theme.dark};
  display: flex;
  flex-direction: row;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  height: 75px;
  width: 100%;
  z-index: 1000;
`;

const NavTitle = styled.div`
  margin-left: 10px;

  & a {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.light}
  }

  & h1 {
    font-size: 32px;
  }
  
  & * {
    margin: 0 5px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  margin-right: 10px;

  & li {
    margin: 0 5px;

    :hover {
      background-color: ${(props) => props.theme.blue};
      border-radius: 10px;
      cursor: pointer;

      a {
        color: ${(props) => props.theme.dark};
      }
    }
  }
  
  & li a {
    color: white;
    text-decoration: none;
    white-space: nowrap;
    padding: 20px;
    display: block;
  }
`;

const Nav = () => (
  <NavBar>
    <NavTitle>
      <Link href="/">
        <Image src="/logo.png" alt="No Image" width="50" height="50" />
        <h1>WanderWall</h1>
      </Link>
    </NavTitle>
    <NavList>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/gyms">Gyms</Link></li>
      <li><Link href="/travel">Travel</Link></li>
      <li><Link href="/about">About Me</Link></li>
    </NavList>
  </NavBar>
);

export default Nav;
