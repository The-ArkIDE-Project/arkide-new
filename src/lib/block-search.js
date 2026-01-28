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
        this.vm = null;
        this.isSearchVisible = false;
        this.currentCategory = null;
        this.dynamicBlockMetadata = {};
    }

    init(workspace, vm) {
        this.workspace = workspace;
        this.vm = vm;

        // Initialize metadata with static blocks
        this.dynamicBlockMetadata = { ...BLOCK_METADATA };

        this.workspace.addChangeListener((event) => {
            const SB = window.ScratchBlocks || LazyScratchBlocks.get();
            if (event.type === SB.Events.UI && event.element === "category") {
                this.handleCategorySwitch(event.newValue);
            }
        });

        this.createSearchUI();
        this.attachToToolbox();
        this.addSearchCategory();
        
        // CRITICAL: Listen to VM's EXTENSION_ADDED event
        this.setupVMExtensionListener();
        
        // Initial metadata build
        setTimeout(() => {
            this.buildExtensionMetadata();
        }, 1000);

        document.addEventListener("click", (e) => {
            const item = e.target.closest(".scratchCategoryMenuItem");
            if (!item) return;
            const text = item.textContent.trim().toLowerCase();
            this.handleCategorySwitch(text);
        });
    }

    setupVMExtensionListener() {
        if (!this.vm || !this.vm.runtime) {
            console.warn('VM not available for extension listener');
            return;
        }

        // Listen to the EXTENSION_ADDED event from VM runtime
        this.vm.runtime.on('EXTENSION_ADDED', (categoryInfo) => {
            console.log('🎉 EXTENSION_ADDED event fired:', categoryInfo);
            
            // Wait for blocks to be registered, then rebuild
            setTimeout(() => {
                console.log('⚡ Rebuilding metadata after extension added...');
                this.buildExtensionMetadata();
            }, 500);
        });

        // Also listen for BLOCKSINFO_UPDATE
        this.vm.runtime.on('BLOCKSINFO_UPDATE', () => {
            console.log('📦 BLOCKSINFO_UPDATE event fired');
            setTimeout(() => {
                this.buildExtensionMetadata();
            }, 300);
        });

    }

buildExtensionMetadata() {
    if (!this.workspace || !LazyScratchBlocks.isLoaded()) {
        return;
    }

    const ScratchBlocks = LazyScratchBlocks.get();
    
    try {
        const toolbox = this.workspace.getToolbox();
        const blockTypes = Object.keys(ScratchBlocks.Blocks);
        let newBlocksFound = 0;
        
        
        // Helper to get actual color from a rendered block in the flyout
        const getBlockColorFromFlyout = (blockType) => {
            if (!toolbox || !toolbox.flyout_ || !toolbox.flyout_.workspace_) {
                return null;
            }
            
            try {
                const flyoutBlocks = toolbox.flyout_.workspace_.getAllBlocks(false);
                const block = flyoutBlocks.find(b => {
                    // Accept both shadow and non-shadow blocks for reporters/booleans
                    const isShadow = (typeof b.isShadow === 'function') ? b.isShadow() : b.isShadow;
                    const isReporter = b.outputConnection !== undefined && b.outputConnection !== null;
                    
                    // For reporter/boolean blocks, accept shadows too
                    if (isReporter) {
                        return b.type === blockType;
                    }
                    return b.type === blockType && !isShadow;
                });
                
                if (!block) return null;
                
                // Method 1: Get color from the block's colour_ property
                if (block.colour_) {
                    return block.colour_;
                }
                
                // Method 2: Get color from the block's getColour method
                if (block.getColour && typeof block.getColour === 'function') {
                    return block.getColour();
                }
                
                // Method 3: Get color from the SVG element directly
                if (block.svgPath_) {
                    const fill = block.svgPath_.getAttribute('fill');
                    if (fill && fill !== 'none') {
                        return fill;
                    }
                }
                
                // Method 4: Get from SVG group
                if (block.svgGroup_) {
                    const pathElements = block.svgGroup_.getElementsByTagName('path');
                    if (pathElements.length > 0) {
                        const fill = pathElements[0].getAttribute('fill');
                        if (fill && fill !== 'none') {
                            return fill;
                        }
                    }
                }
                
                return null;
            } catch (e) {
                console.warn('Error getting color from flyout block:', e);
                return null;
            }
        };
        
        // Get block names from the flyout workspace where they're properly formatted
        const getBlockNameFromFlyout = (blockType) => {
            if (!toolbox || !toolbox.flyout_ || !toolbox.flyout_.workspace_) {
                return null;
            }
            
            try {
                const flyoutBlocks = toolbox.flyout_.workspace_.getAllBlocks(false);
                const block = flyoutBlocks.find(b => {
                    const isShadow = (typeof b.isShadow === 'function') ? b.isShadow() : b.isShadow;
                    return b.type === blockType && !isShadow;
                });
                
                if (!block) return null;
                
                // Method 1: Try to get from the SVG text content
                if (block.svgGroup_) {
                    const svgTexts = block.svgGroup_.getElementsByTagName('text');
                    const textParts = [];
                    
                    for (let i = 0; i < svgTexts.length; i++) {
                        const textElement = svgTexts[i];
                        const text = textElement.textContent || textElement.innerText;
                        
                        if (text && text.trim()) {
                            // Skip dropdown arrows
                            if (text.trim() === '▼') continue;
                            
                            // Check if this is a text field (not a value)
                            const parentClass = textElement.parentElement?.getAttribute('class') || '';
                            if (!parentClass.includes('blocklyEditableText')) {
                                textParts.push(text.trim());
                            }
                        }
                    }
                    
                    // Add placeholders for inputs
                    if (block.inputList) {
                        const inputTexts = [];
                        block.inputList.forEach(input => {

                            // Handle explicit dropdown fields here
                            if (input.fieldRow && input.fieldRow.length > 0) {
                                input.fieldRow.forEach(field => {
                                    if (field instanceof ScratchBlocks.FieldDropdown) {
                                        // Always show [] for dropdowns (your requested behavior)
                                        inputTexts.push('[]');
                                    } else if (field.getText && typeof field.getText === 'function') {
                                        const fieldText = field.getText();
                                        if (fieldText && fieldText.trim() && fieldText !== '▼') {
                                            // Skip editable text fields
                                            if (!field.EDITABLE) {
                                                inputTexts.push(fieldText.trim());
                                            }
                                        }
                                    }
                                });
                            }

                            // Add placeholders for value/statement connections
                            if (input.connection) {
                                if (input.type === ScratchBlocks.INPUT_VALUE) {
                                    inputTexts.push('()');
                                } else if (input.type === ScratchBlocks.NEXT_STATEMENT) {
                                    inputTexts.push('[]');
                                }
                            }
                        });

                        if (inputTexts.length > 0) {
                            return inputTexts.join(' ').toLowerCase().trim();
                        }
                    }
                    
                    if (textParts.length > 0) {
                        return textParts.join(' ').toLowerCase().trim();
                    }
                }
                
                // Method 2: Try from block's toString or custom rendering
                if (block.toString) {
                    const blockStr = block.toString();
                    if (blockStr && blockStr.length > 0 && blockStr.length < 100) {
                        return blockStr.toLowerCase().trim();
                    }
                }
                
                return null;
            } catch (e) {
                console.warn('Error extracting block name from flyout:', e);
                return null;
            }
        };
        
        // NOW ITERATE THROUGH BLOCKS
        blockTypes.forEach(blockType => {
                    // Skip if already in metadata
                    if (this.dynamicBlockMetadata[blockType]) return;
                    
                    // Skip invalid/internal block types - BUT ALLOW reporter/boolean blocks!
                    if (blockType.startsWith('extension_') || 
                        blockType === 'procedures_prototype' ||
                        blockType === 'text' ||
                        blockType === 'math_number') {
                        return;
                    }
                    
                    // IMPORTANT: Keep argument reporters as they are real blocks
                    // (argument_reporter_string_number, argument_reporter_boolean)
            
            const blockDefinition = ScratchBlocks.Blocks[blockType];
            if (!blockDefinition) return;
            
            newBlocksFound++;
            
            // Get category
            let category = 'extension';
            let color = '#0FBD8C'; // Default fallback
            
            // FIRST: Try to get color from the actual rendered block (most accurate!)
            const flyoutColor = getBlockColorFromFlyout(blockType);
            if (flyoutColor) {
                color = flyoutColor;
            } else {
                // SECOND: Try to get from VM runtime blockInfo
                if (this.vm && this.vm.runtime && this.vm.runtime._blockInfo) {
                    const extensionId = blockType.split('_')[0];
                    const extInfo = this.vm.runtime._blockInfo.find(info => info.id === extensionId);
                    
                    if (extInfo) {
                        color = extInfo.color1 || extInfo.colour || color;
                    }
                }
                
                // THIRD: Fallback to prefix matching for built-in categories
                const prefixMap = {
                    'motion_': { category: 'motion', color: '#4C97FF' },
                    'looks_': { category: 'looks', color: '#9966FF' },
                    'sound_': { category: 'sound', color: '#D65CD6' },
                    'event_': { category: 'events', color: '#FFD500' },
                    'control_': { category: 'control', color: '#FFAB19' },
                    'sensing_': { category: 'sensing', color: '#4CBFE6' },
                    'operator_': { category: 'operators', color: '#40BF4A' },
                    'data_': { category: 'variables', color: '#FF8C1A' },
                    'procedures_': { category: 'myblocks', color: '#FF6680' }
                };
                
                for (const [prefix, info] of Object.entries(prefixMap)) {
                    if (blockType.startsWith(prefix)) {
                        category = info.category;
                        color = info.color;
                        break;
                    }
                }
            }
            
            // Get VM category if available (for proper category name)
            if (this.vm && this.vm.runtime && this.vm.runtime._blockInfo) {
                const extensionId = blockType.split('_')[0];
                const extInfo = this.vm.runtime._blockInfo.find(info => info.id === extensionId);
                if (extInfo) {
                    category = extInfo.id;
                }
            }
            
            // Extract category from block type if still 'extension'
            if (category === 'extension' && blockType.includes('_')) {
                category = blockType.split('_')[0];
            }
            
            // Get block name - FIRST try from flyout (best quality)
            let name = getBlockNameFromFlyout(blockType);
            
            // Fallback 1: Try from json message0 with proper placeholder replacement
            if (!name && blockDefinition.json && blockDefinition.json.message0) {
                let message = blockDefinition.json.message0;
                const args = blockDefinition.json.args0 || [];
                
                // Replace %1, %2, etc with appropriate placeholders
                args.forEach((arg, index) => {
                    const placeholder = index + 1;
                    if (arg.type === 'input_value') {
                        message = message.replace(`%${placeholder}`, '()');
                    } else if (arg.type === 'input_statement') {
                        message = message.replace(`%${placeholder}`, '[]');
                    } else if (arg.type === 'field_dropdown' || arg.type === 'field_variable') {
                        message = message.replace(`%${placeholder}`, '[]');
                    } else {
                        // For other field types, just remove the placeholder
                        message = message.replace(`%${placeholder}`, '');
                    }
                });
                
                message = message.replace(/\s+/g, ' ').trim().toLowerCase();
                if (message && message.length > 0 && message.length < 100) {
                    name = message;
                }
            }
            
            // Fallback 2: Generate from block type
            if (!name) {
                name = blockType
                    .replace(/^[a-z]+_/, '')
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/_/g, ' ')
                    .toLowerCase()
                    .trim();
            }
            
            this.dynamicBlockMetadata[blockType] = {
                name: name,
                category: category,
                color: color
            };
        });
        
        if (newBlocksFound > 0) {
        }
    } catch (err) {
        console.error('Error building extension metadata:', err);
    }
}
startMetadataRefresh() {
    // Initial build after a delay
    setTimeout(() => {
        this.buildExtensionMetadata();
    }, 1000);
    
    // Moderate refresh every 8 seconds (since we now have URL monitoring)
    this.metadataRefreshInterval = setInterval(() => {
        this.buildExtensionMetadata();
    }, 8000);
}

stopMetadataRefresh() {
    if (this.metadataRefreshInterval) {
        clearInterval(this.metadataRefreshInterval);
        this.metadataRefreshInterval = null;
    }
}

stopMetadataRefresh() {
    if (this.metadataRefreshInterval) {
        clearInterval(this.metadataRefreshInterval);
        this.metadataRefreshInterval = null;
    }
}

setupExtensionListener() {
    // Listen for when extensions are loaded
    if (this.workspace && this.workspace.getToolbox()) {
        const toolbox = this.workspace.getToolbox();
        
        // Watch for toolbox updates (happens when extensions load)
        const originalRefresh = toolbox.refreshSelection;
        if (originalRefresh) {
            toolbox.refreshSelection = () => {
                originalRefresh.call(toolbox);
                // Rebuild metadata after toolbox updates
                setTimeout(() => {
                    this.buildExtensionMetadata();
                }, 500);
            };
        }
    }
    
    // Also listen for VM extension loading if available
    if (window.vm) {
        const vm = window.vm;
        const extensionManager = vm.extensionManager;
        
        if (extensionManager) {
            // Store original loadExtensionURL
            const originalLoadExtension = extensionManager.loadExtensionURL;
            
            if (originalLoadExtension) {
                extensionManager.loadExtensionURL = function(...args) {
                    const result = originalLoadExtension.apply(this, args);
                    
                    // Wait for extension to fully load, then rebuild metadata
                    if (result && result.then) {
                        result.then(() => {
                            setTimeout(() => {
                                window.BlockSearch?.buildExtensionMetadata();
                            }, 1000);
                        });
                    }
                    
                    return result;
                };
            }
        }
    }
}

setupExtensionURLMonitoring() {
    const trustedExtensionOrigins = [
        'https://extensions.turbowarp.org/',
        'https://extensions.penguinmod.com/',
        'https://extensions.arkide.site/',
        'https://penguinmod-extensions-gallery.vercel.app/',
        'https://arkfs.arc360hub.com/',
        'https://sharkpools-extensions.vercel.app/',
        'https://sharkpool-sp.github.io/SharkPools-Extensions/',
        'https://pen-group.github.io/',
        'http://localhost:8000',
        'http://localhost:6000',
        'http://localhost:6001',
        'http://localhost:5173',
        'http://localhost:5174'
    ];
    
    const isTrustedExtensionOrigin = (url) => {
        return trustedExtensionOrigins.some(origin => url.startsWith(origin));
    };
    
    // Monitor console messages
    const originalConsoleLog = console.log;
    const originalConsoleInfo = console.info;
    
    const checkForExtensionLoad = (message) => {
        if (typeof message === 'string') {
            // Check for arkide-additons specifically
            if (message.includes('arkide-additons') || message.includes('arkide')) {
                setTimeout(() => {
                    this.buildExtensionMetadata();
                }, 2000); // Longer delay for complex extensions
                return;
            }
            
            // Check if message contains extension URL
            for (const origin of trustedExtensionOrigins) {
                if (message.includes(origin)) {
                    setTimeout(() => {
                        console.log('⚡ Rebuilding metadata...');
                        this.buildExtensionMetadata();
                    }, 1500);
                    break;
                }
            }
            
            // Check for extension loading patterns
            if (message.includes('Loading extension') || 
                message.includes('extension loaded') ||
                message.includes('.js unsandboxed')) {
                console.log('🔍 Extension loading detected');
                setTimeout(() => {
                    this.buildExtensionMetadata();
                }, 1500);
            }
        }
    };
    
    console.log = function(...args) {
        checkForExtensionLoad(args[0]);
        return originalConsoleLog.apply(console, args);
    };
    
    console.info = function(...args) {
        checkForExtensionLoad(args[0]);
        return originalConsoleInfo.apply(console, args);
    };
    
    // Monitor fetch requests
    const originalFetch = window.fetch;
    window.fetch = function(url, ...args) {
        if (typeof url === 'string' && isTrustedExtensionOrigin(url) && url.endsWith('.js')) {
            
            const fetchPromise = originalFetch.call(this, url, ...args);
            fetchPromise.then(() => {
                setTimeout(() => {
                    window.BlockSearch?.buildExtensionMetadata();
                }, 2500); // Even longer for fetch
            }).catch((err) => {
                console.warn('❌ Extension fetch failed:', err);
                setTimeout(() => {
                    window.BlockSearch?.buildExtensionMetadata();
                }, 2500);
            });
            
            return fetchPromise;
        }
        return originalFetch.call(this, url, ...args);
    };
    
}

stopMetadataRefresh() {
    if (this.metadataRefreshInterval) {
        clearInterval(this.metadataRefreshInterval);
        this.metadataRefreshInterval = null;
    }
}

// Add cleanup method
stopMetadataRefresh() {
    if (this.metadataRefreshInterval) {
        clearInterval(this.metadataRefreshInterval);
        this.metadataRefreshInterval = null;
    }
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
        
        // Initialize metadata with static blocks
        this.dynamicBlockMetadata = { ...BLOCK_METADATA };

        // Build extension metadata periodically to catch newly loaded extensions
        this.startMetadataRefresh();
        
        // Setup extension loading listener
        this.setupExtensionListener();
        
        // NEW: Setup extension URL monitoring
        this.setupExtensionURLMonitoring();

        const checkExtensionLibrary = setInterval(() => {
    const extensionLibrary = document.querySelector('[class*="extension-library"]') ||
                            document.querySelector('[class*="extensionLibrary"]');
    
    if (extensionLibrary && !this._extensionLibraryWasOpen) {
        this._extensionLibraryWasOpen = true;
        console.log('📚 Extension library opened, will rebuild after close');
    } else if (!extensionLibrary && this._extensionLibraryWasOpen) {
        this._extensionLibraryWasOpen = false;
        console.log('📚 Extension library closed, rebuilding metadata...');
        setTimeout(() => {
            this.buildExtensionMetadata();
        }, 1000);
    }
}, 500);
        
        // Make BlockSearch globally accessible for extension listener
        window.BlockSearch = this;

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
        
        // Rebuild metadata when switching categories to catch newly visible blocks
        setTimeout(() => {
            this.buildExtensionMetadata();
        }, 300);
    }
}

addSearchCategory() {
    console.log('Adding search category (super robust version)...');
    
    // Cleanup any existing observers/intervals
    if (this._searchCategoryObserver) {
        this._searchCategoryObserver.disconnect();
        this._searchCategoryObserver = null;
    }
    if (this._searchCategoryInterval) {
        clearInterval(this._searchCategoryInterval);
        this._searchCategoryInterval = null;
    }

    const ensureSearchCategory = () => {
        try {
            const targetMenu = document.querySelector('.scratchCategoryMenu');
            if (!targetMenu || !targetMenu.isConnected) {
                return false;
            }

            // Check if already exists AND is still in DOM
            let existing = targetMenu.querySelector('.scratch-search-category');
            if (existing && existing.isConnected) {
                return true;
            }

            // Remove any orphaned search categories
            document.querySelectorAll('.scratch-search-category').forEach(el => el.remove());

            // Create new search category
            const searchCategory = document.createElement('div');
            searchCategory.className = 'scratchCategoryMenuItem scratch-search-category';
            searchCategory.setAttribute('role', 'treeitem');
            searchCategory.setAttribute('data-search-injected', 'true');
            searchCategory.style.cssText = `
                padding: 8px 1px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 3px;
                background: transparent;
                color: white;
                font-weight: bold;
                user-select: none;
                text-align: center;
                border-bottom: 1px solid rgba(0,0,0,0.08);
                height: 64px;
                transition: all 0.2s;
            `;

            searchCategory.addEventListener('mouseenter', () => {
                searchCategory.style.backgroundColor = 'rgba(255,255,255,0.1)';
            });
            searchCategory.addEventListener('mouseleave', () => {
                searchCategory.style.backgroundColor = 'transparent';
            });

            const icon = document.createElement('span');
            icon.textContent = '🔍';
            icon.style.cssText = 'font-size: 20px; line-height: 20px; margin: 0;';

            const label = document.createElement('span');
            label.textContent = 'Search';
            label.style.cssText = 'font-size: 12px; margin: 0; display: block;';

            searchCategory.appendChild(icon);
            searchCategory.appendChild(label);

            searchCategory.addEventListener('click', (e) => {
                e.stopPropagation();
                this.currentCategory = 'search';
                this.handleCategorySwitch('search');
                this.toggleSearchBar();
            });

            targetMenu.insertBefore(searchCategory, targetMenu.firstChild);
            return true;
        } catch (err) {
            console.error('Error in ensureSearchCategory:', err);
            return false;
        }
    };

    // Initial injection with retry
    const tryInject = (attempts = 0) => {
        if (attempts > 10) {
            console.warn('Failed to inject search category after 10 attempts');
            return;
        }
        
        if (!ensureSearchCategory()) {
            setTimeout(() => tryInject(attempts + 1), 200);
        }
    };
    
    tryInject();

    // Watch for toolbox changes using MutationObserver
    const observeToolbox = () => {
        const toolboxContainer = document.querySelector('.blocklyToolboxDiv') || 
                                document.querySelector('[class*="blocks_blocks"]') ||
                                document.body;

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                // Check if category menu was added/modified
                if (mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.classList && 
                            (node.classList.contains('scratchCategoryMenu') ||
                             node.querySelector && node.querySelector('.scratchCategoryMenu'))) {
                            setTimeout(() => ensureSearchCategory(), 100);
                            break;
                        }
                    }
                }
            }
        });

        observer.observe(toolboxContainer, {
            childList: true,
            subtree: true
        });

        this._searchCategoryObserver = observer;
    };

    observeToolbox();

    // Safety interval to catch any missed injections
    this._searchCategoryInterval = setInterval(() => {
        const menu = document.querySelector('.scratchCategoryMenu');
        if (menu && !menu.querySelector('.scratch-search-category')) {
            ensureSearchCategory();
        }
    }, 1000);

    // Hide search UI initially
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
        
        // Find the blocks wrapper specifically
        let targetDiv = document.querySelector('[class*="blocks_blocks"]') ||
                        document.querySelector('.injectionDiv');
        
        
        if (targetDiv) {
            
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

        const metadata = this.dynamicBlockMetadata;

        for (const [blockType, meta] of Object.entries(metadata)) {
            // Search by name
            if (meta.name.toLowerCase().includes(query)) {
                results.push({ blockType, ...meta });
                continue;
            }
            
            // Search by block type
            if (blockType.toLowerCase().includes(query)) {
                results.push({ blockType, ...meta });
                continue;
            }
            
            // Search by category
            if (meta.category.toLowerCase().includes(query)) {
                results.push({ blockType, ...meta });
            }
        }

        return results.slice(0, 10);
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
    const metadata = this.dynamicBlockMetadata[blockType] || BLOCK_METADATA[blockType];
    
    if (!metadata) {
        console.warn('No metadata for block:', blockType);
        return;
    }
    
    if (blockType.startsWith('extension_')) {
        console.warn('Invalid block type (extension_ prefix):', blockType);
        return;
    }
    
    // Helper to get safe center position
    const getSafeCenterPosition = () => {
        try {
            const metrics = this.workspace.getMetrics();
            const scale = this.workspace.scale || 1;
            
            // Calculate visible center
            const viewLeft = metrics.viewLeft || 0;
            const viewTop = metrics.viewTop || 0;
            const viewWidth = metrics.viewWidth || 400;
            const viewHeight = metrics.viewHeight || 300;
            
            // Position in center of visible area
            const centerX = viewLeft + (viewWidth / 2 / scale);
            const centerY = viewTop + (viewHeight / 2 / scale);
            
            // Clamp to reasonable bounds
            const safeX = Math.max(50, Math.min(centerX, 5000));
            const safeY = Math.max(50, Math.min(centerY, 5000));
            
            return { x: safeX, y: safeY };
        } catch (e) {
            console.warn('Error getting center position, using defaults:', e);
            return { x: 200, y: 200 };
        }
    };
    
    try {
        const toolbox = this.workspace.getToolbox();
            if (!toolbox || !toolbox.flyout_) {
                console.warn('No toolbox or flyout available');
                return;
            }
            
            const flyout = toolbox.flyout_;
            
            const switchToCategory = () => {
                if (!toolbox.tree_) return false;
                
                const findCategory = (node, targetName) => {
                    if (!node || !node.getChildren) return null;
                    
                    const children = node.getChildren();
                    for (const child of children) {
                        const name = child.rowDiv_?.textContent?.trim().toLowerCase();
                        if (name === targetName) {
                            return child;
                        }
                        const found = findCategory(child, targetName);
                        if (found) return found;
                    }
                    return null;
                };
                
                const category = findCategory(toolbox.tree_, metadata.category);
                if (category && category.onClick) {
                    category.onClick();
                    return true;
                }
                return false;
            };
            
            const createFromFlyout = () => {
                try {
                    if (!flyout.workspace_) {
                        return false;
                    }
                    
                    const flyoutBlocks = flyout.workspace_.getTopBlocks(false);
                    
                    let sourceBlock = null;
                    for (const block of flyoutBlocks) {
                        if (block.type === blockType) {
                            const isShadow = (typeof block.isShadow === 'function') ? block.isShadow() : block.isShadow;
                            const isMarker = (typeof block.isInsertionMarker === 'function') ? 
                                block.isInsertionMarker() : block.isInsertionMarker;
                            
                            if (!isShadow && !isMarker) {
                                sourceBlock = block;
                                break;
                            }
                        }
                    }
                    
                    if (!sourceBlock) {
                        console.warn(`Block ${blockType} not found in flyout`);
                        return false;
                    }
                    
                    const newBlock = flyout.createBlock(sourceBlock);
                    
                    if (!newBlock) {
                        return false;
                    }
                    
setTimeout(() => {
                        try {
                            const position = getSafeCenterPosition();
                            
                            // Get block's current position
                            const currentPos = newBlock.getRelativeToSurfaceXY();
                            
                            // Calculate offset to center
                            const offsetX = position.x - currentPos.x;
                            const offsetY = position.y - currentPos.y;
                            
                            // Move block to center
                            newBlock.moveBy(offsetX, offsetY);
                            
                            // Ensure block is rendered
                            if (newBlock.render) {
                                newBlock.render();
                            }
                            
                            // Select and bring to front
                            if (newBlock.select) {
                                newBlock.select();
                            }
                            
                            // Scroll to block if needed
                            this.workspace.centerOnBlock(newBlock.id);
                            

                        } catch (e) {
                            console.warn('Error positioning block:', e);
                        }
                    }, 50);
                    
                    return true;
                    
                } catch (err) {
                    console.error('Error in createFromFlyout:', err);
                    return false;
                }
            };
            
            switchToCategory();
            
            setTimeout(() => {
                createFromFlyout();
                this.searchInput.value = '';
                this.resultsContainer.style.display = 'none';
            }, 200);
            
        } catch (err) {
            console.error('Error adding block:', err);
        }
    }

// Helper method to remove all IDs from XML tree
removeAllIds(xmlElement) {
    xmlElement.removeAttribute('id');
    xmlElement.removeAttribute('disabled');
    
    // Recursively remove from children
    const children = xmlElement.children;
    for (let i = 0; i < children.length; i++) {
        this.removeAllIds(children[i]);
    }
}

// Helper to clone a block's full structure including shadows
cloneBlockWithShadows(sourceBlock) {
    const ScratchBlocks = LazyScratchBlocks.get();
    
    try {
        // Get the block's XML representation with all children
        const blockXml = ScratchBlocks.Xml.blockToDom(sourceBlock);
        
        // Deep clone the XML
        const clonedXml = blockXml.cloneNode(true);
        
        // Remove all IDs so new blocks are created
        this.removeAllIds(clonedXml);
        
        return clonedXml;
    } catch (e) {
        console.error('Error cloning block:', e);
        return null;
    }
}

// Add fallback method to create blocks directly when flyout method fails
createBlockDirectly(blockType) {
    try {
        const ScratchBlocks = LazyScratchBlocks.get();
        
        // Check if block definition exists
        if (!ScratchBlocks.Blocks[blockType]) {
            console.warn('Block definition not found:', blockType);
            return;
        }
        
        // Disable events temporarily to prevent unwanted side effects
        const eventsEnabled = ScratchBlocks.Events.isEnabled();
        ScratchBlocks.Events.disable();
        
        try {
            // Create basic XML
            const blockXml = ScratchBlocks.Xml.textToDom(
                `<block type="${blockType}"></block>`
            );
            
            // Create the block
            const newBlock = ScratchBlocks.Xml.domToBlock(blockXml, this.workspace);
            
            if (!newBlock) {
                console.error('Failed to create block directly');
                return;
            }
            
            // Initialize the block properly
            if (newBlock.initSvg) newBlock.initSvg();
            if (newBlock.render) newBlock.render(false);
            
// Position in center using safe positioning
            const position = getSafeCenterPosition();
            const currentPos = newBlock.getRelativeToSurfaceXY();
            const offsetX = position.x - currentPos.x;
            const offsetY = position.y - currentPos.y;
            
            newBlock.moveBy(offsetX, offsetY);
            
            // Scroll to make sure it's visible
            this.workspace.centerOnBlock(newBlock.id);
            
            // Select the block
            if (newBlock.select) {
                newBlock.select();
            }
            
            console.log('Block created directly:', blockType);
        } finally {
            // Re-enable events
            if (eventsEnabled) {
                ScratchBlocks.Events.enable();
            }
        }
        
    } catch (err) {
        console.error('Error creating block directly:', err);
    }
}

// Fallback method to show block in toolbox
showBlockInToolbox(blockType) {
    console.log('Block selected:', blockType);
    
    const result = this.dynamicBlockMetadata[blockType] || BLOCK_METADATA[blockType];
    if (!result) return;
    
    // Try to switch to the appropriate category
    try {
        const toolbox = this.workspace.getToolbox();
        if (toolbox && toolbox.tree_) {
            const findCategory = (node, targetName) => {
                if (!node || !node.getChildren) return null;
                
                const children = node.getChildren();
                for (const child of children) {
                    const name = child.rowDiv_?.textContent?.trim().toLowerCase();
                    if (name === targetName) {
                        return child;
                    }
                    const found = findCategory(child, targetName);
                    if (found) return found;
                }
                return null;
            };
            
            const category = findCategory(toolbox.tree_, result.category);
            if (category && category.onClick) {
                category.onClick();
            }
        }
    } catch (e) {
        console.warn('Could not switch category:', e);
    }
    }
}

export default new BlockSearch();