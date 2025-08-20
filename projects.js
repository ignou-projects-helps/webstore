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

    const renderProjectCards = (projects) => {
        if (projects.length === 0) {
            projectListContainer.innerHTML = '<p>No projects to display.</p>';
            return;
        }

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = `project-card status-${project.status}`;
            
            const posterUrl = `images/projects/${project.id}.png`;

            projectCard.innerHTML = `
                <img src="${posterUrl}" alt="${project.title}" class="project-poster">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-price">₹${project.price}</div>
                    <div class="project-meta">
                        <span class="project-subject">${project.subject}</span>
                        <span class="project-status">${project.status.replace(/_/g, ' ')}</span>
                    </div>
                    <a href="#" class="btn-details">View Details</a>
                </div>
            `;
            projectListContainer.appendChild(projectCard);
        });
    };

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

