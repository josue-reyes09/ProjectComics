// Código JavaScript para la página de todos los cómics
document.addEventListener('DOMContentLoaded', function() {
    // Base de datos simulada de cómics
    const comicsDatabase = [
        // Página 1
        [
            {
                title: "DEADPOOL TEAM-UP",
                author: "Joe Kelly",
                cover: "img/deadpoolteamup.jpg",
                writer: "Gerry Duggan",
                artist: "Mike Hawthorne",
                pages: "32",
                releaseDate: "15 de Marzo, 2025"
            },
            {
                title: "GENIS-VELL: CAPTAIN MARVEL",
                author: "Kelly Sue DeConnick",
                cover: "img/genis-vell.jpg",
                writer: "Kelly Sue DeConnick",
                artist: "David Lopez",
                pages: "28",
                releaseDate: "20 de Abril, 2025"
            },
            {
                title: "BLACK PANTHER",
                author: "Ta-Nehisi Coates",
                cover: "img/bphanter.jpg",
                writer: "Ta-Nehisi Coates",
                artist: "Brian Stelfreeze",
                pages: "34",
                releaseDate: "5 de Mayo, 2025"
            },
            {
                title: "ULTIMATE SPIDER-MAN",
                author: "Dan Slott",
                cover: "img/ultspiderman.jpg",
                writer: "Dan Slott",
                artist: "Stuart Immonen",
                pages: "30",
                releaseDate: "10 de Junio, 2025"
            },
            {
                title: "DOCTOR STRANGE DAMNATION",
                author: "Donny Cates",
                cover: "img/damnation.jpg",
                writer: "Donny Cates",
                artist: "Ryan Stegman",
                pages: "36",
                releaseDate: "25 de Junio, 2025"
            },
            {
                title: "X-MEN: LEGENDS",
                author: "Jonathan Hickman",
                cover: "img/xmenlegends.jpg",
                writer: "Jonathan Hickman",
                artist: "Pepe Larraz",
                pages: "32",
                releaseDate: "15 de Abril, 2025"
            },
            {
                title: "IRON MAN",
                author: "Christopher Cantwell",
                cover: "img/ironman.jpg",
                writer: "Christopher Cantwell",
                artist: "CAFU",
                pages: "28",
                releaseDate: "5 de Mayo, 2025"
            },
            {
                title: "THOR: GOD OF THUNDER",
                author: "Jason Aaron",
                cover: "img/thorGOTT.jpg",
                writer: "Jason Aaron",
                artist: "Esad Ribic",
                pages: "34",
                releaseDate: "20 de Mayo, 2025"
            },
            {
                title: "HULK: IMMORTAL",
                author: "Al Ewing",
                cover: "img/immortalhulk.jpg",
                writer: "Al Ewing",
                artist: "Joe Bennett",
                pages: "30",
                releaseDate: "15 de Junio, 2025"
            },
            {
                title: "FANTASTIC FOUR",
                author: "Dan Slott",
                cover: "img/ff4.jpg",
                writer: "Dan Slott",
                artist: "Sara Pichelli",
                pages: "32",
                releaseDate: "30 de Junio, 2025"
            }
        ],
        // Página 2
        [
            {
                title: "DAREDEVIL: RENACIDO",
                author: "Chip Zdarsky",
                cover: "img/daredevil2019.jpg",
                writer: "Chip Zdarsky",
                artist: "Marco Checchetto",
                pages: "32",
                releaseDate: "5 de Julio, 2025"
            },
            {
                title: "VENOM: LETHAL PROTECTOR",
                author: "Donny Cates",
                cover: "img/venomlethal.jpg",
                writer: "Donny Cates",
                artist: "Ryan Stegman",
                pages: "28",
                releaseDate: "15 de Julio, 2025"
            },
            {
                title: "PUNISHER: WAR ZONE",
                author: "Matthew Rosenberg",
                cover: "img/punisherwarz.jpg",
                writer: "Matthew Rosenberg",
                artist: "Szymon Kudranski",
                pages: "34",
                releaseDate: "25 de Julio, 2025"
            },
            {
                title: "MOON KNIGHT",
                author: "Jeff Lemire",
                cover: "img/moonknight2016.jpg",
                writer: "Jeff Lemire",
                artist: "Greg Smallwood",
                pages: "30",
                releaseDate: "5 de Agosto, 2025"
            },
            {
                title: "GHOST RIDER: INFIERNO",
                author: "Benjamin Percy",
                cover: "img/ghostrider20.jpg",
                writer: "Benjamin Percy",
                artist: "Cory Smith",
                pages: "36",
                releaseDate: "15 de Agosto, 2025"
            },
            {
                title: "DR. STRANGE: SURGEON SUPREME",
                author: "Mark Waid",
                cover: "img/surgeonsup.jpg",
                writer: "Mark Waid",
                artist: "Jesus Saiz",
                pages: "32",
                releaseDate: "20 de Agosto, 2025"
            },
            {
                title: "GUARDIANS OF THE GALAXY",
                author: "Al Ewing",
                cover: "img/gotgewing.jpg",
                writer: "Al Ewing",
                artist: "Juann Cabal",
                pages: "28",
                releaseDate: "1 de Septiembre, 2025"
            },
            {
                title: "NOVA: RESURRECTION",
                author: "Donny Cates",
                cover: "img/nova16.jpg",
                writer: "Donny Cates",
                artist: "Gabriel Walta",
                pages: "34",
                releaseDate: "10 de Septiembre, 2025"
            },
            {
                title: "BLADE: VAMPIRE HUNTER",
                author: "Bryan Hill",
                cover: "img/bladevol5.jpg",
                writer: "Bryan Hill",
                artist: "Szymon Kudranski",
                pages: "30",
                releaseDate: "20 de Septiembre, 2025"
            },
            {
                title: "SCARLET WITCH",
                author: "Steve Orlando",
                cover: "img/scarlet2023.jpg",
                writer: "Steve Orlando",
                artist: "Sara Pichelli",
                pages: "28",
                releaseDate: "30 de Septiembre, 2025"
            }
        ],
        // Página 3
        [
            {
                title: "BLACK WIDOW: DEADLY ORIGIN",
                author: "Kelly Thompson",
                cover: "img/blackwidow2020.jpg",
                writer: "Kelly Thompson",
                artist: "Elena Casagrande",
                pages: "32",
                releaseDate: "5 de Octubre, 2025"
            },
            {
                title: "HAWKEYE: FREEFALL",
                author: "Matthew Rosenberg",
                cover: "img/hawkeye.jpg",
                writer: "Matthew Rosenberg",
                artist: "Otto Schmidt",
                pages: "28",
                releaseDate: "15 de Octubre, 2025"
            },
            {
                title: "AVENGERS: FOREVER",
                author: "Jason Aaron",
                cover: "img/avenger4ev.jpg",
                writer: "Jason Aaron",
                artist: "Aaron Kuder",
                pages: "34",
                releaseDate: "25 de Octubre, 2025"
            },
            {
                title: "ETERNALS: NEW DAWN",
                author: "Kieron Gillen",
                cover: "img/eternals.jpg",
                writer: "Kieron Gillen",
                artist: "Esad Ribic",
                pages: "30",
                releaseDate: "5 de Noviembre, 2025"
            },
            {
                title: "SHANG-CHI: MASTER OF KUNG FU",
                author: "Gene Luen Yang",
                cover: "img/shangchi.jpg",
                writer: "Gene Luen Yang",
                artist: "Dike Ruan",
                pages: "36",
                releaseDate: "15 de Noviembre, 2025"
            },
            {
                title: "SILVER SURFER: BLACK",
                author: "Donny Cates",
                cover: "img/SSblack.jpg",
                writer: "Donny Cates",
                artist: "Tradd Moore",
                pages: "32",
                releaseDate: "25 de Noviembre, 2025"
            },
            {
                title: "HELLIONS",
                author: "Zeb Wells",
                cover: "img/hellions.jpg",
                writer: "Zeb Wells",
                artist: "Stephen Segovia",
                pages: "28",
                releaseDate: "5 de Diciembre, 2025"
            },
            {
                title: "STRANGE ACADEMY",
                author: "Skottie Young",
                cover: "img/strangeacad.jpg",
                writer: "Skottie Young",
                artist: "Humberto Ramos",
                pages: "34",
                releaseDate: "15 de Diciembre, 2025"
            },
            {
                title: "CHAMPIONS",
                author: "Eve L. Ewing",
                cover: "img/champions.jpg",
                writer: "Eve L. Ewing",
                artist: "Simone Di Meo",
                pages: "30",
                releaseDate: "25 de Diciembre, 2025"
            },
            {
                title: "POWER PACK",
                author: "Ryan North",
                cover: "img/powerpack.jpg",
                writer: "Ryan North",
                artist: "Nico Leon",
                pages: "28",
                releaseDate: "5 de Enero, 2026"
            }
        ],
        // Página 4
        [
            {
                title: "MS. MARVEL",
                author: "Saladin Ahmed",
                cover: "img/msmarvel.jpg",
                writer: "Saladin Ahmed",
                artist: "Minkyu Jung",
                pages: "32",
                releaseDate: "15 de Enero, 2026"
            },
            {
                title: "MILES MORALES: SPIDER-MAN",
                author: "Saladin Ahmed",
                cover: "img/miles2018.jpg",
                writer: "Saladin Ahmed",
                artist: "Javier Garrón",
                pages: "28",
                releaseDate: "25 de Enero, 2026"
            },
            {
                title: "AMERICA CHAVEZ",
                author: "Kalinda Vazquez",
                cover: "img/americachavez.jpg",
                writer: "Kalinda Vazquez",
                artist: "Carlos Gomez",
                pages: "34",
                releaseDate: "5 de Febrero, 2026"
            },
            {
                title: "THE INVINCIBLE IRON MAN",
                author: "Eve L. Ewing",
                cover: "img/invincibleiron.jpg",
                writer: "Eve L. Ewing",
                artist: "Kevin Libranda",
                pages: "30",
                releaseDate: "15 de Febrero, 2026"
            },
            {
                title: "SPIDER-WOMAN",
                author: "Karla Pacheco",
                cover: "img/spiderwomann.jpg",
                writer: "Karla Pacheco",
                artist: "Pere Pérez",
                pages: "36",
                releaseDate: "25 de Febrero, 2026"
            },
            {
                title: "WOLVERINE",
                author: "Benjamin Percy",
                cover: "img/wolverine2020.jpg",
                writer: "Benjamin Percy",
                artist: "Adam Kubert",
                pages: "32",
                releaseDate: "5 de Marzo, 2026"
            },
            {
                title: "X-FORCE",
                author: "Benjamin Percy",
                cover: "img/xforce.jpg",
                writer: "Benjamin Percy",
                artist: "Joshua Cassara",
                pages: "28",
                releaseDate: "15 de Marzo, 2026"
            },
            {
                title: "EXCALIBUR",
                author: "Tini Howard",
                cover: "img/excalibur.jpg",
                writer: "Tini Howard",
                artist: "Marcus To",
                pages: "34",
                releaseDate: "25 de Marzo, 2026"
            },
            {
                title: "NEW MUTANTS",
                author: "Vita Ayala",
                cover: "img/newmutants.jpg",
                writer: "Vita Ayala",
                artist: "Rod Reis",
                pages: "30",
                releaseDate: "5 de Abril, 2026"
            },
            {
                title: "MARAUDERS",
                author: "Gerry Duggan",
                cover: "img/marauders.jpg",
                writer: "Gerry Duggan",
                artist: "Matteo Lolli",
                pages: "28",
                releaseDate: "15 de Abril, 2026"
            }
        ],
        // Página 5
        [
            {
                title: "THE INCREDIBLE HULK",
                author: "Rainbow Rowell",
                cover: "img/incredhulk.jpg",
                writer: "Rainbow Rowell",
                artist: "Rogê Antônio",
                pages: "32",
                releaseDate: "25 de Abril, 2026"
            },
            {
                title: "MOON GIRL AND DEVIL DINOSAUR",
                author: "Brandon Montclare",
                cover: "img/moongirl.jpg",
                writer: "Brandon Montclare",
                artist: "Natacha Bustos",
                pages: "28",
                releaseDate: "5 de Mayo, 2026"
            },
            {
                title: "RUNAWAYS",
                author: "Rainbow Rowell",
                cover: "img/runaways2017.jpg",
                writer: "Rainbow Rowell",
                artist: "Andrés Genolet",
                pages: "34",
                releaseDate: "15 de Mayo, 2026"
            },
            {
                title: "SILK",
                author: "Maurene Goo",
                cover: "img/silk.jpg",
                writer: "Maurene Goo",
                artist: "Takeshi Miyazawa",
                pages: "30",
                releaseDate: "25 de Mayo, 2026"
            },
            {
                title: "MOON KNIGHT: MIDNIGHT MISSION",
                author: "Jed MacKay",
                cover: "img/moonknight2021.jpg",
                writer: "Jed MacKay",
                artist: "Alessandro Cappuccio",
                pages: "36",
                releaseDate: "5 de Junio, 2026"
            },
            {
                title: "DARKHAWK: HEART OF THE HAWK",
                author: "Kyle Higgins",
                cover: "img/darkhawkhoth.jpg",
                writer: "Kyle Higgins",
                artist: "Juanan Ramírez",
                pages: "32",
                releaseDate: "15 de Junio, 2026"
            },
            {
                title: "BETA RAY BILL",
                author: "Daniel Warren Johnson",
                cover: "img/BRB.jpg",
                writer: "Daniel Warren Johnson",
                artist: "Daniel Warren Johnson",
                pages: "28",
                releaseDate: "25 de Junio, 2026"
            },
            {
                title: "SPIRITS OF VENGEANCE",
                author: "Taboo",
                cover: "img/spiritsofvngn.jpg",
                writer: "Taboo",
                artist: "Michael Sta. Maria",
                pages: "34",
                releaseDate: "5 de Julio, 2026"
            },
            {
                title: "WEREWOLF BY NIGHT",
                author: "Taboo",
                cover: "img/werewolf.jpg",
                writer: "Taboo",
                artist: "Scot Eaton",
                pages: "30",
                releaseDate: "15 de Julio, 2026"
            },
            {
                title: "CAPTAIN AMERICA: SYMBOL OF TRUTH",
                author: "Tochi Onyebuchi",
                cover: "img/captainsot.jpg",
                writer: "Tochi Onyebuchi",
                artist: "R.B. Silva",
                pages: "28",
                releaseDate: "25 de Julio, 2026"
            }
        ]
    ];
    
    // Crear una lista plana de todos los cómics para búsqueda
    let allComics = [];
    comicsDatabase.forEach(page => {
        page.forEach(comic => {
            allComics.push(comic);
        });
    });
    
    // Elementos del DOM
    const comicsGrid = document.querySelector('.comics-grid');
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    // Elementos del modal
    const modal = document.getElementById('comicModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.querySelector('.modal-close');
    const readComicBtn = document.getElementById('readComicBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Página actual (empezamos con la página 1)
    let currentPage = 0;
    let isSearchMode = false;
    
    // Función para crear una tarjeta de cómic
    function createComicCard(comic) {
        const comicItem = document.createElement('div');
        comicItem.className = 'comic-item';
        
        comicItem.innerHTML = `
            <style>
                .modal-details-list{
                    color:black;
                }
            </style>
            <img src="${comic.cover}" alt="${comic.title}" class="comic-cover">
            <div class="comic-info">
                <h3 class="comic-title">${comic.title}</h3>
                <p class="comic-author">${comic.author}</p>
                <div class="modal-section">
                    <h4 class="modal-section-title">DETALLES:</h4>
                    <ul class="modal-details-list">
                        <li class="modal-detail-item"><strong>Escritor:</strong> ${comic.writer}</li>
                        <li class="modal-detail-item"><strong>Dibujante:</strong> ${comic.artist}</li>
                        <li class="modal-detail-item"><strong>No. de páginas:</strong> ${comic.pages}</li>
                        <li class="modal-detail-item"><strong>Fecha de publicación:</strong> ${comic.releaseDate}</li>
                    </ul>
                </div>
                <button class="ver-info-btn">VER INFO</button>
            </div>
        `;
        
        return comicItem;
    }
    
    // Función para cargar los cómics de una página específica
    function loadComicsPage(pageIndex) {
        // Salir del modo búsqueda si estamos en él
        exitSearchMode();
        
        // Limpiar el grid existente
        comicsGrid.innerHTML = '';
        
        // Verificar si la página existe
        if (pageIndex >= 0 && pageIndex < comicsDatabase.length) {
            // Obtener los cómics de la página seleccionada
            const comics = comicsDatabase[pageIndex];
            
            // Crear tarjetas para cada cómic
            comics.forEach(comic => {
                const comicItem = createComicCard(comic);
                comicsGrid.appendChild(comicItem);
            });
            
            // Actualizar botones de paginación
            paginationBtns.forEach(btn => {
                btn.classList.remove('active');
                
                if (!btn.classList.contains('next') && parseInt(btn.innerText) === pageIndex + 1) {
                    btn.classList.add('active');
                }
            });
            
            // Actualizar página actual
            currentPage = pageIndex;
            
            // Reiniciar eventos para los nuevos botones
            setupVerInfoButtons();
        }
    }
    
    // Función para buscar cómics
    function searchComics(term) {
        // Si no hay término de búsqueda, volver a la vista normal
        if (!term.trim()) {
            exitSearchMode();
            return;
        }
        
        // Convertir el término a minúsculas para una búsqueda insensible a mayúsculas
        const searchTerm = term.toLowerCase();
        
        // Filtrar cómics que coincidan con el término de búsqueda
        const results = allComics.filter(comic => 
            comic.title.toLowerCase().includes(searchTerm) || 
            comic.author.toLowerCase().includes(searchTerm)
        );
        
        // Configurar modo de búsqueda
        isSearchMode = true;
        
        // Ocultar la paginación en modo búsqueda
        document.querySelector('.pagination').style.display = 'none';
        
        // Mostrar sección de resultados de búsqueda
        searchResults.style.display = 'block';
        searchResults.innerHTML = `
            <div class="search-header">
                <h2 class="search-title">Resultados para: "${term}"</h2>
                <button class="clear-search">VOLVER</button>
            </div>
        `;
        
        // Limpiar el grid existente
        comicsGrid.innerHTML = '';
        
        // Si no hay resultados, mostrar mensaje
        if (results.length === 0) {
            comicsGrid.innerHTML = `
                <div class="no-results">
                    <p>No se encontraron cómics que coincidan con "${term}".</p>
                    <p>Intenta con una búsqueda diferente.</p>
                </div>
            `;
        } else {
            // Mostrar los resultados
            results.forEach(comic => {
                const comicItem = createComicCard(comic);
                comicsGrid.appendChild(comicItem);
            });
        }
        
        // Configurar botón para volver a vista normal
        document.querySelector('.clear-search').addEventListener('click', exitSearchMode);
        
        // Reiniciar eventos para los nuevos botones
        setupVerInfoButtons();
    }
    
    // Función para salir del modo búsqueda
    function exitSearchMode() {
        if (isSearchMode) {
            isSearchMode = false;
            
            // Ocultar sección de resultados
            searchResults.style.display = 'none';
            
            // Mostrar paginación
            document.querySelector('.pagination').style.display = 'flex';
            
            // Volver a cargar la página actual
            loadComicsPage(currentPage);
            
            // Limpiar input de búsqueda
            searchInput.value = '';
        }
    }
    
    // Función para configurar los botones "VER INFO"
    function setupVerInfoButtons() {
        const verInfoBtns = document.querySelectorAll('.ver-info-btn');
        
        verInfoBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                openComicModal(this);
                createComicEffect('¡INFO!', this);
            });
        });
    }
    
    // Función para abrir el modal
    function openComicModal(button) {
        const comicItem = button.closest('.comic-item');
        const title = comicItem.querySelector('.comic-title').innerText;
        const author = comicItem.querySelector('.comic-author').innerText;
        const imgSrc = comicItem.querySelector('.comic-cover').src;
        
        // Obtener la sección modal oculta
        const modalSection = comicItem.querySelector('.modal-section');
        const modalSectionClone = modalSection ? modalSection.cloneNode(true) : null;
        
        // Si tenemos la sección clonada, asegurarnos de que sea visible
        if (modalSectionClone) {
            modalSectionClone.style.display = 'block';
        }
        
        // Crear contenido del modal
        modalContent.innerHTML = `
            <div style="flex: 1;">
                <img src="${imgSrc}" alt="${title}" style="width: 100%; border-radius: 5px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
            </div>
            <div style="flex: 2; min-width: 300px;">
                <h3 style="font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; margin-bottom: 15px; color: var(--marvel-red);">${title}</h3>
                <p style="margin-bottom: 25px; line-height: 1.6;color: black;">${author}</p>
                <div id="details-container"></div>
            </div>
        `;
        
        // Agregar la sección de detalles al contenedor
        if (modalSectionClone) {
            document.getElementById('details-container').appendChild(modalSectionClone);
        }
        
        // Mostrar el modal
        modal.classList.add('active');
        
        // Prevenir scroll
        document.body.style.overflow = 'hidden';
    }
    
    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    modalClose.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera de su contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Evento para el botón "LEER COMIC"
    readComicBtn.addEventListener('click', function() {
        createComicEffect('¡LEER!', this);
        
        // Aquí se implementaría la funcionalidad para leer el cómic
        alert('Funcionalidad para leer el cómic en desarrollo');
    });
    
    // Evento para el botón "DESCARGAR"
    downloadBtn.addEventListener('click', function() {
        createComicEffect('¡DESCARGA!', this);
        
        // Aquí se implementaría la funcionalidad para descargar el cómic
        alert('Funcionalidad para descargar el cómic en desarrollo');
    });
    
    // Configurar eventos para los botones de paginación
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('next')) {
                // Ir a la siguiente página
                if (currentPage < comicsDatabase.length - 1) {
                    loadComicsPage(currentPage + 1);
                }
            } else {
                // Ir a la página seleccionada
                const pageIndex = parseInt(this.innerText) - 1;
                loadComicsPage(pageIndex);
            }
            
            // Scroll hacia arriba
            window.scrollTo({
                top: document.querySelector('.main-title').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Evento para el campo de búsqueda y botón
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchComics(searchTerm);
            createComicEffect('¡BÚSQUEDA!', this);
        }
    });
    
    // También buscar al presionar Enter en el campo de búsqueda
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                searchComics(searchTerm);
                createComicEffect('¡BÚSQUEDA!', searchButton);
            }
        }
    });
    
    // Añadir efectos de sonido cómic al hacer clic en botones
    function createComicEffect(text, element) {
        const effect = document.createElement('div');
        effect.className = 'comic-effect';
        effect.innerText = text;
        
        // Posicionar el efecto cerca del elemento
        const rect = element.getBoundingClientRect();
        effect.style.position = 'fixed';
        effect.style.top = `${rect.top - 50}px`;
        effect.style.left = `${rect.left + rect.width / 2}px`;
        effect.style.zIndex = '1000';
        effect.style.fontFamily = "'Bebas Neue', sans-serif";
        effect.style.fontSize = '3rem';
        effect.style.color = 'var(--marvel-red)';
        effect.style.textShadow = '2px 2px 0 black';
        effect.style.pointerEvents = 'none';
        
        // Añadir animación
        effect.style.animation = 'comicEffectAnim 0.5s forwards';
        
        // Agregar al DOM
        document.body.appendChild(effect);
        
        // Eliminar después de la animación
        setTimeout(() => {
            effect.remove();
        }, 500);
    }
    
    // Agregar la animación al CSS si no existe
    if (!document.querySelector('#comic-effect-animation')) {
        const style = document.createElement('style');
        style.id = 'comic-effect-animation';
        style.textContent = `
            @keyframes comicEffectAnim {
                0% { transform: scale(0.5); opacity: 0; }
                50% { transform: scale(1.5); opacity: 1; }
                100% { transform: scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Cargar la primera página de cómics al inicio
    loadComicsPage(0);
});