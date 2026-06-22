"use strict";

// Plantilla para cada canción:
let card_song = `<article class="song-card">
    <div class="cover">
        <img src="{thumbnail}"
            alt="Portada: {title}">
        <span class="badge">{duration_string}</span>
    </div>
    <div class="content">
        <h2 class="title"> {title} </h2>
        <div class="meta">{view_count} vistas</div>
        <div class="footer">
            <span class="channel">Canal: <a href="{channel_url}"
                target="_blank" rel="noopener noreferrer">{channel}</a></span>
        </div>
    </div>
</article>`

// Formateador de números
let formatter = new Intl.NumberFormat('en-US');


// Ejemplo de uso:
// let views_witoutformat = 2536628;


// let views_withformat= formatter.format(views_witoutformat); 
// Valor de views_withformat: "2,536,628"


// Función para cargar y renderizar las canciones
const loadSongs = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Youtube/only_songs.json');
        if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        const songs = await response.json();
        const first12Songs = songs.slice(0, 12);

        let html = '';
        first12Songs.forEach(song => {
            //Para que siempre aparezcan los datos de las canciones 
            let renderedCard = card_song
                .replace(/{thumbnail}/g, song.thumbnail)
                .replace(/{title}/g, song.title) 
                .replace(/{duration_string}/g, song.duration_string)
                .replace(/{view_count}/g, formatter.format(song.view_count))
                .replace(/{channel}/g, song.channel)
                .replace(/{channel_url}/g, song.channel_url);
            html += renderedCard;
        });

        // Cargar en el elemento con clase songs-grid
        document.querySelector('.songs-grid').innerHTML = html;
    } catch (error) {
        alert(`Error al cargar las canciones: ${error.message}`);
    }
};

// IIFE que se ejecuta cuando el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    loadSongs();
});