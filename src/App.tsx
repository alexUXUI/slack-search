import React from 'react';
import { Search } from './Search.component'
import { useRandomUser } from './RandomUser.hook'
import './App.css';
import './Search.styles.scss'
import { UserState } from './RandomUser.types';

function App(): JSX.Element {

  const { users, error } = useRandomUser({
    fields: ['name', 'cell', 'picture'],
    results: 100  
  });

  const [selectedUser, setSelectedUser] = React.useState<UserState | undefined>(undefined)

  return (
    <div className="App">
      {error !== undefined ? error : null}
      {!error && users?.length === 0 && 'no data.'}
      {!error && users && users?.length > 0 && (
        <Search 
          options={users} 
          setSelectedUser={setSelectedUser}
          loading={!error && users === undefined}
        />
      )}
      {selectedUser && selectedUser !== undefined && (
        <div className="selected-user">
          <img src={selectedUser.picture.thumbnail} alt="user image"/> {selectedUser.name.first} {selectedUser.name.last}
          {selectedUser.cell}
        </div>
      )}
    </div>
  );
}

export default App;
