import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import AddUser from './components/addUser/AddUser';
import Header from './components/header/Header';
import UserList from './components/userList/UserList';

import UserContext from './contexts/userContext';

function App() {
  
  const [users,setUsers] = useState(
      [
        { id: 77, fullName: 'Harleen Frances Quinzel', nick: 'Harley Quinn',
          email:'harley@gmail.com', phone: '555-5555', gender: 'f',role:'player'},
        { id: 121, fullName: 'Joakin Phoenix', nick: 'Joker',
          email:'joker@gmail.com',  gender: 'm',role:'player'},
        { id: 123, fullName: 'Bruce Wayne', nick: 'Batman',
          email:'bat@gmail.com', phone: '555-5557',role:'player'},
        { id: 111, fullName: 'Princess Diana of Thymiscira', nick: 'Wonder Woman',
            email:'gal.gadot@gmail.com', phone: '555-5558', role:'admin'}
      ]);

  const removeUser = (id) => {

    setUsers(users.filter(user => user.id !== id));

  }

  const addUser = (newUser) => {

    /* setUsers(users.concat({...newUser, id: Date.now()})); */
    // Date.now() could still be the same, if addUser() runs in a loop 
    // 
    //setUsers(users.concat({...newUser, id: uuid()}));
    setUsers([...users,{...newUser, id: uuid()}]);

  }

  // MISSION:
  // 1. contexts: Create in contexts dir UserContext
  // 2. App:Bring it here and create UserContext.Provider
  // 3. App: Add removeUser to the "value" of the Provider
  // 4. UserCard: Get it in UserCard
  // 5. UserCard: Use it onClick on the "delete" button

  return (
    <UserContext.Provider value={{removeUser}}>
    <div className="App container pb-5">
      <div className="appTitle">Bulls and Cows</div>
      <div className="row gx-0 gy-3">

        <UserList users={users}>
          <Header title='User List' /> 
        </UserList>

        <AddUser add={addUser}>
          <Header title='Add User' /> 
        </AddUser>

      </div>
    </div>
    </UserContext.Provider>
  );
}

export default App;
