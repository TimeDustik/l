document.getElementById('loadPokemon').addEventListener('click', async () => {
    const nameOrId = prompt('Введіть імʼя або ID покемона:');
    if (!nameOrId) return;
  
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
      if (!response.ok) throw new Error('Покемона не знайдено');
  
      const data = await response.json();
      const stats = {
        атака: data.stats.find(stat => stat.stat.name === 'attack')?.base_stat,
        захист: data.stats.find(stat => stat.stat.name === 'defense')?.base_stat,
        швидкість: data.stats.find(stat => stat.stat.name === 'speed')?.base_stat,
      };
  
      document.getElementById('cardContainer').innerHTML = `
        <div class="card">
          <img src="${data.sprites.front_default}" alt="${data.name}" />
          <h2>${data.name.toUpperCase()}</h2>
          <div class="stats">
            <div class="stat-box">Атака: ${stats.атака}</div>
            <div class="stat-box">Захист: ${stats.захист}</div>
            <div class="stat-box">Швидкість: ${stats.швидкість}</div>
          </div>
        </div>
      `;
    } catch (error) {
      alert(error.message);
    }
  });
  