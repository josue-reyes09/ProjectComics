// Código JavaScript para el lector de cómics
document.addEventListener('DOMContentLoaded', function() {
    // Datos simulados de los cómics
    const comicsData = {
        1: { // Issue #1
            title: "Captain America: Better Angels",
            pages: 9,
            pageUrls: [
                "imgcomic/CC/CC-01.jpg",
                "imgcomic/CC/CC-02.jpg",
                "imgcomic/CC/CC-03.jpg",
                "imgcomic/CC/CC-04.jpg",
                "imgcomic/CC/CC-05.jpg",
                "imgcomic/CC/CC-06.jpg",
                "imgcomic/CC/CC-07.jpg",
                "imgcomic/CC/CC-08.jpg",
                "imgcomic/CC/CC-09.jpg",
            ]
        },
        2: { // Issue #2
            title: "Spider-Man: New Beginnings",
            pages: 8,
            pageUrls: [
                "/api/placeholder/800/1200?text=Issue+2+Page+1",
                "/api/placeholder/800/1200?text=Issue+2+Page+2",
                "/api/placeholder/800/1200?text=Issue+2+Page+3",
                "/api/placeholder/800/1200?text=Issue+2+Page+4",
                "/api/placeholder/800/1200?text=Issue+2+Page+5",
                "/api/placeholder/800/1200?text=Issue+2+Page+6",
                "/api/placeholder/800/1200?text=Issue+2+Page+7",
                "/api/placeholder/800/1200?text=Issue+2+Page+8"
            ]
        },
        3: { // Issue #3
            title: "X-Men: First Class",
            pages: 8,
            pageUrls: [
                "/api/placeholder/800/1200?text=Issue+3+Page+1",
                "/api/placeholder/800/1200?text=Issue+3+Page+2",
                "/api/placeholder/800/1200?text=Issue+3+Page+3",
                "/api/placeholder/800/1200?text=Issue+3+Page+4",
                "/api/placeholder/800/1200?text=Issue+3+Page+5",
                "/api/placeholder/800/1200?text=Issue+3+Page+6",
                "/api/placeholder/800/1200?text=Issue+3+Page+7",
                "/api/placeholder/800/1200?text=Issue+3+Page+8"
            ]
        }
    };

    // Elementos del DOM
    const comicTitle = document.getElementById('ComicTitle');
    const viewModeSelect = document.getElementById('viewMode');
    const issueSelect = document.getElementById('issueSelect');
    const pageSelect = document.getElementById('pageSelect');
    
    const singlePageView = document.getElementById('singlePageView');
    const doublePageView = document.getElementById('doublePageView');
    const allPagesView = document.getElementById('allPagesView');
    
    const pageContainer = document.querySelector('.page-container');
    const doublePageContainer = document.querySelector('.double-page-container');
    const currentPageImg = document.getElementById('currentPage');
    const leftPageImg = document.getElementById('leftPage');
    const rightPageImg = document.getElementById('rightPage');
    const allPagesContainer = document.querySelector('.all-pages-container');
    
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const prevDoublePageBtn = document.getElementById('prevDoublePage');
    const nextDoublePageBtn = document.getElementById('nextDoublePage');

    // Variables de estado
    let currentIssue = 1;
    let currentPage = 1;
    let totalPages = 0;
    let zoomLevel = 1;
    let isDragging = false;
    let dragStartX, dragStartY, dragOffsetX = 0, dragOffsetY = 0;
    let isZoomed = false;
    
    // Función para actualizar el título del cómic
    function updateComicTitle() {
        if (comicsData[currentIssue]) {
            comicTitle.innerHTML = `<p>${comicsData[currentIssue].title}</p>`;
        }
    }

    // Función para inicializar el lector
    function initReader() {
        totalPages = comicsData[currentIssue].pages;
        
        // Actualizar el título del cómic
        updateComicTitle();
        
        // Cargar el número de páginas para el issue seleccionado
        updatePageSelectOptions();
        
        // Cargar la primera página
        loadPage(currentIssue, currentPage);
        
        // Cargar todas las páginas para la vista "all pages"
        loadAllPages(currentIssue);
    }

    // Función para actualizar las opciones del selector de páginas
    function updatePageSelectOptions() {
        if (!comicsData[currentIssue]) return;
        
        totalPages = comicsData[currentIssue].pages;
        
        // Limpiar opciones actuales
        pageSelect.innerHTML = '';
        
        // Agregar nuevas opciones
        for (let i = 1; i <= totalPages; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            pageSelect.appendChild(option);
        }
        
        // Seleccionar la página actual
        pageSelect.value = currentPage > totalPages ? 1 : currentPage;
        
        // Asegurar que la página actual está dentro de los límites
        if (currentPage > totalPages) {
            currentPage = 1;
        }
    }

    // Función para cargar una página específica
    function loadPage(issueId, pageNumber) {
        // Verificar que el issue existe
        if (!comicsData[issueId]) {
            console.error(`El issue #${issueId} no existe.`);
            return;
        }
        
        // Verificar que la página está dentro de los límites
        pageNumber = Math.max(1, Math.min(pageNumber, comicsData[issueId].pages));
        
        // Actualizar el estado
        currentIssue = issueId;
        currentPage = pageNumber;
        
        // Actualizar el título del cómic
        updateComicTitle();
        
        // Actualizar selects
        issueSelect.value = currentIssue;
        pageSelect.value = currentPage;
        
        // Resetear zoom
        resetZoom();
        
        // Cargar imagen para vista de una página
        currentPageImg.src = comicsData[issueId].pageUrls[pageNumber - 1];
        
        // Cargar doble página si estamos en ese modo
        if (viewModeSelect.value === 'double') {
            loadDoublePage(issueId, pageNumber);
        }
        
        // Si estamos en modo "all pages", actualizar la vista
        if (viewModeSelect.value === 'all') {
            // Marcar visualmente la página seleccionada
            const allPages = allPagesContainer.querySelectorAll('.comic-page');
            allPages.forEach(page => {
                page.classList.remove('selected-page');
            });
            
            const selectedPage = allPagesContainer.querySelector(`.comic-page[data-page="${pageNumber}"]`);
            if (selectedPage) {
                selectedPage.classList.add('selected-page');
                // Hacer scroll a la página seleccionada
                selectedPage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    // Función para cargar dos páginas a la vez
    function loadDoublePage(issueId, pageNumber) {
        // Asegurar que empezamos con una página impar para mantener el orden correcto
        if (pageNumber % 2 === 0) pageNumber--;
        if (pageNumber < 1) pageNumber = 1;
        
        const pageIdx1 = pageNumber - 1; // Índice de la primera página (base 0)
        const pageIdx2 = pageNumber;     // Índice de la segunda página (base 0)
        
        // Cargar primera página
        leftPageImg.src = comicsData[issueId].pageUrls[pageIdx1];
        
        // Cargar segunda página si existe
        if (pageIdx2 < comicsData[issueId].pages) {
            rightPageImg.src = comicsData[issueId].pageUrls[pageIdx2];
            rightPageImg.style.display = 'block';
        } else {
            // Si no hay segunda página (última página), ocultar
            rightPageImg.style.display = 'none';
        }
        
        // Actualizar estado y select
        currentPage = pageNumber;
        pageSelect.value = currentPage;
        
        // Resetear zoom
        resetZoom();
    }

    // Función para cargar todas las páginas
    function loadAllPages(issueId) {
        // Verificar que el issue existe
        if (!comicsData[issueId]) {
            console.error(`El issue #${issueId} no existe.`);
            return;
        }
        
        // Limpiar el contenedor
        allPagesContainer.innerHTML = '';
        
        // Crear un contenedor para todas las imágenes
        const pagesWrapper = document.createElement('div');
        pagesWrapper.className = 'all-pages-wrapper';
        
        // Cargar todas las páginas
        comicsData[issueId].pageUrls.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = `Comic Page ${index + 1}`;
            img.className = 'comic-page';
            img.setAttribute('data-page', index + 1);
            
            // Marcar la página actual como seleccionada
            if (index + 1 === currentPage) {
                img.classList.add('selected-page');
            }
            
            // Al hacer doble clic en una página, hacer zoom
            img.addEventListener('dblclick', function(e) {
                e.preventDefault();
                toggleZoomAllPages(e, img);
            });
            
            pagesWrapper.appendChild(img);
        });
        
        allPagesContainer.appendChild(pagesWrapper);
        
        // Resetear zoom
        resetZoom();
        
        // Hacer scroll a la página actual
        const selectedPage = allPagesContainer.querySelector(`.comic-page[data-page="${currentPage}"]`);
        if (selectedPage) {
            setTimeout(() => {
                selectedPage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }

    // Función para cambiar de modo de visualización
    function switchViewMode(mode) {
        // Ocultar todas las vistas
        singlePageView.classList.remove('active');
        doublePageView.classList.remove('active');
        allPagesView.classList.remove('active');
        
        // Mostrar la vista seleccionada
        switch (mode) {
            case 'single':
                singlePageView.classList.add('active');
                document.body.style.overflow = 'hidden';
                // Cargar la página actual
                loadPage(currentIssue, currentPage);
                break;
                
            case 'double':
                doublePageView.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Asegurar página impar para el modo de dos páginas
                if (currentPage % 2 === 0) currentPage--;
                if (currentPage < 1) currentPage = 1;
                
                loadDoublePage(currentIssue, currentPage);
                break;
                
            case 'all':
                allPagesView.classList.add('active');
                document.body.style.overflow = 'auto';
                loadAllPages(currentIssue);
                break;
        }
        
        // Resetear zoom
        resetZoom();
    }

    // Funciones para el zoom
    function applyZoom(container, ...elements) {
        // Aplicar zoom a todos los elementos proporcionados
        elements.forEach(element => {
            if (element && element.style) {
                element.style.transform = `scale(${zoomLevel}) translate(${dragOffsetX}px, ${dragOffsetY}px)`;
            }
        });
        
        // Cambiar el cursor según el nivel de zoom
        if (container && container.style) {
            container.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
        }
        
        // Actualizar estado de zoom
        isZoomed = zoomLevel > 1;
    }

    function resetZoom() {
        zoomLevel = 1;
        dragOffsetX = 0;
        dragOffsetY = 0;
        isZoomed = false;
        
        // Aplicar zoom resetado a ambas vistas
        applyZoom(pageContainer, currentPageImg);
        applyZoom(doublePageContainer, leftPageImg, rightPageImg);
        
        // Resetear el zoom en vista de todas las páginas
        if (allPagesContainer.querySelector('.all-pages-wrapper')) {
            allPagesContainer.querySelector('.all-pages-wrapper').style.transform = 'scale(1)';
        }
    }
    
    // Función para alternar zoom con doble clic
    function toggleZoom(e, container, ...elements) {
        if (isZoomed) {
            // Si ya está ampliado, volver a la escala normal
            zoomLevel = 1;
            dragOffsetX = 0;
            dragOffsetY = 0;
        } else {
            // Si no está ampliado, hacer zoom
            zoomLevel = 2; // Nivel de zoom fijo al hacer doble clic
            
            // Calcular el centro del zoom basado en la posición del clic
            if (container && elements.length > 0) {
                const rect = elements[0].getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                // Ajustar offset para centrar en el punto del clic
                dragOffsetX = (rect.width / 2 - mouseX) / zoomLevel;
                dragOffsetY = (rect.height / 2 - mouseY) / zoomLevel;
            }
        }
        
        applyZoom(container, ...elements);
    }
    
    // Función para hacer zoom en vista de todas las páginas
    function toggleZoomAllPages(e, img) {
        if (viewModeSelect.value !== 'all') return;
        
        const wrapper = allPagesContainer.querySelector('.all-pages-wrapper');
        if (!wrapper) return;
        
        // Obtener el estado actual
        const currentTransform = wrapper.style.transform || 'scale(1)';
        const currentScale = parseFloat(currentTransform.replace('scale(', '')) || 1;
        
        if (currentScale > 1) {
            // Si ya está ampliado, volver a la escala normal
            wrapper.style.transform = 'scale(1)';
            wrapper.style.transformOrigin = 'center top';
        } else {
            // Si no está ampliado, hacer zoom
            const rect = img.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();
            
            // Calcular la posición relativa del clic dentro del wrapper
            const relX = ((e.clientX - wrapperRect.left) / wrapperRect.width) * 100;
            const relY = ((e.clientY - wrapperRect.top) / wrapperRect.height) * 100;
            
            wrapper.style.transformOrigin = `${relX}% ${relY}%`;
            wrapper.style.transform = 'scale(2)';
        }
    }

    // Funciones de navegación
    function navigateToNextPage() {
        if (currentPage < totalPages) {
            loadPage(currentIssue, currentPage + 1);
        }
    }

    function navigateToPrevPage() {
        if (currentPage > 1) {
            loadPage(currentIssue, currentPage - 1);
        }
    }

    function navigateToNextDoublePage() {
        if (currentPage + 2 <= totalPages) {
            loadDoublePage(currentIssue, currentPage + 2);
        }
    }

    function navigateToPrevDoublePage() {
        if (currentPage > 2) {
            loadDoublePage(currentIssue, currentPage - 2);
        }
    }

    // EVENT LISTENERS

    // Doble clic para zoom en vista de una página
    pageContainer.addEventListener('dblclick', function(e) {
        toggleZoom(e, pageContainer, currentPageImg);
    });
    
    // Doble clic para zoom en vista de doble página
    doublePageContainer.addEventListener('dblclick', function(e) {
        toggleZoom(e, doublePageContainer, leftPageImg, rightPageImg);
    });

    // Eventos para el zoom con rueda en vista de una página
    pageContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const oldZoom = zoomLevel;
        
        // Zoom in/out
        if (e.deltaY < 0) {
            zoomLevel = Math.min(zoomLevel + 0.1, 3);
        } else {
            zoomLevel = Math.max(zoomLevel - 0.1, 1);
        }
        
        // Solo permitir arrastrar si hay zoom
        if (zoomLevel === 1) {
            dragOffsetX = 0;
            dragOffsetY = 0;
        } else if (zoomLevel !== oldZoom) {
            // Ajustar la posición para mantener el centro del zoom
            const rect = currentPageImg.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Ajustar offset para mantener el punto bajo el cursor
            dragOffsetX = (mouseX / oldZoom - mouseX / zoomLevel + dragOffsetX);
            dragOffsetY = (mouseY / oldZoom - mouseY / zoomLevel + dragOffsetY);
        }
        
        applyZoom(pageContainer, currentPageImg);
    });

    // Eventos para el zoom en vista de dos páginas
    doublePageContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const oldZoom = zoomLevel;
        
        // Zoom in/out
        if (e.deltaY < 0) {
            zoomLevel = Math.min(zoomLevel + 0.1, 3);
        } else {
            zoomLevel = Math.max(zoomLevel - 0.1, 1);
        }
        
        // Solo permitir arrastrar si hay zoom
        if (zoomLevel === 1) {
            dragOffsetX = 0;
            dragOffsetY = 0;
        } else if (zoomLevel !== oldZoom) {
            // Ajustar la posición para mantener ambas páginas visibles
            const rectLeft = leftPageImg.getBoundingClientRect();
            const rectRight = rightPageImg.getBoundingClientRect();
            
            // Calcular el centro entre ambas páginas
            const centerX = (rectLeft.left + rectRight.right) / 2;
            const centerY = (rectLeft.top + rectRight.bottom) / 2;
            
            // Ajustar offset para mantener el punto del cursor en la misma posición
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            dragOffsetX = (mouseX / oldZoom - mouseX / zoomLevel + dragOffsetX);
            dragOffsetY = (mouseY / oldZoom - mouseY / zoomLevel + dragOffsetY);
        }
        
        applyZoom(doublePageContainer, leftPageImg, rightPageImg);
    });
    
    // Eventos para el zoom en vista de todas las páginas
    allPagesContainer.addEventListener('wheel', function(e) {
        if (!e.ctrlKey && !e.metaKey) return; // Solo hacer zoom si se presiona Ctrl/Cmd
        
        e.preventDefault();
        
        const wrapper = allPagesContainer.querySelector('.all-pages-wrapper');
        if (!wrapper) return;
        
        // Obtener el estado actual
        const currentTransform = wrapper.style.transform || 'scale(1)';
        const currentScale = parseFloat(currentTransform.replace('scale(', '')) || 1;
        
        // Calcular el nuevo zoom
        let newScale = currentScale;
        if (e.deltaY < 0) {
            newScale = Math.min(currentScale + 0.1, 3);
        } else {
            newScale = Math.max(currentScale - 0.1, 1);
        }
        
        if (newScale !== currentScale) {
            // Obtener la posición relativa del cursor en el contenedor
            const rect = wrapper.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * 100;
            const relY = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Aplicar zoom con el centro en la posición del cursor
            wrapper.style.transformOrigin = `${relX}% ${relY}%`;
            wrapper.style.transform = `scale(${newScale})`;
        }
    });

    // Evento para arrastrar en vista de una página
    currentPageImg.addEventListener('mousedown', function(e) {
        if (zoomLevel > 1) {
            isDragging = true;
            dragStartX = e.clientX - dragOffsetX;
            dragStartY = e.clientY - dragOffsetY;
            pageContainer.style.cursor = 'grabbing';
        }
    });

    // Eventos para arrastrar en vista de dos páginas
    leftPageImg.addEventListener('mousedown', function(e) {
        if (zoomLevel > 1) {
            isDragging = true;
            dragStartX = e.clientX - dragOffsetX;
            dragStartY = e.clientY - dragOffsetY;
            doublePageContainer.style.cursor = 'grabbing';
        }
    });

    rightPageImg.addEventListener('mousedown', function(e) {
        if (zoomLevel > 1) {
            isDragging = true;
            dragStartX = e.clientX - dragOffsetX;
            dragStartY = e.clientY - dragOffsetY;
            doublePageContainer.style.cursor = 'grabbing';
        }
    });

    // Eventos para el movimiento del ratón (arrastre)
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        dragOffsetX = e.clientX - dragStartX;
        dragOffsetY = e.clientY - dragStartY;
        
        // Aplicar el arrastre a ambas vistas
        applyZoom(pageContainer, currentPageImg);
        applyZoom(doublePageContainer, leftPageImg, rightPageImg);
    });

    // Evento para finalizar el arrastre
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            pageContainer.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
            doublePageContainer.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
        }
    });

    // Cambiar modo de visualización
    viewModeSelect.addEventListener('change', function() {
        switchViewMode(this.value);
    });
    
    // Cambiar issue
    issueSelect.addEventListener('change', function() {
        currentIssue = parseInt(this.value);
        currentPage = 1; // Resetear a la primera página
        updatePageSelectOptions();
        
        // Actualizar el título del cómic
        updateComicTitle();
        
        // Cargar el cómic según el modo de visualización actual
        switch (viewModeSelect.value) {
            case 'single':
                loadPage(currentIssue, currentPage);
                break;
            case 'double':
                loadDoublePage(currentIssue, currentPage);
                break;
            case 'all':
                loadAllPages(currentIssue);
                break;
        }
    });
    
    // Cambiar página
    pageSelect.addEventListener('change', function() {
        currentPage = parseInt(this.value);
        
        // Cargar según el modo de visualización
        switch (viewModeSelect.value) {
            case 'single':
                loadPage(currentIssue, currentPage);
                break;
            case 'double':
                // Ajustar a página impar para vista doble
                if (currentPage % 2 === 0) currentPage--;
                loadDoublePage(currentIssue, currentPage);
                break;
            case 'all':
                // En modo "all pages", simplemente resaltar la página seleccionada
                loadPage(currentIssue, currentPage);
                break;
        }
    });
    
    // Botones de navegación - vista de una página
    prevPageBtn.addEventListener('click', navigateToPrevPage);
    nextPageBtn.addEventListener('click', navigateToNextPage);
    
    // Botones de navegación - vista de dos páginas
    prevDoublePageBtn.addEventListener('click', navigateToPrevDoublePage);
    nextDoublePageBtn.addEventListener('click', navigateToNextDoublePage);
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        const viewMode = viewModeSelect.value;
        
        // Solo permitir navegación por teclado en vistas de una y dos páginas
        if (viewMode === 'all') return;
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            // Página anterior
            if (viewMode === 'single') {
                navigateToPrevPage();
            } else {
                navigateToPrevDoublePage();
            }
            e.preventDefault();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
            // Página siguiente
            if (viewMode === 'single') {
                navigateToNextPage();
            } else {
                navigateToNextDoublePage();
            }
            e.preventDefault();
        }
    });

    // Función para agregar un nuevo cómic
    function addComic(issueId, title, pageUrls) {
        comicsData[issueId] = {
            title: title,
            pages: pageUrls.length,
            pageUrls: pageUrls
        };
        
        // Actualizar el select de issues con la nueva opción
        if (!document.querySelector(`option[value="${issueId}"]`)) {
            const option = document.createElement('option');
            option.value = issueId;
            option.textContent = `Issue #${issueId}`;
            issueSelect.appendChild(option);
        }
    }

    // Función para añadir páginas a un cómic existente
    function addPagesToComic(issueId, newPageUrls) {
        if (comicsData[issueId]) {
            // Añadir las nuevas páginas
            comicsData[issueId].pageUrls = comicsData[issueId].pageUrls.concat(newPageUrls);
            comicsData[issueId].pages = comicsData[issueId].pageUrls.length;
            
            // Si estamos viendo ese cómic, actualizar la vista
            if (currentIssue === issueId) {
                updatePageSelectOptions();
                
                // Actualizar la vista según el modo actual
                switch (viewModeSelect.value) {
                    case 'single':
                        loadPage(currentIssue, currentPage);
                        break;
                    case 'double':
                        loadDoublePage(currentIssue, currentPage);
                        break;
                    case 'all':
                        loadAllPages(currentIssue);
                        break;
                }
            }
        }
    }

    // Iniciar el lector
    initReader();
    
    // Exportar funciones para uso externo
    window.comicReader = {
        addComic: addComic,
        addPagesToComic: addPagesToComic,
        loadComic: function(issueId) {
            if (comicsData[issueId]) {
                currentIssue = issueId;
                currentPage = 1;
                updatePageSelectOptions();
                
                // Actualizar el título del cómic
                updateComicTitle();
                
                // Actualizar la vista según el modo actual
                switch (viewModeSelect.value) {
                    case 'single':
                        loadPage(currentIssue, currentPage);
                        break;
                    case 'double':
                        loadDoublePage(currentIssue, currentPage);
                        break;
                    case 'all':
                        loadAllPages(currentIssue);
                        break;
                }
            }
        }
    };
});