import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import FilesTabComponent from '../components/files-tab/files-tab.jsx';
import downloadBlob from '../lib/download-blob';

const mapStateToProps = (state) => {
    const vm = state.scratchGui.vm;
    const editingTarget = state.scratchGui.targets.editingTarget;
    const stage = state.scratchGui.targets.stage;
    const sprites = state.scratchGui.targets.sprites;

    // Get the current editing target (sprite or stage)
    let target = null;
    let isStage = false;
    
    if (stage && stage.id === editingTarget) {
        target = stage;
        isStage = true;
    } else if (editingTarget && sprites[editingTarget]) {
        target = sprites[editingTarget];
        isStage = false;
    }

    // For sprites: show their costumes and sounds
    // For stage: show backdrops (stage.costumes) and sounds
    const costumes = isStage ? [] : (target?.costumes || []);
    const sounds = target?.sounds || [];
    const backdrops = isStage ? (target?.costumes || []) : [];
    
    // Collect ALL assets from the entire project
    const allGlobalCostumes = [];
    const allGlobalSounds = [];
    const allGlobalBackdrops = stage?.costumes || [];
    
    // Add stage sounds
    if (stage?.sounds) {
        allGlobalSounds.push(...stage.sounds.map(s => ({ ...s, owner: 'Stage' })));
    }
    
    // Add all sprite costumes and sounds
    if (sprites) {
        Object.values(sprites).forEach(sprite => {
            if (sprite.costumes) {
                allGlobalCostumes.push(...sprite.costumes.map(c => ({ ...c, owner: sprite.name })));
            }
            if (sprite.sounds) {
                allGlobalSounds.push(...sprite.sounds.map(s => ({ ...s, owner: sprite.name })));
            }
        });
    }
    
    return {
        costumes,
        sounds,
        backdrops,
        globalCostumes: allGlobalCostumes,
        globalSounds: allGlobalSounds,
        globalBackdrops: allGlobalBackdrops
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const vm = ownProps.vm;
    
    return {
        onExportAsset: (asset, index) => {
            if (!asset || !asset.asset) return;
            
            // Get the asset data
            const assetData = asset.asset.data || asset.asset;
            
            // Determine the file extension
            const extension = asset.dataFormat || 'dat';
            const fileName = `${asset.name}.${extension}`;
            
            // Create a blob from the asset data
            let blob;
            if (assetData instanceof Uint8Array || assetData instanceof ArrayBuffer) {
                blob = new Blob([assetData]);
            } else if (typeof assetData === 'string') {
                // For SVG or text-based assets
                blob = new Blob([assetData], { type: 'text/plain' });
            } else {
                console.error('Unknown asset data type');
                return;
            }
            
            // Download the file
            downloadBlob(fileName, blob);
        }
    };
};

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(FilesTabComponent));