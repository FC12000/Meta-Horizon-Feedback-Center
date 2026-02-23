javascript: (async () => {
    console.log("Searching for the primary 'Load more' element...");
    let loading = true;

    while (loading) {
        window.scrollTo(0, document.body.scrollHeight);
        
        /* Find all spans on the page */
        const spans = Array.from(document.querySelectorAll('span'));
        
        /* Filter for the specific "Load more" trigger */
        const loadMoreBtn = spans.find(s => {
            const textMatch = s.textContent.trim() === 'Load more';
            const isVisible = s.offsetParent !== null;
            
            /* Ensure it's in the main content area, not a sidebar or header */
            const mainContent = s.closest('main') || s.closest('[role="main"]') || document.body;
            const isInMain = mainContent.contains(s);

            /* Avoid clicking tiny utility buttons; the main button is usually large */
            const isSubstantial = s.offsetWidth > 50; 

            return textMatch && isVisible && isInMain && isSubstantial;
        });

        if (loadMoreBtn) {
            console.log("Clicking main content 'Load more'...");
            loadMoreBtn.click();
            /* Adaptive wait for content injection */
            await new Promise(r => setTimeout(r, 3000));
        } else {
            loading = false;
        }
    }

    /* Count items based on the current URL path to ensure relevance */
    const currentPath = window.location.pathname;
    const items = document.querySelectorAll(`a[href*="${currentPath}"]`);
    
    /* Filter out the current page link itself if it's in the count */
    const count = Array.from(items).filter(a => a.getAttribute('href') !== currentPath).length;
    
    alert(`Done!\nFound ${count} investigation cards.`);
})();
