import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  display: flex;
`;

const Li = styled.li`
  width: fit-content;
  padding: 5px;
  &:not(:first-of-type) {
    margin-left: -2px;
  }
  background-color: var(--middle-gray);
  &:hover {
    background-color: var(--border-light-gray);
    transition: 0.2s;
  }
  border: 2px solid var(--border-dark-gray);
  border-bottom: 0;
  color: ${props => !props.isActive && `var(--darkest-gray)`};
  font-size: 0.9rem;
  font-weight: normal;
  cursor: pointer;
`;

const TabItem = React.memo(({ handleTab, ...props }) => {
  const { id, tab, activeTab } = props;
  return (
    <Li key={id} onClick={() => handleTab(id)} isActive={id === activeTab}>
      {tab}
    </Li>
  );
});

const Tabs = React.memo(({ tabs, activeTab, handleTab }) => {
  return (
    <Ul>
      {tabs.map((tab, index) => (
        <TabItem
          key={index}
          tab={tab}
          id={index}
          activeTab={activeTab}
          handleTab={handleTab}
        />
      ))}
    </Ul>
  );
});

export default Tabs;
