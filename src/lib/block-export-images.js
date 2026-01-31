/**
 * Block Export to Image functionality
 * Adds "Export as Image" option to block right-click menu


const setupBlockExport = (ScratchBlocks, workspace) => {
    // Store original context menu function
    const originalShowContextMenu = ScratchBlocks.BlockSvg.prototype.showContextMenu_;
    
    // Override the context menu function
    ScratchBlocks.BlockSvg.prototype.showContextMenu_ = function(e) {
        const block = this;
        const menuOptions = [];
        
        // Get default menu options first
        if (this.isDeletable() && this.isMovable()) {
            menuOptions.push(ScratchBlocks.ContextMenu.blockDuplicateOption(block, e));
        }
        if (this.isDeletable()) {
            menuOptions.push(ScratchBlocks.ContextMenu.blockDeleteOption(block));
        }
        
        // Add "Export as Image" option
        menuOptions.push({
            enabled: true,
            text: 'Export as Image',
            callback: () => exportBlockAsImage(block, workspace)
        });
        
        // Add help option if available
        const url = (typeof this.helpUrl === 'function') ? this.helpUrl() : this.helpUrl;
        if (url) {
            menuOptions.push(ScratchBlocks.ContextMenu.blockHelpOption(block));
        }
        
        // Show the menu
        ScratchBlocks.ContextMenu.show(e, menuOptions, this.RTL);
    };
};

const convertImagesToDataUrls = async (svgElement) => {
    const images = svgElement.querySelectorAll('image');
    const promises = [];
    
    for (const img of images) {
        const href = img.getAttribute('href') || img.getAttribute('xlink:href');
        if (href && !href.startsWith('data:')) {
            const promise = fetch(href)
                .then(response => response.blob())
                .then(blob => new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        img.setAttribute('href', reader.result);
                        img.removeAttribute('xlink:href');
                        resolve();
                    };
                    reader.readAsDataURL(blob);
                }))
                .catch(err => {
                    console.warn('Failed to load image:', href, err);
                });
            promises.push(promise);
        }
    }
    
    return Promise.all(promises);
};

const exportBlockAsImage = async (block, workspace) => {
    try {
        // Get the root block of the stack
        const rootBlock = block.getRootBlock();
        
        // Get the block group element
        const blockGroup = rootBlock.getSvgRoot();
        
        if (!blockGroup) {
            console.error('Could not find block SVG');
            return;
        }
        
        // Get bounding box
        const bbox = blockGroup.getBBox();
        const padding = 20;
        
        // Create new SVG with proper namespaces and styling
        const svgNS = 'http://www.w3.org/2000/svg';
        const newSvg = document.createElementNS(svgNS, 'svg');
        newSvg.setAttribute('xmlns', svgNS);
        newSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        newSvg.setAttribute('width', bbox.width + padding * 2);
        newSvg.setAttribute('height', bbox.height + padding * 2);
        newSvg.setAttribute('viewBox', `0 0 ${bbox.width + padding * 2} ${bbox.height + padding * 2}`);
        
        // Add defs for gradients and filters that blocks use
        const defs = document.createElementNS(svgNS, 'defs');
        
        // Copy defs from workspace (includes block shadows, gradients, etc)
        const workspaceDefs = workspace.svgBlockCanvas_.querySelector('defs');
        if (workspaceDefs) {
            defs.innerHTML = workspaceDefs.innerHTML;
        }
        newSvg.appendChild(defs);
        
        // Add style element for fonts
        const style = document.createElementNS(svgNS, 'style');
        style.textContent = `
            text {
                font-family: "Helvetica Neue", Helvetica, sans-serif;
                font-size: 12pt;
                font-weight: 500;
                fill: white;
            }
            .blocklyText {
                font-family: "Helvetica Neue", Helvetica, sans-serif;
                font-size: 12pt;
                font-weight: 500;
                fill: white;
            }
            .blocklyEditableText {
                font-family: "Helvetica Neue", Helvetica, sans-serif;
                font-size: 12pt;
                font-weight: 500;
                fill: white;
            }
            .blocklyNonEditableText > text {
                fill: white;
            }
            .blocklyEditableText > .blocklyText {
                fill: black !important;
            }
            .blocklyDropdownText {
                fill: white;
            }
        `;
        newSvg.appendChild(style);
        
        
        // Clone and transform the block
        const clonedBlock = blockGroup.cloneNode(true);
        const transform = `translate(${padding - bbox.x}, ${padding - bbox.y})`;
        clonedBlock.setAttribute('transform', transform);
        
        newSvg.appendChild(clonedBlock);
        
        // Convert all image URLs to data URLs
        await convertImagesToDataUrls(newSvg);
        
        // Serialize SVG
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(newSvg);
        
        // Create canvas for conversion
        const canvas = document.createElement('canvas');
        const scale = 3; // Higher quality for crisp text
        canvas.width = (bbox.width + padding * 2) * scale;
        canvas.height = (bbox.height + padding * 2) * scale;
        const ctx = canvas.getContext('2d');
        
        // Create image from SVG
        const img = new Image();
        const blob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        
        img.onload = () => {
            // Enable better rendering
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Draw image at higher resolution
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Convert to PNG and download
            canvas.toBlob((pngBlob) => {
                const downloadUrl = URL.createObjectURL(pngBlob);
                const link = document.createElement('a');
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
                link.download = `block-${timestamp}.png`;
                link.href = downloadUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Cleanup
                URL.revokeObjectURL(downloadUrl);
                URL.revokeObjectURL(url);
            }, 'image/png');
        };
        
        img.onerror = (err) => {
            console.error('Error loading image:', err);
            URL.revokeObjectURL(url);
            alert('Failed to export block. Please try again.');
        };
        
        img.src = url;
        
    } catch (error) {
        console.error('Error exporting block:', error);
        alert('Failed to export block as image: ' + error.message);
    }
};

export default setupBlockExport;
 */