import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [apodData, setApodData] = useState(null);
    const [marsPhotos, setMarsPhotos] = useState([]);
    const [earthDate, setEarthDate] = useState('2023-10-01');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch APOD data
        axios.get('http://localhost:5000/apod')
            .then(response => setApodData(response.data))
            .catch(error => console.error(error));

        // Fetch Mars Rover photos for the initial date
        fetchMarsPhotos(earthDate);
    }, []);

    const fetchMarsPhotos = (date) => {
        setLoading(true);
        setError(null);
        axios.get(`http://localhost:5000/mars-rover-photos?earth_date=${date}`)
            .then(response => {
                setMarsPhotos(response.data.photos);
                if (response.data.photos.length === 0) {
                    setError('No photos available for this date.');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError('Failed to fetch Mars Rover photos.');
                setLoading(false);
            });
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setEarthDate(newDate);
        fetchMarsPhotos(newDate);
    };

    // APOD Metadata Visualization
    const apodMetadata = [
        { label: 'Media Type', value: apodData?.media_type === 'image' ? 'Image' : 'Video', icon: '🖼️' },
        { label: 'HD Image Available', value: apodData?.hdurl ? 'Yes' : 'No', icon: '📺' },
        { label: 'Copyright', value: apodData?.copyright ? `© ${apodData.copyright}` : 'Not Available', icon: '©️' },
    ];

    return (
        <div className="App">
            <header className="header">
                <h1>NASA Data Explorer</h1>
                <p>Explore the wonders of space with NASA's APIs</p>
            </header>

            <section className="apod-section">
                <h2>Astronomy Picture of the Day</h2>
                {apodData && (
                    <div className="apod-card">
                        <h3>{apodData.title}</h3>
                        <img src={apodData.url} alt={apodData.title} className="apod-image" />
                        <p>{apodData.explanation}</p>
                        <a href={apodData.hdurl} target="_blank" rel="noopener noreferrer" className="hd-link">
                            View HD Image
                        </a>
                        <div className="metadata-container">
                            {apodMetadata.map((item, index) => (
                                <div key={index} className="metadata-item">
                                    <span className="metadata-icon">{item.icon}</span>
                                    <span className="metadata-label">{item.label}:</span>
                                    <span className="metadata-value">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <section className="mars-section">
                <h2>Mars Rover Photos</h2>
                <div className="date-picker-container">
                    <label>
                        Select Earth Date:
                        <input
                            type="date"
                            value={earthDate}
                            onChange={handleDateChange}
                            min="2012-08-06"
                            max={new Date().toISOString().split('T')[0]}
                            className="date-picker"
                        />
                    </label>
                </div>
                {loading && <div className="loading-spinner"></div>}
                {error && <p className="error-message">{error}</p>}
                <div className="photo-count">
                    <h4>Photos Taken: <span className="count-badge">{marsPhotos.length}</span></h4>
                </div>
                <div className="photo-grid">
                    {marsPhotos.map(photo => (
                        <div key={photo.id} className="photo-card">
                            <img
                                src={photo.img_src}
                                alt={`Mars Rover Photo ${photo.id}`}
                                className="mars-image"
                            />
                            <div className="photo-info">
                                <span>Photo ID: {photo.id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="footer">
                <p>Made with ❤️ by Sayali Thakur | Powered by NASA APIs</p>
            </footer>
        </div>
    );
}

export default App;