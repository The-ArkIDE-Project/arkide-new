import classNames from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import Input from '../forms/input.jsx';
import Box from '../box/box.jsx';
import styles from './files-tab.css';

class FilesTab extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            "handleSearch",
            "handleTypeFilter",
            "handleScopeChange",
            "renderAsset",
            "getAssetPreview",
            "formatFileSize"
        ]);
        this.state = {
            query: '',
            selectedType: 'all', // 'all', 'costume', 'sound', 'backdrop'
            scope: 'current' // 'current' or 'global'
        };
    }

    handleSearch(event) {
        this.setState({
            query: String(event.target.value).toLowerCase()
        });
    }

    handleTypeFilter(type) {
        this.setState({
            selectedType: type
        });
    }

    handleScopeChange(scope) {
        this.setState({
            scope: scope
        });
    }

    formatFileSize(bytes) {
        // Handle invalid inputs
        if (bytes === null || bytes === undefined || isNaN(bytes)) return 'Unknown';
        
        const numBytes = Number(bytes);
        if (numBytes === 0) return '0 B';
        if (numBytes < 1024) return `${numBytes} B`;
        if (numBytes < 1024 * 1024) return `${(numBytes / 1024).toFixed(2)} KB`;
        return `${(numBytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    getAssetPreview(asset) {
        // For images (costumes/backdrops)
        if (asset.dataFormat === 'svg' || asset.dataFormat === 'png' || asset.dataFormat === 'jpg' || asset.dataFormat === 'jpeg') {
            const assetData = asset.asset?.encodeDataURI?.() || asset.md5;
            return (
                <img 
                    src={assetData}
                    alt={asset.name}
                    className={styles.assetThumbnail}
                />
            );
        }
        
        // For sounds
        if (asset.dataFormat === 'wav' || asset.dataFormat === 'mp3') {
            return (
                <div className={styles.soundIcon}>
                    🔊
                </div>
            );
        }

        return <div className={styles.unknownIcon}>📄</div>;
    }

    renderAsset(asset, index) {
        // Try multiple ways to get the asset size
        let assetSize = 0;
        if (asset.asset) {
            if (asset.asset.size) {
                assetSize = asset.asset.size;
            } else if (asset.asset.data) {
                assetSize = asset.asset.data.length || asset.asset.data.byteLength || 0;
            }
        } else if (asset.size) {
            assetSize = asset.size;
        }
        
        const formattedSize = this.formatFileSize(assetSize);

        // Create a unique key combining type, owner, and ID/index to prevent duplicates
        const uniqueKey = `${asset.assetType}-${asset.owner || 'current'}-${asset.assetId || asset.md5 || index}`;

        return (
            <tr key={uniqueKey}>
                <td className={styles.assetPreview}>
                    {this.getAssetPreview(asset)}
                </td>
                <td className={styles.assetName}>
                    {asset.name}
                    {asset.owner && this.state.scope === 'global' && (
                        <div className={styles.assetOwner}>
                            from: {asset.owner}
                        </div>
                    )}
                </td>
                <td className={styles.assetType}>
                    {asset.assetType || (asset.dataFormat?.toUpperCase())}
                </td>
                <td className={styles.assetSize}>
                    {formattedSize}
                </td>
                <td className={styles.assetDimensions}>
                    {asset.bitmapResolution || asset.rotationCenterX ? 
                        `${Math.round(asset.bitmapResolution || 1)}x` : 
                        asset.sampleCount ? `${(asset.sampleCount / asset.rate).toFixed(2)}s` : '-'
                    }
                </td>
                <td className={styles.assetActions}>
                    <button 
                        onClick={() => this.props.onExportAsset?.(asset, index)}
                        className={styles.actionButton}
                        title="Export"
                    >
                        ⬇️
                    </button>
                </td>
            </tr>
        );
    }

    filterAssets(assets) {
        if (!assets) return [];
        
        return assets.filter(asset => {
            const matchesSearch = asset.name.toLowerCase().includes(this.state.query);
            if (!matchesSearch) return false;

            if (this.state.selectedType === 'all') return true;
            
            return asset.assetType === this.state.selectedType;
        });
    }

    render() {
        const {
            costumes = [],
            sounds = [],
            backdrops = [],
            globalCostumes = [],
            globalSounds = [],
            globalBackdrops = []
        } = this.props;

        // Choose which assets to display based on scope
        let displayCostumes, displaySounds, displayBackdrops;
        
        if (this.state.scope === 'global') {
            displayCostumes = globalCostumes;
            displaySounds = globalSounds;
            displayBackdrops = globalBackdrops;
        } else {
            displayCostumes = costumes;
            displaySounds = sounds;
            displayBackdrops = backdrops;
        }

        // Combine all assets with type tags
        const allAssets = [
            ...displayCostumes.map(c => ({ ...c, assetType: 'costume' })),
            ...displaySounds.map(s => ({ ...s, assetType: 'sound' })),
            ...displayBackdrops.map(b => ({ ...b, assetType: 'backdrop' }))
        ];

        const filteredAssets = this.filterAssets(allAssets);

        // Calculate total size more accurately
        const totalSize = allAssets.reduce((sum, asset) => {
            let size = 0;
            if (asset.asset) {
                if (asset.asset.size) {
                    size = asset.asset.size;
                } else if (asset.asset.data) {
                    size = asset.asset.data.length || asset.asset.data.byteLength || 0;
                }
            } else if (asset.size) {
                size = asset.size;
            }
            return sum + size;
        }, 0);
        const formattedTotalSize = this.formatFileSize(totalSize);

        return (
            <div className={styles.editorWrapper}>
                <Box className={styles.editorContainer}>
                    <div className={styles.header}>
                        <div className={styles.scopeButtons}>
                            <button
                                className={classNames(styles.scopeButton, {
                                    [styles.scopeButtonActive]: this.state.scope === 'current'
                                })}
                                onClick={() => this.handleScopeChange('current')}
                            >
                                📍 Current Sprite
                            </button>
                            <button
                                className={classNames(styles.scopeButton, {
                                    [styles.scopeButtonActive]: this.state.scope === 'global'
                                })}
                                onClick={() => this.handleScopeChange('global')}
                            >
                                🌍 All Project Assets
                            </button>
                        </div>

                        <Input
                            placeholder="Search assets"
                            className={styles.searchBar}
                            onChange={this.handleSearch}
                        />
                        
                        <div className={styles.filterButtons}>
                            {['all', 'costume', 'sound', 'backdrop'].map(type => (
                                <button
                                    key={type}
                                    className={classNames(styles.filterButton, {
                                        [styles.filterButtonActive]: this.state.selectedType === type
                                    })}
                                    onClick={() => this.handleTypeFilter(type)}
                                >
                                    {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.summary}>
                        <span className={styles.assetCount}>
                            {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''}
                        </span>
                        <span className={styles.totalSize}>
                            Total: {formattedTotalSize}
                        </span>
                    </div>

                    {filteredAssets.length > 0 ? (
                        <table className={styles.assetsTable}>
                            <thead>
                                <tr>
                                    <th className={styles.previewColumn}>Preview</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Size</th>
                                    <th>Info</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAssets.map(this.renderAsset)}
                            </tbody>
                        </table>
                    ) : (
                        <div className={styles.noAssets}>
                            {this.state.query ? 
                                'No assets match your search' : 
                                'No assets in this project'
                            }
                        </div>
                    )}
                </Box>
            </div>
        );
    }
}

FilesTab.propTypes = {
    costumes: PropTypes.array,
    sounds: PropTypes.array,
    backdrops: PropTypes.array,
    globalCostumes: PropTypes.array,
    globalSounds: PropTypes.array,
    globalBackdrops: PropTypes.array,
    onExportAsset: PropTypes.func
};

export default injectIntl(FilesTab);