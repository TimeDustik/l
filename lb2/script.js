"use strict";

let movies = [];

async function fetchMovies() {
    try {
        const response = await fetch('https://api.tvmaze.com/shows');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Не вдалося завантажити дані. Спробуйте ще раз.');
    }
}

function displayMovies(movies) {
    const container = document.getElementById('movies-container');
    container.innerHTML = ''; // Очищення контейнера
    if (movies.length === 0) {
        container.innerHTML = '<p>Нічого не знайдено.</p>'; // Повідомлення, якщо немає результатів
    } else {
        movies.forEach(({ id, name, summary, image }) => {
            const movieCard = `
                <div class="movie-card">
                    <h3>${name}</h3>
                    <img src="${image ? image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${name}">
                    <p>${summary ? summary.replace(/<[^>]+>/g, '') : 'Опис недоступний'}</p>
                    <a href="https://www.tvmaze.com/shows/${id}" target="_blank">Детальніше</a>
                </div>
            `;
            container.innerHTML += movieCard;
        });
    }
}

document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchTerm));
    displayMovies(filteredMovies);
});

document.getElementById('sort-alphabet').addEventListener('click', () => {
    const sortedMovies = [...movies].sort((a, b) => a.name.localeCompare(b.name));
    displayMovies(sortedMovies);
});

document.getElementById('sort-rating').addEventListener('click', () => {
    const sortedMovies = [...movies].sort((a, b) => (b.rating && b.rating.average ? b.rating.average : 0) - (a.rating && a.rating.average ? a.rating.average : 0));
    displayMovies(sortedMovies);
});

// Завантаження фільмів при завантаженні сторінки
window.onload = fetchMovies;
