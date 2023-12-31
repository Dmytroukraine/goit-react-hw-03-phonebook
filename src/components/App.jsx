// import { Component } from 'react';
// import ContactForm from './ContactForm/ContactForm';
// import Filter from './Filter/Filter';
// import ContactList from './ContactList/ContactList';
// import style from '../components/App.module.css';

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Mr. President', number: '156-59-48' },
//       { id: 'id-2', name: 'Senior Developer', number: '954-48-23' },
//       { id: 'id-3', name: 'Boss', number: '467-48-16' },
//       { id: 'id-4', name: 'Best Friend', number: '376-78-16' },
//     ],
//     filter: '',
//   };

//   handleAddNewContact = newContact => {
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizeFilter = filter.toLowerCase();

//     return contacts.filter(({ name }) =>
//       name.toLowerCase().includes(normalizeFilter)
//     );
//   };

//   handleDeleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     const contactsName = contacts.map(contact => contact.name);

//     return (
//       <div>
//         <h1 className={style.title}>Phonebook</h1>
//         <ContactForm
//           onSubmit={this.handleAddNewContact}
//           contactsName={contactsName}
//         />

//         <h2 className={style.title}>Contacts</h2>
//         <div className={style.contact_list_container}>
//           <Filter value={filter} onChange={this.changeFilter} />
//           <ContactList
//             visibleContacts={visibleContacts}
//             onDeleteContact={this.handleDeleteContact}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default App;


import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import style from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddNewContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const contactsName = contacts.map(contact => contact.name);

    return (
      <div>
        <h1 className={style.title}>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleAddNewContact}
          contactsName={contactsName}
        />

        <h2 className={style.title}>Contacts</h2>
        <div className={style.contact_list_container}>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            visibleContacts={visibleContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
