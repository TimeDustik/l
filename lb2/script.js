"use strict";

let movies = [];

async function searchMovies(query) {
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        movies = data.map(item => item.show);
        displayMovies(movies);
    } catch (error) {
        console.error('Помилка при завантаженні:', error);
        alert('Не вдалося завантажити дані. Спробуйте ще раз.');
    }
}

function displayMovies(movies) {
    const container = document.getElementById('movies-container');
    container.innerHTML = '';
    if (movies.length === 0) {
        container.innerHTML = '<p>Нічого не знайдено.</p>';
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
    const searchTerm = document.getElementById('search').value.trim();
    if (searchTerm) {
        searchMovies(searchTerm);
    }
});

document.getElementById('sort-alphabet').addEventListener('click', () => {
    const sortedMovies = [...movies].sort((a, b) => a.name.localeCompare(b.name));
    displayMovies(sortedMovies);
});

document.getElementById('sort-rating').addEventListener('click', () => {
    const sortedMovies = [...movies].sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0));
    displayMovies(sortedMovies);
});
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search').value.trim();
    if (searchTerm) {
        searchMovies(searchTerm);
    }
});

document.getElementById('search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value.trim();
        if (searchTerm) {
            searchMovies(searchTerm);
        }
    }
});
