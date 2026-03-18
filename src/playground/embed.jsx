import './import-first';

import ReactDOM from 'react-dom';
import React from 'react';
import {compose} from 'redux';
import {setAppElement} from 'react-modal';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import TWEmbedFullScreenHOC from '../lib/tw-embed-fullscreen-hoc.jsx';
import TWStateManagerHOC from '../lib/tw-state-manager-hoc.jsx';
import runAddons from '../addons/entry';

import GUI from './render-gui.jsx';
import appTarget from './app-target';

const getProjectId = () => {
    // For compatibility reasons, we first look at the hash.
    // eg. https://turbowarp.org/embed.html#1
    const hashMatch = location.hash.slice(1);
    if (hashMatch !== '') {
        return hashMatch;
    }
    // Otherwise, we'll recreate what "wildcard" routing does.
    // eg. https://turbowarp.org/1/embed
    const pathMatch = location.pathname.match(/(\d+)\/embed/);
    if (pathMatch !== null) {
        return pathMatch[pathMatch.length - 1];
    }
    return '0';
};

const projectId = getProjectId();
const urlParams = new URLSearchParams(location.search);

let vm;

const onVmInit = _vm => {
    vm = _vm;
    if (vm.runtime.renderer?.setPrivateSkinAccess)
        vm.runtime.renderer.setPrivateSkinAccess(false);
    
    // Add global screenshot function
    window.takeScreenshot = () => {
        if (!vm) return;
        const renderer = vm.runtime.renderer;
        const canvas = renderer.canvas;
        
        const captureCallback = () => {
            const now = new Date();
            const filename = `arkide-${now.toISOString().split('T')[0]}-${now.toTimeString().split(' ')[0].replace(/:/g, '-')}`;
            
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `${filename}.png`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            });
        };
        
        renderer._snapshotCallbacks.push(captureCallback);
        renderer.dirty = true;
    };
};
const onProjectLoaded = () => {
    if (urlParams.has('autoplay')) {
        vm.start();
        vm.greenFlag();
    }
    
    // Add screenshot keyboard shortcut (Ctrl+Shift+S)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            window.takeScreenshot();
        }
    });
};

const WrappedGUI = compose(
    AppStateHOC,
    TWStateManagerHOC,
    TWEmbedFullScreenHOC
)(GUI);

setAppElement(appTarget);
ReactDOM.render(<WrappedGUI
    isEmbedded
    projectId={projectId}
    onVmInit={onVmInit}
    onProjectLoaded={onProjectLoaded}
    routingStyle="none"
/>, appTarget);

const injectVolumeSlider = () => {
    const controls = document.querySelector('[class*="controls_controls-container"]');
    if (!controls) {
        setTimeout(injectVolumeSlider, 300);
        return;
    }
    if (document.getElementById('ark-volume-slider')) return;

    const container = document.createElement('div');
    container.id = 'ark-volume-slider';
    container.style.cssText = 'display:flex;align-items:center;gap:6px;padding:0 8px;';

    const icon = document.createElement('span');
    icon.textContent = '🔊';
    icon.style.cssText = 'font-size:14px;cursor:pointer;user-select:none;';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.value = '100';
    slider.style.cssText = 'width:80px;cursor:pointer;accent-color:#4C97FF;';

    slider.addEventListener('input', () => {
        const vol = Number(slider.value) / 100;
        if (vm && vm.runtime && vm.runtime.audioEngine) {
            vm.runtime.audioEngine.inputNode.gain.value = vol;
        }
    });

    let muted = false;
    let lastVol = 100;
    icon.addEventListener('click', () => {
        if (muted) {
            slider.value = lastVol;
            slider.dispatchEvent(new Event('input'));
            icon.textContent = '🔊';
            muted = false;
        } else {
            lastVol = slider.value;
            slider.value = 0;
            slider.dispatchEvent(new Event('input'));
            icon.textContent = '🔇';
            muted = true;
        }
    });

    container.appendChild(icon);
    container.appendChild(slider);
    controls.insertAdjacentElement('afterend', container);
};

injectVolumeSlider();

if (urlParams.has('addons')) {
    runAddons();
}
