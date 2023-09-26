// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState('');
  const [updateAlbum, setUpdateAlbum] = useState({ id: null, title: '' });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  const handleAddAlbum = () => {
    if (newAlbum.trim() === '') return;

    // Dummy POST request (not actually adding to the server)
    const newAlbumObject = {
      userId: 1,
      id: albums.length + 1,
      title: newAlbum,
    };

    setAlbums([...albums, newAlbumObject]);
    setNewAlbum('');

    window.alert('Album added successfully');

    // You can make a POST request to the actual server here if needed
  };

  const handleUpdateAlbum = () => {
    if (!updateAlbum.id || updateAlbum.title.trim() === '') return;

    // Dummy PUT request (not actually updating on the server)
    const updatedAlbums = albums.map((album) =>
      album.id === updateAlbum.id ? { ...album, title: updateAlbum.title } : album
    );

    setAlbums(updatedAlbums);
    setUpdateAlbum({ id: null, title: '' });

    window.alert('Album updated successfully');

    // window.scrollTo(0, document.body.scrollHeight);

    // You can make a PUT request to the actual server here if needed
  };

  const handleDeleteAlbum = (id) => {
    // Dummy DELETE request (not actually deleting on the server)
    const updatedAlbums = albums.filter((album) => album.id !== id);

    setAlbums(updatedAlbums);

    window.alert('Album deleted successfully');

    // You can make a DELETE request to the actual server here if needed
  };

  return (
    <div className="App">
      <h1>Album List</h1>
      <div className="album-form">
        <input
          type="text"
          placeholder="Add an album..."
          value={newAlbum}
          onChange={(e) => setNewAlbum(e.target.value)}
        />
        <button onClick={handleAddAlbum}>Add</button>
      </div>
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id}>
            <div className="album-box">
              <span>{album.title}</span>
              <div className="album-actions">
                <button className='edit' onClick={() => setUpdateAlbum({ id: album.id, title: album.title })}>Edit</button>
                
                
                <button className='del' onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {updateAlbum.id && (
        <div className="album-form">
          <input
            type="text"
            placeholder="Update album..."
            value={updateAlbum.title}
            onChange={(e) => setUpdateAlbum({ ...updateAlbum, title: e.target.value })}
          />
          <button onClick={handleUpdateAlbum}>Update</button>
        </div>
      )}
    </div>
  );
}

export default App;
