// Storage key for pinned blocks
const PINNED_BLOCKS_KEY = 'scratch_pinned_blocks';

// Get pinned blocks from localStorage
export const getPinnedBlocks = () => {
    try {
        const stored = localStorage.getItem(PINNED_BLOCKS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to load pinned blocks:', e);
        return [];
    }
};

// Save pinned blocks to localStorage
export const setPinnedBlocks = (blocks) => {
    try {
        localStorage.setItem(PINNED_BLOCKS_KEY, JSON.stringify(blocks));
    } catch (e) {
        console.error('Failed to save pinned blocks:', e);
    }
};

// Add a block to pinned
export const pinBlock = (blockXML) => {
    const pinned = getPinnedBlocks();
    if (!pinned.includes(blockXML)) {
        pinned.push(blockXML);
        setPinnedBlocks(pinned);
    }
    return pinned;
};

// Remove a block from pinned
export const unpinBlock = (blockXML) => {
    const pinned = getPinnedBlocks();
    const filtered = pinned.filter(b => b !== blockXML);
    setPinnedBlocks(filtered);
    return filtered;
};

// Check if a block is pinned
export const isBlockPinned = (blockXML) => {
    return getPinnedBlocks().includes(blockXML);
};

export const cleanupPinnedBlocks = () => {
    const pinned = getPinnedBlocks();
    // Remove duplicates and empty entries
    const cleaned = [...new Set(pinned)].filter(block => block && block.trim().length > 0);
    setPinnedBlocks(cleaned);
    return cleaned;
};