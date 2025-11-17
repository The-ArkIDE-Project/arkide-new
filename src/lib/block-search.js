import LazyScratchBlocks from './tw-lazy-scratch-blocks';

// Block metadata for search
const BLOCK_METADATA = {
    // Motion
    motion_movesteps: { name: 'move steps', category: 'motion', color: '#4C97FF' },
    motion_turnright: { name: 'turn right', category: 'motion', color: '#4C97FF' },
    motion_turnleft: { name: 'turn left', category: 'motion', color: '#4C97FF' },
    motion_goto: { name: 'go to', category: 'motion', color: '#4C97FF' },
    motion_gotoxy: { name: 'go to x y', category: 'motion', color: '#4C97FF' },
    motion_pointindirection: { name: 'point in direction', category: 'motion', color: '#4C97FF' },
    motion_xposition: { name: 'x position', category: 'motion', color: '#4C97FF' },
    motion_yposition: { name: 'y position', category: 'motion', color: '#4C97FF' },
    
    // Looks
    looks_say: { name: 'say', category: 'looks', color: '#9966FF' },
    looks_sayforsecs: { name: 'say for seconds', category: 'looks', color: '#9966FF' },
    looks_think: { name: 'think', category: 'looks', color: '#9966FF' },
    looks_thinkforsecs: { name: 'think for seconds', category: 'looks', color: '#9966FF' },
    looks_show: { name: 'show', category: 'looks', color: '#9966FF' },
    looks_hide: { name: 'hide', category: 'looks', color: '#9966FF' },
    looks_switchcostumeto: { name: 'switch costume', category: 'looks', color: '#9966FF' },
    looks_nextcostume: { name: 'next costume', category: 'looks', color: '#9966FF' },
    looks_switchbackdropto: { name: 'switch backdrop', category: 'looks', color: '#9966FF' },
    looks_changesizeby: { name: 'change size', category: 'looks', color: '#9966FF' },
    looks_setsizeto: { name: 'set size', category: 'looks', color: '#9966FF' },
    
    // Sound
    sound_play: { name: 'start sound', category: 'sound', color: '#D65CD6' },
    sound_playuntildone: { name: 'play sound until done', category: 'sound', color: '#D65CD6' },
    sound_stopallsounds: { name: 'stop all sounds', category: 'sound', color: '#D65CD6' },
    sound_setvolumeto: { name: 'set volume', category: 'sound', color: '#D65CD6' },
    sound_changevolumeby: { name: 'change volume', category: 'sound', color: '#D65CD6' },
    
    // Events
    event_whenflagclicked: { name: 'when flag clicked', category: 'events', color: '#FFD500' },
    event_whenkeypressed: { name: 'when key pressed', category: 'events', color: '#FFD500' },
    event_whenthisspriteclicked: { name: 'when sprite clicked', category: 'events', color: '#FFD500' },
    event_whenbackdropswitchesto: { name: 'when backdrop switches', category: 'events', color: '#FFD500' },
    event_broadcast: { name: 'broadcast', category: 'events', color: '#FFD500' },
    event_broadcastandwait: { name: 'broadcast and wait', category: 'events', color: '#FFD500' },
    event_whenbroadcastreceived: { name: 'when I receive', category: 'events', color: '#FFD500' },
    
    // Control
    control_wait: { name: 'wait', category: 'control', color: '#FFAB19' },
    control_repeat: { name: 'repeat', category: 'control', color: '#FFAB19' },
    control_forever: { name: 'forever', category: 'control', color: '#FFAB19' },
    control_if: { name: 'if then', category: 'control', color: '#FFAB19' },
    control_if_else: { name: 'if else', category: 'control', color: '#FFAB19' },
    control_wait_until: { name: 'wait until', category: 'control', color: '#FFAB19' },
    control_repeat_until: { name: 'repeat until', category: 'control', color: '#FFAB19' },
    control_stop: { name: 'stop', category: 'control', color: '#FFAB19' },
    control_create_clone_of: { name: 'create clone', category: 'control', color: '#FFAB19' },
    control_delete_this_clone: { name: 'delete this clone', category: 'control', color: '#FFAB19' },
    
    // Sensing
    sensing_touchingobject: { name: 'touching', category: 'sensing', color: '#4CBFE6' },
    sensing_touchingcolor: { name: 'touching color', category: 'sensing', color: '#4CBFE6' },
    sensing_distanceto: { name: 'distance to', category: 'sensing', color: '#4CBFE6' },
    sensing_askandwait: { name: 'ask and wait', category: 'sensing', color: '#4CBFE6' },
    sensing_answer: { name: 'answer', category: 'sensing', color: '#4CBFE6' },
    sensing_keypressed: { name: 'key pressed', category: 'sensing', color: '#4CBFE6' },
    sensing_mousedown: { name: 'mouse down', category: 'sensing', color: '#4CBFE6' },
    sensing_mousex: { name: 'mouse x', category: 'sensing', color: '#4CBFE6' },
    sensing_mousey: { name: 'mouse y', category: 'sensing', color: '#4CBFE6' },
    sensing_timer: { name: 'timer', category: 'sensing', color: '#4CBFE6' },
    sensing_resettimer: { name: 'reset timer', category: 'sensing', color: '#4CBFE6' },
    sensing_of: { name: 'of', category: 'sensing', color: '#4CBFE6' },
    sensing_current: { name: 'current', category: 'sensing', color: '#4CBFE6' },
    sensing_username: { name: 'username', category: 'sensing', color: '#4CBFE6' },
    
    // Operators
    operator_add: { name: 'add', category: 'operators', color: '#40BF4A' },
    operator_subtract: { name: 'subtract', category: 'operators', color: '#40BF4A' },
    operator_multiply: { name: 'multiply', category: 'operators', color: '#40BF4A' },
    operator_divide: { name: 'divide', category: 'operators', color: '#40BF4A' },
    operator_random: { name: 'pick random', category: 'operators', color: '#40BF4A' },
    operator_gt: { name: 'greater than', category: 'operators', color: '#40BF4A' },
    operator_lt: { name: 'less than', category: 'operators', color: '#40BF4A' },
    operator_equals: { name: 'equals', category: 'operators', color: '#40BF4A' },
    operator_and: { name: 'and', category: 'operators', color: '#40BF4A' },
    operator_or: { name: 'or', category: 'operators', color: '#40BF4A' },
    operator_not: { name: 'not', category: 'operators', color: '#40BF4A' },
    operator_join: { name: 'join', category: 'operators', color: '#40BF4A' },
    operator_letter_of: { name: 'letter of', category: 'operators', color: '#40BF4A' },
    operator_length: { name: 'length of', category: 'operators', color: '#40BF4A' },
    operator_contains: { name: 'contains', category: 'operators', color: '#40BF4A' },
    operator_mod: { name: 'mod', category: 'operators', color: '#40BF4A' },
    operator_round: { name: 'round', category: 'operators', color: '#40BF4A' },
    operator_mathop: { name: 'math operation', category: 'operators', color: '#40BF4A' },
};


class BlockSearch {
    
    constructor() {
        this.searchContainer = null;
        this.searchInput = null;
        this.resultsContainer = null;
        this.workspace = null;
        this.isSearchVisible = false;
        this.currentCategory = null; // <== add this
    }


    init(workspace) {
        this.workspace = workspace;

        this.workspace.addChangeListener((event) => {
            const SB = window.ScratchBlocks || ScratchBlocks;

            if (event.type === SB.Events.UI && event.element === "category") {
                this.handleCategorySwitch(event.newValue);
            }
        });

        this.createSearchUI();
        this.attachToToolbox();
        this.addSearchCategory();

        // ADD FIX HERE ⬇⬇⬇
        document.addEventListener("click", (e) => {
            const item = e.target.closest(".scratchCategoryMenuItem");
            if (!item) return;

            const text = item.textContent.trim().toLowerCase();
            this.handleCategorySwitch(text);
        });
    }

    handleCategorySwitch(categoryName) {
    this.currentCategory = categoryName?.toLowerCase() || "";

    // If switching AWAY from "search", hide it
    if (this.currentCategory !== "search") {
        if (this.isSearchVisible) {
            this.searchContainer.style.display = "none";
            this.resultsContainer.style.display = "none";
            this.searchInput.value = "";
            this.isSearchVisible = false;
        }
    }
}

addSearchCategory() {
    console.log('Adding search category (robust version)...');

    // Helper: find the best toolbox container to observe/attach to
    const findToolboxRoot = () => {
        // Prefer Scratch category container if present
        let root = document.querySelector('.scratchCategoryMenu') ||
                   document.querySelector('.blocklyToolboxDiv') ||
                   document.querySelector('[class*="categoryMenu"]');

        // If nothing found, fallback to body (last resort)
        if (!root) root = document.body;
        return root;
    };

    // Function that ensures the search category exists in the current menu
    const ensureSearchCategory = () => {
        try {
            const targetMenu = document.querySelector('.scratchCategoryMenu') ||
                               document.querySelector('.blocklyTreeRoot') ||
                               document.querySelector('[class*="categoryMenu"]');

            if (!targetMenu) {
                // Nothing to attach to right now
                return;
            }

            // If already exists, do nothing
            let existing = targetMenu.querySelector('.scratch-search-category');
            if (existing) return;

            // Create the DOM node
            const searchCategory = document.createElement('div');
            searchCategory.className = 'scratchCategoryMenuItem scratch-search-category';
            searchCategory.setAttribute('role', 'treeitem');
            searchCategory.style.cssText = `
                padding: 8px 1px;
                cursor: pointer;
                display: flex;
                flex-direction: column;     /* ← vertical layout */
                align-items: center;        /* center horizontally */
                justify-content: center;
                gap: 3px;                   /* spacing between icon + text */
                background: transparent;
                color: white;
                font-weight: bold;
                user-select: none;
                text-align: center;
                border-bottom: 1px solid rgba(0,0,0,0.08);
                height: 64px;               /* matches Scratch category height */
            `;


            // ICON
            const icon = document.createElement('span');
            icon.textContent = '🔍';
            icon.style.fontSize = '20px';   // bigger so it looks like Scratch category icons
            icon.style.lineHeight = '20px';
            icon.style.margin = '0';

            // LABEL
            const label = document.createElement('span');
            label.textContent = 'Search';
            label.style.fontSize = '12px';
            label.style.margin = '0';
            label.style.display = 'block';

            searchCategory.appendChild(icon);
            searchCategory.appendChild(label);

            // Safe click handler: mark currentCategory and toggle search UI.
            // Do not fire ScratchBlocks/Blockly events here.
            searchCategory.addEventListener('click', (e) => {
                e.stopPropagation();
                this.currentCategory = 'search';
                // If UI not created yet, do nothing
                if (!this.searchContainer) {
                    console.warn('searchContainer not created yet (click ignored).');
                    return;
                }
                // Show search bar
                this.handleCategorySwitch('search');
                this.toggleSearchBar();
            });

            // Insert at top
            targetMenu.insertBefore(searchCategory, targetMenu.firstChild);
            console.log('Search category inserted!');
        } catch (err) {
            console.error('Error in ensureSearchCategory:', err);
        }
    };

    // Debounced reconstructor to avoid re-creating repeatedly
    let reconTimeout = null;
    const scheduleEnsure = () => {
        if (reconTimeout) clearTimeout(reconTimeout);
        reconTimeout = setTimeout(() => {
            ensureSearchCategory();
            reconTimeout = null;
        }, 50);
    };

    // Create it initially after small delay (toolbox renders late)
    setTimeout(() => {
        ensureSearchCategory();
    }, 300);

    // Disconnect any previous observer we installed
    if (this._searchCategoryObserver) {
        try { this._searchCategoryObserver.disconnect(); } catch(e){/*noop*/}
        this._searchCategoryObserver = null;
    }

    // Observe the toolbox root (or body if not found). Observe childList + subtree so we catch replacements.
    const toolboxRoot = findToolboxRoot();
    try {
        const observer = new MutationObserver((mutations) => {
            // If menu gets removed/replaced, schedule re-insertion
            for (const m of mutations) {
                if (m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length)) {
                    scheduleEnsure();
                    break;
                }
                // attribute changes could also indicate re-render
                if (m.type === 'attributes') {
                    scheduleEnsure();
                    break;
                }
            }
        });

        // Save observer so we can disconnect later if needed
        this._searchCategoryObserver = observer;

        observer.observe(toolboxRoot, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });

        // Also run a safety interval: sometimes Scratch does a full replace and observers
        // on the previous node don't catch it. This interval checks and ensures existence.
        if (!this._searchCategoryInterval) {
            this._searchCategoryInterval = setInterval(() => {
                ensureSearchCategory();
            }, 800);
        }
    } catch (e) {
        console.error('Could not observe toolbox root, falling back to periodic ensure:', e);
        // Fallback periodic ensure if MutationObserver not allowed
        if (!this._searchCategoryInterval) {
            this._searchCategoryInterval = setInterval(() => {
                ensureSearchCategory();
            }, 800);
        }
    }

    // Hide search bar initially if created
    if (this.searchContainer) {
        this.searchContainer.style.display = 'none';
        this.isSearchVisible = false;
    }
}



toggleSearchBar() {
    this.isSearchVisible = !this.isSearchVisible;
    
    if (this.isSearchVisible) {
        this.searchContainer.style.display = 'block';
        // Focus the input
        setTimeout(() => this.searchInput.focus(), 100);
    } else {
        this.searchContainer.style.display = 'none';
        this.resultsContainer.style.display = 'none';
        this.searchInput.value = '';
    }
}

    createSearchUI() {
        // Create search container
        this.searchContainer = document.createElement('div');
        this.searchContainer.className = 'block-search-container';
        this.searchContainer.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            z-index: 10000;
            padding: 8px;
            background: #2d2d2d;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;

        // Create search input
        this.searchInput = document.createElement('input');
        this.searchInput.type = 'text';
        this.searchInput.placeholder = 'Search blocks...';
        this.searchInput.className = 'block-search-input';
        this.searchInput.style.cssText = `
            width: 100%;
            padding: 6px 10px;
            border: 1px solid #444;
            border-radius: 4px;
            font-size: 13px;
            box-sizing: border-box;
            background: #1e1e1e;
            color: #fff;
        `;

        // Create results container
        this.resultsContainer = document.createElement('div');
        this.resultsContainer.className = 'block-search-results';
        this.resultsContainer.style.cssText = `
            max-height: 300px;
            overflow-y: auto;
            margin-top: 8px;
            display: none;
            background: #1e1e1e;
            border-radius: 4px;
        `;

        this.searchContainer.appendChild(this.searchInput);
        this.searchContainer.appendChild(this.resultsContainer);

        // Event listeners
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim()) {
                this.resultsContainer.style.display = 'block';
            }
        });

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchContainer.contains(e.target)) {
                this.resultsContainer.style.display = 'none';
            }
        });
    }

    attachToToolbox() {
        console.log('Attempting to attach to toolbox...');
        
        // Find the blocks wrapper specifically
        let targetDiv = document.querySelector('[class*="blocks_blocks"]') ||
                        document.querySelector('.injectionDiv');
        
        console.log('Target div:', targetDiv);
        
        if (targetDiv) {
            console.log('Attaching search to:', targetDiv);
            
            // Make sure parent can contain positioned elements
            const currentPosition = window.getComputedStyle(targetDiv).position;
            if (currentPosition === 'static') {
                targetDiv.style.position = 'relative';
            }
            
            // Position at top-left of blocks area, below tabs
            this.searchContainer.style.cssText = `
                margin-left: 60px;
                position: absolute;
                top: 5px;
                left: 5px;
                width: 240px;
                z-index: 99999;
                padding: 8px;
                background: #2d2d2d;
                border: 2px solid #4C97FF;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.5);
                pointer-events: auto;
            `;
            
            targetDiv.appendChild(this.searchContainer);
            console.log('Search bar attached!');
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.resultsContainer.style.display = 'none';
            this.resultsContainer.innerHTML = '';
            return;
        }

        const results = this.searchBlocks(query);
        this.displayResults(results);
    }

    searchBlocks(query) {
        query = query.toLowerCase();
        const results = [];

        for (const [blockType, metadata] of Object.entries(BLOCK_METADATA)) {
            if (metadata.name.toLowerCase().includes(query)) {
                results.push({ blockType, ...metadata });
            }
        }

        return results.slice(0, 10); // Limit to 10 results
    }

    displayResults(results) {
        if (results.length === 0) {
            this.resultsContainer.innerHTML = '<div style="padding:8px;color:#999;">No blocks found</div>';
            this.resultsContainer.style.display = 'block';
            return;
        }

        this.resultsContainer.innerHTML = '';
        this.resultsContainer.style.display = 'block';

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'block-search-result-item';
            resultItem.style.cssText = `
                padding: 8px 12px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                border-radius: 4px;
            `;

            // Category color circle
            const colorCircle = document.createElement('div');
            colorCircle.style.cssText = `
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: ${result.color};
                flex-shrink: 0;
            `;

            // Block name
            const blockName = document.createElement('span');
            blockName.textContent = result.name;
            blockName.style.cssText = `
                flex: 1;
                font-size: 13px;
            `;

            resultItem.appendChild(colorCircle);
            resultItem.appendChild(blockName);

            // Hover effect
            resultItem.addEventListener('mouseenter', () => {
                resultItem.style.backgroundColor = '#f0f0f054';
            });
            resultItem.addEventListener('mouseleave', () => {
                resultItem.style.backgroundColor = 'transparent';
            });

            // Click to add block
            resultItem.addEventListener('click', () => {
                this.addBlockToWorkspace(result.blockType);
                this.searchInput.value = '';
                this.resultsContainer.style.display = 'none';
            });

            this.resultsContainer.appendChild(resultItem);
        });
    }

addBlockToWorkspace(blockType) {
    if (!this.workspace || !LazyScratchBlocks.isLoaded()) return;

    const ScratchBlocks = LazyScratchBlocks.get();
    
    try {
        // Get the flyout
        const toolbox = this.workspace.getToolbox();
        const flyout = toolbox?.flyout_;
        
        if (flyout) {
            // Find the block in the flyout's blocks
            const flyoutBlocks = flyout.workspace_.getTopBlocks(false);
            let templateBlock = null;
            
            for (const block of flyoutBlocks) {
                if (block.type === blockType) {
                    templateBlock = block;
                    break;
                }
            }
            
            if (templateBlock) {
                // Calculate center position BEFORE creating block
                const scale = this.workspace.scale;
                const translation = this.workspace.getOriginOffsetInPixels();
                const workspaceMetrics = this.workspace.getMetrics();
                const centerX = -translation.x / scale + (workspaceMetrics.viewWidth / scale / 2);
                const centerY = -translation.y / scale + (workspaceMetrics.viewHeight / scale / 2);
                
                console.log('Target position:', centerX, centerY);
                
                // Create block
                const newBlock = flyout.createBlock(templateBlock);
                
                // Get where it ended up
                const currentPos = newBlock.getRelativeToSurfaceXY();
                console.log('Block created at:', currentPos);
                
                // Move it to where we want it (relative move from current position)
                const deltaX = centerX - currentPos.x;
                const deltaY = centerY - currentPos.y;
                
                newBlock.moveBy(deltaX, deltaY);
                newBlock.select();
                
                console.log('Moved block by delta:', deltaX, deltaY);
            } else {
                console.warn('Block not found in flyout:', blockType);
                this.showBlockInToolbox(blockType);
            }
        } else {
            console.warn('Flyout not available');
            this.showBlockInToolbox(blockType);
        }
    } catch (err) {
        console.error('Error creating block:', err);
        this.showBlockInToolbox(blockType);
    }
    
    this.searchInput.value = '';
    this.resultsContainer.style.display = 'none';
}

// Fallback method to show block in toolbox
showBlockInToolbox(blockType) {
    console.log('Showing block in toolbox:', blockType);
    
    const result = BLOCK_METADATA[blockType];
    if (!result) return;
    
    // Find and click the category
    const categoryName = result.category;
    const categories = document.querySelectorAll('.scratchCategoryMenuItem, [class*="categoryMenuItem"]');
    
    for (const cat of categories) {
        if (cat.textContent.toLowerCase().includes(categoryName)) {
            cat.click();
            
            // Wait for flyout to open, then highlight the block
            setTimeout(() => {
                const blocks = document.querySelectorAll('.blocklyDraggable');
                for (const block of blocks) {
                    if (block.getAttribute('data-type') === blockType) {
                        // Flash the block
                        block.style.transition = 'opacity 0.3s';
                        let count = 0;
                        const flash = setInterval(() => {
                            block.style.opacity = count % 2 === 0 ? '0.3' : '1';
                            if (++count >= 6) {
                                clearInterval(flash);
                                block.style.opacity = '1';
                            }
                        }, 300);
                        
                        // Scroll to block
                        block.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        break;
                    }
                }
            }, 100);
            break;
        }
    }
}
}

export default new BlockSearch();