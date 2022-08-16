import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filterValue, setFilterValue] = useState('');

  const addContact = data => {
    const contactObject = {
      id: nanoid(),
      name: data.name.trim(),
      number: data.number.trim(),
    };

    if (contacts.some(contact => contact.name === contactObject.name.trim())) {
      alert(` ${contactObject.name} is already in contacts`);
      return;
    }

    setContacts(() => [contactObject, ...contacts]);
  };

  const removeContact = id => {
    setContacts(() => contacts.filter(contact => contact.id !== id));
  };

  const filterValueChange = message => {
    setFilterValue(message.target.value);
  };

  const getFilteredContacts = () => {
    const filteredContactsArray = [...contacts].filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    return filteredContactsArray;
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filterValue} onChange={filterValueChange} />
      <ContactList
        contactsArray={getFilteredContacts()}
        onDelete={removeContact}
      />
    </div>
  );
}
