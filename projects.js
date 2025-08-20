document.addEventListener('DOMContentLoaded', () => {
    const projectListContainer = document.getElementById('project-list');
    const paginationContainer = document.getElementById('pagination-controls');

    if (!projectListContainer || !paginationContainer) {
        console.error('Project list container #project-list not found!');
        return;
    }

    const PROJECTS_PER_PAGE = 12;
    let currentPage = 1;
    let allProjects = [];

    const fetchProjects = async () => {
        try {
            const response = await fetch('projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allProjects = await response.json();
            displayPage(currentPage);
        } catch (error) {
            console.error('Could not fetch projects:', error);
            projectListContainer.innerHTML = '<p>Sorry, we could not load the projects at this time.</p>';
        }
    };

    const displayPage = (page) => {
        currentPage = page;
        projectListContainer.innerHTML = ''; // Clear previous projects

        const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
        const endIndex = startIndex + PROJECTS_PER_PAGE;
        const paginatedProjects = allProjects.slice(startIndex, endIndex);

        renderProjectCards(paginatedProjects);
        setupPagination();

        // Scroll to top reliably after DOM update
        setTimeout(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50); // 50ms is usually enough
    };

// Existing code...

const renderProjectCards = (projects) => {
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card status-${project.status}`;
        
        const posterUrl = `images/projects/${project.id}.png`;

        // Determine the appropriate URL and price based on status
        const priceText = project.status === 'sample' ? 'Free' : `₹${project.price}`;
        const whatsappOrderUrl = `https://wa.me/918826714264?text=${encodeURIComponent(`Hi! I'm interested in the project '${project.title}'. Can you please provide more details about your services and pricing?`)}`;

        projectCard.innerHTML = `
            <img src="${posterUrl}" alt="${project.title}" loading="lazy" class="project-poster">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>

                <div class="project-price">${priceText}</div>
                <div class="project-meta">
                    <span class="project-subject">${project.subject}</span>
                    <span class="project-status">${project.status.replace(/_/g, ' ')}</span>
                </div>

                ${project.status === 'sample' ? 
                    `<a href="/project-demo.html" class="btn-download">Download Free Sample</a>` :
                    project.status === 'sold' ?
                    `<button class="btn-sold" disabled>Sold</button>` :
                    `<a href="/project.html?id=${project.id}" class="btn-details">View Details</a>
                     <a href="${whatsappOrderUrl}" class="btn-order-whatsapp">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="whatsapp-logo" fill="white">
                            <path d="M16.001 3.2c-7.063 0-12.8 5.737-12.8 12.8 0 2.257.607 4.455 1.762 6.382L3.2 28.8l6.72-1.738c1.863 1.019 3.959 1.555 6.081 1.555h.001c7.063 0 12.8-5.737 12.8-12.8s-5.737-12.8-12.801-12.8zm0 23.04c-1.878 0-3.71-.505-5.311-1.462l-.381-.225-3.985 1.03 1.064-3.889-.248-.398a10.587 10.587 0 0 1-1.619-5.658c0-5.864 4.769-10.633 10.632-10.633 2.84 0 5.511 1.106 7.523 3.117a10.583 10.583 0 0 1 3.11 7.515c0 5.864-4.769 10.633-10.633 10.633zm5.825-7.98c-.318-.159-1.877-.927-2.168-1.031-.291-.107-.504-.16-.716.16-.213.318-.823 1.03-1.01 1.243-.186.213-.373.239-.69.08-.318-.16-1.345-.496-2.561-1.582-.946-.843-1.584-1.882-1.771-2.2-.186-.318-.02-.489.14-.648.143-.142.318-.373.477-.559.16-.186.213-.318.319-.53.106-.213.053-.398-.026-.559-.08-.16-.716-1.726-.981-2.368-.258-.619-.52-.534-.716-.543-.186-.008-.398-.01-.61-.01s-.559.08-.853.398c-.291.318-1.12 1.094-1.12 2.667 0 1.573 1.145 3.09 1.304 3.307.159.213 2.253 3.445 5.454 4.827.762.329 1.357.526 1.821.673.764.243 1.459.209 2.01.127.613-.092 1.877-.765 2.143-1.503.265-.737.265-1.37.186-1.503-.079-.133-.291-.212-.609-.372z"/>
                        </svg>
                        Order on WhatsApp
                     </a>`
                 }
            </div>
        `;
        projectListContainer.appendChild(projectCard);
    });
};
// Existing code... 

    const setupPagination = () => {
        const totalPages = Math.ceil(allProjects.length / PROJECTS_PER_PAGE);
        paginationContainer.innerHTML = '';

        // Previous Button
        const prevButton = document.createElement('button');
        prevButton.textContent = '« Prev';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => displayPage(currentPage - 1));
        paginationContainer.appendChild(prevButton);

        // Page Number Buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => displayPage(i));
            paginationContainer.appendChild(pageButton);
        }

        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next »';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => displayPage(currentPage + 1));
        paginationContainer.appendChild(nextButton);
    };

    fetchProjects();
});
